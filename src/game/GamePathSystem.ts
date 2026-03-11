import * as THREE from 'three';
import { clamp } from '../core/math';
import { getDifficultyProfile } from './difficultyScaler';
import { EventSystem } from './EventSystem';
import type { GamePathPattern, GamePatternNodeTemplate } from './PatternLibrary';
import { selectPattern } from './PatternSelector';
import { validatePatternPlacement, validateTeleportTarget } from './PatternValidator';
import { isUpgradeMilestone, type RogueliteItemOffer } from './roguelite';
import { resolveRuntimeNode } from './ShardRuntimeResolver';
import type {
  BranchChoice,
  GameCoinSlot,
  GameEventType,
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

export class GamePathSystem {
  private nodes: GamePathNode[] = [];
  private eventSystem = new EventSystem();
  private seed = 1;
  private recentPatternIds: string[] = [];

  reset() {
    this.seed = (Math.random() * 0x7fffffff) | 1;
    this.recentPatternIds = [];
    this.eventSystem.reset();
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
    if (this.nodes.length - currentIndex > threshold) return;
    this.append(chunkSize);
  }

  queuePostMilestoneEvents(fromIndex: number, score: number) {
    this.eventSystem.schedulePostMilestoneEvents(fromIndex, score, () => this.nextRandom());
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

    const profile = getDifficultyProfile(score);
    const baseSpacing = profile.spacing * 1.18;
    const definitions = [
      { slot: 0 as const, yBias: 10.5, xBias: 12.5, direction: 'up_right' as const },
      { slot: 1 as const, yBias: 0, xBias: 14.5, direction: 'right' as const },
      { slot: 2 as const, yBias: -10.5, xBias: 12.5, direction: 'down_right' as const }
    ];

    return offers.slice(0, 3).map((offer, index) => {
      const branch = definitions[index] ?? definitions[1];
      const pathNodes: GamePathNode[] = [];

      for (let step = 0; step < 5; step += 1) {
        const branchRatio = step / 4;
        const previous = step === 0 ? milestone : pathNodes[step - 1];
        const sizeTier = step < 2 ? 'large' : 'medium_large';
        const sizeConfig = SIZE_TIER_CONFIG[sizeTier];
        const gameplayRadius = sizeConfig.radius[0] + this.nextRandom() * (sizeConfig.radius[1] - sizeConfig.radius[0]);
        const visualScale = sizeConfig.visual[0] + this.nextRandom() * (sizeConfig.visual[1] - sizeConfig.visual[0]);
        const orbitPeriod = sizeConfig.orbitPeriod[0] + this.nextRandom() * (sizeConfig.orbitPeriod[1] - sizeConfig.orbitPeriod[0]);
        const x = milestone.x + branch.xBias + step * baseSpacing * 0.92;
        const y = milestone.y + branch.yBias * (0.38 + branchRatio * 0.92) + Math.sin(branchRatio * Math.PI) * branch.yBias * 0.12;

        pathNodes.push(this.buildNode({
          previous,
          index: milestoneIndex + step + 1,
          x,
          y,
          direction: branch.direction,
          sizeTier,
          shapeKind: score >= 100 ? (index === 1 ? 'triangular' : 'oval') : score >= 50 ? 'oval' : 'round',
          motionPattern: step === 0 ? 'none' : step % 2 === 0 ? 'vertical' : 'horizontal',
          spinDirection: index === 1 ? 'cw' : 'ccw',
          spinSpeed: 0.12 + this.nextRandom() * 0.16,
          gameplayRadius,
          visualScale,
          gameplayOrbitPeriod: orbitPeriod,
          visualStretch: index === 1 ? { x: 1, y: 1.08, z: 0.84 } : { x: 1.32, y: 0.84, z: 1 },
          kind: 'branch',
          branchSlot: branch.slot,
          offerId: offer.item.id,
          onboarding: false,
          eventType: 'none',
          colorHint: 'reward',
          isMilestone: false,
          isGigantic: false,
          coinSlots: step === 0 ? [{ angle: Math.PI * 0.5, value: 1, collected: false, orbitScale: 1 }] : [],
          enemySlot: null
        }));
      }

      return {
        mode: 'reward_branch',
        offer,
        entry: pathNodes[0],
        previewNodes: pathNodes.slice(0, 3),
        pathNodes
      };
    });
  }

  getTeleportTarget(fromIndex: number, range: number) {
    this.ensureAhead(fromIndex + range + 60);
    const candidate = Math.min(this.nodes.length - 5, fromIndex + range);
    return validateTeleportTarget(this.nodes, fromIndex, candidate) ? candidate : -1;
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

    let appended = 0;
    while (appended < minimumNodes) {
      const pattern = selectPattern(this.nodes.length, () => this.nextRandom(), this.recentPatternIds);
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
    const previous = this.nodes[this.nodes.length - 1]!;
    const score = previous.index;
    const profile = getDifficultyProfile(score);
    const scale = profile.spacing / 11.5;
    const rawCandidates = pattern.nodes.map((template, offset) => {
      const index = previous.index + offset + 1;
      const eventType = this.resolveEventType(index, score, template);
      return this.buildTemplateNode(previous, index, template, pattern, scale, score, eventType);
    });
    const candidates = this.densifyPattern(previous, rawCandidates, score);

    if (validatePatternPlacement(candidates, this.nodes)) {
      return candidates;
    }

    if (validatePatternPlacement(rawCandidates, this.nodes)) {
      return rawCandidates;
    }

    return this.buildFallbackPattern(previous);
  }

  private buildTemplateNode(
    previous: GamePathNode,
    index: number,
    template: GamePatternNodeTemplate,
    pattern: GamePathPattern,
    scale: number,
    score: number,
    eventType: GameEventType
  ) {
    const isMilestone = isUpgradeMilestone(index);
    const isGigantic = isMilestone;
    const shapeKind = this.pickShapeKind(pattern.allowedShapeKinds, score);
    const sizeTier = isGigantic ? 'massive' : template.sizeTier ?? this.pickSizeTier(pattern.allowedShardSizes, score);
    const sizeConfig = SIZE_TIER_CONFIG[sizeTier];
    const gameplayRadius = isGigantic ? 10.4 + this.nextRandom() * 1.2 : sizeConfig.radius[0] + this.nextRandom() * (sizeConfig.radius[1] - sizeConfig.radius[0]);
    const visualScale = isGigantic ? 28 + this.nextRandom() * 8 : sizeConfig.visual[0] + this.nextRandom() * (sizeConfig.visual[1] - sizeConfig.visual[0]);
    const gameplayOrbitPeriod = isGigantic ? 10 : sizeConfig.orbitPeriod[0] + this.nextRandom() * (sizeConfig.orbitPeriod[1] - sizeConfig.orbitPeriod[0]);
    const x = previous.x + template.x * scale;
    const rawY = previous.y + template.y * scale * 1.14;
    const y = this.alignToLane(rawY, score, sizeTier, false);
    const direction = this.directionFrom(previous.x, previous.y, x, y);
    const motionPattern = isGigantic ? 'none' : this.pickMotionPattern(template.motionPattern, score, shapeKind);
    const spinDirection: GameShardSpinDirection = this.nextRandom() < 0.5 ? 'cw' : 'ccw';
    const spinSpeed = shapeKind === 'round' ? 0.08 + this.nextRandom() * 0.12 : 0.06 + this.nextRandom() * 0.18;
    const visualStretch =
      shapeKind === 'oval'
        ? { x: 1.42 + this.nextRandom() * 0.42, y: 0.74 + this.nextRandom() * 0.16, z: 1 }
        : shapeKind === 'triangular'
          ? { x: 1, y: 1.08 + this.nextRandom() * 0.14, z: 0.84 + this.nextRandom() * 0.1 }
          : { x: 1, y: 1, z: 1 };
    const kind = isMilestone ? 'milestone' : eventType === 'none' ? 'normal' : eventType === 'boss_weak' ? 'boss_weak' : 'event';

    return this.buildNode({
      previous,
      index,
      x,
      y,
      direction,
      sizeTier,
      shapeKind,
      motionPattern,
      spinDirection,
      spinSpeed,
      gameplayRadius,
      visualScale,
      gameplayOrbitPeriod,
      visualStretch,
      kind,
      branchSlot: null,
      offerId: null,
      onboarding: index < 50,
      eventType,
      colorHint: eventType === 'boss' || eventType === 'boss_weak' ? 'danger' : eventType === 'none' ? 'none' : 'accent',
      isMilestone,
      isGigantic,
      coinSlots: this.buildCoinSlots(template, eventType, score),
      enemySlot: this.buildEnemySlot(template, score, eventType)
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
        shapeKind: score >= 100 ? 'triangular' : score >= 50 ? 'oval' : 'round',
        motionPattern: profile.roundMovementUnlocked ? 'vertical' : 'none',
        spinDirection: 'cw',
        spinSpeed: 0.12,
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
            shapeKind: score >= 100 ? 'triangular' : score >= 50 ? 'oval' : 'round',
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
      value: eventType === 'treasure' ? 3 : 1,
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

  private buildEnemySlot(template: GamePatternNodeTemplate, score: number, eventType: GameEventType) {
    const profile = getDifficultyProfile(score);
    if (!profile.enemyUnlocked || eventType === 'shop' || eventType === 'gift') {
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
      rewardCoins: tier === 'elite' ? 2 : 1,
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
    const profile = getDifficultyProfile(score);
    const unlocked = allowed.filter((shape) => {
      if (shape === 'oval' && !profile.ovalUnlocked) return false;
      if (shape === 'triangular' && !profile.triangularUnlocked) return false;
      return true;
    });
    return unlocked[Math.floor(this.nextRandom() * unlocked.length)] ?? 'round';
  }

  private pickMotionPattern(templatePattern: GameShardMotionPattern | undefined, score: number, shape: GameShardShapeKind) {
    const profile = getDifficultyProfile(score);
    if (shape === 'round' && !profile.roundMovementUnlocked) return 'none';
    if (templatePattern && templatePattern !== 'none' && this.nextRandom() < profile.movingShardChance + 0.25) {
      return templatePattern;
    }
    if (this.nextRandom() > profile.movingShardChance) {
      return 'none';
    }
    const patterns: GameShardMotionPattern[] = ['vertical', 'horizontal', 'micro_orbit', 'drift'];
    return patterns[Math.floor(this.nextRandom() * patterns.length)] ?? 'none';
  }

  private resolveEventType(index: number, score: number, template: GamePatternNodeTemplate) {
    if (isUpgradeMilestone(index)) {
      return 'none' as GameEventType;
    }

    if (template.sizeTier === 'massive' && score >= 150) {
      return 'boss_weak' as GameEventType;
    }

    return this.eventSystem.consumePlannedEvent(index, score);
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
