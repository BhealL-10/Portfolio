import * as THREE from 'three';
import { clamp } from '../core/math';
import { DEFAULT_COLUMN_DISTANCE, getDifficultyProfile, pathDistanceToMeters } from './difficultyScaler';
import { getPathLaneSpacing, getPathLaneTargets, getPathLaneVerticalOffset, PLAYABLE_PATH_LANE_COUNT } from './pathLayout';
import {
  buildMilestoneReservedRange,
  getNodePlacementFootprint,
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
const MILESTONE_BRANCH_REJOIN_PADDING = DEFAULT_COLUMN_DISTANCE * 1.1;
const INTRO_BLOCK_METERS = 10;
const MAIN_BLOCK_METERS = 100;
const MAIN_BLOCK_SHOP_OFFSET_METERS = 50;
const MAIN_BLOCK_SHOP_CLEARANCE_METERS = 1.7;
const INTRO_BLOCK_NODE_TARGET = 46;
const FIRST_MAIN_BLOCK_NODE_TARGET = 278;
const FAR_MAIN_BLOCK_NODE_TARGET = 102;
const DENSITY_TAPER_START_METERS = 1010;
const DENSITY_TAPER_END_METERS = 1210;
const INTRO_COLUMN_JITTER_METERS = 0.08;
const MAIN_COLUMN_JITTER_METERS = 0.34;
const INTRO_BLOCK_START_PADDING_METERS = 0.72;
const INTRO_BLOCK_END_PADDING_METERS = 3.05;
const MAIN_BLOCK_START_PADDING_METERS = 2.05;
const MAIN_BLOCK_END_PADDING_METERS = 3.6;
const POST_MILESTONE_REWARD_RESERVED_START_METERS = 1.9;
const POST_MILESTONE_REWARD_RESERVED_END_METERS = 8.8;
const POST_MILESTONE_CONTENT_START_METERS = 9.6;
const MAX_LANE_DELTA_PER_STEP = 3;
const EXTRA_EVENT_SAFE_GAP_METERS = 8.4;
const EXTRA_EVENT_MAX_PER_BLOCK = 3;
const INTRO_ONBOARDING_END_METERS = 18;
const MOTION_DURATION_MIN = 1.2;
const MOTION_DURATION_MAX = 1.82;
const INTRO_FULL_HEIGHT_SWEEP_ORDER = [8, 5, 2, 7, 4, 1, 6, 3, 0, 8, 5, 2, 7, 4, 1, 6, 3, 0, 5, 4] as const;
const EARLY_FULL_HEIGHT_SWEEP_ORDER = [8, 5, 2, 7, 4, 1, 9, 6, 3, 0, 8, 4, 2, 7, 5, 1, 9, 6, 3, 0] as const;
const GRID_FULL_SLOT_MASK = (1 << PLAYABLE_PATH_LANE_COUNT) - 1;
const MILESTONE_GRID_OCCUPIED_HALF_SLOTS = 3;
const MILESTONE_GRID_SAFETY_SLOTS = 1;
const INTRO_GRID_SLICE_MEMBER_OFFSETS = [0, 0, 0.16, 0.16, 0.48, 0.78, 1.08, 1.4] as const;
const GRID_SLICE_MEMBER_OFFSETS = [0, 0.12, 0.34, 0.58, 0.84, 1.1, 1.38, 1.68] as const;
const SPRINT_FISH_LANDING_SUPPORT_LANE_DELTA = 2;
const INTRO_PATTERN_FIELD_LIFT = 0.9;

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

interface StructuralSliceEventAssignment {
  eventType: GameEventType;
  guaranteedShopIcon: boolean;
}

interface GridRect {
  startColumn: number;
  endColumn: number;
  startSlot: number;
  endSlot: number;
}

interface BlockGridState {
  startColumn: number;
  endColumn: number;
  occupancyMasks: number[];
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
        y: this.getPathFieldCenterY(0),
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
    this.ensureAhead(anchorIndex + 16, 132, 96);
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
    const laneTargets = getPathLaneTargets(score);
    const landingLane = this.getLaneIndex(targetLandingY, laneTargets);

    const existing = this.nodes
      .slice(clampedAnchorIndex + 1, Math.min(this.nodes.length, clampedAnchorIndex + 12))
      .filter(
        (node) =>
          !node.isMilestone &&
          !node.isGigantic &&
          !node.enemySlot?.alive &&
          Math.abs(node.x - targetLandingX) <= DEFAULT_COLUMN_DISTANCE * 1.28 &&
          Math.abs(node.y - targetLandingY) <= laneSpacing * 0.9
      );
    if (existing.length >= 3) {
      const best = existing.reduce((bestNode, node) => {
        const bestError = Math.abs(bestNode.x - targetLandingX) + Math.abs(bestNode.y - targetLandingY);
        const nodeError = Math.abs(node.x - targetLandingX) + Math.abs(node.y - targetLandingY);
        return nodeError < bestError ? node : bestNode;
      });
      return best.index;
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

    const upperLandingLane = THREE.MathUtils.clamp(landingLane + SPRINT_FISH_LANDING_SUPPORT_LANE_DELTA, 0, PLAYABLE_PATH_LANE_COUNT - 1);
    const lowerLandingLane = THREE.MathUtils.clamp(landingLane - SPRINT_FISH_LANDING_SUPPORT_LANE_DELTA, 0, PLAYABLE_PATH_LANE_COUNT - 1);
    const landingSupportSizeTier: GameShardSizeTier = 'medium_small';
    const landingSupportConfig = SIZE_TIER_CONFIG[landingSupportSizeTier];
    const landingSupportRadius = THREE.MathUtils.lerp(landingSupportConfig.radius[0], landingSupportConfig.radius[1], 0.66);
    const landingSupportScale = THREE.MathUtils.lerp(landingSupportConfig.visual[0], landingSupportConfig.visual[1], 0.68);
    const landingSupportOrbit = THREE.MathUtils.lerp(landingSupportConfig.orbitPeriod[0], landingSupportConfig.orbitPeriod[1], 0.52);

    const upperLanding = this.buildNode({
      previous: landingNode,
      index: clampedAnchorIndex + 2,
      x: landingNode.x,
      y: laneTargets[upperLandingLane] ?? landingNode.y + laneSpacing * SPRINT_FISH_LANDING_SUPPORT_LANE_DELTA,
      direction: this.directionFrom(landingNode.x, landingNode.y, landingNode.x, laneTargets[upperLandingLane] ?? landingNode.y),
      sizeTier: landingSupportSizeTier,
      shapeKind: 'round',
      motionPattern: 'none',
      motionMode: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      motionActivatedAt: null,
      spinDirection: 'ccw',
      spinSpeed: 0.1 + this.nextRandom() * 0.04,
      gameplayRadius: landingSupportRadius,
      visualScale: landingSupportScale,
      gameplayOrbitPeriod: landingSupportOrbit,
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

    const lowerLanding = this.buildNode({
      previous: upperLanding,
      index: clampedAnchorIndex + 3,
      x: landingNode.x,
      y: laneTargets[lowerLandingLane] ?? landingNode.y - laneSpacing * SPRINT_FISH_LANDING_SUPPORT_LANE_DELTA,
      direction: this.directionFrom(upperLanding.x, upperLanding.y, landingNode.x, laneTargets[lowerLandingLane] ?? landingNode.y),
      sizeTier: landingSupportSizeTier,
      shapeKind: 'round',
      motionPattern: 'none',
      motionMode: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      motionActivatedAt: null,
      spinDirection: 'cw',
      spinSpeed: 0.09 + this.nextRandom() * 0.04,
      gameplayRadius: landingSupportRadius,
      visualScale: landingSupportScale,
      gameplayOrbitPeriod: landingSupportOrbit,
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

    const exit1X = landingNode.x + DEFAULT_COLUMN_DISTANCE * 1.96;
    const exit1Y = this.alignToLane(THREE.MathUtils.lerp(landingNode.y, 2.8, 0.16), score, 'medium_large', true);
    const exit1 = this.buildNode({
      previous: lowerLanding,
      index: clampedAnchorIndex + 4,
      x: exit1X,
      y: exit1Y,
      direction: this.directionFrom(lowerLanding.x, lowerLanding.y, exit1X, exit1Y),
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

    const exit2X = exit1.x + DEFAULT_COLUMN_DISTANCE * 1.62;
    const exit2Y = this.alignToLane(THREE.MathUtils.lerp(exit1.y, 3.1, 0.22), score, 'medium', true);
    const exit2 = this.buildNode({
      previous: exit1,
      index: clampedAnchorIndex + 5,
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

    this.replaceFuture(clampedAnchorIndex, [landingNode, upperLanding, lowerLanding, exit1, exit2]);
    return clampedAnchorIndex + 1;
  }

  createUpgradeBranches(milestoneIndex: number, offers: RogueliteItemOffer[], _score: number): BranchChoice[] {
    const milestone = this.getNode(milestoneIndex);
    if (!milestone) return [];

    this.ensureAhead(milestoneIndex + 8, 24, 16);
    const choices: BranchChoice[] = [];
    offers.slice(0, 3).forEach((offer, index) => {
      const source = this.getNode(milestoneIndex + index + 1);
      if (!source) {
        return;
      }
      const entry: GamePathNode = {
        ...source,
        kind: 'branch',
        branchSlot: index as 0 | 1 | 2,
        offerId: offer.item.id,
        colorHint: 'reward',
        guaranteedShopIcon: false,
        eventType: 'none',
        eventVisualKind: 'default',
        coinSlots: source.coinSlots.map((slot) => ({ ...slot }))
      };

      choices.push({
        mode: 'reward_branch' as const,
        offer,
        entry,
        previewNodes: [entry],
        pathNodes: [entry]
      });
    });
    return choices;
  }

  activateMilestoneRewardChoices(milestoneIndex: number, offers: RogueliteItemOffer[]) {
    offers.slice(0, 3).forEach((offer, index) => {
      const targetIndex = milestoneIndex + index + 1;
      const node = this.nodes[targetIndex];
      if (!node) {
        return;
      }
      this.nodes[targetIndex] = {
        ...node,
        kind: 'branch',
        branchSlot: index as 0 | 1 | 2,
        offerId: offer.item.id,
        colorHint: 'reward',
        guaranteedShopIcon: false,
        eventType: 'none',
        eventVisualKind: 'default',
        coinSlots: node.coinSlots.map((slot) => ({ ...slot }))
      };
    });
  }

  settleMilestoneRewardChoices(milestoneIndex: number) {
    for (let index = 0; index < 3; index += 1) {
      const targetIndex = milestoneIndex + index + 1;
      const node = this.nodes[targetIndex];
      if (!node) {
        continue;
      }
      this.nodes[targetIndex] = {
        ...node,
        kind: 'normal',
        branchSlot: null,
        offerId: null,
        colorHint: 'none',
        eventType: 'none',
        eventVisualKind: 'default',
        guaranteedShopIcon: false,
        milestoneOwned: false
      };
    }
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
    const formationSliceCount = this.resolveFormationSliceCount(descriptor, safeTargetCount);
    const rewardReserve = this.getPostMilestoneRewardReservedRange(previous, descriptor);
    const safeStart = Math.max(
      descriptor.blockStartMeters + (descriptor.kind === 'intro' ? INTRO_BLOCK_START_PADDING_METERS : MAIN_BLOCK_START_PADDING_METERS),
      rewardReserve ? descriptor.blockStartMeters + POST_MILESTONE_CONTENT_START_METERS : descriptor.blockStartMeters
    );
    const safeEnd = descriptor.targetMilestoneMeters - (descriptor.kind === 'intro' ? INTRO_BLOCK_END_PADDING_METERS : MAIN_BLOCK_END_PADDING_METERS);
    const sliceCenters =
      descriptor.kind === 'main'
        ? this.buildBlockColumns(safeStart, safeEnd, formationSliceCount, descriptor.guaranteedShopMeters, rng)
        : this.distributeMeters(safeStart, safeEnd, formationSliceCount, INTRO_COLUMN_JITTER_METERS * 0.5, rng);
    const generated: GamePathNode[] = previous.isMilestone ? this.buildMilestoneExitNodes(previous, descriptor, rng) : [];
    const gridState = this.createBlockGridState(
      descriptor,
      safeStart,
      safeEnd,
      rewardReserve ? [reservedRange, rewardReserve] : [reservedRange]
    );
    this.occupyGridNode(gridState, previous);
    generated.forEach((node) => this.occupyGridNode(gridState, node));
    const bonusEvents = this.buildBonusEventAssignments(descriptor, sliceCenters, rng);
    let previousLane = this.resolveStartingLane(
      (generated[generated.length - 1] ?? previous).index,
      (generated[generated.length - 1] ?? previous).y
    );
    const laneSequence = this.buildLaneSequence(descriptor, sliceCenters.length, previousLane, rng);
    const formationExtraMembers = this.buildFormationExpansionPlan(descriptor, sliceCenters.length, safeTargetCount, bonusEvents, rng);
    const placementReservedRanges = rewardReserve ? [reservedRange, rewardReserve] : [reservedRange];

    sliceCenters.forEach((centerMeters, sliceIndex) => {
      const sliceStartCursor = generated[generated.length - 1] ?? previous;
      const sliceCurrentMeters = pathDistanceToMeters(sliceStartCursor.pathDistance);
      if (centerMeters <= sliceCurrentMeters + 0.05) {
        return;
      }
      const score = previous.index + generated.length;
      const eventAssignment = bonusEvents.get(sliceIndex) ?? {
        eventType: 'none' as GameEventType,
        guaranteedShopIcon: false
      };
      const isGuaranteedShop = descriptor.guaranteedShopMeters !== null && Math.abs(centerMeters - descriptor.guaranteedShopMeters) <= 0.0001;
      const eventType = isGuaranteedShop ? 'shop' : eventAssignment.eventType;
      const backboneLane = laneSequence[sliceIndex] ?? previousLane;
      const nextBackboneLane = laneSequence[sliceIndex + 1] ?? backboneLane;
      const extraMembers = formationExtraMembers[sliceIndex] ?? 0;
      const formationPlans = this.buildFormationPlans(
        descriptor,
        sliceIndex,
        centerMeters,
        backboneLane,
        nextBackboneLane,
        extraMembers,
        {
          eventType,
          guaranteedShopIcon: isGuaranteedShop
        },
        score,
        gridState,
        rng
      );

      let backbonePlaced = false;
      formationPlans.forEach((plan, memberIndex) => {
        const cursor = generated[generated.length - 1] ?? previous;
        const currentMeters = pathDistanceToMeters(cursor.pathDistance);
        if (plan.absoluteMeters < currentMeters - 0.02) {
          return;
        }

        let candidate = this.placeStructuralNode(previous, generated, placementReservedRanges, plan, descriptor, gridState, rng);
        if (!candidate && memberIndex === 0) {
          const emergencyPlan: StructuralNodePlan = {
            absoluteMeters: plan.guaranteedShopIcon ? plan.absoluteMeters : Math.min(plan.absoluteMeters, currentMeters + (descriptor.kind === 'intro' ? 0.82 : 1.42)),
            laneIndex: this.resolveLaneFallback(previousLane, plan.laneIndex, score + memberIndex),
            sizeTier: plan.guaranteedShopIcon ? 'medium' : descriptor.kind === 'intro' ? 'small' : 'very_small',
            shapeKind: 'round',
            motionPattern: 'none',
            motionDirection: null,
            motionDistance: 0,
            motionDuration: 0,
            eventType: plan.eventType,
            guaranteedShopIcon: plan.guaranteedShopIcon,
            coinAngles: plan.eventType === 'none' && descriptor.kind === 'intro' && sliceIndex < 2 ? [Math.PI * (0.26 + rng() * 0.38)] : [],
            enemyPole: null,
            milestoneOwned: plan.milestoneOwned ?? false
          };
          const emergencyCandidate = this.buildGeneratedNode(cursor, emergencyPlan, rng);
          if (emergencyCandidate && this.validatePlacement([emergencyCandidate], this.nodes, generated, placementReservedRanges)) {
            candidate = emergencyCandidate;
          }
        }
        if (!candidate && memberIndex === 0 && plan.guaranteedShopIcon) {
          const shopCandidate = this.buildGeneratedNode(cursor, {
            absoluteMeters: plan.absoluteMeters,
            laneIndex: this.resolveLaneFallback(previousLane, 4, score + memberIndex),
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
          if (shopCandidate && this.validatePlacement([shopCandidate], this.nodes, generated, placementReservedRanges)) {
            candidate = shopCandidate;
          }
        }
        if (!candidate) {
          return;
        }

        generated.push(candidate);
        this.occupyGridNode(gridState, candidate);
        previousLane = this.getLaneIndex(candidate.y, getPathLaneTargets(candidate.index));
        if (memberIndex === 0) {
          backbonePlaced = true;
        }
      });

      if (!backbonePlaced) {
        return;
      }
    });

    const tailNodes = this.buildTailRecoveryNodes(
      previous,
      generated,
      descriptor,
      safeEnd,
      placementReservedRanges,
      gridState,
      rng
    );
    generated.push(...tailNodes);

    const densified = this.buildGapInfillNodes(previous, generated, descriptor, placementReservedRanges, gridState, rng);
    const introBalanced = this.ensureIntroLowerRecoveryNodes(previous, densified, descriptor, placementReservedRanges, rng);
    this.ensureGuaranteedShopNode(introBalanced, descriptor);
    return introBalanced;
  }

  private ensureIntroLowerRecoveryNodes(
    previous: GamePathNode,
    generated: GamePathNode[],
    descriptor: StructuralBlockDescriptor,
    reservedRanges: PlacementReservedRange[],
    rng: () => number
  ) {
    if (descriptor.kind !== 'intro' || generated.length === 0) {
      return generated;
    }

    const getLowLaneIndices = (nodes: GamePathNode[]) =>
      nodes
        .filter((node) => !node.isMilestone)
        .map((node) => this.getLaneIndex(node.y, getPathLaneTargets(node.index)))
        .filter((laneIndex) => laneIndex <= 3);
    const existingLowLanes = new Set(getLowLaneIndices(generated));
    let lowNodeCount = getLowLaneIndices(generated).length;
    if (lowNodeCount >= 3) {
      return generated;
    }

    const appended = [...generated];
    let cursor = appended[appended.length - 1] ?? previous;
    for (const laneIndex of [3, 2, 1, 0]) {
      if (existingLowLanes.has(laneIndex)) {
        continue;
      }
      let candidate: GamePathNode | null = null;
      for (const meterOffset of [0, 0.08, 0.2, 0.34, 0.48]) {
        const nextCandidate = this.buildGeneratedNode(cursor, {
          absoluteMeters: pathDistanceToMeters(cursor.pathDistance) + meterOffset,
          laneIndex,
          sizeTier: 'tiny',
          shapeKind: 'round',
          motionPattern: 'none',
          motionDirection: null,
          motionDistance: 0,
          motionDuration: 0,
          eventType: 'none',
          guaranteedShopIcon: false,
          coinAngles: [],
          enemyPole: null
        }, rng);
        if (!nextCandidate || !this.validatePlacement([nextCandidate], this.nodes, appended, reservedRanges)) {
          continue;
        }
        candidate = nextCandidate;
        break;
      }
      if (!candidate) {
        continue;
      }
      appended.push(candidate);
      cursor = candidate;
      existingLowLanes.add(laneIndex);
      lowNodeCount += 1;
      if (lowNodeCount >= 3) {
        break;
      }
    }

    if (lowNodeCount >= 3) {
      return appended;
    }

    const rebalanceCandidates = appended
      .map((node, index) => ({
        index,
        node,
        laneIndex: this.getLaneIndex(node.y, getPathLaneTargets(node.index)),
        distanceMeters: pathDistanceToMeters(node.pathDistance)
      }))
      .filter(
        ({ node, laneIndex, distanceMeters }) =>
          !node.isMilestone &&
          laneIndex >= 2 &&
          distanceMeters >= 1.4 &&
          distanceMeters < descriptor.targetMilestoneMeters - 1.8
      )
      .sort((left, right) => right.distanceMeters - left.distanceMeters);

    const desiredLowSlots = [
      { targetMeters: 2.1, laneIndex: 2 },
      { targetMeters: 4.6, laneIndex: 1 },
      { targetMeters: 7.1, laneIndex: 0 }
    ] as const;

    for (const desiredSlot of desiredLowSlots) {
      if (lowNodeCount >= 3) {
        continue;
      }
      const candidatesByDistance = rebalanceCandidates
        .filter(({ laneIndex }) => laneIndex > desiredSlot.laneIndex)
        .sort(
          (left, right) =>
            Math.abs(left.distanceMeters - desiredSlot.targetMeters) - Math.abs(right.distanceMeters - desiredSlot.targetMeters)
        );
      for (const candidate of candidatesByDistance) {
        const laneTargets = getPathLaneTargets(candidate.node.index);
        const liftedTargetY =
          (laneTargets[desiredSlot.laneIndex] ?? candidate.node.y) + INTRO_PATTERN_FIELD_LIFT + (rng() - 0.5) * 0.16;
        const rebalancedNode = {
          ...candidate.node,
          y: liftedTargetY
        };
        const trial = [...appended];
        trial[candidate.index] = rebalancedNode;
        if (!this.validatePlacement(trial, this.nodes, [], reservedRanges)) {
          continue;
        }
        appended[candidate.index] = rebalancedNode;
        lowNodeCount += 1;
        break;
      }
    }

    return appended;
  }

  private ensureGuaranteedShopNode(generated: GamePathNode[], descriptor: StructuralBlockDescriptor) {
    const guaranteedShopMeters = descriptor.guaranteedShopMeters;
    if (guaranteedShopMeters === null) {
      return;
    }

    const existingShopIndex = generated.findIndex((node) => {
      if (node.milestoneOwned || node.eventType !== 'shop') {
        return false;
      }
      const nodeMeters = pathDistanceToMeters(node.pathDistance);
      return Math.abs(nodeMeters - guaranteedShopMeters) <= 1.2;
    });
    if (existingShopIndex >= 0) {
      generated[existingShopIndex] = {
        ...generated[existingShopIndex]!,
        guaranteedShopIcon: true,
        eventVisualKind: 'shop',
        pathDistance: guaranteedShopMeters * DEFAULT_COLUMN_DISTANCE
      };
      return;
    }

    const candidateIndex = generated.reduce((bestIndex, node, index) => {
      if (node.milestoneOwned || node.isMilestone) {
        return bestIndex;
      }
      if (bestIndex < 0) {
        return index;
      }
      const nodeMeters = pathDistanceToMeters(node.pathDistance);
      const bestMeters = pathDistanceToMeters(generated[bestIndex]!.pathDistance);
      return Math.abs(nodeMeters - guaranteedShopMeters) < Math.abs(bestMeters - guaranteedShopMeters)
        ? index
        : bestIndex;
    }, -1);

    if (candidateIndex < 0) {
      return;
    }

    const candidate = generated[candidateIndex]!;
    generated[candidateIndex] = {
      ...candidate,
      kind: 'event',
      eventType: 'shop',
      eventVisualKind: 'shop',
      guaranteedShopIcon: true,
      colorHint: 'accent',
      pathDistance: guaranteedShopMeters * DEFAULT_COLUMN_DISTANCE,
      shapeKind: 'round',
      motionPattern: 'none',
      motionMode: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      motionActivatedAt: null,
      coinSlots: [],
      enemySlot: null
    };
  }

  private buildMilestoneExitNodes(previous: GamePathNode, descriptor: StructuralBlockDescriptor, rng: () => number) {
    if (!previous.isMilestone) {
      return [] as GamePathNode[];
    }

    const exitOffsets = descriptor.kind === 'main' ? [2.85, 2.85, 2.85, 4.35, 5.4, 6.55, 7.75, 8.95] : [1.15, 2.25, 3.2];
    const mainExitLanes = [7, 5, 3, 8, 1, 6, 2, 4] as const;
    const generated: GamePathNode[] = [];
    let previousLane = this.resolveStartingLane(previous.index, previous.y);
    const rewardTrioSizeTier: GameShardSizeTier = 'medium_large';
    const rewardTrioConfig = SIZE_TIER_CONFIG[rewardTrioSizeTier];
    const rewardTrioGameplayRadius = THREE.MathUtils.lerp(rewardTrioConfig.radius[0], rewardTrioConfig.radius[1], 0.68);
    const rewardTrioVisualScale = THREE.MathUtils.lerp(rewardTrioConfig.visual[0], rewardTrioConfig.visual[1], 0.72);
    const rewardTrioOrbitPeriod = THREE.MathUtils.lerp(rewardTrioConfig.orbitPeriod[0], rewardTrioConfig.orbitPeriod[1], 0.5);

    exitOffsets.forEach((offset, index) => {
      const score = previous.index + generated.length + 1;
      const targetLane =
        descriptor.kind === 'main'
          ? mainExitLanes[index] ?? 4
          : index === 0
            ? 5
            : 4;
      const laneIndex = this.resolveLaneFallback(previousLane, targetLane, score);

      if (descriptor.kind === 'main' && index < 3) {
        const x = this.getAbsoluteXForMeters(pathDistanceToMeters(previous.pathDistance) + offset);
        const y = getPathLaneTargets(score)[targetLane] ?? 0;
        const rewardNode = this.buildNode({
          previous: generated[generated.length - 1] ?? previous,
          index: score,
          x,
          y,
          direction: this.directionFrom((generated[generated.length - 1] ?? previous).x, (generated[generated.length - 1] ?? previous).y, x, y),
          sizeTier: rewardTrioSizeTier,
          shapeKind: 'round',
          motionPattern: 'none',
          motionMode: 'none',
          motionDirection: null,
          motionDistance: 0,
          motionDuration: 0,
          motionActivatedAt: null,
          spinDirection: 'cw',
          spinSpeed: 0.12,
          gameplayRadius: rewardTrioGameplayRadius,
          visualScale: rewardTrioVisualScale,
          gameplayOrbitPeriod: rewardTrioOrbitPeriod,
          visualStretch: { x: 1, y: 1, z: 1 },
          kind: 'normal',
          branchSlot: null,
          offerId: null,
          onboarding: false,
          eventType: 'none',
          eventVisualKind: 'default',
          guaranteedShopIcon: false,
          colorHint: 'none',
          isMilestone: false,
          isGigantic: false,
          milestoneOwned: true,
          coinSlots: [],
          enemySlot: null,
          motionSeed: 0
        });
        generated.push(rewardNode);
        previousLane = targetLane;
        return;
      }

      const plan: StructuralNodePlan = {
        absoluteMeters: pathDistanceToMeters(previous.pathDistance) + offset,
        laneIndex:
          descriptor.kind === 'main' && index < 3
            ? targetLane
            : laneIndex,
        sizeTier:
          descriptor.kind === 'main'
            ? index >= 5
              ? 'very_small'
              : 'small'
            : index === 0
              ? 'medium_small'
              : 'small',
        shapeKind: 'round',
        motionPattern: descriptor.kind === 'main' && index === exitOffsets.length - 1 ? 'vertical' : 'none',
        motionDirection: descriptor.kind === 'main' && index === exitOffsets.length - 1 ? 'up' : null,
        motionDistance: descriptor.kind === 'main' && index === exitOffsets.length - 1 ? getPathLaneSpacing(score) * 0.92 : 0,
        motionDuration: descriptor.kind === 'main' && index === exitOffsets.length - 1 ? 1.18 : 0,
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
    if (this.isHighDensityMainBlock(descriptor)) {
      return FIRST_MAIN_BLOCK_NODE_TARGET;
    }
    const taper = this.resolveMainDensityTaper(descriptor);
    return Math.max(34, Math.round(THREE.MathUtils.lerp(FIRST_MAIN_BLOCK_NODE_TARGET, FAR_MAIN_BLOCK_NODE_TARGET, taper)));
  }

  private resolveFormationSliceCount(descriptor: StructuralBlockDescriptor, targetNodeCount: number) {
    if (descriptor.kind === 'intro') {
      return Math.max(16, Math.round(targetNodeCount * 0.62));
    }
    if (this.isHighDensityMainBlock(descriptor)) {
      return Math.max(44, Math.round(targetNodeCount * 0.74));
    }
    const taper = this.resolveMainDensityTaper(descriptor);
    const ratio = THREE.MathUtils.lerp(0.58, 0.44, taper);
    const minimumSlices = Math.round(THREE.MathUtils.lerp(26, 16, taper));
    return Math.max(minimumSlices, Math.round(targetNodeCount * ratio));
  }

  private buildFormationExpansionPlan(
    descriptor: StructuralBlockDescriptor,
    sliceCount: number,
    targetNodeCount: number,
    _bonusEvents: Map<number, StructuralSliceEventAssignment>,
    rng: () => number
  ) {
    const expansions = Array.from({ length: sliceCount }, () => 0);
    let remaining = Math.max(0, targetNodeCount - sliceCount);
    if (remaining === 0 || sliceCount === 0) {
      return expansions;
    }

    const eligible = Array.from({ length: sliceCount }, (_, index) => index);
    if (eligible.length === 0) {
      return expansions;
    }

    const spreadOrder = this.buildSliceSpreadOrder(eligible, rng);
    const baselinePasses =
      descriptor.kind === 'intro'
        ? 2
        : this.isHighDensityMainBlock(descriptor)
          ? 2
          : descriptor.blockStartMeters < 1410
            ? 1
            : 0;

    for (let pass = 0; pass < baselinePasses && remaining > 0; pass += 1) {
      for (const targetIndex of spreadOrder) {
        if (remaining <= 0) {
          break;
        }
        if (expansions[targetIndex] >= this.resolveMaxExtraMembersPerSlice(descriptor, targetIndex, sliceCount)) {
          continue;
        }
        expansions[targetIndex] += 1;
        remaining -= 1;
      }
    }

    if (remaining > 0 && descriptor.kind !== 'intro' && descriptor.blockStartMeters < DENSITY_TAPER_START_METERS) {
      for (const targetIndex of spreadOrder) {
        if (remaining <= 0) {
          break;
        }
        if (expansions[targetIndex] >= this.resolveMaxExtraMembersPerSlice(descriptor, targetIndex, sliceCount)) {
          continue;
        }
        expansions[targetIndex] += 1;
        remaining -= 1;
      }
    }

    while (remaining > 0) {
      const available = eligible
        .filter((index) => expansions[index] < this.resolveMaxExtraMembersPerSlice(descriptor, index, sliceCount))
        .sort((left, right) => {
          if (expansions[left] !== expansions[right]) {
            return expansions[left] - expansions[right];
          }
          return Math.abs(right - sliceCount * 0.5) - Math.abs(left - sliceCount * 0.5);
        });
      if (available.length === 0) {
        break;
      }
      const targetIndex = available[Math.min(available.length - 1, Math.floor(rng() * Math.min(3, available.length)))]!;
      expansions[targetIndex] += 1;
      remaining -= 1;
    }

    return expansions;
  }

  private buildSliceSpreadOrder(indices: number[], rng: () => number) {
    const sorted = indices.slice().sort((left, right) => left - right);
    const order: number[] = [];
    let left = 0;
    let right = sorted.length - 1;

    while (left <= right) {
      const start = sorted[left++];
      if (start !== undefined) {
        order.push(start);
      }
      const end = sorted[right--];
      if (end !== undefined && end !== start) {
        order.push(end);
      }
    }

    if (rng() < 0.5) {
      order.reverse();
    }

    return order;
  }

  private buildTailRecoveryNodes(
    previous: GamePathNode,
    generated: GamePathNode[],
    descriptor: StructuralBlockDescriptor,
    safeEndMeters: number,
    reservedRanges: PlacementReservedRange[],
    gridState: BlockGridState,
    rng: () => number
  ) {
    const cursor = generated[generated.length - 1] ?? previous;
    const currentMeters = pathDistanceToMeters(cursor.pathDistance);
    const gapMeters = safeEndMeters - currentMeters;
    const recoveryStepMeters =
      descriptor.kind === 'intro'
        ? 0.9
        : this.isHighDensityMainBlock(descriptor)
          ? 1.04
          : descriptor.blockStartMeters < 1410
            ? 1.56
            : 1.96;
    const recoveryThreshold =
      descriptor.kind === 'intro'
        ? 1
        : this.isHighDensityMainBlock(descriptor)
          ? recoveryStepMeters * 1.22
          : recoveryStepMeters * 1.48;
    if (gapMeters <= recoveryThreshold) {
      return [] as GamePathNode[];
    }

    const targetCount = Math.max(
      1,
      Math.ceil(gapMeters / recoveryStepMeters)
    );
    const centers = this.distributeMeters(
      currentMeters + (descriptor.kind === 'intro' ? 0.88 : Math.min(1.22, recoveryStepMeters * 0.82)),
      safeEndMeters,
      targetCount,
      descriptor.kind === 'intro' ? 0.04 : 0.1,
      rng
    );
    const recovered: GamePathNode[] = [];
    let previousLane = this.resolveStartingLane(cursor.index, cursor.y);

    centers.forEach((absoluteMeters, index) => {
      const localGenerated = [...generated, ...recovered];
      const localCursor = localGenerated[localGenerated.length - 1] ?? previous;
      const liveMeters = pathDistanceToMeters(localCursor.pathDistance);
      if (absoluteMeters < liveMeters - 0.02) {
        return;
      }

      const score = previous.index + localGenerated.length;
      const targetLane = this.resolveLaneFallback(previousLane, index % 2 === 0 ? 4 : 5, score);
      const tailPlan: StructuralNodePlan = {
        absoluteMeters,
        laneIndex: targetLane,
        sizeTier: descriptor.kind === 'intro' ? 'small' : 'very_small',
        shapeKind: 'round',
        motionPattern: 'none',
        motionDirection: null,
        motionDistance: 0,
        motionDuration: 0,
        eventType: 'none',
        guaranteedShopIcon: false,
        coinAngles: [],
        enemyPole: null
      };

      let candidate = this.placeStructuralNode(previous, localGenerated, reservedRanges, tailPlan, descriptor, gridState, rng);
      if (!candidate) {
        const emergencyCandidate = this.buildGeneratedNode(localCursor, {
          ...tailPlan,
          absoluteMeters: Math.min(absoluteMeters, liveMeters + (descriptor.kind === 'intro' ? 0.92 : Math.max(1.18, recoveryStepMeters * 0.92)))
        }, rng);
        if (emergencyCandidate && this.validatePlacement([emergencyCandidate], this.nodes, localGenerated, reservedRanges)) {
          candidate = emergencyCandidate;
        }
      }
      if (!candidate) {
        return;
      }

      recovered.push(candidate);
      this.occupyGridNode(gridState, candidate);
      previousLane = this.getLaneIndex(candidate.y, getPathLaneTargets(candidate.index));
    });

    return recovered;
  }

  private buildGapInfillNodes(
    previous: GamePathNode,
    generated: GamePathNode[],
    descriptor: StructuralBlockDescriptor,
    reservedRanges: PlacementReservedRange[],
    gridState: BlockGridState,
    rng: () => number
  ) {
    if (generated.length < 2) {
      return generated;
    }

    const rebuilt: GamePathNode[] = [];
    const maximumGapMeters = this.resolveMaximumForwardGapMeters(descriptor);

    generated.forEach((nextNode, index) => {
      const leftNode = rebuilt[rebuilt.length - 1] ?? previous;
      const futureNodes = generated.slice(index);
      const inserted = this.buildGapInfillBetween(
        leftNode,
        nextNode,
        rebuilt,
        futureNodes,
        descriptor,
        reservedRanges,
        gridState,
        maximumGapMeters,
        rng
      );
      rebuilt.push(...inserted, nextNode);
    });

    return rebuilt;
  }

  private buildGapInfillBetween(
    previous: GamePathNode,
    nextNode: GamePathNode,
    accepted: GamePathNode[],
    futureNodes: GamePathNode[],
    descriptor: StructuralBlockDescriptor,
    reservedRanges: PlacementReservedRange[],
    gridState: BlockGridState,
    maximumGapMeters: number,
    rng: () => number
  ) {
    const previousMeters = pathDistanceToMeters(previous.pathDistance);
    const nextMeters = pathDistanceToMeters(nextNode.pathDistance);
    const gapMeters = nextMeters - previousMeters;
    if (gapMeters <= maximumGapMeters) {
      return [] as GamePathNode[];
    }

    const insertCount = Math.min(
      descriptor.kind === 'intro' || this.isHighDensityMainBlock(descriptor) ? 4 : 3,
      Math.max(1, Math.ceil(gapMeters / maximumGapMeters) - 1)
    );
    const anchors = this.distributeMeters(
      previousMeters + gapMeters / (insertCount + 1),
      nextMeters - gapMeters / (insertCount + 1),
      insertCount,
      0.02,
      rng
    );
    const inserted: GamePathNode[] = [];
    const futureTail = futureNodes.slice(1);

    anchors.forEach((absoluteMeters, fillIndex) => {
      const leftNode = inserted[inserted.length - 1] ?? previous;
      const leftLane = this.getLaneIndex(leftNode.y, getPathLaneTargets(leftNode.index));
      const rightLane = this.getLaneIndex(nextNode.y, getPathLaneTargets(nextNode.index));
      const laneBias = fillIndex % 2 === 0 ? Math.max(leftLane, rightLane) : Math.min(leftLane, rightLane);
      const targetLane = this.resolveLaneFallback(leftLane, Math.round((leftLane + rightLane + laneBias) / 3), leftNode.index + 1);
      const plan: StructuralNodePlan = {
        absoluteMeters,
        laneIndex: targetLane,
        sizeTier:
          descriptor.kind === 'intro'
            ? 'small'
            : this.isHighDensityMainBlock(descriptor)
              ? 'very_small'
              : descriptor.blockStartMeters < 410
                ? 'very_small'
                : 'tiny',
        shapeKind: 'round',
        motionPattern: 'none',
        motionDirection: null,
        motionDistance: 0,
        motionDuration: 0,
        eventType: 'none',
        guaranteedShopIcon: false,
        coinAngles: [],
        enemyPole: null
      };

      let candidate = this.placeStructuralNode(previous, [...accepted, ...inserted], reservedRanges, plan, descriptor, gridState, rng);
      if (!candidate) {
        const emergencyCandidate = this.buildGeneratedNode(leftNode, {
          ...plan,
          sizeTier: descriptor.kind === 'intro' ? 'small' : 'tiny',
          absoluteMeters: absoluteMeters + (fillIndex % 2 === 0 ? 0.02 : -0.02)
        }, rng);
        if (emergencyCandidate) {
          const candidateChain = [...inserted, emergencyCandidate, nextNode];
          if (this.validatePlacement(candidateChain, this.nodes, [...accepted, ...futureTail], reservedRanges)) {
            candidate = emergencyCandidate;
          }
        }
      }
      if (!candidate) {
        return;
      }

      const candidateChain = [...inserted, candidate, nextNode];
      if (!this.validatePlacement(candidateChain, this.nodes, [...accepted, ...futureTail], reservedRanges)) {
        return;
      }

      inserted.push(candidate);
      this.occupyGridNode(gridState, candidate);
    });

    return inserted;
  }

  private resolveMaximumForwardGapMeters(descriptor: StructuralBlockDescriptor) {
    if (descriptor.kind === 'intro') {
      return 0.92;
    }
    if (this.isHighDensityMainBlock(descriptor)) {
      return 1;
    }
    if (descriptor.blockStartMeters < 1410) {
      return 1.64;
    }
    return 2;
  }

  private resolveMaxExtraMembersPerSlice(descriptor: StructuralBlockDescriptor, sliceIndex: number, sliceCount: number) {
    if (sliceIndex === 0 || sliceIndex >= sliceCount - 1) {
      return 1;
    }
    if (sliceIndex >= sliceCount - 3) {
      return 1;
    }
    if (descriptor.kind === 'intro') {
      return 10;
    }
    if (this.isHighDensityMainBlock(descriptor)) {
      return 7;
    }
    const taper = this.resolveMainDensityTaper(descriptor);
    return Math.max(5, Math.round(THREE.MathUtils.lerp(8, 5, taper)));
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

    const denseMainBlock = this.isHighDensityMainBlock(descriptor);
    let remaining =
      (rng() < (denseMainBlock ? 0.64 : 0.34) + this.rewardChanceBias * 0.24 + this.shopChanceBias * 0.08 ? 1 : 0) +
      (rng() < (denseMainBlock ? 0.34 : 0.14) + this.rewardChanceBias * 0.18 ? 1 : 0) +
      (rng() < (denseMainBlock ? 0.14 : 0.04) + this.rewardChanceBias * 0.12 ? 1 : 0);
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
    const shopThreshold = Math.min(0.28, 0.07 + this.shopChanceBias * 0.2);
    const rewardThreshold = Math.min(0.97, 0.82 + this.rewardChanceBias * 0.14);
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
    if (descriptor.kind === 'intro' || this.isHighDensityMainBlock(descriptor)) {
      return 10;
    }
    const taper = this.resolveMainDensityTaper(descriptor);
    return Math.max(3, Math.round(THREE.MathUtils.lerp(8, 3, taper)));
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
    const earlySweep = descriptor.kind === 'intro' || descriptor.blockStartMeters < DENSITY_TAPER_START_METERS;
    const sweepOrder = descriptor.kind === 'intro' ? INTRO_FULL_HEIGHT_SWEEP_ORDER : EARLY_FULL_HEIGHT_SWEEP_ORDER;
    const sequence: number[] = [];
    let currentLane = THREE.MathUtils.clamp(startingLane, 0, laneCount - 1);
    let pointer = earlySweep
      ? 0
      : lanePool.reduce((bestIndex, lane, index) => (
          Math.abs(lane - currentLane) < Math.abs((lanePool[bestIndex] ?? currentLane) - currentLane) ? index : bestIndex
        ), 0);
    let direction: 1 | -1 = rng() < 0.5 ? 1 : -1;
    const lateRepeatChance =
      coverageTarget <= 2
        ? 0.86
        : coverageTarget <= 4
          ? 0.46
          : coverageTarget <= 5
            ? 0.22
            : 0.08;

    for (let index = 0; index < count; index += 1) {
      const templateLane = earlySweep
        ? sweepOrder[index % sweepOrder.length] ?? dominantLane
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

    if (descriptor.kind === 'intro' && count >= 6) {
      const introAnchorPattern = [
        { ratio: 0.12, lane: 7 },
        { ratio: 0.28, lane: 2 },
        { ratio: 0.46, lane: 8 },
        { ratio: 0.64, lane: 1 }
      ] as const;
      introAnchorPattern.forEach(({ ratio, lane }) => {
        const anchorIndex = THREE.MathUtils.clamp(Math.round((count - 1) * ratio), 1, Math.max(1, count - 3));
        sequence[anchorIndex] = lane;
      });
    }

    const exitPattern = descriptor.kind === 'intro' ? [5, 6, 5] : [5, 6, 5, 6, 5];
    exitPattern.slice(-Math.min(exitPattern.length, count)).forEach((lane, index, pattern) => {
      const targetIndex = count - pattern.length + index;
      if (targetIndex >= 0) {
        sequence[targetIndex] = lane;
      }
    });
    if (count > 0) {
      sequence[0] = this.resolveLaneFallback(startingLane, sequence[0] ?? startingLane, 0);
    }

    return sequence;
  }

  private resolveDominantLane(
    descriptor: StructuralBlockDescriptor,
    coverageTarget: number,
    laneCount: number,
    rng: () => number
  ) {
    if (descriptor.kind === 'intro' || descriptor.blockStartMeters < 210) {
      return Math.floor(laneCount * 0.5);
    }

    const safeMin = coverageTarget <= 2 ? 0 : 1;
    const safeMax = coverageTarget <= 2 ? laneCount - 1 : laneCount - 2;
    return THREE.MathUtils.clamp(
      Math.round((laneCount - 1) * (descriptor.blockStartMeters < 410 ? 0.34 + rng() * 0.5 : 0.24 + rng() * 0.58)),
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

  private getLaneBand(laneIndex: number) {
    if (laneIndex <= 2) {
      return 0 as const;
    }
    if (laneIndex >= 7) {
      return 2 as const;
    }
    return 1 as const;
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
      return laneSpacing * THREE.MathUtils.lerp(1.34, 1.82, progression * 0.84 + rng() * 0.14);
    }
    if (motionPattern === 'horizontal') {
      return DEFAULT_COLUMN_DISTANCE * THREE.MathUtils.lerp(0.84, 1.24, progression * 0.9 + rng() * 0.1);
    }
    return DEFAULT_COLUMN_DISTANCE * THREE.MathUtils.lerp(0.74, 1.04, progression * 0.78 + rng() * 0.14);
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

  private createBlockGridState(
    descriptor: StructuralBlockDescriptor,
    safeStartMeters: number,
    safeEndMeters: number,
    reservedRanges: PlacementReservedRange[]
  ) {
    const startColumn = Math.max(0, Math.floor(Math.min(descriptor.blockStartMeters, safeStartMeters)) - 2);
    const endColumn = Math.ceil(Math.max(descriptor.targetMilestoneMeters + 2, safeEndMeters + 1));
    const occupancyMasks = Array.from({ length: endColumn - startColumn + 1 }, () => 0);
    const state: BlockGridState = {
      startColumn,
      endColumn,
      occupancyMasks
    };

    reservedRanges.forEach((range) => {
      const start = Math.max(startColumn, Math.floor(this.getAbsoluteMetersForX(range.startX)));
      const end = Math.min(endColumn, Math.ceil(this.getAbsoluteMetersForX(range.endX)));
      this.fillGridRect(state, {
        startColumn: start,
        endColumn: end,
        startSlot: 0,
        endSlot: PLAYABLE_PATH_LANE_COUNT - 1
      });
    });

    return state;
  }

  private getAbsoluteMetersForX(x: number) {
    return (x - this.getPathDistanceOffset()) / DEFAULT_COLUMN_DISTANCE;
  }

  private buildGridProbeNode(
    score: number,
    absoluteMeters: number,
    laneIndex: number,
    sizeTier: GameShardSizeTier,
    shapeKind: GameShardShapeKind,
    milestoneOwned = false
  ): GamePathNode {
    const config = SIZE_TIER_CONFIG[sizeTier];
    const gameplayRadius = THREE.MathUtils.lerp(config.radius[0], config.radius[1], 0.72);
    const visualScale = THREE.MathUtils.lerp(config.visual[0], config.visual[1], 0.74);
    const y = getPathLaneTargets(score)[laneIndex] ?? 0;
    const visualStretch =
      shapeKind === 'oval'
        ? { x: 1.76, y: 0.82, z: 0.9 }
        : shapeKind === 'triangular'
          ? { x: 1.2, y: 1.24, z: 0.76 }
          : { x: 1, y: 1, z: 1 };

    return {
      index: score,
      x: this.getAbsoluteXForMeters(absoluteMeters),
      y,
      z: 0,
      gameplayRadius,
      visualScale,
      pathDistance: absoluteMeters * DEFAULT_COLUMN_DISTANCE,
      direction: 'right',
      kind: 'normal',
      sizeTier,
      shapeKind,
      spinDirection: 'cw',
      spinSpeed: 0,
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
      gameplayOrbitPeriod: 3.2,
      branchSlot: null,
      offerId: null,
      onboarding: false,
      isMilestone: false,
      isGigantic: false,
      milestoneOwned,
      reservedMilestoneDistance: null,
      coinSlots: [],
      enemySlot: null,
      motionSeed: 0,
      visualStretch
    };
  }

  private buildGridRectForNode(node: GamePathNode): GridRect {
    const footprint = getNodePlacementFootprint(node);
    const centerMeters = this.getAbsoluteMetersForX(node.x);
    const halfWidthMeters = footprint.x / DEFAULT_COLUMN_DISTANCE;
    let minMeters = centerMeters - halfWidthMeters;
    let maxMeters = centerMeters + halfWidthMeters;
    let minY = node.y - footprint.y;
    let maxY = node.y + footprint.y;

    if (node.motionMode === 'landing_once' && node.motionDirection && (node.motionDistance ?? 0) > 0) {
      const motionVector = this.resolveMotionDirectionVector(node.motionDirection);
      const endX = node.x + motionVector.x * (node.motionDistance ?? 0);
      const endY = node.y + motionVector.y * (node.motionDistance ?? 0);
      const endMeters = this.getAbsoluteMetersForX(endX);
      minMeters = Math.min(minMeters, endMeters - halfWidthMeters);
      maxMeters = Math.max(maxMeters, endMeters + halfWidthMeters);
      minY = Math.min(minY, endY - footprint.y);
      maxY = Math.max(maxY, endY + footprint.y);
    }

    return this.buildGridRectFromBounds(node.index, minMeters, maxMeters, minY, maxY, node.isMilestone);
  }

  private buildGridRectForPlan(
    absoluteMeters: number,
    laneIndex: number,
    score: number,
    sizeTier: GameShardSizeTier,
    shapeKind: GameShardShapeKind
  ) {
    return this.buildGridRectForNode(this.buildGridProbeNode(score, absoluteMeters, laneIndex, sizeTier, shapeKind));
  }

  private buildGridRectFromBounds(
    score: number,
    minMeters: number,
    maxMeters: number,
    minY: number,
    maxY: number,
    milestone: boolean
  ): GridRect {
    const startColumn = Math.round(Math.min(minMeters, maxMeters));
    const endColumn = Math.round(Math.max(minMeters, maxMeters));

    if (milestone) {
      const middleLow = Math.floor((PLAYABLE_PATH_LANE_COUNT - 2) * 0.5);
      const middleHigh = middleLow + 1;
      return {
        startColumn,
        endColumn,
        startSlot: Math.max(0, middleLow - (MILESTONE_GRID_OCCUPIED_HALF_SLOTS - 1) - MILESTONE_GRID_SAFETY_SLOTS),
        endSlot: Math.min(
          PLAYABLE_PATH_LANE_COUNT - 1,
          middleHigh + (MILESTONE_GRID_OCCUPIED_HALF_SLOTS - 1) + MILESTONE_GRID_SAFETY_SLOTS
        )
      };
    }

    const laneTargets = getPathLaneTargets(score);
    const startSlot = this.getLaneIndex(minY, laneTargets);
    const endSlot = this.getLaneIndex(maxY, laneTargets);
    return {
      startColumn: Math.min(startColumn, endColumn),
      endColumn: Math.max(startColumn, endColumn),
      startSlot: Math.min(startSlot, endSlot),
      endSlot: Math.max(startSlot, endSlot)
    };
  }

  private isGridPlacementAvailable(state: BlockGridState, node: GamePathNode) {
    return this.isGridRectFree(state, this.buildGridRectForNode(node));
  }

  private occupyGridNode(state: BlockGridState, node: GamePathNode) {
    this.fillGridRect(state, this.buildGridRectForNode(node));
  }

  private fillGridRect(state: BlockGridState, rect: GridRect) {
    if (rect.endColumn < state.startColumn || rect.startColumn > state.endColumn) {
      return;
    }
    const startColumn = Math.max(state.startColumn, rect.startColumn);
    const endColumn = Math.min(state.endColumn, rect.endColumn);
    const slotMask = this.buildGridSlotMask(rect.startSlot, rect.endSlot);

    for (let column = startColumn; column <= endColumn; column += 1) {
      state.occupancyMasks[column - state.startColumn] |= slotMask;
    }
  }

  private isGridRectFree(state: BlockGridState, rect: GridRect) {
    if (rect.startColumn < state.startColumn || rect.endColumn > state.endColumn) {
      return false;
    }

    const slotMask = this.buildGridSlotMask(rect.startSlot, rect.endSlot);
    for (let column = rect.startColumn; column <= rect.endColumn; column += 1) {
      const mask = state.occupancyMasks[column - state.startColumn];
      if ((mask & slotMask) !== 0) {
        return false;
      }
    }

    return true;
  }

  private buildGridSlotMask(startSlot: number, endSlot: number) {
    const clampedStart = THREE.MathUtils.clamp(startSlot, 0, PLAYABLE_PATH_LANE_COUNT - 1);
    const clampedEnd = THREE.MathUtils.clamp(endSlot, 0, PLAYABLE_PATH_LANE_COUNT - 1);
    let mask = 0;
    for (let slot = Math.min(clampedStart, clampedEnd); slot <= Math.max(clampedStart, clampedEnd); slot += 1) {
      mask |= 1 << slot;
    }
    return mask & GRID_FULL_SLOT_MASK;
  }

  private resolveMotionDirectionVector(direction: NonNullable<GamePathNode['motionDirection']>) {
    switch (direction) {
      case 'left':
        return { x: -1, y: 0 };
      case 'right':
        return { x: 1, y: 0 };
      case 'up':
        return { x: 0, y: 1 };
      case 'down':
        return { x: 0, y: -1 };
      case 'up_left':
        return this.normalizeMotionVector(-1, 1);
      case 'up_right':
        return this.normalizeMotionVector(1, 1);
      case 'down_left':
        return this.normalizeMotionVector(-1, -1);
      case 'down_right':
      default:
        return this.normalizeMotionVector(1, -1);
    }
  }

  private normalizeMotionVector(x: number, y: number) {
    const length = Math.hypot(x, y) || 1;
    return { x: x / length, y: y / length };
  }

  private buildFormationPlans(
    descriptor: StructuralBlockDescriptor,
    sliceIndex: number,
    centerMeters: number,
    backboneLane: number,
    nextBackboneLane: number,
    extraMembers: number,
    eventAssignment: StructuralSliceEventAssignment,
    score: number,
    gridState: BlockGridState,
    rng: () => number
  ) {
    const eventType = eventAssignment.guaranteedShopIcon ? 'shop' : eventAssignment.eventType;
    const isEventSlice = eventType !== 'none';
    const planningState = this.cloneGridState(gridState);
    const memberCount = Math.max(1, 1 + extraMembers);
    const memberAnchors = this.buildFormationMemberMeters(centerMeters, memberCount, descriptor, rng);
    const backboneMotion =
      isEventSlice
        ? 'none'
        : this.pickBlockMotionPattern(
            descriptor,
            sliceIndex,
            score,
            descriptor.kind === 'intro' ? 'small' : 'medium_small',
            rng
          );
    const backboneSizeTier =
      eventType === 'shop'
        ? (eventAssignment.guaranteedShopIcon ? 'medium' : 'medium_large')
        : descriptor.kind === 'intro'
          ? this.pickSizeTier(
              sliceIndex % 3 === 0
                ? ['small', 'medium_small', 'medium']
                : ['very_small', 'small', 'medium_small'],
              score,
              rng
            )
          : this.pickSizeTier(
              descriptor.blockStartMeters < 110
                ? ['small', 'medium_small', 'medium']
                : descriptor.blockStartMeters < 310
                  ? ['very_small', 'small', 'medium_small', 'medium']
                  : ['very_small', 'small', 'medium_small'],
              score,
              rng
            );
    const backboneShape = backboneMotion === 'none' ? this.pickShapeKind(['round', 'oval', 'triangular'], score, rng) : 'round';
    const backboneLaneOrder = this.buildBackboneLanePreference(descriptor, backboneLane, nextBackboneLane, rng);
    const backbonePlacement = eventAssignment.guaranteedShopIcon
      ? this.pickGridLaneAtMeters(
          planningState,
          centerMeters,
          backboneLaneOrder,
          score,
          backboneSizeTier,
          backboneShape
        )
      : this.pickGridPlanAnchor(
          planningState,
          memberAnchors[0] ?? centerMeters,
          backboneLaneOrder,
          score,
          backboneSizeTier,
          backboneShape
        );
    const resolvedBackboneMeters = backbonePlacement?.absoluteMeters ?? memberAnchors[0] ?? centerMeters;
    const resolvedBackboneLane = backbonePlacement?.laneIndex ?? backboneLane;
    const plans: StructuralNodePlan[] = [
      {
        absoluteMeters: resolvedBackboneMeters,
        laneIndex: resolvedBackboneLane,
        sizeTier: backboneSizeTier,
        shapeKind: backboneShape,
        motionPattern: backboneMotion,
        motionDirection:
          backboneMotion === 'vertical'
            ? (resolvedBackboneLane >= 5 ? 'down' : 'up')
            : backboneMotion === 'drift'
              ? (resolvedBackboneLane >= 5 ? 'down_right' : 'up_right')
              : backboneMotion === 'horizontal'
                ? 'right'
                : null,
        motionDistance: this.resolveMotionDistance(descriptor, backboneMotion, score, rng),
        motionDuration: backboneMotion === 'none' ? 0 : THREE.MathUtils.lerp(MOTION_DURATION_MIN, MOTION_DURATION_MAX, rng()),
        eventType,
        guaranteedShopIcon: eventAssignment.guaranteedShopIcon,
        coinAngles: this.buildPlanCoinAngles(descriptor, sliceIndex, eventType, score, rng),
        enemyPole: this.pickPlanEnemyPole(eventType, backboneMotion, backboneShape, score, rng)
      }
    ];
    this.fillGridRect(
      planningState,
      this.buildGridRectForPlan(resolvedBackboneMeters, resolvedBackboneLane, score, backboneSizeTier, backboneShape)
    );

    if (extraMembers <= 0) {
      return plans;
    }

    const usedLanes = new Set<number>([resolvedBackboneLane]);

    for (let memberIndex = 1; memberIndex <= extraMembers; memberIndex += 1) {
      const supportTemplate = this.buildSupportPlan(
        descriptor,
        memberAnchors[memberIndex] ?? (centerMeters + memberIndex * 0.28),
        resolvedBackboneLane,
        score + memberIndex,
        rng,
        memberIndex >= 2
      );
      const supportLaneOrder = this.buildSupportLanePreference(
        descriptor,
        resolvedBackboneLane,
        nextBackboneLane,
        usedLanes,
        memberIndex,
        rng
      );
      const prioritizedSupportLaneOrder =
        descriptor.kind === 'intro' &&
        sliceIndex % 3 === 1 &&
        !Array.from(usedLanes).some((lane) => this.getLaneBand(lane) === 0)
          ? [...new Set([1, 2, 0, ...supportLaneOrder])]
          : descriptor.kind === 'intro' &&
              sliceIndex % 3 === 0 &&
              !Array.from(usedLanes).some((lane) => this.getLaneBand(lane) === 2)
            ? [...new Set([8, 7, 9, ...supportLaneOrder])]
          : supportLaneOrder;
      const placement = this.pickGridPlanAnchor(
        planningState,
        memberAnchors[memberIndex] ?? (centerMeters + memberIndex * 0.28),
        prioritizedSupportLaneOrder,
        score + memberIndex,
        supportTemplate.sizeTier,
        supportTemplate.shapeKind
      );
      if (!placement) {
        continue;
      }

      const plan: StructuralNodePlan = {
        ...supportTemplate,
        absoluteMeters: placement.absoluteMeters,
        laneIndex: placement.laneIndex
      };
      plans.push(plan);
      usedLanes.add(placement.laneIndex);
      this.fillGridRect(
        planningState,
        this.buildGridRectForPlan(
          placement.absoluteMeters,
          placement.laneIndex,
          score + memberIndex,
          supportTemplate.sizeTier,
          supportTemplate.shapeKind
        )
      );
    }

    return plans.sort((left, right) => left.absoluteMeters - right.absoluteMeters);
  }

  private cloneGridState(state: BlockGridState): BlockGridState {
    return {
      startColumn: state.startColumn,
      endColumn: state.endColumn,
      occupancyMasks: [...state.occupancyMasks]
    };
  }

  private buildFormationMemberMeters(
    centerMeters: number,
    memberCount: number,
    descriptor: StructuralBlockDescriptor,
    rng: () => number
  ) {
    if (memberCount <= 1) {
      return [centerMeters];
    }

    const columnOffsets =
      descriptor.kind === 'intro'
        ? INTRO_GRID_SLICE_MEMBER_OFFSETS
        : this.isHighDensityMainBlock(descriptor)
          ? GRID_SLICE_MEMBER_OFFSETS
        : descriptor.blockStartMeters < 410
          ? [0, 0, 0.56, 0.56, 1.12, 1.12, 1.74, 2.22]
          : [0, 0.14, 0.68, 1.1, 1.56, 2.02, 2.48, 2.94];
    const spreadScale =
      descriptor.kind === 'intro'
        ? 1
        : this.isHighDensityMainBlock(descriptor)
          ? 0.92
          : descriptor.blockStartMeters < 1410
            ? 0.9
            : 0.86;

    return columnOffsets
      .slice(0, memberCount)
      .map((offset, index) => {
        const jitter = index < 3 ? 0 : (rng() - 0.5) * 0.06;
        return centerMeters + offset * spreadScale + jitter;
      })
      .sort((left, right) => left - right);
  }

  private buildBackboneLanePreference(
    descriptor: StructuralBlockDescriptor,
    backboneLane: number,
    nextBackboneLane: number,
    _rng: () => number
  ) {
    return Array.from({ length: PLAYABLE_PATH_LANE_COUNT }, (_, laneIndex) => laneIndex)
      .sort((left, right) => this.scoreBackboneLane(descriptor, right, backboneLane, nextBackboneLane) - this.scoreBackboneLane(descriptor, left, backboneLane, nextBackboneLane));
  }

  private scoreBackboneLane(
    descriptor: StructuralBlockDescriptor,
    laneIndex: number,
    backboneLane: number,
    nextBackboneLane: number
  ) {
    const center = (PLAYABLE_PATH_LANE_COUNT - 1) * 0.5;
    const continuityPenalty = Math.abs(laneIndex - backboneLane) * 1.78 + Math.abs(laneIndex - nextBackboneLane) * 0.44;
    const denseField = descriptor.kind === 'intro' || this.isHighDensityMainBlock(descriptor);
    const edgeBonus = denseField ? Math.abs(laneIndex - center) * 0.18 : descriptor.blockStartMeters < 1410 ? Math.abs(laneIndex - center) * 0.26 : 0;
    const middleLift = denseField && laneIndex >= 3 && laneIndex <= 6 ? 1.22 : laneIndex >= 4 && laneIndex <= 5 ? 0.22 : 0;
    const upperBias =
      denseField
        ? laneIndex >= 7
          ? 1.16
          : laneIndex >= 5
            ? 0.48
            : 0
        : descriptor.blockStartMeters < 1410 && laneIndex >= 6
          ? 0.86
          : 0;
    const lowerBias =
      denseField
        ? laneIndex <= 2
          ? 1.02
          : laneIndex <= 4
            ? 0.36
            : 0
        : descriptor.blockStartMeters < 1410 && laneIndex <= 3
          ? 0.54
          : 0;
    return edgeBonus + middleLift + upperBias + lowerBias - continuityPenalty;
  }

  private buildSupportLanePreference(
    descriptor: StructuralBlockDescriptor,
    backboneLane: number,
    nextBackboneLane: number,
    usedLanes: Set<number>,
    memberIndex: number,
    _rng: () => number
  ) {
    const center = (PLAYABLE_PATH_LANE_COUNT - 1) * 0.5;
    const nextDelta = THREE.MathUtils.clamp(nextBackboneLane - backboneLane, -1, 1);
    const denseField = descriptor.kind === 'intro' || this.isHighDensityMainBlock(descriptor);
    const backboneBand = this.getLaneBand(backboneLane);
    const usedBands = new Set(Array.from(usedLanes, (lane) => this.getLaneBand(lane)));

    return Array.from({ length: PLAYABLE_PATH_LANE_COUNT }, (_, laneIndex) => laneIndex)
      .sort((left, right) => {
        const leftDistance = Math.abs(left - backboneLane);
        const rightDistance = Math.abs(right - backboneLane);
        const leftReusePenalty = usedLanes.has(left) ? 12 : 0;
        const rightReusePenalty = usedLanes.has(right) ? 12 : 0;
        const leftEdgeBias = Math.abs(left - center);
        const rightEdgeBias = Math.abs(right - center);
        const leftBand = this.getLaneBand(left);
        const rightBand = this.getLaneBand(right);
        const leftForwardBias = nextDelta === 0 ? 0.18 : Math.sign(left - backboneLane) === Math.sign(nextDelta) ? 0.92 : 0.16;
        const rightForwardBias = nextDelta === 0 ? 0.18 : Math.sign(right - backboneLane) === Math.sign(nextDelta) ? 0.92 : 0.16;
        const leftUpperBias =
          denseField
            ? left >= 7
              ? 1.42
              : left >= 5
                ? 0.56
                : 0
            : descriptor.blockStartMeters < 1410 && left >= 6
              ? 1.08
              : 0;
        const rightUpperBias =
          denseField
            ? right >= 7
              ? 1.42
              : right >= 5
                ? 0.56
                : 0
            : descriptor.blockStartMeters < 1410 && right >= 6
              ? 1.08
              : 0;
        const leftLowerBias =
          denseField
            ? left <= 2
              ? 1.26
              : left <= 4
                ? 0.44
                : 0
            : descriptor.blockStartMeters < 1410 && left <= 3
              ? 0.84
              : 0;
        const rightLowerBias =
          denseField
            ? right <= 2
              ? 1.26
              : right <= 4
                ? 0.44
                : 0
            : descriptor.blockStartMeters < 1410 && right <= 3
              ? 0.84
              : 0;
        const leftExtremeBoost = denseField && (left <= 1 || left >= 8) ? 1.14 : 0;
        const rightExtremeBoost = denseField && (right <= 1 || right >= 8) ? 1.14 : 0;
        const leftBandDiversity = !usedBands.has(leftBand) ? 3.1 : leftBand !== backboneBand ? 1.2 : -1.4;
        const rightBandDiversity = !usedBands.has(rightBand) ? 3.1 : rightBand !== backboneBand ? 1.2 : -1.4;
        const leftMiddleBonus = denseField && leftBand === 1 ? 1.18 : 0;
        const rightMiddleBonus = denseField && rightBand === 1 ? 1.18 : 0;
        const leftMemberBias = memberIndex === 1 ? leftDistance * 2.04 : leftDistance * 1.72 + leftEdgeBias * 0.86;
        const rightMemberBias = memberIndex === 1 ? rightDistance * 2.04 : rightDistance * 1.72 + rightEdgeBias * 0.86;

        return (
          rightMemberBias +
          rightForwardBias +
          rightBandDiversity +
          rightMiddleBonus +
          rightUpperBias +
          rightLowerBias +
          rightExtremeBoost -
          rightReusePenalty
        ) - (
          leftMemberBias +
          leftForwardBias +
          leftBandDiversity +
          leftMiddleBonus +
          leftUpperBias +
          leftLowerBias +
          leftExtremeBoost -
          leftReusePenalty
        );
      });
  }

  private pickGridPlanAnchor(
    state: BlockGridState,
    centerMeters: number,
    laneOrder: number[],
    score: number,
    sizeTier: GameShardSizeTier,
    shapeKind: GameShardShapeKind
  ) {
    const meterOrder = [
      centerMeters,
      centerMeters + 0.04,
      centerMeters - 0.04,
      centerMeters + 0.18,
      centerMeters - 0.16,
      centerMeters + 0.34,
      centerMeters - 0.28,
      centerMeters + 0.52
    ];

    for (const absoluteMeters of meterOrder) {
      for (const laneIndex of laneOrder) {
        const rect = this.buildGridRectForPlan(absoluteMeters, laneIndex, score, sizeTier, shapeKind);
        if (this.isGridRectFree(state, rect)) {
          return { absoluteMeters, laneIndex };
        }
      }
    }

    return null;
  }

  private pickGridLaneAtMeters(
    state: BlockGridState,
    absoluteMeters: number,
    laneOrder: number[],
    score: number,
    sizeTier: GameShardSizeTier,
    shapeKind: GameShardShapeKind
  ) {
    for (const laneIndex of laneOrder) {
      const rect = this.buildGridRectForPlan(absoluteMeters, laneIndex, score, sizeTier, shapeKind);
      if (this.isGridRectFree(state, rect)) {
        return { absoluteMeters, laneIndex };
      }
    }

    return null;
  }

  private buildSupportPlan(
    descriptor: StructuralBlockDescriptor,
    absoluteMeters: number,
    laneIndex: number,
    score: number,
    rng: () => number,
    handoff: boolean
  ): StructuralNodePlan {
    const sizeTier = handoff
      ? this.pickSizeTier(
          descriptor.kind === 'intro'
            ? ['tiny', 'very_small', 'small']
            : ['tiny', 'very_small', 'small', 'medium_small'],
          score,
          rng
        )
      : this.pickSizeTier(
          descriptor.kind === 'intro' || this.isHighDensityMainBlock(descriptor)
            ? ['tiny', 'very_small', 'small', 'medium_small']
            : ['very_small', 'small', 'medium_small'],
          score,
          rng
        );
    return {
      absoluteMeters,
      laneIndex,
      sizeTier,
      shapeKind: this.pickShapeKind(['round', 'oval', 'triangular'], score, rng),
      motionPattern: 'none',
      motionDirection: null,
      motionDistance: 0,
      motionDuration: 0,
      eventType: 'none',
      guaranteedShopIcon: false,
      coinAngles: descriptor.kind === 'intro' && handoff && rng() < 0.42 ? [Math.PI * (0.28 + rng() * 0.92)] : [],
      enemyPole: null
    };
  }

  private placeStructuralNode(
    previous: GamePathNode,
    generated: GamePathNode[],
    reservedRanges: PlacementReservedRange[],
    plan: StructuralNodePlan,
    descriptor: StructuralBlockDescriptor,
    gridState: BlockGridState,
    rng: () => number
  ) {
    const anchor = generated[generated.length - 1] ?? previous;
    const score = anchor.index + 1;
    const laneCount = getPathLaneTargets(score).length;
    const laneOrder = this.buildLaneTrialOrder(plan.laneIndex, laneCount);
    const sizeOrder = this.buildSizeTrialOrder(plan.sizeTier);
    const xOffsets = plan.guaranteedShopIcon ? [0] : [0, 0.08, -0.06, 0.18, -0.14, 0.32, -0.24, 0.46];

    for (const sizeTier of sizeOrder) {
      for (const laneIndex of laneOrder) {
        for (const xOffset of xOffsets) {
          const candidateMeters = plan.absoluteMeters + xOffset;
          if (
            !plan.guaranteedShopIcon &&
            descriptor.guaranteedShopMeters !== null &&
            Math.abs(candidateMeters - descriptor.guaranteedShopMeters) < 0.9
          ) {
            continue;
          }
          const shapeKind =
            plan.motionPattern !== 'none' || plan.eventType === 'shop'
              ? 'round'
              : plan.shapeKind;
          const candidate = this.buildGeneratedNode(anchor, {
            ...plan,
            absoluteMeters: candidateMeters,
            laneIndex,
            sizeTier,
            shapeKind,
            motionPattern: 'none',
            motionDirection: null,
            motionDistance: 0,
            motionDuration: 0
          }, rng);
          if (!candidate) {
            continue;
          }

          const resolvedCandidate = this.resolveGridMotionCandidate(candidate, plan, descriptor, gridState);
          if (!this.validatePlacement([resolvedCandidate], this.nodes, generated, reservedRanges)) {
            continue;
          }
          return resolvedCandidate;
        }
      }
    }

    return null;
  }

  private resolveGridMotionCandidate(
    candidate: GamePathNode,
    plan: StructuralNodePlan,
    descriptor: StructuralBlockDescriptor,
    gridState: BlockGridState
  ) {
    if (plan.motionPattern === 'none') {
      return candidate;
    }

    const duration = plan.motionDuration > 0 ? plan.motionDuration : THREE.MathUtils.lerp(MOTION_DURATION_MIN, MOTION_DURATION_MAX, 0.58);
    const preferredDirections: Array<GameShardMotionDirection | null> =
      plan.motionPattern === 'vertical'
        ? [plan.motionDirection ?? (candidate.y >= 0 ? 'down' : 'up'), candidate.y >= 0 ? 'up' : 'down']
        : plan.motionPattern === 'horizontal'
          ? [plan.motionDirection ?? 'right', 'right']
          : [plan.motionDirection ?? (candidate.y >= 0 ? 'down_right' : 'up_right'), candidate.y >= 0 ? 'up_right' : 'down_right'];
    const distanceBoost = descriptor.blockStartMeters < 110 ? 1.18 : descriptor.blockStartMeters < 310 ? 1.24 : 1.3;

    for (const direction of preferredDirections) {
      if (!direction) {
        continue;
      }
      const distance = this.resolveGridMotionDistance(candidate, gridState, direction, plan.motionDistance * distanceBoost);
      if (distance <= 0) {
        continue;
      }

      const movingCandidate: GamePathNode = {
        ...candidate,
        motionPattern: plan.motionPattern,
        motionMode: 'landing_once',
        motionDirection: direction,
        motionDistance: distance,
        motionDuration: duration
      };
      if (this.isGridPlacementAvailable(gridState, movingCandidate)) {
        return movingCandidate;
      }
    }

    return candidate;
  }

  private resolveGridMotionDistance(
    candidate: GamePathNode,
    gridState: BlockGridState,
    direction: GameShardMotionDirection,
    desiredDistance: number
  ) {
    const step = this.resolveGridMotionStep(direction);
    const baseRect = this.buildGridRectForNode(candidate);
    const laneSpacing = getPathLaneSpacing(candidate.index);
    const stepDistance =
      step.columnDelta !== 0 && step.slotDelta !== 0
        ? Math.hypot(DEFAULT_COLUMN_DISTANCE, laneSpacing)
        : step.columnDelta !== 0
          ? DEFAULT_COLUMN_DISTANCE
          : laneSpacing;
    const maxSteps = Math.max(1, Math.ceil(desiredDistance / Math.max(0.001, stepDistance)));
    let freeSteps = 0;

    for (let index = 1; index <= maxSteps; index += 1) {
      const shiftedRect: GridRect = {
        startColumn: baseRect.startColumn + step.columnDelta * index,
        endColumn: baseRect.endColumn + step.columnDelta * index,
        startSlot: baseRect.startSlot + step.slotDelta * index,
        endSlot: baseRect.endSlot + step.slotDelta * index
      };
      if (
        shiftedRect.startSlot < 0 ||
        shiftedRect.endSlot >= PLAYABLE_PATH_LANE_COUNT ||
        shiftedRect.startColumn < gridState.startColumn ||
        shiftedRect.endColumn > gridState.endColumn
      ) {
        break;
      }
      if (!this.isGridRectFree(gridState, shiftedRect)) {
        break;
      }
      freeSteps = index;
    }

    if (freeSteps === 0) {
      return 0;
    }

    return Math.min(desiredDistance, freeSteps * stepDistance);
  }

  private resolveGridMotionStep(direction: GameShardMotionDirection) {
    switch (direction) {
      case 'left':
        return { columnDelta: -1, slotDelta: 0 };
      case 'right':
        return { columnDelta: 1, slotDelta: 0 };
      case 'up':
        return { columnDelta: 0, slotDelta: 1 };
      case 'down':
        return { columnDelta: 0, slotDelta: -1 };
      case 'up_left':
        return { columnDelta: -1, slotDelta: 1 };
      case 'up_right':
        return { columnDelta: 1, slotDelta: 1 };
      case 'down_left':
        return { columnDelta: -1, slotDelta: -1 };
      case 'down_right':
      default:
        return { columnDelta: 1, slotDelta: -1 };
    }
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
    if (x < previous.x - DEFAULT_COLUMN_DISTANCE * 0.04) {
      return null;
    }

    const laneTargets = getPathLaneTargets(score);
    const targetLaneY = laneTargets[plan.laneIndex] ?? 0;
    const introLift = plan.absoluteMeters <= INTRO_BLOCK_METERS ? INTRO_PATTERN_FIELD_LIFT : 0;
    const jitter =
      plan.guaranteedShopIcon || plan.milestoneOwned
        ? 0
        : plan.sizeTier === 'large' || plan.sizeTier === 'medium_large'
          ? 0.22
          : 0.38;
    const y = targetLaneY + introLift + (rng() - 0.5) * jitter;
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

  private getPathFieldCenterY(score: number) {
    return getPathLaneVerticalOffset(score) + (score <= INTRO_BLOCK_METERS ? INTRO_PATTERN_FIELD_LIFT : 0);
  }

  private buildMilestonePrototype(targetMilestoneMeters: number): GamePathNode {
    const milestoneVisualScale = MILESTONE_HALF_WIDTH / (1.25 * 0.92);
    return {
      index: -1,
      x: this.getAbsoluteXForMeters(targetMilestoneMeters),
      y: this.getPathFieldCenterY(targetMilestoneMeters),
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
    const milestone = this.buildNode({
      previous,
      index: previous.index + 1,
      x: prototype.x,
      y: prototype.y,
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
    return {
      ...milestone,
      pathDistance: prototype.pathDistance
    };
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
      // Structural generation now reasons in forward meters, so logical path distance
      // should advance with forward travel rather than arc length from vertical spread.
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
          ? 0.46
          : score < 40
            ? 0.34
            : score < 120
              ? 0.28
              : 0.2;
    if (rng() > coinChance) {
      return [] as number[];
    }

    const count =
      descriptor.kind === 'intro'
        ? (rng() < 0.32 ? 2 : 1)
        : this.isHighDensityMainBlock(descriptor)
          ? rng() < 0.22
            ? 3
            : rng() < 0.78
              ? 2
              : 1
          : score > 80 && rng() < 0.34
            ? 2
            : 1;
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
    const chance = score < 60 ? 0.22 : score < 120 ? 0.3 : 0.38;
    if (rng() > chance) {
      return null;
    }
    return rng() < 0.5 ? 'north' : 'south';
  }

  private buildCoinSlots(coinAngles: number[], eventType: GameEventType, score: number, rng: () => number) {
    const decorateCoinSlot = (angle: number) => {
      const airborneChance = score < 20 ? 0.52 : score < 70 ? 0.38 : score < 140 ? 0.28 : 0.2;
      const airborne = eventType !== 'shop' && rng() < airborneChance;
      const liftBias = Math.sin(angle) * THREE.MathUtils.lerp(0.16, 0.56, rng());
      return {
        angle,
        value: eventType === 'rare_item' ? 2 : 1,
        collected: false,
        orbitScale: airborne ? THREE.MathUtils.lerp(1.26, 1.92, rng()) : 1,
        forwardOffset: airborne ? THREE.MathUtils.lerp(1.1, 3.4, rng()) : 0,
        verticalOffset: airborne ? THREE.MathUtils.lerp(-0.38, 1.42, rng()) + liftBias : 0
      };
    };

    const buildCorridorCoinSlot = () => {
      const angle = Math.PI * (0.22 + rng() * 1.36);
      const forwardSign = rng() < 0.84 ? 1 : -1;
      const verticalBias = Math.sin(angle) >= 0 ? 1 : -1;
      return {
        angle,
        value: 1,
        collected: false,
        orbitScale: THREE.MathUtils.lerp(1.42, 2.06, rng()),
        forwardOffset: THREE.MathUtils.lerp(1.8, 4.4, rng()) * forwardSign,
        verticalOffset: THREE.MathUtils.lerp(0.42, 1.84, rng()) * verticalBias
      };
    };

    const slots = coinAngles.map((angle) => decorateCoinSlot(angle));
    const corridorCoinChance = score < 24 ? 0.48 : score < 100 ? 0.38 : 0.26;
    if (eventType === 'none' && slots.length > 0 && rng() < corridorCoinChance) {
      slots.push(buildCorridorCoinSlot());
    }
    if (slots.length === 0 && score < 12 && eventType === 'none') {
      slots.push(buildCorridorCoinSlot());
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

  private isHighDensityMainBlock(descriptor: StructuralBlockDescriptor) {
    return descriptor.kind === 'main' && descriptor.blockStartMeters < DENSITY_TAPER_START_METERS;
  }

  private resolveMainDensityTaper(descriptor: StructuralBlockDescriptor) {
    if (descriptor.kind === 'intro') {
      return 0;
    }
    return THREE.MathUtils.smootherstep(
      clamp((descriptor.blockStartMeters - DENSITY_TAPER_START_METERS) / Math.max(1, DENSITY_TAPER_END_METERS - DENSITY_TAPER_START_METERS), 0, 1),
      0,
      1
    );
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
