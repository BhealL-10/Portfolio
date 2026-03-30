import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { projectWorldHudAnchor } from './worldHudProjection';

describe('projectWorldHudAnchor', () => {
  it('returns null when the projected point is outside the visible frustum', () => {
    const result = projectWorldHudAnchor(
      new THREE.Vector3(0, 0, 0),
      () => ({ visible: false, x: 120, y: 80 }),
      { viewportWidth: 320, viewportHeight: 180 }
    );

    expect(result).toBeNull();
  });

  it('clamps projected anchors inside the requested viewport padding', () => {
    const result = projectWorldHudAnchor(
      new THREE.Vector3(1, 2, 3),
      () => ({ visible: true, x: 4, y: 198 }),
      { paddingX: 18, paddingY: 24, viewportWidth: 320, viewportHeight: 200 }
    );

    expect(result).toEqual({ screenX: 18, screenY: 176 });
  });
});
