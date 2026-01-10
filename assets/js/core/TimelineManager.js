/**
 * TimelineManager.js - Gestionnaire de timeline GSAP
 * Portfolio 3D V2.0
 * 
 * Timeline pilotée par le scroll virtuel
 * Le scroll (0 → 1) contrôle la progression de la timeline
 */

import { ANIMATION, SHARD } from '../config/constants.js';

export class TimelineManager {
  constructor() {
    this.masterTimeline = null;
    this.shardTimelines = new Map();
    this.isReady = false;
    
    // Référence GSAP
    this.gsap = window.gsap;
    
    if (!this.gsap) {
      console.error('GSAP not found! Make sure GSAP is loaded.');
      return;
    }
  }
  
  /**
   * Initialise la timeline principale
   */
  init(shards, totalDuration = 1) {
    // Timeline principale pausée (contrôlée par scroll)
    this.masterTimeline = this.gsap.timeline({ paused: true });
    
    // Créer une timeline pour chaque shard
    shards.forEach((shard, index) => {
      const shardTimeline = this.createShardTimeline(shard, index, shards.length);
      this.shardTimelines.set(shard.uuid, shardTimeline);
      
      // Ajouter à la master timeline à la bonne position
      const startPosition = index / shards.length;
      this.masterTimeline.add(shardTimeline, startPosition);
    });
    
    this.isReady = true;
  }
  
  /**
   * Crée la timeline d'animation pour un shard
   */
  createShardTimeline(shard, index, totalShards) {
    const tl = this.gsap.timeline();
    const sectionDuration = 1 / totalShards;
    
    // Phase 1: Approche (shard vient vers la caméra)
    tl.fromTo(shard.userData, 
      { approachProgress: 0 },
      { 
        approachProgress: 1, 
        duration: sectionDuration * 0.4,
        ease: 'power2.out'
      }
    );
    
    // Phase 2: Current (shard est au centre)
    tl.to(shard.userData, {
      currentProgress: 1,
      duration: sectionDuration * 0.2,
      ease: 'power1.inOut'
    });
    
    // Phase 3: Départ (shard passe derrière)
    tl.to(shard.userData, {
      departProgress: 1,
      duration: sectionDuration * 0.4,
      ease: 'power2.in'
    });
    
    return tl;
  }
  
  /**
   * Met à jour la timeline basée sur le scroll
   */
  update(scrollProgress) {
    if (!this.isReady || !this.masterTimeline) return;
    
    // Le scroll (0 → 1) contrôle la progression de la timeline
    this.masterTimeline.progress(scrollProgress);
  }
  
  /**
   * Anime un shard vers l'état focus
   */
  animateFocus(shard, camera, onComplete) {
    if (!this.gsap) return;
    
    const cameraPos = camera.position;
    const focusZ = cameraPos.z + 8;
    
    // Sauvegarder position originale
    shard.userData.originalPosition = {
      x: shard.position.x,
      y: shard.position.y,
      z: shard.position.z
    };
    shard.userData.originalRotation = {
      x: shard.rotation.x,
      y: shard.rotation.y,
      z: shard.rotation.z
    };
    
    // Timeline de focus
    const focusTl = this.gsap.timeline({
      onComplete: onComplete
    });
    
    // Mouvement vers le centre
    focusTl.to(shard.position, {
      x: 0,
      y: 0,
      z: focusZ,
      duration: ANIMATION.DURATION.NORMAL,
      ease: ANIMATION.EASE.IN_OUT
    }, 0);
    
    // Rotation face caméra
    focusTl.to(shard.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: ANIMATION.DURATION.NORMAL,
      ease: ANIMATION.EASE.OUT
    }, 0);
    
    // Scale et aplatissement
    focusTl.to(shard.userData, {
      focusAmount: 1,
      duration: ANIMATION.DURATION.NORMAL,
      ease: ANIMATION.EASE.OUT
    }, 0);
    
    return focusTl;
  }
  
  /**
   * Anime un shard vers l'état unfocus
   */
  animateUnfocus(shard, onComplete) {
    if (!this.gsap) return;
    
    const original = shard.userData.originalPosition || { x: 0, y: 0, z: 0 };
    const originalRot = shard.userData.originalRotation || { x: 0, y: 0, z: 0 };
    
    // Timeline d'unfocus
    const unfocusTl = this.gsap.timeline({
      onComplete: onComplete
    });
    
    // Retour à la position originale
    unfocusTl.to(shard.position, {
      x: original.x,
      y: original.y,
      z: original.z,
      duration: ANIMATION.DURATION.NORMAL,
      ease: ANIMATION.EASE.IN_OUT
    }, 0);
    
    // Retour rotation originale
    unfocusTl.to(shard.rotation, {
      x: originalRot.x,
      y: originalRot.y,
      z: originalRot.z,
      duration: ANIMATION.DURATION.NORMAL,
      ease: ANIMATION.EASE.OUT
    }, 0);
    
    // Retour forme normale
    unfocusTl.to(shard.userData, {
      focusAmount: 0,
      duration: ANIMATION.DURATION.NORMAL,
      ease: ANIMATION.EASE.IN_OUT
    }, 0);
    
    return unfocusTl;
  }
  
  /**
   * Anime le changement de facette
   */
  animateFacetteChange(shard, direction = 1, onComplete) {
    if (!this.gsap) return;
    
    const rotationAngle = (2 * Math.PI / 3) * direction;
    
    const tl = this.gsap.timeline({
      onComplete: onComplete
    });
    
    // Rotation sur l'axe Y
    tl.to(shard.rotation, {
      y: shard.rotation.y + rotationAngle,
      duration: ANIMATION.DURATION.NORMAL,
      ease: ANIMATION.EASE.IN_OUT
    });
    
    return tl;
  }
  
  /**
   * Pause la master timeline
   */
  pause() {
    if (this.masterTimeline) {
      this.masterTimeline.pause();
    }
  }
  
  /**
   * Resume la master timeline
   */
  resume() {
    if (this.masterTimeline) {
      this.masterTimeline.resume();
    }
  }
  
  /**
   * Reset la timeline
   */
  reset() {
    if (this.masterTimeline) {
      this.masterTimeline.progress(0);
    }
  }
  
  /**
   * Dispose des ressources
   */
  dispose() {
    if (this.masterTimeline) {
      this.masterTimeline.kill();
    }
    this.shardTimelines.forEach(tl => tl.kill());
    this.shardTimelines.clear();
  }
}
