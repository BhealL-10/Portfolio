import * as THREE from 'three';
import { damp } from '../core/math';
import { getDifficultyProfile } from './difficultyScaler';
import type { GameSessionState, ResolvedGamePathNode } from './gameSessionTypes';

export class CameraRailController {
  private readonly position = new THREE.Vector3();
  private readonly lookAt = new THREE.Vector3();
  private currentFocus = new THREE.Vector2();
  private targetFocus = new THREE.Vector2();
  private currentZoom = 16.5;
  private targetZoom = 16.5;
  private railX = -12;
  private safeLeft = -Infinity;
  private readonly fov = 42;

  reset(node: ResolvedGamePathNode) {
    this.railX = node.resolvedX - 2.4;
    this.currentFocus.set(node.resolvedX, node.resolvedY);
    this.targetFocus.copy(this.currentFocus);
    this.currentZoom = 16.5;
    this.targetZoom = 16.5;
    this.position.set(node.resolvedX, node.resolvedY + 0.24, this.currentZoom);
    this.lookAt.set(node.resolvedX + 1.8, node.resolvedY, 0);
    this.safeLeft = -Infinity;
  }

  update(config: {
    deltaTime: number;
    state: GameSessionState;
    score: number;
    currentNode: ResolvedGamePathNode;
    nextNode: ResolvedGamePathNode;
    playerPosition: THREE.Vector3;
    momentumGauge: number;
    largeShardFactor: number;
    milestoneZoom: number;
    choiceZoom: number;
    bossZoom: number;
    speedPressure: number;
  }) {
    const {
      deltaTime,
      state,
      score,
      currentNode,
      nextNode,
      playerPosition,
      momentumGauge,
      largeShardFactor,
      milestoneZoom,
      choiceZoom,
      bossZoom,
      speedPressure
    } = config;
    const profile = getDifficultyProfile(score);
    const running = state === 'running_attached' || state === 'running_charging' || state === 'running_airborne';

    if (running) {
      this.railX += profile.cameraSpeed * speedPressure * deltaTime;
    }

    const playerAhead = playerPosition.x > this.currentFocus.x;
    const desiredX = playerAhead
      ? Math.max(this.railX + profile.cameraLookAhead, playerPosition.x)
      : Math.max(this.railX + profile.cameraLookAhead, currentNode.resolvedX + 1.1);
    const desiredY = playerPosition.y * 0.42 + currentNode.resolvedY * 0.34 + nextNode.resolvedY * 0.24;

    this.targetFocus.set(desiredX, desiredY);
    this.currentFocus.x = damp(this.currentFocus.x, this.targetFocus.x, 2.4, deltaTime);
    this.currentFocus.y = damp(this.currentFocus.y, this.targetFocus.y, 2.8, deltaTime);

    this.targetZoom =
      profile.baseZoom +
      profile.momentumZoomRange * momentumGauge +
      profile.largeShardZoom * largeShardFactor +
      milestoneZoom +
      choiceZoom +
      bossZoom;
    this.currentZoom = damp(this.currentZoom, this.targetZoom, state === 'upgrade_branching' ? 1.7 : 2.2, deltaTime);

    this.position.set(this.currentFocus.x, this.currentFocus.y + 0.3, this.currentZoom);
    this.lookAt.set(this.currentFocus.x + 1.8, this.currentFocus.y, 0);

    const aspect = Math.max(0.5, window.innerWidth / Math.max(1, window.innerHeight));
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(this.fov * 0.5)) * this.currentZoom;
    const halfWidth = halfHeight * aspect;
    this.safeLeft = this.lookAt.x - halfWidth * 0.96;
  }

  isBehindSafeLine(position: THREE.Vector3) {
    return position.x < this.safeLeft;
  }

  isOutsideViewport(position: THREE.Vector3, padding = 0.04) {
    const aspect = Math.max(0.5, window.innerWidth / Math.max(1, window.innerHeight));
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(this.fov * 0.5)) * this.currentZoom;
    const halfWidth = halfHeight * aspect;
    const minX = this.lookAt.x - halfWidth * (1 - padding);
    const maxX = this.lookAt.x + halfWidth * (1 - padding);
    const minY = this.lookAt.y - halfHeight * (1 - padding);
    const maxY = this.lookAt.y + halfHeight * (1 - padding);
    return position.x <= minX || position.x >= maxX || position.y <= minY || position.y >= maxY;
  }

  getPose() {
    return {
      position: this.position.clone(),
      lookAt: this.lookAt.clone()
    };
  }

  getZoom() {
    return this.currentZoom;
  }

  getSafeLeft() {
    return this.safeLeft;
  }
}
