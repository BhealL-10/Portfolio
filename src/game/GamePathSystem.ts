import { clamp } from '../core/math';
import { getDifficultyProfile } from './difficultyScaler';
import { isUpgradeMilestone } from './roguelite';
import type { PathDirection } from './pathTypes';
import type {
  BranchChoice,
  GamePathNode,
  GameShardMotionPattern,
  GameShardShapeKind,
  GameShardSizeTier,
  GameShardSpinDirection,
  ResolvedGamePathNode
} from './gameSessionTypes';
import type { RogueliteItemOffer } from './roguelite';

const DIRECTION_VECTORS: Record<PathDirection, { x: number; y: number }> = {
  right: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  up_left: { x: -0.72, y: 0.72 },
  up_right: { x: 0.72, y: 0.72 },
  down_left: { x: -0.72, y: -0.72 },
  down_right: { x: 0.72, y: -0.72 }
};

const EARLY_PATTERN: PathDirection[] = [
  'up_right',
  'down_right',
  'up',
  'down_right',
  'up_right',
  'up',
  'down_right',
  'up_right',
  'down_right',
  'up',
  'up_right',
  'down_right',
  'up',
  'right'
];

const SIZE_TIER_CONFIG: Array<{ tier: GameShardSizeTier; radius: [number, number]; visual: [number, number] }> = [
  { tier: 'very_tiny', radius: [0.42, 0.56], visual: [0.34, 0.48] },
  { tier: 'tiny', radius: [0.56, 0.74], visual: [0.48, 0.68] },
  { tier: 'small', radius: [0.74, 1.02], visual: [0.68, 0.96] },
  { tier: 'medium_small', radius: [1.02, 1.38], visual: [0.96, 1.28] },
  { tier: 'medium', radius: [1.38, 1.82], visual: [1.28, 1.78] },
  { tier: 'medium_large', radius: [1.82, 2.4], visual: [1.78, 2.46] },
  { tier: 'large', radius: [2.4, 3.08], visual: [2.46, 3.3] },
  { tier: 'very_large', radius: [3.08, 3.92], visual: [3.3, 4.5] },
  { tier: 'huge', radius: [3.92, 4.9], visual: [4.5, 6.2] },
  { tier: 'massive', radius: [4.9, 6.1], visual: [6.2, 8.8] }
];

export class GamePathSystem {
  private nodes: GamePathNode[] = [];
  private seed = 1;

  reset() {
    this.seed = (Math.random() * 0x7fffffff) | 1;
    this.nodes = [
      {
        index: 0,
        x: -12,
        y: -0.4,
        z: 0,
        radius: 1.55,
        visualScale: 1,
        pathDistance: 0,
        direction: 'right',
        kind: 'normal',
        sizeTier: 'medium',
        shapeKind: 'round',
        spinDirection: 'cw',
        spinSpeed: 0.42,
        motionPattern: 'none',
        branchSlot: null,
        offerId: null,
        onboarding: true,
        motionSeed: this.nextRandom() * Math.PI * 2
        ,
        visualStretch: { x: 1, y: 1, z: 1 }
      }
    ];
  }

  prebuild(initialCount: number) {
    if (this.nodes.length === 0) {
      this.reset();
    }
    this.append(initialCount - this.nodes.length);
  }

  ensureAhead(currentIndex: number, threshold = 50, chunkSize = 120) {
    if (this.nodes.length - currentIndex > threshold) return;
    this.append(chunkSize);
  }

  getInitialNodes(count: number) {
    this.prebuild(count);
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
    return this.nodes.slice(start, start + count).map((node) => this.resolveNode(node.index, elapsedTime, currentIndex));
  }

  getResolvedNode(index: number, elapsedTime: number, currentIndex: number): ResolvedGamePathNode {
    this.ensureAhead(index + 1);
    return this.resolveNode(index, elapsedTime, currentIndex);
  }

  replaceFuture(startIndex: number, nodes: GamePathNode[]) {
    const preserved = this.nodes.slice(0, startIndex + 1);
    const normalized = nodes.map((node, offset) => this.reindexNode(node, startIndex + offset + 1, preserved[preserved.length - 1] ?? null));
    this.nodes = [...preserved, ...normalized];
  }

  createUpgradeBranches(milestoneIndex: number, offers: RogueliteItemOffer[], score: number): BranchChoice[] {
    const milestone = this.getNode(milestoneIndex);
    if (!milestone) return [];

    const fallback = this.getNode(milestoneIndex + 1);
    const nextVector = fallback
      ? this.directionVectorFromPoints(milestone.x, milestone.y, fallback.x, fallback.y)
      : this.getDirectionVector(milestone.direction);
    const forward = this.normalizeVector(nextVector.x, nextVector.y);
    const side = { x: -forward.y, y: forward.x };
    const profile = getDifficultyProfile(score);
    const baseSpacing = profile.spacing * 1.18;

    const branchProfiles = [
      { slot: 0 as const, branchOffset: 6.1, curve: 2.4, yLift: 3.4, preferredTier: 'large' as GameShardSizeTier, fallbackDirection: 'up' as PathDirection },
      { slot: 1 as const, branchOffset: 0, curve: 0.4, yLift: 0.5, preferredTier: 'medium_large' as GameShardSizeTier, fallbackDirection: 'right' as PathDirection },
      { slot: 2 as const, branchOffset: -6.1, curve: -2.4, yLift: -3.4, preferredTier: 'large' as GameShardSizeTier, fallbackDirection: 'down_right' as PathDirection }
    ];

    return offers.slice(0, 3).map((offer, index) => {
      const profileConfig = branchProfiles[index] ?? branchProfiles[1];
      const slot = profileConfig.slot;
      const branchNodes: GamePathNode[] = [];

      for (let step = 0; step < 5; step += 1) {
        const branchRatio = step / 4;
        const forwardDistance = baseSpacing * (1.24 + step * 1.12);
        const sideDistance = profileConfig.branchOffset * (0.92 + branchRatio * 1.35);
        const curve = Math.sin(branchRatio * Math.PI) * profileConfig.curve;
        const heightBias = profileConfig.yLift * (0.82 + branchRatio * 1.08);
        const x = milestone.x + forward.x * forwardDistance + side.x * (sideDistance + curve);
        const y = milestone.y + forward.y * forwardDistance + side.y * (sideDistance + curve) + heightBias;
        const previous = step === 0 ? milestone : branchNodes[step - 1];
        branchNodes.push(this.buildNodeFromPosition({
          previous,
          index: milestoneIndex + step + 1,
          x,
          y,
          direction: this.pickBranchDirection(slot, step, profileConfig.fallbackDirection),
          ...this.sampleShardVisual(step < 2 ? profileConfig.preferredTier : 'large', false),
          kind: 'branch',
          branchSlot: slot,
          offerId: offer.item.id,
          onboarding: false
        }));
      }

      return {
        offer,
        entry: branchNodes[0],
        previewNodes: branchNodes.slice(0, 3),
        pathNodes: branchNodes
      };
    });
  }

  getTeleportTarget(fromIndex: number, range: number) {
    this.ensureAhead(fromIndex + range + 60);
    const candidate = Math.min(this.nodes.length - 5, fromIndex + range);
    if (candidate <= fromIndex) return -1;
    return this.nodes[candidate] ? candidate : -1;
  }

  sampleAtDistance(distance: number) {
    if (this.nodes.length === 0) {
      this.prebuild(2);
    }

    const clampedDistance = Math.max(0, distance);
    let previous = this.nodes[0];
    for (let index = 1; index < this.nodes.length; index += 1) {
      const node = this.nodes[index];
      if (node.pathDistance >= clampedDistance) {
        const segment = Math.max(0.0001, node.pathDistance - previous.pathDistance);
        const t = clamp((clampedDistance - previous.pathDistance) / segment, 0, 1);
        const x = previous.x + (node.x - previous.x) * t;
        const y = previous.y + (node.y - previous.y) * t;
        const tangent = this.normalizeVector(node.x - previous.x, node.y - previous.y);
        return {
          x,
          y,
          z: 0,
          tangent
        };
      }
      previous = node;
    }

    const last = this.nodes[this.nodes.length - 1];
    const before = this.nodes[this.nodes.length - 2] ?? last;
    return {
      x: last.x,
      y: last.y,
      z: 0,
      tangent: this.normalizeVector(last.x - before.x, last.y - before.y)
    };
  }

  private append(count: number) {
    if (count <= 0) return;

    while (count > 0) {
      const next = this.buildCandidate();
      this.nodes.push(next);
      count -= 1;
    }
  }

  private buildCandidate(): GamePathNode {
    const previous = this.nodes[this.nodes.length - 1]!;
    const nextIndex = previous.index + 1;
    const profile = getDifficultyProfile(nextIndex);

    for (let attempt = 0; attempt < 28; attempt += 1) {
      const direction = this.pickDirection(previous, nextIndex);
      const vector = this.getDirectionVector(direction);
      const spacing = profile.spacing * (0.74 + this.nextRandom() * 0.74);
      const milestone = isUpgradeMilestone(nextIndex);
      const x = previous.x + vector.x * spacing;
      const y = previous.y + vector.y * spacing + (this.nextRandom() - 0.5) * (nextIndex < 35 ? 2.8 : 4.2);
      const visual = this.sampleShardVisual(undefined, milestone);
      const candidate = this.buildNodeFromPosition({
        previous,
        index: nextIndex,
        x,
        y,
        direction,
        ...visual,
        kind: milestone ? 'milestone' : 'normal',
        branchSlot: null,
        offerId: null,
        onboarding: nextIndex < 50
      });

      if (this.isValidCandidate(candidate)) {
        return candidate;
      }
    }

    return this.buildNodeFromPosition({
      previous,
      index: nextIndex,
      x: previous.x + profile.spacing * 0.96,
      y: previous.y + (previous.y > 4 ? -1 : previous.y < -4 ? 1 : 0.6),
      direction: previous.y > 4 ? 'down_right' : previous.y < -4 ? 'up_right' : 'right',
      ...this.sampleShardVisual('medium', false),
      kind: 'normal',
      branchSlot: null,
      offerId: null,
      onboarding: nextIndex < 50
    });
  }

  private buildNodeFromPosition(config: {
    previous: GamePathNode | null;
    index: number;
    x: number;
    y: number;
    direction: PathDirection;
    radius: number;
    visualScale: number;
    sizeTier: GameShardSizeTier;
    shapeKind: GameShardShapeKind;
    spinDirection: GameShardSpinDirection;
    spinSpeed: number;
    motionPattern: GameShardMotionPattern;
    visualStretch: { x: number; y: number; z: number };
    kind: GamePathNode['kind'];
    branchSlot: number | null;
    offerId: string | null;
    onboarding: boolean;
  }): GamePathNode {
    const previous = config.previous;
    const segmentDistance = previous ? Math.hypot(config.x - previous.x, config.y - previous.y) : 0;
    return {
      index: config.index,
      x: config.x,
      y: config.y,
      z: 0,
      radius: config.radius,
      visualScale: config.visualScale,
      pathDistance: previous ? previous.pathDistance + segmentDistance : 0,
      direction: config.direction,
      kind: config.kind,
      sizeTier: config.sizeTier,
      shapeKind: config.shapeKind,
      spinDirection: config.spinDirection,
      spinSpeed: config.spinSpeed,
      motionPattern: config.motionPattern,
      branchSlot: config.branchSlot,
      offerId: config.offerId,
      onboarding: config.onboarding,
      motionSeed: this.nextRandom() * Math.PI * 2,
      visualStretch: config.visualStretch
    };
  }

  private reindexNode(node: GamePathNode, index: number, previous: GamePathNode | null) {
    return this.buildNodeFromPosition({
      previous,
      index,
      x: node.x,
      y: node.y,
      direction: node.direction,
      radius: node.radius,
      visualScale: node.visualScale,
      sizeTier: node.sizeTier,
      shapeKind: node.shapeKind,
      spinDirection: node.spinDirection,
      spinSpeed: node.spinSpeed,
      motionPattern: node.motionPattern,
      visualStretch: node.visualStretch,
      kind: node.kind,
      branchSlot: node.branchSlot,
      offerId: node.offerId,
      onboarding: false
    });
  }

  private resolveNode(index: number, elapsedTime: number, currentIndex: number): ResolvedGamePathNode {
    const node = this.nodes[index];
    const score = Math.max(index, currentIndex);
    const profile = getDifficultyProfile(score);
    let resolvedX = node.x;
    let resolvedY = node.y;

    if (index > currentIndex + 1 && index >= 2 && node.kind === 'normal') {
      const phase = elapsedTime * (0.42 + profile.normalized * 0.48) + node.motionSeed;
      const amplitude = (0.1 + profile.normalized * 0.42) * (0.85 + node.visualScale * 0.12);
      const pattern = node.motionPattern;

      if (pattern === 'vertical') {
        resolvedY += Math.sin(phase) * amplitude;
      } else if (pattern === 'horizontal') {
        resolvedX += Math.cos(phase * 0.74) * amplitude * 0.42;
        resolvedY += Math.sin(phase * 1.08) * amplitude * 0.3;
      } else if (pattern === 'micro_orbit') {
        resolvedX += Math.sin(phase * 0.52) * amplitude * 0.22;
        resolvedY += Math.cos(phase * 0.9) * amplitude * 0.56;
      } else if (pattern === 'drift') {
        resolvedX += Math.cos(phase * 0.66) * amplitude * 0.36;
        resolvedY += Math.sin(phase * 0.66) * amplitude * 0.36;
      }
    }

    return {
      ...node,
      resolvedX,
      resolvedY,
      resolvedZ: node.z
    };
  }

  private isValidCandidate(candidate: GamePathNode) {
    const previous = this.nodes[this.nodes.length - 1];
    const beforePrevious = this.nodes[this.nodes.length - 2];
    if (!previous) return true;

    const profile = getDifficultyProfile(candidate.index);
    const dx = candidate.x - previous.x;
    const dy = candidate.y - previous.y;
    const distance = Math.hypot(dx, dy);
    const minimumDistance = Math.max(9.4, previous.radius + candidate.radius + 3.8);
    if (distance < minimumDistance || distance > profile.maxJumpDistance * 0.95) {
      return false;
    }

    if (Math.abs(dy) > profile.maxVerticalDelta) {
      return false;
    }

    if (Math.abs(candidate.y) > 22) {
      return false;
    }

    const recentNodes = this.nodes.slice(Math.max(0, this.nodes.length - 8));
    for (const node of recentNodes) {
      const recentDistance = Math.hypot(candidate.x - node.x, candidate.y - node.y);
      if (recentDistance < candidate.radius + node.radius + 3.4) {
        return false;
      }
    }

    if (beforePrevious) {
      const prevDX = previous.x - beforePrevious.x;
      const prevDY = previous.y - beforePrevious.y;
      const prevLength = Math.hypot(prevDX, prevDY);
      if (prevLength > 0.001) {
        const dot = (prevDX * dx + prevDY * dy) / (prevLength * distance);
        if (dot < -0.48) {
          return false;
        }
      }
    }

    return true;
  }

  private sampleShardVisual(preferredTier?: GameShardSizeTier, milestone = false) {
    if (milestone) {
      return {
        radius: 5.6 + this.nextRandom() * 0.8,
        visualScale: 34 + this.nextRandom() * 4.8,
        sizeTier: 'massive' as GameShardSizeTier,
        shapeKind: 'round' as GameShardShapeKind,
        spinDirection: 'cw' as GameShardSpinDirection,
        spinSpeed: 0.08 + this.nextRandom() * 0.04,
        motionPattern: 'none' as GameShardMotionPattern,
        visualStretch: { x: 1.14, y: 1.14, z: 1.14 }
      };
    }

    const config =
      preferredTier
        ? SIZE_TIER_CONFIG.find((entry) => entry.tier === preferredTier) ?? SIZE_TIER_CONFIG[4]
        : SIZE_TIER_CONFIG[Math.floor(this.nextRandom() * SIZE_TIER_CONFIG.length)] ?? SIZE_TIER_CONFIG[4];
    const shapeRoll = this.nextRandom();
    const shapeKind: GameShardShapeKind = shapeRoll < 0.42 ? 'round' : shapeRoll < 0.74 ? 'oval' : 'triangular';
    const spinDirection: GameShardSpinDirection = this.nextRandom() < 0.5 ? 'cw' : 'ccw';
    const motionPatterns: GameShardMotionPattern[] = ['none', 'vertical', 'horizontal', 'micro_orbit', 'drift'];
    const motionPattern = motionPatterns[Math.floor(this.nextRandom() * motionPatterns.length)] ?? 'none';
    const radius = config.radius[0] + this.nextRandom() * (config.radius[1] - config.radius[0]);
    const visualScale = config.visual[0] + this.nextRandom() * (config.visual[1] - config.visual[0]);
    const stretch =
      shapeKind === 'oval'
        ? { x: 1.35 + this.nextRandom() * 0.35, y: 0.78 + this.nextRandom() * 0.18, z: 1 }
        : shapeKind === 'triangular'
          ? { x: 1, y: 1.12 + this.nextRandom() * 0.18, z: 0.82 + this.nextRandom() * 0.12 }
          : { x: 1, y: 1, z: 1 };

    return {
      radius,
      visualScale,
      sizeTier: config.tier,
      shapeKind,
      spinDirection,
      spinSpeed: 0.18 + this.nextRandom() * 0.42,
      motionPattern,
      visualStretch: stretch
    };
  }

  private pickDirection(previous: GamePathNode, nextIndex: number): PathDirection {
    if (nextIndex < 18) {
      const base = EARLY_PATTERN[nextIndex % EARLY_PATTERN.length] ?? 'right';
      if (base === 'up' && previous.y > 7) return 'down_right';
      if (base === 'down_right' && previous.y < -7) return 'up_right';
      return base;
    }

    const weights: Array<{ direction: PathDirection; weight: number }> = [
      { direction: 'right', weight: 16 },
      { direction: 'up', weight: 13 },
      { direction: 'up_left', weight: nextIndex < 40 ? 4 : 9 },
      { direction: 'up_right', weight: 18 },
      { direction: 'down_left', weight: nextIndex < 40 ? 4 : 9 },
      { direction: 'down_right', weight: 18 }
    ];

    let total = 0;
    const adjusted = weights.map((entry) => {
      let weight = entry.weight;
      if (entry.direction === previous.direction) {
        weight *= 0.82;
      }
      if (previous.y > 8 && (entry.direction === 'up' || entry.direction === 'up_left' || entry.direction === 'up_right')) {
        weight *= 0.34;
      }
      if (previous.y < -8 && (entry.direction === 'down_left' || entry.direction === 'down_right')) {
        weight *= 0.34;
      }
      total += weight;
      return { direction: entry.direction, weight };
    });

    let cursor = this.nextRandom() * total;
    for (const entry of adjusted) {
      cursor -= entry.weight;
      if (cursor <= 0) {
        return entry.direction;
      }
    }

    return adjusted[adjusted.length - 1]?.direction ?? 'right';
  }

  private pickBranchDirection(slot: 0 | 1 | 2, step: number, fallback: PathDirection): PathDirection {
    if (slot === 0) {
      return step < 3 ? 'up_right' : 'up';
    }
    if (slot === 2) {
      return step < 3 ? 'down_right' : 'right';
    }
    return step % 2 === 0 ? 'right' : fallback;
  }

  private getDirectionVector(direction: PathDirection) {
    return DIRECTION_VECTORS[direction];
  }

  private directionVectorFromPoints(x0: number, y0: number, x1: number, y1: number) {
    return this.normalizeVector(x1 - x0, y1 - y0);
  }

  private normalizeVector(x: number, y: number) {
    const length = Math.hypot(x, y) || 1;
    return { x: x / length, y: y / length };
  }

  private nextRandom() {
    this.seed = (this.seed * 48271) % 0x7fffffff;
    return this.seed / 0x7fffffff;
  }
}
