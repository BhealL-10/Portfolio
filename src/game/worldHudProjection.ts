import * as THREE from 'three';

export interface ScreenProjection {
  visible: boolean;
  x: number;
  y: number;
}

export interface ProjectedWorldHudAnchor {
  screenX: number;
  screenY: number;
}

export function projectWorldHudAnchor(
  worldPosition: THREE.Vector3,
  projectWorldToScreen: (worldPosition: THREE.Vector3) => ScreenProjection,
  options: {
    paddingX?: number;
    paddingY?: number;
    viewportWidth?: number;
    viewportHeight?: number;
  } = {}
): ProjectedWorldHudAnchor | null {
  const projected = projectWorldToScreen(worldPosition);
  if (!projected.visible) {
    return null;
  }

  const viewportWidth = options.viewportWidth ?? window.innerWidth;
  const viewportHeight = options.viewportHeight ?? window.innerHeight;
  const paddingX = options.paddingX ?? 0;
  const paddingY = options.paddingY ?? paddingX;
  return {
    screenX: THREE.MathUtils.clamp(projected.x, paddingX, Math.max(paddingX, viewportWidth - paddingX)),
    screenY: THREE.MathUtils.clamp(projected.y, paddingY, Math.max(paddingY, viewportHeight - paddingY))
  };
}
