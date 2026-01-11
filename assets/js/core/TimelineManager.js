/**
 * TimelineManager.js - Gestionnaire animations GSAP
 * Portfolio 3D V3.0
 * 
 * - Animations focus/unfocus
 * - Transitions entre états
 * - Changement de facettes
 */

import { FOCUS, SHARD, ANIMATION, FACETTE } from '../config/constants.js';

export class TimelineManager {
  constructor() {
    this.gsap = window.gsap;
    this.isReady = !!this.gsap;
    
    // Timelines actives
    this.activeTimelines = new Map();
    
    if (!this.gsap) {
      console.warn('⚠️ GSAP not found - animations will be limited');
    }
  }
  
  /**
   * Initialisation
   */
  init(shards) {
    console.log('✅ TimelineManager ready');
  }
  
  /**
   * Anime le focus d'un shard
   */
  animateFocus(shard, camera, onComplete) {
    if (!this.gsap || !shard) return null;
    
    // Annuler timeline existante
    this.killTimeline(shard.uuid);
    
    // Sauvegarder état original
    shard.userData.originalRotation = shard.rotation.clone();
    shard.userData.originalPosition = shard.position.clone();
    
    // Position Z cible
    const targetZ = shard.userData.fixedZ + FOCUS.Z_OFFSET;
    
    // Orienter vers caméra
    const tempQuat = shard.quaternion.clone();
    shard.lookAt(camera.position);
    const targetRotation = {
      x: shard.rotation.x,
      y: shard.rotation.y,
      z: shard.rotation.z
    };
    shard.quaternion.copy(tempQuat);
    
    // Timeline
    const tl = this.gsap.timeline({
      onComplete: () => {
        shard.userData.isFocused = true;
        this.activeTimelines.delete(shard.uuid);
        if (onComplete) onComplete();
      }
    });
    
    this.activeTimelines.set(shard.uuid, tl);
    
    // Focus amount
    tl.to(shard.userData, {
      focusAmount: 1,
      duration: FOCUS.FOCUS_DURATION,
      ease: FOCUS.EASE_IN
    }, 0);
    
    // Position Z
    tl.to(shard.position, {
      z: targetZ,
      duration: FOCUS.FOCUS_DURATION,
      ease: FOCUS.EASE_IN
    }, 0);
    
    // Position X/Y vers centre
    tl.to(shard.position, {
      x: 0,
      y: 0,
      duration: FOCUS.FOCUS_DURATION,
      ease: FOCUS.EASE_IN
    }, 0);
    
    // Rotation vers caméra
    tl.to(shard.rotation, {
      x: targetRotation.x,
      y: targetRotation.y,
      z: targetRotation.z,
      duration: FOCUS.FOCUS_DURATION,
      ease: FOCUS.EASE_IN
    }, 0);
    
    // Scale
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
  
  /**
   * Anime l'unfocus d'un shard
   */
  animateUnfocus(shard, onComplete) {
    if (!this.gsap || !shard) return null;
    
    // Annuler timeline existante
    this.killTimeline(shard.uuid);
    
    const originalRot = shard.userData.originalRotation;
    const originalPos = shard.userData.originalPosition;
    const fixedZ = shard.userData.fixedZ;
    const baseScale = shard.userData.baseScale.x;
    
    // Timeline
    const tl = this.gsap.timeline({
      onComplete: () => {
        shard.userData.isFocused = false;
        shard.userData.focusZOffset = 0;
        this.activeTimelines.delete(shard.uuid);
        if (onComplete) onComplete();
      }
    });
    
    this.activeTimelines.set(shard.uuid, tl);
    
    // Focus amount
    tl.to(shard.userData, {
      focusAmount: 0,
      duration: FOCUS.UNFOCUS_DURATION,
      ease: FOCUS.EASE_OUT
    }, 0);
    
    // Position Z
    tl.to(shard.position, {
      z: fixedZ,
      duration: FOCUS.UNFOCUS_DURATION,
      ease: FOCUS.EASE_OUT
    }, 0);
    
    // Position X/Y
    if (originalPos) {
      tl.to(shard.position, {
        x: originalPos.x,
        y: originalPos.y,
        duration: FOCUS.UNFOCUS_DURATION,
        ease: FOCUS.EASE_OUT
      }, 0);
    }
    
    // Rotation
    if (originalRot) {
      tl.to(shard.rotation, {
        x: originalRot.x,
        y: originalRot.y,
        z: originalRot.z,
        duration: FOCUS.UNFOCUS_DURATION,
        ease: FOCUS.EASE_OUT
      }, 0);
    }
    
    // Scale
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
  
  /**
   * Anime le changement de facette
   */
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
  
  /**
   * Anime la transition d'état d'un shard
   */
  animateStateTransition(shard, toState, duration = ANIMATION.DURATION.NORMAL) {
    if (!this.gsap || !shard) return null;
    
    const config = SHARD.STATES[toState.toUpperCase()] || SHARD.STATES.IDLE;
    const baseScale = shard.userData.baseScale?.x || 1;
    const targetScale = config.scale * baseScale;
    
    // Scale
    this.gsap.to(shard.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: duration,
      ease: ANIMATION.EASE.OUT
    });
    
    // Opacity
    if (shard.material) {
      this.gsap.to(shard.material, {
        opacity: config.opacity,
        duration: duration * 0.8,
        ease: ANIMATION.EASE.OUT
      });
    }
    
    // Emissive
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
  
  /**
   * Anime l'entrée post-intro
   */
  animatePostIntroEntry(camera, targetZ, shards, onComplete) {
    if (!this.gsap) {
      camera.teleportTo(targetZ);
      if (onComplete) onComplete();
      return;
    }
    
    const tl = this.gsap.timeline({ onComplete });
    
    // Animation caméra
    tl.to(camera.targetPosition, {
      z: targetZ,
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0);
    
    // Fade in des shards
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
  
  /**
   * Annule une timeline
   */
  killTimeline(id) {
    const tl = this.activeTimelines.get(id);
    if (tl) {
      tl.kill();
      this.activeTimelines.delete(id);
    }
  }
  
  /**
   * Annule toutes les timelines
   */
  killAll() {
    this.activeTimelines.forEach(tl => tl.kill());
    this.activeTimelines.clear();
  }
  
  dispose() {
    this.killAll();
  }
}
