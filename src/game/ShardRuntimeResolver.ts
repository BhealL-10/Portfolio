import * as THREE from 'three';
import { getDifficultyProfile } from './difficultyScaler';
import type { GamePathNode, ResolvedGamePathNode } from './gameSessionTypes';

export function getShapeOrientation(_node: GamePathNode, elapsedTime: number) {
  if (_node.shapeKind === 'round') {
    return 0;
  }

  const direction = _node.spinDirection === 'cw' ? -1 : 1;
  const speedFactor = _node.shapeKind === 'oval' ? 0.38 : 0.92;
  return _node.motionSeed + elapsedTime * _node.spinSpeed * speedFactor * direction;
}

export function resolveRuntimeNode(node: GamePathNode, elapsedTime: number, currentIndex: number): ResolvedGamePathNode {
  let resolvedX = node.x;
  let resolvedY = node.y;
  let resolvedMotionProgress = 0;

  const motionActivatedAt = node.motionActivatedAt ?? null;

  if (node.motionMode === 'landing_once' && motionActivatedAt !== null && node.motionDirection && node.motionDistance) {
    const duration = Math.max(0.18, node.motionDuration ?? 1);
    const rawProgress = Math.min(1, Math.max(0, (elapsedTime - motionActivatedAt) / duration));
    const easedProgress = THREE.MathUtils.smootherstep(rawProgress, 0, 1);
    const direction = resolveMotionDirectionVector(node.motionDirection);
    resolvedX += direction.x * node.motionDistance * easedProgress;
    resolvedY += direction.y * node.motionDistance * easedProgress;
    resolvedMotionProgress = easedProgress;
  } else if (node.motionMode === 'landing_once') {
    resolvedMotionProgress = 0;
  } else {
    const profile = getDifficultyProfile(Math.max(node.index, currentIndex));
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
  }

  return {
    ...node,
    resolvedX,
    resolvedY,
    resolvedZ: node.z,
    resolvedSpinPhase: getShapeOrientation(node, elapsedTime),
    resolvedMotionProgress
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
      return normalize(-1, 1);
    case 'up_right':
      return normalize(1, 1);
    case 'down_left':
      return normalize(-1, -1);
    case 'down_right':
    default:
      return normalize(1, -1);
  }
}

function normalize(x: number, y: number) {
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}
