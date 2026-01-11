/**
 * FocusController.js - Gestion du focus sur les shards
 * Portfolio 3D V2.0
 * 
 * États: idle | focusing | focused | unfocusing
 */

import * as THREE from 'three';
import { getActiveFacette } from '../data/projects.js';
import { FOCUS, FACETTE, ANIMATION } from '../config/constants.js';

const FocusState = {
  IDLE: 'idle',
  FOCUSING: 'focusing',
  FOCUSED: 'focused',
  UNFOCUSING: 'unfocusing'
};

export class FocusController {
  constructor(camera, shardManager, timelineManager) {
    this.camera = camera;
    this.shardManager = shardManager;
    this.timelineManager = timelineManager;
    
    this.focusedShard = null;
    this.state = FocusState.IDLE;
    
    // Configuration
    this.focusDistance = FOCUS.DISTANCE;
    this.focusDuration = FOCUS.FOCUS_DURATION;
    this.unfocusDuration = FOCUS.UNFOCUS_DURATION;
    
    // Callbacks
    this.onFocusStart = null;
    this.onFocusComplete = null;
    this.onUnfocusComplete = null;
    
    // Scroll tracking pour unfocus automatique
    this.scrollAtFocus = 0;
    
    // UI Overlay
    this.infoOverlay = null;
    this.createInfoOverlay();
  }
  
  /**
   * Crée l'overlay HTML pour les infos du projet
   */
  createInfoOverlay() {
    this.infoOverlay = document.createElement('div');
    this.infoOverlay.className = 'shard-info-overlay';
    this.infoOverlay.innerHTML = `
      <div class="shard-info-content">
        <div class="facette-nav">
          <button class="facette-prev" aria-label="Facette précédente">◀</button>
          <span class="facette-indicator">1/3</span>
          <button class="facette-next" aria-label="Facette suivante">▶</button>
        </div>
        <span class="shard-category"></span>
        <h2 class="shard-title"></h2>
        <p class="shard-description"></p>
        <div class="shard-technologies"></div>
        <div class="shard-links"></div>
      </div>
    `;
    this.infoOverlay.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease;
      max-width: 500px;
      width: 90%;
      text-align: center;
    `;
    document.body.appendChild(this.infoOverlay);
    
    // Event listeners pour navigation facettes
    this.setupFacetteNavigation();
  }
  
  /**
   * Configure la navigation entre facettes
   */
  setupFacetteNavigation() {
    const prevBtn = this.infoOverlay.querySelector('.facette-prev');
    const nextBtn = this.infoOverlay.querySelector('.facette-next');
    
    prevBtn.addEventListener('click', () => this.changeFacette(-1));
    nextBtn.addEventListener('click', () => this.changeFacette(1));
  }
  
  /**
   * Focus sur un shard
   */
  focus(shard, scrollProgress) {
    if (this.state !== FocusState.IDLE || this.focusedShard) return;
    
    this.focusedShard = shard;
    this.state = FocusState.FOCUSING;
    this.scrollAtFocus = scrollProgress;
    
    // Marquer le shard
    this.shardManager.setFocus(shard);
    
    // Callback
    if (this.onFocusStart) this.onFocusStart(shard);
    
    // Utiliser TimelineManager pour l'animation (comme l'ancien système)
    this.timelineManager.animateFocus(shard, this.camera.instance, () => {
      this.state = FocusState.FOCUSED;
      this.showInfo(shard);
      if (this.onFocusComplete) this.onFocusComplete(shard);
    });
  }
  
  /**
   * Unfocus du shard actuel
   */
  unfocus() {
    if (this.state !== FocusState.FOCUSED || !this.focusedShard) return;
    
    this.state = FocusState.UNFOCUSING;
    const shard = this.focusedShard;
    
    // Cacher les infos
    this.hideInfo();
    
    const gsap = window.gsap;
    if (!gsap) return;
    
    const original = shard.userData.originalPosition || new THREE.Vector3();
    const originalRot = shard.userData.originalRotation || new THREE.Euler();
    
    const tl = gsap.timeline({
      onComplete: () => {
        this.shardManager.clearFocus();
        this.focusedShard = null;
        this.state = FocusState.IDLE;
        if (this.onUnfocusComplete) this.onUnfocusComplete(shard);
      }
    });
    
    // Retour position
    tl.to(shard.position, {
      x: original.x,
      y: original.y,
      z: original.z,
      duration: this.unfocusDuration,
      ease: ANIMATION.EASE.IN_OUT
    }, 0);
    
    // Retour rotation
    tl.to(shard.rotation, {
      x: originalRot.x,
      y: originalRot.y,
      z: originalRot.z,
      duration: this.unfocusDuration,
      ease: ANIMATION.EASE.OUT
    }, 0);
    
    // Retour forme
    tl.to(shard.userData, {
      focusAmount: 0,
      duration: this.unfocusDuration,
      ease: ANIMATION.EASE.IN_OUT
    }, 0);
  }
  
  /**
   * Vérifie si le scroll doit déclencher un unfocus
   */
  checkScrollUnfocus(scrollProgress) {
    if (this.state !== FocusState.FOCUSED) return;
    
    const delta = Math.abs(scrollProgress - this.scrollAtFocus);
    if (delta > FOCUS.SCROLL_THRESHOLD) {
      this.unfocus();
    }
  }
  
  /**
   * Change de facette
   */
  changeFacette(direction) {
    if (!this.focusedShard || this.state !== FocusState.FOCUSED) return;
    
    const shard = this.focusedShard;
    const newFacette = this.shardManager.changeFacette(shard, direction);
    
    // Animation de rotation
    const gsap = window.gsap;
    if (gsap) {
      gsap.to(shard.rotation, {
        y: shard.rotation.y + (FACETTE.ROTATION_ANGLE * direction),
        duration: FACETTE.TRANSITION_DURATION,
        ease: FACETTE.TRANSITION_EASE
      });
    }
    
    // Mettre à jour les infos après un délai
    setTimeout(() => {
      this.updateInfo(shard);
    }, FACETTE.TRANSITION_DURATION * 500);
  }
  
  /**
   * Affiche les infos du projet
   */
  showInfo(shard) {
    this.updateInfo(shard);
    this.infoOverlay.style.pointerEvents = 'auto';
    this.infoOverlay.style.opacity = '1';
  }
  
  /**
   * Met à jour les infos affichées
   */
  updateInfo(shard) {
    const facettes = shard.userData.facettes;
    const activeIndex = shard.userData.activeFacette;
    const facette = facettes[activeIndex];
    
    // Indicateur de facette
    const indicator = this.infoOverlay.querySelector('.facette-indicator');
    indicator.textContent = `${activeIndex + 1}/${facettes.length}`;
    
    // Contenu
    this.infoOverlay.querySelector('.shard-category').textContent = facette.category;
    this.infoOverlay.querySelector('.shard-title').textContent = facette.title;
    this.infoOverlay.querySelector('.shard-description').textContent = facette.description;
    
    // Technologies
    const techContainer = this.infoOverlay.querySelector('.shard-technologies');
    techContainer.innerHTML = facette.technologies
      .map(tech => `<span class="tech-badge">${tech}</span>`)
      .join('');
    
    // Liens
    const linksContainer = this.infoOverlay.querySelector('.shard-links');
    linksContainer.innerHTML = '';
    if (facette.links) {
      if (facette.links.github) {
        linksContainer.innerHTML += `<a href="${facette.links.github}" class="shard-link" target="_blank">GitHub ↗</a>`;
      }
      if (facette.links.demo) {
        linksContainer.innerHTML += `<a href="${facette.links.demo}" class="shard-link" target="_blank">Démo ↗</a>`;
      }
      if (facette.links.video) {
        linksContainer.innerHTML += `<a href="${facette.links.video}" class="shard-link" target="_blank">Vidéo ↗</a>`;
      }
    }
  }
  
  /**
   * Cache les infos
   */
  hideInfo() {
    this.infoOverlay.style.opacity = '0';
    this.infoOverlay.style.pointerEvents = 'none';
  }
  
  /**
   * Getters
   */
  isFocused() {
    return this.state === FocusState.FOCUSED;
  }
  
  getFocusedShard() {
    return this.focusedShard;
  }
  
  getState() {
    return this.state;
  }
}
