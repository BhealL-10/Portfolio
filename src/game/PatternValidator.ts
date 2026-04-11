import { DEFAULT_COLUMN_DISTANCE, getDifficultyProfile } from './difficultyScaler';
import type { GamePathNode } from './gameSessionTypes';
import { getPathVerticalExtent } from './pathLayout';

export function validatePatternPlacement(candidateNodes: GamePathNode[], existingNodes: GamePathNode[]) {
  if (candidateNodes.length === 0) return false;

  const recentNodes = existingNodes.slice(Math.max(0, existingNodes.length - 8));
  let previous = existingNodes[existingNodes.length - 1] ?? null;

  for (const candidate of candidateNodes) {
    const profile = getDifficultyProfile(candidate.index);

    if (previous) {
      const dx = candidate.x - previous.x;
      const dy = candidate.y - previous.y;
      const distance = Math.hypot(dx, dy);
      const minimumDistance = getPlacementRadius(previous) + getPlacementRadius(candidate);
      const sharedColumn = canShareVerticalColumn(previous, candidate, dx, dy, minimumDistance, profile.maxVerticalDelta);
      const previousOverlap = placementBoxesOverlap(previous, candidate, 0.24, 0.3);

      if ((distance < minimumDistance && previousOverlap) || distance > profile.maxJumpDistance) {
        return false;
      }

      if (!sharedColumn && Math.abs(dy) > profile.maxVerticalDelta) {
        return false;
      }

      if (!sharedColumn && candidate.x < previous.x + Math.max(2.8, candidate.gameplayRadius * 0.75)) {
        return false;
      }
    }

    for (const node of recentNodes) {
      if (node.isMilestone && isInsideMilestoneReservedRange(candidate, node)) {
        return false;
      }

      const distance = Math.hypot(candidate.x - node.x, candidate.y - node.y);
      const radialOverlap = distance < getPlacementRadius(candidate) + getPlacementRadius(node);
      if (radialOverlap && placementBoxesOverlap(candidate, node, 0.18, 0.24)) {
        return false;
      }
      if (placementBoxesOverlap(candidate, node, 0.08, 0.12)) {
        return false;
      }
    }

    const verticalLimit = getPathVerticalExtent(candidate.index) + DEFAULT_COLUMN_DISTANCE * 1.55;
    if (Math.abs(candidate.y) > verticalLimit) {
      return false;
    }

    for (const checkpoint of getMotionCheckpoints(candidate)) {
      if (Math.abs(checkpoint.y) > verticalLimit) {
        return false;
      }

      for (const node of recentNodes) {
        if (node.index === candidate.index) {
          continue;
        }
        if (node.isMilestone && !candidate.isMilestone && isInsideMilestoneReservedRange({ ...candidate, x: checkpoint.x, y: checkpoint.y }, node)) {
          return false;
        }
        const distance = Math.hypot(checkpoint.x - node.x, checkpoint.y - node.y);
        if (distance < getPlacementRadius(candidate) + getPlacementRadius(node) && placementBoxesOverlap({ ...candidate, x: checkpoint.x, y: checkpoint.y }, node, 0.18, 0.24)) {
          return false;
        }
      }
    }

    recentNodes.push(candidate);
    if (recentNodes.length > 8) {
      recentNodes.shift();
    }
    previous = candidate;
  }

  return true;
}

function isInsideMilestoneReservedRange(candidate: GamePathNode, milestone: GamePathNode) {
  const milestoneExtents = getPlacementExtents(milestone);
  const candidateExtents = getPlacementExtents(candidate);
  const start = milestone.x - milestoneExtents.x - DEFAULT_COLUMN_DISTANCE * 0.9;
  const end = milestone.x + milestoneExtents.x + DEFAULT_COLUMN_DISTANCE * 1.7;
  const verticallyClear = Math.abs(candidate.y - milestone.y) >= milestoneExtents.y + candidateExtents.y + DEFAULT_COLUMN_DISTANCE * 0.58;
  return candidate.x >= start && candidate.x <= end && !verticallyClear;
}

function getPlacementRadius(node: GamePathNode) {
  const softMargin = node.gameplayRadius < 1.15 ? 0.72 : node.gameplayRadius < 1.9 ? 1.05 : 1.38;
  return node.gameplayRadius + node.visualScale * 0.14 + softMargin;
}

function getPlacementExtents(node: GamePathNode) {
  const geometryBaseX = node.shapeKind === 'triangular' ? 1.24 * 0.866 : node.shapeKind === 'oval' ? 1.18 : 1.25;
  const geometryBaseY = node.shapeKind === 'triangular' ? 1.24 : node.shapeKind === 'oval' ? 1.18 : 1.25;
  return {
    x: geometryBaseX * node.visualScale * node.visualStretch.x * 0.92,
    y: geometryBaseY * node.visualScale * node.visualStretch.y * 0.92
  };
}

function placementBoxesOverlap(left: GamePathNode, right: GamePathNode, paddingX: number, paddingY: number) {
  const leftExtents = getPlacementExtents(left);
  const rightExtents = getPlacementExtents(right);
  return (
    Math.abs(left.x - right.x) < leftExtents.x + rightExtents.x + paddingX &&
    Math.abs(left.y - right.y) < leftExtents.y + rightExtents.y + paddingY
  );
}

function canShareVerticalColumn(
  previous: GamePathNode,
  candidate: GamePathNode,
  dx: number,
  dy: number,
  minimumDistance: number,
  maxVerticalDelta: number
) {
  if (previous.isGigantic || candidate.isGigantic) return false;
  if (isLarge(previous) || isLarge(candidate)) return false;

  const sameColumnBand = Math.abs(dx) <= Math.max(2.1, minimumDistance * 0.34);
  const verticalSpread = Math.abs(dy) >= Math.max(4.1, minimumDistance * 0.94);
  const verticalCap = Math.abs(dy) <= Math.max(maxVerticalDelta * 2.8, DEFAULT_COLUMN_DISTANCE * 2.1);
  const forwardEnough = dx >= 0.28;

  return sameColumnBand && verticalSpread && verticalCap && forwardEnough;
}

function isLarge(node: GamePathNode) {
  return node.sizeTier === 'large' || node.sizeTier === 'very_large' || node.sizeTier === 'huge' || node.sizeTier === 'massive';
}

function getMotionCheckpoints(node: GamePathNode) {
  if (node.motionMode !== 'landing_once' || !node.motionDirection || !node.motionDistance || node.motionDistance <= 0) {
    return [];
  }

  const direction = resolveMotionDirectionVector(node.motionDirection);
  const endX = node.x + direction.x * node.motionDistance;
  const endY = node.y + direction.y * node.motionDistance;
  return [
    { x: node.x + direction.x * node.motionDistance * 0.5, y: node.y + direction.y * node.motionDistance * 0.5 },
    { x: endX, y: endY }
  ];
}

function resolveMotionDirectionVector(direction: NonNullable<GamePathNode['motionDirection']>) {
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
      return normalizeVector(-1, 1);
    case 'up_right':
      return normalizeVector(1, 1);
    case 'down_left':
      return normalizeVector(-1, -1);
    case 'down_right':
    default:
      return normalizeVector(1, -1);
  }
}

function normalizeVector(x: number, y: number) {
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}

export function validateTeleportTarget(nodes: GamePathNode[], fromIndex: number, targetIndex: number) {
  if (targetIndex <= fromIndex) return false;
  const target = nodes[targetIndex];
  if (!target) return false;
  return targetIndex < nodes.length - 4;
}
