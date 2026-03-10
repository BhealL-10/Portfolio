import * as THREE from 'three';
import type { ThemeMode } from '../types/content';
import type { GameEnemyTier } from './gameSessionTypes';

export interface EnemyMarker {
  position: THREE.Vector3;
  visible: boolean;
  tier: GameEnemyTier;
}

function getTierColor(theme: ThemeMode, tier: GameEnemyTier) {
  if (tier === 'invincible') return new THREE.Color('#F06A5A');
  if (tier === 'elite') return new THREE.Color(theme === 'dark' ? '#E18C70' : '#A14D38');
  if (tier === 'armored') return new THREE.Color(theme === 'dark' ? '#C9775B' : '#8E4130');
  return new THREE.Color(theme === 'dark' ? '#D4BF9B' : '#393F4A');
}

export class EnemySystem {
  private readonly group = new THREE.Group();
  private readonly pool: THREE.Mesh<THREE.OctahedronGeometry, THREE.MeshBasicMaterial>[] = [];
  private theme: ThemeMode;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    for (let index = 0; index < 18; index += 1) {
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.38, 0),
        new THREE.MeshBasicMaterial({ color: getTierColor(theme, 'light'), transparent: true, opacity: 0.95 })
      );
      mesh.visible = false;
      this.pool.push(mesh);
      this.group.add(mesh);
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
    this.pool.forEach((mesh) => {
      mesh.visible = false;
    });
  }

  update(markers: EnemyMarker[], elapsedTime: number) {
    this.pool.forEach((mesh, index) => {
      const marker = markers[index];
      if (!marker || !marker.visible) {
        mesh.visible = false;
        return;
      }

      mesh.visible = true;
      mesh.material.color.copy(getTierColor(this.theme, marker.tier));
      mesh.position.copy(marker.position);
      mesh.rotation.y = elapsedTime * 0.8 + index * 0.18;
      const scale = marker.tier === 'elite' ? 1.16 : marker.tier === 'armored' ? 1.04 : marker.tier === 'invincible' ? 1.24 : 0.92;
      mesh.scale.setScalar(scale);
    });
  }
}
