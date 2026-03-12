import * as THREE from 'three';
import type { ThemeMode } from '../types/content';
import { SpriteSheetPlane } from './SpriteSheetPlane';

export interface CoinMarker {
  position: THREE.Vector3;
  scale: number;
  visible: boolean;
}

const COIN_SPRITE_URL = new URL('../../assets/images/spritesheet/coinsheetsprite.png', import.meta.url).href;

export class CoinSystem {
  private readonly group = new THREE.Group();
  private readonly pool: SpriteSheetPlane[] = [];

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    for (let index = 0; index < 36; index += 1) {
      const sprite = new SpriteSheetPlane({
        textureUrl: COIN_SPRITE_URL,
        layout: { columns: 4, rows: 1 },
        width: 0.86,
        height: 0.86,
        alphaTest: 0.08,
        doubleSided: true,
        offsetY: 0.02,
        renderOrder: 14
      });
      sprite.setVisible(false);
      this.pool.push(sprite);
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
    this.pool.forEach((sprite) => {
      sprite.setVisible(false);
    });
  }

  update(markers: CoinMarker[], elapsedTime: number) {
    this.pool.forEach((sprite, index) => {
      const marker = markers[index];
      if (!marker || !marker.visible) {
        sprite.setVisible(false);
        return;
      }

      sprite.setVisible(true);
      sprite.group.position.copy(marker.position);
      sprite.group.rotation.set(0, 0, 0);
      sprite.setScale(marker.scale * 0.72 * (1 + Math.sin(elapsedTime * 4 + index) * 0.05));
      sprite.playLoop([0, 1, 2, 3], 8.2, elapsedTime + index * 0.05);
    });
  }
}
