/**
 * ShardManager.js - Gestionnaire principal des shards
 * Portfolio 3D V3.0
 * 
 * - 10 shards constamment visibles
 * - Boucle infinie
 * - Déplacement continu de la caméra
 */

import * as THREE from 'three';
import { ShardGenerator } from './ShardGenerator.js';
import { ShardPhysics } from './ShardPhysics.js';
import { projects } from '../data/projects.js';
import { SHARD, CAMERA, SCROLL } from '../config/constants.js';

export class ShardManager {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.shards = [];
    this.currentIndex = 0;
    this.previousIndex = -1;
    
    // Sous-systèmes
    this.generator = new ShardGenerator();
    this.physics = new ShardPhysics();
    
    // Référence au ScrollManager (sera définie plus tard)
    this.scrollManager = null;
    
    // État
    this.focusedShard = null;
    this.hoveredShard = null;
    this.draggedShard = null;
    
    // Temps global
    this.globalTime = 0;
    
    // Boucle infinie
    this.infiniteLoopEnabled = SHARD.INFINITE_LOOP.ENABLED;
    this.totalDistance = 0;
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
    
    this.totalDistance = projects.length * SHARD.Z_SPACING;
    
    console.log(`✅ Generated ${this.shards.length} shards (total distance: ${this.totalDistance})`);
    return this.shards;
  }
  
  /**
   * Mise à jour principale
   */
  update(scrollProgress, deltaTime) {
    this.globalTime += deltaTime;
    
    // Calculer l'index courant (0-1 scroll → 0-9 index)
    const shardScroll = Math.min(scrollProgress, 1.0);
    const newIndex = Math.floor(shardScroll * this.shards.length);
    this.currentIndex = Math.max(0, Math.min(newIndex, this.shards.length - 1));
    
    // Détecter changement
    const indexChanged = this.currentIndex !== this.previousIndex;
    if (indexChanged) {
      this.onShardIndexChanged(this.previousIndex, this.currentIndex);
      this.previousIndex = this.currentIndex;
    }
    
    // Position caméra pour calculs de distance
    const cameraZ = this.camera.position.z;
    
    // Mettre à jour chaque shard
    this.shards.forEach((shard, index) => {
      this.updateShardState(shard, index, cameraZ, scrollProgress);
      this.updateShardVisuals(shard, index);
      this.updateShardOrbital(shard, index);
      this.updateShardRotation(shard, index);
    });
    
    // Physique
    this.physics.update(this.shards, deltaTime);
  }
  
  /**
   * Calcule l'état d'un shard basé sur sa distance à la caméra
   * Caméra AVANCE vers les shards (Z augmente)
   */
  updateShardState(shard, index, cameraZ, scrollProgress) {
    if (shard.userData.isFocused || shard.userData.isDragging) return;
    
    const shardZ = shard.userData.fixedZ;
    const distance = shardZ - cameraZ; // Distance DEVANT la caméra (positif = devant)
    
    // Déterminer l'état basé sur la distance réelle
    let newState = 'idle';
    
    // Shard très proche devant la caméra (dans les 30 unités)
    if (distance > -30 && distance < 80) {
      if (distance > -10 && distance < 30) {
        newState = 'current'; // Très proche
      } else if (distance >= 30 && distance < 80) {
        newState = 'approaching'; // Devant, approchant
      } else if (distance >= -30 && distance <= -10) {
        newState = 'leaving'; // Derrière, s'éloignant
      }
    }
    // Sinon reste 'idle' (trop loin)
    
    // Appliquer si changement d'état
    if (shard.userData.state !== newState && !shard.userData.isFocused) {
      const oldState = shard.userData.state;
      shard.userData.state = newState;
      this.animateStateTransition(shard, newState);
    }
  }
  
  /**
   * Appelé lors du changement d'index
   */
  onShardIndexChanged(oldIndex, newIndex) {
    // Marquer l'ancien comme leaving
    if (oldIndex >= 0 && oldIndex < this.shards.length) {
      const oldShard = this.shards[oldIndex];
      if (oldShard.userData.state === 'current' && !oldShard.userData.isFocused) {
        oldShard.userData.state = 'leaving';
        this.animateStateTransition(oldShard, 'leaving');
      }
    }
    
    // Marquer le nouveau
    const newShard = this.shards[newIndex];
    if (newShard && !newShard.userData.isFocused) {
      newShard.userData.state = 'approaching';
      this.animateStateTransition(newShard, 'approaching');
      
      setTimeout(() => {
        if (newShard.userData.state === 'approaching' && !newShard.userData.isFocused) {
          newShard.userData.state = 'current';
          this.animateStateTransition(newShard, 'current');
        }
      }, 250);
    }
  }
  
  /**
   * Anime la transition d'état
   */
  animateStateTransition(shard, state) {
    const config = SHARD.STATES[state.toUpperCase()] || SHARD.STATES.IDLE;
    
    if (window.gsap) {
      const targetScale = config.scale * shard.userData.baseScale.x;
      
      window.gsap.to(shard.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.7,
        ease: 'power2.out'
      });
      
      window.gsap.to(shard.material, {
        opacity: config.opacity,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }
  
  /**
   * Met à jour les visuels d'un shard
   */
  updateShardVisuals(shard, index) {
    const state = shard.userData.state;
    const config = SHARD.STATES[state.toUpperCase()] || SHARD.STATES.IDLE;
    
    // Emissive (augmentation lumière)
    if (shard.material.emissive) {
      const intensity = config.emissive;
      const targetR = intensity;
      const targetG = intensity * 0.9;
      const targetB = intensity * 0.7;
      
      shard.material.emissive.r += (targetR - shard.material.emissive.r) * 0.1;
      shard.material.emissive.g += (targetG - shard.material.emissive.g) * 0.1;
      shard.material.emissive.b += (targetB - shard.material.emissive.b) * 0.1;
    }
    
    // Effet de morphing/déformation au hover
    if (state === 'hover' && !shard.userData.isDragging) {
      this.applyHoverMorphing(shard);
    }
    
    // Flatten pour focus
    if (state === 'focus' && shard.userData.focusAmount > 0) {
      const focusAmount = shard.userData.focusAmount;
      const flattenAmount = config.flattenAmount || 0;
      const baseScale = shard.userData.baseScale.x;
      
      shard.scale.set(
        baseScale * config.scale * (1 + focusAmount * 0.4),
        baseScale * config.scale * (1 + focusAmount * 0.4),
        baseScale * config.scale * (1 - focusAmount * flattenAmount)
      );
    }
  }
  
  /**
   * Applique l'effet de morphing au hover (déformation organique)
   */
  applyHoverMorphing(shard) {
    if (!shard.geometry.attributes.position) return;
    
    const positions = shard.geometry.attributes.position;
    const time = this.globalTime * 2;
    
    // Déformation subtile des vertices
    if (!shard.userData.originalPositions) {
      // Sauvegarder positions originales
      shard.userData.originalPositions = [];
      for (let i = 0; i < positions.count; i++) {
        shard.userData.originalPositions.push({
          x: positions.getX(i),
          y: positions.getY(i),
          z: positions.getZ(i)
        });
      }
    }
    
    // Appliquer déformation ondulante
    const morphStrength = 0.15; // Intensité de la déformation
    for (let i = 0; i < positions.count; i++) {
      const original = shard.userData.originalPositions[i];
      const offset = Math.sin(time + i * 0.5) * morphStrength;
      
      positions.setXYZ(
        i,
        original.x * (1 + offset),
        original.y * (1 + offset * 0.8),
        original.z * (1 + offset * 0.6)
      );
    }
    
    positions.needsUpdate = true;
    shard.geometry.computeVertexNormals();
  }
  
  /**
   * Restaure la géométrie originale
   */
  restoreOriginalGeometry(shard) {
    if (!shard.userData.originalPositions) return;
    
    const positions = shard.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const original = shard.userData.originalPositions[i];
      positions.setXYZ(i, original.x, original.y, original.z);
    }
    
    positions.needsUpdate = true;
    shard.geometry.computeVertexNormals();
  }
  
  /**
   * Met à jour position orbitale (X/Y)
   * Plus le scroll est loin de la shard, plus l'orbite est grande
   */
  updateShardOrbital(shard, index) {
    if (shard.userData.isDragging || shard.userData.isFocused) return;
    if (this.physics.isShardMoving(shard)) return;
    
    const orbitT = this.globalTime * shard.userData.orbitSpeed + shard.userData.orbitAngle;
    
    // Calculer distance entre scroll et shard
    const scrollProgress = this.scrollManager ? this.scrollManager.getShardProgress() : 0;
    const shardScrollPosition = index / this.shards.length;
    const distanceFromScroll = Math.abs(scrollProgress - shardScrollPosition);
    
    // Plus on est loin, plus l'orbite est grande (facteur 1.0 à 2.5)
    const orbitMultiplier = 1.0 + (distanceFromScroll * 1.5);
    
    const targetX = Math.cos(orbitT) * SHARD.ORBIT.RADIUS_X * orbitMultiplier;
    const targetY = Math.sin(orbitT) * SHARD.ORBIT.RADIUS_Y * orbitMultiplier;
    
    const smoothing = 0.04;
    shard.position.x += (targetX - shard.position.x) * smoothing;
    shard.position.y += (targetY - shard.position.y) * smoothing;
    
    // Z reste fixe
    if (!shard.userData.isFocused) {
      shard.position.z = shard.userData.fixedZ;
    }
  }
  
  /**
   * Met à jour rotation
   */
  updateShardRotation(shard, index) {
    const state = shard.userData.state;
    
    if (state === 'hover' || shard.userData.isDragging || shard.userData.isFocused) return;
    
    let mult = SHARD.ROTATION.MULTIPLIER_IDLE;
    if (state === 'current') mult = SHARD.ROTATION.MULTIPLIER_CURRENT;
    else if (state === 'focus') mult = SHARD.ROTATION.MULTIPLIER_FOCUS;
    
    shard.rotation.x += shard.userData.rotationSpeed.x * mult;
    shard.rotation.y += shard.userData.rotationSpeed.y * mult;
    shard.rotation.z += shard.userData.rotationSpeed.z * mult;
  }
  
  // === DRAG ===
  
  startDrag(shard) {
    shard.userData.isDragging = true;
    shard.userData.state = 'dragged';
    shard.userData.velocity.set(0, 0);
    this.draggedShard = shard;
  }
  
  updateDrag(shard, worldPosition) {
    if (!shard.userData.isDragging) return;
    
    const velocityX = worldPosition.x - shard.position.x;
    const velocityY = worldPosition.y - shard.position.y;
    
    shard.userData.velocity.set(velocityX, velocityY);
    shard.position.x = worldPosition.x;
    shard.position.y = worldPosition.y;
    
    // Étirement dans la direction du mouvement
    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    if (speed > 0.1) {
      const stretchAmount = Math.min(speed * 0.5, 0.4);
      const angle = Math.atan2(velocityY, velocityX);
      
      // Appliquer déformation plus importante pendant le drag
      if (!shard.userData.originalPositions) return;
      
      const positions = shard.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const original = shard.userData.originalPositions[i];
        const dx = original.x;
        const dy = original.y;
        
        // Étirement dans la direction du mouvement
        const alignmentX = Math.cos(angle);
        const alignmentY = Math.sin(angle);
        const alignment = (dx * alignmentX + dy * alignmentY) / 2;
        
        positions.setXYZ(
          i,
          original.x * (1 + alignment * stretchAmount),
          original.y * (1 + alignment * stretchAmount * 0.5),
          original.z
        );
      }
      
      positions.needsUpdate = true;
      shard.geometry.computeVertexNormals();
    }
  }
  
  endDrag(shard) {
    shard.userData.isDragging = false;
    shard.userData.state = 'idle';
    this.draggedShard = null;
    
    // Restaurer géométrie après drag
    this.restoreOriginalGeometry(shard);
    
    // Impulsion spatiale réduite
    this.physics.applyImpulse(
      shard,
      shard.userData.velocity.x * 2,
      shard.userData.velocity.y * 2
    );
  }
  
  // === HOVER ===
  
  setHover(shard) {
    if (this.hoveredShard && this.hoveredShard !== shard) {
      this.hoveredShard.userData.state = 'idle';
    }
    
    shard.userData.state = 'hover';
    this.hoveredShard = shard;
    
    if (window.gsap) {
      window.gsap.to(shard.userData, {
        flattenAmount: 1,
        duration: 0.25,
        ease: 'power2.out'
      });
    }
  }
  
  clearHover() {
    if (this.hoveredShard) {
      this.hoveredShard.userData.state = 'idle';
      // Restaurer géométrie originale
      this.restoreOriginalGeometry(this.hoveredShard);
      if (window.gsap) {
        window.gsap.to(this.hoveredShard.userData, {
          flattenAmount: 0,
          duration: 0.25,
          ease: 'power2.out'
        });
      }
      
      this.hoveredShard = null;
    }
  }
  
  // === FOCUS ===
  
  setFocus(shard) {
    shard.userData.isFocused = true;
    shard.userData.state = 'focus';
    this.focusedShard = shard;
  }
  
  clearFocus() {
    if (this.focusedShard) {
      this.focusedShard.userData.isFocused = false;
      this.focusedShard.userData.state = 'idle';
      this.focusedShard.userData.focusZOffset = 0;
      this.focusedShard.position.z = this.focusedShard.userData.fixedZ;
      this.focusedShard = null;
    }
  }
  
  // === THEME ===
  
  setTheme(isDarkMode) {
    this.generator.isDarkMode = isDarkMode;
    this.shards.forEach(shard => {
      this.generator.updateShardTheme(shard, isDarkMode);
    });
  }
  
  // === GETTERS ===
  
  getAllShards() { return this.shards; }
  getShardByIndex(index) { return this.shards[index] || null; }
  getCurrentShard() { return this.shards[this.currentIndex]; }
  getCurrentIndex() { return this.currentIndex; }
  getTotalShards() { return this.shards.length; }
  getFocusedShard() { return this.focusedShard; }
  getHoveredShard() { return this.hoveredShard; }
  getDraggedShard() { return this.draggedShard; }
}
