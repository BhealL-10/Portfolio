/**
 * TimelineManager.js - Gestionnaire animations GSAP
 * Portfolio 3D V4.0
 */

import { FOCUS, SHARD, ANIMATION, FACETTE } from '../config/constants.js';

export class TimelineManager {
  constructor() {
    this.gsap = window.gsap;
    this.isReady = !!this.gsap;
    this.activeTimelines = new Map();
    
    if (!this.gsap) {
      console.warn('⚠️ GSAP not found - animations will be limited');
    }
  }
  
  init(shards) {
    console.log('✅ TimelineManager ready');
  }
  
  animateFocus(shard, camera, onComplete) {
    if (!this.gsap || !shard) return null;
    
    this.killTimeline(shard.uuid);
    
    shard.userData.originalRotation = shard.rotation.clone();
    shard.userData.originalPosition = shard.position.clone();
    
    const targetZ = shard.userData.fixedZ + FOCUS.Z_OFFSET;
    
    const tempQuat = shard.quaternion.clone();
    shard.lookAt(camera.position);
    const targetRotation = {
      x: shard.rotation.x,
      y: shard.rotation.y,
      z: shard.rotation.z
    };
    shard.quaternion.copy(tempQuat);
    
    const tl = this.gsap.timeline({
      onComplete: () => {
        shard.userData.isFocused = true;
        this.activeTimelines.delete(shard.uuid);
        if (onComplete) onComplete();
      }
    });
    
    this.activeTimelines.set(shard.uuid, tl);
    
    tl.to(shard.userData, {
      focusAmount: 1,
      duration: FOCUS.FOCUS_DURATION,
      ease: FOCUS.EASE_IN
    }, 0);
    
    tl.to(shard.position, {
      z: targetZ,
      duration: FOCUS.FOCUS_DURATION,
      ease: FOCUS.EASE_IN
    }, 0);
    
    tl.to(shard.position, {
      x: 0,
      y: 0,
      duration: FOCUS.FOCUS_DURATION,
      ease: FOCUS.EASE_IN
    }, 0);
    
    tl.to(shard.rotation, {
      x: targetRotation.x,
      y: targetRotation.y,
      z: targetRotation.z,
      duration: FOCUS.FOCUS_DURATION,
      ease: FOCUS.EASE_IN
    }, 0);
    
    const focusScale = SHARD.STATES.FOCUS.scale * shard.userData.baseScale.x;
    tl.to(shard.scale, {
      x: focusScale,
      y: focusScale,
      z: focusScale * (1 - SHARD.STATES.FOCUS.flattenAmount),
      duration: FOCUS.FOCUS_DURATION * 0.8,
      ease: FOCUS.EASE_IN
    }, 0);
    
    return tl;
  }
  
  animateUnfocus(shard, onComplete) {
    if (!this.gsap || !shard) return null;
    
    this.killTimeline(shard.uuid);
    
    const originalRot = shard.userData.originalRotation;
    const originalPos = shard.userData.originalPosition;
    const fixedZ = shard.userData.fixedZ;
    const baseScale = shard.userData.baseScale.x;
    
    const tl = this.gsap.timeline({
      onComplete: () => {
        shard.userData.isFocused = false;
        shard.userData.focusZOffset = 0;
        this.activeTimelines.delete(shard.uuid);
        if (onComplete) onComplete();
      }
    });
    
    this.activeTimelines.set(shard.uuid, tl);
    
    tl.to(shard.userData, {
      focusAmount: 0,
      duration: FOCUS.UNFOCUS_DURATION,
      ease: FOCUS.EASE_OUT
    }, 0);
    
    tl.to(shard.position, {
      z: fixedZ,
      duration: FOCUS.UNFOCUS_DURATION,
      ease: FOCUS.EASE_OUT
    }, 0);
    
    if (originalPos) {
      tl.to(shard.position, {
        x: originalPos.x,
        y: originalPos.y,
        duration: FOCUS.UNFOCUS_DURATION,
        ease: FOCUS.EASE_OUT
      }, 0);
    }
    
    if (originalRot) {
      tl.to(shard.rotation, {
        x: originalRot.x,
        y: originalRot.y,
        z: originalRot.z,
        duration: FOCUS.UNFOCUS_DURATION,
        ease: FOCUS.EASE_OUT
      }, 0);
    }
    
    const idleScale = SHARD.STATES.CURRENT.scale * baseScale;
    tl.to(shard.scale, {
      x: idleScale,
      y: idleScale,
      z: idleScale,
      duration: FOCUS.UNFOCUS_DURATION * 0.8,
      ease: FOCUS.EASE_OUT
    }, 0);
    
    return tl;
  }
  
  animateFacetteChange(shard, direction, onComplete) {
    if (!this.gsap || !shard) return null;
    
    const rotationAngle = FACETTE.ROTATION_ANGLE * direction;
    
    return this.gsap.to(shard.rotation, {
      y: shard.rotation.y + rotationAngle,
      duration: FACETTE.TRANSITION_DURATION,
      ease: FACETTE.TRANSITION_EASE,
      onComplete: onComplete
    });
  }
  
  animateStateTransition(shard, toState, duration = ANIMATION.DURATION.NORMAL) {
    if (!this.gsap || !shard) return null;
    
    const config = SHARD.STATES[toState.toUpperCase()] || SHARD.STATES.IDLE;
    const baseScale = shard.userData.baseScale?.x || 1;
    const targetScale = config.scale * baseScale;
    
    this.gsap.to(shard.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: duration,
      ease: ANIMATION.EASE.OUT
    });
    
    if (shard.material) {
      this.gsap.to(shard.material, {
        opacity: config.opacity,
        duration: duration * 0.8,
        ease: ANIMATION.EASE.OUT
      });
    }
    
    if (shard.material?.emissive) {
      const intensity = config.emissive;
      this.gsap.to(shard.material.emissive, {
        r: intensity,
        g: intensity * 0.9,
        b: intensity * 0.7,
        duration: duration,
        ease: ANIMATION.EASE.OUT
      });
    }
  }
  
  animatePostIntroEntry(camera, targetZ, shards, onComplete) {
    if (!this.gsap) {
      camera.teleportTo(targetZ);
      if (onComplete) onComplete();
      return;
    }
    
    const tl = this.gsap.timeline({ onComplete });
    
    tl.to(camera.targetPosition, {
      z: targetZ,
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0);
    
    shards.forEach((shard, index) => {
      tl.fromTo(shard.material, 
        { opacity: 0 },
        { 
          opacity: SHARD.STATES.IDLE.opacity,
          duration: 1.5,
          ease: 'power2.out'
        },
        0.1 * index
      );
    });
    
    return tl;
  }
  
  killTimeline(id) {
    const tl = this.activeTimelines.get(id);
    if (tl) {
      tl.kill();
      this.activeTimelines.delete(id);
    }
  }
  
  killAll() {
    this.activeTimelines.forEach(tl => tl.kill());
    this.activeTimelines.clear();
  }
  
  dispose() {
    this.killAll();
  }
}
