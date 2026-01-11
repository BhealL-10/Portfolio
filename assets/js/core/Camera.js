/**
 * Camera.js - Gestion caméra avec déplacement continu
 * Portfolio 3D V3.0
 * 
 * - Mouvement continu entre shards
 * - Support boucle infinie
 * - Anticipation du mouvement
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
    
    // Position initiale
    this.instance.position.set(0, 0, CAMERA.INITIAL_Z);
    this.instance.lookAt(0, 0, 0);
    
    // Position cible
    this.targetPosition = new THREE.Vector3(0, 0, CAMERA.INITIAL_Z);
    this.currentPosition = new THREE.Vector3(0, 0, CAMERA.INITIAL_Z);
    
    // LookAt
    this.lookAtTarget = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    // Smoothing
    this.smoothing = CAMERA.SMOOTHING;
    
    // Vélocité pour mouvement continu
    this.velocity = new THREE.Vector3(0, 0, 0);
    
    // État
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
  
  /**
   * Configure le nombre total de shards
   */
  setTotalShards(count) {
    this.totalShards = count;
  }
  
  /**
   * Calcule la position Z cible basée sur le scroll et l'index courant
   * La caméra AVANCE (Z augmente) pour aller vers les shards
   */
  calculateTargetZ(scrollProgress, currentShardIndex) {
    // Shards sont à: -60, 0, 60, 120, 180, 240, 300, 360, 420, 480
    // Caméra démarre à -100 (derrière le premier shard à -60)
    // Caméra doit avancer jusqu'à ~500 (après le dernier shard à 480)
    
    const firstShardZ = -SHARD.Z_SPACING; // -60
    const lastShardZ = (this.totalShards - 1) * SHARD.Z_SPACING - SHARD.Z_SPACING; // 480
    
    // Distance totale à parcourir
    const startCameraZ = firstShardZ - 40; // -100 (40 unités derrière le premier)
    const endCameraZ = lastShardZ + 40; // 520 (40 unités après le dernier)
    const totalDistance = endCameraZ - startCameraZ;
    
    // Position de base: caméra AVANCE de startZ vers endZ
    let targetZ = startCameraZ + (scrollProgress * totalDistance);
    
    return targetZ;
  }
  
  /**
   * Met à jour la position cible basée sur le scroll
   */
  updateFromScroll(scrollProgress, totalShards, currentShardIndex = 0) {
    this.totalShards = totalShards;
    
    // Calculer position Z cible (caméra avance)
    const targetZ = this.calculateTargetZ(scrollProgress, currentShardIndex);
    
    this.targetPosition.z = targetZ;
    
    // Calculer le point de regard (DEVANT la caméra car elle avance)
    this.lookAtTarget.z = targetZ + CAMERA.LOOK_AHEAD;
    
    // Léger mouvement X/Y basé sur le scroll pour plus de dynamisme
    const wobble = Math.sin(scrollProgress * Math.PI * 4) * 0.5;
    this.targetPosition.x = wobble;
    this.lookAtTarget.x = wobble * 0.5;
  }
  
  /**
   * Mise à jour avec déplacement continu
   */
  update(deltaTime = 0.016) {
    const easeFactor = CAMERA.CONTINUOUS_MOVEMENT.ENABLED 
      ? CAMERA.CONTINUOUS_MOVEMENT.EASE_FACTOR 
      : this.smoothing;
    
    // Interpolation fluide vers la position cible
    this.currentPosition.lerp(this.targetPosition, easeFactor);
    this.instance.position.copy(this.currentPosition);
    
    // Interpolation du lookAt
    this.currentLookAt.lerp(this.lookAtTarget, easeFactor);
    this.instance.lookAt(this.currentLookAt);
    
    // Calculer vélocité pour effets visuels
    this.velocity.subVectors(this.targetPosition, this.currentPosition);
  }
  
  /**
   * Téléporte instantanément la caméra
   */
  teleportTo(z, x = 0, y = 0) {
    this.instance.position.set(x, y, z);
    this.currentPosition.set(x, y, z);
    this.targetPosition.set(x, y, z);
    
    // LookAt DEVANT la caméra (elle regarde vers l'avant)
    this.currentLookAt.set(x, y, z + CAMERA.LOOK_AHEAD);
    this.lookAtTarget.set(x, y, z + CAMERA.LOOK_AHEAD);
    
    this.instance.lookAt(this.currentLookAt);
  }
  
  /**
   * Anime vers une position spécifique
   */
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
  
  /**
   * Getters
   */
  getZ() {
    return this.instance.position.z;
  }
  
  getPosition() {
    return this.instance.position.clone();
  }
  
  getVelocity() {
    return this.velocity.clone();
  }
  
  isMoving() {
    return this.velocity.lengthSq() > 0.01;
  }
}
