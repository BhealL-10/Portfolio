import { getDifficultyProfile } from './difficultyScaler';
import type { GamePathNode, ResolvedGamePathNode } from './gameSessionTypes';

export function getShapeOrientation(node: GamePathNode, elapsedTime: number) {
  if (node.shapeKind === 'round') {
    return 0;
  }

  const direction = node.spinDirection === 'cw' ? -1 : 1;
  return node.motionSeed + elapsedTime * node.spinSpeed * 0.42 * direction;
}

export function resolveRuntimeNode(node: GamePathNode, elapsedTime: number, currentIndex: number): ResolvedGamePathNode {
  const profile = getDifficultyProfile(Math.max(node.index, currentIndex));
  let resolvedX = node.x;
  let resolvedY = node.y;

  if (node.index > currentIndex + 1 && node.motionPattern !== 'none') {
    const phase = elapsedTime * (0.48 + profile.movementSpeed * 0.66) + node.motionSeed;
    const amplitude = profile.movementAmplitude * (0.44 + node.visualScale * 0.08);

    if (node.motionPattern === 'vertical') {
      resolvedY += Math.sin(phase) * amplitude * 0.95;
    } else if (node.motionPattern === 'horizontal') {
      resolvedX += Math.cos(phase * 0.82) * amplitude * 0.7;
      resolvedY += Math.sin(phase * 0.54) * amplitude * 0.2;
    } else if (node.motionPattern === 'micro_orbit') {
      resolvedX += Math.sin(phase * 0.55) * amplitude * 0.34;
      resolvedY += Math.cos(phase * 0.94) * amplitude * 0.7;
    } else if (node.motionPattern === 'drift') {
      resolvedX += Math.cos(phase * 0.42) * amplitude * 0.46;
      resolvedY += Math.sin(phase * 0.42) * amplitude * 0.46;
    }
  }

  return {
    ...node,
    resolvedX,
    resolvedY,
    resolvedZ: node.z,
    resolvedSpinPhase: getShapeOrientation(node, elapsedTime)
  };
}
