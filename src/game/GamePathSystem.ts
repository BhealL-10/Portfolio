import * as THREE from 'three';
import { clamp } from '../core/math';
import { DEFAULT_COLUMN_DISTANCE, getDifficultyProfile, pathDistanceToMeters } from './difficultyScaler';
import { getPathLaneSpacing, getPathLaneTargets } from './pathLayout';
import {
  buildMilestoneReservedRange,
  validatePathPlacement,
  validateTeleportTarget,
  type PlacementReservedRange
} from './PathPlacement';
import { getNextUpgradeMilestone, type RogueliteItemOffer } from './roguelite';
import { resolveRuntimeNode } from './ShardRuntimeResolver';
import type {
  BranchChoice,
  GameCoinSlot,
  GameEventType,
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
const MILESTONE_BRANCH_REJOIN_PADDING = DEFAULT_COLUMN_DISTANCE * 1.1;
const INTRO_BLOCK_METERS = 10;
const MAIN_BLOCK_METERS = 100;
const MAIN_BLOCK_SHOP_OFFSET_METERS = 50;
const MAIN_BLOCK_SHOP_CLEARANCE_METERS = 3.9;
const INTRO_BLOCK_NODE_TARGET = 14;
const FIRST_MAIN_BLOCK_NODE_TARGET = 74;
const POST_DENSE_MAIN_BLOCK_NODE_TARGET = 62;
const FAR_MAIN_BLOCK_NODE_TARGET = 28;
const DENSITY_TAPER_START_METERS = 110;
const DENSITY_TAPER_END_METERS = 500;
const INTRO_COLUMN_JITTER_METERS = 0.08;
const MAIN_COLUMN_JITTER_METERS = 0.34;
const INTRO_BLOCK_START_PADDING_METERS = 0.72;
const INTRO_BLOCK_END_PADDING_METERS = 3.05;
const MAIN_BLOCK_START_PADDING_METERS = 2.05;
const MAIN_BLOCK_END_PADDING_METERS = 3.6;
const POST_MILESTONE_REWARD_RESERVED_START_METERS = 1.9;
const POST_MILESTONE_REWARD_RESERVED_END_METERS = 6.85;
const POST_MILESTONE_CONTENT_START_METERS = 7.25;
const MAX_LANE_DELTA_PER_STEP = 3;
const EXTRA_EVENT_SAFE_GAP_METERS = 11;
const EXTRA_EVENT_MAX_PER_BLOCK = 2;
const INTRO_ONBOARDING_END_METERS = 18;
const MOTION_DURATION_MIN = 1.2;
const MOTION_DURATION_MAX = 1.82;
const EARLY_FULL_HEIGHT_SWEEP_ORDER = [4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3] as const;

type StructuralBlockKind = 'intro' | 'main';

interface StructuralBlockDescriptor {
  kind: StructuralBlockKind;
  index: number;
  blockStartMeters: number;
  blockEndMeters: number;
  targetMilestoneMeters: number;
  guaranteedShopMeters: number | null;
}

interface StructuralNodePlan {
  absoluteMeters: number;
  laneIndex: number;
  sizeTier: GameShardSizeTier;
  shapeKind: GameShardShapeKind;
  motionPattern: GameShardMotionPattern;
  motionDirection: GameShardMotionDirection | null;
  motionDistance: number;
  motionDuration: number;
  eventType: GameEventType;
  guaranteedShopIcon: boolean;
  coinAngles: number[];
  enemyPole: 'north' | 'south' | null;
  milestoneOwned?: boolean;
}


export class GamePathSystem {
  private nodes: GamePathNode[] = [];
  private runSeed = 1;
  private seed = 1;
  private rewardChanceBias = 0;
  private shopChanceBias = 0;
  private worldDirectionSign: 1 | -1 = 1;
  private worldOffsetX = 0;

  reset() {
    this.runSeed = ((Math.random() * 0x7fffffff) | 1) || 1;
    this.seed = this.runSeed;
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
        motionSeed: this.createIndexedRng(91, 0)() * Math.PI * 2,
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

    const rng = this.createIndexedRng(509, milestoneIndex + Math.round(score * 10));
    const laneSpacing = getPathLaneSpacing(score);
    const branchEntryX = milestone.x + MILESTONE_REWARD_OFFSET;
    const definitions = [
      { slot: 0 as const, yBias: laneSpacing * 3.05, direction: 'up_right' as const },
      { slot: 1 as const, yBias: 0, direction: 'right' as const },
      { slot: 2 as const, yBias: -laneSpacing * 3.05, direction: 'down_right' as const }
    ];

    return offers.slice(0, 3).map((offer, index) => {
      const branch = definitions[index] ?? definitions[1];
      const sizeTier: GameShardSizeTier = 'medium';
      const sizeConfig = SIZE_TIER_CONFIG[sizeTier];
      const gameplayRadius = sizeConfig.radius[0] + rng() * (sizeConfig.radius[1] - sizeConfig.radius[0]);
      const visualScale = sizeConfig.visual[0] + rng() * (sizeConfig.visual[1] - sizeConfig.visual[0]);
      const orbitPeriod = sizeConfig.orbitPeriod[0] + rng() * (sizeConfig.orbitPeriod[1] - sizeConfig.orbitPeriod[0]);
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
        spinSpeed: 0.14 + index * 0.03 + rng() * 0.04,
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
        exitSizeConfig.radius[0] + rng() * (exitSizeConfig.radius[1] - exitSizeConfig.radius[0]);
      const exitVisualScale =
        exitSizeConfig.visual[0] + rng() * (exitSizeConfig.visual[1] - exitSizeConfig.visual[0]);
      const exitOrbitPeriod =
        exitSizeConfig.orbitPeriod[0] + rng() * (exitSizeConfig.orbitPeriod[1] - exitSizeConfig.orbitPeriod[0]);
      const exit = this.buildNode({
        previous: entry,
        index: milestoneIndex + 2,
        x: Math.max(
          entry.x + DEFAULT_COLUMN_DISTANCE * 2.52,
          milestone.x + DEFAULT_COLUMN_DISTANCE * 6.08
        ),
        y: entry.y,
        direction: 'right',
        sizeTier: exitSizeTier,
        shapeKind: 'round',
        motionPattern: 'none',
        spinDirection: 'cw',
        spinSpeed: 0.08 + rng() * 0.05,
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

    const rng = this.createIndexedRng(541, milestoneIndex + 1);
    const entrySizeTier: GameShardSizeTier = 'medium_small';
    const entrySizeConfig = SIZE_TIER_CONFIG[entrySizeTier];
    const entryGameplayRadius =
      entrySizeConfig.radius[0] + rng() * (entrySizeConfig.radius[1] - entrySizeConfig.radius[0]);
    const entryVisualScale =
      entrySizeConfig.visual[0] + rng() * (entrySizeConfig.visual[1] - entrySizeConfig.visual[0]);
    const entryOrbitPeriod =
      entrySizeConfig.orbitPeriod[0] + rng() * (entrySizeConfig.orbitPeriod[1] - entrySizeConfig.orbitPeriod[0]);
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
      spinSpeed: 0.12 + rng() * 0.04,
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
      exitSizeConfig.radius[0] + rng() * (exitSizeConfig.radius[1] - exitSizeConfig.radius[0]);
    const exitVisualScale =
      exitSizeConfig.visual[0] + rng() * (exitSizeConfig.visual[1] - exitSizeConfig.visual[0]);
    const exitOrbitPeriod =
      exitSizeConfig.orbitPeriod[0] + rng() * (exitSizeConfig.orbitPeriod[1] - exitSizeConfig.orbitPeriod[0]);
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
      spinSpeed: 0.08 + rng() * 0.04,
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

  private validatePlacement(
    candidateNodes: GamePathNode[],
    baseNodes: GamePathNode[],
    extraNodes: GamePathNode[] = [],
    reservedRanges: PlacementReservedRange[] = []
  ) {
    return validatePathPlacement(candidateNodes, [...baseNodes, ...extraNodes], reservedRanges);
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
        const fallback = this.buildEmergencyBlock(previous);
        this.nodes.push(...fallback);
        appended += fallback.length;
        continue;
      }
      this.nodes.push(...generated);
      appended += generated.length;
    }
  }

  private buildNextStructuredBlock(previous: GamePathNode) {
    const descriptor = this.describeNextBlock(previous);
    const rng = this.createIndexedRng(descriptor.kind === 'intro' ? 101 : 211, descriptor.index + 1);
    const reservedRange = this.getFutureMilestoneReservedRange(descriptor.targetMilestoneMeters);
    const contentNodes = this.buildStructuralBlockNodes(previous, descriptor, reservedRange, rng);
    const milestoneBase = contentNodes[contentNodes.length - 1] ?? previous;
    const milestoneNode = this.buildMilestoneNode(milestoneBase, descriptor.targetMilestoneMeters);
    return [...contentNodes, milestoneNode];
  }

  private describeNextBlock(previous: GamePathNode): StructuralBlockDescriptor {
    const previousDistanceMeters = pathDistanceToMeters(previous.pathDistance);
    const targetMilestoneMeters = getNextUpgradeMilestone(previousDistanceMeters);
    const kind: StructuralBlockKind = targetMilestoneMeters === INTRO_BLOCK_METERS ? 'intro' : 'main';
    const blockLength = kind === 'intro' ? INTRO_BLOCK_METERS : MAIN_BLOCK_METERS;
    const blockStartMeters = Math.max(0, targetMilestoneMeters - blockLength);
    const blockIndex = kind === 'intro' ? 0 : Math.max(0, Math.round((targetMilestoneMeters - 110) / MAIN_BLOCK_METERS));

    return {
      kind,
      index: blockIndex,
      blockStartMeters,
      blockEndMeters: blockStartMeters + blockLength,
      targetMilestoneMeters,
      guaranteedShopMeters: kind === 'main' ? blockStartMeters + MAIN_BLOCK_SHOP_OFFSET_METERS : null
    };
  }

  private buildStructuralBlockNodes(
    previous: GamePathNode,
    descriptor: StructuralBlockDescriptor,
    reservedRange: PlacementReservedRange,
    rng: () => number
  ) {
    return this.buildSafeBlockNodes(previous, descriptor, reservedRange, rng);
  }

  private buildSafeBlockNodes(
    previous: GamePathNode,
    descriptor: StructuralBlockDescriptor,
    reservedRange: PlacementReservedRange,
    rng: () => number
  ) {
    const safeTargetCount = this.resolveBlockNodeTarget(descriptor);
    const rewardReserve = this.getPostMilestoneRewardReservedRange(previous, descriptor);
    const safeStart = Math.max(
      descriptor.blockStartMeters + (descriptor.kind === 'intro' ? INTRO_BLOCK_START_PADDING_METERS : MAIN_BLOCK_START_PADDING_METERS),
      rewardReserve ? descriptor.blockStartMeters + POST_MILESTONE_CONTENT_START_METERS : descriptor.blockStartMeters
    );
    const safeEnd = descriptor.targetMilestoneMeters - (descriptor.kind === 'intro' ? INTRO_BLOCK_END_PADDING_METERS : MAIN_BLOCK_END_PADDING_METERS);
    const columns =
      descriptor.kind === 'main'
        ? this.buildBlockColumns(safeStart, safeEnd, safeTargetCount, descriptor.guaranteedShopMeters, rng)
        : this.distributeMeters(safeStart, safeEnd, safeTargetCount, INTRO_COLUMN_JITTER_METERS * 0.5, rng);
    const generated: GamePathNode[] = previous.isMilestone ? this.buildMilestoneExitNodes(previous, descriptor, rng) : [];
    const bonusEvents = this.buildBonusEventAssignments(descriptor, columns, rng);
    let previousLane = this.resolveStartingLane(
      (generated[generated.length - 1] ?? previous).index,
      (generated[generated.length - 1] ?? previous).y
    );
    const laneSequence = this.buildLaneSequence(descriptor, columns.length, previousLane, rng);
    const placementReservedRanges = rewardReserve ? [reservedRange, rewardReserve] : [reservedRange];

    columns.forEach((absoluteMeters, columnIndex) => {
      const cursor = generated[generated.length - 1] ?? previous;
      const currentMeters = pathDistanceToMeters(cursor.pathDistance);
      if (absoluteMeters <= currentMeters + 0.05) {
        return;
      }
      const score = previous.index + generated.length;
      const eventAssignment = bonusEvents.get(columnIndex) ?? {
        eventType: 'none' as GameEventType,
        guaranteedShopIcon: false
      };
      const isGuaranteedShop = descriptor.guaranteedShopMeters !== null && Math.abs(absoluteMeters - descriptor.guaranteedShopMeters) <= 0.0001;
      const eventType = isGuaranteedShop ? 'shop' : eventAssignment.eventType;
      const targetLane = laneSequence[columnIndex] ?? previousLane;
      const motionPattern =
        eventType === 'shop'
          ? 'none'
          : this.pickBlockMotionPattern(descriptor, columnIndex, score, descriptor.kind === 'intro' ? 'small' : 'medium_small', rng);
      const plan: StructuralNodePlan = {
        absoluteMeters,
        laneIndex: targetLane,
        sizeTier:
          eventType === 'shop'
            ? (isGuaranteedShop ? 'medium' : 'medium_large')
            : descriptor.kind === 'intro'
              ? this.pickSizeTier(
                  columnIndex % 4 === 0
                    ? ['small', 'medium_small', 'medium']
                    : ['tiny', 'very_small', 'small', 'medium_small'],
                  score,
                  rng
                )
              : this.pickSizeTier(
                  descriptor.blockStartMeters < 110
                    ? (columnIndex % 5 === 0
                        ? ['small', 'medium_small', 'medium']
                        : ['tiny', 'very_small', 'small', 'medium_small'])
                    : descriptor.blockStartMeters < 310
                      ? (columnIndex % 4 === 0
                          ? ['small', 'medium_small', 'medium']
                          : ['very_small', 'small', 'medium_small'])
                      : descriptor.blockStartMeters < 510
                        ? ['very_small', 'small', 'medium_small']
                        : ['small', 'medium_small', 'medium'],
                  score,
                  rng
                ),
        shapeKind: motionPattern === 'none' ? this.pickShapeKind(['round', 'oval', 'triangular'], score, rng) : 'round',
        motionPattern,
        motionDirection:
          motionPattern === 'vertical'
            ? (targetLane >= 5 ? 'down' : 'up')
            : motionPattern === 'drift'
              ? (targetLane >= 5 ? 'down_right' : 'up_right')
              : motionPattern === 'horizontal'
                ? 'right'
                : null,
        motionDistance: this.resolveMotionDistance(descriptor, motionPattern, score, rng),
        motionDuration: motionPattern === 'none' ? 0 : THREE.MathUtils.lerp(MOTION_DURATION_MIN, MOTION_DURATION_MAX, rng()),
        eventType,
        guaranteedShopIcon: isGuaranteedShop,
        coinAngles: this.buildPlanCoinAngles(descriptor, columnIndex, eventType, score, rng),
        enemyPole: this.pickPlanEnemyPole(eventType, motionPattern, motionPattern === 'none' ? 'round' : 'round', score, rng)
      };
      let candidate = this.placeStructuralNode(previous, generated, placementReservedRanges, plan, rng);
      if (!candidate) {
        const emergencyPlan: StructuralNodePlan = {
          absoluteMeters: isGuaranteedShop ? absoluteMeters : Math.min(absoluteMeters, currentMeters + (descriptor.kind === 'intro' ? 0.86 : 1.58)),
          laneIndex: this.resolveLaneFallback(previousLane, targetLane, score),
          sizeTier: isGuaranteedShop ? 'medium' : descriptor.kind === 'intro' ? 'small' : 'very_small',
          shapeKind: 'round',
          motionPattern: 'none',
          motionDirection: null,
          motionDistance: 0,
          motionDuration: 0,
          eventType,
          guaranteedShopIcon: isGuaranteedShop,
          coinAngles: eventType === 'none' && descriptor.kind === 'intro' && columnIndex < 2 ? [Math.PI * (0.26 + rng() * 0.38)] : [],
          enemyPole: null,
          milestoneOwned: false
        };
        const emergencyCandidate = this.buildGeneratedNode(cursor, emergencyPlan, rng);
        if (emergencyCandidate && this.validatePlacement([emergencyCandidate], this.nodes, generated, placementReservedRanges)) {
          candidate = emergencyCandidate;
        }
      }
      if (!candidate && isGuaranteedShop) {
        candidate = this.buildGeneratedNode(cursor, {
          absoluteMeters,
          laneIndex: this.resolveLaneFallback(previousLane, 4, score),
          sizeTier: 'small',
          shapeKind: 'round',
          motionPattern: 'none',
          motionDirection: null,
          motionDistance: 0,
          motionDuration: 0,
          eventType: 'shop',
          guaranteedShopIcon: true,
          coinAngles: [],
          enemyPole: null
        }, rng);
      }
      if (!candidate) {
        return;
      }
      generated.push(candidate);
      previousLane = this.getLaneIndex(candidate.y, getPathLaneTargets(candidate.index));
    });

    return generated;
  }

  private buildMilestoneExitNodes(previous: GamePathNode, descriptor: StructuralBlockDescriptor, rng: () => number) {
    if (!previous.isMilestone) {
      return [] as GamePathNode[];
    }

    const exitOffsets = descriptor.kind === 'main' ? [1.15, 2.2, 3.35, 4.65, 6.05] : [1.1, 2.05];
    const generated: GamePathNode[] = [];
    let previousLane = this.resolveStartingLane(previous.index, previous.y);

    exitOffsets.forEach((offset, index) => {
      const score = previous.index + generated.length + 1;
      const targetLane =
        descriptor.kind === 'main'
          ? (index === 0 ? 5 : index < 3 ? 4 : index === exitOffsets.length - 1 ? 5 : 4)
          : index === 0
            ? 5
            : 4;
      const laneIndex = this.resolveLaneFallback(previousLane, targetLane, score);
      const plan: StructuralNodePlan = {
        absoluteMeters: pathDistanceToMeters(previous.pathDistance) + offset,
        laneIndex,
        sizeTier: descriptor.kind === 'main' && index >= 2 ? 'small' : index === 0 ? 'medium_small' : 'small',
        shapeKind: 'round',
        motionPattern: descriptor.kind === 'main' && index === 3 ? 'vertical' : 'none',
        motionDirection: descriptor.kind === 'main' && index === 3 ? (laneIndex >= 5 ? 'down' : 'up') : null,
        motionDistance: descriptor.kind === 'main' && index === 3 ? getPathLaneSpacing(score) * 0.84 : 0,
        motionDuration: descriptor.kind === 'main' && index === 3 ? 1.2 : 0,
        eventType: 'none',
        guaranteedShopIcon: false,
        coinAngles: [],
        enemyPole: null,
        milestoneOwned: true
      };
      const candidate = this.buildGeneratedNode(generated[generated.length - 1] ?? previous, plan, rng);
      if (!candidate) {
        return;
      }
      generated.push(candidate);
      previousLane = this.getLaneIndex(candidate.y, getPathLaneTargets(candidate.index));
    });

    return generated;
  }

  private resolveBlockNodeTarget(descriptor: StructuralBlockDescriptor) {
    if (descriptor.kind === 'intro') {
      return INTRO_BLOCK_NODE_TARGET;
    }
    if (descriptor.blockStartMeters < DENSITY_TAPER_START_METERS) {
      return FIRST_MAIN_BLOCK_NODE_TARGET;
    }
    const taper = THREE.MathUtils.smootherstep(
      clamp((descriptor.blockStartMeters - DENSITY_TAPER_START_METERS) / Math.max(1, DENSITY_TAPER_END_METERS - DENSITY_TAPER_START_METERS), 0, 1),
      0,
      1
    );
    return Math.round(THREE.MathUtils.lerp(POST_DENSE_MAIN_BLOCK_NODE_TARGET, FAR_MAIN_BLOCK_NODE_TARGET, taper));
  }

  private buildBlockColumns(
    startMeters: number,
    endMeters: number,
    count: number,
    guaranteedShopMeters: number | null,
    rng: () => number
  ) {
    if (count <= 0) {
      return [] as number[];
    }
    if (guaranteedShopMeters === null) {
      return this.distributeMeters(startMeters, endMeters, count, INTRO_COLUMN_JITTER_METERS, rng);
    }

    const leftSlots = Math.max(1, Math.floor((count - 1) * 0.5));
    const rightSlots = Math.max(1, count - leftSlots - 1);
    const left = this.distributeMeters(startMeters, guaranteedShopMeters - MAIN_BLOCK_SHOP_CLEARANCE_METERS, leftSlots, MAIN_COLUMN_JITTER_METERS, rng);
    const right = this.distributeMeters(guaranteedShopMeters + MAIN_BLOCK_SHOP_CLEARANCE_METERS, endMeters, rightSlots, MAIN_COLUMN_JITTER_METERS, rng);
    return [...left, guaranteedShopMeters, ...right];
  }

  private distributeMeters(startMeters: number, endMeters: number, count: number, jitterMeters: number, rng: () => number) {
    if (count <= 0) {
      return [] as number[];
    }
    if (count === 1) {
      return [THREE.MathUtils.lerp(startMeters, endMeters, 0.5)];
    }

    const span = Math.max(0.001, endMeters - startMeters);
    const baseStep = span / Math.max(1, count - 1);
    const minStep = Math.max(0.74, baseStep * 0.58);
    const columns: number[] = [];

    for (let index = 0; index < count; index += 1) {
      const ratio = count === 1 ? 0.5 : index / (count - 1);
      const edgeWeight = 1 - Math.abs(ratio - 0.5) * 1.8;
      const jitter = (rng() - 0.5) * jitterMeters * Math.max(0.25, edgeWeight);
      const candidate = THREE.MathUtils.clamp(startMeters + span * ratio + jitter, startMeters, endMeters);
      const previousValue = columns[index - 1];
      columns.push(previousValue === undefined ? candidate : Math.max(candidate, previousValue + minStep));
    }

    for (let index = columns.length - 2; index >= 0; index -= 1) {
      const nextValue = columns[index + 1]!;
      columns[index] = Math.min(columns[index]!, nextValue - minStep);
    }

    return columns.map((value) => THREE.MathUtils.clamp(value, startMeters, endMeters));
  }

  private buildBonusEventAssignments(descriptor: StructuralBlockDescriptor, columns: number[], rng: () => number) {
    const assignments = new Map<number, { eventType: GameEventType; guaranteedShopIcon: boolean }>();
    if (descriptor.kind !== 'main' || columns.length === 0) {
      return assignments;
    }

    let remaining =
      (rng() < 0.26 + this.rewardChanceBias * 0.18 + this.shopChanceBias * 0.08 ? 1 : 0) +
      (rng() < 0.08 + this.rewardChanceBias * 0.12 ? 1 : 0);
    remaining = Math.min(EXTRA_EVENT_MAX_PER_BLOCK, remaining);
    const eligible = columns
      .map((absoluteMeters, index) => ({ absoluteMeters, index }))
      .filter(({ absoluteMeters }) => {
        if (descriptor.guaranteedShopMeters !== null && Math.abs(absoluteMeters - descriptor.guaranteedShopMeters) < EXTRA_EVENT_SAFE_GAP_METERS) {
          return false;
        }
        return absoluteMeters > descriptor.blockStartMeters + EXTRA_EVENT_SAFE_GAP_METERS &&
          absoluteMeters < descriptor.targetMilestoneMeters - EXTRA_EVENT_SAFE_GAP_METERS;
      });

    while (remaining > 0 && eligible.length > 0) {
      const slotIndex = Math.floor(rng() * eligible.length);
      const slot = eligible.splice(slotIndex, 1)[0];
      if (!slot) {
        break;
      }
      assignments.set(slot.index, {
        eventType: this.pickBonusEventType(rng),
        guaranteedShopIcon: false
      });
      remaining -= 1;
    }

    return assignments;
  }

  private pickBonusEventType(rng: () => number): GameEventType {
    const roll = rng();
    const shopThreshold = Math.min(0.32, 0.08 + this.shopChanceBias * 0.22);
    const rewardThreshold = Math.min(0.92, 0.68 + this.rewardChanceBias * 0.22);
    if (roll < shopThreshold) {
      return 'shop';
    }
    if (roll < rewardThreshold) {
      return 'gift';
    }
    return 'rare_item';
  }

  private resolveStartingLane(score: number, y: number) {
    return this.getLaneIndex(y, getPathLaneTargets(score));
  }

  private resolveLaneFallback(previousLane: number, targetLane: number, score: number) {
    const laneSpacing = getPathLaneSpacing(score);
    const maxLaneShift = Math.max(
      1,
      Math.min(MAX_LANE_DELTA_PER_STEP, Math.floor(getDifficultyProfile(score).maxVerticalDelta / Math.max(0.001, laneSpacing)))
    );
    const steppedLane = previousLane + THREE.MathUtils.clamp(targetLane - previousLane, -maxLaneShift, maxLaneShift);
    return THREE.MathUtils.clamp(steppedLane, 0, getPathLaneTargets(0).length - 1);
  }

  private resolveLaneCoverageTarget(descriptor: StructuralBlockDescriptor) {
    if (descriptor.kind === 'intro' || descriptor.blockStartMeters < 110) {
      return 8;
    }
    if (descriptor.blockStartMeters < 210) {
      return 5;
    }
    if (descriptor.blockStartMeters < 310) {
      return 4;
    }
    if (descriptor.blockStartMeters < 410) {
      return 3;
    }
    if (descriptor.blockStartMeters < 510) {
      return 2;
    }
    return 1;
  }

  private buildLaneSequence(
    descriptor: StructuralBlockDescriptor,
    count: number,
    startingLane: number,
    rng: () => number
  ) {
    if (count <= 0) {
      return [] as number[];
    }

    const laneCount = getPathLaneTargets(0).length;
    const coverageTarget = this.resolveLaneCoverageTarget(descriptor);
    const dominantLane = this.resolveDominantLane(descriptor, coverageTarget, laneCount, rng);
    const lanePool = this.buildLanePool(coverageTarget, dominantLane, laneCount);
    const earlySweep = descriptor.kind === 'intro' || descriptor.blockStartMeters < 110;
    const sequence: number[] = [];
    let currentLane = THREE.MathUtils.clamp(startingLane, 0, laneCount - 1);
    let pointer = earlySweep
      ? 0
      : lanePool.reduce((bestIndex, lane, index) => (
          Math.abs(lane - currentLane) < Math.abs((lanePool[bestIndex] ?? currentLane) - currentLane) ? index : bestIndex
        ), 0);
    let direction: 1 | -1 = rng() < 0.5 ? 1 : -1;
    const lateRepeatChance = coverageTarget <= 1 ? 0.86 : coverageTarget === 2 ? 0.46 : coverageTarget === 3 ? 0.22 : 0.08;

    for (let index = 0; index < count; index += 1) {
      const templateLane = earlySweep
        ? EARLY_FULL_HEIGHT_SWEEP_ORDER[index % EARLY_FULL_HEIGHT_SWEEP_ORDER.length] ?? dominantLane
        : lanePool[pointer] ?? dominantLane;
      currentLane = this.resolveLaneFallback(currentLane, templateLane, Math.max(0, descriptor.index * 40 + index));
      sequence.push(currentLane);

      if (earlySweep) {
        continue;
      }
      if (currentLane === templateLane && rng() < lateRepeatChance) {
        continue;
      }

      pointer += direction;
      if (pointer >= lanePool.length || pointer < 0) {
        direction = direction === 1 ? -1 : 1;
        pointer = THREE.MathUtils.clamp(pointer, 0, lanePool.length - 1);
      }
    }

    return sequence;
  }

  private resolveDominantLane(
    descriptor: StructuralBlockDescriptor,
    coverageTarget: number,
    laneCount: number,
    rng: () => number
  ) {
    if (descriptor.kind === 'intro' || descriptor.blockStartMeters < 110) {
      return Math.floor(laneCount * 0.5);
    }

    const safeMin = coverageTarget <= 2 ? 0 : 1;
    const safeMax = coverageTarget <= 2 ? laneCount - 1 : laneCount - 2;
    return THREE.MathUtils.clamp(
      Math.round((laneCount - 1) * (0.18 + rng() * 0.64)),
      safeMin,
      safeMax
    );
  }

  private buildLanePool(coverageTarget: number, dominantLane: number, laneCount: number) {
    if (coverageTarget >= laneCount - 2) {
      return Array.from({ length: laneCount }, (_, index) => index);
    }
    if (coverageTarget <= 1) {
      return [THREE.MathUtils.clamp(dominantLane, 0, laneCount - 1)];
    }

    const span = Math.max(1, coverageTarget);
    const start = THREE.MathUtils.clamp(
      dominantLane - Math.floor((span - 1) * 0.5),
      0,
      Math.max(0, laneCount - span)
    );
    return Array.from({ length: span }, (_, index) => start + index);
  }

  private resolveMotionDistance(
    descriptor: StructuralBlockDescriptor,
    motionPattern: GameShardMotionPattern,
    score: number,
    rng: () => number
  ) {
    if (motionPattern === 'none') {
      return 0;
    }

    const laneSpacing = getPathLaneSpacing(score);
    const progression = clamp((descriptor.blockStartMeters - 10) / 500, 0, 1);
    if (motionPattern === 'vertical') {
      return laneSpacing * THREE.MathUtils.lerp(1.18, 1.56, progression * 0.8 + rng() * 0.12);
    }
    if (motionPattern === 'horizontal') {
      return DEFAULT_COLUMN_DISTANCE * THREE.MathUtils.lerp(0.62, 1.02, progression * 0.86 + rng() * 0.1);
    }
    return DEFAULT_COLUMN_DISTANCE * THREE.MathUtils.lerp(0.56, 0.88, progression * 0.72 + rng() * 0.12);
  }

  private getPostMilestoneRewardReservedRange(previous: GamePathNode, descriptor: StructuralBlockDescriptor) {
    if (!previous.isMilestone || descriptor.kind !== 'main') {
      return null;
    }
    return {
      startX: this.getAbsoluteXForMeters(descriptor.blockStartMeters + POST_MILESTONE_REWARD_RESERVED_START_METERS),
      endX: this.getAbsoluteXForMeters(descriptor.blockStartMeters + POST_MILESTONE_REWARD_RESERVED_END_METERS)
    } satisfies PlacementReservedRange;
  }

  private placeStructuralNode(
    previous: GamePathNode,
    generated: GamePathNode[],
    reservedRanges: PlacementReservedRange[],
    plan: StructuralNodePlan,
    rng: () => number
  ) {
    const anchor = generated[generated.length - 1] ?? previous;
    const score = anchor.index + 1;
    const laneCount = getPathLaneTargets(score).length;
    const laneOrder = this.buildLaneTrialOrder(plan.laneIndex, laneCount);
    const sizeOrder = this.buildSizeTrialOrder(plan.sizeTier);
    const xOffsets = plan.guaranteedShopIcon ? [0] : [0, 0.12, -0.08, 0.24];
    const motionVariants =
      plan.motionPattern === 'none'
        ? [{ pattern: 'none' as GameShardMotionPattern, direction: null, distance: 0, duration: 0 }]
        : [
            {
              pattern: plan.motionPattern,
              direction: plan.motionDirection,
              distance: plan.motionDistance,
              duration: plan.motionDuration
            },
            { pattern: 'none' as GameShardMotionPattern, direction: null, distance: 0, duration: 0 }
          ];

    for (const sizeTier of sizeOrder) {
      for (const laneIndex of laneOrder) {
        for (const motion of motionVariants) {
          for (const xOffset of xOffsets) {
            const shapeKind =
              motion.pattern !== 'none' || plan.eventType === 'shop'
                ? 'round'
                : plan.shapeKind;
            const candidate = this.buildGeneratedNode(anchor, {
              ...plan,
              absoluteMeters: plan.absoluteMeters + xOffset,
              laneIndex,
              sizeTier,
              shapeKind,
              motionPattern: motion.pattern,
              motionDirection: motion.direction,
              motionDistance: motion.distance,
              motionDuration: motion.duration
            }, rng);
            if (!candidate) {
              continue;
            }
            if (!this.validatePlacement([candidate], this.nodes, generated, reservedRanges)) {
              continue;
            }
            return candidate;
          }
        }
      }
    }

    return null;
  }

  private buildLaneTrialOrder(targetLane: number, laneCount: number) {
    const order: number[] = [targetLane];
    for (let offset = 1; offset < laneCount; offset += 1) {
      const lower = targetLane - offset;
      const upper = targetLane + offset;
      if (upper < laneCount) {
        order.push(upper);
      }
      if (lower >= 0) {
        order.push(lower);
      }
    }
    return order;
  }

  private buildSizeTrialOrder(target: GameShardSizeTier) {
    const index = SIZE_TIER_ORDER.indexOf(target);
    if (index < 0) {
      return [target];
    }
    const order = [target];
    for (let step = 1; step <= 3; step += 1) {
      const fallback = SIZE_TIER_ORDER[index - step];
      if (fallback) {
        order.push(fallback);
      }
    }
    return order;
  }

  private buildGeneratedNode(previous: GamePathNode, plan: StructuralNodePlan, rng: () => number) {
    const score = previous.index + 1;
    const x = this.getAbsoluteXForMeters(plan.absoluteMeters);
    if (x <= previous.x + DEFAULT_COLUMN_DISTANCE * 0.16) {
      return null;
    }

    const laneTargets = getPathLaneTargets(score);
    const targetLaneY = laneTargets[plan.laneIndex] ?? 0;
    const jitter =
      plan.guaranteedShopIcon
        ? 0
        : plan.sizeTier === 'large' || plan.sizeTier === 'medium_large'
          ? 0.22
          : 0.38;
    const y = targetLaneY + (rng() - 0.5) * jitter;
    const sizeConfig = SIZE_TIER_CONFIG[plan.sizeTier];
    const gameplayRadius = sizeConfig.radius[0] + rng() * (sizeConfig.radius[1] - sizeConfig.radius[0]);
    const visualScale = sizeConfig.visual[0] + rng() * (sizeConfig.visual[1] - sizeConfig.visual[0]);
    const orbitPeriod = sizeConfig.orbitPeriod[0] + rng() * (sizeConfig.orbitPeriod[1] - sizeConfig.orbitPeriod[0]);
    const shapeKind = plan.motionPattern !== 'none' || plan.eventType === 'shop' ? 'round' : plan.shapeKind;
    const spinDirection: GameShardSpinDirection = shapeKind === 'triangular' ? 'cw' : rng() < 0.5 ? 'cw' : 'ccw';
    const spinSpeed =
      shapeKind === 'triangular'
        ? 0.36 + rng() * 0.18
        : shapeKind === 'oval'
          ? 0.16 + rng() * 0.08
          : 0.08 + rng() * 0.08;
    const visualStretch =
      shapeKind === 'oval'
        ? { x: 1.58 + rng() * 0.32, y: 0.72 + rng() * 0.1, z: 0.86 + rng() * 0.08 }
        : shapeKind === 'triangular'
          ? { x: 1.12 + rng() * 0.12, y: 1.18 + rng() * 0.12, z: 0.7 + rng() * 0.08 }
          : { x: 1, y: 1, z: 1 };

    return this.buildNode({
      previous,
      index: previous.index + 1,
      x,
      y,
      direction: this.directionFrom(previous.x, previous.y, x, y),
      sizeTier: plan.sizeTier,
      shapeKind,
      motionPattern: plan.motionPattern,
      motionMode: plan.motionPattern === 'none' ? 'none' : 'landing_once',
      motionDirection: plan.motionDirection,
      motionDistance: plan.motionDistance,
      motionDuration: plan.motionDuration,
      motionActivatedAt: null,
      spinDirection,
      spinSpeed,
      gameplayRadius,
      visualScale,
      gameplayOrbitPeriod: orbitPeriod,
      visualStretch,
      kind: plan.eventType === 'none' ? 'normal' : 'event',
      branchSlot: null,
      offerId: null,
      onboarding: plan.absoluteMeters < INTRO_ONBOARDING_END_METERS,
      eventType: plan.eventType,
      eventVisualKind: plan.eventType === 'shop' ? 'shop' : plan.eventType === 'none' ? 'default' : 'question',
      guaranteedShopIcon: plan.guaranteedShopIcon,
      colorHint: plan.eventType === 'none' ? 'none' : 'accent',
      isMilestone: false,
      isGigantic: false,
      milestoneOwned: plan.milestoneOwned ?? false,
      coinSlots: this.buildCoinSlots(plan.coinAngles, plan.eventType, score, rng),
      enemySlot: this.buildEnemySlot(plan.enemyPole, score, plan.eventType, shapeKind, rng),
      motionSeed: rng() * Math.PI * 2
    });
  }

  private getPathDistanceOffset() {
    const origin = this.nodes[0];
    return origin ? origin.x - origin.pathDistance : 0;
  }

  private getAbsoluteXForMeters(targetMeters: number) {
    return targetMeters * DEFAULT_COLUMN_DISTANCE + this.getPathDistanceOffset();
  }

  private buildMilestonePrototype(targetMilestoneMeters: number): GamePathNode {
    const milestoneVisualScale = MILESTONE_HALF_WIDTH / (1.25 * 0.92);
    return {
      index: -1,
      x: this.getAbsoluteXForMeters(targetMilestoneMeters),
      y: 0,
      z: 0,
      gameplayRadius: MILESTONE_HALF_WIDTH,
      visualScale: milestoneVisualScale,
      pathDistance: targetMilestoneMeters * DEFAULT_COLUMN_DISTANCE,
      direction: 'right',
      kind: 'milestone',
      sizeTier: 'massive',
      shapeKind: 'round',
      spinDirection: 'cw',
      spinSpeed: 0.04,
      motionPattern: 'none',
      motionMode: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      motionActivatedAt: null,
      eventType: 'none',
      eventVisualKind: 'default',
      guaranteedShopIcon: false,
      colorHint: 'none',
      gameplayOrbitPeriod: 5.4,
      branchSlot: null,
      offerId: null,
      onboarding: false,
      isMilestone: true,
      isGigantic: true,
      milestoneOwned: false,
      reservedMilestoneDistance: null,
      coinSlots: [],
      enemySlot: null,
      motionSeed: 0,
      visualStretch: { x: 1, y: 1, z: 1 }
    };
  }

  private getFutureMilestoneReservedRange(targetMilestoneMeters: number) {
    return buildMilestoneReservedRange(this.buildMilestonePrototype(targetMilestoneMeters));
  }

  private buildMilestoneNode(previous: GamePathNode, targetMilestoneMeters: number) {
    const prototype = this.buildMilestonePrototype(targetMilestoneMeters);
    return this.buildNode({
      previous,
      index: previous.index + 1,
      x: prototype.x,
      y: 0,
      direction: 'right',
      sizeTier: 'massive',
      shapeKind: 'round',
      motionPattern: 'none',
      motionMode: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      motionActivatedAt: null,
      spinDirection: 'cw',
      spinSpeed: prototype.spinSpeed,
      gameplayRadius: prototype.gameplayRadius,
      visualScale: prototype.visualScale,
      gameplayOrbitPeriod: prototype.gameplayOrbitPeriod,
      visualStretch: prototype.visualStretch,
      kind: 'milestone',
      branchSlot: null,
      offerId: null,
      onboarding: false,
      eventType: 'none',
      eventVisualKind: 'default',
      guaranteedShopIcon: false,
      colorHint: 'none',
      isMilestone: true,
      isGigantic: true,
      coinSlots: [],
      enemySlot: null,
      motionSeed: this.createIndexedRng(307, Math.round(targetMilestoneMeters * 10))() * Math.PI * 2
    });
  }

  private buildEmergencyBlock(previous: GamePathNode) {
    const descriptor = this.describeNextBlock(previous);
    const rng = this.createIndexedRng(401, descriptor.index + 1);
    const reservedRange = this.getFutureMilestoneReservedRange(descriptor.targetMilestoneMeters);
    const content = this.buildSafeBlockNodes(previous, descriptor, reservedRange, rng);
    const milestoneBase = content[content.length - 1] ?? previous;
    return [...content, this.buildMilestoneNode(milestoneBase, descriptor.targetMilestoneMeters)];
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

  private buildPlanCoinAngles(
    descriptor: StructuralBlockDescriptor,
    columnIndex: number,
    eventType: GameEventType,
    score: number,
    rng: () => number
  ) {
    if (eventType === 'shop') {
      return [] as number[];
    }

    const earlyIntroCoin = descriptor.kind === 'intro' && columnIndex < 3;
    const coinChance =
      earlyIntroCoin
        ? 1
        : descriptor.kind === 'intro'
          ? 0.3
          : score < 40
            ? 0.24
            : score < 120
              ? 0.18
              : 0.12;
    if (rng() > coinChance) {
      return [] as number[];
    }

    const count = descriptor.kind === 'main' && score > 80 && rng() < 0.24 ? 2 : 1;
    return Array.from({ length: count }, () => Math.PI * (0.18 + rng() * 1.48));
  }

  private pickPlanEnemyPole(
    eventType: GameEventType,
    motionPattern: GameShardMotionPattern,
    shapeKind: GameShardShapeKind,
    score: number,
    rng: () => number
  ) {
    const profile = getDifficultyProfile(score);
    if (!profile.enemyUnlocked || eventType !== 'none' || motionPattern !== 'none' || shapeKind !== 'round') {
      return null;
    }
    const chance = score < 60 ? 0.12 : score < 120 ? 0.18 : 0.24;
    if (rng() > chance) {
      return null;
    }
    return rng() < 0.5 ? 'north' : 'south';
  }

  private buildCoinSlots(coinAngles: number[], eventType: GameEventType, score: number, rng: () => number) {
    const decorateCoinSlot = (angle: number) => {
      const airborneChance = score < 20 ? 0.36 : score < 70 ? 0.24 : score < 140 ? 0.17 : 0.12;
      const airborne = eventType !== 'shop' && rng() < airborneChance;
      const liftBias = Math.sin(angle) * THREE.MathUtils.lerp(0.1, 0.42, rng());
      return {
        angle,
        value: eventType === 'rare_item' ? 2 : 1,
        collected: false,
        orbitScale: airborne ? THREE.MathUtils.lerp(1.18, 1.74, rng()) : 1,
        forwardOffset: airborne ? THREE.MathUtils.lerp(0.8, 2.7, rng()) : 0,
        verticalOffset: airborne ? THREE.MathUtils.lerp(-0.18, 1.18, rng()) + liftBias : 0
      };
    };

    const slots = coinAngles.map((angle) => decorateCoinSlot(angle));
    if (slots.length === 0 && score < 12 && eventType === 'none') {
      slots.push(decorateCoinSlot(Math.PI * (0.2 + rng() * 1.2)));
    }
    return slots;
  }

  private buildEnemySlot(
    pole: 'north' | 'south' | null,
    score: number,
    eventType: GameEventType,
    shapeKind: GameShardShapeKind,
    rng: () => number
  ) {
    const profile = getDifficultyProfile(score);
    if (!profile.enemyUnlocked || eventType === 'shop' || eventType === 'gift' || shapeKind !== 'round' || !pole) {
      return null;
    }

    const tier =
      score < 60
        ? 'light'
        : score < 120
          ? (rng() < 0.7 ? 'armored' : 'light')
          : rng() < 0.18
            ? 'invincible'
            : rng() < 0.55
              ? 'elite'
              : 'armored';

    const speedThreshold = tier === 'light' ? 4.6 : tier === 'armored' ? 6.4 : tier === 'elite' ? 8.1 : Number.POSITIVE_INFINITY;
    return {
      pole,
      tier,
      alive: true,
      rewardCoins: tier === 'elite' ? 10 : tier === 'armored' ? 8 + Math.floor(rng() * 2) : tier === 'light' ? 5 + Math.floor(rng() * 4) : 0,
      speedThreshold
    } as const;
  }

  private pickSizeTier(allowed: GameShardSizeTier[], score: number, rng: () => number) {
    const profile = getDifficultyProfile(score);
    const filtered = SIZE_TIER_ORDER.filter((tier) => allowed.includes(tier));
    const maxIndex = clamp(Math.floor(profile.normalized * (filtered.length - 1) + 4), 0, filtered.length - 1);
    const eligible = filtered.slice(0, maxIndex + 1);
    return eligible[Math.floor(rng() * eligible.length)] ?? 'medium';
  }

  private pickShapeKind(allowed: GameShardShapeKind[], score: number, rng: () => number) {
    const normalized = clamp(score / 220, 0, 1);
    const weights: Record<GameShardShapeKind, number> = {
      round: 0.84 - normalized * 0.3,
      oval: 0.11 + normalized * 0.09,
      triangular: 0.05 + normalized * 0.21
    };

    const available: GameShardShapeKind[] = allowed.length > 0 ? allowed : ['round'];
    const total = available.reduce((sum, shape) => sum + (weights[shape] ?? 0), 0);
    let cursor = rng() * total;
    for (const shape of available) {
      cursor -= weights[shape] ?? 0;
      if (cursor <= 0) {
        return shape;
      }
    }
    return available[0] ?? 'round';
  }

  private pickBlockMotionPattern(
    descriptor: StructuralBlockDescriptor,
    columnIndex: number,
    score: number,
    sizeTier: GameShardSizeTier,
    rng: () => number
  ) {
    const profile = getDifficultyProfile(score);
    if (!profile.roundMovementUnlocked || ['large', 'very_large', 'huge', 'massive'].includes(sizeTier)) {
      return 'none' as GameShardMotionPattern;
    }

    const distanceTaper = clamp((descriptor.blockStartMeters - DENSITY_TAPER_START_METERS) / Math.max(1, DENSITY_TAPER_END_METERS - DENSITY_TAPER_START_METERS), 0, 1);
    const baseChance =
      descriptor.kind === 'intro'
        ? 0.36
        : THREE.MathUtils.lerp(0.54, 0.34, THREE.MathUtils.smootherstep(distanceTaper, 0, 1));
    const profileLift = clamp(profile.movingShardChance * 0.3, 0.08, 0.22);
    const progressionBoost = clamp(score / 260, 0, 1) * 0.1;
    if (rng() > Math.min(0.82, baseChance + profileLift + progressionBoost)) {
      return 'none' as GameShardMotionPattern;
    }

    const roll = rng() + (columnIndex % 5) * 0.06;
    if (roll < 0.4) {
      return 'vertical';
    }
    if (roll < 0.74) {
      return 'drift';
    }
    return 'horizontal';
  }

  private createIndexedRng(stream: number, salt: number) {
    let state = (this.runSeed ^ Math.imul(stream + 0x9e3779b9, 0x45d9f3b)) >>> 0;
    state = Math.imul(state ^ (salt + 0x7f4a7c15), 0x45d9f3b) >>> 0;
    state = Math.imul(state ^ (state >>> 16), 0x45d9f3b) >>> 0;
    state = Math.imul(state ^ (state >>> 16), 0x45d9f3b) >>> 0;
    let lcgState = (state % 0x7ffffffe) + 1;

    return () => {
      lcgState = (lcgState * 48271) % 0x7fffffff;
      return lcgState / 0x7fffffff;
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
