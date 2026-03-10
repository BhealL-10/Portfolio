import { getDifficultyProfile } from './difficultyScaler';
import { isUpgradeMilestone } from './roguelite';
import { validatePathCandidate } from './pathValidator';
import type { PathDirection, PathNode } from './pathTypes';

const directionVectors: Record<PathDirection, { x: number; y: number }> = {
  right: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  up_left: { x: -0.74, y: 0.74 },
  up_right: { x: 0.74, y: 0.74 },
  down_left: { x: -0.74, y: -0.74 },
  down_right: { x: 0.74, y: -0.74 }
};

const onboardingPattern: PathDirection[] = [
  'up_right',
  'down_right',
  'up',
  'up_right',
  'down_right',
  'up',
  'up_right',
  'down_right',
  'up',
  'right',
  'down_right',
  'up_right',
  'up',
  'down_right'
];

export function generatePathNodes(existingNodes: PathNode[], count: number, rng: () => number) {
  const generated: PathNode[] = [];

  while (generated.length < count) {
    const nodes = [...existingNodes, ...generated];
    const previous = nodes[nodes.length - 1];
    if (!previous) break;
    const nextIndex = previous.index + 1;
    const candidate = buildCandidate(nodes, nextIndex, rng);
    generated.push(candidate);
  }

  return generated;
}

function buildCandidate(existingNodes: PathNode[], nextIndex: number, rng: () => number) {
  const previous = existingNodes[existingNodes.length - 1]!;
  const profile = getDifficultyProfile(nextIndex);

  for (let attempt = 0; attempt < 18; attempt += 1) {
    const direction = pickDirection(previous, nextIndex, rng);
    const vector = directionVectors[direction];
    const spacing = profile.spacing * (0.92 + rng() * 0.16);
    const milestone = isUpgradeMilestone(nextIndex);
    const sizeVariance = 0.22 + profile.normalized * 0.45;
    const candidate: PathNode = {
      index: nextIndex,
      x: previous.x + vector.x * spacing,
      y: previous.y + vector.y * spacing,
      z: 0,
      radius: milestone
        ? 7.2 + profile.normalized * 1.9
        : 1.18 + Math.sin(nextIndex * 0.57 + rng()) * sizeVariance,
      direction,
      kind: milestone ? 'milestone' : 'normal',
      branchSlot: null,
      offerId: null,
      onboarding: nextIndex < 50,
      motionSeed: rng() * Math.PI * 2
    };

    if (validatePathCandidate(candidate, existingNodes)) {
      return candidate;
    }
  }

  return buildFallbackCandidate(previous, nextIndex, rng);
}

function buildFallbackCandidate(previous: PathNode, nextIndex: number, rng: () => number): PathNode {
  const profile = getDifficultyProfile(nextIndex);
  const direction: PathDirection =
    previous.y > 8 ? 'down_right' : previous.y < -8 ? 'up_right' : 'right';
  const vector = directionVectors[direction];
  const spacing = profile.spacing * 0.9;

  return {
    index: nextIndex,
    x: previous.x + vector.x * spacing,
    y: previous.y + vector.y * spacing,
    z: 0,
    radius: 1.42 + Math.sin(nextIndex * 0.48) * 0.06,
    direction,
    kind: 'normal',
    branchSlot: null,
    offerId: null,
    onboarding: nextIndex < 50,
    motionSeed: rng() * Math.PI * 2
  };
}

function pickDirection(previous: PathNode, nextIndex: number, rng: () => number): PathDirection {
  if (nextIndex < 50) {
    const base = onboardingPattern[nextIndex % onboardingPattern.length] ?? 'right';
    if (base === 'up' && previous.y > 7) return 'right';
    if (base === 'down_right' && previous.y < -7) return 'right';
    return base;
  }

  const weighted = getWeightedDirections(previous);
  let cursor = rng() * weighted.reduce((sum, entry) => sum + entry.weight, 0);
  for (const entry of weighted) {
    cursor -= entry.weight;
    if (cursor <= 0) {
      return entry.direction;
    }
  }

  return weighted[weighted.length - 1]?.direction ?? 'right';
}

function getWeightedDirections(previous: PathNode) {
  const weights: Array<{ direction: PathDirection; weight: number }> = [
    { direction: 'right', weight: 22 },
    { direction: 'up', weight: 12 },
    { direction: 'up_left', weight: 10 },
    { direction: 'up_right', weight: 18 },
    { direction: 'down_left', weight: 10 },
    { direction: 'down_right', weight: 18 }
  ];

  return weights.map((entry) => {
    let weight = entry.weight;

    if (previous.direction === entry.direction) {
      weight += 5;
    }

    if (previous.y > 8 && (entry.direction === 'up' || entry.direction === 'up_right' || entry.direction === 'up_left')) {
      weight *= 0.35;
    }

    if (previous.y < -8 && (entry.direction === 'down_right' || entry.direction === 'down_left')) {
      weight *= 0.35;
    }

    if (entry.direction === 'up_left' || entry.direction === 'down_left') {
      weight *= 0.82;
    }

    return { direction: entry.direction, weight };
  });
}

export function getDirectionVector(direction: PathDirection) {
  return directionVectors[direction];
}
