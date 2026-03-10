import * as THREE from 'three';
import { clamp, damp } from '../core/math';
import type { ThemeMode } from '../types/content';
import { createDeformMaterial, setDeformMaterialTheme, updateDeformUniforms, type DeformMaterial } from '../portfolio/shardMaterial';

interface AnchorData {
  x: number;
  y: number;
  z: number;
  radius: number;
}

interface PlatformMesh {
  group: THREE.Group;
  mesh: THREE.Mesh<THREE.IcosahedronGeometry, DeformMaterial>;
}

type GameState = 'idle' | 'transition' | 'running' | 'game_over';

const PLATFORM_POOL_SIZE = 18;
const PLAYER_RADIUS = 2.15;

export class GameModeController {
  private readonly group = new THREE.Group();
  private readonly renderPlatforms = false;
  private readonly pool: PlatformMesh[] = [];
  private readonly geometry = new THREE.IcosahedronGeometry(1.25, 4);
  private readonly player = new THREE.Group();
  private readonly playerBody: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
  private readonly cameraPosition = new THREE.Vector3();
  private readonly cameraLookAt = new THREE.Vector3();
  private readonly transitionFromPositions: THREE.Vector3[] = [];
  private readonly transitionToPositions: THREE.Vector3[] = [];
  private anchors: AnchorData[] = [];
  private theme: ThemeMode;
  private state: GameState = 'idle';
  private transitionProgress = 0;
  private visibleWindowStart = 0;
  private attachedAnchorIndex = 0;
  private currentTime = 0;
  private pressureX = -14;
  private playerPosition = new THREE.Vector3();
  private playerVelocity = new THREE.Vector3();
  private angle = -Math.PI * 0.58;
  private angularSpeed = 1.4;
  private accelerating = false;
  private score = 0;
  private highscore = Number(window.localStorage.getItem('portfolio-game-highscore') || 0);
  private scoreListeners = new Set<() => void>();

  constructor(private readonly scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    this.group.visible = false;
    this.scene.add(this.group);

    for (let index = 0; index < PLATFORM_POOL_SIZE; index += 1) {
      const material = createDeformMaterial(theme, 200 + index);
      const mesh = new THREE.Mesh(this.geometry, material);
      const group = new THREE.Group();
      group.add(mesh);
      this.group.add(group);
      this.pool.push({ group, mesh });
    }

    this.playerBody = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 1.2, 6),
      new THREE.MeshBasicMaterial({
        color: theme === 'dark' ? '#D4BF9B' : '#393F4A'
      })
    );
    this.playerBody.rotation.z = -Math.PI / 2;
    this.player.add(this.playerBody);
    this.player.visible = false;
    this.group.add(this.player);
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    this.pool.forEach((platform) => setDeformMaterialTheme(platform.mesh.material, theme));
    this.playerBody.material.color.set(theme === 'dark' ? '#D4BF9B' : '#393F4A');
  }

  get currentState() {
    return this.state;
  }

  get currentScore() {
    return this.score;
  }

  get bestScore() {
    return this.highscore;
  }

  onScoreChange(callback: () => void) {
    this.scoreListeners.add(callback);
    return () => this.scoreListeners.delete(callback);
  }

  getInitialPlatformPositions(count: number) {
    this.buildAnchors(Math.max(26, count + 4));
    return this.anchors.slice(0, count).map((anchor) => new THREE.Vector3(anchor.x, anchor.y, anchor.z));
  }

  getVisiblePlatformPositions(count: number) {
    this.ensureAnchors(this.visibleWindowStart + count + 2);
    return this.anchors.slice(this.visibleWindowStart, this.visibleWindowStart + count).map((anchor) => new THREE.Vector3(anchor.x, anchor.y, anchor.z));
  }

  startTransition(startPositions: THREE.Vector3[]) {
    this.transitionFromPositions.splice(0, this.transitionFromPositions.length, ...startPositions.map((position) => position.clone()));
    this.state = 'transition';
    this.transitionProgress = 0;
    this.group.visible = true;
    this.player.visible = false;
    this.player.userData.attached = false;
    this.accelerating = false;
    this.score = 0;
    this.currentTime = 0;
    this.pressureX = -14;
    this.buildAnchors(26);
    this.visibleWindowStart = 0;
    this.transitionToPositions.splice(
      0,
      this.transitionToPositions.length,
      ...this.anchors.slice(0, startPositions.length).map((anchor) => new THREE.Vector3(anchor.x, anchor.y, anchor.z))
    );
    this.syncTransitionPlatforms();
    this.emitScore();
  }

  prepareReturnTransition(endPositions: THREE.Vector3[]) {
    this.transitionFromPositions.splice(0, this.transitionFromPositions.length, ...endPositions.map((position) => position.clone()));
    this.transitionToPositions.splice(0, this.transitionToPositions.length, ...this.captureVisiblePlatformPositions(endPositions.length));
    this.state = 'transition';
    this.transitionProgress = 1;
    this.group.visible = true;
    this.player.visible = false;
    this.player.userData.attached = false;
    this.accelerating = false;
    this.syncTransitionPlatforms();
  }

  setTransitionProgress(progress: number) {
    this.transitionProgress = progress;
    this.syncTransitionPlatforms();
  }

  beginRun() {
    this.state = 'running';
    this.attachedAnchorIndex = 0;
    this.visibleWindowStart = 0;
    this.score = 0;
    this.currentTime = 0;
    this.pressureX = -14;
    this.angularSpeed = 1.4;
    this.attachToAnchor(0, false);
    this.player.visible = true;
    this.emitScore();
  }

  setAccelerating(active: boolean) {
    if (this.state !== 'running') return;
    this.accelerating = active;
  }

  jump() {
    if (this.state !== 'running') return;
    if (this.player.userData.attached !== true) return;

    const tangent = new THREE.Vector3(-Math.sin(this.angle), Math.cos(this.angle), 0).normalize();
    const launchSpeed = 4.9 + this.angularSpeed * 2.8;

    this.player.userData.attached = false;
    this.playerVelocity.copy(tangent).multiplyScalar(launchSpeed);
    this.playerVelocity.x += 1.05;
  }

  restart() {
    if (this.state === 'idle') return;
    this.startTransition(this.anchors.slice(0, 10).map((anchor) => new THREE.Vector3(anchor.x, anchor.y, anchor.z)));
    this.setTransitionProgress(1);
    this.beginRun();
  }

  stop() {
    this.state = 'idle';
    this.group.visible = false;
    this.player.visible = false;
    this.accelerating = false;
  }

  update(deltaTime: number, elapsedTime: number) {
    if (!this.group.visible) return;
    this.currentTime = elapsedTime;

    this.pool.forEach((platform, index) => {
      updateDeformUniforms(platform.mesh.material, {
        time: elapsedTime,
        hover: 0.18,
        drag: 0,
        focus: 0,
        settled: 0
      });
      platform.group.rotation.y += deltaTime * (0.16 + index * 0.01);
    });

    if (this.state === 'transition') {
      this.syncTransitionPlatforms();
      this.cameraPosition.set(2.8, 1.8, 24);
      this.cameraLookAt.set(2.8, 1.2, 0);
      return;
    }

    if (this.state === 'running') {
      this.ensureAnchors(this.attachedAnchorIndex + 20);
      this.updateRunning(deltaTime);
      this.syncVisiblePlatforms(elapsedTime);
    } else if (this.state === 'game_over') {
      this.syncVisiblePlatforms(elapsedTime);
    }

    this.pressureX += deltaTime * (2.35 + Math.min(2.2, this.score * 0.035));
    const focusX = Math.max(this.playerPosition.x + 3.6, this.pressureX + 7.8);
    this.cameraPosition.set(focusX, 1.4, 24);
    this.cameraLookAt.set(focusX, 1.4, 0);
  }

  getCameraPose() {
    return {
      position: this.cameraPosition.clone(),
      lookAt: this.cameraLookAt.clone()
    };
  }

  private updateRunning(deltaTime: number) {
    if (this.player.userData.attached === true) {
      const anchor = this.getResolvedAnchor(this.attachedAnchorIndex);
      const targetSpeed = this.accelerating ? 4.2 : Math.max(1.45, this.angularSpeed * 0.98);
      this.angularSpeed = damp(this.angularSpeed, targetSpeed, this.accelerating ? 2.4 : 0.9, deltaTime);
      this.angle += this.angularSpeed * deltaTime;
      this.playerPosition.set(
        anchor.x + Math.cos(this.angle) * PLAYER_RADIUS,
        anchor.y + Math.sin(this.angle) * PLAYER_RADIUS,
        0
      );
      this.player.rotation.z = this.angle + Math.PI / 2;
    } else {
      this.playerVelocity.y -= 8.8 * deltaTime;
      this.playerPosition.x += this.playerVelocity.x * deltaTime;
      this.playerPosition.y += this.playerVelocity.y * deltaTime;
      this.player.rotation.z = Math.atan2(this.playerVelocity.y, this.playerVelocity.x);

      if (this.tryCaptureAnchor()) {
        return;
      }

      if (this.playerPosition.y < -16 || this.playerPosition.x < this.pressureX - 1.8) {
        this.state = 'game_over';
        this.accelerating = false;
      }
    }

    this.player.position.copy(this.playerPosition);
  }

  private tryCaptureAnchor() {
    const searchStart = Math.max(0, this.attachedAnchorIndex + 1);
    const searchEnd = Math.min(this.anchors.length - 1, searchStart + 3);

    for (let index = searchStart; index <= searchEnd; index += 1) {
      const anchor = this.getResolvedAnchor(index);
      const distance = Math.hypot(this.playerPosition.x - anchor.x, this.playerPosition.y - anchor.y);
      if (distance <= anchor.radius + 1.15) {
        this.attachToAnchor(index, true);
        return true;
      }
    }

    return false;
  }

  private attachToAnchor(anchorIndex: number, preserveMotion: boolean) {
    const anchor = this.getResolvedAnchor(anchorIndex);
    this.attachedAnchorIndex = anchorIndex;
    this.visibleWindowStart = Math.max(this.visibleWindowStart, Math.max(0, anchorIndex - 3));
    this.player.userData.attached = true;

    if (preserveMotion) {
      const relative = this.playerPosition.clone().sub(new THREE.Vector3(anchor.x, anchor.y, anchor.z));
      if (relative.lengthSq() < 0.0001) {
        relative.set(1, 0, 0);
      }
      relative.setLength(PLAYER_RADIUS);
      this.angle = Math.atan2(relative.y, relative.x);

      const tangent = new THREE.Vector3(-Math.sin(this.angle), Math.cos(this.angle), 0);
      const preservedTangentialSpeed = Math.abs(this.playerVelocity.dot(tangent));
      this.angularSpeed = clamp(preservedTangentialSpeed / PLAYER_RADIUS, 1.15, 4.8);
      this.playerPosition.set(anchor.x + relative.x, anchor.y + relative.y, 0);
    } else {
      this.angle = -Math.PI * 0.58;
      this.angularSpeed = 1.45;
      this.playerPosition.set(
        anchor.x + Math.cos(this.angle) * PLAYER_RADIUS,
        anchor.y + Math.sin(this.angle) * PLAYER_RADIUS,
        0
      );
    }

    this.playerVelocity.set(0, 0, 0);
    this.player.rotation.z = this.angle + Math.PI / 2;
    this.score = anchorIndex;
    if (this.score > this.highscore) {
      this.highscore = this.score;
      window.localStorage.setItem('portfolio-game-highscore', String(this.highscore));
    }
    this.emitScore();
  }

  private emitScore() {
    this.scoreListeners.forEach((callback) => callback());
  }

  private buildAnchors(targetCount: number) {
    if (this.anchors.length > 0) return;

    this.anchors = [
      { x: -12, y: 0.8, z: 0, radius: 1.45 },
      { x: -4.4, y: 1.7, z: 0, radius: 1.5 },
      { x: 3.4, y: 0.25, z: 0, radius: 1.45 }
    ];
    this.ensureAnchors(targetCount);
  }

  private ensureAnchors(targetIndex: number) {
    const patterns = [
      [6.9, 1.1],
      [7.4, -1.0],
      [7.8, 0.65],
      [7.2, 1.4],
      [7.7, -1.45],
      [8.1, 0.4]
    ] as const;

    while (this.anchors.length <= targetIndex) {
      const previous = this.anchors[this.anchors.length - 1];
      const difficulty = Math.min(1, this.anchors.length / 34);
      const pattern = patterns[this.anchors.length % patterns.length];
      const x = previous.x + pattern[0] + difficulty * 2.9;
      const y = clamp(previous.y + pattern[1], -3.8, 4.8);

      this.anchors.push({
        x,
        y,
        z: 0,
        radius: 1.4 + Math.sin(this.anchors.length * 0.6) * 0.08
      });
    }
  }

  private syncTransitionPlatforms() {
    this.pool.forEach((platform, index) => {
      const start = this.transitionFromPositions[index];
      const target = this.transitionToPositions[index];
      if (!start || !target) {
        platform.group.visible = false;
        return;
      }

      platform.group.visible = this.renderPlatforms;
      platform.group.position.set(
        THREE.MathUtils.lerp(start.x, target.x, this.transitionProgress),
        THREE.MathUtils.lerp(start.y, target.y, this.transitionProgress),
        THREE.MathUtils.lerp(start.z, target.z, this.transitionProgress)
      );
      platform.group.scale.setScalar(1);
    });
  }

  private captureVisiblePlatformPositions(count: number) {
    return this.pool.slice(0, count).map((platform, index) => {
      if (!platform.group.visible) {
        const anchor = this.getResolvedAnchor(index);
        return new THREE.Vector3(anchor.x, anchor.y, anchor.z);
      }
      return platform.group.position.clone();
    });
  }

  private syncVisiblePlatforms(elapsedTime: number) {
    this.ensureAnchors(this.visibleWindowStart + PLATFORM_POOL_SIZE + 2);

    this.pool.forEach((platform, poolIndex) => {
      const anchor = this.getResolvedAnchor(this.visibleWindowStart + poolIndex);
      if (!anchor) {
        platform.group.visible = false;
        return;
      }

      platform.group.visible = this.renderPlatforms;
      platform.group.position.set(anchor.x, anchor.y, anchor.z);
      platform.group.scale.setScalar(anchor.radius / 1.4);
      platform.group.rotation.x = Math.sin(elapsedTime * 0.9 + poolIndex) * 0.12;
    });
  }

  private getResolvedAnchor(index: number): AnchorData {
    this.ensureAnchors(index + 1);
    const anchor = this.anchors[index];
    if (!anchor) {
      return { x: 0, y: 0, z: 0, radius: 1.4 };
    }

    if (this.score < 20) {
      return anchor;
    }

    const difficulty = Math.min(1, (this.score - 20) / 60);
    const wave = index * 0.7 + this.currentTime * (0.8 + difficulty * 0.55);
    const vertical = Math.sin(wave) * (0.35 + difficulty * 0.9);
    const horizontal = index > this.attachedAnchorIndex
      ? Math.cos(wave * 0.85 + index * 0.3) * (0.18 + difficulty * 0.55)
      : 0;

    return {
      x: anchor.x + horizontal,
      y: anchor.y + vertical,
      z: anchor.z,
      radius: anchor.radius
    };
  }
}
