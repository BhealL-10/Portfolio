/**
 * ShardManager.js - Gestionnaire principal des shards
 * Portfolio 3D V2.0
 * 
 * Gère la création, mise à jour et état de tous les shards
 */

import * as THREE from 'three';
import { ShardGenerator } from './ShardGenerator.js';
import { ShardPhysics } from './ShardPhysics.js';
import { projects, getActiveFacette } from '../data/projects.js';
import { SHARD, CAMERA, FACETTE } from '../config/constants.js';

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
    
    // Temps global pour animations
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
    
    // Calculer l'index du shard courant
    const newIndex = Math.floor(scrollProgress * this.shards.length);
    this.currentIndex = Math.max(0, Math.min(newIndex, this.shards.length - 1));
    
    // Mettre à jour chaque shard
    this.shards.forEach((shard, index) => {
      this.updateShard(shard, index, scrollProgress);
    });
    
    // Physique pour les shards en mouvement libre
    this.physics.update(this.shards, deltaTime);
  }
  
  /**
   * Met à jour un shard individuel
   */
  updateShard(shard, index, scrollProgress) {
    // Skip si en focus ou drag
    if (shard.userData.state === 'focus' || shard.userData.state === 'dragged') {
      return;
    }
    
    // Calculer la position canonique
    const canonicalPos = this.calculateCanonicalPosition(shard, index, scrollProgress);
    shard.userData.canonicalPosition.copy(canonicalPos);
    
    // Appliquer la position (avec interpolation si retour)
    if (shard.userData.isReturning) {
      shard.position.lerp(canonicalPos, 0.05);
      
      // Vérifier si arrivé
      if (shard.position.distanceTo(canonicalPos) < 0.1) {
        shard.userData.isReturning = false;
      }
    } else if (!shard.userData.isDragging) {
      shard.position.copy(canonicalPos);
    }
    
    // Rotation automatique
    if (!shard.userData.isDragging && shard.userData.state !== 'hover') {
      this.updateRotation(shard);
    }
    
    // Mise à jour visuelle (scale, glow)
    this.updateVisuals(shard, index);
  }
  
  /**
   * Calcule la position canonique d'un shard
   */
  calculateCanonicalPosition(shard, index, scrollProgress) {
    const cameraZ = this.camera.position.z;
    const relativeIndex = index - this.currentIndex;
    
    // Position Z basée sur l'index relatif
    let z;
    if (relativeIndex === 0) {
      // Shard courant: devant la caméra
      z = cameraZ - CAMERA.LOOK_AHEAD;
    } else if (relativeIndex > 0) {
      // Shards futurs: devant
      z = cameraZ - CAMERA.LOOK_AHEAD - (relativeIndex * SHARD.Z_SPACING);
    } else {
      // Shards passés: derrière (repositionnés à la fin)
      const backIndex = this.shards.length + relativeIndex;
      z = cameraZ - CAMERA.LOOK_AHEAD - (backIndex * SHARD.Z_SPACING);
    }
    
    // Orbite dynamique
    const orbitRadius = this.calculateOrbitRadius(relativeIndex);
    const orbitAngle = shard.userData.orbitAngle + this.globalTime * shard.userData.orbitSpeed;
    
    const x = Math.cos(orbitAngle) * orbitRadius.x;
    const y = Math.sin(orbitAngle) * orbitRadius.y;
    
    return new THREE.Vector3(x, y, z);
  }
  
  /**
   * Calcule le rayon d'orbite basé sur la distance
   */
  calculateOrbitRadius(relativeIndex) {
    const distance = Math.abs(relativeIndex);
    
    // L'orbite grandit avec la distance
    const radiusX = SHARD.ORBIT.BASE_RADIUS_X + distance * SHARD.ORBIT.GROWTH_PER_INDEX;
    const radiusY = SHARD.ORBIT.BASE_RADIUS_Y + distance * SHARD.ORBIT.GROWTH_PER_INDEX * 0.6;
    
    // Orbite minimale pour le shard courant
    if (relativeIndex === 0) {
      return { x: SHARD.ORBIT.BASE_RADIUS_X * 0.5, y: SHARD.ORBIT.BASE_RADIUS_Y * 0.5 };
    }
    
    return { x: radiusX, y: radiusY };
  }
  
  /**
   * Met à jour la rotation d'un shard
   */
  updateRotation(shard) {
    const speed = shard.userData.rotationSpeed;
    const mult = shard.userData.state === 'current' ? 0.5 : 1;
    
    shard.rotation.x += speed.x * mult;
    shard.rotation.y += speed.y * mult;
    shard.rotation.z += speed.z * mult;
  }
  
  /**
   * Met à jour les visuels d'un shard (scale, emissive)
   */
  updateVisuals(shard, index) {
    const relativeIndex = index - this.currentIndex;
    const distance = Math.abs(relativeIndex);
    const baseScale = shard.userData.baseScale;
    
    let targetScale, targetEmissive;
    
    // Déterminer l'état visuel
    if (shard.userData.state === 'hover') {
      targetScale = SHARD.STATES.HOVER.scale;
      targetEmissive = SHARD.STATES.HOVER.emissive;
    } else if (relativeIndex === 0) {
      targetScale = SHARD.STATES.CURRENT.scale;
      targetEmissive = SHARD.STATES.CURRENT.emissive;
      shard.userData.state = 'current';
    } else if (distance <= 2) {
      targetScale = SHARD.STATES.IDLE.scale;
      targetEmissive = SHARD.STATES.IDLE.emissive;
      shard.userData.state = 'idle';
    } else {
      targetScale = SHARD.STATES.DISTANT.scale;
      targetEmissive = SHARD.STATES.DISTANT.emissive;
      shard.userData.state = 'idle';
    }
    
    // Appliquer avec interpolation
    const currentScale = shard.scale.x / baseScale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.1;
    shard.scale.set(
      baseScale.x * newScale,
      baseScale.y * newScale,
      baseScale.z * newScale
    );
    
    // Focus amount modifie le scale
    if (shard.userData.focusAmount > 0) {
      const flattenAmount = shard.userData.focusAmount * SHARD.STATES.FOCUS.flattenAmount;
      shard.scale.y = baseScale.y * newScale * (1 - flattenAmount);
    }
    
    // Emissive
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
    
    // Mettre à jour la couleur
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
    
    // Calculer vélocité
    const velocity = worldPosition.clone().sub(shard.position);
    shard.userData.velocity.copy(velocity);
    
    // Appliquer position
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
    
    // Appliquer vélocité pour effet de lancer
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
    shard.userData.state = 'focus';
    this.focusedShard = shard;
  }
  
  /**
   * Retire le focus
   */
  clearFocus() {
    if (this.focusedShard) {
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
