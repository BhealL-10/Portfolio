import * as THREE from 'three';
import { clamp, damp } from '../core/math';

export class DragCameraOrbitController {
  private yaw = 0;
  private radius = 26.5;
  private yawTarget = 0;
  private radiusTarget = 26.5;
  private yawVelocity = 0;
  private readonly height = 2.6;
  private readonly pose = new THREE.Vector3();
  private readonly lookAt = new THREE.Vector3();

  setRadius(radius: number) {
    this.radius = radius;
    this.radiusTarget = radius;
  }

  orbit(deltaX: number, _deltaY: number) {
    const limitedDelta = clamp(deltaX, -10, 10);
    this.yawVelocity = clamp(this.yawVelocity + limitedDelta * 0.00085, -0.032, 0.032);
  }

  getYaw() {
    return this.yaw;
  }

  getYawTarget() {
    return this.yawTarget;
  }

  getRadius() {
    return this.radius;
  }

  stopMotion() {
    this.yawVelocity = 0;
    this.yawTarget = this.yaw;
  }

  settleMotion() {
    this.yawVelocity = 0;
  }

  alignToYaw(targetYaw: number) {
    const delta = Math.atan2(Math.sin(targetYaw - this.yaw), Math.cos(targetYaw - this.yaw));
    this.yawVelocity = 0;
    this.yawTarget = this.yaw + delta;
  }

  update(deltaTime: number, pivot: THREE.Vector3) {
    this.yawTarget += this.yawVelocity;
    this.yawVelocity = damp(this.yawVelocity, 0, 11, deltaTime);
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
