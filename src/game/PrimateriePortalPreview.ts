import * as THREE from 'three';
import { createMiniGamePortalNode, MINI_GAME_PORTAL_LAUNCH_ANGLE } from './MiniGamePortalLayout';
import type { VisiblePlatformVisual } from './gameSessionTypes';

export interface PrimateriePortalPreviewLayout {
  position: THREE.Vector3;
  visual: VisiblePlatformVisual;
}

const DEFAULT_PORTAL_CENTER = new THREE.Vector3(0, 0.8, 0);

export function createPrimateriePortalPreviewLayout(
  currentTime = 0,
  orbitAngle = MINI_GAME_PORTAL_LAUNCH_ANGLE,
  center: THREE.Vector3 = DEFAULT_PORTAL_CENTER
): PrimateriePortalPreviewLayout {
  const node = createMiniGamePortalNode();
  node.x = center.x;
  node.y = center.y;
  node.z = center.z;
  node.resolvedX = center.x;
  node.resolvedY = center.y;
  node.resolvedZ = center.z;
  node.resolvedSpinPhase = currentTime * node.spinSpeed;
  return {
    position: new THREE.Vector3(node.resolvedX, node.resolvedY, node.resolvedZ),
    visual: createPrimateriePortalPreviewVisual(node, currentTime, orbitAngle)
  };
}

export function createPrimateriePortalPreviewVisual(
  node = createMiniGamePortalNode(),
  currentTime = 0,
  orbitAngle = MINI_GAME_PORTAL_LAUNCH_ANGLE
): VisiblePlatformVisual {
  const pulse = 0.06 + Math.sin(currentTime * 1.2) * 0.015;
  return {
    scale: new THREE.Vector3(node.visualScale, node.visualScale, node.visualScale),
    shapeKind: node.shapeKind,
    spinDirection: node.spinDirection,
    spinSpeed: 0.06,
    spinPhase: node.resolvedSpinPhase,
    tint: null,
    ringTint: null,
    ringScale: 0,
    stripeTint: null,
    stripeMix: 0,
    stripePhase: currentTime * 1.12,
    pulse,
    deformAngle: orbitAngle,
    deformStrength: 0.02,
    deformDensity: 0.42,
    fragmentAmount: 0.04,
    iconSrc: null,
    iconText: null,
    iconTint: null,
    iconScale: 0.34
  };
}
