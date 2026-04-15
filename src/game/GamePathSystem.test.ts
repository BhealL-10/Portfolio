import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_COLUMN_DISTANCE, pathDistanceToMeters } from './difficultyScaler';
import { GamePathSystem } from './GamePathSystem';
import { getPathLaneSpacing, getPathLaneTargets, getPathLaneVerticalOffset } from './pathLayout';
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

function countFormationWindows(
  nodes: ReturnType<typeof collectNodes>,
  startMeters: number,
  endMeters: number,
  windowWidthMeters = 0.6,
  minimumNodes = 2
) {
  const filtered = nodes
    .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters >= startMeters && distanceMeters < endMeters)
    .sort((left, right) => left.distanceMeters - right.distanceMeters);
  let count = 0;
  let index = 0;

  while (index < filtered.length) {
    const start = filtered[index]!.distanceMeters;
    const window = filtered.filter(({ distanceMeters }) => distanceMeters >= start && distanceMeters <= start + windowWidthMeters);
    if (window.length >= minimumNodes) {
      count += 1;
      index += window.length;
      continue;
    }
    index += 1;
  }

  return count;
}

function countMixedSizeFormationWindows(
  nodes: ReturnType<typeof collectNodes>,
  startMeters: number,
  endMeters: number,
  windowWidthMeters = 0.6
) {
  const filtered = nodes
    .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters >= startMeters && distanceMeters < endMeters)
    .sort((left, right) => left.distanceMeters - right.distanceMeters);
  let count = 0;
  let index = 0;

  while (index < filtered.length) {
    const start = filtered[index]!.distanceMeters;
    const window = filtered.filter(({ distanceMeters }) => distanceMeters >= start && distanceMeters <= start + windowWidthMeters);
    if (window.length >= 2 && new Set(window.map(({ node }) => node.sizeTier)).size >= 2) {
      count += 1;
      index += window.length;
      continue;
    }
    index += 1;
  }

  return count;
}

function countSharedColumnGroups(
  nodes: ReturnType<typeof collectNodes>,
  startMeters: number,
  endMeters: number,
  minimumNodes = 2
) {
  const filtered = nodes
    .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters >= startMeters && distanceMeters < endMeters)
    .map(({ node }) => node);
  const groups = new Map<string, number>();

  filtered.forEach((node) => {
    const key = node.x.toFixed(4);
    groups.set(key, (groups.get(key) ?? 0) + 1);
  });

  return Array.from(groups.values()).filter((count) => count >= minimumNodes).length;
}

function getMaximumForwardGap(
  nodes: ReturnType<typeof collectNodes>,
  startMeters: number,
  endMeters: number
) {
  const filtered = nodes
    .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters >= startMeters && distanceMeters < endMeters)
    .sort((left, right) => left.distanceMeters - right.distanceMeters);

  let maximumGap = 0;
  for (let index = 1; index < filtered.length; index += 1) {
    maximumGap = Math.max(maximumGap, filtered[index]!.distanceMeters - filtered[index - 1]!.distanceMeters);
  }

  return maximumGap;
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

  it('keeps intro, milestone, and reward anchors in the same raised vertical field', () => {
    const path = buildPath(0.20202020202020202);
    path.prebuild(180);

    const startNode = path.getNode(0)!;
    const milestone = Array.from({ length: 40 }, (_, index) => path.getNode(index))
      .find((node) => node?.isMilestone && Math.round(pathDistanceToMeters(node.pathDistance)) === 10)!;
    const rewardTrio = [1, 2, 3].map((offset) => path.getNode(milestone.index + offset)!);

    expect(startNode.y).toBeCloseTo(getPathLaneVerticalOffset(0), 4);
    expect(milestone.y).toBeCloseTo(getPathLaneVerticalOffset(10), 4);
    expect(Math.max(...rewardTrio.map((node) => node.y))).toBeGreaterThan(getPathLaneVerticalOffset(10) + 6);
    expect(Math.min(...rewardTrio.map((node) => node.y))).toBeLessThan(getPathLaneVerticalOffset(10));
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
    expect(firstAfter110?.distanceMeters ?? 0).toBeGreaterThan(119.2);
    expect(firstAfter110?.distanceMeters ?? 999).toBeLessThan(120.6);
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

  it('pushes the shard field higher and uses the upper playable space aggressively', () => {
    const nodes = collectNodes(240, 0.98989898989899)
      .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters >= 10 && distanceMeters < 210)
      .map(({ node }) => node.y);

    const averageY = nodes.reduce((sum, y) => sum + y, 0) / Math.max(1, nodes.length);
    const highNodes = nodes.filter((y) => y >= 18);

    expect(Math.max(...nodes)).toBeGreaterThan(29.5);
    expect(highNodes.length).toBeGreaterThanOrEqual(22);
    expect(averageY).toBeGreaterThan(1.5);
  });

  it('starts extremely dense and then trends lighter over distance without collapsing into gaps', () => {
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

    expect(blockCounts[0]).toBeGreaterThanOrEqual(82);
    expect(blockCounts[1]).toBeGreaterThanOrEqual(68);
    expect(blockCounts[2]).toBeGreaterThanOrEqual(52);
    expect(blockCounts[3]).toBeGreaterThanOrEqual(36);
    expect(blockCounts[4]).toBeGreaterThanOrEqual(28);
    expect(blockCounts[0]).toBeGreaterThan(blockCounts[3]);
    expect(Math.max(blockCounts[1], blockCounts[2])).toBeGreaterThan(blockCounts[3]);
    expect(blockCounts[3]).toBeGreaterThan(blockCounts[4]);
    expect(blockCounts[4]).toBeGreaterThan(blockCounts[6]);
    blockCounts.forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(14);
    });
  });

  it('builds clustered local formations instead of a single one-node-per-slice route', () => {
    const nodes = collectNodes(240, 0.42424242424242425);

    expect(countFormationWindows(nodes, 10, 110)).toBeGreaterThanOrEqual(13);
    expect(countFormationWindows(nodes, 110, 210)).toBeGreaterThanOrEqual(9);
    expect(countFormationWindows(nodes, 10, 110, 2.2, 3)).toBeGreaterThanOrEqual(8);
    expect(countFormationWindows(nodes, 110, 210, 2.2, 3)).toBeGreaterThanOrEqual(5);
    expect(countMixedSizeFormationWindows(nodes, 10, 110)).toBeGreaterThanOrEqual(7);
  });

  it('keeps forward gaps capped so the path stays populated beyond 50m and 60m', () => {
    const nodes = collectNodes(420, 0.7878787878787878);

    expect(getMaximumForwardGap(nodes, 20, 100)).toBeLessThanOrEqual(1.85);
    expect(getMaximumForwardGap(nodes, 120, 200)).toBeLessThanOrEqual(1.9);
    expect(getMaximumForwardGap(nodes, 220, 300)).toBeLessThanOrEqual(2.1);
  });

  it('allows true same-x vertical columns in the early dense grid', () => {
    const nodes = collectNodes(180, 0.37373737373737376);

    expect(countSharedColumnGroups(nodes, 10, 110, 2)).toBeGreaterThanOrEqual(12);
    expect(countSharedColumnGroups(nodes, 10, 110, 3)).toBeGreaterThanOrEqual(3);
  });

  it('keeps the intro field lifted so the first 10m no longer sits below the main field', () => {
    const nodes = collectNodes(160, 0.7070707070707071);
    const introYs = nodes
      .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters > 0 && distanceMeters < 10)
      .map(({ node }) => node.y);
    const mainYs = nodes
      .filter(({ node, distanceMeters }) => !node.isMilestone && distanceMeters >= 10 && distanceMeters < 110)
      .map(({ node }) => node.y);

    const introAverage = introYs.reduce((sum, y) => sum + y, 0) / Math.max(1, introYs.length);
    const mainAverage = mainYs.reduce((sum, y) => sum + y, 0) / Math.max(1, mainYs.length);

    expect(introAverage).toBeGreaterThan(mainAverage - 0.35);
    expect(Math.max(...introYs)).toBeGreaterThan(31);
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

  it('keeps the reward trio in place and converts those same nodes back to normal shards after resolution', () => {
    const seed = 0.6161616161616161;
    const path = buildPath(seed);
    path.prebuild(180);

    const milestone = Array.from({ length: 40 }, (_, index) => path.getNode(index))
      .find((node) => node?.isMilestone && Math.round(pathDistanceToMeters(node.pathDistance)) === 10);
    expect(milestone).toBeTruthy();

    const offers = buildUpgradeOffers(Math.max(100, milestone!.index), createRunUpgradeState(), path.getSeededRng(), 3);
    const trioBefore = [1, 2, 3].map((offset) => path.getNode(milestone!.index + offset)!);
    const branches = path.createUpgradeBranches(milestone!.index, offers, milestone!.index);
    path.activateMilestoneRewardChoices(milestone!.index, offers);
    const trioDuring = [1, 2, 3].map((offset) => path.getNode(milestone!.index + offset)!);

    expect(branches.map((branch) => branch.entry.index)).toEqual(trioBefore.map((node) => node.index));
    expect(trioDuring.every((node) => node.colorHint === 'reward' && node.kind === 'branch')).toBe(true);
    expect(new Set(trioBefore.map((node) => node.x.toFixed(5)))).toHaveLength(1);
    expect(trioBefore.every((node) => node.shapeKind === 'round')).toBe(true);
    expect(new Set(trioBefore.map((node) => node.sizeTier))).toEqual(new Set(['medium_large']));
    expect(
      Math.abs(trioBefore.reduce((sum, node) => sum + node.y, 0) / trioBefore.length - milestone!.y)
    ).toBeLessThan(getPathLaneSpacing(milestone!.index));
    expect(trioDuring.map((node) => [node.x, node.y, node.shapeKind, node.sizeTier])).toEqual(
      trioBefore.map((node) => [node.x, node.y, node.shapeKind, node.sizeTier])
    );

    path.settleMilestoneRewardChoices(milestone!.index);
    const trioAfter = [1, 2, 3].map((offset) => path.getNode(milestone!.index + offset)!);

    expect(trioAfter.every((node) => node.colorHint === 'none' && node.kind === 'normal')).toBe(true);
    expect(trioAfter.map((node) => [node.x, node.y, node.shapeKind, node.sizeTier])).toEqual(
      trioBefore.map((node) => [node.x, node.y, node.shapeKind, node.sizeTier])
    );
  });

  it('builds a guaranteed sprintFish landing cluster with multiple landing options and forward continuation', () => {
    const path = buildPath(0.8080808080808081);
    path.prebuild(240);

    const anchorIndex = 18;
    const anchor = path.getNode(anchorIndex)!;
    const landingIndex = path.ensureSprintFishLandingPath(
      anchorIndex,
      anchor.x + DEFAULT_COLUMN_DISTANCE * 5.2,
      18.4
    );
    const landingCluster = [0, 1, 2].map((offset) => path.getNode(landingIndex + offset)!);
    const exitNodes = [3, 4].map((offset) => path.getNode(landingIndex + offset)!);

    expect(new Set(landingCluster.map((node) => node.x.toFixed(5)))).toHaveLength(1);
    expect(landingCluster.every((node) => node.shapeKind === 'round' && !node.isMilestone)).toBe(true);
    expect(exitNodes.every((node) => node.x > landingCluster[0]!.x)).toBe(true);
    expect(exitNodes[1]!.x).toBeGreaterThan(exitNodes[0]!.x);
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
