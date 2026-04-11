import * as THREE from 'three';
import { clamp } from '../core/math';
import { DEFAULT_COLUMN_DISTANCE, getDifficultyProfile, pathDistanceToMeters } from './difficultyScaler';
import { EventSystem } from './EventSystem';
import { getPathLaneSpacing, getPathLaneTargets } from './pathLayout';
import type { GamePathPattern, GamePatternNodeTemplate } from './PatternLibrary';
import { selectPattern } from './PatternSelector';
import { validatePatternPlacement, validateTeleportTarget } from './PatternValidator';
import { getCrossedUpgradeMilestone, type RogueliteItemOffer } from './roguelite';
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
const MILESTONE_RESERVED_BEFORE = DEFAULT_COLUMN_DISTANCE;
const MILESTONE_REWARD_OFFSET = DEFAULT_COLUMN_DISTANCE * 3.28;
const MILESTONE_RESERVED_AFTER = DEFAULT_COLUMN_DISTANCE * 1.35;
const MILESTONE_EXIT_BUFFER = DEFAULT_COLUMN_DISTANCE * 0.45;
const MILESTONE_BRANCH_REJOIN_PADDING = DEFAULT_COLUMN_DISTANCE * 1.1;
const MILESTONE_MIN_SEPARATION_X =
  MILESTONE_REWARD_OFFSET + MILESTONE_RESERVED_AFTER + MILESTONE_EXIT_BUFFER + DEFAULT_COLUMN_DISTANCE * 2.2;
const EARLY_PATTERN_DISTANCE_METERS = 200;
const EARLY_SUPPORT_BAND_FADE_END_METERS = 430;
const EARLY_SUPPORT_BAND_BASE_PROBABILITY = 0.92;
const EARLY_SUPPORT_BAND_MIN_PROBABILITY = 0.18;
const EARLY_SUPPORT_BAND_MAX_STEP = DEFAULT_COLUMN_DISTANCE * 1.95;
const EARLY_SUPPORT_BAND_MIN_STEP = DEFAULT_COLUMN_DISTANCE * 1.18;
const EARLY_SUPPORT_BAND_WAVE_AMPLITUDE = 0.74;
const EARLY_SUPPORT_BAND_TILT_RADIANS = 0.2;
const EARLY_SUPPORT_BAND_BOTTOM_OFFSET_PX = DEFAULT_COLUMN_DISTANCE * 0.88;
const EARLY_SUPPORT_BAND_MAX_COUNT = 8;
const EARLY_UPPER_RECOVERY_FADE_END_METERS = 320;
const SHOP_SHARD_MAX_MOTION_DISTANCE = DEFAULT_COLUMN_DISTANCE * 0.42;
const SHOP_SHARD_MAX_MOTION_SPEED = DEFAULT_COLUMN_DISTANCE * 0.39;

function getMilestoneReservedRangeX(centerX: number) {
  return {
    start: centerX - MILESTONE_REWARD_OFFSET,
    end: centerX + MILESTONE_REWARD_OFFSET + MILESTONE_RESERVED_AFTER + MILESTONE_EXIT_BUFFER
  };
}

export class GamePathSystem {
  private nodes: GamePathNode[] = [];
  private eventSystem = new EventSystem();
  private seed = 1;
  private recentPatternIds: string[] = [];
  private lastShopDistanceMeters = Number.NEGATIVE_INFINITY;
  private guaranteedShopAt50Spawned = false;
  private rewardChanceBias = 0;
  private shopChanceBias = 0;
  private worldDirectionSign: 1 | -1 = 1;
  private worldOffsetX = 0;

  reset() {
    this.seed = (Math.random() * 0x7fffffff) | 1;
    this.recentPatternIds = [];
    this.eventSystem.reset();
    this.lastShopDistanceMeters = Number.NEGATIVE_INFINITY;
    this.guaranteedShopAt50Spawned = false;
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
  }

  ensureAhead(currentIndex: number, threshold = 50, chunkSize = 30) {
    if (this.nodes.length === 0) {
      this.reset();
    }
    if (this.nodes.length - currentIndex > threshold) return;
    this.append(chunkSize);
  }

  queuePostMilestoneEvents(fromIndex: number, score: number) {
    this.eventSystem.schedulePostMilestoneEvents(fromIndex, score, () => this.nextRandom());
  }

  setEventBiases(rewardChance: number, shopChance: number) {
    this.rewardChanceBias = Math.max(0, rewardChance);
    this.shopChanceBias = Math.max(0, shopChance);
  }

  getInitialNodes(count: number) {
    this.prebuild(Math.max(180, count + 60));
    return this.nodes.slice(0, count);
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
    const stitchBase = [...preserved, ...normalized];
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

        if (!validatePatternPlacement([stitchedNode], [...stitchBase, ...stitchedTail])) {
          break;
        }

        stitchedTail.push(stitchedNode);
      }
    }

    this.nodes = [...preserved, ...normalized, ...stitchedTail];
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

  private append(minimumNodes: number) {
    if (minimumNodes <= 0) return;
    if (this.nodes.length === 0) {
      this.reset();
    }

    let appended = 0;
    while (appended < minimumNodes) {
      const previous = this.nodes[this.nodes.length - 1];
      const distanceMeters = previous ? pathDistanceToMeters(previous.pathDistance) : 0;
      const pattern = selectPattern({
        score: this.nodes.length,
        distanceMeters,
        rng: () => this.nextRandom(),
        recentPatternIds: this.recentPatternIds
      });
      if (!pattern || !Array.isArray(pattern.nodes) || pattern.nodes.length === 0) {
        const previous = this.nodes[this.nodes.length - 1];
        if (!previous) {
          this.reset();
          continue;
        }
        const fallback = this.buildFallbackPattern(previous);
        this.nodes.push(...fallback);
        appended += fallback.length;
        continue;
      }
      const generated = this.instantiatePattern(pattern);
      this.nodes.push(...generated);
      this.recentPatternIds.push(pattern.id);
      if (this.recentPatternIds.length > 6) {
        this.recentPatternIds.shift();
      }
      appended += generated.length;
    }
  }

  private instantiatePattern(pattern: GamePathPattern) {
    let previous = this.nodes[this.nodes.length - 1];
    if (!previous) {
      this.reset();
      previous = this.nodes[this.nodes.length - 1];
    }
    if (!previous) {
      return [];
    }
    const score = previous.index;
    const distanceMeters = pathDistanceToMeters(previous.pathDistance);
    const profile = getDifficultyProfile(score);
    const scale = profile.spacing / 11.5;
    const rawCandidates = pattern.nodes.flatMap((template, offset) => {
      if (!template) {
        return [];
      }
      const index = previous.index + offset + 1;
      return [this.buildTemplateNode(previous, index, template, pattern, scale, score)];
    });
    if (rawCandidates.length === 0) {
      return this.buildFallbackPattern(previous);
    }
    const candidates = this.isolateMilestones(this.densifyPattern(previous, rawCandidates, score, distanceMeters), previous, score);
    let basePattern: GamePathNode[];

    if (validatePatternPlacement(candidates, this.nodes)) {
      basePattern = candidates;
    } else if (validatePatternPlacement(rawCandidates, this.nodes)) {
      basePattern = rawCandidates;
    } else {
      basePattern = this.buildFallbackPattern(previous);
    }

    const reservedPattern = this.reserveMilestones(previous, this.expandLanePresence(previous, basePattern, score, distanceMeters), score);
    const withLowerSupport = this.injectLowerSupportBand(previous, reservedPattern, score, distanceMeters);
    const withUpperRecovery = this.injectUpperRecoveryBand(previous, withLowerSupport, score, distanceMeters);
    return this.stabilizePatternLayout(previous, withUpperRecovery, score);
  }

  private reserveMilestones(previous: GamePathNode, nodes: GamePathNode[], score: number) {
    if (nodes.length === 0) return nodes;

    const reserved: GamePathNode[] = [];
    let cursor = previous;
    nodes.forEach((node) => {
      const segmentDistance = Math.hypot(node.x - cursor.x, node.y - cursor.y);
      const previousDistanceMeters = pathDistanceToMeters(cursor.pathDistance);
      const currentDistanceMeters = pathDistanceToMeters(cursor.pathDistance + segmentDistance);
      const crossedMilestone = getCrossedUpgradeMilestone(previousDistanceMeters, currentDistanceMeters);

      let nextNode = { ...node };
      if (crossedMilestone !== null && !cursor.isMilestone && !node.isMilestone) {
        const milestoneVisualScale = MILESTONE_HALF_WIDTH / (1.25 * 0.92);
        const milestoneGap = MILESTONE_HALF_WIDTH + MILESTONE_RESERVED_BEFORE;
        const x = Math.max(node.x, cursor.x + milestoneGap);
        nextNode = this.buildNode({
          previous: cursor,
          index: cursor.index + 1,
          x,
          y: 0,
          direction: 'right',
          sizeTier: 'massive',
          shapeKind: 'round',
          motionPattern: 'none',
          spinDirection: 'cw',
          spinSpeed: 0.04,
          gameplayRadius: MILESTONE_HALF_WIDTH,
          visualScale: milestoneVisualScale,
          gameplayOrbitPeriod: 5.4,
          visualStretch: { x: 1, y: 1, z: 1 },
          kind: 'milestone',
          branchSlot: null,
          offerId: null,
          onboarding: false,
          eventType: 'none',
          colorHint: 'none',
          isMilestone: true,
          isGigantic: true,
          coinSlots: [],
          enemySlot: null
        });
      }

      const normalized = this.reindexNode(nextNode, cursor.index + 1, cursor);
      reserved.push(normalized);
      cursor = normalized;
    });

    return this.enrichMilestoneVicinity(previous, this.isolateMilestones(reserved, previous, score), score);
  }

  private stabilizePatternLayout(previous: GamePathNode, nodes: GamePathNode[], score: number) {
    if (nodes.length === 0) {
      return nodes;
    }

    const ordered = [...nodes].sort((left, right) => left.x - right.x);
    const stabilized: GamePathNode[] = [];
    const recentMilestone =
      [...this.nodes.slice(Math.max(0, this.nodes.length - 14)), previous]
        .reverse()
        .find((node) => node?.isMilestone) ?? null;
    let lastMilestone = recentMilestone;

    ordered.forEach((node) => {
      let candidate: GamePathNode = {
        ...node,
        coinSlots: node.coinSlots.map((slot) => ({ ...slot })),
        enemySlot: node.enemySlot ? { ...node.enemySlot } : null
      };

      if (candidate.isMilestone) {
        if (lastMilestone && candidate.x - lastMilestone.x < MILESTONE_MIN_SEPARATION_X) {
          return;
        }
        candidate = { ...candidate, y: 0 };
      } else if (lastMilestone) {
        const reservedRange = getMilestoneReservedRangeX(lastMilestone.x);
        const laneSpacing = getPathLaneSpacing(score);
        const insideReservedZone = candidate.x >= reservedRange.start && candidate.x <= reservedRange.end;
        if (insideReservedZone && Math.abs(candidate.y - lastMilestone.y) < laneSpacing * 2.35) {
          candidate = {
            ...candidate,
            x: reservedRange.end + Math.max(DEFAULT_COLUMN_DISTANCE * 0.92, candidate.gameplayRadius * 0.42),
            y:
              Math.abs(candidate.y) < laneSpacing * 2.45
                ? this.alignToLane(candidate.y >= 0 ? laneSpacing * 3.55 : -laneSpacing * 3.15, score, candidate.sizeTier, true)
                : candidate.y
          };
        }
      }

      const prior = stabilized[stabilized.length - 1] ?? previous;
      let normalized = this.reindexNode(candidate, prior.index + 1, prior);

      if (!validatePatternPlacement([normalized], [...this.nodes, ...stabilized])) {
        if (candidate.isMilestone) {
          return;
        }

        const referenceMilestone = lastMilestone;
        if (!referenceMilestone) {
          return;
        }

        const laneSpacing = getPathLaneSpacing(score);
        const shiftedCandidate = {
          ...candidate,
          x: Math.max(candidate.x, getMilestoneReservedRangeX(referenceMilestone.x).end + DEFAULT_COLUMN_DISTANCE * 1.05),
          y:
            Math.abs(candidate.y - referenceMilestone.y) < laneSpacing * 2.4
              ? this.alignToLane(candidate.y >= 0 ? laneSpacing * 3.65 : -laneSpacing * 3.25, score, candidate.sizeTier, true)
              : candidate.y
        };
        normalized = this.reindexNode(shiftedCandidate, prior.index + 1, prior);
        if (!validatePatternPlacement([normalized], [...this.nodes, ...stabilized])) {
          return;
        }
      }

      stabilized.push(normalized);
      if (normalized.isMilestone) {
        lastMilestone = normalized;
      }
    });

    return stabilized;
  }

  private buildTemplateNode(
    previous: GamePathNode,
    index: number,
    template: GamePatternNodeTemplate,
    pattern: GamePathPattern,
    scale: number,
    score: number
  ) {
    const baseShapeKind = this.pickShapeKind(pattern.allowedShapeKinds, score);
    const provisionalSizeTier = template.sizeTier ?? this.pickSizeTier(pattern.allowedShardSizes, score);
    const sizeTier = provisionalSizeTier;
    const x = previous.x + template.x * scale;
    const rawY = previous.y + template.y * scale * 1.14;
    const y = this.alignToLane(rawY, score, sizeTier, false);
    const segmentDistance = Math.hypot(x - previous.x, y - previous.y);
    const previousDistanceMeters = pathDistanceToMeters(previous.pathDistance);
    const currentDistanceMeters = pathDistanceToMeters(previous.pathDistance + segmentDistance);
    const isMilestone = getCrossedUpgradeMilestone(previousDistanceMeters, currentDistanceMeters) !== null;
    const isGigantic = isMilestone;
    const resolvedSizeTier = isGigantic ? 'massive' : sizeTier;
    const resolvedSizeConfig = SIZE_TIER_CONFIG[resolvedSizeTier];
    const gameplayRadius = isGigantic ? 14.4 + this.nextRandom() * 2.6 : resolvedSizeConfig.radius[0] + this.nextRandom() * (resolvedSizeConfig.radius[1] - resolvedSizeConfig.radius[0]);
    const visualScale = isGigantic ? 38 + this.nextRandom() * 14 : resolvedSizeConfig.visual[0] + this.nextRandom() * (resolvedSizeConfig.visual[1] - resolvedSizeConfig.visual[0]);
    const gameplayOrbitPeriod = isGigantic ? 5.4 + this.nextRandom() * 0.8 : resolvedSizeConfig.orbitPeriod[0] + this.nextRandom() * (resolvedSizeConfig.orbitPeriod[1] - resolvedSizeConfig.orbitPeriod[0]);
    const direction = this.directionFrom(previous.x, previous.y, x, y);
    const { eventType, eventVisualKind, guaranteedRoundShop } = this.resolveEventType(
      index,
      previousDistanceMeters,
      currentDistanceMeters,
      score,
      template
    );
    const stylizedShopVisual = eventVisualKind === 'shop' && !guaranteedRoundShop;
    const hasTemplateMotion = Boolean(template.motionPattern && template.motionPattern !== 'none');
    const shapeKind = hasTemplateMotion || guaranteedRoundShop ? 'round' : stylizedShopVisual ? 'triangular' : baseShapeKind;
    const motionPattern = isGigantic ? 'none' : this.pickMotionPattern(template.motionPattern, score, shapeKind, resolvedSizeTier);
    const motionMode: GameShardMotionMode = motionPattern !== 'none' ? 'landing_once' : 'none';
    const motionDirection =
      motionPattern !== 'none'
        ? this.resolveMotionDirection(template.motionDirection, template.motionPattern, template)
        : null;
    let motionDistance =
      motionMode === 'landing_once' ? this.resolveMotionDistance(template.motionDistance, template.motionPattern, score) : 0;
    let motionDuration =
      motionMode === 'landing_once' ? THREE.MathUtils.clamp(template.motionDuration ?? (1 + this.nextRandom() * 0.24), 0.82, 1.45) : 0;
    if (eventType === 'shop' && motionMode === 'landing_once') {
      const cappedShopMotion = this.applyShopMotionCap(motionDistance, motionDuration);
      motionDistance = cappedShopMotion.distance;
      motionDuration = cappedShopMotion.duration;
    }
    const spinDirection: GameShardSpinDirection = stylizedShopVisual ? 'cw' : this.nextRandom() < 0.5 ? 'cw' : 'ccw';
    const spinSpeed =
      stylizedShopVisual
        ? 0.82 + this.nextRandom() * 0.24
        : shapeKind === 'triangular'
        ? 0.42 + this.nextRandom() * 0.22
        : shapeKind === 'oval'
          ? 0.18 + this.nextRandom() * 0.1
          : 0.08 + this.nextRandom() * 0.12;
    const visualStretch =
      stylizedShopVisual
        ? { x: 1.22 + this.nextRandom() * 0.14, y: 1.34 + this.nextRandom() * 0.16, z: 0.68 + this.nextRandom() * 0.1 }
        : shapeKind === 'oval'
        ? { x: 1.72 + this.nextRandom() * 0.38, y: 0.68 + this.nextRandom() * 0.12, z: 0.82 + this.nextRandom() * 0.1 }
        : shapeKind === 'triangular'
          ? { x: 1.18 + this.nextRandom() * 0.18, y: 1.24 + this.nextRandom() * 0.16, z: 0.64 + this.nextRandom() * 0.12 }
          : { x: 1, y: 1, z: 1 };
    const kind = isMilestone ? 'milestone' : eventType === 'none' ? 'normal' : 'event';
    const colorHint: GamePathNode['colorHint'] =
      isMilestone
        ? 'accent'
        : eventType === 'none'
          ? 'none'
          : 'accent';
    const visibilityBoost = isMilestone || eventType !== 'none';
    const rewardVisualBoost = eventType === 'gift' || eventType === 'rare_item';
    const shopVisualBoost = eventType === 'shop';

    return this.buildNode({
      previous,
      index,
      x,
      y,
      direction,
      sizeTier: resolvedSizeTier,
      shapeKind,
      motionPattern,
      motionMode,
      motionDirection,
      motionDistance,
      motionDuration,
      motionActivatedAt: null,
      spinDirection,
      spinSpeed,
      gameplayRadius:
        stylizedShopVisual
          ? Math.max(gameplayRadius * 1.36, 3.45)
          : rewardVisualBoost
            ? gameplayRadius * 1.08
            : gameplayRadius,
      visualScale: visibilityBoost
        ? stylizedShopVisual
          ? Math.max(visualScale * 1.58, 5.4)
          : shopVisualBoost
            ? Math.max(visualScale * 1.24, 3.25)
            : rewardVisualBoost
              ? visualScale * 1.16
              : visualScale * 1.08
        : visualScale,
      gameplayOrbitPeriod,
      visualStretch,
      kind,
      branchSlot: null,
      offerId: null,
      onboarding: index < 50,
      eventType,
      eventVisualKind,
      guaranteedShopIcon: guaranteedRoundShop,
      colorHint,
      isMilestone,
      isGigantic,
      coinSlots: this.buildCoinSlots(template, eventType, score),
      enemySlot: this.buildEnemySlot(template, score, eventType, shapeKind)
    });
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
      const largestRadius = Math.max(candidate.gameplayRadius, cursor.gameplayRadius);
      const clusterPotential = largestRadius < 1.05 ? 5 : largestRadius < 1.9 ? 3 : 2;

      const needsExtra =
        score < 180 &&
        (
          distance > profile.spacing * (earlyVerticalBias ? 0.76 : 0.94) ||
          Math.abs(dy) > profile.maxVerticalDelta * 0.54 ||
          flatRun >= (earlyVerticalBias ? 1 : 2) ||
          periodicVerticalWindow
        );

      if (needsExtra) {
        const baseInsertions =
          earlyVerticalBias || periodicVerticalWindow || distance > profile.spacing * 1.18 || Math.abs(dy) > profile.maxVerticalDelta * 0.82 ? 2 : 1;
        const insertions = Math.min(clusterPotential, baseInsertions + (earlyVerticalBias && clusterPotential > 1 ? 1 : 0));
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
          const sizeTier: GameShardSizeTier = insertions >= 3 ? 'tiny' : step === 0 ? 'tiny' : 'very_small';
          const y = this.alignToLane(rawY, score, sizeTier, true);
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
            gameplayRadius: sizeTier === 'tiny' ? 0.78 : 0.96,
            visualScale: sizeTier === 'tiny' ? 0.86 : 1.08,
            gameplayOrbitPeriod: sizeTier === 'tiny' ? 2.4 : 2.75,
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
          if (validatePatternPlacement([supportNode], [...this.nodes, ...expanded])) {
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
        if (validatePatternPlacement([companionNode], [...this.nodes, ...expanded])) {
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
          if (validatePatternPlacement([outerCompanion], [...this.nodes, ...expanded])) {
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
    coinSlots: GameCoinSlot[];
    enemySlot: GamePathNode['enemySlot'];
    motionSeed?: number;
  }): GamePathNode {
    const previous = config.previous;
    const segmentDistance = previous ? Math.hypot(config.x - previous.x, config.y - previous.y) : 0;

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
    return this.buildNode({
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
      coinSlots: node.coinSlots.map((slot) => ({ ...slot })),
      enemySlot: node.enemySlot ? { ...node.enemySlot } : null,
      motionSeed: node.motionSeed
    });
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
      if (validatePatternPlacement(merged, this.nodes)) {
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
        if (validatePatternPlacement(merged, this.nodes)) {
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

  private resolveMotionDirection(
    explicitDirection: GameShardMotionDirection | undefined,
    templatePattern: GameShardMotionPattern | undefined,
    template: GamePatternNodeTemplate
  ): GameShardMotionDirection {
    if (explicitDirection) {
      return explicitDirection;
    }
    switch (templatePattern) {
      case 'vertical':
        return template.y >= 0 ? 'up' : 'down';
      case 'horizontal':
        return template.y >= 0 ? 'left' : 'right';
      case 'drift':
        return template.y >= 0 ? 'up_right' : 'down_right';
      case 'micro_orbit':
        return template.y >= 0 ? 'up_left' : 'down_left';
      default:
        return 'right';
    }
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

  private applyShopMotionCap(distance: number, duration: number) {
    const cappedDistance = Math.min(distance, SHOP_SHARD_MAX_MOTION_DISTANCE);
    const minimumDuration = cappedDistance / SHOP_SHARD_MAX_MOTION_SPEED;
    return {
      distance: cappedDistance,
      duration: Math.max(duration, minimumDuration)
    };
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

  private isolateMilestones(nodes: GamePathNode[], previous: GamePathNode, score: number) {
    if (!nodes.some((node) => node.isMilestone)) {
      return nodes;
    }

    const laneSpacing = getPathLaneSpacing(score);
    const isolated: GamePathNode[] = [];

    nodes.forEach((node, index) => {
      let nextNode = { ...node };
      if (nextNode.isMilestone) {
        const milestoneGap = MILESTONE_HALF_WIDTH + MILESTONE_RESERVED_BEFORE;
        nextNode = {
          ...nextNode,
          x: Math.max(nextNode.x, (isolated[index - 1] ?? previous).x + milestoneGap),
          y: 0
        };
      }

      const prior = isolated[index - 1] ?? previous;
      if (prior.isMilestone) {
        const priorGap = MILESTONE_REWARD_OFFSET + MILESTONE_RESERVED_AFTER + MILESTONE_EXIT_BUFFER;
        nextNode = {
          ...nextNode,
          x: Math.max(nextNode.x, prior.x + priorGap),
          y:
            Math.abs(nextNode.y) < laneSpacing * 2.1
              ? this.alignToLane(nextNode.y >= 0 ? laneSpacing * 3.15 : -laneSpacing * 2.75, score, nextNode.sizeTier, true)
              : nextNode.y
        };
      }

      const nearestMilestone = [...isolated, previous]
        .filter((candidate) => candidate.isMilestone)
        .reduce<GamePathNode | null>((closest, milestone) => {
          if (!closest) return milestone;
          return Math.abs(milestone.x - nextNode.x) < Math.abs(closest.x - nextNode.x) ? milestone : closest;
        }, null);

      if (nearestMilestone && !nextNode.isMilestone) {
        const reservedRange = getMilestoneReservedRangeX(nearestMilestone.x);
        const insideReservedZone = nextNode.x >= reservedRange.start && nextNode.x <= reservedRange.end;
        if (insideReservedZone && Math.abs(nextNode.y - nearestMilestone.y) < laneSpacing * 2.15) {
          nextNode = {
            ...nextNode,
            x: reservedRange.end + Math.max(DEFAULT_COLUMN_DISTANCE * 0.92, nextNode.gameplayRadius * 0.42),
            y:
              Math.abs(nextNode.y) < laneSpacing * 2.4
                ? this.alignToLane(nextNode.y >= 0 ? laneSpacing * 3.45 : -laneSpacing * 3.05, score, nextNode.sizeTier, true)
                : nextNode.y
          };
        }
      }

      isolated.push(nextNode);
    });

    const normalized: GamePathNode[] = [];
    isolated.forEach((node, index) => {
      normalized.push(this.reindexNode(node, previous.index + index + 1, index === 0 ? previous : normalized[index - 1]));
    });
    return normalized;
  }

  private enrichMilestoneVicinity(previous: GamePathNode, nodes: GamePathNode[], score: number) {
    if (!nodes.some((node) => node.isMilestone)) {
      return nodes;
    }

    const laneSpacing = getPathLaneSpacing(score);
    const enriched: GamePathNode[] = [];

    nodes.forEach((node) => {
      const prior = enriched[enriched.length - 1] ?? previous;
      const normalizedNode = this.reindexNode(node, prior.index + 1, prior);
      enriched.push(normalizedNode);

      if (!normalizedNode.isMilestone) {
        return;
      }

      const milestoneDistanceMeters = pathDistanceToMeters(normalizedNode.pathDistance);
      const earlyMilestone = milestoneDistanceMeters <= EARLY_PATTERN_DISTANCE_METERS;
      const companionLayouts = [
        { xOffset: DEFAULT_COLUMN_DISTANCE * 1.2, yOffset: laneSpacing * 2.8, sizeTier: 'small' as GameShardSizeTier },
        { xOffset: DEFAULT_COLUMN_DISTANCE * 2.1, yOffset: laneSpacing * 4.15, sizeTier: 'very_small' as GameShardSizeTier },
        { xOffset: DEFAULT_COLUMN_DISTANCE * 2.85, yOffset: laneSpacing * 1.55 * (this.nextRandom() < 0.5 ? 1 : -1), sizeTier: 'tiny' as GameShardSizeTier }
      ];
      if (earlyMilestone) {
        companionLayouts.push(
          { xOffset: DEFAULT_COLUMN_DISTANCE * 1.55, yOffset: laneSpacing * 4.75, sizeTier: 'tiny' as GameShardSizeTier },
          { xOffset: DEFAULT_COLUMN_DISTANCE * 2.45, yOffset: laneSpacing * 3.15, sizeTier: 'very_small' as GameShardSizeTier },
          { xOffset: DEFAULT_COLUMN_DISTANCE * 2.65, yOffset: -laneSpacing * 2.15, sizeTier: 'small' as GameShardSizeTier },
          { xOffset: DEFAULT_COLUMN_DISTANCE * 3.2, yOffset: laneSpacing * 0.95, sizeTier: 'tiny' as GameShardSizeTier },
          { xOffset: DEFAULT_COLUMN_DISTANCE * 3.7, yOffset: -laneSpacing * 1.2, sizeTier: 'very_small' as GameShardSizeTier }
        );
      }

      companionLayouts.forEach((layout, layoutIndex) => {
        const previousNode = enriched[enriched.length - 1] ?? previous;
        const x = Math.max(normalizedNode.x + layout.xOffset, previousNode.x + DEFAULT_COLUMN_DISTANCE * 0.46);
        const y = this.alignToLane(normalizedNode.y + layout.yOffset, score, layout.sizeTier, true);
        const companion = this.buildNode({
          previous: previousNode,
          index: previousNode.index + 1,
          x,
          y,
          direction: this.directionFrom(previousNode.x, previousNode.y, x, y),
          sizeTier: layout.sizeTier,
          shapeKind: earlyMilestone ? 'round' : this.pickShapeKind(['round', 'oval', 'triangular'] as GameShardShapeKind[], score),
          motionPattern: 'none',
          spinDirection: this.nextRandom() < 0.5 ? 'cw' : 'ccw',
          spinSpeed: 0.1 + this.nextRandom() * 0.08,
          gameplayRadius: layout.sizeTier === 'small' ? 1.12 : layout.sizeTier === 'very_small' ? 0.9 : 0.78,
          visualScale: layout.sizeTier === 'small' ? 1.2 : layout.sizeTier === 'very_small' ? 1.04 : 0.88,
          gameplayOrbitPeriod: layout.sizeTier === 'small' ? 2.9 : layout.sizeTier === 'very_small' ? 2.6 : 2.36,
          visualStretch: { x: 1, y: 1, z: 1 },
          kind: 'normal',
          branchSlot: null,
          offerId: null,
          onboarding: previousNode.index < 50,
          eventType: 'none',
          colorHint: 'none',
          isMilestone: false,
          isGigantic: false,
          coinSlots:
            layoutIndex < (earlyMilestone ? 4 : 2)
              ? [{ angle: Math.PI * (0.32 + this.nextRandom() * 1.18), value: 1, collected: false, orbitScale: 1 }]
              : [],
          enemySlot: null
        });

        if (validatePatternPlacement([companion], [...this.nodes, ...enriched])) {
          enriched.push(companion);
        }
      });
    });

    const normalized: GamePathNode[] = [];
    enriched.forEach((node, index) => {
      normalized.push(this.reindexNode(node, previous.index + index + 1, index === 0 ? previous : normalized[index - 1]));
    });
    return normalized;
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
}
