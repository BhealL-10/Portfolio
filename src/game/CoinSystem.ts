import * as THREE from 'three';
import type { ThemeMode } from '../types/content';
import { SpriteSheetPlane } from './SpriteSheetPlane';

export interface CoinMarker {
  id: string;
  position: THREE.Vector3;
  scale: number;
  visible: boolean;
  attraction?: number;
  targetPosition?: THREE.Vector3 | null;
}

const COIN_SPRITE_URL = new URL('../../assets/images/spritesheet/coinsheetsprite.png', import.meta.url).href;

export class CoinSystem {
  private readonly group = new THREE.Group();
  private readonly pool: Array<{
    activeId: string | null;
    sprite: SpriteSheetPlane;
    smoothedPosition: THREE.Vector3;
    initialized: boolean;
  }> = [];
  private readonly desiredPosition = new THREE.Vector3();

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    SpriteSheetPlane.preload(COIN_SPRITE_URL, { columns: 4, rows: 1 });
    for (let index = 0; index < 36; index += 1) {
      const sprite = new SpriteSheetPlane({
        textureUrl: COIN_SPRITE_URL,
        layout: { columns: 4, rows: 1 },
        width: 0.98,
        height: 0.98,
        alphaTest: 0.08,
        doubleSided: true,
        offsetY: 0.01,
        renderOrder: 18
      });
      sprite.mesh.material.depthTest = false;
      sprite.mesh.material.depthWrite = false;
      sprite.setVisible(false);
      this.pool.push({
        activeId: null,
        sprite,
        smoothedPosition: new THREE.Vector3(),
        initialized: false
      });
      this.group.add(sprite.group);
    }

    this.group.visible = false;
    scene.add(this.group);
    this.setTheme(theme);
  }

  setTheme(theme: ThemeMode) {
    void theme;
  }

  setVisible(visible: boolean) {
    this.group.visible = visible;
  }

  reset() {
    this.pool.forEach((entry) => {
      entry.activeId = null;
      entry.sprite.setVisible(false);
      entry.initialized = false;
    });
  }

  update(markers: CoinMarker[], elapsedTime: number) {
    const activeIds = new Set(markers.filter((marker) => marker.visible).map((marker) => marker.id));

    this.pool.forEach((entry) => {
      if (entry.activeId && !activeIds.has(entry.activeId)) {
        entry.activeId = null;
        entry.initialized = false;
        entry.sprite.setVisible(false);
      }
    });

    markers.forEach((marker, index) => {
      let entry =
        this.pool.find((candidate) => candidate.activeId === marker.id) ??
        this.pool.find((candidate) => candidate.activeId === null);

      if (!entry) {
        entry = this.pool[index % this.pool.length];
      }

      if (!marker || !marker.visible) {
        if (entry) {
          entry.activeId = null;
          entry.initialized = false;
          entry.sprite.setVisible(false);
        }
        return;
      }

      if (entry.activeId !== marker.id) {
        entry.activeId = marker.id;
        entry.initialized = false;
      }

      const attraction = THREE.MathUtils.clamp(marker.attraction ?? 0, 0, 1);
      this.desiredPosition.copy(marker.position);
      if (marker.targetPosition && attraction > 0) {
        this.desiredPosition.lerp(marker.targetPosition, Math.min(0.68, attraction * 0.58));
      }

      if (!entry.initialized) {
        entry.smoothedPosition.copy(this.desiredPosition);
        entry.initialized = true;
      } else {
        const follow = 0.22 + attraction * 0.22;
        entry.smoothedPosition.lerp(this.desiredPosition, follow);
      }

      entry.sprite.setVisible(true);
      entry.sprite.group.position.copy(entry.smoothedPosition);
      entry.sprite.group.position.z += 0.34;
      entry.sprite.group.rotation.set(0, 0, 0);
      entry.sprite.setScale(marker.scale * 0.84 * (1 + Math.sin(elapsedTime * 2.1 + index) * 0.03));
      entry.sprite.playLoop([0, 1, 2, 3], 1.9, elapsedTime + index * 0.04);
    });

    this.pool.forEach((entry) => {
      if (entry.activeId) {
        return;
      }
      if (!entry.sprite.group.visible) {
        entry.sprite.setVisible(false);
      }
    });
  }
}
