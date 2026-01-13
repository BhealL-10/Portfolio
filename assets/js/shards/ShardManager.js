/**
 * ShardManager.js - Gestionnaire principal des shards V6.0
 * Portfolio 3D - Physique fluide avec logos intégrés sur géométrie
 */

import * as THREE from 'three';
import { ShardGenerator } from './ShardGenerator.js';
import { ShardPhysics } from './ShardPhysics.js';
import { ShardLogo } from './ShardLogo.js';
import { projects } from '../data/projects.js';
import { SHARD, CAMERA, SCROLL, ANIMATION, DRAG, FACETTE, THEME } from '../config/constants.js';

export class ShardManager {
  constructor(scene, camera, deviceManager) {
    this.scene = scene;
    this.camera = camera;
    this.deviceManager = deviceManager;
    this.shards = [];
    this.currentIndex = 0;
    this.previousIndex = -1;
    
    this.shardLogo = null;
    
    try {
      this.shardLogo = new ShardLogo(scene, deviceManager, camera);
    } catch (e) {
      console.warn('ShardLogo init failed:', e);
    }
    
    this.generator = new ShardGenerator(deviceManager, this.shardLogo);
    this.physics = new ShardPhysics();
    
    this.scrollManager = null;
    this.isDarkMode = false;
    
    this.focusedShard = null;
    this.hoveredShard = null;
    this.draggedShard = null;
    
    this.globalTime = 0;
    
    this.infiniteLoopEnabled = SHARD.INFINITE_LOOP.ENABLED;
    this.totalDistance = 0;
  }
  
  async generateShards() {
    this.shards = await this.generator.generateAllShards(projects, this.scene);
    
    const config = this.deviceManager ? this.deviceManager.getShardConfig() : SHARD.RESPONSIVE.DESKTOP;
    const zSpacing = config.Z_SPACING || SHARD.Z_SPACING;
    this.totalDistance = projects.length * zSpacing;
    
    console.log(`✅ Generated ${this.shards.length} shards with integrated logos (total distance: ${this.totalDistance})`);
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
      this.updateShardDistanceScaling(shard, index);
      this.updateShardOrbit(shard, index);
      this.updateShardRotation(shard, index);
      this.updateContinuousMorphing(shard);
      
      const isCurrentShard = index === this.currentIndex;
      const isFocused = shard.userData.isFocused || false;
      this.shardLogo?.updateLogoVisibility(shard, isCurrentShard, isFocused);
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
  
  updateShardDistanceScaling(shard, index) {
    if (shard.userData.isFocused || shard.userData.isDragging) return;
    if (!SHARD.DISTANCE_SCALING.ENABLED) return;
    
    const cameraZ = this.camera.position.z;
    const shardZ = shard.userData.fixedZ;
    const distance = Math.abs(shardZ - cameraZ);
    
    let distanceScale = 1.0;
    
    if (distance > SHARD.DISTANCE_SCALING.DISTANCE_THRESHOLD) {
      const excessDistance = distance - SHARD.DISTANCE_SCALING.DISTANCE_THRESHOLD;
      distanceScale = 1.0 + (excessDistance * SHARD.DISTANCE_SCALING.SCALE_FACTOR);
      distanceScale = Math.min(distanceScale, SHARD.DISTANCE_SCALING.MAX_SCALE);
    } else {
      distanceScale = Math.max(SHARD.DISTANCE_SCALING.MIN_SCALE, 1.0 - (distance * 0.001));
    }
    
    const state = shard.userData.state;
    const stateConfig = SHARD.STATES[state.toUpperCase()] || SHARD.STATES.IDLE;
    const baseScale = shard.userData.baseScale.x;
    const targetScale = baseScale * stateConfig.scale * distanceScale;
    
    const smoothing = 0.08;
    shard.scale.x += (targetScale - shard.scale.x) * smoothing;
    shard.scale.y += (targetScale - shard.scale.y) * smoothing;
    shard.scale.z += (targetScale - shard.scale.z) * smoothing;
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
    
    const dragDirX = shard.userData.dragDirectionX ?? 0.5;
    const dragDirY = shard.userData.dragDirectionY ?? 0.5;
    
    for (let i = 0; i < positions.count; i++) {
      const original = shard.userData.originalPositions[i];
      const hoverOffset = Math.sin(time + i * 0.5) * hoverStrength;
      
      const flattenX = 1 - (dragDirY * dragStrength);
      const flattenY = 1 - (dragDirX * dragStrength);
      
      positions.setXYZ(
        i,
        original.x * (1 + hoverOffset) * flattenX,
        original.y * (1 + hoverOffset * 0.8) * flattenY,
        original.z * (1 + hoverOffset * 0.6)
      );
    }
    
    positions.needsUpdate = true;
    shard.geometry.computeVertexNormals();
  }
  
  applyHoverMorphing(shard, amount = 1) {
    this.applyCombinedMorphing(shard, amount, shard.userData.dragMorphAmount || 0);
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
    
    const config = this.deviceManager ? this.deviceManager.getShardConfig() : SHARD.RESPONSIVE.DESKTOP;
    const orbitConfig = config.ORBIT || SHARD.ORBIT;
    const radiusX = orbitConfig.RADIUS_X || SHARD.ORBIT.RADIUS_X;
    const radiusY = orbitConfig.RADIUS_Y || SHARD.ORBIT.RADIUS_Y;
    const spiralConfig = SHARD.ORBIT.SPIRAL;
    
    shard.userData.orbitAngle += shard.userData.orbitSpeed * 0.016;
    const orbitT = shard.userData.orbitAngle;
    
    const cameraZ = this.camera.position.z;
    const shardZ = shard.userData.fixedZ;
    const distanceFromCamera = Math.abs(shardZ - cameraZ);
    
    let orbitMultiplier;
    
    if (spiralConfig.ENABLED) {
      const indexFactor = index * spiralConfig.INDEX_FACTOR;
      const distanceFactor = distanceFromCamera * spiralConfig.CAMERA_DISTANCE_FACTOR;
      
      orbitMultiplier = spiralConfig.BASE_MULTIPLIER + indexFactor + distanceFactor;
      orbitMultiplier = Math.min(orbitMultiplier, spiralConfig.MAX_MULTIPLIER);
      
      const zDiff = shardZ - cameraZ;
      if (zDiff < 0) {
        orbitMultiplier *= spiralConfig.Z_CONVERGENCE;
      }
    } else {
      const scrollProgress = this.scrollManager ? this.scrollManager.getShardProgress() : 0;
      const currentShardIndex = Math.round(scrollProgress * this.shards.length);
      const indexDistance = Math.abs(currentShardIndex - index);
      
      if (indexDistance <= 1) {
        const shardScrollPosition = index / this.shards.length;
        const distanceFromScroll = Math.abs(scrollProgress - shardScrollPosition);
        const baseOrbitMultiplier = 0.3;
        const maxOrbitMultiplier = 1.2;
        orbitMultiplier = baseOrbitMultiplier + (distanceFromScroll * (maxOrbitMultiplier - baseOrbitMultiplier) * SHARD.ORBIT.DISTANCE_MULTIPLIER);
      } else {
        const normalizedIndex = index / this.shards.length;
        orbitMultiplier = 0.4 + (normalizedIndex * 1.5);
      }
    }
    
    const targetX = Math.cos(orbitT) * radiusX * orbitMultiplier;
    const targetY = Math.sin(orbitT) * radiusY * orbitMultiplier;
    
    if (!shard.userData.targetOrbitPosition) {
      shard.userData.targetOrbitPosition = new THREE.Vector2(targetX, targetY);
    } else {
      shard.userData.targetOrbitPosition.set(targetX, targetY);
    }
    
    const smoothing = SHARD.ORBIT.SMOOTHING;
    shard.position.x += (targetX - shard.position.x) * smoothing;
    shard.position.y += (targetY - shard.position.y) * smoothing;
    
    if (!shard.userData.isFocused) {
      const targetZ = shard.userData.fixedZ;
      const zSmoothingFactor = 0.05;
      shard.position.z += (targetZ - shard.position.z) * zSmoothingFactor;
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
    
    if (shard.userData.isFocused) return;
    
    const velocityX = worldPosition.x - shard.position.x;
    const velocityY = worldPosition.y - shard.position.y;
    
    shard.userData.velocity.set(velocityX, velocityY);
    shard.position.x = worldPosition.x;
    shard.position.y = worldPosition.y;
    
    if (DRAG.DEFORM.ENABLED) {
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      shard.userData.dragMorphAmount = Math.min(speed * 2, 1);
      
      const absVelX = Math.abs(velocityX);
      const absVelY = Math.abs(velocityY);
      const totalVel = absVelX + absVelY;
      
      if (totalVel > 0.001) {
        shard.userData.dragDirectionX = absVelX / totalVel;
        shard.userData.dragDirectionY = absVelY / totalVel;
      } else {
        shard.userData.dragDirectionX = 0.5;
        shard.userData.dragDirectionY = 0.5;
      }
      
      this.applyCombinedMorphing(shard, shard.userData.hoverMorphAmount || 0, shard.userData.dragMorphAmount);
    }
  }
  
  endDrag(shard) {
    if (!shard) return;
    
    shard.userData.isDragging = false;
    shard.userData.wasRecentlyDragged = true;
    this.draggedShard = null;
    
    this.physics.applyImpulse(
      shard,
      shard.userData.velocity.x,
      shard.userData.velocity.y
    );
    
    if (!shard.userData.isFocused) {
      shard.userData.state = 'idle';
    }
    
    if (DRAG.DEFORM.ENABLED && shard.userData.dragMorphAmount > 0) {
      gsap.to(shard.userData, {
        dragMorphAmount: 0,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: () => {
          this.applyCombinedMorphing(shard, shard.userData.hoverMorphAmount || 0, shard.userData.dragMorphAmount);
        },
        onComplete: () => {
          this.restoreOriginalGeometry(shard);
        }
      });
    }
    
    setTimeout(() => {
      shard.userData.wasRecentlyDragged = false;
    }, DRAG.RETURN_DELAY);
  }
  
  onShardDragEnd(shard) {
    this.endDrag(shard);
  }
  
  setHover(shard) {
    if (shard.userData.isFocused) return;
    
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
    this.isDarkMode = isDarkMode;
    this.generator.isDarkMode = isDarkMode;
    
    this.shardLogo?.setTheme(isDarkMode);
    
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
