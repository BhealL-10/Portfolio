/**
 * Camera.js - Gestion de la caméra scroll-driven
 * Portfolio 3D V2.0
 * 
 * Principe simple: le scroll (0→1) pilote directement la position Z
 * via interpolation fluide (lerp). Pas de système d'animation complexe.
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
    this.instance.lookAt(0, 0, 0);
    
    // Position cible (pilotée par le scroll)
    this.targetZ = CAMERA.INITIAL_Z;
    
    // LookAt
    this.lookAtTarget = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    // Smoothing
    this.smoothing = CAMERA.SMOOTHING;
    
    this.setupResize();
  }
  
  setupResize() {
    window.addEventListener('resize', () => {
      this.instance.aspect = window.innerWidth / window.innerHeight;
      this.instance.updateProjectionMatrix();
    });
  }
  
  /**
   * Met à jour la position cible basée sur le scroll (0→1)
   */
  updateFromScroll(scrollProgress, totalShards) {
    const startZ = CAMERA.INITIAL_Z;
    const endZ = startZ - CAMERA.Z_TRAVEL;
    
    this.targetZ = startZ + (endZ - startZ) * scrollProgress;
    this.lookAtTarget.z = this.targetZ - CAMERA.LOOK_AHEAD;
  }
  
  /**
   * Interpolation fluide vers la position cible
   */
  update() {
    const currentZ = this.instance.position.z;
    const newZ = currentZ + (this.targetZ - currentZ) * this.smoothing;
    this.instance.position.z = newZ;
    
    this.currentLookAt.lerp(this.lookAtTarget, this.smoothing);
    this.instance.lookAt(this.currentLookAt);
  }
  
  /**
   * Téléporte instantanément la caméra
   */
  teleportTo(z) {
    this.instance.position.z = z;
    this.targetZ = z;
    this.currentLookAt.z = z - CAMERA.LOOK_AHEAD;
    this.lookAtTarget.z = z - CAMERA.LOOK_AHEAD;
    this.instance.lookAt(this.currentLookAt);
  }
  
  /**
   * Retourne la position Z actuelle
   */
  getZ() {
    return this.instance.position.z;
  }
  
  /**
   * Retourne la position complète
   */
  getPosition() {
    return this.instance.position.clone();
  }
}
