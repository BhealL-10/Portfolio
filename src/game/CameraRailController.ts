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
  private currentZoom = 11.8;
  private targetZoom = 11.8;
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
    this.currentZoom = 11.8;
    this.targetZoom = 11.8;
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
      speedPressure
    } = config;
    const profile = getDifficultyProfile(score);
    const milestoneLocked = currentNode.isGigantic && state !== 'running_airborne';
    const running = (state === 'running_attached' || state === 'running_charging' || state === 'running_airborne') && !milestoneLocked;
    const runPressure = 1 + Math.min(0.65, score / 420);

    if (running) {
      this.railX += profile.cameraSpeed * speedPressure * runPressure * deltaTime;
    }

    this.railX = Math.max(this.railX, playerPosition.x - profile.cameraLookAhead);
    const desiredX = milestoneLocked ? currentNode.resolvedX + 0.52 : currentNode.isGigantic ? currentNode.resolvedX + 0.4 : this.railX + profile.cameraLookAhead;
    const routeY = milestoneLocked ? currentNode.resolvedY : currentNode.isGigantic ? currentNode.resolvedY : currentNode.resolvedY * 0.64 + nextNode.resolvedY * 0.36;
    const laneFocusBias = Math.pow(momentumGauge, 0.85);
    const playerYOffset = playerPosition.y - routeY;
    const playerFollow = milestoneLocked
      ? 0.18
      : THREE.MathUtils.clamp(0.36 + Math.min(0.4, Math.abs(playerYOffset) / 11) + laneFocusBias * 0.16, 0.36, 0.78);
    const desiredY = milestoneLocked ? routeY : THREE.MathUtils.lerp(routeY, playerPosition.y, playerFollow);

    this.targetFocus.set(desiredX, desiredY);
    const horizontalCatchup =
      playerPosition.x >= this.currentFocus.x - 0.08
        ? Math.max(12, profile.cameraCatchupSpeed * 4.2)
        : Math.max(4.4, profile.cameraCatchupSpeed * 1.25);
    const nextFocusX = damp(this.currentFocus.x, this.targetFocus.x, milestoneLocked ? 7.8 : currentNode.isGigantic ? horizontalCatchup * 2.6 : horizontalCatchup, deltaTime);
    this.currentFocus.x = milestoneLocked
      ? nextFocusX
      : currentNode.isGigantic
        ? nextFocusX
        : Math.max(this.currentFocus.x, playerPosition.x - 0.08, nextFocusX);
    this.currentFocus.y = damp(this.currentFocus.y, this.targetFocus.y, milestoneLocked ? 7.2 : currentNode.isGigantic ? 8.4 : 4.1 + laneFocusBias * 2.2, deltaTime);

    const momentumZoom = profile.momentumZoomRange * 1.28 * Math.min(1.45, Math.max(0, momentumGauge));
    this.targetZoom =
      profile.baseZoom +
      momentumZoom +
      profile.largeShardZoom * largeShardFactor +
      milestoneZoom +
      choiceZoom;
    this.currentZoom = damp(this.currentZoom, this.targetZoom, milestoneLocked ? 7.6 : currentNode.isGigantic ? 8.8 : state === 'upgrade_branching' ? 1.35 : 1.55, deltaTime);

    this.position.set(this.currentFocus.x - CameraRailController.CAMERA_CENTER_OFFSET, this.currentFocus.y + 0.18, this.currentZoom);
    this.lookAt.set(this.currentFocus.x, this.currentFocus.y, 0);

    const aspect = Math.max(0.5, window.innerWidth / Math.max(1, window.innerHeight));
    const renderedHalfHeight = Math.tan(THREE.MathUtils.degToRad(this.fov * 0.5)) * this.currentZoom;
    const renderedHalfWidth = renderedHalfHeight * aspect;
    const gameplayHalfHeight = Math.max(renderedHalfHeight, 11.8);
    const gameplayHalfWidth = Math.max(renderedHalfWidth, 13.2);
    this.safeLeft = this.lookAt.x - gameplayHalfWidth * 0.94;
    this.safeRight = this.lookAt.x + gameplayHalfWidth * 0.94;
    this.safeTop = this.lookAt.y + gameplayHalfHeight * 0.94;
    this.safeBottom = this.lookAt.y - gameplayHalfHeight * 0.94;
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
