import * as THREE from 'three';
import { damp } from '../core/math';
import { getDifficultyProfile } from './difficultyScaler';
import { getDirectionVector } from './pathGenerator';
import type { ResolvedPathNode } from './pathTypes';

type CameraGameState = 'transition' | 'running' | 'upgrade_choice' | 'game_over';

export class CameraPathController {
  private readonly focus = new THREE.Vector2();
  private readonly pressurePoint = new THREE.Vector2();
  private readonly forward = new THREE.Vector2(1, 0);
  private readonly desiredForward = new THREE.Vector2(1, 0);
  private readonly lateral = new THREE.Vector2(0, 1);
  private readonly position = new THREE.Vector3();
  private readonly lookAt = new THREE.Vector3();
  private safeThreshold = -Infinity;
  private framingZoom = 24;
  private readonly fov = 42;

  reset(node: ResolvedPathNode) {
    this.focus.set(node.resolvedX, node.resolvedY);
    this.pressurePoint.set(node.resolvedX - 4.5, node.resolvedY);
    this.forward.set(1, 0);
    this.desiredForward.set(1, 0);
    this.lateral.set(0, 1);
    this.safeThreshold = -Infinity;
    this.framingZoom = 24;
    this.position.set(node.resolvedX, node.resolvedY + 0.4, 24);
    this.lookAt.set(node.resolvedX, node.resolvedY + 0.2, 0);
  }

  update(
    deltaTime: number,
    state: CameraGameState,
    score: number,
    playerPosition: THREE.Vector3,
    currentNode: ResolvedPathNode,
    nextNode: ResolvedPathNode,
    choiceNodes: ResolvedPathNode[] = []
  ) {
    const profile = getDifficultyProfile(score);
    const vector = score < 50
      ? { x: 1, y: 0 }
      : getDirectionVector(nextNode?.direction ?? currentNode.direction);

    this.desiredForward.set(vector.x, vector.y).normalize();
    this.forward.x = damp(this.forward.x, this.desiredForward.x, 6, deltaTime);
    this.forward.y = damp(this.forward.y, this.desiredForward.y, 6, deltaTime);
    if (this.forward.lengthSq() < 0.0001) {
      this.forward.set(1, 0);
    } else {
      this.forward.normalize();
    }
    this.lateral.set(-this.forward.y, this.forward.x).normalize();

    if (state === 'running') {
      this.pressurePoint.addScaledVector(this.forward, profile.cameraSpeed * deltaTime);
    }

    const playerProgress = playerPosition.x * this.forward.x + playerPosition.y * this.forward.y;
    const pressureProgress = this.pressurePoint.x * this.forward.x + this.pressurePoint.y * this.forward.y;
    const desiredProgress = Math.max(playerProgress + profile.cameraLookAhead, pressureProgress + profile.cameraLookAhead);
    const currentProgress = this.focus.x * this.forward.x + this.focus.y * this.forward.y;
    const progressDelta = desiredProgress - currentProgress;
    this.focus.addScaledVector(this.forward, progressDelta * Math.min(1, deltaTime * 3.1));

    const currentTarget = new THREE.Vector2(currentNode.resolvedX, currentNode.resolvedY);
    const nextTarget = new THREE.Vector2(nextNode.resolvedX, nextNode.resolvedY);
    const playerLateral = playerPosition.x * this.lateral.x + playerPosition.y * this.lateral.y;
    const currentLateral = currentTarget.x * this.lateral.x + currentTarget.y * this.lateral.y;
    const nextLateral = nextTarget.x * this.lateral.x + nextTarget.y * this.lateral.y;
    const desiredLateral = playerLateral * 0.48 + currentLateral * 0.32 + nextLateral * 0.2;
    const focusLateral = this.focus.x * this.lateral.x + this.focus.y * this.lateral.y;
    const lateralDelta = desiredLateral - focusLateral;
    this.focus.addScaledVector(this.lateral, lateralDelta * Math.min(1, deltaTime * 2.1));
    let targetZoom = 24;

    if (state === 'upgrade_choice' && choiceNodes.length > 0) {
      const centroid = choiceNodes.reduce(
        (acc, node) => acc.add(new THREE.Vector2(node.resolvedX, node.resolvedY)),
        currentTarget.clone()
      ).multiplyScalar(1 / (choiceNodes.length + 1));
      this.focus.x = damp(this.focus.x, centroid.x, 1.9, deltaTime);
      this.focus.y = damp(this.focus.y, centroid.y, 1.8, deltaTime);
      targetZoom = 34;
    } else {
      const desiredFocusX = playerPosition.x * 0.56 + currentTarget.x * 0.26 + nextTarget.x * 0.18 + this.forward.x * profile.cameraLookAhead;
      const desiredFocusY = playerPosition.y * 0.54 + currentTarget.y * 0.26 + nextTarget.y * 0.2 + this.forward.y * (profile.cameraLookAhead * 0.82);
      this.focus.x = damp(this.focus.x, desiredFocusX, 2.2, deltaTime);
      this.focus.y = damp(this.focus.y, desiredFocusY, 2, deltaTime);
    }

    this.safeThreshold = pressureProgress - profile.safeZoneDistance;
    this.framingZoom = damp(this.framingZoom, targetZoom, 2.6, deltaTime);

    this.position.set(this.focus.x, this.focus.y + 0.45, this.framingZoom);
    this.lookAt.set(this.focus.x, this.focus.y + 0.18, 0);
  }

  isOutsideSafeZone(position: THREE.Vector3) {
    const progress = position.x * this.forward.x + position.y * this.forward.y;
    return progress < this.safeThreshold;
  }

  isOutsideViewport(position: THREE.Vector3, padding = 0.12) {
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
}
