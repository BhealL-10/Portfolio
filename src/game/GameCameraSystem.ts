import * as THREE from 'three';
import { clamp, damp } from '../core/math';
import { getDifficultyProfile } from './difficultyScaler';
import type { BranchChoice, GameSessionState, MomentumState, ResolvedGamePathNode } from './gameSessionTypes';
import { GamePathSystem } from './GamePathSystem';

export class GameCameraSystem {
  private readonly position = new THREE.Vector3();
  private readonly lookAt = new THREE.Vector3();
  private readonly focus = new THREE.Vector3();
  private readonly tangent = new THREE.Vector3(1, 0, 0);
  private targetPathDistance = 0;
  private currentPathDistance = 0;
  private targetZoom = 24;
  private currentZoom = 24;
  private safeProgress = -Infinity;
  private readonly fov = 42;

  reset(node: ResolvedGamePathNode) {
    this.targetPathDistance = Math.max(0, node.pathDistance - 6.2);
    this.currentPathDistance = this.targetPathDistance;
    this.focus.set(node.resolvedX, node.resolvedY, 0);
    this.tangent.set(1, 0, 0);
    this.targetZoom = 24;
    this.currentZoom = 24;
    this.safeProgress = -Infinity;
    this.position.set(node.resolvedX, node.resolvedY + 0.28, this.currentZoom);
    this.lookAt.set(node.resolvedX + 2, node.resolvedY, 0);
  }

  update(
    deltaTime: number,
    sessionState: GameSessionState,
    score: number,
    path: GamePathSystem,
    currentNode: ResolvedGamePathNode,
    branchChoices: BranchChoice[],
    momentum: MomentumState
  ) {
    const profile = getDifficultyProfile(score);
    const cameraAdvances = sessionState === 'running_attached' || sessionState === 'running_charging' || sessionState === 'running_airborne';

    if (cameraAdvances) {
      const targetAdvance = profile.cameraSpeed * momentum.speedMultiplier * deltaTime;
      this.targetPathDistance += targetAdvance;
    }

    this.currentPathDistance = damp(this.currentPathDistance, this.targetPathDistance, 2.4, deltaTime);
    if (this.currentPathDistance > this.targetPathDistance) {
      this.currentPathDistance = this.targetPathDistance;
    }

    const sampled = path.sampleAtDistance(this.currentPathDistance);
    this.tangent.set(sampled.tangent.x, sampled.tangent.y, 0);

    let targetFocusX = sampled.x + sampled.tangent.x * (profile.cameraLookAhead + momentum.chainTier * 1.4);
    let targetFocusY = sampled.y + sampled.tangent.y * (4.1 + momentum.cameraZoomMultiplier * 1.2);
    this.targetZoom = 24 + momentum.cameraZoomMultiplier * 7.8;

    if (sessionState === 'upgrade_branching' && branchChoices.length > 0) {
      const centroid = branchChoices.reduce(
        (acc, branch) => {
          acc.x += branch.entry.x;
          acc.y += branch.entry.y;
          return acc;
        },
        { x: currentNode.resolvedX, y: currentNode.resolvedY }
      );
      targetFocusX = centroid.x / (branchChoices.length + 1);
      targetFocusY = centroid.y / (branchChoices.length + 1);
      this.targetZoom = 36 + momentum.cameraZoomMultiplier * 4.8;
    } else if (sessionState === 'upgrade_acquired') {
      this.targetZoom = 28 + momentum.cameraZoomMultiplier * 3.2;
    } else if (sessionState === 'game_over') {
      this.targetZoom = 25;
    }

    const focusDamp = sessionState === 'upgrade_branching' ? 2.2 : 2.8;
    this.focus.x = damp(this.focus.x, targetFocusX, focusDamp, deltaTime);
    this.focus.y = damp(this.focus.y, targetFocusY, sessionState === 'upgrade_branching' ? 2.1 : 3.1, deltaTime);
    this.currentZoom = damp(this.currentZoom, this.targetZoom, sessionState === 'upgrade_branching' ? 1.8 : 2.2, deltaTime);

    this.position.set(this.focus.x, this.focus.y + 0.32, this.currentZoom);
    this.lookAt.set(this.focus.x + this.tangent.x * 2.4, this.focus.y + this.tangent.y * 1.7, 0);
    const zoomSafeDistance = clamp(profile.safeZoneDistance + (this.currentZoom - 24) * 0.78, profile.safeZoneDistance * 0.55, profile.safeZoneDistance * 1.9);
    this.safeProgress = this.computeProgress(sampled.x, sampled.y, sampled.tangent.x, sampled.tangent.y) - zoomSafeDistance;
  }

  isBehindSafeLine(position: THREE.Vector3) {
    const forwardX = this.lookAt.x - this.position.x;
    const forwardY = this.lookAt.y - this.position.y;
    const length = Math.hypot(forwardX, forwardY) || 1;
    const progress = this.computeProgress(position.x, position.y, forwardX / length, forwardY / length);
    return progress < this.safeProgress;
  }

  isOutsideViewport(position: THREE.Vector3, padding = 0.05) {
    const aspect = Math.max(0.5, window.innerWidth / Math.max(1, window.innerHeight));
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(this.fov * 0.5)) * this.position.z;
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

  private computeProgress(x: number, y: number, dirX: number, dirY: number) {
    return x * clamp(dirX, -1, 1) + y * clamp(dirY, -1, 1);
  }
}
