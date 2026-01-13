/**
 * Camera.js - Gestion caméra 100% fluide V5.0
 * Portfolio 3D - Mouvement continu sans saccade
 */

import * as THREE from 'three';
import { CAMERA, SHARD, FOCUS } from '../config/constants.js';

export class Camera {
  constructor(deviceManager) {
    this.deviceManager = deviceManager;
    
    const config = this.getResponsiveConfig();
    
    this.camera = new THREE.PerspectiveCamera(
      config.FOV || CAMERA.FOV,
      window.innerWidth / window.innerHeight,
      CAMERA.NEAR,
      CAMERA.FAR
    );
    
    this.camera.position.set(0, 0, CAMERA.INITIAL_Z);
    
    this.targetPosition = new THREE.Vector3(0, 0, CAMERA.INITIAL_Z);
    this.currentPosition = new THREE.Vector3(0, 0, CAMERA.INITIAL_Z);
    
    this.lookAtTarget = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    this.isFocusMode = false;
    this.focusTargetZ = 0;
    
    this.setupResizeListener();
  }
  
  getResponsiveConfig() {
    if (this.deviceManager) {
      return this.deviceManager.getCameraConfig();
    }
    return CAMERA.RESPONSIVE.DESKTOP;
  }
  
  setupResizeListener() {
    window.addEventListener('resize', () => this.onResize());
  }
  
  onResize() {
    const config = this.getResponsiveConfig();
    this.camera.fov = config.FOV || CAMERA.FOV;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
  
  update(scrollProgress, deltaTime) {
    const config = this.getResponsiveConfig();
    const easeFactor = this.isFocusMode 
      ? 0.08
      : (CAMERA.CONTINUOUS_MOVEMENT.ENABLED 
        ? CAMERA.CONTINUOUS_MOVEMENT.EASE_FACTOR 
        : CAMERA.SMOOTHING);
    
    if (!this.isFocusMode) {
      const shardConfig = this.deviceManager ? this.deviceManager.getShardConfig() : SHARD.RESPONSIVE.DESKTOP;
      const zSpacing = shardConfig.Z_SPACING || SHARD.Z_SPACING;
      const distanceFromShard = config.DISTANCE_FROM_SHARD || CAMERA.DISTANCE_FROM_SHARD;
      const lookAhead = config.LOOK_AHEAD || CAMERA.LOOK_AHEAD;
      
      const shardScroll = Math.min(scrollProgress, 1.0);
      const totalShards = 10;
      
      const targetZ = (shardScroll * totalShards * zSpacing) - distanceFromShard - zSpacing;
      
      this.targetPosition.z = targetZ;
      this.targetPosition.x = 0;
      this.targetPosition.y = 0;
      
      this.lookAtTarget.z = targetZ + lookAhead;
      this.lookAtTarget.x = 0;
      this.lookAtTarget.y = 0;
    }
    
    this.currentPosition.lerp(this.targetPosition, easeFactor);
    this.camera.position.copy(this.currentPosition);
    
    this.currentLookAt.lerp(this.lookAtTarget, easeFactor);
    this.camera.lookAt(this.currentLookAt);
  }
  
  setFocusMode(enabled, targetZ = null) {
    this.isFocusMode = enabled;
    
    if (enabled && targetZ !== null) {
      this.focusTargetZ = targetZ;
      const focusConfig = this.deviceManager ? this.deviceManager.getFocusConfig() : FOCUS;
      const cameraDistance = focusConfig.CAMERA_DISTANCE || FOCUS.CAMERA_DISTANCE;
      
      this.targetPosition.z = targetZ - cameraDistance;
      this.targetPosition.x = 0;
      this.targetPosition.y = 0;
      
      this.lookAtTarget.z = targetZ;
      this.lookAtTarget.x = 0;
      this.lookAtTarget.y = 0;
    }
  }
  
  teleportTo(z, x = 0, y = 0) {
    this.camera.position.set(x, y, z);
    this.currentPosition.set(x, y, z);
    this.targetPosition.set(x, y, z);
    
    this.currentLookAt.set(x, y, z + CAMERA.LOOK_AHEAD);
    this.lookAtTarget.set(x, y, z + CAMERA.LOOK_AHEAD);
    
    this.camera.lookAt(this.currentLookAt);
  }
  
  getCamera() { return this.camera; }
  get position() { return this.camera.position; }
}
