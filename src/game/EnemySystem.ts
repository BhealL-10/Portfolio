import * as THREE from 'three';
import type { ThemeMode } from '../types/content';
import type { GameEnemyTier } from './gameSessionTypes';
import { SpriteSheetPlane } from './SpriteSheetPlane';

export interface EnemyMarker {
  id: string;
  position: THREE.Vector3;
  visible: boolean;
  tier: GameEnemyTier;
  pole: 'north' | 'south';
}

const ENEMY_SPRITE_LIGHT_URL = new URL('../../assets/images/spritesheet/Spritsheetennemielight.png', import.meta.url).href;
const ENEMY_SPRITE_DARK_URL = new URL('../../assets/images/spritesheet/Spritsheetennemiedark.png', import.meta.url).href;

export class EnemySystem {
  private readonly group = new THREE.Group();
  private readonly pool: Array<{
    activeId: string | null;
    group: THREE.Group;
    body: SpriteSheetPlane;
    backArrow: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
    deathStartedAt: number;
    dying: boolean;
  }> = [];
  private theme: ThemeMode;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    SpriteSheetPlane.preload(ENEMY_SPRITE_LIGHT_URL, { columns: 2, rows: 2 });
    SpriteSheetPlane.preload(ENEMY_SPRITE_DARK_URL, { columns: 2, rows: 2 });
    for (let index = 0; index < 18; index += 1) {
      const group = new THREE.Group();
      const body = new SpriteSheetPlane({
        textureUrl: this.getEnemySpriteUrl(),
        layout: { columns: 2, rows: 2 },
        width: 2.1,
        height: 2.1,
        alphaTest: 0.08,
        doubleSided: true,
        renderOrder: 14
      });
      body.mesh.material.depthTest = false;
      const backArrow = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.34, 3),
        new THREE.MeshBasicMaterial({ color: theme === 'dark' ? '#393F4A' : '#D4BF9B', transparent: true, opacity: 0.95 })
      );
      backArrow.material.depthTest = false;
      backArrow.rotation.z = Math.PI;
      group.add(body.group, backArrow);
      group.visible = false;
      this.pool.push({ activeId: null, group, body, backArrow, deathStartedAt: 0, dying: false });
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
      entry.activeId = null;
      entry.dying = false;
      entry.group.visible = false;
    });
  }

  update(markers: EnemyMarker[], elapsedTime: number) {
    const activeIds = new Set(markers.filter((marker) => marker.visible).map((marker) => marker.id));

    this.pool.forEach((entry) => {
      if (entry.activeId && !activeIds.has(entry.activeId) && !entry.dying && entry.group.visible) {
        entry.dying = true;
        entry.deathStartedAt = elapsedTime;
      }
    });

    this.pool.forEach((entry, index) => {
      const marker = markers[index];
      if (!marker || !marker.visible) {
        if (entry.dying) {
          const deathElapsed = elapsedTime - entry.deathStartedAt;
          if (deathElapsed >= 0.32) {
            entry.group.visible = false;
            entry.activeId = null;
            entry.dying = false;
            return;
          }
          entry.group.visible = true;
          entry.body.setTexture(this.getEnemySpriteUrl());
          entry.body.playLoop([2, 3], 9.5, deathElapsed);
          const fade = Math.max(0, 1 - deathElapsed / 0.32);
          entry.body.mesh.material.opacity = fade;
          entry.backArrow.material.opacity = fade;
          return;
        }
        entry.group.visible = false;
        entry.activeId = null;
        return;
      }

      entry.activeId = marker.id;
      entry.dying = false;
      entry.group.visible = true;
      entry.body.setTexture(this.getEnemySpriteUrl());
      entry.body.mesh.material.opacity = 1;
      entry.body.mesh.material.color.set(marker.tier === 'invincible' ? '#F06A5A' : '#FFFFFF');
      entry.body.playLoop([0, 1], marker.tier === 'invincible' ? 7.4 : marker.tier === 'elite' ? 6.8 : 5.6, elapsedTime + index * 0.07);
      entry.backArrow.material.color.set(this.theme === 'dark' ? '#393F4A' : '#D4BF9B');
      entry.backArrow.material.opacity = 0.95;
      entry.group.position.copy(marker.position);
      entry.group.position.z += 0.34;
      entry.group.rotation.set(0, 0, 0);
      const scale = marker.tier === 'elite' ? 1.44 : marker.tier === 'armored' ? 1.28 : marker.tier === 'invincible' ? 1.58 : 1.16;
      entry.group.scale.setScalar(scale);
      entry.body.group.scale.set(1, marker.pole === 'south' ? -1 : 1, 1);
      entry.backArrow.position.set(0, marker.pole === 'north' ? -0.84 : 0.84, 0);
      entry.backArrow.rotation.z = marker.pole === 'north' ? Math.PI : 0;
    });
  }

  private getEnemySpriteUrl() {
    return this.theme === 'dark' ? ENEMY_SPRITE_DARK_URL : ENEMY_SPRITE_LIGHT_URL;
  }
}
