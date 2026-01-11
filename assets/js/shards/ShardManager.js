/**
 * ShardManager.js - Gestionnaire principal des shards
 * Portfolio 3D V2.0
 * 
 * Gère la création, mise à jour et animations de tous les shards
 * Basé sur l'ancien animations.js avec calcul de position canonique
 */

import * as THREE from 'three';
import { ShardGenerator } from './ShardGenerator.js';
import { ShardPhysics } from './ShardPhysics.js';
import { projects } from '../data/projects.js';
import { SHARD, CAMERA } from '../config/constants.js';

export class ShardManager {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.shards = [];
    this.currentIndex = 0;
    
    // Sous-systèmes
    this.generator = new ShardGenerator();
    this.physics = new ShardPhysics();
    
    // État
    this.focusedShard = null;
    this.hoveredShard = null;
    this.draggedShard = null;
    
    // Temps global pour animations orbitales
    this.globalTime = 0;
  }
  
  /**
   * Génère tous les shards
   */
  async generateShards() {
    for (let i = 0; i < projects.length; i++) {
      const shard = this.generator.generateShard(projects[i], i);
      this.shards.push(shard);
      this.scene.add(shard);
    }
    
    console.log(`✅ Generated ${this.shards.length} shards`);
    return this.shards;
  }
  
  /**
   * Mise à jour principale (appelée chaque frame)
   */
  update(scrollProgress, deltaTime) {
    this.globalTime += deltaTime;
    
    // Calculer l'index du shard courant basé sur le scroll
    const newIndex = Math.floor(scrollProgress * this.shards.length);
    this.currentIndex = Math.max(0, Math.min(newIndex, this.shards.length - 1));
    
    // Position Z de la caméra
    const cameraZ = this.camera.position.z;
    
    // Mettre à jour chaque shard
    this.shards.forEach((shard, index) => {
      this.updateShard(shard, index, cameraZ);
    });
    
    // Physique pour les shards en mouvement libre
    this.physics.update(this.shards, deltaTime);
  }
  
  /**
   * Met à jour un shard individuel
   */
  updateShard(shard, index, cameraZ) {
    // Skip si en focus ou drag
    if (shard.userData.isFocused || shard.userData.isDragging) {
      return;
    }
    
    // Calculer la position canonique
    const canonicalPos = this.calculateCanonicalPosition(shard, index, cameraZ);
    
    // Appliquer la position
    if (shard.userData.isReturning) {
      // Interpolation douce pour le retour
      shard.position.lerp(canonicalPos, 0.05);
      
      if (shard.position.distanceTo(canonicalPos) < 0.1) {
        shard.userData.isReturning = false;
      }
    } else {
      // Position directe
      shard.position.copy(canonicalPos);
    }
    
    // Rotation automatique
    this.updateRotation(shard, index);
    
    // Mise à jour visuelle (scale, glow)
    this.updateVisuals(shard, index);
  }
  
  /**
   * Calcule la position canonique d'un shard
   * Basé sur l'ancien PositionCalculator
   */
  calculateCanonicalPosition(shard, index, cameraZ) {
    const relativeIndex = index - this.currentIndex;
    
    // Paramètres orbitaux
    const phase = shard.userData.orbitAngle;
    const speed = shard.userData.orbitSpeed;
    const orbitT = this.globalTime * speed * SHARD.ORBIT.SPEED + phase;
    
    // === SHARD COURANTE ===
    if (relativeIndex === 0) {
      const z = cameraZ - CAMERA.LOOK_AHEAD;
      const x = Math.cos(orbitT) * SHARD.ORBIT.BASE_RADIUS_X * 0.3;
      const y = Math.sin(orbitT) * SHARD.ORBIT.BASE_RADIUS_Y * 0.3;
      return new THREE.Vector3(x, y, z);
    }
    
    // === SHARDS FUTURES (devant) ===
    if (relativeIndex > 0) {
      const z = cameraZ - CAMERA.LOOK_AHEAD - (relativeIndex * SHARD.Z_SPACING);
      
      // Orbite qui grandit avec la distance
      const orbitMultiplier = 1 + (relativeIndex - 1) * 0.5;
      const baseAngle = (index / this.shards.length) * Math.PI * 2;
      const animatedAngle = baseAngle + orbitT * 0.3;
      
      const radiusX = SHARD.ORBIT.BASE_RADIUS_X * orbitMultiplier;
      const radiusY = SHARD.ORBIT.BASE_RADIUS_Y * orbitMultiplier;
      
      const x = Math.cos(animatedAngle) * radiusX;
      const y = Math.sin(animatedAngle) * radiusY;
      
      return new THREE.Vector3(x, y, z);
    }
    
    // === SHARDS PASSÉES (derrière) ===
    const passedDistance = Math.abs(relativeIndex);
    const z = cameraZ - CAMERA.LOOK_AHEAD + (passedDistance * SHARD.Z_SPACING);
    
    // Orbite qui grandit avec la distance derrière
    const orbitMultiplier = 1 + (passedDistance - 1) * 0.5;
    const baseAngle = (index / this.shards.length) * Math.PI * 2;
    const animatedAngle = baseAngle + orbitT * 0.2;
    
    const radiusX = SHARD.ORBIT.BASE_RADIUS_X * orbitMultiplier;
    const radiusY = SHARD.ORBIT.BASE_RADIUS_Y * orbitMultiplier;
    
    const x = Math.cos(animatedAngle) * radiusX;
    const y = Math.sin(animatedAngle) * radiusY;
    
    return new THREE.Vector3(x, y, z);
  }
  
  /**
   * Met à jour la rotation d'un shard
   */
  updateRotation(shard, index) {
    if (shard.userData.state === 'hover') return;
    
    const speed = shard.userData.rotationSpeed;
    const isCurrentShard = (index === this.currentIndex);
    const mult = isCurrentShard ? 0.5 : 1.0;
    
    shard.rotation.x += speed.x * mult;
    shard.rotation.y += speed.y * mult;
    shard.rotation.z += speed.z * mult;
  }
  
  /**
   * Met à jour les visuels d'un shard (scale, emissive)
   */
  updateVisuals(shard, index) {
    const relativeIndex = index - this.currentIndex;
    const isCurrentShard = (relativeIndex === 0);
    const baseScale = shard.userData.baseScale;
    
    // Déterminer le scale cible
    let targetScale;
    if (shard.userData.state === 'hover') {
      targetScale = SHARD.STATES.HOVER.scale;
    } else if (isCurrentShard) {
      targetScale = SHARD.STATES.CURRENT.scale;
    } else if (Math.abs(relativeIndex) <= 2) {
      targetScale = SHARD.STATES.IDLE.scale;
    } else {
      targetScale = SHARD.STATES.DISTANT.scale;
    }
    
    // Interpoler le scale
    const currentScale = shard.scale.x / baseScale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.1;
    
    // Appliquer avec aplatissement si focus
    const focusAmount = shard.userData.focusAmount || 0;
    const flattenZ = 1 - focusAmount * SHARD.STATES.FOCUS.flattenAmount;
    
    shard.scale.set(
      baseScale.x * newScale,
      baseScale.y * newScale,
      baseScale.z * newScale * flattenZ
    );
    
    // Émissivité
    let targetEmissive;
    if (shard.userData.state === 'hover') {
      targetEmissive = SHARD.STATES.HOVER.emissive;
    } else if (isCurrentShard) {
      targetEmissive = SHARD.STATES.CURRENT.emissive;
    } else {
      targetEmissive = SHARD.STATES.IDLE.emissive;
    }
    
    const currentEmissive = shard.material.emissiveIntensity;
    shard.material.emissiveIntensity = currentEmissive + (targetEmissive - currentEmissive) * 0.1;
  }
  
  /**
   * Change la facette active d'un shard
   */
  changeFacette(shard, direction = 1) {
    const facettes = shard.userData.facettes;
    const currentIndex = shard.userData.activeFacette;
    const newIndex = (currentIndex + direction + facettes.length) % facettes.length;
    
    shard.userData.activeFacette = newIndex;
    
    const newFacette = facettes[newIndex];
    this.generator.updateShardCategory(shard, newFacette.category);
    
    return newFacette;
  }
  
  /**
   * Démarre le drag d'un shard
   */
  startDrag(shard) {
    shard.userData.isDragging = true;
    shard.userData.state = 'dragged';
    shard.userData.velocity.set(0, 0, 0);
    this.draggedShard = shard;
  }
  
  /**
   * Met à jour le drag d'un shard
   */
  updateDrag(shard, worldPosition) {
    if (!shard.userData.isDragging) return;
    
    const velocity = worldPosition.clone().sub(shard.position);
    shard.userData.velocity.copy(velocity);
    shard.position.copy(worldPosition);
  }
  
  /**
   * Termine le drag d'un shard
   */
  endDrag(shard) {
    shard.userData.isDragging = false;
    shard.userData.state = 'idle';
    shard.userData.isReturning = true;
    this.draggedShard = null;
    
    this.physics.applyVelocity(shard, shard.userData.velocity.clone().multiplyScalar(5));
  }
  
  /**
   * Met un shard en hover
   */
  setHover(shard) {
    if (this.hoveredShard && this.hoveredShard !== shard) {
      this.hoveredShard.userData.state = 'idle';
    }
    shard.userData.state = 'hover';
    this.hoveredShard = shard;
  }
  
  /**
   * Retire le hover
   */
  clearHover() {
    if (this.hoveredShard) {
      this.hoveredShard.userData.state = 'idle';
      this.hoveredShard = null;
    }
  }
  
  /**
   * Met un shard en focus
   */
  setFocus(shard) {
    shard.userData.isFocused = true;
    shard.userData.state = 'focus';
    this.focusedShard = shard;
  }
  
  /**
   * Retire le focus
   */
  clearFocus() {
    if (this.focusedShard) {
      this.focusedShard.userData.isFocused = false;
      this.focusedShard.userData.state = 'idle';
      this.focusedShard.userData.isReturning = true;
      this.focusedShard = null;
    }
  }
  
  /**
   * Met à jour le thème de tous les shards
   */
  setTheme(isDarkMode) {
    this.generator.isDarkMode = isDarkMode;
    this.shards.forEach(shard => {
      this.generator.updateShardTheme(shard, isDarkMode);
    });
  }
  
  /**
   * Getters
   */
  getAllShards() {
    return this.shards;
  }
  
  getShardByIndex(index) {
    if (index < 0 || index >= this.shards.length) {
      return null;
    }
    return this.shards[index];
  }
  
  getCurrentShard() {
    return this.shards[this.currentIndex];
  }
  
  getCurrentIndex() {
    return this.currentIndex;
  }
  
  getTotalShards() {
    return this.shards.length;
  }
  
  getFocusedShard() {
    return this.focusedShard;
  }
  
  getHoveredShard() {
    return this.hoveredShard;
  }
  
  getDraggedShard() {
    return this.draggedShard;
  }
}
