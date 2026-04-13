import { DEFAULT_COLUMN_DISTANCE, getDifficultyProfile } from './difficultyScaler';
import type { GamePathNode } from './gameSessionTypes';
import { getPathVerticalExtent } from './pathLayout';

export type PlacementConflictType = 'spacing' | 'milestone_reserved' | 'motion_corridor';

export interface PlacementConflict {
  type: PlacementConflictType;
  leftIndex: number;
  rightIndex: number;
}

export function validatePatternPlacement(candidateNodes: GamePathNode[], existingNodes: GamePathNode[]) {
  if (candidateNodes.length === 0) return false;

  const placedNodes = [...existingNodes];
  let previous = existingNodes[existingNodes.length - 1] ?? null;

  for (const candidate of candidateNodes) {
    const profile = getDifficultyProfile(candidate.index);

    if (previous) {
      const dx = candidate.x - previous.x;
      const dy = candidate.y - previous.y;
      const distance = Math.hypot(dx, dy);
      const minimumDistance = getPlacementRadius(previous) + getPlacementRadius(candidate);
      const sharedColumn = canShareVerticalColumn(previous, candidate, dx, dy, minimumDistance, profile.maxVerticalDelta);

      if (nodesConflict(previous, candidate) || distance > profile.maxJumpDistance) {
        return false;
      }

      if (!sharedColumn && Math.abs(dy) > profile.maxVerticalDelta) {
        return false;
      }

      if (!sharedColumn && candidate.x < previous.x + Math.max(2.8, candidate.gameplayRadius * 0.75)) {
        return false;
      }
    }

    const verticalLimit = getPathVerticalExtent(candidate.index) + DEFAULT_COLUMN_DISTANCE * 1.55;
    if (Math.abs(candidate.y) > verticalLimit) {
      return false;
    }

    const nearbyNodes = getRelevantNodes(candidate, placedNodes);
    for (const node of nearbyNodes) {
      if (node.index === candidate.index) {
        continue;
      }
      if (node.isMilestone && !candidate.isMilestone && isInsideMilestoneReservedRange(candidate, node)) {
        return false;
      }
      if (nodesConflict(candidate, node)) {
        return false;
      }
      if (motionCorridorsConflict(candidate, node)) {
        return false;
      }
    }

    if (motionLeavesVerticalBounds(candidate, verticalLimit)) {
      return false;
    }

    placedNodes.push(candidate);
    previous = candidate;
  }

  return true;
}

export function findPlacementConflicts(nodes: GamePathNode[]) {
  const conflicts: PlacementConflict[] = [];

  for (let index = 0; index < nodes.length; index += 1) {
    const left = nodes[index]!;
    const verticalLimit = getPathVerticalExtent(left.index) + DEFAULT_COLUMN_DISTANCE * 1.55;
    if (motionLeavesVerticalBounds(left, verticalLimit)) {
      conflicts.push({
        type: 'motion_corridor',
        leftIndex: left.index,
        rightIndex: left.index
      });
    }

    for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
      const right = nodes[otherIndex]!;
      if (right.x - getSweptBounds(right).halfWidth > getSweptBounds(left).maxX + DEFAULT_COLUMN_DISTANCE * 2.6) {
        break;
      }
      if (left.isMilestone && !right.isMilestone && isInsideMilestoneReservedRange(right, left)) {
        conflicts.push({
          type: 'milestone_reserved',
          leftIndex: left.index,
          rightIndex: right.index
        });
        continue;
      }
      if (right.isMilestone && !left.isMilestone && isInsideMilestoneReservedRange(left, right)) {
        conflicts.push({
          type: 'milestone_reserved',
          leftIndex: left.index,
          rightIndex: right.index
        });
        continue;
      }
      if (nodesConflict(left, right)) {
        conflicts.push({
          type: 'spacing',
          leftIndex: left.index,
          rightIndex: right.index
        });
        continue;
      }
      if (motionCorridorsConflict(left, right)) {
        conflicts.push({
          type: 'motion_corridor',
          leftIndex: left.index,
          rightIndex: right.index
        });
      }
    }
  }

  return conflicts;
}

function isInsideMilestoneReservedRange(candidate: GamePathNode, milestone: GamePathNode) {
  if (candidate.milestoneOwned) {
    return false;
  }
  const milestoneHalfWidth = getPlacementHalfWidth(milestone);
  const candidateHalfWidth = getPlacementHalfWidth(candidate);
  const margin = getMinimumSpacingMargin(milestone, candidate);
  const start = milestone.x - milestoneHalfWidth - candidateHalfWidth - margin - DEFAULT_COLUMN_DISTANCE * 0.16;
  const end = milestone.x + milestoneHalfWidth + candidateHalfWidth + margin + DEFAULT_COLUMN_DISTANCE * 0.24;
  const candidateBounds = getSweptBounds(candidate);
  return candidateBounds.maxX >= start && candidateBounds.minX <= end;
}

export function getPlacementRadius(node: GamePathNode) {
  const softMargin = node.gameplayRadius < 1.15 ? 0.72 : node.gameplayRadius < 1.9 ? 1.05 : 1.38;
  return node.gameplayRadius + node.visualScale * 0.14 + softMargin;
}

export function getPlacementExtents(node: GamePathNode) {
  const geometryBaseX = node.shapeKind === 'triangular' ? 1.24 * 0.866 : node.shapeKind === 'oval' ? 1.18 : 1.25;
  const geometryBaseY = node.shapeKind === 'triangular' ? 1.24 : node.shapeKind === 'oval' ? 1.18 : 1.25;
  return {
    x: geometryBaseX * node.visualScale * node.visualStretch.x * 0.92,
    y: geometryBaseY * node.visualScale * node.visualStretch.y * 0.92
  };
}

function placementBoxesOverlap(left: GamePathNode, right: GamePathNode, paddingX: number, paddingY: number) {
  const leftExtents = getPlacementFootprint(left);
  const rightExtents = getPlacementFootprint(right);
  return (
    Math.abs(left.x - right.x) < leftExtents.x + rightExtents.x + paddingX &&
    Math.abs(left.y - right.y) < leftExtents.y + rightExtents.y + paddingY
  );
}

function getPlacementFootprint(node: GamePathNode) {
  const extents = getPlacementExtents(node);
  return {
    x: Math.max(extents.x, node.gameplayRadius * (node.shapeKind === 'triangular' ? 0.92 : 1)),
    y: Math.max(extents.y, node.gameplayRadius * (node.shapeKind === 'triangular' ? 0.98 : 0.94))
  };
}

function getPlacementHalfWidth(node: GamePathNode) {
  return getPlacementFootprint(node).x;
}

function getPlacementHalfHeight(node: GamePathNode) {
  return getPlacementFootprint(node).y;
}

function getMinimumSpacingMargin(left: GamePathNode, right: GamePathNode) {
  const base = Math.min(getPlacementRadius(left), getPlacementRadius(right));
  return Math.min(DEFAULT_COLUMN_DISTANCE * 0.16, Math.max(DEFAULT_COLUMN_DISTANCE * 0.06, base * 0.14));
}

function nodesConflict(left: GamePathNode, right: GamePathNode) {
  if ((left.isMilestone && right.milestoneOwned) || (right.isMilestone && left.milestoneOwned)) {
    return false;
  }
  const margin = getMinimumSpacingMargin(left, right);
  const radialLimit = getPlacementRadius(left) + getPlacementRadius(right) + margin;
  const dx = left.x - right.x;
  const dy = left.y - right.y;
  if (dx * dx + dy * dy >= radialLimit * radialLimit) {
    return false;
  }
  return placementBoxesOverlap(left, right, margin, margin * 0.88);
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

function getMotionSegment(node: GamePathNode) {
  if (node.motionMode !== 'landing_once' || !node.motionDirection || !node.motionDistance || node.motionDistance <= 0) {
    return null;
  }

  const direction = resolveMotionDirectionVector(node.motionDirection);
  const clearance = Math.min(
    node.motionDistance,
    Math.max(getPlacementHalfWidth(node), getPlacementHalfHeight(node)) * 0.78
  );
  return {
    rawStart: { x: node.x, y: node.y },
    start: {
      x: node.x + direction.x * clearance,
      y: node.y + direction.y * clearance
    },
    end: {
      x: node.x + direction.x * node.motionDistance,
      y: node.y + direction.y * node.motionDistance
    }
  };
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

function motionLeavesVerticalBounds(node: GamePathNode, verticalLimit: number) {
  const segment = getMotionSegment(node);
  if (!segment) {
    return false;
  }
  const footprintY = getPlacementHalfHeight(node);
  return (
    Math.abs(segment.rawStart.y) + footprintY > verticalLimit ||
    Math.abs(segment.end.y) + footprintY > verticalLimit
  );
}

function motionCorridorsConflict(left: GamePathNode, right: GamePathNode) {
  const leftMotion = getMotionSegment(left);
  const rightMotion = getMotionSegment(right);
  if (!leftMotion && !rightMotion) {
    return false;
  }

  if ((left.isMilestone && right.milestoneOwned) || (right.isMilestone && left.milestoneOwned)) {
    return false;
  }

  if (left.isMilestone && rightMotion) {
    return motionIntersectsMilestoneRange(right, left);
  }
  if (right.isMilestone && leftMotion) {
    return motionIntersectsMilestoneRange(left, right);
  }

  const leftBounds = getSweptBounds(left);
  const rightBounds = getSweptBounds(right);
  const margin = getMinimumSpacingMargin(left, right);
  if (
    leftBounds.maxX + margin < rightBounds.minX ||
    rightBounds.maxX + margin < leftBounds.minX ||
    leftBounds.maxY + margin < rightBounds.minY ||
    rightBounds.maxY + margin < leftBounds.minY
  ) {
    return false;
  }

  const allowed = getPlacementRadius(left) + getPlacementRadius(right) + margin;
  const allowedSq = allowed * allowed;

  if (leftMotion && rightMotion) {
    return segmentToSegmentDistanceSq(leftMotion.start, leftMotion.end, rightMotion.start, rightMotion.end) < allowedSq;
  }
  if (leftMotion) {
    return pointToSegmentDistanceSq({ x: right.x, y: right.y }, leftMotion.start, leftMotion.end) < allowedSq;
  }
  if (rightMotion) {
    return pointToSegmentDistanceSq({ x: left.x, y: left.y }, rightMotion.start, rightMotion.end) < allowedSq;
  }
  return false;
}

function motionIntersectsMilestoneRange(node: GamePathNode, milestone: GamePathNode) {
  const segment = getMotionSegment(node);
  if (!segment) {
    return false;
  }
  const milestoneHalfWidth = getPlacementHalfWidth(milestone);
  const candidateHalfWidth = getPlacementHalfWidth(node);
  const margin = getMinimumSpacingMargin(node, milestone);
  const reservedStart = milestone.x - milestoneHalfWidth - candidateHalfWidth - margin - DEFAULT_COLUMN_DISTANCE * 0.2;
  const reservedEnd = milestone.x + milestoneHalfWidth + candidateHalfWidth + margin + DEFAULT_COLUMN_DISTANCE * 0.24;
  const minX = Math.min(segment.start.x, segment.end.x);
  const maxX = Math.max(segment.start.x, segment.end.x);
  return maxX >= reservedStart && minX <= reservedEnd;
}

function getSweptBounds(node: GamePathNode) {
  const motion = getMotionSegment(node);
  const halfWidth = getPlacementHalfWidth(node);
  const halfHeight = getPlacementHalfHeight(node);
  const startX = motion?.start.x ?? node.x;
  const startY = motion?.start.y ?? node.y;
  const endX = motion?.end.x ?? startX;
  const endY = motion?.end.y ?? startY;
  return {
    minX: Math.min(startX, endX) - halfWidth,
    maxX: Math.max(startX, endX) + halfWidth,
    minY: Math.min(startY, endY) - halfHeight,
    maxY: Math.max(startY, endY) + halfHeight,
    halfWidth,
    halfHeight
  };
}

function getRelevantNodes(candidate: GamePathNode, placedNodes: GamePathNode[]) {
  const bounds = getSweptBounds(candidate);
  const relevant: GamePathNode[] = [];

  for (let index = placedNodes.length - 1; index >= 0; index -= 1) {
    const node = placedNodes[index]!;
    const nodeBounds = getSweptBounds(node);
    if (nodeBounds.maxX < bounds.minX - DEFAULT_COLUMN_DISTANCE * 2.2) {
      break;
    }
    if (nodeBounds.minX > bounds.maxX + DEFAULT_COLUMN_DISTANCE * 1.2) {
      continue;
    }
    if (nodeBounds.maxY < bounds.minY - DEFAULT_COLUMN_DISTANCE * 1.4 || nodeBounds.minY > bounds.maxY + DEFAULT_COLUMN_DISTANCE * 1.4) {
      continue;
    }
    relevant.push(node);
  }

  return relevant;
}

function pointToSegmentDistanceSq(
  point: { x: number; y: number },
  start: { x: number; y: number },
  end: { x: number; y: number }
) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (dx === 0 && dy === 0) {
    const offsetX = point.x - start.x;
    const offsetY = point.y - start.y;
    return offsetX * offsetX + offsetY * offsetY;
  }
  const t = Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy)));
  const projectionX = start.x + dx * t;
  const projectionY = start.y + dy * t;
  const offsetX = point.x - projectionX;
  const offsetY = point.y - projectionY;
  return offsetX * offsetX + offsetY * offsetY;
}

function segmentToSegmentDistanceSq(
  startA: { x: number; y: number },
  endA: { x: number; y: number },
  startB: { x: number; y: number },
  endB: { x: number; y: number }
) {
  if (segmentsIntersect(startA, endA, startB, endB)) {
    return 0;
  }
  return Math.min(
    pointToSegmentDistanceSq(startA, startB, endB),
    pointToSegmentDistanceSq(endA, startB, endB),
    pointToSegmentDistanceSq(startB, startA, endA),
    pointToSegmentDistanceSq(endB, startA, endA)
  );
}

function segmentsIntersect(
  startA: { x: number; y: number },
  endA: { x: number; y: number },
  startB: { x: number; y: number },
  endB: { x: number; y: number }
) {
  const orientationA = orientation(startA, endA, startB);
  const orientationB = orientation(startA, endA, endB);
  const orientationC = orientation(startB, endB, startA);
  const orientationD = orientation(startB, endB, endA);

  if (orientationA === 0 && onSegment(startA, startB, endA)) return true;
  if (orientationB === 0 && onSegment(startA, endB, endA)) return true;
  if (orientationC === 0 && onSegment(startB, startA, endB)) return true;
  if (orientationD === 0 && onSegment(startB, endA, endB)) return true;

  return (orientationA > 0) !== (orientationB > 0) && (orientationC > 0) !== (orientationD > 0);
}

function orientation(
  start: { x: number; y: number },
  mid: { x: number; y: number },
  end: { x: number; y: number }
) {
  const value = (mid.y - start.y) * (end.x - mid.x) - (mid.x - start.x) * (end.y - mid.y);
  if (Math.abs(value) < 1e-6) {
    return 0;
  }
  return value > 0 ? 1 : -1;
}

function onSegment(
  start: { x: number; y: number },
  point: { x: number; y: number },
  end: { x: number; y: number }
) {
  return (
    point.x >= Math.min(start.x, end.x) - 1e-6 &&
    point.x <= Math.max(start.x, end.x) + 1e-6 &&
    point.y >= Math.min(start.y, end.y) - 1e-6 &&
    point.y <= Math.max(start.y, end.y) + 1e-6
  );
}

export function validateTeleportTarget(nodes: GamePathNode[], fromIndex: number, targetIndex: number) {
  if (targetIndex <= fromIndex) return false;
  const target = nodes[targetIndex];
  if (!target) return false;
  return targetIndex < nodes.length - 4;
}
