import * as THREE from 'three';
import type { ThemeMode } from '../types/content';
import type { GameEnemyTier } from './gameSessionTypes';
import { SpriteSheetPlane } from './SpriteSheetPlane';

export interface EnemyMarker {
  position: THREE.Vector3;
  visible: boolean;
  tier: GameEnemyTier;
  pole: 'north' | 'south';
}

const ENEMY_SPRITE_URL = new URL('../../assets/images/spritesheet/Spritsheetennemie.png', import.meta.url).href;

export class EnemySystem {
  private readonly group = new THREE.Group();
  private readonly pool: Array<{
    group: THREE.Group;
    body: SpriteSheetPlane;
    backArrow: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  }> = [];
  private theme: ThemeMode;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    for (let index = 0; index < 18; index += 1) {
      const group = new THREE.Group();
      const body = new SpriteSheetPlane({
        textureUrl: ENEMY_SPRITE_URL,
        layout: { columns: 2, rows: 2 },
        width: 1.68,
        height: 1.68,
        alphaTest: 0.08,
        doubleSided: true,
        renderOrder: 14
      });
      const backArrow = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.34, 3),
        new THREE.MeshBasicMaterial({ color: theme === 'dark' ? '#393F4A' : '#D4BF9B', transparent: true, opacity: 0.95 })
      );
      backArrow.rotation.z = Math.PI;
      group.add(body.group, backArrow);
      group.visible = false;
      this.pool.push({ group, body, backArrow });
      this.group.add(group);
    }
    this.group.visible = false;
    scene.add(this.group);
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
  }

  setVisible(visible: boolean) {
    this.group.visible = visible;
  }

  reset() {
    this.pool.forEach((entry) => {
      entry.group.visible = false;
    });
  }

  update(markers: EnemyMarker[], elapsedTime: number) {
    this.pool.forEach((entry, index) => {
      const marker = markers[index];
      if (!marker || !marker.visible) {
        entry.group.visible = false;
        return;
      }

      entry.group.visible = true;
      entry.body.mesh.material.color.set(marker.tier === 'invincible' ? '#F06A5A' : '#FFFFFF');
      entry.body.playLoop([0, 1, 2, 3], marker.tier === 'invincible' ? 10 : marker.tier === 'elite' ? 8.8 : 7.2, elapsedTime + index * 0.07);
      entry.backArrow.material.color.set(this.theme === 'dark' ? '#393F4A' : '#D4BF9B');
      entry.group.position.copy(marker.position);
      entry.group.rotation.set(0, 0, 0);
      const scale = marker.tier === 'elite' ? 1.16 : marker.tier === 'armored' ? 1.04 : marker.tier === 'invincible' ? 1.24 : 0.92;
      entry.group.scale.setScalar(scale);
      entry.backArrow.position.set(0, marker.pole === 'north' ? -0.66 : 0.66, 0);
      entry.backArrow.rotation.z = marker.pole === 'north' ? Math.PI : 0;
    });
  }
}
