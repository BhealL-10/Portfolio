/**
 * FocusController.js - Gestion du focus avec animations 4 phases améliorées
 * Portfolio 3D V3.0
 * 
 * Animations:
 * - Phase 1: Sphérique → Fragmenté (hover morphing)
 * - Phase 2: Fragmenté → Plat (aplatissement)
 * - Phase 3: Approche caméra + centrage
 * - Phase 4: Transformation matériau lumineux
 */

import * as THREE from 'three';
import { getActiveFacette, getProjectByIndex } from '../data/projects.js';
import { FOCUS, FACETTE, SCROLL, CATEGORIES, SHARD, CAMERA, ANIMATION } from '../config/constants.js';

const FocusState = {
  IDLE: 'idle',
  SCROLLING_TO_SHARD: 'scrolling_to_shard',
  FOCUSING: 'focusing',
  FOCUSED: 'focused',
  UNFOCUSING: 'unfocusing',
  EXITING: 'exiting'
};

export class FocusController {
  constructor(camera, shardManager, timelineManager) {
    this.camera = camera;
    this.shardManager = shardManager;
    this.timelineManager = timelineManager;
    
    this.focusedShard = null;
    this.state = FocusState.IDLE;
    
    this.currentTimeline = null;
    this.preFocusPosition = null;
    this.preFocusRotation = null;
    this.preFocusScale = null;
    
    this.autoFocusEnabled = FOCUS.AUTO_FOCUS_ENABLED;
    this.autoFocusTimer = null;
    this.lastShardIndex = -1;
    this.lastSubStep = -1;
    
    this.scrollManager = null;
    this.targetScrollProgress = 0;
    this.isAutoScrolling = false;
    
    this.guidedScrollEnabled = true;
    this.guidedScrollSpeed = 0.0002;
    this.guidedScrollPaused = false;
    
    this.lastShardVisited = -1;
    this.hasVisitedLastShard = false;
    
    this.focusPosition = new THREE.Vector3();
    this.focusRotation = new THREE.Euler();
    
    this.onFocusStart = null;
    this.onFocusComplete = null;
    this.onUnfocusComplete = null;
    this.onLastShardVisited = null;
    this.onScrollBlur = null;
    
    this.infoOverlay = null;
    this.createInfoOverlay();
  }
  
  setScrollManager(scrollManager) {
    this.scrollManager = scrollManager;
  }
  
  createInfoOverlay() {
    this.infoOverlay = document.createElement('div');
    this.infoOverlay.className = 'shard-info-overlay';
    this.infoOverlay.innerHTML = '<div class="shard-info-content"><div class="facette-nav"><button class="facette-prev">◀</button><span class="facette-indicator">1/3</span><button class="facette-next">▶</button></div><span class="shard-category"></span><h2 class="shard-title"></h2><p class="shard-description"></p><div class="shard-technologies"></div><div class="shard-links"></div></div>';
    
    this.infoOverlay.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:150;pointer-events:none;opacity:0;transition:opacity 0.4s ease;max-width:550px;width:90%;text-align:center;';
    
    document.body.appendChild(this.infoOverlay);
    this.setupFacetteNavigation();
  }
  
  setupFacetteNavigation() {
    const prevBtn = this.infoOverlay.querySelector('.facette-prev');
    const nextBtn = this.infoOverlay.querySelector('.facette-next');
    
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.changeFacette(-1);
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.changeFacette(1);
    });
  }
  
  update(currentShardIndex, currentSubStep = 0, deltaTime = 0.016) {
    if (this.guidedScrollEnabled && !this.guidedScrollPaused && 
        this.state === FocusState.IDLE && this.scrollManager) {
      const currentScroll = this.scrollManager.getScroll();
      if (currentScroll < 1.0) {
        this.scrollManager.addScroll(this.guidedScrollSpeed);
      }
    }
    
    if (this.isAutoScrolling && this.scrollManager) {
      const currentScroll = this.scrollManager.getScroll();
      const diff = this.targetScrollProgress - currentScroll;
      
      if (Math.abs(diff) > 0.001) {
        const scrollSpeed = Math.min(Math.abs(diff) * 0.15, 0.03);
        const scrollDelta = Math.sign(diff) * scrollSpeed;
        this.scrollManager.addScroll(scrollDelta);
        
        const blurAmount = Math.min(scrollSpeed * 50, 1.0);
        if (this.onScrollBlur) this.onScrollBlur(blurAmount);
      } else {
        this.isAutoScrolling = false;
        this.scrollManager.setScroll(this.targetScrollProgress);
        
        if (this.onScrollBlur) this.onScrollBlur(0);
        
        if (this.state === FocusState.SCROLLING_TO_SHARD) {
          setTimeout(() => {
            this.executeFocus(this.focusedShard);
          }, 200);
        }
      }
      return;
    }
    
    if (!this.autoFocusEnabled) return;
    
    if (currentShardIndex !== this.lastShardIndex) {
      this.lastShardIndex = currentShardIndex;
      this.lastSubStep = -1;
      
      if (this.autoFocusTimer) {
        clearTimeout(this.autoFocusTimer);
        this.autoFocusTimer = null;
      }
      
      if (this.state === FocusState.FOCUSED) {
        this.unfocus();
      }
    }
    
    if (currentSubStep !== this.lastSubStep) {
      this.lastSubStep = currentSubStep;
      
      const centerSubStep = Math.floor(SCROLL.SUB_STEPS_PER_SHARD * FOCUS.AUTO_FOCUS_SUB_STEP);
      
      if (currentSubStep === centerSubStep && this.state === FocusState.IDLE) {
        if (this.autoFocusTimer) {
          clearTimeout(this.autoFocusTimer);
        }
        
        this.autoFocusTimer = setTimeout(() => {
          const shard = this.shardManager.getShardByIndex(currentShardIndex);
          if (shard && this.state === FocusState.IDLE) {
            this.focus(shard, true);
          }
        }, FOCUS.AUTO_FOCUS_DELAY * 1000);
      }
    }
  }
  
  focus(shard, isAutoFocus = false) {
    if (!shard) return;
    
    if (this.state === FocusState.FOCUSING || this.state === FocusState.UNFOCUSING ||
        this.state === FocusState.SCROLLING_TO_SHARD || this.state === FocusState.FOCUSED) {
      console.log('⚠️ Animation en cours, arrêt forcé pour nouvelle shard');
      this.isAutoScrolling = false;
      
      if (window.gsap) {
        window.gsap.killTweensOf([this.camera.targetPosition, this.camera.lookAtTarget]);
      }
      
      if (this.currentTimeline) {
        this.currentTimeline.kill();
        this.currentTimeline = null;
      }
      
      if (this.focusedShard) {
        this.shardManager.clearFocus();
        this.hideInfo();
      }
      
      this.state = FocusState.IDLE;
    }
    
    const shardIndex = shard.userData.index;
    const currentScroll = this.scrollManager ? this.scrollManager.getScroll() : 0;
    const targetScroll = shardIndex / this.shardManager.getTotalShards();
    const scrollDiff = Math.abs(targetScroll - currentScroll);
    
    if (!isAutoFocus && scrollDiff > 0.05 && this.scrollManager) {
      console.log('🎯 Auto-scrolling to shard ' + shardIndex + '...');
      this.focusedShard = shard;
      this.state = FocusState.SCROLLING_TO_SHARD;
      this.targetScrollProgress = targetScroll;
      this.isAutoScrolling = true;
      this.guidedScrollPaused = true;
      
      if (this.scrollManager) {
        this.scrollManager.setLocked(true);
      }
      
      return;
    }
    
    this.executeFocus(shard);
  }
  
  executeFocus(shard) {
    if (this.state === FocusState.FOCUSED || !shard) return;
    
    this.focusedShard = shard;
    this.state = FocusState.FOCUSING;
    this.guidedScrollPaused = true;
    
    this.preFocusPosition = {
      x: shard.position.x,
      y: shard.position.y,
      z: shard.position.z
    };
    this.preFocusRotation = {
      x: shard.rotation.x,
      y: shard.rotation.y,
      z: shard.rotation.z
    };
    this.preFocusScale = {
      x: shard.scale.x,
      y: shard.scale.y,
      z: shard.scale.z
    };
    
    if (!shard.userData.originalPositions) {
      const positions = shard.geometry.attributes.position;
      shard.userData.originalPositions = [];
      for (let i = 0; i < positions.count; i++) {
        shard.userData.originalPositions.push({
          x: positions.getX(i),
          y: positions.getY(i),
          z: positions.getZ(i)
        });
      }
    }
    
    this.shardManager.setFocus(shard);
    
    if (this.onFocusStart) this.onFocusStart(shard);
    
    const shardZ = shard.userData.fixedZ;
    const cameraDistance = FOCUS.CAMERA_DISTANCE_BASE + (Math.abs(shardZ) * FOCUS.CAMERA_DISTANCE_MULTIPLIER * 0.01);
    this.focusPosition.set(0, 0, shardZ - cameraDistance);
    this.focusRotation.set(0, 0, 0);
    
    if (this.scrollManager) {
      this.scrollManager.setLocked(true);
    }
    
    if (window.gsap) {
      const timeline = window.gsap.timeline({
        onComplete: () => {
          this.state = FocusState.FOCUSED;
          this.showInfo(shard);
          if (this.onFocusComplete) this.onFocusComplete(shard);
          
          if (shard.userData.index > this.lastShardVisited) {
            this.lastShardVisited = shard.userData.index;
            
            if (shard.userData.index === this.shardManager.getTotalShards() - 1) {
              this.hasVisitedLastShard = true;
            }
          }
        }
      });
      
      // PHASE 1: Sphérique → Fragmentation (0-0.5s)
      timeline.to(shard.userData, {
        hoverMorphAmount: 1,
        duration: FOCUS.PHASE1_DURATION,
        ease: 'power2.out',
        onUpdate: () => {
          this.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        }
      }, 0);
      
      timeline.to(shard.scale, {
        x: shard.scale.x * 1.15,
        y: shard.scale.y * 1.15,
        z: shard.scale.z * 0.65,
        duration: FOCUS.PHASE1_DURATION,
        ease: 'power2.out'
      }, 0);
      
      // PHASE 2: Fragmentation → Totalement plat (0.5-1.2s)
      timeline.to(shard.scale, {
        x: FOCUS.SCALE * 2.5 * shard.userData.baseScale.x,
        y: FOCUS.SCALE * 2.5 * shard.userData.baseScale.y,
        z: 0.05,
        duration: FOCUS.PHASE2_DURATION,
        ease: 'power2.inOut'
      }, FOCUS.PHASE1_DURATION);
      
      timeline.to(shard.userData, {
        hoverMorphAmount: 0,
        duration: 0.4,
        ease: 'power2.in',
        onUpdate: () => {
          this.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        }
      }, FOCUS.PHASE1_DURATION);
      
      timeline.to(shard.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: FOCUS.PHASE2_DURATION,
        ease: 'power2.inOut'
      }, FOCUS.PHASE1_DURATION);
      
      // PHASE 3: Approche caméra + centrage (1.2-2.2s)
      const phase3Start = FOCUS.PHASE1_DURATION + FOCUS.PHASE2_DURATION;
      timeline.to(shard.position, {
        x: 0,
        y: 0,
        z: shardZ,
        duration: FOCUS.PHASE3_DURATION,
        ease: 'power2.inOut'
      }, phase3Start);
      
      timeline.to(this.camera.targetPosition, {
        x: this.focusPosition.x,
        y: this.focusPosition.y,
        z: this.focusPosition.z,
        duration: FOCUS.PHASE3_DURATION,
        ease: 'power2.inOut'
      }, phase3Start);
      
      // PHASE 4: Transformation matériau (1.5-2.2s)
      const phase4Start = phase3Start + 0.3;
      timeline.to(shard.material, {
        opacity: 0.95,
        emissiveIntensity: FOCUS.EMISSIVE * 1.5,
        metalness: 0.1,
        roughness: 0.3,
        duration: FOCUS.PHASE4_DURATION,
        ease: 'power2.out'
      }, phase4Start);
      
      this.currentTimeline = timeline;
    } else {
      this.camera.teleportTo(this.focusPosition.z, this.focusPosition.x, this.focusPosition.y);
      shard.position.set(0, 0, shardZ);
      this.state = FocusState.FOCUSED;
      this.showInfo(shard);
    }
  }
  
  enforceFocusPosition(shard) {
    if (!shard || this.state !== FocusState.FOCUSED) return;
    
    const shardZ = shard.userData.fixedZ;
    const cameraDistance = FOCUS.CAMERA_DISTANCE_BASE + (Math.abs(shardZ) * FOCUS.CAMERA_DISTANCE_MULTIPLIER * 0.01);
    
    shard.position.set(0, 0, shardZ);
    shard.rotation.set(0, shard.rotation.y, 0);
    
    this.camera.targetPosition.set(0, 0, shardZ - cameraDistance);
    this.camera.lookAtTarget.set(0, 0, shardZ);
    
    const focusScaleX = FOCUS.SCALE * 2.5 * shard.userData.baseScale.x;
    const focusScaleY = FOCUS.SCALE * 2.5 * shard.userData.baseScale.y;
    const focusScaleZ = 0.05;
    shard.scale.set(focusScaleX, focusScaleY, focusScaleZ);
    
    shard.material.opacity = 0.95;
    shard.material.emissiveIntensity = FOCUS.EMISSIVE * 1.5;
  }
  
  applyHoverMorphing(shard, amount) {
    if (!shard.geometry.attributes.position || !shard.userData.originalPositions) return;
    
    const positions = shard.geometry.attributes.position;
    const time = this.shardManager ? this.shardManager.globalTime * 2 : Date.now() * 0.002;
    
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
  
  unfocus() {
    if (this.state !== FocusState.FOCUSED || !this.focusedShard) return;
    
    this.state = FocusState.UNFOCUSING;
    const shard = this.focusedShard;
    
    this.hideInfo();
    
    if (window.gsap) {
      const timeline = window.gsap.timeline({
        onComplete: () => {
          this.repositionShardAfterUnfocus(shard);
        }
      });
      
      // PHASE 1: Recul caméra (0-0.8s)
      timeline.to(this.camera.targetPosition, {
        z: this.camera.targetPosition.z - 15,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 0);
      
      // PHASE 2: Retour matériau (0-0.5s)
      timeline.to(shard.material, {
        opacity: SHARD.STATES.IDLE.opacity,
        emissiveIntensity: SHARD.STATES.IDLE.emissive,
        metalness: 0.35,
        roughness: 0.65,
        duration: 0.5,
        ease: 'power2.out'
      }, 0);
      
      // PHASE 3: Plat → Fragmenté (0.3-0.8s)
      timeline.to(shard.scale, {
        x: this.preFocusScale.x * 1.15,
        y: this.preFocusScale.y * 1.15,
        z: this.preFocusScale.z * 0.65,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.3);
      
      timeline.to(shard.userData, {
        hoverMorphAmount: 1,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: () => {
          this.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        }
      }, 0.3);
      
      // PHASE 4: Fragmenté → Sphérique (0.8-1.3s)
      timeline.to(shard.userData, {
        hoverMorphAmount: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          this.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        },
        onComplete: () => {
          this.shardManager.restoreOriginalGeometry(shard);
        }
      }, 0.8);
      
      timeline.to(shard.scale, {
        x: this.preFocusScale.x,
        y: this.preFocusScale.y,
        z: this.preFocusScale.z,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0.8);
      
      // PHASE 5: Retour position originale (1.0-1.8s)
      timeline.to(shard.position, {
        x: this.preFocusPosition.x,
        y: this.preFocusPosition.y,
        z: this.preFocusPosition.z,
        duration: 0.8,
        ease: 'power2.out'
      }, 1.0);
      
      timeline.to(shard.rotation, {
        x: this.preFocusRotation.x,
        y: this.preFocusRotation.y,
        z: this.preFocusRotation.z,
        duration: 0.8,
        ease: 'power2.out'
      }, 1.0);
      
      this.currentTimeline = timeline;
    } else {
      this.repositionShardAfterUnfocus(shard);
    }
  }
  
  repositionShardAfterUnfocus(shard) {
    this.shardManager.clearFocus();
    this.focusedShard = null;
    this.state = FocusState.IDLE;
    this.guidedScrollPaused = false;
    this.currentTimeline = null;
    
    if (this.scrollManager) {
      this.scrollManager.setLocked(false);
    }
    
    if (this.hasVisitedLastShard && this.onLastShardVisited) {
      this.onLastShardVisited();
    }
    
    if (this.onUnfocusComplete) this.onUnfocusComplete(shard);
  }
  
  changeFacette(direction) {
    if (!this.focusedShard || this.state !== FocusState.FOCUSED) return;
    
    const shard = this.focusedShard;
    const currentFacette = shard.userData.activeFacette;
    const totalFacettes = shard.userData.facettes.length;
    const newFacette = (currentFacette + direction + totalFacettes) % totalFacettes;
    
    shard.userData.activeFacette = newFacette;
    
    if (window.gsap && FACETTE.TRIANGLE_ROTATION) {
      const focusScaleX = FOCUS.SCALE * 2.5 * shard.userData.baseScale.x;
      const focusScaleY = FOCUS.SCALE * 2.5 * shard.userData.baseScale.y;
      const focusScaleZ = 0.05;
      
      const timeline = window.gsap.timeline({
        onComplete: () => {
          this.updateInfo(shard);
          this.enforceFocusPosition(shard);
        }
      });
      
      // Phase 1: Morphing triangulaire (0-0.4s)
      if (FACETTE.MORPH_DURING_TRANSITION) {
        timeline.to(shard.scale, {
          x: focusScaleX * 0.85,
          y: focusScaleY * 0.85,
          z: FACETTE.TRIANGLE_SCALE_DEPTH,
          duration: 0.4,
          ease: 'power2.in'
        }, 0);
      }
      
      // Phase 2: Rotation Y de 120° (0.2-1.0s)
      const rotationAmount = direction * FACETTE.ROTATION_ANGLE;
      timeline.to(shard.rotation, {
        y: shard.rotation.y + rotationAmount,
        duration: FACETTE.TRANSITION_DURATION,
        ease: FACETTE.TRANSITION_EASE
      }, 0.2);
      
      // Phase 3: Retour à plat (0.6-1.0s)
      if (FACETTE.MORPH_DURING_TRANSITION) {
        timeline.to(shard.scale, {
          x: focusScaleX,
          y: focusScaleY,
          z: focusScaleZ,
          duration: 0.4,
          ease: 'power2.out'
        }, 0.6);
      }
      
    } else if (window.gsap) {
      window.gsap.to(shard.rotation, {
        y: shard.rotation.y + (direction * Math.PI * 0.5),
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          this.updateInfo(shard);
          this.enforceFocusPosition(shard);
        }
      });
    } else {
      this.updateInfo(shard);
    }
  }
  
  showInfo(shard) {
    this.updateInfo(shard);
    this.infoOverlay.style.opacity = '1';
    this.infoOverlay.style.pointerEvents = 'auto';
  }
  
  hideInfo() {
    this.infoOverlay.style.opacity = '0';
    this.infoOverlay.style.pointerEvents = 'none';
  }
  
  updateInfo(shard) {
    const project = getProjectByIndex(shard.userData.index);
    if (!project) return;
    
    const facette = project.facettes[shard.userData.activeFacette];
    if (!facette) return;
    
    const total = project.facettes.length;
    const current = shard.userData.activeFacette + 1;
    
    this.infoOverlay.querySelector('.facette-indicator').textContent = current + '/' + total;
    
    const categoryEl = this.infoOverlay.querySelector('.shard-category');
    const categoryInfo = CATEGORIES[facette.category] || { label: facette.category };
    categoryEl.textContent = categoryInfo.label || facette.category;
    
    this.infoOverlay.querySelector('.shard-title').textContent = facette.title;
    this.infoOverlay.querySelector('.shard-description').textContent = facette.description;
    
    const techContainer = this.infoOverlay.querySelector('.shard-technologies');
    techContainer.innerHTML = facette.technologies.map(tech => '<span class="tech-badge">' + tech + '</span>').join('');
    
    const linksContainer = this.infoOverlay.querySelector('.shard-links');
    linksContainer.innerHTML = '';
    if (facette.links) {
      Object.entries(facette.links).forEach(([key, url]) => {
        if (url) {
          const link = document.createElement('a');
          link.href = url;
          link.className = 'shard-link';
          link.textContent = key.charAt(0).toUpperCase() + key.slice(1);
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          linksContainer.appendChild(link);
        }
      });
    }
  }
  
  isFocused() { return this.state === FocusState.FOCUSED; }
  getFocusedShard() { return this.focusedShard; }
  isScrollingToShard() { return this.state === FocusState.SCROLLING_TO_SHARD; }
  toggleGuidedScroll(enabled) { this.guidedScrollEnabled = enabled; }
}
