/**
 * ShardManager.js - Gestionnaire principal des shards
 * Portfolio 3D V4.0 - Hover/Drag morphing amélioré
 */

import * as THREE from 'three';
import { ShardGenerator } from './ShardGenerator.js';
import { ShardPhysics } from './ShardPhysics.js';
import { projects } from '../data/projects.js';
import { SHARD, CAMERA, SCROLL, ANIMATION, DRAG, FACETTE, THEME } from '../config/constants.js';

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
      this.updateShardOrbit(shard, index);
      this.updateShardRotation(shard, index);
      this.updateContinuousMorphing(shard);
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
  }
  
  updateContinuousMorphing(shard) {
    const hoverAmount = shard.userData.hoverMorphAmount || 0;
    const dragAmount = shard.userData.dragMorphAmount || 0;
    
    if (hoverAmount > 0 || dragAmount > 0) {
      this.applyCombinedMorphing(shard, hoverAmount, dragAmount);
    }
  }
  
  applyCombinedMorphing(shard, hoverAmount = 0, dragAmount = 0) {
    if (!shard.geometry.attributes.position) return;
    if (shard.userData.isFragmenting) return;
    
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
    
    const hoverStrength = ANIMATION.MORPH.STRENGTH * hoverAmount;
    const dragStrength = DRAG.DEFORM.STRENGTH * dragAmount;
    const totalStrength = hoverStrength;
    
    for (let i = 0; i < positions.count; i++) {
      const original = shard.userData.originalPositions[i];
      const hoverOffset = Math.sin(time + i * 0.5) * totalStrength;
      const dragOffset = dragStrength * Math.sin(i * 0.3);
      
      positions.setXYZ(
        i,
        original.x * (1 + hoverOffset + dragOffset),
        original.y * (1 + hoverOffset * 0.8 + dragOffset * 0.5),
        original.z * (1 + hoverOffset * 0.6)
      );
    }
    
    positions.needsUpdate = true;
    shard.geometry.computeVertexNormals();
  }
  
  applyHoverMorphing(shard, amount = 1) {
    this.applyCombinedMorphing(shard, amount, shard.userData.dragMorphAmount || 0);
  }
  
  applyFacetteFragmentation(shard, rotationProgress = 0, direction = 1, defragAmount = 1) {
    if (!shard.geometry.attributes.position) return;
    
    shard.userData.isFragmenting = true;
    
    const positions = shard.geometry.attributes.position;
    
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
    
    const angle = rotationProgress * Math.PI * direction;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    const time = this.globalTime * ANIMATION.MORPH.FREQUENCY;
    const defragStrength = ANIMATION.MORPH.STRENGTH * defragAmount * 0.3;
    
    for (let i = 0; i < positions.count; i++) {
      const original = shard.userData.originalPositions[i];
      
      const rotatedX = original.x * cos - original.z * sin;
      const rotatedZ = original.x * sin + original.z * cos;
      
      const defragOffset = Math.sin(time + i * 0.5) * defragStrength;
      
      positions.setXYZ(
        i,
        rotatedX * (1 + defragOffset),
        original.y * (1 + defragOffset * 0.8),
        rotatedZ * (1 + defragOffset * 0.2)
      );
    }
    
    positions.needsUpdate = true;
    shard.geometry.computeVertexNormals();
  }
  
  restoreOriginalGeometry(shard) {
    if (!shard.userData.originalPositions) return;
    
    shard.userData.isFragmenting = false;
    
    const positions = shard.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const original = shard.userData.originalPositions[i];
      positions.setXYZ(i, original.x, original.y, original.z);
    }
    
    positions.needsUpdate = true;
    shard.geometry.computeVertexNormals();
  }
  
  updateShardOrbit(shard, index) {
    if (shard.userData.isDragging || shard.userData.isFocused) return;
    if (this.physics.isShardMoving(shard)) return;
    
    const orbitT = this.globalTime * shard.userData.orbitSpeed + shard.userData.orbitAngle;
    
    const scrollProgress = this.scrollManager ? this.scrollManager.getShardProgress() : 0;
    const currentShardIndex = Math.round(scrollProgress * this.shards.length);
    const indexDistance = Math.abs(currentShardIndex - index);
    
    let orbitMultiplier;
    if (indexDistance <= 1) {
      const shardScrollPosition = index / this.shards.length;
      const distanceFromScroll = Math.abs(scrollProgress - shardScrollPosition);
      const baseOrbitMultiplier = 0.3;
      const maxOrbitMultiplier = 1.5;
      orbitMultiplier = baseOrbitMultiplier + (distanceFromScroll * (maxOrbitMultiplier - baseOrbitMultiplier) * SHARD.ORBIT.DISTANCE_MULTIPLIER);
    } else {
      const normalizedIndex = index / this.shards.length;
      orbitMultiplier = 0.3 + (normalizedIndex * 2.7);
    }
    
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
    
    if (shard.userData.isFocused) {
      return;
    }
    
    const velocityX = worldPosition.x - shard.position.x;
    const velocityY = worldPosition.y - shard.position.y;
    
    shard.userData.velocity.set(velocityX, velocityY);
    shard.position.x = worldPosition.x;
    shard.position.y = worldPosition.y;
    
    if (DRAG.DEFORM.ENABLED) {
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      shard.userData.dragMorphAmount = Math.min(speed * 2, 1);
      
      if (DRAG.DEFORM.COMBINES_WITH_HOVER && shard.userData.hoverMorphAmount > 0) {
        this.applyCombinedMorphing(shard, shard.userData.hoverMorphAmount, shard.userData.dragMorphAmount);
      } else {
        this.applyDragDeformation(shard, velocityX, velocityY, speed);
      }
    }
  }
  
  applyDragDeformation(shard, velocityX, velocityY, speed) {
    if (!shard.userData.originalPositions) return;
    
    const stretchAmount = Math.min(speed * 0.5, ANIMATION.MORPH.DRAG_STRETCH);
    const angle = Math.atan2(velocityY, velocityX);
    
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
  
  endDrag(shard) {
    if (shard.userData.isFocused) {
      shard.userData.isDragging = false;
      this.draggedShard = null;
      return;
    }
    
    shard.userData.isDragging = false;
    shard.userData.state = 'idle';
    shard.userData.dragMorphAmount = 0;
    this.draggedShard = null;
    
    this.restoreOriginalGeometry(shard);
    
    this.physics.applyImpulse(
      shard,
      shard.userData.velocity.x * 0.3,
      shard.userData.velocity.y * 0.3
    );
  }
  
  setHover(shard) {
    if (shard.userData.isFocused) {
      return;
    }
    
    if (this.hoveredShard && this.hoveredShard !== shard) {
      this.clearHover();
    }
    
    shard.userData.state = 'hover';
    this.hoveredShard = shard;
    
    if (window.gsap) {
      window.gsap.to(shard.userData, {
        hoverMorphAmount: ANIMATION.MORPH.MAX_AMOUNT,
        duration: 0.25,
        ease: 'power2.out'
      });
    } else {
      shard.userData.hoverMorphAmount = ANIMATION.MORPH.MAX_AMOUNT;
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
            if (!shard.userData.isFocused) {
              this.restoreOriginalGeometry(shard);
            }
          }
        });
      } else {
        shard.userData.hoverMorphAmount = 0;
        if (!shard.userData.isFocused) {
          this.restoreOriginalGeometry(shard);
        }
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
      if (shard.userData.isFocused) {
        const theme = isDarkMode ? THEME.DARK : THEME.LIGHT;
        shard.material.color.setHex(theme.shardColor);
        shard.material.emissive.setHex(theme.emissiveColor);
        shard.material.needsUpdate = true;
      } else {
        this.generator.updateShardTheme(shard, isDarkMode);
      }
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
