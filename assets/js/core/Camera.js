/**
 * Camera.js - Gestion de la caméra
 * Portfolio 3D V2.0
 */

import * as THREE from 'three';
import { CAMERA } from '../config/constants.js';

export class Camera {
  constructor() {
    this.instance = new THREE.PerspectiveCamera(
      CAMERA.FOV,
      window.innerWidth / window.innerHeight,
      CAMERA.NEAR,
      CAMERA.FAR
    );
    
    // Position initiale
    this.instance.position.set(0, 0, CAMERA.INITIAL_Z);
    
    // Cibles pour interpolation
    this.targetPosition = new THREE.Vector3(0, 0, CAMERA.INITIAL_Z);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    this.setupResize();
  }
  
  setupResize() {
    window.addEventListener('resize', () => {
      this.instance.aspect = window.innerWidth / window.innerHeight;
      this.instance.updateProjectionMatrix();
    });
  }
  
  /**
   * Met à jour la caméra basée sur le scroll (0 → 1)
   */
  updateFromScroll(scrollProgress, totalShards) {
    // Calculer la position Z basée sur le scroll
    const startZ = CAMERA.INITIAL_Z;
    const endZ = startZ - (totalShards * 20 + CAMERA.Z_TRAVEL);
    
    this.targetPosition.z = startZ + (endZ - startZ) * scrollProgress;
    
    // LookAt légèrement devant la caméra
    this.targetLookAt.z = this.targetPosition.z - CAMERA.LOOK_AHEAD;
  }
  
  /**
   * Interpolation fluide vers les cibles
   */
  update() {
    // Lerp position
    this.instance.position.lerp(this.targetPosition, CAMERA.SMOOTHING);
    
    // Lerp lookAt
    this.currentLookAt.lerp(this.targetLookAt, CAMERA.SMOOTHING);
    this.instance.lookAt(this.currentLookAt);
  }
  
  /**
   * Déplace la caméra vers une position spécifique
   */
  moveTo(position, lookAt = null) {
    this.targetPosition.copy(position);
    if (lookAt) {
      this.targetLookAt.copy(lookAt);
    }
  }
  
  /**
   * Téléporte instantanément la caméra
   */
  teleportTo(position, lookAt = null) {
    this.instance.position.copy(position);
    this.targetPosition.copy(position);
    
    if (lookAt) {
      this.targetLookAt.copy(lookAt);
      this.currentLookAt.copy(lookAt);
      this.instance.lookAt(lookAt);
    }
  }
  
  /**
   * Retourne la position Z de la caméra
   */
  getZ() {
    return this.instance.position.z;
  }
  
  /**
   * Retourne la position de la caméra
   */
  getPosition() {
    return this.instance.position.clone();
  }
}
