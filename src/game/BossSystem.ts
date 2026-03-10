import * as THREE from 'three';
import type { ThemeMode } from '../types/content';

type BossPhase = 'idle' | 'chase' | 'chaos' | 'weak_point' | 'defeated';

const DANGER = '#D9624E';

export class BossSystem {
  private readonly group = new THREE.Group();
  private readonly bossMesh: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>;
  private readonly weakPointMesh: THREE.Mesh<THREE.OctahedronGeometry, THREE.MeshBasicMaterial>;
  private phase: BossPhase = 'idle';
  private phaseEndsAt = 0;
  private active = false;
  private defeated = false;
  private weakPointVisible = false;
  private weakPointPosition = new THREE.Vector3();

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.bossMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.8, 1),
      new THREE.MeshBasicMaterial({ color: theme === 'dark' ? DANGER : '#8E4130', transparent: true, opacity: 0.9 })
    );
    this.weakPointMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.78, 0),
      new THREE.MeshBasicMaterial({ color: DANGER, transparent: true, opacity: 0.96 })
    );
    this.bossMesh.visible = false;
    this.weakPointMesh.visible = false;
    this.group.add(this.bossMesh, this.weakPointMesh);
    scene.add(this.group);
  }

  setTheme(theme: ThemeMode) {
    this.bossMesh.material.color.set(theme === 'dark' ? DANGER : '#8E4130');
    this.weakPointMesh.material.color.set(DANGER);
  }

  reset() {
    this.active = false;
    this.defeated = false;
    this.phase = 'idle';
    this.phaseEndsAt = 0;
    this.weakPointVisible = false;
    this.bossMesh.visible = false;
    this.weakPointMesh.visible = false;
  }

  start(elapsedTime: number) {
    this.active = true;
    this.defeated = false;
    this.phase = 'chase';
    this.phaseEndsAt = elapsedTime + 6;
    this.bossMesh.visible = true;
  }

  isActive() {
    return this.active && !this.defeated;
  }

  isWeakPointPhase() {
    return this.phase === 'weak_point';
  }

  getSpeedPressure() {
    if (this.phase === 'chaos') return 1.24;
    if (this.phase === 'chase') return 1.12;
    return 1;
  }

  getCameraZoomOffset() {
    if (!this.active) return 0;
    if (this.phase === 'weak_point') return 9.5;
    if (this.phase === 'chaos') return 5.6;
    return 3.2;
  }

  update(deltaTime: number, elapsedTime: number, playerPosition: THREE.Vector3) {
    if (!this.active || this.defeated) {
      this.bossMesh.visible = false;
      this.weakPointMesh.visible = false;
      return { playerHit: false };
    }

    if (elapsedTime >= this.phaseEndsAt) {
      if (this.phase === 'chase') {
        this.phase = 'chaos';
        this.phaseEndsAt = elapsedTime + 8;
      } else if (this.phase === 'chaos') {
        this.phase = 'weak_point';
        this.phaseEndsAt = elapsedTime + 10;
        this.weakPointVisible = true;
      }
    }

    this.bossMesh.visible = true;
    this.bossMesh.position.set(playerPosition.x - (this.phase === 'weak_point' ? 10.5 : 8.6), playerPosition.y + Math.sin(elapsedTime * 1.2) * 2.4, 0);
    this.bossMesh.rotation.y += deltaTime * 0.32;
    this.bossMesh.rotation.z += deltaTime * 0.18;
    this.bossMesh.scale.setScalar(this.phase === 'chaos' ? 1.2 : 1);

    this.weakPointMesh.visible = this.weakPointVisible;
    if (this.weakPointVisible) {
      this.weakPointMesh.position.copy(this.weakPointPosition);
      this.weakPointMesh.rotation.y += deltaTime * 1.8;
      this.weakPointMesh.scale.setScalar(1 + Math.sin(elapsedTime * 6) * 0.08);
    }

    const playerHit = this.phase !== 'weak_point' && this.bossMesh.position.distanceTo(playerPosition) < 2.2;
    return { playerHit };
  }

  setWeakPoint(position: THREE.Vector3) {
    this.weakPointPosition.copy(position);
    this.weakPointVisible = this.phase === 'weak_point';
  }

  defeat() {
    this.defeated = true;
    this.active = false;
    this.phase = 'defeated';
    this.weakPointVisible = false;
    this.bossMesh.visible = false;
    this.weakPointMesh.visible = false;
  }
}
