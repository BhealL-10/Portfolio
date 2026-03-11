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
      const sharedColumn = canShareVerticalColumn(previous, candidate, dx, dy, minimumDistance, profile.maxVerticalDelta);

      if (distance < minimumDistance || distance > profile.maxJumpDistance) {
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
      const distance = Math.hypot(candidate.x - node.x, candidate.y - node.y);
      if (distance < getPlacementRadius(candidate) + getPlacementRadius(node)) {
        return false;
      }

      if (
        Math.abs(candidate.x - node.x) < Math.max(1.25, (candidate.gameplayRadius + node.gameplayRadius) * 0.42) &&
        Math.abs(candidate.y - node.y) < Math.max(1.7, (candidate.gameplayRadius + node.gameplayRadius) * 0.54)
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
  const softMargin = node.gameplayRadius < 1.15 ? 0.72 : node.gameplayRadius < 1.9 ? 1.05 : 1.38;
  return node.gameplayRadius + node.visualScale * 0.14 + softMargin;
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
  const verticalSpread = Math.abs(dy) >= Math.max(4.8, minimumDistance * 1.02);
  const verticalCap = Math.abs(dy) <= maxVerticalDelta * 2.35;
  const forwardEnough = dx >= 0.28;

  return sameColumnBand && verticalSpread && verticalCap && forwardEnough;
}

function isLarge(node: GamePathNode) {
  return node.sizeTier === 'large' || node.sizeTier === 'very_large' || node.sizeTier === 'huge' || node.sizeTier === 'massive';
}

export function validateTeleportTarget(nodes: GamePathNode[], fromIndex: number, targetIndex: number) {
  if (targetIndex <= fromIndex) return false;
  const target = nodes[targetIndex];
  if (!target) return false;
  return targetIndex < nodes.length - 4;
}
