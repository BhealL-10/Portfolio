/**
 * Camera.js - Gestion caméra avec déplacement continu
 * Portfolio 3D V3.0
 */

import * as THREE from 'three';
import { CAMERA, SHARD } from '../config/constants.js';

export class Camera {
  constructor() {
    this.instance = new THREE.PerspectiveCamera(
      CAMERA.FOV,
      window.innerWidth / window.innerHeight,
      CAMERA.NEAR,
      CAMERA.FAR
    );
    
    this.instance.position.set(0, 0, CAMERA.INITIAL_Z);
    this.instance.lookAt(0, 0, 0);
    
    this.targetPosition = new THREE.Vector3(0, 0, CAMERA.INITIAL_Z);
    this.currentPosition = new THREE.Vector3(0, 0, CAMERA.INITIAL_Z);
    
    this.lookAtTarget = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    this.smoothing = CAMERA.SMOOTHING;
    this.velocity = new THREE.Vector3(0, 0, 0);
    
    this.totalShards = 10;
    this.isTransitioning = false;
    
    this.setupResize();
  }
  
  setupResize() {
    window.addEventListener('resize', () => {
      this.instance.aspect = window.innerWidth / window.innerHeight;
      this.instance.updateProjectionMatrix();
    });
  }
  
  setTotalShards(count) {
    this.totalShards = count;
  }
  
  calculateTargetZ(scrollProgress, currentShardIndex) {
    const firstShardZ = -SHARD.Z_SPACING;
    const lastShardZ = (this.totalShards - 1) * SHARD.Z_SPACING - SHARD.Z_SPACING;
    
    const startCameraZ = firstShardZ - 40;
    const endCameraZ = lastShardZ + 40;
    const totalDistance = endCameraZ - startCameraZ;
    
    let targetZ = startCameraZ + (scrollProgress * totalDistance);
    return targetZ;
  }
  
  updateFromScroll(scrollProgress, totalShards, currentShardIndex = 0) {
    this.totalShards = totalShards;
    
    const targetZ = this.calculateTargetZ(scrollProgress, currentShardIndex);
    this.targetPosition.z = targetZ;
    this.lookAtTarget.z = targetZ + CAMERA.LOOK_AHEAD;
    
    const wobble = Math.sin(scrollProgress * Math.PI * 4) * 0.5;
    this.targetPosition.x = wobble;
    this.lookAtTarget.x = wobble * 0.5;
  }
  
  update(deltaTime = 0.016) {
    const easeFactor = CAMERA.CONTINUOUS_MOVEMENT.ENABLED 
      ? CAMERA.CONTINUOUS_MOVEMENT.EASE_FACTOR 
      : this.smoothing;
    
    this.currentPosition.lerp(this.targetPosition, easeFactor);
    this.instance.position.copy(this.currentPosition);
    
    this.currentLookAt.lerp(this.lookAtTarget, easeFactor);
    this.instance.lookAt(this.currentLookAt);
    
    this.velocity.subVectors(this.targetPosition, this.currentPosition);
  }
  
  teleportTo(z, x = 0, y = 0) {
    this.instance.position.set(x, y, z);
    this.currentPosition.set(x, y, z);
    this.targetPosition.set(x, y, z);
    
    this.currentLookAt.set(x, y, z + CAMERA.LOOK_AHEAD);
    this.lookAtTarget.set(x, y, z + CAMERA.LOOK_AHEAD);
    
    this.instance.lookAt(this.currentLookAt);
  }
  
  animateTo(targetZ, duration = 1.0, onComplete = null) {
    if (!window.gsap) {
      this.teleportTo(targetZ);
      if (onComplete) onComplete();
      return;
    }
    
    this.isTransitioning = true;
    
    window.gsap.to(this.targetPosition, {
      z: targetZ,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.lookAtTarget.z = this.targetPosition.z + CAMERA.LOOK_AHEAD;
      },
      onComplete: () => {
        this.isTransitioning = false;
        if (onComplete) onComplete();
      }
    });
  }
  
  getZ() { return this.instance.position.z; }
  getPosition() { return this.instance.position.clone(); }
  getVelocity() { return this.velocity.clone(); }
  isMoving() { return this.velocity.lengthSq() > 0.01; }
}
