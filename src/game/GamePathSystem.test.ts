import { afterEach, describe, expect, it, vi } from 'vitest';
import { pathDistanceToMeters } from './difficultyScaler';
import { GamePathSystem } from './GamePathSystem';
import { getPathLaneSpacing, getPathLaneTargets } from './pathLayout';
import { findPlacementConflicts } from './PathPlacement';
import { buildUpgradeOffers, createRunUpgradeState } from './roguelite';

function buildPath(seed = 0.3141592653589793) {
  vi.spyOn(Math, 'random').mockReturnValue(seed);

  const path = new GamePathSystem();
  path.reset();
  return path;
}

function collectNodes(targetMeters: number, seed = 0.3141592653589793) {
  const path = buildPath(seed);

  const nodes = [];
  for (let index = 0; index < 2600; index += 1) {
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

function collectSignature(seed: number, targetMeters: number) {
  return collectNodes(targetMeters, seed)
    .slice(0, 80)
    .map(({ node, distanceMeters }) => [
      Math.round(distanceMeters * 100) / 100,
      Math.round(node.y * 100) / 100,
      node.sizeTier,
      node.shapeKind,
      node.motionPattern,
      node.eventType
    ]);
}

function countSectionNodes(nodes: ReturnType<typeof collectNodes>, startMeters: number, endMeters: number) {
  return nodes.filter(
    ({ node, distanceMeters }) =>
      !node.isMilestone &&
      distanceMeters >= startMeters &&
      distanceMeters < endMeters
  ).length;
}

function getNodeLane(node: ReturnType<typeof collectNodes>[number]['node']) {
  const targets = getPathLaneTargets(node.index);
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  targets.forEach((targetY, index) => {
    const distance = Math.abs(node.y - targetY);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function countUsedLanes(nodes: ReturnType<typeof collectNodes>, startMeters: number, endMeters: number) {
  return new Set(
    nodes
      .filter(
        ({ node, distanceMeters }) =>
          !node.isMilestone &&
          distanceMeters >= startMeters &&
          distanceMeters < endMeters
      )
      .map(({ node }) => getNodeLane(node))
  ).size;
}

describe('GamePathSystem block generation', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('places milestones exactly at 10m, 110m, 210m, 310m, and 410m with no duplicates', () => {
    const milestones = collectNodes(420)
      .filter(({ node }) => node.isMilestone)
      .filter(({ distanceMeters }) => distanceMeters <= 420.5)
      .map(({ distanceMeters }) => Math.round(distanceMeters));

    expect(milestones).toEqual([10, 110, 210, 310, 410]);
    expect(new Set(milestones).size).toBe(milestones.length);
  });

  it('always begins with a very dense intro block before the first milestone', () => {
    const nodes = collectNodes(40, 0.2718281828459045);
    const firstMilestone = nodes.find(({ node }) => node.isMilestone);
    const introNodes = nodes.filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 0 && distanceMeters < 10);

    expect(firstMilestone?.distanceMeters).toBeCloseTo(10, 5);
    expect(introNodes.length).toBeGreaterThanOrEqual(10);
  });

  it('places a guaranteed shop exactly 50m inside every main 100m block', () => {
    const shops = collectNodes(420, 0.1618033988749895)
      .filter(({ node }) => node.eventType === 'shop')
      .map(({ distanceMeters }) => Math.round(distanceMeters));

    expect(shops).toContain(60);
    expect(shops).toContain(160);
    expect(shops).toContain(260);
    expect(shops).toContain(360);
    expect(shops.filter((distance) => distance === 60)).toHaveLength(1);
    expect(shops.filter((distance) => distance === 160)).toHaveLength(1);
    expect(shops.filter((distance) => distance === 260)).toHaveLength(1);
    expect(shops.filter((distance) => distance === 360)).toHaveLength(1);
  });

  it('keeps the final pre-milestone pocket clear and reserves post-milestone reward space structurally', () => {
    const nodes = collectNodes(240, 0.4444444444444444);
    const introMilestoneZone = nodes.filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 7.8 && distanceMeters < 10);
    const mainMilestoneZone = nodes.filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 107.8 && distanceMeters < 110);
    const firstRewardCorridor = nodes.filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 10.5 && distanceMeters < 16.9);
    const secondRewardCorridor = nodes.filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 110.5 && distanceMeters < 116.9);
    const lastBefore110 = nodes
      .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters < 110)
      .at(-1);
    const firstAfter110 = nodes.find(({ node, distanceMeters }) => !node.isMilestone && !node.milestoneOwned && distanceMeters > 110);

    expect(introMilestoneZone).toHaveLength(0);
    expect(mainMilestoneZone).toHaveLength(0);
    expect(firstRewardCorridor.length).toBeGreaterThanOrEqual(4);
    expect(secondRewardCorridor.length).toBeGreaterThanOrEqual(4);
    expect(firstRewardCorridor.every(({ node }) => node.milestoneOwned)).toBe(true);
    expect(secondRewardCorridor.every(({ node }) => node.milestoneOwned)).toBe(true);
    expect(lastBefore110?.distanceMeters ?? 0).toBeGreaterThan(103);
    expect(firstAfter110?.distanceMeters ?? 0).toBeGreaterThan(116.9);
    expect(firstAfter110?.distanceMeters ?? 999).toBeLessThan(119.5);
  });

  it('uses much more of the 10-lane field instead of collapsing into a single middle row', () => {
    const laneSpacing = getPathLaneSpacing(0);
    const allNodes = collectNodes(520, 0.1357913579135791);
    const nodes = allNodes
      .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 0 && distanceMeters < 110)
      .map(({ node }) => node.y);

    expect(Math.max(...nodes)).toBeGreaterThan(laneSpacing * 2);
    expect(Math.min(...nodes)).toBeLessThan(-laneSpacing * 2);
    expect(countUsedLanes(allNodes, 0, 110)).toBeGreaterThanOrEqual(8);
    expect(countUsedLanes(allNodes, 110, 210)).toBeGreaterThanOrEqual(5);
    expect(countUsedLanes(allNodes, 210, 310)).toBeGreaterThanOrEqual(4);
    expect(countUsedLanes(allNodes, 310, 410)).toBeGreaterThanOrEqual(3);
    expect(countUsedLanes(allNodes, 410, 510)).toBeGreaterThanOrEqual(2);
  });

  it('starts extremely dense and then tapers block density gradually toward 500m+', () => {
    const nodes = collectNodes(840, 0.6180339887498948);
    const blockCounts = [
      countSectionNodes(nodes, 10, 110),
      countSectionNodes(nodes, 110, 210),
      countSectionNodes(nodes, 210, 310),
      countSectionNodes(nodes, 310, 410),
      countSectionNodes(nodes, 410, 510),
      countSectionNodes(nodes, 510, 610),
      countSectionNodes(nodes, 610, 710),
      countSectionNodes(nodes, 710, 810)
    ];

    expect(blockCounts[0]).toBeGreaterThanOrEqual(64);
    expect(blockCounts[1]).toBeGreaterThanOrEqual(52);
    expect(blockCounts[2]).toBeGreaterThanOrEqual(42);
    expect(blockCounts[3]).toBeGreaterThanOrEqual(32);
    expect(blockCounts[4]).toBeGreaterThanOrEqual(24);
    expect(blockCounts[0]).toBeGreaterThan(blockCounts[1]);
    expect(blockCounts[1]).toBeGreaterThan(blockCounts[2]);
    expect(blockCounts[2]).toBeGreaterThan(blockCounts[3]);
    expect(blockCounts[3]).toBeGreaterThan(blockCounts[4]);
    blockCounts.forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(14);
    });
  });

  it('makes moving shards common and gives them longer travel than before', () => {
    const movingNodes = collectNodes(320, 0.5772156649015329).filter(({ node }) => node.motionPattern !== 'none');
    expect(movingNodes.length).toBeGreaterThanOrEqual(12);
    expect(Math.max(...movingNodes.map(({ node }) => node.motionDistance ?? 0))).toBeGreaterThan(getPathLaneSpacing(0));
  });

  it('keeps reward branch geometry inside the reserved structural corridor instead of pushing later nodes around it', () => {
    const seed = 0.4514514514514514;
    const path = buildPath(seed);
    path.prebuild(180);

    const milestone = Array.from({ length: 40 }, (_, index) => path.getNode(index))
      .find((node) => node?.isMilestone && Math.round(pathDistanceToMeters(node.pathDistance)) === 10);
    const firstMainNode = Array.from({ length: 80 }, (_, offset) => path.getNode(offset + 1))
      .find((node) => node && !node.isMilestone && !node.milestoneOwned && pathDistanceToMeters(node.pathDistance) > 10);

    expect(milestone).toBeTruthy();
    expect(firstMainNode).toBeTruthy();

    const offers = buildUpgradeOffers(Math.max(100, milestone!.index), createRunUpgradeState(), path.getSeededRng(), 3);
    const branches = path.createUpgradeBranches(milestone!.index, offers, milestone!.index);
    const furthestBranchMeters = Math.max(
      ...branches.flatMap((branch) => branch.pathNodes.map((node) => pathDistanceToMeters(node.pathDistance)))
    );

    expect(branches).toHaveLength(3);
    expect(furthestBranchMeters).toBeLessThan(pathDistanceToMeters(firstMainNode!.pathDistance));
  });

  it('stays deterministic for the same seed and changes layout when the seed changes', () => {
    expect(collectSignature(0.24681357924681357, 260)).toEqual(collectSignature(0.24681357924681357, 260));
    expect(collectSignature(0.24681357924681357, 260)).not.toEqual(collectSignature(0.6543210987654321, 260));
  });

  it('keeps generated intro and main blocks free of overlaps and milestone intrusions across seeds', () => {
    const seeds = [
      0.1111111111111111,
      0.24681357924681357,
      0.3333333333333333,
      0.5555555555555556,
      0.7777777777777778
    ];

    seeds.forEach((seed) => {
      const nodes = collectNodes(640, seed)
        .filter(({ distanceMeters }) => distanceMeters <= 620)
        .map(({ node }) => node);
      const conflicts = findPlacementConflicts(nodes);
      expect(conflicts, `seed ${seed}`).toHaveLength(0);
      vi.restoreAllMocks();
    });
  });

  it('keeps moving shard motion corridors inside valid free space', () => {
    const nodes = collectNodes(420, 0.9090909090909091)
      .filter(({ distanceMeters }) => distanceMeters <= 410)
      .map(({ node }) => node);
    const motionConflicts = findPlacementConflicts(nodes).filter((conflict) => conflict.type === 'motion_corridor');

    expect(motionConflicts).toHaveLength(0);
  });
});
