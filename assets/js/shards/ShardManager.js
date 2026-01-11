/**
 * ShardManager.js - Gestionnaire principal des shards
 * Portfolio 3D V3.0 - Amélioré avec meilleure gestion hover/morphing
 */

import * as THREE from 'three';
import { ShardGenerator } from './ShardGenerator.js';
import { ShardPhysics } from './ShardPhysics.js';
import { projects } from '../data/projects.js';
import { SHARD, CAMERA, SCROLL, ANIMATION } from '../config/constants.js';

export class ShardManager {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.shards = [];
    this.currentIndex = 0;
    this.previousIndex = -1;
    
    this.generator = new ShardGenerator();
    this.physics = new ShardPhysics();
    
    this.scrollManager = null;
    
    this.focusedShard = null;
    this.hoveredShard = null;
    this.draggedShard = null;
    
    this.globalTime = 0;
    
    this.infiniteLoopEnabled = SHARD.INFINITE_LOOP.ENABLED;
    this.totalDistance = 0;
  }
  
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
  
  update(scrollProgress, deltaTime) {
    this.globalTime += deltaTime;
    
    const shardScroll = Math.min(scrollProgress, 1.0);
    const newIndex = Math.floor(shardScroll * this.shards.length);
    this.currentIndex = Math.max(0, Math.min(newIndex, this.shards.length - 1));
    
    const indexChanged = this.currentIndex !== this.previousIndex;
    if (indexChanged) {
      this.onShardIndexChanged(this.previousIndex, this.currentIndex);
      this.previousIndex = this.currentIndex;
    }
    
    const cameraZ = this.camera.position.z;
    
    this.shards.forEach((shard, index) => {
      this.updateShardState(shard, index, cameraZ, scrollProgress);
      this.updateShardVisuals(shard, index);
      this.updateShardOrbital(shard, index);
      this.updateShardRotation(shard, index);
    });
    
    this.physics.update(this.shards, deltaTime);
  }
  
  updateShardState(shard, index, cameraZ, scrollProgress) {
    if (shard.userData.isFocused || shard.userData.isDragging) return;
    
    const shardZ = shard.userData.fixedZ;
    const distance = shardZ - cameraZ;
    
    let newState = 'idle';
    
    if (distance > -30 && distance < 80) {
      if (distance > -10 && distance < 30) {
        newState = 'current';
      } else if (distance >= 30 && distance < 80) {
        newState = 'approaching';
      } else if (distance >= -30 && distance <= -10) {
        newState = 'leaving';
      }
    }
    
    if (shard.userData.state !== newState && !shard.userData.isFocused) {
      shard.userData.state = newState;
      this.animateStateTransition(shard, newState);
    }
  }
  
  onShardIndexChanged(oldIndex, newIndex) {
    if (oldIndex >= 0 && oldIndex < this.shards.length) {
      const oldShard = this.shards[oldIndex];
      if (oldShard.userData.state === 'current' && !oldShard.userData.isFocused) {
        oldShard.userData.state = 'leaving';
        this.animateStateTransition(oldShard, 'leaving');
      }
    }
    
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
  
  updateShardVisuals(shard, index) {
    const state = shard.userData.state;
    const config = SHARD.STATES[state.toUpperCase()] || SHARD.STATES.IDLE;
    
    if (shard.material.emissive) {
      const intensity = config.emissive;
      const targetR = intensity;
      const targetG = intensity * 0.9;
      const targetB = intensity * 0.7;
      
      shard.material.emissive.r += (targetR - shard.material.emissive.r) * 0.1;
      shard.material.emissive.g += (targetG - shard.material.emissive.g) * 0.1;
      shard.material.emissive.b += (targetB - shard.material.emissive.b) * 0.1;
    }
    
    if (state === 'hover' && !shard.userData.isDragging) {
      this.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 1);
    }
    
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
  
  applyHoverMorphing(shard, amount = 1) {
    if (!shard.geometry.attributes.position) return;
    
    const positions = shard.geometry.attributes.position;
    const time = this.globalTime * ANIMATION.MORPH.FREQUENCY;
    
    if (!shard.userData.originalPositions) {
      shard.userData.originalPositions = [];
      for (let i = 0; i < positions.count; i++) {
        shard.userData.originalPositions.push({
          x: positions.getX(i),
          y: positions.getY(i),
          z: positions.getZ(i)
        });
      }
    }
    
    const morphStrength = ANIMATION.MORPH.STRENGTH * amount;
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
  
  updateShardOrbital(shard, index) {
    if (shard.userData.isDragging || shard.userData.isFocused) return;
    if (this.physics.isShardMoving(shard)) return;
    
    const orbitT = this.globalTime * shard.userData.orbitSpeed + shard.userData.orbitAngle;
    
    const scrollProgress = this.scrollManager ? this.scrollManager.getShardProgress() : 0;
    const shardScrollPosition = index / this.shards.length;
    const distanceFromScroll = Math.abs(scrollProgress - shardScrollPosition);
    
    const orbitMultiplier = 1.0 + (distanceFromScroll * SHARD.ORBIT.DISTANCE_MULTIPLIER);
    
    const targetX = Math.cos(orbitT) * SHARD.ORBIT.RADIUS_X * orbitMultiplier;
    const targetY = Math.sin(orbitT) * SHARD.ORBIT.RADIUS_Y * orbitMultiplier;
    
    const smoothing = 0.04;
    shard.position.x += (targetX - shard.position.x) * smoothing;
    shard.position.y += (targetY - shard.position.y) * smoothing;
    
    if (!shard.userData.isFocused) {
      shard.position.z = shard.userData.fixedZ;
    }
  }
  
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
    
    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    if (speed > 0.1) {
      const stretchAmount = Math.min(speed * 0.5, ANIMATION.MORPH.DRAG_STRETCH);
      const angle = Math.atan2(velocityY, velocityX);
      
      if (!shard.userData.originalPositions) return;
      
      const positions = shard.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const original = shard.userData.originalPositions[i];
        const dx = original.x;
        const dy = original.y;
        
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
    
    this.restoreOriginalGeometry(shard);
    
    this.physics.applyImpulse(
      shard,
      shard.userData.velocity.x * 2,
      shard.userData.velocity.y * 2
    );
  }
  
  setHover(shard) {
    if (this.hoveredShard && this.hoveredShard !== shard) {
      this.clearHover();
    }
    
    shard.userData.state = 'hover';
    this.hoveredShard = shard;
    
    if (window.gsap) {
      window.gsap.to(shard.userData, {
        hoverMorphAmount: 1,
        duration: 0.25,
        ease: 'power2.out'
      });
    } else {
      shard.userData.hoverMorphAmount = 1;
    }
  }
  
  clearHover() {
    if (this.hoveredShard) {
      const shard = this.hoveredShard;
      shard.userData.state = 'idle';
      
      if (window.gsap) {
        window.gsap.to(shard.userData, {
          hoverMorphAmount: 0,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            this.restoreOriginalGeometry(shard);
          }
        });
      } else {
        shard.userData.hoverMorphAmount = 0;
        this.restoreOriginalGeometry(shard);
      }
      
      this.hoveredShard = null;
    }
  }
  
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
  
  setTheme(isDarkMode) {
    this.generator.isDarkMode = isDarkMode;
    this.shards.forEach(shard => {
      this.generator.updateShardTheme(shard, isDarkMode);
    });
  }
  
  getAllShards() { return this.shards; }
  getShardByIndex(index) { return this.shards[index] || null; }
  getCurrentShard() { return this.shards[this.currentIndex]; }
  getCurrentIndex() { return this.currentIndex; }
  getTotalShards() { return this.shards.length; }
  getFocusedShard() { return this.focusedShard; }
  getHoveredShard() { return this.hoveredShard; }
  getDraggedShard() { return this.draggedShard; }
}
