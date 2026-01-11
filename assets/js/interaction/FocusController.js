/**
 * FocusController.js - Gestion du focus avec positionnement précis et animations scriptées
 * Portfolio 3D V3.0
 */

import * as THREE from 'three';
import { getActiveFacette, getProjectByIndex } from '../data/projects.js';
import { FOCUS, FACETTE, SCROLL, CATEGORIES, SHARD, CAMERA } from '../config/constants.js';

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
    
    this.shardManager.setFocus(shard);
    
    if (this.onFocusStart) this.onFocusStart(shard);
    
    const shardZ = shard.userData.fixedZ;
    this.focusPosition.set(0, 0, shardZ - FOCUS.CAMERA_DISTANCE);
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
      
      timeline.to(this.camera.targetPosition, {
        x: this.focusPosition.x,
        y: this.focusPosition.y,
        z: this.focusPosition.z,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0);
      
      timeline.to(shard.scale, {
        x: FOCUS.SCALE * shard.userData.baseScale.x,
        y: FOCUS.SCALE * shard.userData.baseScale.y,
        z: FOCUS.SCALE * shard.userData.baseScale.z,
        duration: 1.0,
        ease: 'back.out(1.5)'
      }, 0);
      
      timeline.to(shard.position, {
        x: 0,
        y: 0,
        duration: 1.0,
        ease: 'power2.out'
      }, 0);
      
      timeline.to(shard.material, {
        opacity: 1,
        emissiveIntensity: FOCUS.EMISSIVE,
        duration: 0.8,
        ease: 'power2.out'
      }, 0);
    } else {
      this.camera.teleportTo(this.focusPosition.z, this.focusPosition.x, this.focusPosition.y);
      shard.position.set(0, 0, shardZ);
      this.state = FocusState.FOCUSED;
      this.showInfo(shard);
    }
  }
  
  unfocus() {
    if (this.state !== FocusState.FOCUSED || !this.focusedShard) return;
    
    this.state = FocusState.UNFOCUSING;
    const shard = this.focusedShard;
    
    this.hideInfo();
    
    const exitDirections = [
      { x: 0, y: 50, angle: 0 },
      { x: 0, y: -50, angle: 0 },
      { x: 50, y: 0, angle: 0 },
      { x: -50, y: 0, angle: 0 },
      { x: 35, y: 35, angle: 45 },
      { x: -35, y: 35, angle: -45 },
      { x: 35, y: -35, angle: 45 },
      { x: -35, y: -35, angle: -45 }
    ];
    
    const exitDir = exitDirections[Math.floor(Math.random() * exitDirections.length)];
    
    if (window.gsap) {
      const timeline = window.gsap.timeline({
        onComplete: () => {
          this.repositionShardAfterUnfocus(shard);
        }
      });
      
      timeline.to(shard.position, {
        x: exitDir.x,
        y: exitDir.y,
        duration: 1.0,
        ease: 'power2.in'
      }, 0);
      
      timeline.to(shard.rotation, {
        z: (exitDir.angle * Math.PI) / 180,
        duration: 1.0,
        ease: 'power2.in'
      }, 0);
      
      timeline.to(shard.material, {
        opacity: 0.3,
        duration: 0.8,
        ease: 'power2.in'
      }, 0);
      
    } else {
      this.repositionShardAfterUnfocus(shard);
    }
  }
  
  repositionShardAfterUnfocus(shard) {
    this.state = FocusState.EXITING;
    
    const orbitalAngle = shard.userData.orbitAngle;
    const targetX = Math.cos(orbitalAngle) * SHARD.ORBIT.RADIUS_X * 0.5;
    const targetY = Math.sin(orbitalAngle) * SHARD.ORBIT.RADIUS_Y * 0.5;
    
    if (window.gsap) {
      const timeline = window.gsap.timeline({
        onComplete: () => {
          this.shardManager.clearFocus();
          this.focusedShard = null;
          this.state = FocusState.IDLE;
          this.guidedScrollPaused = false;
          
          if (this.scrollManager) {
            this.scrollManager.setLocked(false);
          }
          
          if (this.hasVisitedLastShard && this.onLastShardVisited) {
            this.onLastShardVisited();
          }
          
          if (this.onUnfocusComplete) this.onUnfocusComplete(shard);
        }
      });
      
      timeline.to(shard.position, {
        x: targetX,
        y: targetY,
        z: shard.userData.fixedZ,
        duration: 1.5,
        ease: 'power2.out'
      }, 0);
      
      timeline.to(shard.rotation, {
        z: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, 0);
      
      timeline.to(shard.scale, {
        x: SHARD.STATES.IDLE.scale * shard.userData.baseScale.x,
        y: SHARD.STATES.IDLE.scale * shard.userData.baseScale.y,
        z: SHARD.STATES.IDLE.scale * shard.userData.baseScale.z,
        duration: 1.2,
        ease: 'power2.out'
      }, 0);
      
      timeline.to(shard.material, {
        opacity: SHARD.STATES.IDLE.opacity,
        emissiveIntensity: SHARD.STATES.IDLE.emissive,
        duration: 1.0,
        ease: 'power2.out'
      }, 0);
      
    } else {
      shard.position.set(targetX, targetY, shard.userData.fixedZ);
      this.shardManager.clearFocus();
      this.focusedShard = null;
      this.state = FocusState.IDLE;
      this.guidedScrollPaused = false;
      
      if (this.scrollManager) {
        this.scrollManager.setLocked(false);
      }
    }
  }
  
  changeFacette(direction) {
    if (!this.focusedShard) return;
    
    const shard = this.focusedShard;
    const currentFacette = shard.userData.activeFacette;
    const totalFacettes = shard.userData.facettes.length;
    const newFacette = (currentFacette + direction + totalFacettes) % totalFacettes;
    
    shard.userData.activeFacette = newFacette;
    
    if (window.gsap) {
      window.gsap.to(shard.rotation, {
        y: shard.rotation.y + (direction * Math.PI * 0.5),
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          this.updateInfo(shard);
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
  
  isFocused() {
    return this.state === FocusState.FOCUSED;
  }
  
  getFocusedShard() {
    return this.focusedShard;
  }
  
  isScrollingToShard() {
    return this.state === FocusState.SCROLLING_TO_SHARD;
  }
  
  toggleGuidedScroll(enabled) {
    this.guidedScrollEnabled = enabled;
  }
}
