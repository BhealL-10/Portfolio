import * as THREE from 'three';
import { damp } from '../core/math';
import { getDifficultyProfile } from './difficultyScaler';
import type { GameSessionState, ResolvedGamePathNode } from './gameSessionTypes';

export class CameraRailController {
  private static readonly CAMERA_CENTER_OFFSET = 1.6;
  private readonly position = new THREE.Vector3();
  private readonly lookAt = new THREE.Vector3();
  private currentFocus = new THREE.Vector2();
  private targetFocus = new THREE.Vector2();
  private currentZoom = 18.8;
  private targetZoom = 18.8;
  private railX = -12;
  private safeLeft = -Infinity;
  private safeRight = Infinity;
  private safeTop = Infinity;
  private safeBottom = -Infinity;
  private readonly fov = 42;

  reset(node: ResolvedGamePathNode) {
    this.railX = node.resolvedX - 4.4;
    this.currentFocus.set(node.resolvedX + 4.2, node.resolvedY);
    this.targetFocus.copy(this.currentFocus);
    this.currentZoom = 18.8;
    this.targetZoom = 18.8;
    this.position.set(this.currentFocus.x - CameraRailController.CAMERA_CENTER_OFFSET, node.resolvedY + 0.18, this.currentZoom);
    this.lookAt.set(this.currentFocus.x, node.resolvedY, 0);
    this.safeLeft = -Infinity;
    this.safeRight = Infinity;
    this.safeTop = Infinity;
    this.safeBottom = -Infinity;
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

    this.railX = Math.max(this.railX, playerPosition.x - profile.cameraLookAhead);
    const desiredX = this.railX + profile.cameraLookAhead;
    const routeY = currentNode.resolvedY * 0.64 + nextNode.resolvedY * 0.36;
    const laneFocusBias = Math.pow(momentumGauge, 0.85);
    const desiredY = THREE.MathUtils.lerp(0, routeY, 0.28 + laneFocusBias * 0.72);

    this.targetFocus.set(desiredX, desiredY);
    const horizontalCatchup =
      playerPosition.x >= this.currentFocus.x - 0.08
        ? Math.max(12, profile.cameraCatchupSpeed * 4.2)
        : Math.max(4.4, profile.cameraCatchupSpeed * 1.25);
    const nextFocusX = damp(this.currentFocus.x, this.targetFocus.x, horizontalCatchup, deltaTime);
    this.currentFocus.x = Math.max(this.currentFocus.x, playerPosition.x - 0.08, nextFocusX);
    this.currentFocus.y = damp(this.currentFocus.y, this.targetFocus.y, 1.75 + laneFocusBias * 1.35, deltaTime);

    const momentumZoom = profile.momentumZoomRange * Math.pow(momentumGauge, 0.82);
    this.targetZoom =
      profile.baseZoom +
      momentumZoom +
      profile.largeShardZoom * largeShardFactor +
      milestoneZoom +
      choiceZoom +
      bossZoom;
    this.currentZoom = damp(this.currentZoom, this.targetZoom, state === 'upgrade_branching' ? 1.9 : 2.6, deltaTime);

    this.position.set(this.currentFocus.x - CameraRailController.CAMERA_CENTER_OFFSET, this.currentFocus.y + 0.18, this.currentZoom);
    this.lookAt.set(this.currentFocus.x, this.currentFocus.y, 0);

    const aspect = Math.max(0.5, window.innerWidth / Math.max(1, window.innerHeight));
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(this.fov * 0.5)) * this.currentZoom;
    const halfWidth = halfHeight * aspect;
    this.safeLeft = this.lookAt.x - halfWidth * 0.94;
    this.safeRight = this.lookAt.x + halfWidth * 0.94;
    this.safeTop = this.lookAt.y + halfHeight * 0.94;
    this.safeBottom = this.lookAt.y - halfHeight * 0.94;
  }

  isBehindSafeLine(position: THREE.Vector3) {
    return position.x < this.safeLeft;
  }

  isOutsideVerticalBounds(position: THREE.Vector3, padding = 0.02) {
    const span = this.safeTop - this.safeBottom;
    const margin = span * padding;
    return position.y <= this.safeBottom + margin || position.y >= this.safeTop - margin;
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

  getSafeRight() {
    return this.safeRight;
  }
}
