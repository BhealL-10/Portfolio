import * as THREE from 'three';
import type { ThemeMode } from '../types/content';

export interface CoinMarker {
  position: THREE.Vector3;
  scale: number;
  visible: boolean;
}

const ACCENT = '#D9624E';

export class CoinSystem {
  private readonly group = new THREE.Group();
  private readonly pool: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>[] = [];

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    const color = new THREE.Color(ACCENT);
    for (let index = 0; index < 36; index += 1) {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.08, 8, 18),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.96 })
      );
      mesh.visible = false;
      this.pool.push(mesh);
      this.group.add(mesh);
    }

    this.group.visible = false;
    scene.add(this.group);
    this.setTheme(theme);
  }

  setTheme(theme: ThemeMode) {
    const base = theme === 'dark' ? new THREE.Color(ACCENT) : new THREE.Color('#8B3E34');
    this.pool.forEach((mesh) => mesh.material.color.copy(base));
  }

  setVisible(visible: boolean) {
    this.group.visible = visible;
  }

  reset() {
    this.pool.forEach((mesh) => {
      mesh.visible = false;
    });
  }

  update(markers: CoinMarker[], elapsedTime: number) {
    this.pool.forEach((mesh, index) => {
      const marker = markers[index];
      if (!marker || !marker.visible) {
        mesh.visible = false;
        return;
      }

      mesh.visible = true;
      mesh.position.copy(marker.position);
      mesh.rotation.x = Math.PI * 0.5;
      mesh.rotation.y = elapsedTime * 1.8 + index * 0.24;
      mesh.scale.setScalar(marker.scale * (1 + Math.sin(elapsedTime * 4 + index) * 0.08));
    });
  }
}
