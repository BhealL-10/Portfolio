import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_COLUMN_DISTANCE, pathDistanceToMeters } from './difficultyScaler';
import { GamePathSystem } from './GamePathSystem';

function collectMilestoneMeters(targetMeters: number) {
  const path = new GamePathSystem();
  path.reset();

  const milestones: number[] = [];
  for (let index = 0; index < 1600; index += 1) {
    const node = path.getNode(index);
    if (!node) {
      break;
    }
    const distanceMeters = pathDistanceToMeters(node.pathDistance);
    if (distanceMeters > targetMeters + 24) {
      break;
    }
    if (!node?.isMilestone) {
      continue;
    }
    milestones.push(Math.round(distanceMeters));
  }

  return milestones;
}

describe('GamePathSystem milestones', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('inserts exactly one milestone for each reserved distance slot', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3141592653589793);

    const milestones = collectMilestoneMeters(220);
    expect(milestones.filter((distance) => distance === 10)).toHaveLength(1);
    expect(milestones.filter((distance) => distance === 100)).toHaveLength(1);
    expect(milestones.filter((distance) => distance === 200)).toHaveLength(1);
    expect(new Set(milestones).size).toBe(milestones.length);
  });

  it('keeps the 10m milestone deterministic across bootstrap seeds', () => {
    for (let seed = 1; seed <= 64; seed += 1) {
      const originalRandom = Math.random;
      vi.spyOn(Math, 'random').mockReturnValue(((seed * 48271) % 0x7fffffff) / 0x7fffffff);

      const milestones = collectMilestoneMeters(320);

      expect(milestones.filter((distance) => distance === 10)).toHaveLength(1);
      expect(milestones.filter((distance) => distance === 100)).toHaveLength(1);
      expect(milestones.filter((distance) => distance === 200)).toHaveLength(1);
      expect(milestones.filter((distance) => distance === 300)).toHaveLength(1);

      vi.restoreAllMocks();
      Math.random = originalRandom;
    }
  });

  it('can reserve a milestone on a segment that crosses 10m', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3141592653589793);

    const path = new GamePathSystem() as any;
    path.reset();
    const previous = path.getNode(0);
    const crossingNode = path.buildNode({
      previous,
      index: 1,
      x: previous.x + DEFAULT_COLUMN_DISTANCE * 10.5,
      y: previous.y,
      direction: 'right',
      sizeTier: 'medium',
      shapeKind: 'round',
      motionPattern: 'none',
      spinDirection: 'cw',
      spinSpeed: 0.1,
      gameplayRadius: 1.6,
      visualScale: 1.8,
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
      reservedMilestoneDistance: null,
      coinSlots: [],
      enemySlot: null
    });
    const reserved = path.reserveMilestones(previous, [crossingNode], 1);
    expect(reserved.some((node: { isMilestone: boolean }) => node.isMilestone)).toBe(true);
  });
});
