/**
 * TimelineManager.js - Gestionnaire d'animations GSAP
 * Portfolio 3D V2.0
 * 
 * Fichier minimal - les animations de shards sont dans ShardManager
 * Ce fichier ne gère que les animations GSAP pour focus/unfocus
 */

import { ANIMATION, FOCUS } from '../config/constants.js';

export class TimelineManager {
  constructor() {
    this.gsap = window.gsap;
    this.isReady = !!this.gsap;
    
    if (!this.gsap) {
      console.warn('⚠️ GSAP not found - animations will be limited');
    }
  }
  
  /**
   * Initialisation (appelé après génération des shards)
   */
  init(shards) {
    console.log('✅ TimelineManager ready');
  }
  
  /**
   * Anime le focus d'un shard
   */
  animateFocus(shard, cameraZ, onComplete) {
    if (!this.gsap || !shard) return null;
    
    shard.userData.originalPosition = shard.position.clone();
    shard.userData.originalRotation = shard.rotation.clone();
    shard.userData.originalScale = shard.scale.clone();
    
    const focusZ = cameraZ - FOCUS.DISTANCE;
    
    const tl = this.gsap.timeline({
      onComplete: () => {
        shard.userData.isFocused = true;
        if (onComplete) onComplete();
      }
    });
    
    tl.to(shard.position, {
      x: 0,
      y: 0,
      z: focusZ,
      duration: FOCUS.FOCUS_DURATION,
      ease: ANIMATION.EASE.IN_OUT
    }, 0);
    
    tl.to(shard.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: FOCUS.FOCUS_DURATION,
      ease: ANIMATION.EASE.OUT
    }, 0);
    
    tl.to(shard.userData, {
      focusAmount: 1,
      duration: FOCUS.FOCUS_DURATION,
      ease: ANIMATION.EASE.OUT
    }, 0);
    
    return tl;
  }
  
  /**
   * Anime l'unfocus d'un shard
   */
  animateUnfocus(shard, onComplete) {
    if (!this.gsap || !shard) return null;
    
    const original = shard.userData.originalPosition;
    const originalRot = shard.userData.originalRotation;
    
    if (!original) {
      if (onComplete) onComplete();
      return null;
    }
    
    const tl = this.gsap.timeline({
      onComplete: () => {
        shard.userData.isFocused = false;
        shard.userData.isReturning = true;
        if (onComplete) onComplete();
      }
    });
    
    tl.to(shard.position, {
      x: original.x,
      y: original.y,
      z: original.z,
      duration: FOCUS.UNFOCUS_DURATION,
      ease: ANIMATION.EASE.IN_OUT
    }, 0);
    
    tl.to(shard.rotation, {
      x: originalRot.x,
      y: originalRot.y,
      z: originalRot.z,
      duration: FOCUS.UNFOCUS_DURATION,
      ease: ANIMATION.EASE.OUT
    }, 0);
    
    tl.to(shard.userData, {
      focusAmount: 0,
      duration: FOCUS.UNFOCUS_DURATION,
      ease: ANIMATION.EASE.IN_OUT
    }, 0);
    
    return tl;
  }
  
  /**
   * Anime le changement de facette
   */
  animateFacetteChange(shard, direction, onComplete) {
    if (!this.gsap || !shard) return null;
    
    const rotationAngle = (2 * Math.PI / 3) * direction;
    
    return this.gsap.to(shard.rotation, {
      y: shard.rotation.y + rotationAngle,
      duration: 0.6,
      ease: ANIMATION.EASE.IN_OUT,
      onComplete: onComplete
    });
  }
  
  dispose() {}
}
