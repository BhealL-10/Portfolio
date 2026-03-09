import * as THREE from 'three';
import { damp } from '../core/math';

export class DragCameraOrbitController {
  private yaw = 0;
  private radius = 26.5;
  private yawTarget = 0;
  private radiusTarget = 26.5;
  private readonly height = 2.6;
  private readonly pose = new THREE.Vector3();
  private readonly lookAt = new THREE.Vector3();

  setRadius(radius: number) {
    this.radius = radius;
    this.radiusTarget = radius;
  }

  orbit(deltaX: number, deltaY: number) {
    this.yawTarget += deltaX * 0.0065;
  }

  update(deltaTime: number, pivot: THREE.Vector3) {
    this.yaw = damp(this.yaw, this.yawTarget, 10, deltaTime);
    this.radius = damp(this.radius, this.radiusTarget, 8, deltaTime);
    this.pose.set(
      pivot.x + Math.sin(this.yaw) * this.radius,
      pivot.y + this.height,
      pivot.z + Math.cos(this.yaw) * this.radius
    );

    this.lookAt.copy(pivot);
    return {
      position: this.pose.clone(),
      lookAt: this.lookAt.clone()
    };
  }
}
