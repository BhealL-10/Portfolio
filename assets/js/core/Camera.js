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
    
    // Animation de transition entre sections
    this.isAnimating = false;
    this.animationStartTime = 0;
    this.animationDuration = 1500; // 1.5 secondes
    this.animationStartPos = new THREE.Vector3();
    this.animationEndPos = new THREE.Vector3();
    this.currentSection = 0;
    
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
    // Ne JAMAIS mettre à jour pendant une animation
    if (this.isAnimating) return;
    
    // Calculer l'index du shard courant
    const currentShardIndex = Math.floor(scrollProgress * totalShards);
    const clampedIndex = Math.max(0, Math.min(currentShardIndex, totalShards - 1));
    
    // Position Z basée sur l'index du shard (chaque shard a sa propre position)
    const startZ = CAMERA.INITIAL_Z;
    const zPerShard = 25; // Distance entre chaque shard
    
    // Position cible = position initiale - (index * distance entre shards)
    const targetZ = startZ - (clampedIndex * zPerShard);
    
    // Ne mettre à jour que si la position cible a vraiment changé
    if (Math.abs(this.targetPosition.z - targetZ) > 0.1) {
      this.targetPosition.z = targetZ;
      this.targetLookAt.z = targetZ - CAMERA.LOOK_AHEAD;
    }
  }
  
  /**
   * Anime la caméra vers une section spécifique
   */
  animateToSection(sectionIndex, totalShards, onComplete = null) {
    if (this.isAnimating) return;
    
    console.log(`🎬 Début animation vers section ${sectionIndex}`);
    
    this.isAnimating = true;
    this.currentSection = sectionIndex;
    this.animationStartTime = Date.now();
    
    // Position de départ = position actuelle
    this.animationStartPos.copy(this.instance.position);
    
    // Position d'arrivée = position de la section cible
    const startZ = CAMERA.INITIAL_Z;
    const zPerShard = 25;
    const targetZ = startZ - (sectionIndex * zPerShard);
    
    this.animationEndPos.set(0, 0, targetZ);
    
    console.log(`📍 Animation: Z ${this.animationStartPos.z.toFixed(1)} → ${targetZ.toFixed(1)}`);
    
    // Callback de fin d'animation
    this.onAnimationComplete = onComplete;
  }
  
  /**
   * Interpolation fluide vers les cibles
   */
  update() {
    // Si une animation est en cours, gérer l'animation
    if (this.isAnimating) {
      const elapsed = Date.now() - this.animationStartTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);
      
      // Easing smooth (easeInOutCubic)
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      // Interpoler la position DIRECTEMENT (pas de lerp)
      this.instance.position.x = this.animationStartPos.x + (this.animationEndPos.x - this.animationStartPos.x) * eased;
      this.instance.position.y = this.animationStartPos.y + (this.animationEndPos.y - this.animationStartPos.y) * eased;
      this.instance.position.z = this.animationStartPos.z + (this.animationEndPos.z - this.animationStartPos.z) * eased;
      
      // LookAt
      const lookAtZ = this.instance.position.z - CAMERA.LOOK_AHEAD;
      this.currentLookAt.set(0, 0, lookAtZ);
      this.instance.lookAt(this.currentLookAt);
      
      // Mettre à jour les cibles pour la suite
      this.targetPosition.copy(this.instance.position);
      this.targetLookAt.copy(this.currentLookAt);
      
      // Log de progression à chaque frame pour debug
      console.log(`📹 Frame: ${(progress * 100).toFixed(1)}% - Z: ${this.instance.position.z.toFixed(2)} (eased: ${eased.toFixed(3)})`);
      
      // Fin de l'animation
      if (progress >= 1) {
        console.log(`✅ Animation terminée - Section ${this.currentSection}`);
        this.isAnimating = false;
        
        // Forcer la position finale exacte
        this.instance.position.copy(this.animationEndPos);
        this.targetPosition.copy(this.animationEndPos);
        
        if (this.onAnimationComplete) {
          this.onAnimationComplete();
          this.onAnimationComplete = null;
        }
      }
      
      return;
    }
    
    // Sinon, interpolation normale
    const distance = this.instance.position.distanceTo(this.targetPosition);
    
    // Si la distance est grande (>50), réduire encore plus le smoothing pour une transition très fluide
    // Sinon, utiliser le smoothing normal pour les petits déplacements
    const adaptiveSmoothing = distance > 50 ? CAMERA.SMOOTHING * 0.3 : CAMERA.SMOOTHING;
    
    this.instance.position.lerp(this.targetPosition, adaptiveSmoothing);
    
    // Lerp lookAt
    this.currentLookAt.lerp(this.targetLookAt, adaptiveSmoothing);
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
