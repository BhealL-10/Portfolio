import { afterEach, describe, expect, it, vi } from 'vitest';
import { pathDistanceToMeters } from './difficultyScaler';
import { GamePathSystem } from './GamePathSystem';
import { getPathLaneSpacing } from './pathLayout';
import { findPlacementConflicts } from './PatternValidator';

function collectNodes(targetMeters: number) {
  const path = new GamePathSystem();
  path.reset();

  const nodes = [];
  for (let index = 0; index < 2200; index += 1) {
    const node = path.getNode(index);
    if (!node) {
      break;
    }
    const distanceMeters = pathDistanceToMeters(node.pathDistance);
    nodes.push({ node, distanceMeters });
    if (distanceMeters > targetMeters + 20) {
      break;
    }
  }

  return nodes;
}

function countSectionNodes(nodes: ReturnType<typeof collectNodes>, startMeters: number, endMeters: number) {
  return nodes.filter(
    ({ node, distanceMeters }) =>
      !node.isMilestone &&
      distanceMeters >= startMeters &&
      distanceMeters < endMeters
  ).length;
}

describe('GamePathSystem structured milestones', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('places milestones exactly at 10m, 110m, 210m, 310m, and 410m with no duplicates', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3141592653589793);

    const milestones = collectNodes(420)
      .filter(({ node }) => node.isMilestone)
      .filter(({ distanceMeters }) => distanceMeters <= 420.5)
      .map(({ distanceMeters }) => Math.round(distanceMeters));

    expect(milestones).toEqual([10, 110, 210, 310, 410]);
    expect(new Set(milestones).size).toBe(milestones.length);
  });

  it('always begins with a dense intro section before the first milestone', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2718281828459045);

    const nodes = collectNodes(40);
    const firstMilestone = nodes.find(({ node }) => node.isMilestone);
    const introNodes = nodes.filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 0 && distanceMeters < 10);

    expect(firstMilestone?.distanceMeters).toBeCloseTo(10, 5);
    expect(introNodes.length).toBeGreaterThanOrEqual(8);
  });

  it('keeps the final pre-milestone pocket clear for structural milestone placement', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.4444444444444444);

    const nodes = collectNodes(130);
    const introMilestoneZone = nodes.filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 7.8 && distanceMeters < 10);
    const mainMilestoneZone = nodes.filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 107.8 && distanceMeters < 110);

    expect(introMilestoneZone).toHaveLength(0);
    expect(mainMilestoneZone).toHaveLength(0);
  });

  it('uses upper and lower bands instead of collapsing into a single middle row', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1357913579135791);

    const laneSpacing = getPathLaneSpacing(0);
    const nodes = collectNodes(140)
      .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 0 && distanceMeters < 110)
      .map(({ node }) => node.y);

    expect(Math.max(...nodes)).toBeGreaterThan(laneSpacing * 2);
    expect(Math.min(...nodes)).toBeLessThan(-laneSpacing * 2);
  });

  it('keeps the first three 100m blocks denser than later blocks', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.6180339887498948);

    const nodes = collectNodes(430);
    const firstBlock = countSectionNodes(nodes, 10, 110);
    const secondBlock = countSectionNodes(nodes, 110, 210);
    const thirdBlock = countSectionNodes(nodes, 210, 310);
    const fourthBlock = countSectionNodes(nodes, 310, 410);

    expect(firstBlock).toBeGreaterThanOrEqual(14);
    expect(secondBlock).toBeGreaterThanOrEqual(14);
    expect(thirdBlock).toBeGreaterThanOrEqual(14);
    expect((firstBlock + secondBlock + thirdBlock) / 3).toBeGreaterThan(fourthBlock);
  });

  it('makes moving shards common across the intro and early 100m blocks', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5772156649015329);

    const movingNodes = collectNodes(320).filter(({ node }) => node.motionPattern !== 'none');
    expect(movingNodes.length).toBeGreaterThanOrEqual(12);
  });

  it('keeps dense intro and early main blocks free of shard overlaps and milestone intrusions', () => {
    const seeds = [
      0.1111111111111111,
      0.24681357924681357,
      0.3333333333333333,
      0.5555555555555556,
      0.7777777777777778
    ];

    seeds.forEach((seed) => {
      vi.spyOn(Math, 'random').mockReturnValue(seed);
      const nodes = collectNodes(240)
        .filter(({ distanceMeters }) => distanceMeters <= 220)
        .map(({ node }) => node);
      const conflicts = findPlacementConflicts(nodes);
      expect(conflicts, `seed ${seed}`).toHaveLength(0);
      vi.restoreAllMocks();
    });
  });

  it('keeps moving shard motion corridors inside valid free space', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9090909090909091);

    const nodes = collectNodes(240)
      .filter(({ distanceMeters }) => distanceMeters <= 220)
      .map(({ node }) => node);
    const motionConflicts = findPlacementConflicts(nodes).filter((conflict) => conflict.type === 'motion_corridor');

    expect(motionConflicts).toHaveLength(0);
  });
});
