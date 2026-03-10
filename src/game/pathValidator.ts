import { getDifficultyProfile } from './difficultyScaler';
import type { PathNode } from './pathTypes';

export function validatePathCandidate(candidate: PathNode, existingNodes: PathNode[]) {
  const previous = existingNodes[existingNodes.length - 1];
  const beforePrevious = existingNodes[existingNodes.length - 2];
  if (!previous) return true;

  const profile = getDifficultyProfile(candidate.index);
  const dx = candidate.x - previous.x;
  const dy = candidate.y - previous.y;
  const distance = Math.hypot(dx, dy);

  if (distance < 5.6 || distance > profile.maxJumpDistance * 0.94) {
    return false;
  }

  if (Math.abs(dy) > profile.maxVerticalDelta) {
    return false;
  }

  const recentNodes = existingNodes.slice(Math.max(0, existingNodes.length - 6));
  for (const node of recentNodes) {
    const recentDistance = Math.hypot(candidate.x - node.x, candidate.y - node.y);
    if (recentDistance < Math.max(4.1, profile.spacing * 0.6)) {
      return false;
    }
  }

  if (beforePrevious) {
    const prevVectorX = previous.x - beforePrevious.x;
    const prevVectorY = previous.y - beforePrevious.y;
    const prevLength = Math.hypot(prevVectorX, prevVectorY);
    if (prevLength > 0.0001) {
      const dot = (prevVectorX * dx + prevVectorY * dy) / (prevLength * distance);
      if (dot < -0.72) {
        return false;
      }
    }
  }

  return Math.abs(candidate.y) <= 16;
}

export function validateTeleportTarget(nodes: PathNode[], fromIndex: number, targetIndex: number) {
  if (targetIndex <= fromIndex) return false;
  const target = nodes[targetIndex];
  if (!target) return false;
  return targetIndex < nodes.length - 4;
}
