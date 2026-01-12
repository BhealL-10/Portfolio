/**
 * Camera.js - Gestion caméra avec correction automatique de position
 * Portfolio 3D V4.0
 */

import * as THREE from 'three';
import { CAMERA, SHARD, FOCUS } from '../config/constants.js';

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
    this.isFocusMode = false;
    this.focusTargetZ = null;
    
    this.setupResize();
  }
  
  setupResize() {
    window.addEventListener('resize', () => {
      this.updateAspect();
    });
  }
  
  updateAspect() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
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
    
    return startCameraZ + (scrollProgress * totalDistance);
  }
  
  updateFromScroll(scrollProgress, totalShards, currentShardIndex = 0) {
    if (this.isFocusMode) return;
    
    this.totalShards = totalShards;
    
    const targetZ = this.calculateTargetZ(scrollProgress, currentShardIndex);
    this.targetPosition.z = targetZ;
    this.lookAtTarget.z = targetZ + CAMERA.LOOK_AHEAD;
    
    const wobble = Math.sin(scrollProgress * Math.PI * 4) * 0.5;
    this.targetPosition.x = wobble;
    this.lookAtTarget.x = wobble * 0.5;
  }
  
  update(deltaTime = 0.016) {
    const easeFactor = this.isFocusMode 
      ? FOCUS.POSITION_CORRECTION.SMOOTHING 
      : (CAMERA.CONTINUOUS_MOVEMENT.ENABLED 
        ? CAMERA.CONTINUOUS_MOVEMENT.EASE_FACTOR 
        : this.smoothing);
    
    this.currentPosition.lerp(this.targetPosition, easeFactor);
    this.instance.position.copy(this.currentPosition);
    
    this.currentLookAt.lerp(this.lookAtTarget, easeFactor);
    this.instance.lookAt(this.currentLookAt);
    
    this.velocity.subVectors(this.targetPosition, this.currentPosition);
  }
  
  setFocusMode(enabled, shardZ = null) {
    this.isFocusMode = enabled;
    if (enabled && shardZ !== null) {
      this.focusTargetZ = shardZ;
    } else {
      this.focusTargetZ = null;
    }
  }
  
  setFocusPosition(x, y, z, lookAtZ) {
    this.targetPosition.set(x, y, z);
    this.lookAtTarget.set(x, y, lookAtZ);
  }
  
  enforceFocusPosition(shardZ) {
    if (!this.isFocusMode) return;
    
    const cameraZ = shardZ - FOCUS.CAMERA_DISTANCE;
    this.targetPosition.set(0, 0, cameraZ);
    this.lookAtTarget.set(0, 0, shardZ);
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
