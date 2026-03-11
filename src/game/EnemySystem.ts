import * as THREE from 'three';
import type { ThemeMode } from '../types/content';
import type { GameEnemyTier } from './gameSessionTypes';

export interface EnemyMarker {
  position: THREE.Vector3;
  visible: boolean;
  tier: GameEnemyTier;
  pole: 'north' | 'south';
}

function getTierColor(theme: ThemeMode, tier: GameEnemyTier) {
  if (tier === 'invincible') return new THREE.Color('#F06A5A');
  if (tier === 'elite') return new THREE.Color(theme === 'dark' ? '#E18C70' : '#A14D38');
  if (tier === 'armored') return new THREE.Color(theme === 'dark' ? '#C9775B' : '#8E4130');
  return new THREE.Color(theme === 'dark' ? '#D4BF9B' : '#393F4A');
}

export class EnemySystem {
  private readonly group = new THREE.Group();
  private readonly pool: Array<{
    group: THREE.Group;
    body: THREE.Mesh<THREE.TetrahedronGeometry, THREE.MeshBasicMaterial>;
    backArrow: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  }> = [];
  private theme: ThemeMode;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    for (let index = 0; index < 18; index += 1) {
      const group = new THREE.Group();
      const material = new THREE.MeshBasicMaterial({ color: getTierColor(theme, 'light'), transparent: true, opacity: 0.95 });
      const body = new THREE.Mesh(new THREE.TetrahedronGeometry(0.42, 0), material);
      const backArrow = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.34, 3),
        new THREE.MeshBasicMaterial({ color: theme === 'dark' ? '#393F4A' : '#D4BF9B', transparent: true, opacity: 0.95 })
      );
      backArrow.rotation.z = Math.PI;
      group.add(body, backArrow);
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
      entry.body.material.color.copy(getTierColor(this.theme, marker.tier));
      entry.backArrow.material.color.set(this.theme === 'dark' ? '#393F4A' : '#D4BF9B');
      entry.group.position.copy(marker.position);
      entry.group.rotation.y = elapsedTime * 0.8 + index * 0.18;
      const scale = marker.tier === 'elite' ? 1.16 : marker.tier === 'armored' ? 1.04 : marker.tier === 'invincible' ? 1.24 : 0.92;
      entry.group.scale.setScalar(scale);
      entry.backArrow.position.set(0, marker.pole === 'north' ? -0.66 : 0.66, 0);
      entry.backArrow.rotation.z = marker.pole === 'north' ? Math.PI : 0;
    });
  }
}
