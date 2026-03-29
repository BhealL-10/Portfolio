import * as THREE from 'three';
import { clamp } from '../core/math';
import { DEFAULT_COLUMN_DISTANCE, getDifficultyProfile, pathDistanceToMeters } from './difficultyScaler';
import { EventSystem } from './EventSystem';
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

  reset() {
    this.seed = (Math.random() * 0x7fffffff) | 1;
    this.recentPatternIds = [];
    this.eventSystem.reset();
    this.lastShopDistanceMeters = Number.NEGATIVE_INFINITY;
    this.guaranteedShopAt50Spawned = false;
    this.rewardChanceBias = 0;
    this.shopChanceBias = 0;
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
        coinSlots: [{ angle: Math.PI * 0.4, value: 1, collected: false, orbitScale: 1 }],
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
    return this.getInitialNodes(count).map((node) => ({ x: node.x, y: node.y, z: node.z }));
  }

  getNode(index: number) {
    this.ensureAhead(index + 1);
    return this.nodes[index] || null;
  }

  getWindow(start: number, count: number, elapsedTime: number, currentIndex: number) {
    this.ensureAhead(start + count);
    return this.nodes.slice(start, start + count).map((node) => resolveRuntimeNode(node, elapsedTime, currentIndex));
  }

  getResolvedNode(index: number, elapsedTime: number, currentIndex: number): ResolvedGamePathNode {
    this.ensureAhead(index + 1);
    const node = this.nodes[index] ?? this.nodes[this.nodes.length - 1]!;
    return resolveRuntimeNode(node, elapsedTime, currentIndex);
  }

  replaceFuture(startIndex: number, nodes: GamePathNode[]) {
    const preserved = this.nodes.slice(0, startIndex + 1);
    const previous = preserved[preserved.length - 1] ?? null;
    const normalized: GamePathNode[] = [];

    nodes.forEach((node, offset) => {
      normalized.push(this.reindexNode(node, startIndex + offset + 1, offset === 0 ? previous : normalized[offset - 1]));
    });

    this.nodes = [...preserved, ...normalized];
  }

  createUpgradeBranches(milestoneIndex: number, offers: RogueliteItemOffer[], score: number): BranchChoice[] {
    const milestone = this.getNode(milestoneIndex);
    if (!milestone) return [];

    const laneSpacing = score < 50 ? 8.4 : 7.2;
    const branchEntryX = milestone.x + MILESTONE_REWARD_OFFSET;
    const definitions = [
      { slot: 0 as const, yBias: laneSpacing * 1.58, direction: 'up_right' as const },
      { slot: 1 as const, yBias: 0, direction: 'right' as const },
      { slot: 2 as const, yBias: -laneSpacing * 1.58, direction: 'down_right' as const }
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

      return {
        mode: 'reward_branch',
        offer,
        entry,
        previewNodes: [entry],
        pathNodes: [entry]
      };
    });
  }

  getTeleportTarget(fromIndex: number, range: number) {
    this.ensureAhead(fromIndex + range + 60);
    const maxIndex = Math.min(this.nodes.length - 5, fromIndex + range);
    let bestIndex = -1;
    let bestRadius = Number.POSITIVE_INFINITY;

    for (let candidate = fromIndex + 2; candidate <= maxIndex; candidate += 1) {
      if (!validateTeleportTarget(this.nodes, fromIndex, candidate)) {
        continue;
      }
      const node = this.nodes[candidate];
      if (!node) continue;
      if (node.enemySlot?.alive) {
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
          x,
          y,
          z: 0,
          tangent: { x: (node.x - previous.x) / length, y: (node.y - previous.y) / length }
        };
      }
      previous = node;
    }

    const last = this.nodes[this.nodes.length - 1]!;
    const before = this.nodes[this.nodes.length - 2] ?? last;
    const length = Math.hypot(last.x - before.x, last.y - before.y) || 1;
    return {
      x: last.x,
      y: last.y,
      z: 0,
      tangent: { x: (last.x - before.x) / length, y: (last.y - before.y) / length }
    };
  }

  private append(minimumNodes: number) {
    if (minimumNodes <= 0) return;
    if (this.nodes.length === 0) {
      this.reset();
    }

    let appended = 0;
    while (appended < minimumNodes) {
      const pattern = selectPattern(this.nodes.length, () => this.nextRandom(), this.recentPatternIds);
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
    const candidates = this.isolateMilestones(this.densifyPattern(previous, rawCandidates, score), previous, score);
    let basePattern: GamePathNode[];

    if (validatePatternPlacement(candidates, this.nodes)) {
      basePattern = candidates;
    } else if (validatePatternPlacement(rawCandidates, this.nodes)) {
      basePattern = rawCandidates;
    } else {
      basePattern = this.buildFallbackPattern(previous);
    }

    return this.reserveMilestones(previous, this.expandLanePresence(previous, basePattern, score), score);
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
      if (crossedMilestone !== null) {
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

    return this.isolateMilestones(reserved, previous, score);
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
    const { eventType, eventVisualKind } = this.resolveEventType(index, previousDistanceMeters, currentDistanceMeters, score, template);
    const shapeKind = eventVisualKind === 'shop' ? 'round' : baseShapeKind;
    const motionPattern = isGigantic ? 'none' : this.pickMotionPattern(template.motionPattern, score, shapeKind, resolvedSizeTier);
    const spinDirection: GameShardSpinDirection = eventVisualKind === 'shop' ? 'cw' : this.nextRandom() < 0.5 ? 'cw' : 'ccw';
    const spinSpeed =
      eventVisualKind === 'shop'
        ? 0.64 + this.nextRandom() * 0.22
        : shapeKind === 'triangular'
        ? 0.42 + this.nextRandom() * 0.22
        : shapeKind === 'oval'
          ? 0.18 + this.nextRandom() * 0.1
          : 0.08 + this.nextRandom() * 0.12;
    const visualStretch =
      eventVisualKind === 'shop'
        ? { x: 1.02 + this.nextRandom() * 0.08, y: 1.02 + this.nextRandom() * 0.08, z: 0.88 + this.nextRandom() * 0.08 }
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

    return this.buildNode({
      previous,
      index,
      x,
      y,
      direction,
      sizeTier: resolvedSizeTier,
      shapeKind,
      motionPattern,
      spinDirection,
      spinSpeed,
      gameplayRadius,
      visualScale: visibilityBoost ? visualScale * (eventVisualKind === 'shop' ? 1.18 : 1.08) : visualScale,
      gameplayOrbitPeriod,
      visualStretch,
      kind,
      branchSlot: null,
      offerId: null,
      onboarding: index < 50,
      eventType,
      eventVisualKind,
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
        motionPattern: profile.roundMovementUnlocked ? 'vertical' : 'none',
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

  private densifyPattern(previous: GamePathNode, candidates: GamePathNode[], score: number) {
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
      const earlyVerticalBias = score < 50;
      const largestRadius = Math.max(candidate.gameplayRadius, cursor.gameplayRadius);
      const clusterPotential = largestRadius < 1.05 ? 4 : largestRadius < 1.9 ? 2 : 1;

      const needsExtra =
        score < 160 &&
        (
          distance > profile.spacing * (earlyVerticalBias ? 0.82 : 1.02) ||
          Math.abs(dy) > profile.maxVerticalDelta * 0.62 ||
          flatRun >= (earlyVerticalBias ? 1 : 2) ||
          periodicVerticalWindow
        );

      if (needsExtra) {
        const baseInsertions =
          earlyVerticalBias || periodicVerticalWindow || distance > profile.spacing * 1.28 || Math.abs(dy) > profile.maxVerticalDelta * 0.92 ? 2 : 1;
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
            motionPattern: score >= 40 && step === insertions - 1 ? 'vertical' : 'none',
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

  private expandLanePresence(previous: GamePathNode, candidates: GamePathNode[], score: number) {
    if (candidates.length === 0) return candidates;

    const laneSpacing = score < 50 ? 8.4 : 7.2;
    const laneTargets = [-laneSpacing, 0, laneSpacing];
    const compactLaneTargets = [-laneSpacing * 1.65, -laneSpacing * 0.82, 0, laneSpacing * 0.82, laneSpacing * 1.65];
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

      const largeShard = ['large', 'very_large', 'huge', 'massive'].includes(mainNode.sizeTier);
      if (largeShard) {
        return;
      }

      const earlyDenseWindow = score < 50;
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
      const centerLaneIndex = fiveLaneMode ? 2 : 1;
      const mainLane = this.getLaneIndex(mainNode.y, laneSpacing, fiveLaneMode);
      const companionOrder = this.buildCompanionLaneOrder(mainLane, activeLaneTargets.length);
      const maxCompanions =
        mainNode.sizeTier === 'tiny' || mainNode.sizeTier === 'very_small' || mainNode.sizeTier === 'small'
          ? (fiveLaneMode ? 4 : earlyDenseWindow ? 2 : 1)
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
            motionPattern: earlyDenseWindow ? 'none' : this.nextRandom() < 0.16 ? 'vertical' : 'none',
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
    colorHint: GamePathNode['colorHint'];
    isMilestone: boolean;
    isGigantic: boolean;
    coinSlots: GameCoinSlot[];
    enemySlot: GamePathNode['enemySlot'];
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
      eventType: config.eventType,
      eventVisualKind:
        config.eventVisualKind ??
        (config.eventType === 'shop' || config.eventType === 'gift' || config.eventType === 'rare_item' ? 'question' : 'default'),
      colorHint: config.colorHint,
      gameplayOrbitPeriod: config.gameplayOrbitPeriod,
      branchSlot: config.branchSlot,
      offerId: config.offerId,
      onboarding: config.onboarding,
      isMilestone: config.isMilestone,
      isGigantic: config.isGigantic,
      coinSlots: config.coinSlots,
      enemySlot: config.enemySlot,
      motionSeed: this.nextRandom() * Math.PI * 2,
      visualStretch: config.visualStretch
    };
  }

  private alignToLane(rawY: number, score: number, sizeTier: GameShardSizeTier, encourageSpread: boolean) {
    const laneSpacing = score < 50 ? 8.4 : 7.2;
    const laneTargets = [-laneSpacing, 0, laneSpacing];
    const largest = sizeTier === 'massive' || sizeTier === 'huge' || sizeTier === 'very_large';
    const medium = sizeTier === 'medium' || sizeTier === 'medium_large' || sizeTier === 'large';

    if (largest) {
      return THREE.MathUtils.clamp(rawY * 0.35, -laneSpacing, laneSpacing);
    }

    const preferredIndex =
      rawY > laneSpacing * 0.35 ? 2 :
      rawY < -laneSpacing * 0.35 ? 0 :
      1;

    let laneIndex = preferredIndex;
    if (encourageSpread && !medium && this.nextRandom() < 0.42) {
      laneIndex = [0, 1, 2][Math.floor(this.nextRandom() * 3)] ?? preferredIndex;
    } else if (encourageSpread && medium && this.nextRandom() < 0.2) {
      laneIndex = preferredIndex === 1 ? (this.nextRandom() < 0.5 ? 0 : 2) : preferredIndex;
    }

    const jitter = largest ? 0.32 : medium ? 0.44 : 0.58;
    return laneTargets[laneIndex]! + (this.nextRandom() - 0.5) * jitter;
  }

  private getLaneIndex(y: number, laneSpacing: number, extended = false) {
    if (!extended) {
      if (y > laneSpacing * 0.42) return 2;
      if (y < -laneSpacing * 0.42) return 0;
      return 1;
    }

    if (y > laneSpacing * 1.24) return 4;
    if (y > laneSpacing * 0.38) return 3;
    if (y < -laneSpacing * 1.24) return 0;
    if (y < -laneSpacing * 0.38) return 1;
    return 2;
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
    const centeredY = this.alignToLane(0, score, node.sizeTier, false);
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
      colorHint: node.colorHint,
      isMilestone: node.isMilestone,
      isGigantic: node.isGigantic,
      coinSlots: node.coinSlots.map((slot) => ({ ...slot })),
      enemySlot: node.enemySlot ? { ...node.enemySlot } : null
    });
  }

  private buildCoinSlots(template: GamePatternNodeTemplate, eventType: GameEventType, score: number) {
    const slots = template.coinAngles?.map((angle) => ({
      angle,
      value: eventType === 'rare_item' ? 2 : 1,
      collected: false,
      orbitScale: 1
    })) ?? [];

    if (slots.length === 0 && score < 12) {
      slots.push({
        angle: Math.PI * (0.2 + this.nextRandom() * 1.6),
        value: 1,
        collected: false,
        orbitScale: 1
      });
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

    const laneSpacing = score < 50 ? 8.4 : 7.2;
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
          y: Math.abs(nextNode.y) < laneSpacing * 1.7 ? (nextNode.y >= 0 ? laneSpacing * 2.2 : -laneSpacing * 2.2) : nextNode.y
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
        if (insideReservedZone) {
          nextNode = {
            ...nextNode,
            x: reservedRange.end + Math.max(DEFAULT_COLUMN_DISTANCE * 0.92, nextNode.gameplayRadius * 0.42),
            y: Math.abs(nextNode.y) < laneSpacing * 1.9 ? (nextNode.y >= 0 ? laneSpacing * 2.5 : -laneSpacing * 2.5) : nextNode.y
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

  private pickMotionPattern(
    templatePattern: GameShardMotionPattern | undefined,
    score: number,
    shape: GameShardShapeKind,
    sizeTier: GameShardSizeTier
  ) {
    const profile = getDifficultyProfile(score);
    if (shape !== 'round' || !profile.roundMovementUnlocked) return 'none';
    if (['large', 'very_large', 'huge', 'massive'].includes(sizeTier)) return 'none';
    const contextualChance = profile.movingShardChance * (score < 50 ? 0.55 : 1);
    if (templatePattern && templatePattern !== 'none' && this.nextRandom() < contextualChance + 0.18) {
      return templatePattern;
    }
    if (this.nextRandom() > contextualChance) {
      return 'none';
    }
    const patterns: GameShardMotionPattern[] = ['vertical', 'horizontal'];
    return patterns[Math.floor(this.nextRandom() * patterns.length)] ?? 'none';
  }

  private resolveEventType(
    index: number,
    previousDistanceMeters: number,
    currentDistanceMeters: number,
    score: number,
    template: GamePatternNodeTemplate
  ) {
    if (getCrossedUpgradeMilestone(previousDistanceMeters, currentDistanceMeters) !== null) {
      return { eventType: 'none' as GameEventType, eventVisualKind: 'default' as GameEventVisualKind };
    }

    if (!this.guaranteedShopAt50Spawned && currentDistanceMeters >= 50 && template.sizeTier !== 'massive') {
      this.guaranteedShopAt50Spawned = true;
      this.lastShopDistanceMeters = currentDistanceMeters;
      return { eventType: 'shop' as GameEventType, eventVisualKind: 'shop' as GameEventVisualKind };
    }

    const planned = this.eventSystem.consumePlannedEvent(index, score);
    if (planned !== 'none') {
      if (planned === 'shop') {
        this.lastShopDistanceMeters = currentDistanceMeters;
      }
      return {
        eventType: planned,
        eventVisualKind: planned === 'shop' ? 'shop' : planned === 'gift' || planned === 'rare_item' ? 'question' : 'default'
      };
    }

    if (currentDistanceMeters > 50 && currentDistanceMeters - this.lastShopDistanceMeters >= 85 && template.sizeTier !== 'massive') {
      this.lastShopDistanceMeters = currentDistanceMeters;
      return { eventType: 'shop' as GameEventType, eventVisualKind: 'shop' as GameEventVisualKind };
    }

    if (currentDistanceMeters >= 30 && template.sizeTier !== 'massive') {
      const eventChance =
        (currentDistanceMeters < 80
          ? 0.026
          : currentDistanceMeters < 100
            ? 0.032
            : currentDistanceMeters < 250
              ? 0.042
              : currentDistanceMeters < 600
                ? 0.052
                : 0.066) +
        this.rewardChanceBias * 0.32 +
        this.shopChanceBias * 0.38;
      if (this.nextRandom() < eventChance) {
        const roll = this.nextRandom();
        const shopThreshold = Math.min(0.64, 0.3 + this.shopChanceBias * 1.35);
        const rewardThreshold = Math.min(0.92, 0.64 + this.rewardChanceBias * 1.4);
        if (roll < shopThreshold) {
          this.lastShopDistanceMeters = currentDistanceMeters;
          return { eventType: 'shop' as GameEventType, eventVisualKind: 'question' as GameEventVisualKind };
        }
        if (roll < rewardThreshold) {
          return { eventType: 'gift' as GameEventType, eventVisualKind: 'question' as GameEventVisualKind };
        }
        return { eventType: 'rare_item' as GameEventType, eventVisualKind: 'question' as GameEventVisualKind };
      }
    }

    return { eventType: 'none' as GameEventType, eventVisualKind: 'default' as GameEventVisualKind };
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
