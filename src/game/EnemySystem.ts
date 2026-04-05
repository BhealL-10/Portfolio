import * as THREE from 'three';
import { getThemeNonShardHex } from '../core/themePalette';
import type { ThemeMode } from '../types/content';
import type { GameEnemyTier } from './gameSessionTypes';
import { SpriteSheetPlane } from './SpriteSheetPlane';

export interface EnemyMarker {
  id: string;
  position: THREE.Vector3;
  visible: boolean;
  tier: GameEnemyTier;
  pole: 'north' | 'south';
  mirrored: boolean;
}

const ENEMY_SPRITE_URL = new URL('../../assets/images/game/sprites/characters/enemies/basic-sheet.png', import.meta.url).href;

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
  private readonly assignedIds = new Set<string>();
  private theme: ThemeMode;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    SpriteSheetPlane.preload(ENEMY_SPRITE_URL, { columns: 4, rows: 2 });
    for (let index = 0; index < 64; index += 1) {
      const group = new THREE.Group();
      const body = new SpriteSheetPlane({
        textureUrl: ENEMY_SPRITE_URL,
        layout: { columns: 4, rows: 2 },
        width: 2.56,
        height: 2.56,
        alphaTest: 0.08,
        doubleSided: true,
        renderOrder: 32
      });
      body.mesh.material.depthTest = false;
      body.mesh.material.depthWrite = false;
      const backArrow = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.34, 3),
        new THREE.MeshBasicMaterial({ color: getThemeNonShardHex(theme), transparent: true, opacity: 0.95 })
      );
      backArrow.material.depthTest = false;
      backArrow.renderOrder = 33;
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
    this.pool.forEach((entry) => {
      entry.backArrow.material.color.set(getThemeNonShardHex(this.theme));
    });
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
    const usedEntries = new Set<(typeof this.pool)[number]>();
    this.assignedIds.clear();

    this.pool.forEach((entry) => {
      if (entry.activeId && !activeIds.has(entry.activeId) && !entry.dying && entry.group.visible) {
        entry.dying = true;
        entry.deathStartedAt = elapsedTime;
      }
    });

    markers.forEach((marker, markerIndex) => {
      if (!marker.visible) {
        return;
      }
      const entry =
        this.pool.find((candidate) => candidate.activeId === marker.id) ??
        this.pool.find((candidate) => !usedEntries.has(candidate) && !candidate.dying && !candidate.group.visible) ??
        this.pool.find((candidate) => !usedEntries.has(candidate) && !candidate.dying && candidate.activeId === null) ??
        this.pool.find((candidate) => !usedEntries.has(candidate) && !candidate.dying) ??
        this.pool[markerIndex % this.pool.length];

      if (!entry) {
        return;
      }

      usedEntries.add(entry);
      this.assignedIds.add(marker.id);
      entry.activeId = marker.id;
      entry.dying = false;
      entry.group.visible = true;
      entry.body.mesh.material.opacity = 1;
      entry.body.mesh.material.color.set(marker.tier === 'invincible' ? '#F06A5A' : '#FFFFFF');
      entry.body.playLoop([0, 1, 2, 3], marker.tier === 'invincible' ? 4.8 : marker.tier === 'elite' ? 4.2 : 3.6, elapsedTime + markerIndex * 0.05);
      entry.backArrow.material.color.set(getThemeNonShardHex(this.theme));
      entry.backArrow.material.opacity = 0.95;
      entry.group.position.copy(marker.position);
      entry.group.position.z += 0.88;
      entry.group.rotation.set(0, 0, 0);
      const scale = marker.tier === 'elite' ? 0.85 : marker.tier === 'armored' ? 0.74 : marker.tier === 'invincible' ? 0.91 : 0.67;
      entry.group.scale.setScalar(scale);
      entry.body.group.scale.set(marker.mirrored ? -1 : 1, marker.pole === 'south' ? -1 : 1, 1);
      entry.body.group.position.set(0, marker.pole === 'north' ? 0.46 : -0.46, 0);
      entry.backArrow.position.set(0, marker.pole === 'north' ? -1.34 : 1.34, 0.02);
      entry.backArrow.rotation.z = marker.pole === 'north' ? Math.PI : 0;
    });

    this.pool.forEach((entry) => {
      if (entry.activeId && this.assignedIds.has(entry.activeId)) {
        return;
      }
      if (!entry.activeId && !entry.dying) {
        entry.group.visible = false;
        return;
      }
      if (!entry.dying) {
        entry.group.visible = false;
        entry.activeId = null;
        return;
      }
      if (entry.dying) {
        const deathElapsed = elapsedTime - entry.deathStartedAt;
        if (deathElapsed >= 0.72) {
          entry.group.visible = false;
          entry.activeId = null;
          entry.dying = false;
          return;
        }
        entry.group.visible = true;
        entry.body.playLoop([4, 5, 6, 7], 4.4, deathElapsed);
        const fade = Math.max(0, 1 - deathElapsed / 0.72);
        entry.body.mesh.material.opacity = fade;
        entry.backArrow.material.opacity = fade;
      }
    });
  }
}
