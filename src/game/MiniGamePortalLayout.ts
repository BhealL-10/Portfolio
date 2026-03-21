import * as THREE from 'three';
import type { ResolvedGamePathNode } from './gameSessionTypes';

export const MINI_GAME_PORTAL_CAMERA_OFFSET = new THREE.Vector3(0, 0.35, 24.5);

export function createMiniGamePortalNode(): ResolvedGamePathNode {
  return {
    index: 0,
    x: 0,
    y: 0.8,
    z: 0,
    resolvedX: 0,
    resolvedY: 0.8,
    resolvedZ: 0,
    resolvedSpinPhase: 0,
    gameplayRadius: 1.86,
    visualScale: 1.92,
    pathDistance: 0,
    direction: 'right',
    kind: 'normal',
    sizeTier: 'medium',
    shapeKind: 'round',
    spinDirection: 'cw',
    spinSpeed: 0.18,
    motionPattern: 'none',
    eventType: 'none',
    colorHint: 'none',
    gameplayOrbitPeriod: 3.6,
    branchSlot: null,
    offerId: null,
    onboarding: false,
    isMilestone: false,
    isGigantic: false,
    coinSlots: [],
    enemySlot: null,
    motionSeed: Math.PI * 0.37,
    visualStretch: { x: 1, y: 1, z: 1 }
  };
}
