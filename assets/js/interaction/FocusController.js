/**
 * FocusController.js - Gestion focus optimisée avec animations facettes
 * Portfolio 3D V4.0
 * 
 * - Animation facette 1.5s avec fade texte
 * - Auto-focus et focus rapide avec blur
 * - Correction automatique position caméra/shard
 * - Hover fragmentation continue pendant focus
 */

import * as THREE from 'three';
import { getActiveFacette, getProjectByIndex } from '../data/projects.js';
import { FOCUS, FACETTE, SCROLL, CATEGORIES, SHARD, CAMERA, ANIMATION, DRAG, DEVICE } from '../config/constants.js';

const FocusState = {
  IDLE: 'idle',
  SCROLLING_TO_SHARD: 'scrolling_to_shard',
  FOCUSING: 'focusing',
  FOCUSED: 'focused',
  CHANGING_FACETTE: 'changing_facette',
  UNFOCUSING: 'unfocusing',
  EXITING: 'exiting'
};

export class FocusController {
  constructor(shardManager, camera, scrollManager, timelineManager) {
    this.shardManager = shardManager;
    this.camera = camera;
    this.scrollManager = scrollManager;
    this.timelineManager = timelineManager;
    this.deviceManager = null;
    
    this.dragStartRotationY = 0;
    this.dragAccumulatedDelta = 0;
    
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
    this.renderer = null;
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
    this.onNavigationBarToggle = null;
    this.onScrollBlur = null;
    
    this.infoOverlay = null;
    this.createInfoOverlay();
  }
  
  setScrollManager(scrollManager) {
    this.scrollManager = scrollManager;
  }
  
  setRenderer(renderer) {
    this.renderer = renderer;
  }
  
  setDeviceManager(deviceManager) {
    this.deviceManager = deviceManager;
  }
  
  getDeviceFocusConfig() {
    if (!FOCUS.RESPONSIVE || !this.deviceManager) {
      return { scale: FOCUS.SCALE, cameraDistance: FOCUS.CAMERA_DISTANCE, zOffset: FOCUS.Z_OFFSET };
    }
    
    const width = this.deviceManager.screenWidth;
    
    if (width < DEVICE.BREAKPOINTS.MOBILE) {
      return DEVICE.FOCUS.MOBILE;
    } else if (width < DEVICE.BREAKPOINTS.TABLET) {
      return DEVICE.FOCUS.TABLET;
    } else {
      return DEVICE.FOCUS.DESKTOP;
    }
  }
  
  createInfoOverlay() {
    this.infoOverlay = document.createElement('div');
    this.infoOverlay.className = 'shard-info-overlay';
    this.infoOverlay.innerHTML = `
      <div class="shard-info-content">
        <div class="facette-nav">
          <button class="facette-prev">◀</button>
          <span class="facette-indicator">1/3</span>
          <button class="facette-next">▶</button>
        </div>
        <span class="shard-category"></span>
        <h2 class="shard-title"></h2>
        <p class="shard-description"></p>
        <div class="shard-technologies"></div>
        <div class="shard-links"></div>
      </div>
    `;
    
    this.infoOverlay.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:150;pointer-events:auto;opacity:0;transition:opacity 0.4s ease;max-width:550px;width:90%;text-align:center;';
    
    document.body.appendChild(this.infoOverlay);
    this.setupFacetteNavigation();
    this.setupInfoOverlayProtection();
  }
  
  setupInfoOverlayProtection() {
    this.infoOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  setupFacetteNavigation() {
    const prevBtn = this.infoOverlay.querySelector('.facette-prev');
    const nextBtn = this.infoOverlay.querySelector('.facette-next');
    
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.state === FocusState.FOCUSED) {
        this.changeFacette(-1);
      } else if (this.state === FocusState.CHANGING_FACETTE) {
        console.log('🔒 Facette prev ignored: already changing facette');
      } else {
        console.warn('⚠️ Facette prev button clicked but state=' + this.state);
      }
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.state === FocusState.FOCUSED) {
        this.changeFacette(1);
      } else if (this.state === FocusState.CHANGING_FACETTE) {
        console.log('🔒 Facette next ignored: already changing facette');
      } else {
        console.warn('⚠️ Facette next button clicked but state=' + this.state);
      }
    });
  }
  
  update(currentShardIndex, currentSubStep = 0, deltaTime = 0.016) {
    if (this.state === FocusState.FOCUSED || this.state === FocusState.CHANGING_FACETTE) {
      this.enforceFocusPosition();
    }
    
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
      
      if (Math.abs(diff) > 0.005) {
        const blurIntensity = Math.min(Math.abs(diff) * 15, FOCUS.QUICK_FOCUS.BLUR_AMOUNT);
        if (this.renderer) {
          this.renderer.setBlur(blurIntensity);
        }
      } else {
        this.isAutoScrolling = false;
        this.scrollManager.setScroll(this.targetScrollProgress);
        
        if (this.renderer) {
          this.renderer.animateBlur(0, 0.3);
        }
        
        if (this.state === FocusState.SCROLLING_TO_SHARD) {
          if (this.scrollManager) {
            this.scrollManager.setLocked(true);
          }
          setTimeout(() => {
            this.executeFocus(this.focusedShard);
            
            if (this.focusedShard && this.scrollManager && this.scrollManager.onSectionChange) {
              this.scrollManager.onSectionChange(this.focusedShard.userData.index, -1);
            }
          }, 200);
        }
      }
      return;
    }
    
    if (!this.autoFocusEnabled) return;
    
    if (currentShardIndex !== this.lastShardIndex) {
      const shardIndexDiff = Math.abs(currentShardIndex - this.lastShardIndex);
      
      if (this.autoFocusTimer) {
        clearTimeout(this.autoFocusTimer);
        this.autoFocusTimer = null;
      }
      
      if (this.state === FocusState.CHANGING_FACETTE) {
        console.log('🔒 Ignoring scroll during facette change (state=CHANGING_FACETTE)');
      } else if (this.state === FocusState.FOCUSED) {
        if (this.focusedShard && currentShardIndex !== this.focusedShard.userData.index) {
          console.log('⚠️ User scrolled to different shard (current=' + currentShardIndex + ', focused=' + this.focusedShard.userData.index + ') - scheduling unfocus()');
          this.state = FocusState.UNFOCUSING;
          setTimeout(() => {
            this.unfocus();
          }, 100);
        } else {
          console.log('🔒 Ignoring micro-scroll during focus (still on shard ' + currentShardIndex + ')');
        }
      } else if (this.state === FocusState.UNFOCUSING) {
        console.log('🔒 Ignoring scroll during unfocus animation');
      }
      
      this.lastShardIndex = currentShardIndex;
      this.lastSubStep = -1;
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
    if (!shard) {
      console.warn('❌ focus() called with null shard');
      return;
    }
    
    console.log('🎯 focus() called: shard=' + shard.userData.index + ', isAutoFocus=' + isAutoFocus + ', currentState=' + this.state);
    
    if (this.state !== FocusState.IDLE) {
      console.log('⚠️ Animation en cours, arrêt forcé pour nouvelle shard');
      this.forceReset();
    }
    
    const shardIndex = shard.userData.index;
    const currentScroll = this.scrollManager ? this.scrollManager.getScroll() : 0;
    const targetScroll = shardIndex / this.shardManager.getTotalShards();
    const scrollDiff = Math.abs(targetScroll - currentScroll);
    
    if (!isAutoFocus && scrollDiff > 0.05 && this.scrollManager && FOCUS.QUICK_FOCUS.ENABLED) {
      console.log('🎯 Quick focus to shard ' + shardIndex + ' (scroll: ' + currentScroll.toFixed(3) + ' → ' + targetScroll.toFixed(3) + ')');
      this.focusedShard = shard;
      this.state = FocusState.SCROLLING_TO_SHARD;
      this.targetScrollProgress = targetScroll;
      this.isAutoScrolling = true;
      this.guidedScrollPaused = true;
      
      this.scrollManager.scrollTo(targetScroll, false);
      
      return;
    }
    
    this.executeFocus(shard);
  }
  
  forceReset() {
    this.isAutoScrolling = false;
    
    if (window.gsap) {
      window.gsap.killTweensOf([this.camera.targetPosition, this.camera.lookAtTarget]);
      if (this.focusedShard) {
        window.gsap.killTweensOf([this.focusedShard.position, this.focusedShard.rotation, this.focusedShard.scale, this.focusedShard.material, this.focusedShard.userData]);
      }
    }
    
    if (this.currentTimeline) {
      this.currentTimeline.kill();
      this.currentTimeline = null;
    }
    
    if (this.focusedShard) {
      const shard = this.focusedShard;
      
      if (this.preFocusPosition && this.preFocusRotation && this.preFocusScale) {
        shard.position.set(this.preFocusPosition.x, this.preFocusPosition.y, this.preFocusPosition.z);
        shard.rotation.set(this.preFocusRotation.x, this.preFocusRotation.y, this.preFocusRotation.z);
        shard.scale.set(this.preFocusScale.x, this.preFocusScale.y, this.preFocusScale.z);
        
        shard.material.emissiveIntensity = 0;
        shard.material.metalness = 0.35;
        shard.material.roughness = 0.65;
      }
      
      shard.userData.state = 'idle';
      shard.userData.isFragmenting = false;
      shard.userData.hoverMorphAmount = 0;
      
      this.shardManager.restoreOriginalGeometry(shard);
      this.shardManager.clearFocus();
      this.hideInfo();
    }
    
    if (this.renderer) {
      this.renderer.setBlur(0);
    }
    
    this.camera.setFocusMode(false);
    this.focusedShard = null;
    this.state = FocusState.IDLE;
    
    if (this.onNavigationBarToggle) {
      this.onNavigationBarToggle(true);
    }
  }
  
  executeFocus(shard) {
    if (!shard) return;
    
    console.log('▶️ executeFocus: shard=' + shard.userData.index);
    
    this.focusedShard = shard;
    this.state = FocusState.FOCUSING;
    this.guidedScrollPaused = true;
    
    if (this.onNavigationBarToggle) {
      this.onNavigationBarToggle(false);
    }
    
    if (this.shardManager.shardTitle) {
      this.shardManager.shardTitle.setFocusActive(true);
    }
    
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
    const deviceConfig = this.getDeviceFocusConfig();
    const cameraDistance = deviceConfig.CAMERA_DISTANCE || deviceConfig.cameraDistance || FOCUS.CAMERA_DISTANCE;
    const focusScale = deviceConfig.SCALE || deviceConfig.scale || FOCUS.SCALE;
    
    this.focusPosition.set(0, 0, shardZ - cameraDistance);
    this.focusRotation.set(0, 0, 0);
    
    this.camera.setFocusMode(true, shardZ);
    
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
      
      const focusScaleX = focusScale * 2.5 * shard.userData.baseScale.x;
      const focusScaleY = focusScale * 2.5 * shard.userData.baseScale.y;
      
      let timeOffset = 0;
      
      timeline.to(shard.userData, {
        hoverMorphAmount: FOCUS.DEFRAG_INTENSITY || 1,
        duration: FOCUS.DEFRAG_DURATION,
        ease: 'power2.out',
        onUpdate: () => {
          this.shardManager.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        }
      }, timeOffset);
      timeOffset += FOCUS.DEFRAG_DURATION;
      
      timeline.to(shard.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: FOCUS.ROTATION_DURATION,
        ease: 'power2.inOut'
      }, timeOffset);
      
      timeline.to(shard.position, {
        x: 0,
        y: 0,
        duration: FOCUS.ROTATION_DURATION,
        ease: 'power2.inOut'
      }, timeOffset);
      timeOffset += FOCUS.ROTATION_DURATION;
      
      timeline.to(shard.userData, {
        hoverMorphAmount: 0,
        duration: FOCUS.REFRAG_DURATION,
        ease: 'power2.in',
        onUpdate: () => {
          this.shardManager.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        }
      }, timeOffset);
      
      timeline.to(shard.scale, {
        x: focusScaleX,
        y: focusScaleY,
        z: 0.05,
        duration: FOCUS.REFRAG_DURATION,
        ease: 'power2.in'
      }, timeOffset);
      timeOffset += FOCUS.REFRAG_DURATION;
      
      timeline.to(shard.position, {
        z: shardZ,
        duration: FOCUS.POSITION_DURATION,
        ease: 'power2.inOut'
      }, timeOffset);
      
      timeline.to(this.camera.targetPosition, {
        x: this.focusPosition.x,
        y: this.focusPosition.y,
        z: this.focusPosition.z,
        duration: FOCUS.POSITION_DURATION,
        ease: 'power2.inOut'
      }, timeOffset);
      
      timeline.to(this.camera.lookAtTarget, {
        x: 0,
        y: 0,
        z: shardZ,
        duration: FOCUS.POSITION_DURATION,
        ease: 'power2.inOut'
      }, timeOffset);
      
      timeline.to(shard.material, {
        emissiveIntensity: 0,
        metalness: 0,
        roughness: 1,
        duration: FOCUS.POSITION_DURATION,
        ease: 'power2.out'
      }, timeOffset);
      
      this.currentTimeline = timeline;
    } else {
      this.camera.teleportTo(this.focusPosition.z, this.focusPosition.x, this.focusPosition.y);
      shard.position.set(0, 0, shardZ);
      this.state = FocusState.FOCUSED;
      this.showInfo(shard);
    }
  }
  
  enforceFocusPosition() {
    if (!this.focusedShard || this.state !== FocusState.FOCUSED) return;
    
    const shard = this.focusedShard;
    const shardZ = shard.userData.fixedZ;
    
    const targetShardX = 0;
    const targetShardY = 0;
    const targetCameraZ = shardZ - FOCUS.CAMERA_DISTANCE;
    
    const positionError = Math.abs(shard.position.x - targetShardX) + 
                          Math.abs(shard.position.y - targetShardY) +
                          Math.abs(this.camera.targetPosition.z - targetCameraZ);
    
    if (positionError > FOCUS.POSITION_CORRECTION.THRESHOLD) {
      const smoothing = FOCUS.POSITION_CORRECTION.SMOOTHING;
      
      shard.position.x += (targetShardX - shard.position.x) * smoothing;
      shard.position.y += (targetShardY - shard.position.y) * smoothing;
      shard.position.z = shardZ;
      
      this.camera.targetPosition.x += (0 - this.camera.targetPosition.x) * smoothing;
      this.camera.targetPosition.y += (0 - this.camera.targetPosition.y) * smoothing;
      this.camera.targetPosition.z += (targetCameraZ - this.camera.targetPosition.z) * smoothing;
      
      this.camera.lookAtTarget.x += (0 - this.camera.lookAtTarget.x) * smoothing;
      this.camera.lookAtTarget.y += (0 - this.camera.lookAtTarget.y) * smoothing;
      this.camera.lookAtTarget.z += (shardZ - this.camera.lookAtTarget.z) * smoothing;
    }
  }
  
  unfocus() {
    if (!this.focusedShard) {
      console.warn('❌ unfocus() called but no focused shard');
      return;
    }
    
    if (this.state === FocusState.CHANGING_FACETTE) {
      console.warn('❌ unfocus() called in invalid state: ' + this.state);
      return;
    }
    
    console.log('🔙 unfocus() starting from state: ' + this.state);
    this.state = FocusState.UNFOCUSING;
    const shard = this.focusedShard;
    
    this.hideInfo();
    this.camera.setFocusMode(false);
    
    if (window.gsap) {
      const timeline = window.gsap.timeline({
        onComplete: () => {
          this.repositionShardAfterUnfocus(shard);
        }
      });
      
      let timeOffset = 0;
      
      timeline.to(shard.userData, {
        hoverMorphAmount: FOCUS.DEFRAG_INTENSITY || 1,
        duration: FOCUS.REFRAG_DURATION,
        ease: 'power2.out',
        onUpdate: () => {
          this.shardManager.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        }
      }, timeOffset);
      
      timeline.to(shard.scale, {
        x: this.preFocusScale.x * 1.2,
        y: this.preFocusScale.y * 1.2,
        z: this.preFocusScale.z * 0.5,
        duration: FOCUS.REFRAG_DURATION,
        ease: 'power2.out'
      }, timeOffset);
      timeOffset += FOCUS.REFRAG_DURATION;
      
      timeline.to(shard.rotation, {
        x: this.preFocusRotation.x,
        y: this.preFocusRotation.y,
        z: this.preFocusRotation.z,
        duration: FOCUS.ROTATION_DURATION,
        ease: 'power2.inOut'
      }, timeOffset);
      
      timeline.to(shard.userData, {
        hoverMorphAmount: 0,
        duration: FOCUS.ROTATION_DURATION,
        ease: 'power2.in',
        onUpdate: () => {
          this.shardManager.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        },
        onComplete: () => {
          this.shardManager.restoreOriginalGeometry(shard);
        }
      }, timeOffset);
      
      timeline.to(shard.scale, {
        x: this.preFocusScale.x,
        y: this.preFocusScale.y,
        z: this.preFocusScale.z,
        duration: FOCUS.ROTATION_DURATION,
        ease: 'power2.in'
      }, timeOffset);
      timeOffset += FOCUS.ROTATION_DURATION;
      
      timeline.to(shard.position, {
        x: this.preFocusPosition.x,
        y: this.preFocusPosition.y,
        z: this.preFocusPosition.z,
        duration: FOCUS.UNFOCUS_DURATION,
        ease: 'power2.out'
      }, timeOffset);
      
      timeline.to(this.camera.targetPosition, {
        z: this.camera.targetPosition.z - 15,
        duration: FOCUS.UNFOCUS_DURATION,
        ease: 'power2.inOut'
      }, timeOffset);
      
      timeline.to(shard.material, {
        emissiveIntensity: SHARD.STATES.IDLE.emissive,
        metalness: 0.35,
        roughness: 0.65,
        duration: FOCUS.UNFOCUS_DURATION,
        ease: 'power2.out'
      }, timeOffset);
      
      this.currentTimeline = timeline;
    } else {
      this.repositionShardAfterUnfocus(shard);
    }
  }
  
  repositionShardAfterUnfocus(shard) {
    if (!shard) return;
    
    shard.userData.state = 'idle';
    shard.userData.isFragmenting = false;
    
    this.focusedShard = null;
    
    if (this.onNavigationBarToggle) {
      this.onNavigationBarToggle(true);
    }
    
    if (this.shardManager.shardTitle) {
      this.shardManager.shardTitle.setFocusActive(false);
    }
    
    setTimeout(() => {
      this.state = FocusState.IDLE;
      
      if (this.scrollManager) {
        this.scrollManager.setLocked(false);
        console.log('✅ Scroll réactivé après unfocus complet');
      }
    }, 100);
    
    if (this.hasVisitedLastShard && this.onLastShardVisited) {
      this.onLastShardVisited();
    }
    
    if (this.onUnfocusComplete) this.onUnfocusComplete(shard);
  }
  
  changeFacette(direction, fromDrag = false) {
    console.log('🔄 changeFacette() called: direction=' + direction + ', fromDrag=' + fromDrag + ', state=' + this.state + ', focusedShard=' + (this.focusedShard ? this.focusedShard.userData.index : 'null'));
    
    if (!this.focusedShard) {
      console.warn('❌ changeFacette: no focused shard');
      return;
    }
    
    if (this.state === FocusState.CHANGING_FACETTE) {
      console.warn('🚫 changeFacette BLOCKED: Already changing facette, ignoring new request');
      return;
    }
    
    if (this.state !== FocusState.FOCUSED) {
      console.warn('❌ changeFacette: invalid state=' + this.state + ' (must be FOCUSED)');
      return;
    }
    
    if (window.gsap && this.currentTimeline) {
      console.log('⚠️ Killing previous facette timeline');
      this.currentTimeline.kill();
      this.currentTimeline = null;
    }
    
    this.state = FocusState.CHANGING_FACETTE;
    
    if (this.scrollManager) {
      this.scrollManager.setLocked(true);
    }
    
    const shard = this.focusedShard;
    const currentFacette = shard.userData.activeFacette;
    const totalFacettes = shard.userData.facettes.length;
    const newFacette = (currentFacette + direction + totalFacettes) % totalFacettes;
    
    shard.userData.activeFacette = newFacette;
    
    const deviceConfig = this.getDeviceFocusConfig();
    const focusScale = deviceConfig.SCALE || deviceConfig.scale || FOCUS.SCALE;
    
    const focusScaleX = focusScale * 2.5 * shard.userData.baseScale.x;
    const focusScaleY = focusScale * 2.5 * shard.userData.baseScale.y;
    const focusScaleZ = 0.05;
    
    if (window.gsap) {
      const infoContent = this.infoOverlay.querySelector('.shard-info-content');
      
      const timeline = window.gsap.timeline({
        onComplete: () => {
          this.state = FocusState.FOCUSED;
          this.enforceFocusPositionImmediate();
          this.currentTimeline = null;
          
          if (this.scrollManager) {
            this.scrollManager.setLocked(true);
          }
        }
      });
      
      this.currentTimeline = timeline;
      
      timeline.to(infoContent, {
        opacity: 0,
        duration: FACETTE.TEXT_FADE_DURATION,
        ease: 'power2.in'
      }, 0);
      
      let timeOffset = FACETTE.TEXT_FADE_DELAY;
      
      timeline.to(shard.userData, {
        hoverMorphAmount: FACETTE.DEFRAG_INTENSITY || 1,
        duration: FACETTE.DEFRAG_DURATION,
        ease: 'power2.out',
        onUpdate: () => {
          this.shardManager.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        }
      }, timeOffset);
      
      timeline.to(shard.scale, {
        x: focusScaleX * 0.85,
        y: focusScaleY * 0.85,
        z: FACETTE.SCALE_DEPTH,
        duration: FACETTE.DEFRAG_DURATION,
        ease: 'power2.out'
      }, timeOffset);
      timeOffset += FACETTE.DEFRAG_DURATION;
      
      const currentRotation = shard.rotation.y;
      let targetRotation;
      
      if (fromDrag) {
        const absCurrentRotation = Math.abs(currentRotation);
        const remainingRotation = Math.PI - absCurrentRotation;
        
        if (currentRotation > 0) {
          targetRotation = currentRotation + remainingRotation;
        } else {
          targetRotation = currentRotation - remainingRotation;
        }
      } else {
        targetRotation = currentRotation + (Math.PI * direction);
      }
      
      timeline.to(shard.rotation, {
        y: targetRotation,
        duration: FACETTE.ROTATION_DURATION,
        ease: 'power2.inOut',
        onComplete: () => {
          shard.rotation.y = 0;
        }
      }, timeOffset);
      timeOffset += FACETTE.ROTATION_DURATION;
      
      timeline.to(shard.userData, {
        hoverMorphAmount: 0,
        duration: FACETTE.REFRAG_DURATION,
        ease: 'power2.in',
        onUpdate: () => {
          this.shardManager.applyHoverMorphing(shard, shard.userData.hoverMorphAmount || 0);
        },
        onComplete: () => {
          this.shardManager.restoreOriginalGeometry(shard);
        }
      }, timeOffset);
      
      timeline.to(shard.scale, {
        x: focusScaleX,
        y: focusScaleY,
        z: 0.05,
        duration: FACETTE.REFRAG_DURATION,
        ease: 'power2.in'
      }, timeOffset);
      
      const totalDuration = timeOffset + FACETTE.REFRAG_DURATION;
      
      timeline.call(() => {
        this.updateInfo(shard);
      }, [], totalDuration * 0.6);
      
      timeline.to(infoContent, {
        opacity: 1,
        duration: FACETTE.TEXT_FADE_DURATION,
        ease: 'power2.out'
      }, totalDuration - FACETTE.TEXT_FADE_DURATION);
      
    } else {
      this.updateInfo(shard);
      this.state = FocusState.FOCUSED;
    }
  }
  
  updateDragRotation(shard, deltaX) {
    if (!this.focusedShard || this.focusedShard !== shard) return;
    if (this.state !== FocusState.FOCUSED) return;
    if (this.state === FocusState.CHANGING_FACETTE) return;
    
    const rotationAmount = deltaX * DRAG.FOCUS.ROTATION_SPEED;
    let targetRotationY = this.dragStartRotationY + rotationAmount;
    
    const rotationDelta = targetRotationY - this.dragStartRotationY;
    const clampedDelta = Math.max(-DRAG.FOCUS.MAX_ROTATION_ANGLE, Math.min(DRAG.FOCUS.MAX_ROTATION_ANGLE, rotationDelta));
    targetRotationY = this.dragStartRotationY + clampedDelta;
    
    const absDelta = Math.abs(clampedDelta);
    const threshold = DRAG.FOCUS.MAX_ROTATION_ANGLE * DRAG.FOCUS.AUTO_CHANGE_THRESHOLD;
    
    if (absDelta >= threshold && !this.autoChangeFacetteTriggered) {
      this.autoChangeFacetteTriggered = true;
      const direction = clampedDelta > 0 ? 1 : -1;
      
      if (window.gsap) {
        const targetRotation = this.dragStartRotationY + (direction === 1 ? DRAG.FOCUS.MAX_ROTATION_ANGLE : -DRAG.FOCUS.MAX_ROTATION_ANGLE);
        window.gsap.to(shard.rotation, {
          y: targetRotation,
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            this.changeFacette(direction, true);
          }
        });
      } else {
        this.changeFacette(direction, true);
      }
      return;
    }
    
    shard.rotation.y += (targetRotationY - shard.rotation.y) * DRAG.FOCUS.SMOOTH_ROTATION;
    
    this.dragAccumulatedDelta = deltaX;
  }
  
  onDragEndInFocus(shard) {
    if (!this.focusedShard || this.focusedShard !== shard) return;
    if (this.state !== FocusState.FOCUSED && this.state !== FocusState.CHANGING_FACETTE) return;
    
    if (!this.autoChangeFacetteTriggered) {
      const currentRotation = shard.rotation.y;
      const rotationDelta = currentRotation - this.dragStartRotationY;
      
      if (Math.abs(rotationDelta) > 0.01) {
        if (window.gsap) {
          window.gsap.to(shard.rotation, {
            y: this.dragStartRotationY,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          shard.rotation.y = this.dragStartRotationY;
        }
      }
    }
    
    this.dragAccumulatedDelta = 0;
    this.autoChangeFacetteTriggered = false;
  }
  
  onDragStartInFocus(shard) {
    if (!this.focusedShard || this.focusedShard !== shard) return;
    if (this.state !== FocusState.FOCUSED) return;
    
    shard.rotation.y = 0;
    this.dragStartRotationY = 0;
    this.dragAccumulatedDelta = 0;
    this.autoChangeFacetteTriggered = false;
  }
  
  enforceFocusPositionImmediate() {
    if (!this.focusedShard) return;
    
    const shard = this.focusedShard;
    const shardZ = shard.userData.fixedZ;
    
    shard.position.set(0, 0, shardZ);
    shard.rotation.x = 0;
    shard.rotation.z = 0;
    
    const focusScaleX = FOCUS.SCALE * 2.5 * shard.userData.baseScale.x;
    const focusScaleY = FOCUS.SCALE * 2.5 * shard.userData.baseScale.y;
    shard.scale.set(focusScaleX, focusScaleY, 0.05);
    
    this.camera.targetPosition.set(0, 0, shardZ - FOCUS.CAMERA_DISTANCE);
    this.camera.lookAtTarget.set(0, 0, shardZ);
    
    shard.material.opacity = 1.0;
    shard.material.emissiveIntensity = FOCUS.EMISSIVE * 1.5;
  }
  
  showInfo(shard) {
    if (!this.infoOverlay) return;
    
    this.updateInfo(shard);
    this.infoOverlay.style.opacity = '1';
    this.infoOverlay.style.pointerEvents = 'auto';
  }
  
  hideInfo() {
    if (!this.infoOverlay) return;
    this.infoOverlay.style.opacity = '0';
    setTimeout(() => {
      if (this.infoOverlay && this.infoOverlay.style.opacity === '0') {
        this.infoOverlay.style.pointerEvents = 'none';
      }
    }, 400);
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
  isChangingFacette() { return this.state === FocusState.CHANGING_FACETTE; }
  isUnfocusing() { return this.state === FocusState.UNFOCUSING; }
  canUnfocus() { 
    return this.state === FocusState.FOCUSED && 
           this.state !== FocusState.CHANGING_FACETTE && 
           this.state !== FocusState.UNFOCUSING;
  }
  toggleGuidedScroll(enabled) { this.guidedScrollEnabled = enabled; }
}
