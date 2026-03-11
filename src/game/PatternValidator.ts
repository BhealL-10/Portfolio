import { getDifficultyProfile } from './difficultyScaler';
import type { GamePathNode } from './gameSessionTypes';

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

      if (distance < minimumDistance || distance > profile.maxJumpDistance) {
        return false;
      }

      if (Math.abs(dy) > profile.maxVerticalDelta) {
        return false;
      }

      if (candidate.x < previous.x + Math.max(2.8, candidate.gameplayRadius * 0.75)) {
        return false;
      }
    }

    for (const node of recentNodes) {
      const distance = Math.hypot(candidate.x - node.x, candidate.y - node.y);
      if (distance < getPlacementRadius(candidate) + getPlacementRadius(node)) {
        return false;
      }

      if (
        Math.abs(candidate.x - node.x) < Math.max(3.2, (candidate.gameplayRadius + node.gameplayRadius) * 0.9) &&
        Math.abs(candidate.y - node.y) < Math.max(3, (candidate.gameplayRadius + node.gameplayRadius) * 0.8)
      ) {
        return false;
      }
    }

    if (Math.abs(candidate.y) > 28) {
      return false;
    }

    recentNodes.push(candidate);
    if (recentNodes.length > 8) {
      recentNodes.shift();
    }
    previous = candidate;
  }

  return true;
}

function getPlacementRadius(node: GamePathNode) {
  return node.gameplayRadius + node.visualScale * 0.26 + 1.7;
}

export function validateTeleportTarget(nodes: GamePathNode[], fromIndex: number, targetIndex: number) {
  if (targetIndex <= fromIndex) return false;
  const target = nodes[targetIndex];
  if (!target) return false;
  return targetIndex < nodes.length - 4;
}
