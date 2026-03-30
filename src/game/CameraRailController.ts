import * as THREE from 'three';
import { damp } from '../core/math';
import { getDifficultyProfile } from './difficultyScaler';
import type { GameSessionState, ResolvedGamePathNode } from './gameSessionTypes';

interface CameraFocusLock {
  mode: 'milestone' | 'shop';
  focusX: number;
  focusY: number;
}

interface CameraRailUpdateConfig {
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
  focusLock: CameraFocusLock | null;
}

interface CameraFocusTarget {
  desiredX: number;
  desiredY: number;
  horizontalResponse: number;
  verticalResponse: number;
  clampToPlayer: boolean;
}

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

  update(config: CameraRailUpdateConfig) {
    const profile = getDifficultyProfile(config.score);
    const lockMode = config.focusLock?.mode ?? 'none';
    this.advanceRail(profile, config, lockMode);
    const focusTarget = this.resolveFocusTarget(profile, config, lockMode);
    this.applyFocusTarget(config.deltaTime, config.playerPosition, focusTarget);
    this.applyZoom(profile, config, lockMode);
    this.updatePose();
    this.updateSafeBounds();
  }

  private advanceRail(
    profile: ReturnType<typeof getDifficultyProfile>,
    config: CameraRailUpdateConfig,
    lockMode: CameraFocusLock['mode'] | 'none'
  ) {
    const running =
      (config.state === 'running_attached' || config.state === 'running_charging' || config.state === 'running_airborne') &&
      lockMode === 'none';
    const runPressure = 1 + Math.min(0.65, config.score / 420);
    if (running) {
      this.railX += profile.cameraSpeed * config.speedPressure * runPressure * config.deltaTime;
    }

    if (lockMode === 'none') {
      this.railX = Math.max(this.railX, config.playerPosition.x - profile.cameraLookAhead);
    }
  }

  private resolveFocusTarget(
    profile: ReturnType<typeof getDifficultyProfile>,
    config: CameraRailUpdateConfig,
    lockMode: CameraFocusLock['mode'] | 'none'
  ): CameraFocusTarget {
    if (config.focusLock) {
      return {
        desiredX: config.focusLock.focusX,
        desiredY: config.focusLock.focusY,
        horizontalResponse: lockMode === 'milestone' ? 7.8 : 7.2,
        verticalResponse: lockMode === 'milestone' ? 7.2 : 6.8,
        clampToPlayer: false
      };
    }

    const desiredX = config.currentNode.isGigantic ? config.currentNode.resolvedX + 0.4 : this.railX + profile.cameraLookAhead;
    const routeY = config.currentNode.isGigantic
      ? config.currentNode.resolvedY
      : config.currentNode.resolvedY * 0.64 + config.nextNode.resolvedY * 0.36;
    const laneFocusBias = Math.pow(config.momentumGauge, 0.85);
    const playerYOffset = config.playerPosition.y - routeY;
    const playerFollow = config.currentNode.isGigantic
      ? 0.18
      : THREE.MathUtils.clamp(0.36 + Math.min(0.4, Math.abs(playerYOffset) / 11) + laneFocusBias * 0.16, 0.36, 0.78);
    const desiredY = config.currentNode.isGigantic ? routeY : THREE.MathUtils.lerp(routeY, config.playerPosition.y, playerFollow);
    const horizontalCatchup =
      config.playerPosition.x >= this.currentFocus.x - 0.08
        ? Math.max(12, profile.cameraCatchupSpeed * 4.2)
        : Math.max(4.4, profile.cameraCatchupSpeed * 1.25);
    return {
      desiredX,
      desiredY,
      horizontalResponse: config.currentNode.isGigantic ? horizontalCatchup * 2.6 : horizontalCatchup,
      verticalResponse: config.currentNode.isGigantic ? 8.4 : 4.1 + laneFocusBias * 2.2,
      clampToPlayer: !config.currentNode.isGigantic
    };
  }

  private applyFocusTarget(deltaTime: number, playerPosition: THREE.Vector3, target: CameraFocusTarget) {
    this.targetFocus.set(target.desiredX, target.desiredY);
    const nextFocusX = damp(this.currentFocus.x, this.targetFocus.x, target.horizontalResponse, deltaTime);
    this.currentFocus.x = target.clampToPlayer
      ? Math.max(this.currentFocus.x, playerPosition.x - 0.08, nextFocusX)
      : nextFocusX;
    this.currentFocus.y = damp(this.currentFocus.y, this.targetFocus.y, target.verticalResponse, deltaTime);
  }

  private applyZoom(
    profile: ReturnType<typeof getDifficultyProfile>,
    config: CameraRailUpdateConfig,
    lockMode: CameraFocusLock['mode'] | 'none'
  ) {
    const momentumZoom = profile.momentumZoomRange * 1.28 * Math.min(1.45, Math.max(0, config.momentumGauge));
    this.targetZoom =
      profile.baseZoom +
      momentumZoom +
      profile.largeShardZoom * config.largeShardFactor +
      config.milestoneZoom +
      config.choiceZoom;
    const zoomResponse =
      lockMode === 'milestone'
        ? 7.6
        : lockMode === 'shop'
          ? 6.8
          : config.currentNode.isGigantic
            ? 8.8
            : config.state === 'upgrade_branching'
              ? 1.35
              : 1.55;
    this.currentZoom = damp(this.currentZoom, this.targetZoom, zoomResponse, config.deltaTime);
  }

  private updatePose() {
    this.position.set(this.currentFocus.x - CameraRailController.CAMERA_CENTER_OFFSET, this.currentFocus.y + 0.18, this.currentZoom);
    this.lookAt.set(this.currentFocus.x, this.currentFocus.y, 0);
  }

  private updateSafeBounds() {
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
