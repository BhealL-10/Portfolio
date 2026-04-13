import * as THREE from 'three';
import { clamp } from '../core/math';
import { DEFAULT_COLUMN_DISTANCE, getDifficultyProfile, pathDistanceToMeters } from './difficultyScaler';
import { EventSystem } from './EventSystem';
import { getPathLaneSpacing, getPathLaneTargets } from './pathLayout';
import type { GamePathPattern, GamePatternNodeTemplate } from './PatternLibrary';
import { selectPattern } from './PatternSelector';
import { validatePatternPlacement, validateTeleportTarget } from './PatternValidator';
import { getCrossedUpgradeMilestone, getNextUpgradeMilestone, type RogueliteItemOffer } from './roguelite';
import { resolveRuntimeNode } from './ShardRuntimeResolver';
import type {
  BranchChoice,
  GameCoinSlot,
  GameEventType,
  GameEventVisualKind,
  GamePathNode,
  GameShardMotionDirection,
  GameShardMotionMode,
  GameShardMotionPattern,
  GameShardShapeKind,
  GameShardSizeTier,
  GameShardSpinDirection,
  ResolvedGamePathNode
} from './gameSessionTypes';

const SIZE_TIER_CONFIG: Record<GameShardSizeTier, { radius: [number, number]; visual: [number, number]; orbitPeriod: [number, number] }> = {
  tiny: { radius: [0.42, 0.6], visual: [0.34, 0.54], orbitPeriod: [1.6, 2.1] },
  very_small: { radius: [0.6, 0.86], visual: [0.54, 0.82], orbitPeriod: [2, 2.5] },
  small: { radius: [0.86, 1.18], visual: [0.82, 1.18], orbitPeriod: [2.4, 2.9] },
  medium_small: { radius: [1.18, 1.58], visual: [1.18, 1.72], orbitPeriod: [2.8, 3.5] },
  medium: { radius: [1.58, 2.08], visual: [1.72, 2.36], orbitPeriod: [3.2, 4] },
  medium_large: { radius: [2.08, 2.74], visual: [2.36, 3.12], orbitPeriod: [3.8, 4.8] },
  large: { radius: [2.74, 3.54], visual: [3.12, 4.16], orbitPeriod: [4.4, 5.6] },
  very_large: { radius: [3.54, 4.52], visual: [4.16, 5.7], orbitPeriod: [5.4, 6.8] },
  huge: { radius: [4.52, 5.9], visual: [5.7, 7.9], orbitPeriod: [6.8, 8.4] },
  massive: { radius: [5.9, 7.4], visual: [7.9, 11.2], orbitPeriod: [8.4, 9.8] }
};

const SIZE_TIER_ORDER: GameShardSizeTier[] = [
  'tiny',
  'very_small',
  'small',
  'medium_small',
  'medium',
  'medium_large',
  'large',
  'very_large',
  'huge',
  'massive'
];

const MILESTONE_HALF_WIDTH = DEFAULT_COLUMN_DISTANCE * 1.72;
const MILESTONE_REWARD_OFFSET = DEFAULT_COLUMN_DISTANCE * 3.28;
const MILESTONE_RESERVED_AFTER = DEFAULT_COLUMN_DISTANCE * 1.35;
const MILESTONE_EXIT_BUFFER = DEFAULT_COLUMN_DISTANCE * 0.45;
const MILESTONE_BRANCH_REJOIN_PADDING = DEFAULT_COLUMN_DISTANCE * 1.1;
const INTRO_SECTION_METERS = 10;
const MAIN_PATTERN_BLOCK_METERS = 100;
const FIRST_MILESTONE_CENTER_SHIFT_X = DEFAULT_COLUMN_DISTANCE * 0.42;
const MIN_STRUCTURAL_STEP_METERS = 0.9;
const MIN_BLOCK_NODE_TARGETS = {
  intro: 8,
  main: 16
} as const;
const EARLY_PATTERN_DISTANCE_METERS = 240;
const DENSITY_TAPER_END_METERS = 1000;
const EARLY_SUPPORT_BAND_FADE_END_METERS = 520;
const EARLY_SUPPORT_BAND_BASE_PROBABILITY = 0.98;
const EARLY_SUPPORT_BAND_MIN_PROBABILITY = 0.28;
const EARLY_SUPPORT_BAND_MAX_STEP = DEFAULT_COLUMN_DISTANCE * 1.7;
const EARLY_SUPPORT_BAND_MIN_STEP = DEFAULT_COLUMN_DISTANCE * 0.98;
const EARLY_SUPPORT_BAND_WAVE_AMPLITUDE = 0.74;
const EARLY_SUPPORT_BAND_TILT_RADIANS = 0.2;
const EARLY_SUPPORT_BAND_BOTTOM_OFFSET_PX = DEFAULT_COLUMN_DISTANCE * 0.88;
const EARLY_SUPPORT_BAND_MAX_COUNT = 10;
const EARLY_UPPER_RECOVERY_FADE_END_METERS = 380;


export class GamePathSystem {
  private nodes: GamePathNode[] = [];
  private eventSystem = new EventSystem();
  private seed = 1;
  private recentPatternIds: string[] = [];
  private lastShopDistanceMeters = Number.NEGATIVE_INFINITY;
  private guaranteedShopAt50Spawned = true;
  private rewardChanceBias = 0;
  private shopChanceBias = 0;
  private worldDirectionSign: 1 | -1 = 1;
  private worldOffsetX = 0;

  reset() {
    this.seed = (Math.random() * 0x7fffffff) | 1;
    this.recentPatternIds = [];
    this.eventSystem.reset();
    this.lastShopDistanceMeters = Number.NEGATIVE_INFINITY;
    this.guaranteedShopAt50Spawned = true;
    this.rewardChanceBias = 0;
    this.shopChanceBias = 0;
    this.worldDirectionSign = 1;
    this.worldOffsetX = 0;
    this.nodes = [
      {
        index: 0,
        x: -12,
        y: 0.8,
        z: 0,
        gameplayRadius: 1.86,
        visualScale: 1.92,
        pathDistance: 0,
        direction: 'right',
        kind: 'normal',
        sizeTier: 'medium',
        shapeKind: 'round',
        spinDirection: 'cw',
        spinSpeed: 0.18,
        motionPattern: 'none',
        eventType: 'none',
        colorHint: 'none',
        gameplayOrbitPeriod: 3.6,
        branchSlot: null,
        offerId: null,
        onboarding: true,
        isMilestone: false,
        isGigantic: false,
        coinSlots: [],
        enemySlot: null,
        motionSeed: this.nextRandom() * Math.PI * 2,
        visualStretch: { x: 1, y: 1, z: 1 }
      }
    ];
  }

  prebuild(initialCount: number) {
    if (this.nodes.length === 0) {
      this.reset();
    }
    this.append(Math.max(0, initialCount - this.nodes.length));
    this.ensureDeterministicFirstMilestone();
  }

  ensureAhead(currentIndex: number, threshold = 72, chunkSize = 48) {
    if (this.nodes.length === 0) {
      this.reset();
    }
    if (this.nodes.length - currentIndex > threshold) return;
    this.append(chunkSize);
    this.ensureDeterministicFirstMilestone();
  }

  queuePostMilestoneEvents(fromIndex: number, score: number) {
    this.eventSystem.schedulePostMilestoneEvents(fromIndex, score, () => this.nextRandom());
  }

  setEventBiases(rewardChance: number, shopChance: number) {
    this.rewardChanceBias = Math.max(0, rewardChance);
    this.shopChanceBias = Math.max(0, shopChance);
  }

  getInitialNodes(count: number) {
    this.prebuild(Math.max(220, count + 88));
    return this.nodes.slice(0, count);
  }

  private ensureDeterministicFirstMilestone() {
    // Structural milestone generation now happens during block construction.
  }

  getInitialPositions(count: number) {
    return this.getInitialNodes(count).map((node) => ({ x: this.projectWorldX(node.x), y: node.y, z: node.z }));
  }

  getNode(index: number) {
    this.ensureAhead(index + 1);
    return this.nodes[index] || null;
  }

  getWindow(start: number, count: number, elapsedTime: number, currentIndex: number) {
    this.ensureAhead(start + count);
    return this.nodes.slice(start, start + count).map((node) => this.projectResolvedNode(resolveRuntimeNode(node, elapsedTime, currentIndex)));
  }

  getResolvedNode(index: number, elapsedTime: number, currentIndex: number): ResolvedGamePathNode {
    this.ensureAhead(index + 1);
    const node = this.nodes[index] ?? this.nodes[this.nodes.length - 1]!;
    return this.projectResolvedNode(resolveRuntimeNode(node, elapsedTime, currentIndex));
  }

  activateLandingTriggeredMotion(index: number, activatedAt: number) {
    const node = this.nodes[index];
    if (!node || node.motionMode !== 'landing_once' || node.motionActivatedAt !== null) {
      return;
    }
    this.nodes[index] = {
      ...node,
      motionActivatedAt: activatedAt
    };
  }

  resolveExternalNode(node: GamePathNode, elapsedTime: number, currentIndex: number) {
    return this.projectResolvedNode(resolveRuntimeNode(node, elapsedTime, currentIndex));
  }

  setWorldDirectionTransform(directionSign: 1 | -1, anchorRawX = 0, anchorWorldX = anchorRawX) {
    this.worldDirectionSign = directionSign;
    this.worldOffsetX = anchorWorldX - directionSign * anchorRawX;
  }

  getWorldDirectionSign() {
    return this.worldDirectionSign;
  }

  projectWorldX(rawX: number) {
    return this.worldOffsetX + this.worldDirectionSign * rawX;
  }

  unprojectWorldX(worldX: number) {
    return (worldX - this.worldOffsetX) / this.worldDirectionSign;
  }

  replaceFuture(startIndex: number, nodes: GamePathNode[]) {
    const preserved = this.nodes.slice(0, startIndex + 1);
    const previous = preserved[preserved.length - 1] ?? null;
    const normalized: GamePathNode[] = [];

    nodes.forEach((node, offset) => {
      normalized.push(this.reindexNode(node, startIndex + offset + 1, offset === 0 ? previous : normalized[offset - 1]));
    });
    const insertedTail = normalized[normalized.length - 1] ?? previous;
    const rejoinMinX = (insertedTail?.x ?? previous?.x ?? 0) + MILESTONE_BRANCH_REJOIN_PADDING;
    const stitchedTail: GamePathNode[] = [];
    const futureTail = this.nodes.slice(startIndex + 1).filter((node) => node.kind !== 'branch' && node.colorHint !== 'reward');
    const seamStartIndex = futureTail.findIndex((node) => node.x >= rejoinMinX);

    if (seamStartIndex >= 0) {
      for (const node of futureTail.slice(seamStartIndex)) {
        if (node.isMilestone || node.isGigantic) {
          break;
        }

        const stitchPrevious = stitchedTail[stitchedTail.length - 1] ?? (normalized[normalized.length - 1] ?? previous);
        const stitchedNode = this.reindexNode(
          node,
          startIndex + normalized.length + stitchedTail.length + 1,
          stitchPrevious
        );

        if (!stitchPrevious) {
          stitchedTail.push(stitchedNode);
          continue;
        }

        const segmentDistance = Math.hypot(stitchedNode.x - stitchPrevious.x, stitchedNode.y - stitchPrevious.y);
        const maxAllowedDistance = getDifficultyProfile(stitchPrevious.index).maxJumpDistance * 1.02;
        if (segmentDistance > maxAllowedDistance) {
          break;
        }

        if (!this.validatePlacement([stitchedNode], preserved, [...normalized, ...stitchedTail])) {
          break;
        }

        stitchedTail.push(stitchedNode);
      }
    }

    this.nodes = [...preserved, ...normalized, ...stitchedTail];
  }

  ensureSprintFishLandingPath(anchorIndex: number, landingRawX: number, landingY: number) {
    this.ensureAhead(anchorIndex + 10, 90, 72);
    const clampedAnchorIndex = THREE.MathUtils.clamp(anchorIndex, 0, Math.max(0, this.nodes.length - 1));
    const anchorNode = this.nodes[clampedAnchorIndex];
    if (!anchorNode) {
      return clampedAnchorIndex + 1;
    }

    const score = anchorNode.index;
    const laneSpacing = getPathLaneSpacing(score);
    const landingSizeTier: GameShardSizeTier = 'large';
    const targetLandingX = Math.max(anchorNode.x + DEFAULT_COLUMN_DISTANCE * 1.85, landingRawX);
    const targetLandingY = THREE.MathUtils.clamp(
      this.alignToLane(landingY, score, landingSizeTier, false),
      -laneSpacing * 2.8,
      laneSpacing * 3.15
    );

    const existing = this.nodes
      .slice(clampedAnchorIndex + 1, Math.min(this.nodes.length, clampedAnchorIndex + 8))
      .find(
        (node) =>
          !node.isMilestone &&
          !node.isGigantic &&
          !node.enemySlot?.alive &&
          Math.abs(node.x - targetLandingX) <= DEFAULT_COLUMN_DISTANCE * 1.28 &&
          Math.abs(node.y - targetLandingY) <= laneSpacing * 0.9
      );
    if (existing) {
      return existing.index;
    }

    const landingNode = this.buildNode({
      previous: anchorNode,
      index: clampedAnchorIndex + 1,
      x: targetLandingX,
      y: targetLandingY,
      direction: this.directionFrom(anchorNode.x, anchorNode.y, targetLandingX, targetLandingY),
      sizeTier: landingSizeTier,
      shapeKind: 'round',
      motionPattern: 'none',
      motionMode: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      motionActivatedAt: null,
      spinDirection: 'cw',
      spinSpeed: 0.08 + this.nextRandom() * 0.03,
      gameplayRadius: 2.72,
      visualScale: 3.12,
      gameplayOrbitPeriod: 3.6,
      visualStretch: { x: 1.06, y: 0.96, z: 1 },
      kind: 'normal',
      branchSlot: null,
      offerId: null,
      onboarding: false,
      eventType: 'none',
      colorHint: 'none',
      isMilestone: false,
      isGigantic: false,
      coinSlots: [],
      enemySlot: null
    });

    const exit1X = landingNode.x + DEFAULT_COLUMN_DISTANCE * 2.15;
    const exit1Y = this.alignToLane(THREE.MathUtils.lerp(landingNode.y, 0, 0.18), score, 'medium_large', true);
    const exit1 = this.buildNode({
      previous: landingNode,
      index: clampedAnchorIndex + 2,
      x: exit1X,
      y: exit1Y,
      direction: this.directionFrom(landingNode.x, landingNode.y, exit1X, exit1Y),
      sizeTier: 'medium_large',
      shapeKind: 'round',
      motionPattern: 'none',
      motionMode: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      motionActivatedAt: null,
      spinDirection: 'ccw',
      spinSpeed: 0.08 + this.nextRandom() * 0.04,
      gameplayRadius: 2.08,
      visualScale: 2.42,
      gameplayOrbitPeriod: 3.2,
      visualStretch: { x: 1, y: 1, z: 1 },
      kind: 'normal',
      branchSlot: null,
      offerId: null,
      onboarding: false,
      eventType: 'none',
      colorHint: 'none',
      isMilestone: false,
      isGigantic: false,
      coinSlots: [],
      enemySlot: null
    });

    const exit2X = exit1.x + DEFAULT_COLUMN_DISTANCE * 1.82;
    const exit2Y = this.alignToLane(THREE.MathUtils.lerp(exit1.y, 0, 0.24), score, 'medium', true);
    const exit2 = this.buildNode({
      previous: exit1,
      index: clampedAnchorIndex + 3,
      x: exit2X,
      y: exit2Y,
      direction: this.directionFrom(exit1.x, exit1.y, exit2X, exit2Y),
      sizeTier: 'medium',
      shapeKind: 'round',
      motionPattern: 'none',
      motionMode: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      motionActivatedAt: null,
      spinDirection: 'cw',
      spinSpeed: 0.07 + this.nextRandom() * 0.04,
      gameplayRadius: 1.76,
      visualScale: 2.08,
      gameplayOrbitPeriod: 3,
      visualStretch: { x: 1, y: 1, z: 1 },
      kind: 'normal',
      branchSlot: null,
      offerId: null,
      onboarding: false,
      eventType: 'none',
      colorHint: 'none',
      isMilestone: false,
      isGigantic: false,
      coinSlots: [],
      enemySlot: null
    });

    this.replaceFuture(clampedAnchorIndex, [landingNode, exit1, exit2]);
    return clampedAnchorIndex + 1;
  }

  createUpgradeBranches(milestoneIndex: number, offers: RogueliteItemOffer[], score: number): BranchChoice[] {
    const milestone = this.getNode(milestoneIndex);
    if (!milestone) return [];

    const laneSpacing = getPathLaneSpacing(score);
    const branchEntryX = milestone.x + MILESTONE_REWARD_OFFSET;
    const definitions = [
      { slot: 0 as const, yBias: laneSpacing * 2.1, direction: 'up_right' as const },
      { slot: 1 as const, yBias: 0, direction: 'right' as const },
      { slot: 2 as const, yBias: -laneSpacing * 2.1, direction: 'down_right' as const }
    ];

    return offers.slice(0, 3).map((offer, index) => {
      const branch = definitions[index] ?? definitions[1];
      const sizeTier: GameShardSizeTier = 'medium';
      const sizeConfig = SIZE_TIER_CONFIG[sizeTier];
      const gameplayRadius = sizeConfig.radius[0] + this.nextRandom() * (sizeConfig.radius[1] - sizeConfig.radius[0]);
      const visualScale = sizeConfig.visual[0] + this.nextRandom() * (sizeConfig.visual[1] - sizeConfig.visual[0]);
      const orbitPeriod = sizeConfig.orbitPeriod[0] + this.nextRandom() * (sizeConfig.orbitPeriod[1] - sizeConfig.orbitPeriod[0]);
      const entry = this.buildNode({
        previous: milestone,
        index: milestoneIndex + 1,
        x: branchEntryX,
        y: milestone.y + branch.yBias,
        direction: branch.direction,
        sizeTier,
        shapeKind: 'round',
        motionPattern: 'none',
        spinDirection: index === 1 ? 'cw' : 'ccw',
        spinSpeed: 0.14 + index * 0.03 + this.nextRandom() * 0.04,
        gameplayRadius,
        visualScale,
        gameplayOrbitPeriod: orbitPeriod,
        visualStretch: { x: 1, y: 1, z: 1 },
        kind: 'branch',
        branchSlot: branch.slot,
        offerId: offer.item.id,
        onboarding: false,
        eventType: 'none',
        colorHint: 'reward',
        isMilestone: false,
        isGigantic: false,
        coinSlots: [{ angle: Math.PI * 0.5, value: 1, collected: false, orbitScale: 1 }],
        enemySlot: null
      });

      const exitSizeTier: GameShardSizeTier = 'medium_small';
      const exitSizeConfig = SIZE_TIER_CONFIG[exitSizeTier];
      const exitGameplayRadius =
        exitSizeConfig.radius[0] + this.nextRandom() * (exitSizeConfig.radius[1] - exitSizeConfig.radius[0]);
      const exitVisualScale =
        exitSizeConfig.visual[0] + this.nextRandom() * (exitSizeConfig.visual[1] - exitSizeConfig.visual[0]);
      const exitOrbitPeriod =
        exitSizeConfig.orbitPeriod[0] + this.nextRandom() * (exitSizeConfig.orbitPeriod[1] - exitSizeConfig.orbitPeriod[0]);
      const exit = this.buildNode({
        previous: entry,
        index: milestoneIndex + 2,
        x: Math.max(
          entry.x + DEFAULT_COLUMN_DISTANCE * 2.4,
          milestone.x + MILESTONE_REWARD_OFFSET + MILESTONE_RESERVED_AFTER + MILESTONE_EXIT_BUFFER + DEFAULT_COLUMN_DISTANCE * 0.9
        ),
        y: entry.y,
        direction: 'right',
        sizeTier: exitSizeTier,
        shapeKind: 'round',
        motionPattern: 'none',
        spinDirection: 'cw',
        spinSpeed: 0.08 + this.nextRandom() * 0.05,
        gameplayRadius: exitGameplayRadius,
        visualScale: exitVisualScale,
        gameplayOrbitPeriod: exitOrbitPeriod,
        visualStretch: { x: 1, y: 1, z: 1 },
        kind: 'normal',
        branchSlot: null,
        offerId: null,
        onboarding: false,
        eventType: 'none',
        colorHint: 'none',
        isMilestone: false,
        isGigantic: false,
        coinSlots: [],
        enemySlot: null
      });

      return {
        mode: 'reward_branch',
        offer,
        entry,
        previewNodes: [entry],
        pathNodes: [entry, exit]
      };
    });
  }

  createHiddenMilestoneBackBranch(milestoneIndex: number, offer: RogueliteItemOffer) {
    const milestone = this.getNode(milestoneIndex);
    if (!milestone) return null;

    const entrySizeTier: GameShardSizeTier = 'medium_small';
    const entrySizeConfig = SIZE_TIER_CONFIG[entrySizeTier];
    const entryGameplayRadius =
      entrySizeConfig.radius[0] + this.nextRandom() * (entrySizeConfig.radius[1] - entrySizeConfig.radius[0]);
    const entryVisualScale =
      entrySizeConfig.visual[0] + this.nextRandom() * (entrySizeConfig.visual[1] - entrySizeConfig.visual[0]);
    const entryOrbitPeriod =
      entrySizeConfig.orbitPeriod[0] + this.nextRandom() * (entrySizeConfig.orbitPeriod[1] - entrySizeConfig.orbitPeriod[0]);
    const entry = this.buildNode({
      previous: milestone,
      index: milestoneIndex + 1,
      x: milestone.x - DEFAULT_COLUMN_DISTANCE * 2.8,
      y: milestone.y + DEFAULT_COLUMN_DISTANCE * 0.22,
      direction: 'up_left',
      sizeTier: entrySizeTier,
      shapeKind: 'round',
      motionPattern: 'none',
      spinDirection: 'ccw',
      spinSpeed: 0.12 + this.nextRandom() * 0.04,
      gameplayRadius: entryGameplayRadius,
      visualScale: entryVisualScale,
      gameplayOrbitPeriod: entryOrbitPeriod,
      visualStretch: { x: 1, y: 1, z: 1 },
      kind: 'branch',
      branchSlot: 3,
      offerId: offer.item.id,
      onboarding: false,
      eventType: 'none',
      colorHint: 'reward',
      isMilestone: false,
      isGigantic: false,
      coinSlots: [{ angle: Math.PI * 0.52, value: 1, collected: false, orbitScale: 1.14 }],
      enemySlot: null
    });

    const exitSizeTier: GameShardSizeTier = 'medium_small';
    const exitSizeConfig = SIZE_TIER_CONFIG[exitSizeTier];
    const exitGameplayRadius =
      exitSizeConfig.radius[0] + this.nextRandom() * (exitSizeConfig.radius[1] - exitSizeConfig.radius[0]);
    const exitVisualScale =
      exitSizeConfig.visual[0] + this.nextRandom() * (exitSizeConfig.visual[1] - exitSizeConfig.visual[0]);
    const exitOrbitPeriod =
      exitSizeConfig.orbitPeriod[0] + this.nextRandom() * (exitSizeConfig.orbitPeriod[1] - exitSizeConfig.orbitPeriod[0]);
    const exit = this.buildNode({
      previous: entry,
      index: milestoneIndex + 2,
      x: milestone.x + DEFAULT_COLUMN_DISTANCE * 4.8,
      y: milestone.y,
      direction: 'right',
      sizeTier: exitSizeTier,
      shapeKind: 'round',
      motionPattern: 'none',
      spinDirection: 'cw',
      spinSpeed: 0.08 + this.nextRandom() * 0.04,
      gameplayRadius: exitGameplayRadius,
      visualScale: exitVisualScale,
      gameplayOrbitPeriod: exitOrbitPeriod,
      visualStretch: { x: 1, y: 1, z: 1 },
      kind: 'normal',
      branchSlot: null,
      offerId: null,
      onboarding: false,
      eventType: 'none',
      colorHint: 'none',
      isMilestone: false,
      isGigantic: false,
      coinSlots: [],
      enemySlot: null
    });

    return {
      mode: 'reward_branch' as const,
      offer,
      entry,
      previewNodes: [entry],
      pathNodes: [entry, exit]
    };
  }

  getTeleportTarget(fromIndex: number, range: number) {
    let bestIndex = -1;
    let bestRadius = Number.POSITIVE_INFINITY;

    for (const candidate of this.getTeleportCandidates(fromIndex, range)) {
      const node = this.nodes[candidate];
      if (!node || node.enemySlot?.alive) {
        continue;
      }
      if (node.gameplayRadius < bestRadius - 0.001) {
        bestRadius = node.gameplayRadius;
        bestIndex = candidate;
        continue;
      }
      if (Math.abs(node.gameplayRadius - bestRadius) <= 0.001 && candidate > bestIndex) {
        bestIndex = candidate;
      }
    }

    return bestIndex;
  }

  getTeleportCandidates(fromIndex: number, range: number) {
    this.ensureAhead(fromIndex + range + 60);
    const maxIndex = Math.min(this.nodes.length - 5, fromIndex + range);
    const candidates: number[] = [];
    for (let candidate = fromIndex + 2; candidate <= maxIndex; candidate += 1) {
      if (validateTeleportTarget(this.nodes, fromIndex, candidate)) {
        candidates.push(candidate);
      }
    }
    return candidates;
  }

  sampleAtDistance(distance: number) {
    if (this.nodes.length === 0) {
      this.prebuild(2);
    }

    const clampedDistance = Math.max(0, distance);
    let previous = this.nodes[0]!;
    for (let index = 1; index < this.nodes.length; index += 1) {
      const node = this.nodes[index]!;
      if (node.pathDistance >= clampedDistance) {
        const segment = Math.max(0.0001, node.pathDistance - previous.pathDistance);
        const t = clamp((clampedDistance - previous.pathDistance) / segment, 0, 1);
        const x = previous.x + (node.x - previous.x) * t;
        const y = previous.y + (node.y - previous.y) * t;
        const length = Math.hypot(node.x - previous.x, node.y - previous.y) || 1;
        return {
          x: this.projectWorldX(x),
          y,
          z: 0,
          tangent: { x: ((node.x - previous.x) / length) * this.worldDirectionSign, y: (node.y - previous.y) / length }
        };
      }
      previous = node;
    }

    const last = this.nodes[this.nodes.length - 1]!;
    const before = this.nodes[this.nodes.length - 2] ?? last;
    const length = Math.hypot(last.x - before.x, last.y - before.y) || 1;
    return {
      x: this.projectWorldX(last.x),
      y: last.y,
      z: 0,
      tangent: { x: ((last.x - before.x) / length) * this.worldDirectionSign, y: (last.y - before.y) / length }
    };
  }

  private projectResolvedNode(node: ResolvedGamePathNode): ResolvedGamePathNode {
    if (this.worldDirectionSign === 1 && this.worldOffsetX === 0) {
      return node;
    }
    return {
      ...node,
      x: this.projectWorldX(node.x),
      resolvedX: this.projectWorldX(node.resolvedX),
      direction: this.projectDirection(node.direction)
    };
  }

  private projectDirection(direction: GamePathNode['direction']): GamePathNode['direction'] {
    if (this.worldDirectionSign === 1) {
      return direction;
    }
    switch (direction) {
      case 'up_right':
        return 'up_left';
      case 'down_right':
        return 'down_left';
      case 'up_left':
        return 'up_right';
      case 'down_left':
        return 'down_right';
      case 'right':
        return 'right';
      case 'up':
      default:
        return direction;
    }
  }

  private validatePlacement(candidateNodes: GamePathNode[], baseNodes: GamePathNode[], extraNodes: GamePathNode[] = []) {
    return validatePatternPlacement(candidateNodes, [...baseNodes, ...extraNodes]);
  }

  private append(minimumNodes: number) {
    if (minimumNodes <= 0) return;
    if (this.nodes.length === 0) {
      this.reset();
    }

    let appended = 0;
    while (appended < minimumNodes) {
      const previous = this.nodes[this.nodes.length - 1];
      if (!previous) {
        this.reset();
        continue;
      }
      const generated = this.buildNextStructuredBlock(previous);
      if (generated.length === 0) {
        const fallback = this.buildFallbackPattern(previous);
        this.nodes.push(...fallback);
        appended += fallback.length;
        continue;
      }
      this.nodes.push(...generated);
      appended += generated.length;
      const lastGenerated = generated[generated.length - 1];
      if (lastGenerated?.isMilestone) {
        this.queuePostMilestoneEvents(lastGenerated.index, lastGenerated.index);
      }
    }
  }

  private buildNextStructuredBlock(previous: GamePathNode) {
    const previousDistanceMeters = pathDistanceToMeters(previous.pathDistance);
    const targetMilestoneMeters = getNextUpgradeMilestone(previousDistanceMeters);
    const introBlock = targetMilestoneMeters === INTRO_SECTION_METERS;
    const blockKind = introBlock ? 'intro' as const : 'main' as const;
    const blockSpanMeters = introBlock ? INTRO_SECTION_METERS : MAIN_PATTERN_BLOCK_METERS;
    const blockStartMeters = Math.max(0, targetMilestoneMeters - blockSpanMeters);
    const blockIndex = introBlock ? 0 : Math.max(0, Math.floor((targetMilestoneMeters - 110) / MAIN_PATTERN_BLOCK_METERS));
    const pattern = selectPattern({
      score: this.nodes.length,
      distanceMeters: previousDistanceMeters,
      blockKind,
      blockIndex,
      rng: () => this.nextRandom(),
      recentPatternIds: this.recentPatternIds
    });

    const contentNodes = pattern && Array.isArray(pattern.nodes) && pattern.nodes.length > 0
      ? this.buildStructuredContentNodes(previous, pattern, blockStartMeters, targetMilestoneMeters, blockKind)
      : [];
    const withApproach = this.buildApproachNodes(previous, contentNodes, targetMilestoneMeters, blockKind);
    const milestoneBase = withApproach[withApproach.length - 1] ?? previous;
    const milestoneNode = this.buildMilestoneNode(milestoneBase, targetMilestoneMeters);
    const generated = [...withApproach, milestoneNode];

    if (pattern) {
      this.recentPatternIds.push(pattern.id);
      if (this.recentPatternIds.length > 6) {
        this.recentPatternIds.shift();
      }
    }

    return generated;
  }

  private getNodeHorizontalHalfWidth(
    node: Pick<GamePathNode, 'shapeKind' | 'gameplayRadius' | 'visualScale' | 'visualStretch' | 'isGigantic'>
  ) {
    const geometryBaseX = node.shapeKind === 'triangular' ? 1.24 * 0.866 : node.shapeKind === 'oval' ? 1.18 : 1.25;
    const renderedHalfWidth = geometryBaseX * node.visualScale * node.visualStretch.x * 0.92;
    const physicalHalfWidth = node.isGigantic ? renderedHalfWidth * 1.02 : renderedHalfWidth;
    return Math.max(node.gameplayRadius, physicalHalfWidth);
  }

  private getMilestoneCenterX(targetMilestoneMeters: number) {
    const baseCenterX = targetMilestoneMeters * DEFAULT_COLUMN_DISTANCE;
    if (targetMilestoneMeters === INTRO_SECTION_METERS) {
      return baseCenterX - FIRST_MILESTONE_CENTER_SHIFT_X;
    }
    return baseCenterX;
  }

  private getFutureMilestoneStructuralRange(targetMilestoneMeters: number) {
    const centerX = this.getMilestoneCenterX(targetMilestoneMeters);
    const milestoneVisualScale = MILESTONE_HALF_WIDTH / (1.25 * 0.92);
    const halfWidth = this.getNodeHorizontalHalfWidth({
      shapeKind: 'round',
      gameplayRadius: MILESTONE_HALF_WIDTH,
      visualScale: milestoneVisualScale,
      visualStretch: { x: 1, y: 1, z: 1 },
      isGigantic: true
    });
    const preClearance = DEFAULT_COLUMN_DISTANCE * 0.28;
    const postClearance = DEFAULT_COLUMN_DISTANCE * 0.34;
    const startX = centerX - halfWidth - preClearance;
    const endX = centerX + halfWidth + postClearance;
    return {
      centerX,
      startX,
      endX,
      startMeters: pathDistanceToMeters(startX),
      endMeters: pathDistanceToMeters(endX),
      halfWidth
    };
  }

  private getMilestoneApproachTargets(targetMilestoneMeters: number, blockKind: 'intro' | 'main') {
    const structuralRange = this.getFutureMilestoneStructuralRange(targetMilestoneMeters);
    const offsets =
      blockKind === 'intro'
        ? [0.26]
        : [5.2, 2.7, 0.78];
    return offsets
      .map((offset) => structuralRange.startMeters - offset)
      .filter((targetMeters, index, targets) => index === 0 || targetMeters > targets[index - 1]! + 0.4);
  }

  private nodeIntersectsFutureMilestoneRange(node: GamePathNode, targetMilestoneMeters: number) {
    if (node.isMilestone) {
      return false;
    }
    const structuralRange = this.getFutureMilestoneStructuralRange(targetMilestoneMeters);
    const halfWidth = this.getNodeHorizontalHalfWidth(node);
    return node.x + halfWidth > structuralRange.startX && node.x - halfWidth < structuralRange.endX;
  }

  private trimNodesForFutureMilestone(previous: GamePathNode, nodes: GamePathNode[], targetMilestoneMeters: number) {
    if (nodes.length === 0) {
      return nodes;
    }

    const filtered = nodes.filter((node) => !this.nodeIntersectsFutureMilestoneRange(node, targetMilestoneMeters));
    return this.normalizePatternNodes(previous, filtered);
  }

  private enrichStructuredPatternNodes(
    previous: GamePathNode,
    nodes: GamePathNode[],
    score: number,
    distanceMeters: number,
    targetMilestoneMeters: number,
    blockKind: 'intro' | 'main'
  ) {
    if (nodes.length === 0) {
      return nodes;
    }

    let working = this.trimNodesForFutureMilestone(previous, nodes, targetMilestoneMeters);
    working = this.trimNodesForFutureMilestone(previous, this.densifyPattern(previous, working, score, distanceMeters), targetMilestoneMeters);
    working = this.trimNodesForFutureMilestone(previous, this.expandLanePresence(previous, working, score, distanceMeters), targetMilestoneMeters);
    if (blockKind === 'intro' || distanceMeters < EARLY_SUPPORT_BAND_FADE_END_METERS) {
      working = this.trimNodesForFutureMilestone(previous, this.injectLowerSupportBand(previous, working, score, distanceMeters), targetMilestoneMeters);
    }
    if (blockKind === 'intro' || distanceMeters < EARLY_UPPER_RECOVERY_FADE_END_METERS) {
      working = this.trimNodesForFutureMilestone(previous, this.injectUpperRecoveryBand(previous, working, score, distanceMeters), targetMilestoneMeters);
    }
    const stabilized = this.stabilizeStructuredNodes(previous, working, targetMilestoneMeters);
    return this.reinforceStructuredDensity(previous, stabilized, score, distanceMeters, targetMilestoneMeters, blockKind);
  }

  private stabilizeStructuredNodes(previous: GamePathNode, nodes: GamePathNode[], targetMilestoneMeters: number) {
    if (nodes.length === 0) {
      return nodes;
    }

    const ordered = [...nodes].sort((left, right) => left.x - right.x);
    const stabilized: GamePathNode[] = [];

    ordered.forEach((node) => {
      const normalized = this.reindexNode(node, previous.index + stabilized.length + 1, stabilized[stabilized.length - 1] ?? previous);
      if (this.nodeIntersectsFutureMilestoneRange(normalized, targetMilestoneMeters)) {
        return;
      }
      if (!this.validatePlacement([normalized], this.nodes, stabilized)) {
        return;
      }
      stabilized.push(normalized);
    });

    return stabilized;
  }

  private reinforceStructuredDensity(
    previous: GamePathNode,
    nodes: GamePathNode[],
    score: number,
    distanceMeters: number,
    targetMilestoneMeters: number,
    blockKind: 'intro' | 'main'
  ) {
    let working = [...nodes];
    const desiredCount =
      blockKind === 'intro'
        ? Math.max(12, working.length)
        : distanceMeters < EARLY_PATTERN_DISTANCE_METERS
          ? Math.max(22, working.length)
          : Math.max(16, working.length);
    const gapThresholdMeters = blockKind === 'intro' ? 1.18 : distanceMeters < EARLY_PATTERN_DISTANCE_METERS ? 1.34 : 1.62;

    for (let attempt = 0; attempt < desiredCount - working.length; attempt += 1) {
      const anchors = [previous, ...working];
      let inserted = false;

      for (let index = 1; index < anchors.length; index += 1) {
        const left = anchors[index - 1]!;
        const right = anchors[index]!;
        const leftMeters = pathDistanceToMeters(left.pathDistance);
        const rightMeters = pathDistanceToMeters(right.pathDistance);
        const gapMeters = rightMeters - leftMeters;
        if (gapMeters < gapThresholdMeters) {
          continue;
        }

        const midpointMeters = leftMeters + gapMeters * 0.5;
        const midpointY = THREE.MathUtils.lerp(left.y, right.y, 0.5);
        const yBias = THREE.MathUtils.clamp(midpointY / Math.max(0.001, getPathLaneSpacing(score)), -3.2, 3.2);
        const motionPattern: GameShardMotionPattern =
          blockKind === 'intro'
            ? attempt % 2 === 0
              ? 'vertical'
              : 'drift'
            : attempt % 3 === 0
              ? 'horizontal'
              : attempt % 2 === 0
                ? 'vertical'
                : 'none';
        const candidate = this.buildNodeAtTargetMeters(left, midpointMeters, score, {
          yBias,
          sizeTier: attempt % 3 === 0 ? 'tiny' : attempt % 2 === 0 ? 'very_small' : 'small',
          shapeKind: 'round',
          motionPattern,
          motionDirection:
            motionPattern === 'horizontal'
              ? (yBias >= 0 ? 'left' : 'right')
              : motionPattern === 'drift'
                ? (yBias >= 0 ? 'up_right' : 'down_right')
                : motionPattern === 'vertical'
                  ? (yBias >= 0 ? 'up' : 'down')
                  : null,
          motionDistance:
            motionPattern === 'horizontal'
              ? DEFAULT_COLUMN_DISTANCE * 0.24
            : motionPattern === 'drift'
              ? DEFAULT_COLUMN_DISTANCE * 0.22
              : motionPattern === 'vertical'
                ? getPathLaneSpacing(score) * 0.56
                : 0,
          motionDuration: motionPattern === 'none' ? 0 : 1.02,
          difficultyPattern: null,
          template: {
            x: midpointMeters,
            y: yBias
          }
        });
        if (!candidate || this.nodeIntersectsFutureMilestoneRange(candidate, targetMilestoneMeters)) {
          continue;
        }
        const others = working.filter((node) => node.index !== right.index || node.x !== right.x || node.y !== right.y);
        if (!this.validatePlacement([candidate], this.nodes, others)) {
          continue;
        }
        working = [...working, candidate].sort((leftNode, rightNode) => leftNode.x - rightNode.x);
        working = this.stabilizeStructuredNodes(previous, working, targetMilestoneMeters);
        inserted = true;
        break;
      }

      if (!inserted) {
        break;
      }
    }

    return this.promoteSafeMotionNodes(previous, working, score, distanceMeters, targetMilestoneMeters, blockKind);
  }

  private promoteSafeMotionNodes(
    previous: GamePathNode,
    nodes: GamePathNode[],
    score: number,
    distanceMeters: number,
    targetMilestoneMeters: number,
    blockKind: 'intro' | 'main'
  ) {
    const desiredMoving =
      blockKind === 'intro'
        ? 4
        : distanceMeters < EARLY_PATTERN_DISTANCE_METERS
          ? 8
          : 4;
    let movingCount = nodes.filter((node) => node.motionPattern !== 'none').length;
    if (movingCount >= desiredMoving) {
      return nodes;
    }

    const working = [...nodes];
    const motionOptions: GameShardMotionPattern[] = ['vertical', 'horizontal', 'drift'];

    for (let index = 0; index < working.length && movingCount < desiredMoving; index += 1) {
      const node = working[index]!;
      if (node.isMilestone || node.isGigantic || node.milestoneOwned || node.motionPattern !== 'none') {
        continue;
      }
      if (node.sizeTier === 'large' || node.sizeTier === 'very_large' || node.sizeTier === 'huge' || node.sizeTier === 'massive') {
        continue;
      }

      for (const motionPattern of motionOptions) {
        const proposed: GamePathNode = {
          ...node,
          shapeKind: 'round',
          motionPattern,
          motionMode: 'landing_once',
          motionDirection:
            motionPattern === 'horizontal'
              ? (node.y >= 0 ? 'left' : 'right')
              : motionPattern === 'drift'
                ? (node.y >= 0 ? 'up_right' : 'down_right')
                : (node.y >= 0 ? 'up' : 'down'),
          motionDistance:
            motionPattern === 'horizontal'
              ? DEFAULT_COLUMN_DISTANCE * 0.24
              : motionPattern === 'drift'
                ? DEFAULT_COLUMN_DISTANCE * 0.22
                : getPathLaneSpacing(score) * 0.54,
          motionDuration: 1.02
        };
        if (this.nodeIntersectsFutureMilestoneRange(proposed, targetMilestoneMeters)) {
          continue;
        }
        const others = working.filter((_, otherIndex) => otherIndex !== index);
        if (!this.validatePlacement([proposed], this.nodes, others)) {
          continue;
        }
        working[index] = proposed;
        movingCount += 1;
        break;
      }
    }

    return this.stabilizeStructuredNodes(previous, working, targetMilestoneMeters);
  }

  private buildStructuredContentNodes(
    previous: GamePathNode,
    pattern: GamePathPattern,
    blockStartMeters: number,
    targetMilestoneMeters: number,
    blockKind: 'intro' | 'main'
  ) {
    const score = previous.index;
    const previousDistanceMeters = pathDistanceToMeters(previous.pathDistance);
    const approachTargets = this.getMilestoneApproachTargets(targetMilestoneMeters, blockKind);
    const firstApproachTarget = approachTargets[0] ?? targetMilestoneMeters;
    const contentEndMeters = Math.max(previousDistanceMeters + MIN_STRUCTURAL_STEP_METERS, firstApproachTarget - (blockKind === 'intro' ? 0.38 : 0.82));
    const generated: GamePathNode[] = previous.isMilestone ? this.buildMilestoneExitNodes(previous, score) : [];
    let cursor = generated[generated.length - 1] ?? previous;
    const progressMeters = Math.max(0, pathDistanceToMeters(cursor.pathDistance) - blockStartMeters);

    for (const template of pattern.nodes) {
      if (template.x <= progressMeters + 0.001 || template.x >= contentEndMeters - blockStartMeters) {
        continue;
      }
      const segmentNodes = this.buildSegmentNodesToTarget(cursor, pattern, template, blockStartMeters + template.x, score, generated);
      if (segmentNodes.length === 0) {
        continue;
      }
      generated.push(...segmentNodes);
      cursor = segmentNodes[segmentNodes.length - 1] ?? cursor;
    }

    const enriched = this.enrichStructuredPatternNodes(previous, generated, score, previousDistanceMeters, targetMilestoneMeters, blockKind);

    const minimumTarget = MIN_BLOCK_NODE_TARGETS[blockKind];
    if (enriched.length < minimumTarget) {
      const withFallback = this.buildFallbackStructuredContent(previous, enriched, contentEndMeters, minimumTarget - enriched.length, score);
      return this.enrichStructuredPatternNodes(previous, withFallback, score, previousDistanceMeters, targetMilestoneMeters, blockKind);
    }

    return enriched;
  }

  private buildMilestoneExitNodes(previous: GamePathNode, score: number) {
    const milestoneMeters = pathDistanceToMeters(previous.pathDistance);
    const exitStartMeters = milestoneMeters + 1.32;
    const exitTargets = [
      { targetMeters: exitStartMeters, yBias: 0.9, sizeTier: 'medium_small' as GameShardSizeTier, motionPattern: 'vertical' as GameShardMotionPattern },
      { targetMeters: exitStartMeters + 2.05, yBias: -0.8, sizeTier: 'small' as GameShardSizeTier, motionPattern: 'horizontal' as GameShardMotionPattern },
      { targetMeters: exitStartMeters + 4.3, yBias: 1.2, sizeTier: 'medium_small' as GameShardSizeTier, motionPattern: 'none' as GameShardMotionPattern },
      { targetMeters: exitStartMeters + 6.55, yBias: -1.1, sizeTier: 'small' as GameShardSizeTier, motionPattern: 'drift' as GameShardMotionPattern }
    ];
    const generated: GamePathNode[] = [];
    let cursor = previous;

    exitTargets.forEach((layout, index) => {
      const candidate = this.buildNodeAtTargetMeters(
        cursor,
        layout.targetMeters,
        score,
        {
          yBias: layout.yBias,
          sizeTier: layout.sizeTier,
          shapeKind: 'round',
          motionPattern: layout.motionPattern,
          motionDirection:
            layout.motionPattern === 'vertical'
              ? 'up'
              : layout.motionPattern === 'horizontal'
                ? (index % 2 === 0 ? 'right' : 'left')
                : layout.motionPattern === 'drift'
                  ? (layout.yBias >= 0 ? 'up_right' : 'down_right')
                : null,
          motionDistance:
            layout.motionPattern === 'vertical'
              ? getPathLaneSpacing(score) * 0.92
              : layout.motionPattern === 'horizontal'
                ? DEFAULT_COLUMN_DISTANCE * 0.46
                : layout.motionPattern === 'drift'
                  ? DEFAULT_COLUMN_DISTANCE * 0.42
                : 0,
          motionDuration: layout.motionPattern === 'none' ? 0 : 1.04,
          difficultyPattern: null,
          template: {
            x: layout.targetMeters,
            y: layout.yBias,
            sizeTier: layout.sizeTier
          },
          overrides: {
            milestoneOwned: true
          }
        }
      );
      if (!candidate || !this.validatePlacement([candidate], this.nodes, generated)) {
        return;
      }
      generated.push(candidate);
      cursor = candidate;
    });

    return generated;
  }

  private buildSegmentNodesToTarget(
    previous: GamePathNode,
    pattern: GamePathPattern,
    template: GamePatternNodeTemplate,
    targetMeters: number,
    score: number,
    generated: GamePathNode[]
  ) {
    const currentMeters = pathDistanceToMeters(previous.pathDistance);
    const deltaMeters = targetMeters - currentMeters;
    if (deltaMeters <= 0.01) {
      return [];
    }

    const profile = getDifficultyProfile(score);
    const maxStepMeters = Math.max(1.15, (profile.maxJumpDistance * 0.76) / DEFAULT_COLUMN_DISTANCE);
    const stepCount = Math.max(1, Math.ceil(deltaMeters / maxStepMeters));
    const previousBias = previous.y / getPathLaneSpacing(score);
    const segmentNodes: GamePathNode[] = [];
    let cursor = previous;

    for (let step = 1; step <= stepCount; step += 1) {
      const ratio = step / stepCount;
      const targetStepMeters = currentMeters + deltaMeters * ratio;
      const finalStep = step === stepCount;
      const interpolatedBias = THREE.MathUtils.lerp(previousBias, template.y, ratio);
      const wave =
        stepCount > 2 && !finalStep
          ? Math.sin((ratio + previous.index * 0.07) * Math.PI) * (template.y >= previousBias ? 0.38 : -0.38)
          : 0;
      const yBias = interpolatedBias + wave;
      const sizeTier = finalStep
        ? template.sizeTier ?? this.pickSizeTier(pattern.allowedShardSizes, score)
        : this.pickCompanionSizeTier(template.sizeTier ?? 'medium_small');
      const finalStepMotionPattern =
        template.motionPattern ??
        (pattern.movementType === 'moving'
          ? (Math.abs(yBias) > 1.8 ? 'vertical' : 'drift')
          : pattern.movementType === 'mixed' && this.nextRandom() < 0.32
            ? 'horizontal'
            : 'none');
      const motionPattern = finalStep
        ? finalStepMotionPattern
        : pattern.movementType === 'moving' && this.nextRandom() < 0.42
          ? (Math.abs(yBias) > 1.8 ? 'vertical' : 'drift')
          : pattern.movementType === 'mixed' && this.nextRandom() < 0.22
            ? 'horizontal'
            : 'none';
      const motionDirection =
        finalStep
          ? template.motionDirection ?? null
          : motionPattern === 'horizontal'
            ? (yBias >= 0 ? 'left' : 'right')
            : motionPattern === 'vertical'
              ? (yBias >= 0 ? 'up' : 'down')
              : motionPattern === 'drift'
                ? (yBias >= 0 ? 'up_right' : 'down_right')
                : null;
      const candidate = this.buildNodeAtTargetMeters(cursor, targetStepMeters, score, {
        yBias,
        sizeTier,
        shapeKind: finalStep ? this.pickShapeKind(pattern.allowedShapeKinds, score) : this.pickShapeKind(['round', 'oval'] as GameShardShapeKind[], score),
        motionPattern,
        motionDirection,
        motionDistance: finalStep ? template.motionDistance ?? 0 : DEFAULT_COLUMN_DISTANCE * 0.44,
        motionDuration: finalStep ? template.motionDuration ?? 0 : 1.02,
        difficultyPattern: pattern,
        template: {
          ...template,
          coinAngles: finalStep ? template.coinAngles : undefined,
          enemyPole: finalStep ? template.enemyPole : null,
          sizeTier
        }
      });
      if (!candidate) {
        continue;
      }
      if (!this.validatePlacement([candidate], this.nodes, [...generated, ...segmentNodes])) {
        continue;
      }
      segmentNodes.push(candidate);
      cursor = candidate;
    }

    return segmentNodes;
  }

  private buildFallbackStructuredContent(
    previous: GamePathNode,
    existing: GamePathNode[],
    contentEndMeters: number,
    targetAdditionalCount: number,
    score: number
  ) {
    const generated = [...existing];
    let cursor = generated[generated.length - 1] ?? previous;
    const requestedAdditionalCount = Math.max(0, targetAdditionalCount);
    const profile = getDifficultyProfile(score);
    const maxStepMeters = Math.max(MIN_STRUCTURAL_STEP_METERS, (profile.maxJumpDistance * 0.72) / DEFAULT_COLUMN_DISTANCE);
    const initialCursorMeters = pathDistanceToMeters(cursor.pathDistance);
    const densityTaperProgress = THREE.MathUtils.clamp(
      (initialCursorMeters - EARLY_PATTERN_DISTANCE_METERS) / Math.max(1, DENSITY_TAPER_END_METERS - EARLY_PATTERN_DISTANCE_METERS),
      0,
      1
    );
    const lateBlockMultiplier =
      initialCursorMeters >= 310
        ? 5.4
        : initialCursorMeters >= 210
          ? 1.3
          : initialCursorMeters >= 110
            ? 1
            : 1;
    const densitySpacingMultiplier = Math.max(THREE.MathUtils.lerp(1, 2.2, densityTaperProgress), lateBlockMultiplier);
    const effectiveStepLimit = maxStepMeters * densitySpacingMultiplier;
    const milestoneBridgeLimitMeters = previous.isMilestone ? initialCursorMeters + 3.8 : Number.NEGATIVE_INFINITY;
    const remainingSpan = Math.max(0, contentEndMeters - initialCursorMeters);
    const spanRequiredCount =
      Math.ceil(remainingSpan / Math.max(0.001, effectiveStepLimit)) + (previous.isMilestone ? 2 : 1);
    const remaining = Math.max(requestedAdditionalCount, spanRequiredCount);
    if (remaining <= 0) {
      return generated;
    }

    const stepMeters = THREE.MathUtils.clamp(
      Math.max(MIN_STRUCTURAL_STEP_METERS, remainingSpan / (remaining + 1)),
      MIN_STRUCTURAL_STEP_METERS,
      effectiveStepLimit
    );

    for (let step = 0; step < remaining; step += 1) {
      const metersRemaining = Math.max(0, contentEndMeters - pathDistanceToMeters(cursor.pathDistance));
      if (metersRemaining <= 0.04) {
        break;
      }
      const targetMeters = Math.min(contentEndMeters, pathDistanceToMeters(cursor.pathDistance) + Math.min(stepMeters, metersRemaining));
      const phase = (cursor.index + step) % 6;
      const yBias = phase === 0 ? -3.1 : phase === 1 ? -1.4 : phase === 2 ? 1.2 : phase === 3 ? 3.2 : phase === 4 ? 0.4 : -0.4;
      const sizeTier: GameShardSizeTier = phase === 0 ? 'medium_small' : phase % 2 === 0 ? 'small' : 'very_small';
      const motionPattern: GameShardMotionPattern =
        phase === 1
          ? 'horizontal'
          : phase === 2
            ? 'vertical'
            : phase === 4
              ? 'drift'
              : phase === 5
                ? 'vertical'
                : 'none';
      const candidate = this.buildNodeAtTargetMeters(cursor, targetMeters, score, {
        yBias,
        sizeTier,
        shapeKind: this.pickShapeKind(['round', 'oval', 'triangular'] as GameShardShapeKind[], score),
        motionPattern,
        motionDirection:
          motionPattern === 'horizontal'
            ? (phase % 2 === 0 ? 'right' : 'left')
            : motionPattern === 'drift'
              ? (yBias >= 0 ? 'up_right' : 'down_right')
              : motionPattern === 'vertical'
                ? (yBias >= 0 ? 'up' : 'down')
                : null,
        motionDistance:
          motionPattern === 'horizontal'
            ? DEFAULT_COLUMN_DISTANCE * 0.42
            : motionPattern === 'drift'
              ? DEFAULT_COLUMN_DISTANCE * 0.38
              : motionPattern === 'vertical'
                ? getPathLaneSpacing(score) * 0.92
                : 0,
        motionDuration: motionPattern === 'none' ? 0 : 1.04,
        difficultyPattern: null,
        template: {
          x: targetMeters,
          y: yBias
        },
        overrides:
          previous.isMilestone && targetMeters <= milestoneBridgeLimitMeters
            ? {
                milestoneOwned: true
              }
            : undefined
      });
      if (!candidate || !this.validatePlacement([candidate], this.nodes, generated)) {
        continue;
      }
      generated.push(candidate);
      cursor = candidate;
    }

    return generated;
  }

  private buildApproachNodes(
    previous: GamePathNode,
    contentNodes: GamePathNode[],
    targetMilestoneMeters: number,
    blockKind: 'intro' | 'main'
  ) {
    const generated = [...contentNodes];
    let cursor = generated[generated.length - 1] ?? previous;
    const score = previous.index;
    const targetSequence = this.getMilestoneApproachTargets(targetMilestoneMeters, blockKind);

    targetSequence.forEach((targetMeters, approachIndex) => {
      if (targetMeters <= pathDistanceToMeters(cursor.pathDistance) + 0.05) {
        return;
      }
      const trendY = cursor.y * (approachIndex === targetSequence.length - 1 ? 0.16 : 0.38);
      const yBias =
        approachIndex === 0
          ? THREE.MathUtils.clamp(trendY, -getPathLaneSpacing(score) * 1.8, getPathLaneSpacing(score) * 1.8)
          : approachIndex === targetSequence.length - 1
            ? 0
            : THREE.MathUtils.clamp(trendY * 0.55, -getPathLaneSpacing(score), getPathLaneSpacing(score));
      const sizeTier: GameShardSizeTier =
        blockKind === 'intro' ? 'medium' : approachIndex === 0 ? 'medium_large' : approachIndex === 1 ? 'medium' : 'medium_small';
      const candidate = this.buildNodeAtTargetMeters(cursor, targetMeters, score, {
        yBias,
        sizeTier,
        shapeKind: 'round',
        motionPattern: blockKind === 'intro' ? 'vertical' : blockKind === 'main' && approachIndex === 0 ? 'drift' : 'none',
        motionDirection:
          blockKind === 'intro'
            ? (yBias >= 0 ? 'up' : 'down')
            : blockKind === 'main' && approachIndex === 0
              ? (yBias >= 0 ? 'down_right' : 'up_right')
              : null,
        motionDistance:
          blockKind === 'intro'
            ? getPathLaneSpacing(score) * 0.88
            : blockKind === 'main' && approachIndex === 0
              ? DEFAULT_COLUMN_DISTANCE * 0.42
              : 0,
        motionDuration: blockKind === 'intro' || (blockKind === 'main' && approachIndex === 0) ? 1.08 : 0,
        difficultyPattern: null,
        template: {
          x: targetMeters,
          y: yBias
        }
      });
      if (!candidate || !this.validatePlacement([candidate], this.nodes, generated)) {
        return;
      }
      generated.push(candidate);
      cursor = candidate;
    });

    return generated;
  }

  private buildMilestoneNode(previous: GamePathNode, targetMilestoneMeters: number) {
    const milestoneVisualScale = MILESTONE_HALF_WIDTH / (1.25 * 0.92);
    const rawNode = this.buildNodeAtTargetMeters(previous, targetMilestoneMeters, previous.index, {
      yBias: 0,
      sizeTier: 'massive',
      shapeKind: 'round',
      motionPattern: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      difficultyPattern: null,
      template: {
        x: targetMilestoneMeters,
        y: 0,
        sizeTier: 'massive'
      },
      overrides: {
        y: 0,
        gameplayRadius: MILESTONE_HALF_WIDTH,
        visualScale: milestoneVisualScale,
        gameplayOrbitPeriod: 5.4,
        visualStretch: { x: 1, y: 1, z: 1 },
        spinSpeed: 0.04,
        direction: 'right',
        kind: 'milestone',
        colorHint: 'none',
        isMilestone: true,
        isGigantic: true,
        eventType: 'none',
        eventVisualKind: 'default',
        guaranteedShopIcon: false,
        coinSlots: [],
        enemySlot: null
      }
    });
    if (!rawNode) {
      return this.buildFallbackPattern(previous)[0]!;
    }

    if (targetMilestoneMeters === INTRO_SECTION_METERS) {
      const structuralRange = this.getFutureMilestoneStructuralRange(targetMilestoneMeters);
      return {
        ...rawNode,
        x: structuralRange.centerX
      };
    }

    return rawNode;
  }

  private buildNodeAtTargetMeters(
    previous: GamePathNode,
    targetMeters: number,
    score: number,
    config: {
      yBias: number;
      sizeTier: GameShardSizeTier;
      shapeKind: GameShardShapeKind;
      motionPattern: GameShardMotionPattern;
      motionDirection: GameShardMotionDirection | null;
      motionDistance: number;
      motionDuration: number;
      difficultyPattern: GamePathPattern | null;
      template: GamePatternNodeTemplate;
      overrides?: Partial<GamePathNode>;
    }
  ) {
    const targetPathDistance = targetMeters * DEFAULT_COLUMN_DISTANCE;
    const segmentDistance = targetPathDistance - previous.pathDistance;
    if (segmentDistance <= DEFAULT_COLUMN_DISTANCE * 0.22) {
      return null;
    }

    const preferredY = this.alignToLane(config.yBias * getPathLaneSpacing(score) * 0.92, score, config.sizeTier, true);
    const maxDeltaY = Math.max(0.32, segmentDistance * 0.78);
    const targetY = THREE.MathUtils.clamp(preferredY, previous.y - maxDeltaY, previous.y + maxDeltaY);
    const x = previous.x + segmentDistance;
    const index = previous.index + 1;
    const previousDistanceMeters = pathDistanceToMeters(previous.pathDistance);
    const currentDistanceMeters = targetMeters;
    const { eventType, eventVisualKind, guaranteedRoundShop } = this.resolveEventType(
      index,
      previousDistanceMeters,
      currentDistanceMeters,
      score,
      config.template
    );
    const motionPattern = config.motionPattern !== 'none' ? this.pickMotionPattern(config.motionPattern, score, config.shapeKind, config.sizeTier) : 'none';
    const motionMode: GameShardMotionMode = motionPattern !== 'none' ? 'landing_once' : 'none';
    const motionDirection = motionPattern !== 'none' ? (config.motionDirection ?? (config.yBias >= 0 ? 'up' : 'down')) : null;
    const motionDistance = motionPattern !== 'none'
      ? this.resolveMotionDistance(config.motionDistance || undefined, config.motionPattern, score)
      : 0;
    const motionDuration = motionPattern !== 'none'
      ? THREE.MathUtils.clamp(config.motionDuration || 1 + this.nextRandom() * 0.22, 0.86, 1.35)
      : 0;
    const sizeConfig = SIZE_TIER_CONFIG[config.sizeTier];
    const gameplayRadius = sizeConfig.radius[0] + this.nextRandom() * (sizeConfig.radius[1] - sizeConfig.radius[0]);
    const visualScale = sizeConfig.visual[0] + this.nextRandom() * (sizeConfig.visual[1] - sizeConfig.visual[0]);
    const orbitPeriod = sizeConfig.orbitPeriod[0] + this.nextRandom() * (sizeConfig.orbitPeriod[1] - sizeConfig.orbitPeriod[0]);
    const stylizedShopVisual = eventVisualKind === 'shop' && !guaranteedRoundShop;
    const shapeKind =
      motionPattern !== 'none' || guaranteedRoundShop ? 'round' : stylizedShopVisual ? 'triangular' : config.shapeKind;
    const spinDirection: GameShardSpinDirection = stylizedShopVisual ? 'cw' : this.nextRandom() < 0.5 ? 'cw' : 'ccw';
    const spinSpeed =
      shapeKind === 'triangular'
        ? 0.42 + this.nextRandom() * 0.22
        : shapeKind === 'oval'
          ? 0.18 + this.nextRandom() * 0.1
          : 0.08 + this.nextRandom() * 0.12;
    const visualStretch =
      shapeKind === 'oval'
        ? { x: 1.72 + this.nextRandom() * 0.38, y: 0.68 + this.nextRandom() * 0.12, z: 0.82 + this.nextRandom() * 0.1 }
        : shapeKind === 'triangular'
          ? { x: 1.18 + this.nextRandom() * 0.18, y: 1.24 + this.nextRandom() * 0.16, z: 0.64 + this.nextRandom() * 0.12 }
          : { x: 1, y: 1, z: 1 };

    const baseNode = this.buildNode({
      previous,
      index,
      x,
      y: targetY,
      direction: this.directionFrom(previous.x, previous.y, x, targetY),
      sizeTier: config.sizeTier,
      shapeKind,
      motionPattern,
      motionMode,
      motionDirection,
      motionDistance,
      motionDuration,
      motionActivatedAt: null,
      spinDirection,
      spinSpeed,
      gameplayRadius,
      visualScale,
      gameplayOrbitPeriod: orbitPeriod,
      visualStretch,
      kind: eventType === 'none' ? 'normal' : 'event',
      branchSlot: null,
      offerId: null,
      onboarding: targetMeters < 18,
      eventType,
      eventVisualKind,
      guaranteedShopIcon: guaranteedRoundShop,
      colorHint: eventType === 'none' ? 'none' : 'accent',
      isMilestone: false,
      isGigantic: false,
      coinSlots: this.buildCoinSlots(config.template, eventType, score),
      enemySlot: this.buildEnemySlot(config.template, score, eventType, shapeKind)
    });

    const normalizedBaseNode = {
      ...baseNode,
      pathDistance: targetPathDistance
    };

    if (!config.overrides) {
      return normalizedBaseNode;
    }

    return {
      ...normalizedBaseNode,
      ...config.overrides,
      pathDistance: config.overrides.pathDistance ?? targetPathDistance
    };
  }

  private buildFallbackPattern(previous: GamePathNode) {
    const score = previous.index;
    const profile = getDifficultyProfile(score);
    const nodes: GamePathNode[] = [];
    const steps = 4;

    for (let offset = 0; offset < steps; offset += 1) {
      const index = previous.index + offset + 1;
      const nextPrevious = offset === 0 ? previous : nodes[offset - 1]!;
      const direction = nextPrevious.y > 9 ? 'down_right' : nextPrevious.y < -9 ? 'up_right' : offset % 2 === 0 ? 'up_right' : 'down_right';
      const vector = direction === 'up_right'
        ? { x: 1, y: 0.66 }
        : direction === 'down_right'
          ? { x: 1, y: -0.66 }
          : { x: 1, y: 0 };
      const spacing = profile.spacing * (0.68 + this.nextRandom() * 0.16);
      const x = nextPrevious.x + vector.x * spacing;
      const y = this.alignToLane(nextPrevious.y + vector.y * spacing * 1.08, score, offset % 2 === 0 ? 'small' : 'medium_small', true);
      nodes.push(this.buildNode({
        previous: nextPrevious,
        index,
        x,
        y,
        direction,
        sizeTier: offset % 2 === 0 ? 'small' : 'medium_small',
        shapeKind: this.pickShapeKind(['round', 'oval', 'triangular'] as GameShardShapeKind[], score),
        motionPattern: 'none',
        spinDirection: 'cw',
        spinSpeed: 0.14,
        gameplayRadius: offset % 2 === 0 ? 1.12 : 1.46,
        visualScale: offset % 2 === 0 ? 1.2 : 1.58,
        gameplayOrbitPeriod: offset % 2 === 0 ? 2.8 : 3.2,
        visualStretch: { x: 1, y: 1, z: 1 },
        kind: 'normal',
        branchSlot: null,
        offerId: null,
        onboarding: index < 50,
        eventType: 'none',
        colorHint: 'none',
        isMilestone: false,
        isGigantic: false,
        coinSlots: offset === 1 ? [{ angle: Math.PI * 0.6, value: 1, collected: false, orbitScale: 1 }] : [],
        enemySlot: null
      }));
    }

    return nodes;
  }

  private densifyPattern(previous: GamePathNode, candidates: GamePathNode[], score: number, distanceMeters: number) {
    if (candidates.length === 0) return candidates;

    const profile = getDifficultyProfile(score);
    const densityWindow =
      1 -
      THREE.MathUtils.smootherstep(
        clamp((distanceMeters - EARLY_PATTERN_DISTANCE_METERS) / (DENSITY_TAPER_END_METERS - EARLY_PATTERN_DISTANCE_METERS), 0, 1),
        0,
        1
      );
    const densified: GamePathNode[] = [];
    let cursor = previous;
    let flatRun = 0;
    const periodicVerticalWindow = score >= 50 && score % 36 < 12;

    candidates.forEach((candidate) => {
      const dx = candidate.x - cursor.x;
      const dy = candidate.y - cursor.y;
      const distance = Math.hypot(dx, dy);
      const nearlyFlat = Math.abs(dy) < profile.maxVerticalDelta * 0.2;
      flatRun = nearlyFlat ? flatRun + 1 : 0;
      const earlyVerticalBias = distanceMeters < EARLY_PATTERN_DISTANCE_METERS;
      const veryEarlyWindow = distanceMeters < 140;
      const largestRadius = Math.max(candidate.gameplayRadius, cursor.gameplayRadius);
      const clusterPotential = largestRadius < 1.05 ? 5 : largestRadius < 1.9 ? 3 : 2;
      const gapThreshold = profile.spacing * THREE.MathUtils.lerp(0.78, earlyVerticalBias ? 0.56 : 0.84, densityWindow);
      const verticalThreshold = profile.maxVerticalDelta * THREE.MathUtils.lerp(0.58, 0.42, densityWindow);
      const wideGapAnchor = earlyVerticalBias && distance > gapThreshold * (veryEarlyWindow ? 1.02 : 1.1);

      const needsExtra =
        score < 220 &&
        (
          distance > gapThreshold ||
          Math.abs(dy) > verticalThreshold ||
          flatRun >= (earlyVerticalBias || densityWindow > 0.44 ? 1 : 2) ||
          periodicVerticalWindow
        );

      if (needsExtra) {
        const baseInsertions =
          earlyVerticalBias || periodicVerticalWindow || densityWindow > 0.44 || distance > profile.spacing * 0.98 || Math.abs(dy) > profile.maxVerticalDelta * 0.68 ? 2 : 1;
        const insertions = Math.min(
          clusterPotential,
          baseInsertions + ((earlyVerticalBias || densityWindow > 0.62) && clusterPotential > 1 ? 1 : 0)
        );
        for (let step = 0; step < insertions; step += 1) {
          const ratio = (step + 1) / (insertions + 1);
          const offsetSign = (cursor.index + candidate.index + step) % 2 === 0 ? 1 : -1;
          const stackCenter = (insertions - 1) * 0.5;
          const stackOffset = (step - stackCenter) * (earlyVerticalBias ? 2.45 : 1.85);
          const verticalBias =
            nearlyFlat
              ? stackOffset + offsetSign * (earlyVerticalBias ? 0.85 : 0.55)
              : Math.sign(dy || offsetSign) * Math.min(earlyVerticalBias ? 2.8 : 2.2, Math.abs(dy) * 0.34) + stackOffset * 0.4;

          const bridgePrevious = densified[densified.length - 1] ?? cursor;
          const x = cursor.x + dx * ratio + (insertions >= 3 ? (step - stackCenter) * 0.18 : 0);
          const rawY = cursor.y + dy * ratio + verticalBias;
          const anchorStep = Math.round(stackCenter);
          const sizeTier: GameShardSizeTier =
            wideGapAnchor && step === anchorStep
              ? distance > gapThreshold * 1.26
                ? 'medium_large'
                : 'medium'
              : insertions >= 3
                ? 'tiny'
                : step === 0
                  ? 'small'
                  : 'very_small';
          const y = this.alignToLane(rawY, score, sizeTier, true);
          const gameplayRadius =
            sizeTier === 'medium_large'
              ? 1.82
              : sizeTier === 'medium'
                ? 1.56
                : sizeTier === 'small'
                  ? 1.04
                  : sizeTier === 'very_small'
                    ? 0.96
                    : 0.78;
          const visualScale =
            sizeTier === 'medium_large'
              ? 2.02
              : sizeTier === 'medium'
                ? 1.76
                : sizeTier === 'small'
                  ? 1.18
                  : sizeTier === 'very_small'
                    ? 1.08
                    : 0.86;
          const orbitPeriod =
            sizeTier === 'medium_large'
              ? 3.15
              : sizeTier === 'medium'
                ? 2.9
                : sizeTier === 'small'
                  ? 2.75
                  : sizeTier === 'very_small'
                    ? 2.75
                    : 2.4;
          densified.push(this.buildNode({
            previous: bridgePrevious,
            index: bridgePrevious.index + 1,
            x,
            y,
            direction: this.directionFrom(bridgePrevious.x, bridgePrevious.y, x, y),
            sizeTier,
            shapeKind: this.pickShapeKind(['round', 'oval', 'triangular'] as GameShardShapeKind[], score),
            motionPattern: 'none',
            motionMode: 'none',
            motionDirection: null,
            motionDistance: 0,
            motionDuration: 0,
            motionActivatedAt: null,
            spinDirection: this.nextRandom() < 0.5 ? 'cw' : 'ccw',
            spinSpeed: 0.1 + this.nextRandom() * 0.08,
            gameplayRadius,
            visualScale,
            gameplayOrbitPeriod: orbitPeriod,
            visualStretch: { x: 1, y: 1, z: 1 },
            kind: 'normal',
            branchSlot: null,
            offerId: null,
            onboarding: candidate.index < 50,
            eventType: 'none',
            colorHint: 'none',
            isMilestone: false,
            isGigantic: false,
            coinSlots: [],
            enemySlot: null
          }));
        }
      }

      densified.push(this.reindexNode(candidate, (densified[densified.length - 1] ?? cursor).index + 1, densified[densified.length - 1] ?? cursor));
      cursor = densified[densified.length - 1] ?? cursor;
    });

    const normalized: GamePathNode[] = [];
    densified.forEach((node, offset) => {
      normalized.push(this.reindexNode(node, previous.index + offset + 1, offset === 0 ? previous : normalized[offset - 1]));
    });
    return normalized;
  }

  private expandLanePresence(previous: GamePathNode, candidates: GamePathNode[], score: number, distanceMeters: number) {
    if (candidates.length === 0) return candidates;

    const laneTargets = getPathLaneTargets(score);
    const compactLaneTargets = laneTargets.filter((_, index) => index % 2 === 0);
    const expanded: GamePathNode[] = [];
    const periodicWindow = score >= 50 && score % 42 < 16;

    candidates.forEach((candidate) => {
      const anchorPrevious = expanded[expanded.length - 1] ?? previous;
      const normalizedMain = this.forceLargeShardCenter(candidate, score);
      const mainNode = this.reindexNode(normalizedMain, anchorPrevious.index + 1, anchorPrevious);
      expanded.push(mainNode);

      if (mainNode.isMilestone || mainNode.isGigantic) {
        return;
      }

      const earlyDenseWindow = distanceMeters < EARLY_PATTERN_DISTANCE_METERS;
      const largeShard = ['large', 'very_large', 'huge', 'massive'].includes(mainNode.sizeTier);
      if (largeShard) {
        const mainLane = this.getLaneIndex(mainNode.y, laneTargets);
        const supportLanes = [mainLane + 3, mainLane + 2, mainLane + 4, mainLane - 2, mainLane - 3].filter(
          (lane, index, lanes) => lane >= 0 && lane < laneTargets.length && lanes.indexOf(lane) === index
        );
        const supportCount = earlyDenseWindow ? 4 : 2;
        for (let supportIndex = 0; supportIndex < supportCount; supportIndex += 1) {
          const lane = supportLanes[supportIndex];
          if (lane === undefined) {
            break;
          }
          const prevNode = expanded[expanded.length - 1] ?? previous;
          const supportSize: GameShardSizeTier = supportIndex === 0 ? 'small' : 'very_small';
          const supportX = mainNode.x + 0.94 + supportIndex * 0.68 + (this.nextRandom() - 0.5) * 0.14;
          const supportY = laneTargets[lane]! + (this.nextRandom() - 0.5) * (supportSize === 'small' ? 0.38 : 0.3);
          const supportNode = this.buildNode({
            previous: prevNode,
            index: prevNode.index + 1,
            x: supportX,
            y: supportY,
            direction: this.directionFrom(prevNode.x, prevNode.y, supportX, supportY),
            sizeTier: supportSize,
            shapeKind: 'round',
            motionPattern: 'none',
            motionMode: 'none',
            motionDirection: null,
            motionDistance: 0,
            motionDuration: 0,
            motionActivatedAt: null,
            spinDirection: this.nextRandom() < 0.5 ? 'cw' : 'ccw',
            spinSpeed: 0.06 + this.nextRandom() * 0.05,
            gameplayRadius: supportSize === 'small' ? 1.02 : 0.88,
            visualScale: supportSize === 'small' ? 1.14 : 1.02,
            gameplayOrbitPeriod: supportSize === 'small' ? 2.82 : 2.56,
            visualStretch: { x: 1, y: 1, z: 1 },
            kind: 'normal',
            branchSlot: null,
            offerId: null,
            onboarding: prevNode.index < 50,
            eventType: 'none',
            colorHint: 'none',
            isMilestone: false,
            isGigantic: false,
            coinSlots: supportIndex < 2 && this.nextRandom() < 0.28 ? [{ angle: Math.PI * (0.28 + this.nextRandom() * 1.08), value: 1, collected: false, orbitScale: 1 }] : [],
            enemySlot: null
          });
          if (this.validatePlacement([supportNode], this.nodes, expanded)) {
            expanded.push(supportNode);
          }
        }
        return;
      }
      const tinyFamily =
        mainNode.sizeTier === 'tiny' ||
        mainNode.sizeTier === 'very_small' ||
        mainNode.sizeTier === 'small' ||
        mainNode.sizeTier === 'medium_small';
      const forceDenseCluster = earlyDenseWindow && tinyFamily;
      const shouldExpand = forceDenseCluster || periodicWindow || this.nextRandom() < 0.42;
      if (!shouldExpand) {
        return;
      }

      const fiveLaneMode =
        ((mainNode.sizeTier === 'tiny' || mainNode.sizeTier === 'very_small' || mainNode.sizeTier === 'small') && forceDenseCluster) ||
        (periodicWindow && this.nextRandom() < 0.36);
      const activeLaneTargets = fiveLaneMode ? compactLaneTargets : laneTargets;
      const centerLaneIndex = Math.floor(activeLaneTargets.length * 0.5);
      const mainLane = this.getLaneIndex(mainNode.y, activeLaneTargets);
      const companionOrder = this.buildCompanionLaneOrder(mainLane, activeLaneTargets.length);
      const maxCompanions =
        mainNode.sizeTier === 'tiny' || mainNode.sizeTier === 'very_small' || mainNode.sizeTier === 'small'
          ? (fiveLaneMode ? 4 : earlyDenseWindow ? 3 : 2)
          : mainNode.sizeTier === 'medium_small' || mainNode.sizeTier === 'medium'
            ? (fiveLaneMode ? 3 : earlyDenseWindow ? 2 : 1)
            : 0;

      for (let companionIndex = 0; companionIndex < maxCompanions; companionIndex += 1) {
        const lane = companionOrder[companionIndex];
        if (lane === undefined) break;
        const prevNode = expanded[expanded.length - 1] ?? previous;
        const companionSize = this.pickCompanionSizeTier(mainNode.sizeTier);
        const columnOffset = (companionIndex - (maxCompanions - 1) * 0.5) * (fiveLaneMode ? 0.12 : 0.18);
        const companionX =
          mainNode.x +
          0.5 +
          columnOffset +
          (this.nextRandom() - 0.5) * (forceDenseCluster ? 0.16 : 0.12);
        const companionY =
          activeLaneTargets[lane]! +
          (this.nextRandom() - 0.5) *
            (companionSize === 'tiny' ? 0.82 : companionSize === 'very_small' ? 0.64 : 0.5);
        const hasCoin = lane !== centerLaneIndex && this.nextRandom() < 0.34;
        const companionNode = this.buildNode({
          previous: prevNode,
          index: prevNode.index + 1,
          x: companionX,
          y: companionY,
          direction: this.directionFrom(prevNode.x, prevNode.y, companionX, companionY),
          sizeTier: companionSize,
          shapeKind: this.pickShapeKind(['round', 'oval', 'triangular'] as GameShardShapeKind[], score),
          motionPattern: 'none',
          motionMode: 'none',
          motionDirection: null,
          motionDistance: 0,
          motionDuration: 0,
          motionActivatedAt: null,
          spinDirection: this.nextRandom() < 0.5 ? 'cw' : 'ccw',
          spinSpeed: 0.08 + this.nextRandom() * 0.08,
          gameplayRadius: companionSize === 'tiny' ? 0.78 : companionSize === 'very_small' ? 0.9 : 1.06,
          visualScale: companionSize === 'tiny' ? 0.88 : companionSize === 'very_small' ? 1.02 : 1.16,
          gameplayOrbitPeriod: companionSize === 'tiny' ? 2.36 : companionSize === 'very_small' ? 2.58 : 2.9,
          visualStretch: { x: 1, y: 1, z: 1 },
          kind: 'normal',
          branchSlot: null,
          offerId: null,
          onboarding: prevNode.index < 50,
          eventType: 'none',
          colorHint: 'none',
          isMilestone: false,
          isGigantic: false,
          coinSlots: hasCoin ? [{ angle: Math.PI * (0.35 + this.nextRandom() * 1.2), value: 1, collected: false, orbitScale: 1 }] : [],
          enemySlot: null
        });
        if (this.validatePlacement([companionNode], this.nodes, expanded)) {
          expanded.push(companionNode);
        }
      }

      if (earlyDenseWindow && Math.abs(mainLane - centerLaneIndex) <= 1) {
        const emphasizedOuterLanes = [activeLaneTargets.length - 1, activeLaneTargets.length - 2, 0, 1, activeLaneTargets.length - 3]
          .filter((lane, index, lanes) => lane !== mainLane && lanes.indexOf(lane) === index)
          .slice(0, forceDenseCluster ? 3 : 2);

        emphasizedOuterLanes.forEach((lane, outerIndex) => {
          const prevNode = expanded[expanded.length - 1] ?? previous;
          const companionSize: GameShardSizeTier = outerIndex === 0 ? 'very_small' : 'tiny';
          const companionX =
            mainNode.x +
            0.92 +
            outerIndex * 0.46 +
            (lane < centerLaneIndex ? -0.12 : 0.12) +
            (this.nextRandom() - 0.5) * 0.08;
          const companionY =
            activeLaneTargets[lane]! +
            (this.nextRandom() - 0.5) * (companionSize === 'tiny' ? 0.66 : 0.52);
          const outerCompanion = this.buildNode({
            previous: prevNode,
            index: prevNode.index + 1,
            x: companionX,
            y: companionY,
            direction: this.directionFrom(prevNode.x, prevNode.y, companionX, companionY),
            sizeTier: companionSize,
            shapeKind: 'round',
            motionPattern: 'none',
            motionMode: 'none',
            motionDirection: null,
            motionDistance: 0,
            motionDuration: 0,
            motionActivatedAt: null,
            spinDirection: this.nextRandom() < 0.5 ? 'cw' : 'ccw',
            spinSpeed: 0.08 + this.nextRandom() * 0.06,
            gameplayRadius: companionSize === 'tiny' ? 0.78 : 0.92,
            visualScale: companionSize === 'tiny' ? 0.9 : 1.04,
            gameplayOrbitPeriod: companionSize === 'tiny' ? 2.34 : 2.56,
            visualStretch: { x: 1, y: 1, z: 1 },
            kind: 'normal',
            branchSlot: null,
            offerId: null,
            onboarding: prevNode.index < 50,
            eventType: 'none',
            colorHint: 'none',
            isMilestone: false,
            isGigantic: false,
            coinSlots: [{ angle: Math.PI * (0.3 + this.nextRandom() * 1.1), value: 1, collected: false, orbitScale: 1 }],
            enemySlot: null
          });
          if (this.validatePlacement([outerCompanion], this.nodes, expanded)) {
            expanded.push(outerCompanion);
          }
        });
      }
    });

    const normalized: GamePathNode[] = [];
    expanded.forEach((node, offset) => {
      normalized.push(this.reindexNode(node, previous.index + offset + 1, offset === 0 ? previous : normalized[offset - 1]));
    });
    return normalized;
  }

  private buildNode(config: {
    previous: GamePathNode | null;
    index: number;
    x: number;
    y: number;
    direction: GamePathNode['direction'];
    sizeTier: GameShardSizeTier;
    shapeKind: GameShardShapeKind;
    motionPattern: GameShardMotionPattern;
    motionMode?: GameShardMotionMode;
    motionDirection?: GameShardMotionDirection | null;
    motionDistance?: number;
    motionDuration?: number;
    motionActivatedAt?: number | null;
    spinDirection: GameShardSpinDirection;
    spinSpeed: number;
    gameplayRadius: number;
    visualScale: number;
    gameplayOrbitPeriod: number;
    visualStretch: { x: number; y: number; z: number };
    kind: GamePathNode['kind'];
    branchSlot: number | null;
    offerId: string | null;
    onboarding: boolean;
    eventType: GameEventType;
    eventVisualKind?: GamePathNode['eventVisualKind'];
    guaranteedShopIcon?: boolean;
    colorHint: GamePathNode['colorHint'];
    isMilestone: boolean;
    isGigantic: boolean;
    milestoneOwned?: boolean;
    reservedMilestoneDistance?: number | null;
    coinSlots: GameCoinSlot[];
    enemySlot: GamePathNode['enemySlot'];
    motionSeed?: number;
  }): GamePathNode {
    const previous = config.previous;
    const segmentDistance = previous ? Math.max(0, config.x - previous.x) : 0;

    return {
      index: config.index,
      x: config.x,
      y: config.y,
      z: 0,
      gameplayRadius: config.gameplayRadius,
      visualScale: config.visualScale,
      pathDistance: previous ? previous.pathDistance + segmentDistance : 0,
      direction: config.direction,
      kind: config.kind,
      sizeTier: config.sizeTier,
      shapeKind: config.shapeKind,
      spinDirection: config.spinDirection,
      spinSpeed: config.spinSpeed,
      motionPattern: config.motionPattern,
      motionMode: config.motionMode ?? 'none',
      motionDirection: config.motionDirection ?? null,
      motionDistance: config.motionDistance ?? 0,
      motionDuration: config.motionDuration ?? 0,
      motionActivatedAt: config.motionActivatedAt ?? null,
      eventType: config.eventType,
      eventVisualKind:
        config.eventVisualKind ??
        (config.eventType === 'shop' || config.eventType === 'gift' || config.eventType === 'rare_item' ? 'question' : 'default'),
      guaranteedShopIcon: config.guaranteedShopIcon ?? false,
      colorHint: config.colorHint,
      gameplayOrbitPeriod: config.gameplayOrbitPeriod,
      branchSlot: config.branchSlot,
      offerId: config.offerId,
      onboarding: config.onboarding,
      isMilestone: config.isMilestone,
      isGigantic: config.isGigantic,
      milestoneOwned: config.milestoneOwned ?? false,
      reservedMilestoneDistance: config.reservedMilestoneDistance ?? null,
      coinSlots: config.coinSlots,
      enemySlot: config.enemySlot,
      motionSeed: config.motionSeed ?? this.nextRandom() * Math.PI * 2,
      visualStretch: config.visualStretch
    };
  }

  private alignToLane(rawY: number, score: number, sizeTier: GameShardSizeTier, encourageSpread: boolean) {
    const laneSpacing = getPathLaneSpacing(score);
    const laneTargets = getPathLaneTargets(score);
    const largest = sizeTier === 'massive' || sizeTier === 'huge' || sizeTier === 'very_large';
    const medium = sizeTier === 'medium' || sizeTier === 'medium_large' || sizeTier === 'large';

    if (largest) {
      return THREE.MathUtils.clamp(rawY * 0.58, -laneSpacing * 2.45, laneSpacing * 2.75);
    }

    const preferredIndex = this.getLaneIndex(rawY, laneTargets);

    let laneIndex = preferredIndex;
    if (encourageSpread && !medium && this.nextRandom() < 0.42) {
      laneIndex =
        this.nextRandom() < 0.58
          ? THREE.MathUtils.clamp(laneTargets.length - 1 - Math.floor(this.nextRandom() * 3), 0, laneTargets.length - 1)
          : Math.floor(this.nextRandom() * laneTargets.length);
    } else if (encourageSpread && medium && this.nextRandom() < 0.2) {
      const swing = this.nextRandom() < 0.5 ? -1 : 1;
      laneIndex = THREE.MathUtils.clamp(preferredIndex + swing, 0, laneTargets.length - 1);
    }

    const jitter = medium ? 0.38 : 0.54;
    return laneTargets[laneIndex]! + (this.nextRandom() - 0.5) * jitter;
  }

  private getLaneIndex(y: number, laneTargets: readonly number[]) {
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    laneTargets.forEach((targetY, index) => {
      const distance = Math.abs(y - targetY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });
    return bestIndex;
  }

  private buildCompanionLaneOrder(mainLane: number, laneCount: number) {
    const order: number[] = [];
    for (let distance = 1; distance < laneCount; distance += 1) {
      const lower = mainLane - distance;
      const upper = mainLane + distance;
      if (upper < laneCount) order.push(upper);
      if (lower >= 0) order.push(lower);
    }
    return order;
  }

  private pickCompanionSizeTier(baseTier: GameShardSizeTier): GameShardSizeTier {
    switch (baseTier) {
      case 'tiny':
      case 'very_small':
        return 'tiny';
      case 'small':
      case 'medium_small':
        return this.nextRandom() < 0.5 ? 'tiny' : 'very_small';
      case 'medium':
        return this.nextRandom() < 0.5 ? 'very_small' : 'small';
      default:
        return 'small';
    }
  }

  private forceLargeShardCenter(node: GamePathNode, score: number) {
    if (!['large', 'very_large', 'huge', 'massive'].includes(node.sizeTier) || node.isMilestone || node.isGigantic) {
      return node;
    }
    const laneSpacing = getPathLaneSpacing(score);
    const centeredY = THREE.MathUtils.clamp(node.y * 0.72, -laneSpacing * 2.35, laneSpacing * 2.65);
    return {
      ...node,
      y: centeredY
    };
  }

  private reindexNode(node: GamePathNode, index: number, previous: GamePathNode | null) {
    const reindexed = this.buildNode({
      previous,
      index,
      x: node.x,
      y: node.y,
      direction: node.direction,
      sizeTier: node.sizeTier,
      shapeKind: node.shapeKind,
      motionPattern: node.motionPattern,
      motionMode: node.motionMode,
      motionDirection: node.motionDirection,
      motionDistance: node.motionDistance,
      motionDuration: node.motionDuration,
      motionActivatedAt: node.motionActivatedAt,
      spinDirection: node.spinDirection,
      spinSpeed: node.spinSpeed,
      gameplayRadius: node.gameplayRadius,
      visualScale: node.visualScale,
      gameplayOrbitPeriod: node.gameplayOrbitPeriod,
      visualStretch: node.visualStretch,
      kind: node.kind,
      branchSlot: node.branchSlot,
      offerId: node.offerId,
      onboarding: false,
      eventType: node.eventType,
      eventVisualKind: node.eventVisualKind,
      guaranteedShopIcon: node.guaranteedShopIcon,
      colorHint: node.colorHint,
      isMilestone: node.isMilestone,
      isGigantic: node.isGigantic,
      milestoneOwned: node.milestoneOwned ?? false,
      reservedMilestoneDistance: node.reservedMilestoneDistance ?? null,
      coinSlots: node.coinSlots.map((slot) => ({ ...slot })),
      enemySlot: node.enemySlot ? { ...node.enemySlot } : null,
      motionSeed: node.motionSeed
    });
    return node.isMilestone
      ? {
          ...reindexed,
          pathDistance: node.pathDistance
        }
      : reindexed;
  }

  private injectLowerSupportBand(previous: GamePathNode, nodes: GamePathNode[], score: number, distanceMeters: number) {
    if (nodes.length === 0) {
      return nodes;
    }

    const supportStrength = this.getLowerSupportBandStrength(distanceMeters);
    if (supportStrength <= 0.001) {
      return nodes;
    }

    let working = this.normalizePatternNodes(previous, nodes);
    const laneTargets = getPathLaneTargets(score);
    const laneSpacing = getPathLaneSpacing(score);
    const bottomLane = laneTargets[0] ?? 0;
    const patternStartX = Math.max(previous.x + DEFAULT_COLUMN_DISTANCE * 0.82, (nodes[0]?.x ?? previous.x) - DEFAULT_COLUMN_DISTANCE * 0.35);
    const patternEndX = (nodes[nodes.length - 1]?.x ?? patternStartX) + DEFAULT_COLUMN_DISTANCE * 0.92;
    let supportX = patternStartX;
    let supportIndex = 0;
    const supportTilt = this.worldDirectionSign > 0 ? EARLY_SUPPORT_BAND_TILT_RADIANS : Math.PI - EARLY_SUPPORT_BAND_TILT_RADIANS;

    while (supportX <= patternEndX && supportIndex < EARLY_SUPPORT_BAND_MAX_COUNT) {
      const anchorChance = THREE.MathUtils.lerp(EARLY_SUPPORT_BAND_BASE_PROBABILITY, EARLY_SUPPORT_BAND_MIN_PROBABILITY, 1 - supportStrength);
      const currentX = supportX;
      supportX +=
        THREE.MathUtils.lerp(EARLY_SUPPORT_BAND_MIN_STEP, EARLY_SUPPORT_BAND_MAX_STEP, 1 - supportStrength) +
        (this.nextRandom() - 0.5) * DEFAULT_COLUMN_DISTANCE * 0.12;
      if (this.nextRandom() > anchorChance) {
        supportIndex += 1;
        continue;
      }

      const wave =
        Math.sin(currentX * 0.12 + supportIndex * 0.58 + this.seed * 0.0000012) * 0.56 +
        Math.sin(currentX * 0.047 - supportIndex * 0.33) * 0.24;
      const laneLift = clamp(0.16 + (wave + 1) * 0.5 * EARLY_SUPPORT_BAND_WAVE_AMPLITUDE, 0.08, 0.88);
      const supportY = bottomLane - EARLY_SUPPORT_BAND_BOTTOM_OFFSET_PX + laneSpacing * laneLift + (this.nextRandom() - 0.5) * 0.22;

      const supportSizeTier =
        supportStrength > 0.86 && supportIndex % 3 === 0
          ? 'medium'
          : supportStrength > 0.62 && supportIndex % 2 === 0
            ? 'medium_small'
            : supportStrength > 0.38
              ? 'small'
              : 'very_small';
      const supportVisualScale =
        supportSizeTier === 'medium' ? 1.96 : supportSizeTier === 'medium_small' ? 1.62 : supportSizeTier === 'small' ? 1.26 : 1.02;
      const supportRadius =
        supportSizeTier === 'medium' ? 1.78 : supportSizeTier === 'medium_small' ? 1.46 : supportSizeTier === 'small' ? 1.08 : 0.88;
      const supportNode = this.buildNode({
        previous,
        index: previous.index + 1,
        x: currentX,
        y: supportY,
        direction: this.worldDirectionSign > 0 ? 'right' : 'down_left',
        sizeTier: supportSizeTier,
        shapeKind: 'oval',
        motionPattern: 'none',
        motionMode: 'none',
        motionDirection: null,
        motionDistance: 0,
        motionDuration: 0,
        motionActivatedAt: null,
        spinDirection: 'cw',
        spinSpeed: 0,
        gameplayRadius: supportRadius,
        visualScale: supportVisualScale,
        gameplayOrbitPeriod:
          supportSizeTier === 'medium' ? 3.56 : supportSizeTier === 'medium_small' ? 3.3 : supportSizeTier === 'small' ? 2.86 : 2.52,
        visualStretch: {
          x: supportSizeTier === 'medium' ? 2.46 : supportSizeTier === 'medium_small' ? 2.18 : 1.96,
          y: supportSizeTier === 'medium' ? 0.78 : supportSizeTier === 'medium_small' ? 0.72 : 0.68,
          z: 0.84
        },
        kind: 'normal',
        branchSlot: null,
        offerId: null,
        onboarding: previous.index < 50,
        eventType: 'none',
        colorHint: 'none',
        isMilestone: false,
        isGigantic: false,
        coinSlots: this.nextRandom() < THREE.MathUtils.lerp(0.12, 0.03, 1 - supportStrength)
          ? [{ angle: Math.PI * (0.22 + this.nextRandom() * 0.7), value: 1, collected: false, orbitScale: 1 }]
          : [],
        enemySlot: null,
        motionSeed: supportTilt
      });

      const merged = this.normalizePatternNodes(previous, [...working, supportNode].sort((left, right) => left.x - right.x));
      if (this.validatePlacement(merged, this.nodes)) {
        working = merged;
      }
      supportIndex += 1;
    }

    return working;
  }

  private normalizePatternNodes(previous: GamePathNode, nodes: GamePathNode[]) {
    const normalized: GamePathNode[] = [];
    nodes.forEach((node, offset) => {
      normalized.push(this.reindexNode(node, previous.index + offset + 1, offset === 0 ? previous : normalized[offset - 1]));
    });
    return normalized;
  }

  private getLowerSupportBandStrength(distanceMeters: number) {
    if (distanceMeters <= EARLY_PATTERN_DISTANCE_METERS) {
      return 1;
    }
    if (distanceMeters >= EARLY_SUPPORT_BAND_FADE_END_METERS) {
      return 0;
    }
    const fadeProgress = (distanceMeters - EARLY_PATTERN_DISTANCE_METERS) / (EARLY_SUPPORT_BAND_FADE_END_METERS - EARLY_PATTERN_DISTANCE_METERS);
    return 1 - THREE.MathUtils.smootherstep(fadeProgress, 0, 1);
  }

  private injectUpperRecoveryBand(previous: GamePathNode, nodes: GamePathNode[], score: number, distanceMeters: number) {
    const recoveryStrength = this.getUpperRecoveryStrength(distanceMeters);
    if (recoveryStrength <= 0.001 || nodes.length === 0) {
      return nodes;
    }

    const laneTargets = getPathLaneTargets(score);
    const topLane = laneTargets[laneTargets.length - 1];
    const upperLane = laneTargets[laneTargets.length - 2];
    if (topLane === undefined || upperLane === undefined) {
      return nodes;
    }

    let working = this.normalizePatternNodes(previous, nodes);
    const anchors = nodes.filter((node) => !node.isGigantic && node.y < upperLane - DEFAULT_COLUMN_DISTANCE * 0.25);
    anchors.forEach((anchorNode, anchorIndex) => {
      if (this.nextRandom() > THREE.MathUtils.lerp(0.72, 0.18, 1 - recoveryStrength)) {
        return;
      }

      const candidateX = anchorNode.x + DEFAULT_COLUMN_DISTANCE * (0.42 + anchorIndex * 0.02) + (this.nextRandom() - 0.5) * 0.18;
      const candidateLayouts = [
        {
          x: candidateX,
          y: (anchorIndex % 2 === 0 ? upperLane : topLane) + (this.nextRandom() - 0.5) * 0.34,
          sizeTier: anchorIndex % 3 === 0 ? ('small' as GameShardSizeTier) : ('very_small' as GameShardSizeTier)
        }
      ];
      if (recoveryStrength > 0.58 && anchorIndex % 2 === 0) {
        candidateLayouts.push({
          x: candidateX + DEFAULT_COLUMN_DISTANCE * 0.62,
          y: topLane + (this.nextRandom() - 0.5) * 0.28,
          sizeTier: 'tiny' as GameShardSizeTier
        });
      }

      candidateLayouts.forEach((layout) => {
        const candidate = this.buildNode({
          previous,
          index: previous.index + 1,
          x: layout.x,
          y: layout.y,
          direction: this.directionFrom(anchorNode.x, anchorNode.y, layout.x, layout.y),
          sizeTier: layout.sizeTier,
          shapeKind: 'round',
          motionPattern: 'none',
          motionMode: 'none',
          motionDirection: null,
          motionDistance: 0,
          motionDuration: 0,
          motionActivatedAt: null,
          spinDirection: this.nextRandom() < 0.5 ? 'cw' : 'ccw',
          spinSpeed: 0.06 + this.nextRandom() * 0.04,
          gameplayRadius: layout.sizeTier === 'small' ? 1.06 : layout.sizeTier === 'very_small' ? 0.9 : 0.78,
          visualScale: layout.sizeTier === 'small' ? 1.14 : layout.sizeTier === 'very_small' ? 1.02 : 0.88,
          gameplayOrbitPeriod: layout.sizeTier === 'small' ? 2.8 : layout.sizeTier === 'very_small' ? 2.52 : 2.34,
          visualStretch: { x: 1, y: 1, z: 1 },
          kind: 'normal',
          branchSlot: null,
          offerId: null,
          onboarding: previous.index < 50,
          eventType: 'none',
          colorHint: 'none',
          isMilestone: false,
          isGigantic: false,
          coinSlots: this.nextRandom() < 0.22 ? [{ angle: Math.PI * (0.28 + this.nextRandom() * 1.04), value: 1, collected: false, orbitScale: 1 }] : [],
          enemySlot: null
        });

        const merged = this.normalizePatternNodes(previous, [...working, candidate].sort((left, right) => left.x - right.x));
        if (this.validatePlacement(merged, this.nodes)) {
          working = merged;
        }
      });
    });

    return working;
  }

  private getUpperRecoveryStrength(distanceMeters: number) {
    if (distanceMeters <= EARLY_PATTERN_DISTANCE_METERS) {
      return 1;
    }
    if (distanceMeters >= EARLY_UPPER_RECOVERY_FADE_END_METERS) {
      return 0;
    }
    const fadeProgress = (distanceMeters - EARLY_PATTERN_DISTANCE_METERS) / (EARLY_UPPER_RECOVERY_FADE_END_METERS - EARLY_PATTERN_DISTANCE_METERS);
    return 1 - THREE.MathUtils.smootherstep(fadeProgress, 0, 1);
  }

  private resolveMotionDistance(templateDistance: number | undefined, templatePattern: GameShardMotionPattern | undefined, score: number) {
    if (typeof templateDistance === 'number' && Number.isFinite(templateDistance)) {
      return Math.max(2.2, templateDistance);
    }
    if (templatePattern === 'vertical') {
      return getPathLaneSpacing(score) * 0.96;
    }
    if (templatePattern === 'horizontal') {
      return DEFAULT_COLUMN_DISTANCE * 0.62;
    }
    return DEFAULT_COLUMN_DISTANCE * 0.58;
  }

  private buildCoinSlots(template: GamePatternNodeTemplate, eventType: GameEventType, score: number) {
    const decorateCoinSlot = (angle: number) => {
      const airborneChance = score < 20 ? 0.36 : score < 70 ? 0.24 : score < 140 ? 0.17 : 0.12;
      const airborne = eventType !== 'shop' && this.nextRandom() < airborneChance;
      const liftBias = Math.sin(angle) * THREE.MathUtils.lerp(0.1, 0.42, this.nextRandom());
      return {
        angle,
        value: eventType === 'rare_item' ? 2 : 1,
        collected: false,
        orbitScale: airborne ? THREE.MathUtils.lerp(1.18, 1.74, this.nextRandom()) : 1,
        forwardOffset: airborne ? THREE.MathUtils.lerp(0.8, 2.7, this.nextRandom()) : 0,
        verticalOffset: airborne ? THREE.MathUtils.lerp(-0.18, 1.18, this.nextRandom()) + liftBias : 0
      };
    };

    const slots = template.coinAngles?.map((angle) => decorateCoinSlot(angle)) ?? [];

    if (slots.length === 0 && score < 12) {
      slots.push(decorateCoinSlot(Math.PI * (0.2 + this.nextRandom() * 1.6)));
    }

    return slots;
  }

  private buildEnemySlot(template: GamePatternNodeTemplate, score: number, eventType: GameEventType, shapeKind: GameShardShapeKind) {
    const profile = getDifficultyProfile(score);
    if (!profile.enemyUnlocked || eventType === 'shop' || eventType === 'gift' || shapeKind !== 'round') {
      return null;
    }

    const pole = template.enemyPole ?? (this.nextRandom() < 0.24 ? (this.nextRandom() < 0.5 ? 'north' : 'south') : null);
    if (!pole) return null;

    const tier =
      score < 60
        ? 'light'
        : score < 120
          ? (this.nextRandom() < 0.7 ? 'armored' : 'light')
          : this.nextRandom() < 0.18
            ? 'invincible'
            : this.nextRandom() < 0.55
              ? 'elite'
              : 'armored';

    const speedThreshold = tier === 'light' ? 4.6 : tier === 'armored' ? 6.4 : tier === 'elite' ? 8.1 : Number.POSITIVE_INFINITY;
    return {
      pole,
      tier,
      alive: true,
      rewardCoins: tier === 'elite' ? 10 : tier === 'armored' ? 8 + Math.floor(this.nextRandom() * 2) : tier === 'light' ? 5 + Math.floor(this.nextRandom() * 4) : 0,
      speedThreshold
    } as const;
  }

  private pickSizeTier(allowed: GameShardSizeTier[], score: number) {
    const profile = getDifficultyProfile(score);
    const filtered = SIZE_TIER_ORDER.filter((tier) => allowed.includes(tier));
    const maxIndex = clamp(Math.floor(profile.normalized * (filtered.length - 1) + 4), 0, filtered.length - 1);
    const eligible = filtered.slice(0, maxIndex + 1);
    return eligible[Math.floor(this.nextRandom() * eligible.length)] ?? 'medium';
  }

  private pickShapeKind(allowed: GameShardShapeKind[], score: number) {
    const normalized = clamp(score / 220, 0, 1);
    const weights: Record<GameShardShapeKind, number> = {
      round: 0.9 - normalized * 0.22,
      oval: 0.08 + normalized * 0.16,
      triangular: 0.02 + normalized * 0.08
    };

    const available: GameShardShapeKind[] = allowed.length > 0 ? allowed : ['round'];
    const total = available.reduce((sum, shape) => sum + (weights[shape] ?? 0), 0);
    let cursor = this.nextRandom() * total;
    for (const shape of available) {
      cursor -= weights[shape] ?? 0;
      if (cursor <= 0) {
        return shape;
      }
    }
    return available[0] ?? 'round';
  }

  private pickMotionPattern(
    templatePattern: GameShardMotionPattern | undefined,
    score: number,
    shape: GameShardShapeKind,
    sizeTier: GameShardSizeTier
  ) {
    const profile = getDifficultyProfile(score);
    if (shape !== 'round' || !profile.roundMovementUnlocked) return 'none';
    if (['large', 'very_large', 'huge', 'massive'].includes(sizeTier)) return 'none';
    return templatePattern && templatePattern !== 'none' ? templatePattern : 'none';
  }

  private resolveEventType(
    index: number,
    previousDistanceMeters: number,
    currentDistanceMeters: number,
    score: number,
    template: GamePatternNodeTemplate
  ) {
    if (getCrossedUpgradeMilestone(previousDistanceMeters, currentDistanceMeters) !== null) {
      return {
        eventType: 'none' as GameEventType,
        eventVisualKind: 'default' as GameEventVisualKind,
        guaranteedRoundShop: false
      };
    }

    if (!this.guaranteedShopAt50Spawned && currentDistanceMeters >= 50) {
      this.guaranteedShopAt50Spawned = true;
      this.lastShopDistanceMeters = currentDistanceMeters;
      return {
        eventType: 'shop' as GameEventType,
        eventVisualKind: 'shop' as GameEventVisualKind,
        guaranteedRoundShop: true
      };
    }

    const planned = this.eventSystem.consumePlannedEvent(index, score);
    if (planned !== 'none') {
      if (planned === 'shop') {
        this.lastShopDistanceMeters = currentDistanceMeters;
      }
      return {
        eventType: planned,
        guaranteedRoundShop: false,
        eventVisualKind:
          (planned === 'shop' ? 'shop' : planned === 'gift' || planned === 'rare_item' ? 'question' : 'default') as GameEventVisualKind
      };
    }

    if (currentDistanceMeters > 50 && currentDistanceMeters - this.lastShopDistanceMeters >= 85 && template.sizeTier !== 'massive') {
      this.lastShopDistanceMeters = currentDistanceMeters;
      return {
        eventType: 'shop' as GameEventType,
        eventVisualKind: 'shop' as GameEventVisualKind,
        guaranteedRoundShop: false
      };
    }

    if (currentDistanceMeters >= 30 && template.sizeTier !== 'massive') {
      const eventChance =
        (currentDistanceMeters < 80
          ? 0.032
          : currentDistanceMeters < 100
            ? 0.039
            : currentDistanceMeters < 250
              ? 0.05
              : currentDistanceMeters < 600
                ? 0.061
                : 0.075) +
        this.rewardChanceBias * 0.36 +
        this.shopChanceBias * 0.42;
      if (this.nextRandom() < eventChance) {
        const roll = this.nextRandom();
        const shopThreshold = Math.min(0.68, 0.34 + this.shopChanceBias * 1.4);
        const rewardThreshold = Math.min(0.95, 0.7 + this.rewardChanceBias * 1.48);
        if (roll < shopThreshold) {
          this.lastShopDistanceMeters = currentDistanceMeters;
          return {
            eventType: 'shop' as GameEventType,
            eventVisualKind: 'question' as GameEventVisualKind,
            guaranteedRoundShop: false
          };
        }
        if (roll < rewardThreshold) {
          return {
            eventType: 'gift' as GameEventType,
            eventVisualKind: 'question' as GameEventVisualKind,
            guaranteedRoundShop: false
          };
        }
        return {
          eventType: 'rare_item' as GameEventType,
          eventVisualKind: 'question' as GameEventVisualKind,
          guaranteedRoundShop: false
        };
      }
    }

    return {
      eventType: 'none' as GameEventType,
      eventVisualKind: 'default' as GameEventVisualKind,
      guaranteedRoundShop: false
    };
  }

  private directionFrom(x0: number, y0: number, x1: number, y1: number): GamePathNode['direction'] {
    const dx = x1 - x0;
    const dy = y1 - y0;
    if (Math.abs(dy) < 1.5) return 'right';
    if (dy > 0) return dx < 0 ? 'up_left' : Math.abs(dx) < 1.2 ? 'up' : 'up_right';
    return dx < 0 ? 'down_left' : 'down_right';
  }

  private nextRandom() {
    this.seed = (this.seed * 48271) % 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  getSeededRng() {
    return () => this.nextRandom();
  }
}
