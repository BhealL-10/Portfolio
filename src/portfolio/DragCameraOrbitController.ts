import * as THREE from 'three';
import { clamp, damp } from '../core/math';

export class DragCameraOrbitController {
  private yaw = 0;
  private pitch = 0.24;
  private radius = 24;
  private yawTarget = 0;
  private pitchTarget = 0.24;
  private radiusTarget = 24;
  private readonly pose = new THREE.Vector3();
  private readonly lookAt = new THREE.Vector3();

  setRadius(radius: number) {
    this.radius = radius;
    this.radiusTarget = radius;
  }

  orbit(deltaX: number, deltaY: number) {
    this.yawTarget += deltaX * 0.0065;
    this.pitchTarget = clamp(this.pitchTarget + deltaY * 0.0032, -0.48, 0.52);
  }

  update(deltaTime: number, pivot: THREE.Vector3) {
    this.yaw = damp(this.yaw, this.yawTarget, 10, deltaTime);
    this.pitch = damp(this.pitch, this.pitchTarget, 10, deltaTime);
    this.radius = damp(this.radius, this.radiusTarget, 8, deltaTime);

    const cosPitch = Math.cos(this.pitch);
    this.pose.set(
      pivot.x + Math.sin(this.yaw) * this.radius * cosPitch,
      pivot.y + Math.sin(this.pitch) * this.radius * 0.9 + 0.8,
      pivot.z + Math.cos(this.yaw) * this.radius * cosPitch
    );

    this.lookAt.copy(pivot);
    return {
      position: this.pose.clone(),
      lookAt: this.lookAt.clone()
    };
  }
}
