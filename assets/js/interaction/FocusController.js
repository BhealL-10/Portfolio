/**
 * FocusController.js - Gestion du focus avec auto-focus par sous-étapes
 * Portfolio 3D V3.0
 * 
 * - Auto-focus progressif basé sur sous-étapes
 * - Navigation entre facettes
 * - Overlay d'information projet
 */

import * as THREE from 'three';
import { getActiveFacette, getProjectByIndex } from '../data/projects.js';
import { FOCUS, FACETTE, SCROLL, CATEGORIES } from '../config/constants.js';

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
    
    // Auto-focus
    this.autoFocusEnabled = FOCUS.AUTO_FOCUS_ENABLED;
    this.autoFocusTimer = null;
    this.lastShardIndex = -1;
    this.lastSubStep = -1;
    
    // Scroll state for unfocus detection
    this.scrollAtFocus = 0;
    
    // Callbacks
    this.onFocusStart = null;
    this.onFocusComplete = null;
    this.onUnfocusComplete = null;
    
    // UI Overlay
    this.infoOverlay = null;
    this.createInfoOverlay();
  }
  
  /**
   * Crée l'overlay HTML
   */
  createInfoOverlay() {
    this.infoOverlay = document.createElement('div');
    this.infoOverlay.className = 'shard-info-overlay';
    this.infoOverlay.innerHTML = `
      <div class="shard-info-content">
        <div class="facette-nav">
          <button class="facette-prev" aria-label="Facette précédente">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span class="facette-indicator">1/3</span>
          <button class="facette-next" aria-label="Facette suivante">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
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
      z-index: 150;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease;
      max-width: 550px;
      width: 90%;
      text-align: center;
      padding: 30px;
      background: var(--bg-overlay, rgba(0,0,0,0.7));
      backdrop-filter: blur(10px);
      border-radius: 16px;
      color: var(--text-primary, white);
    `;
    
    document.body.appendChild(this.infoOverlay);
    this.setupFacetteNavigation();
  }
  
  /**
   * Configure navigation facettes
   */
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
  
  /**
   * Update appelé chaque frame
   */
  update(currentShardIndex, currentSubStep = 0) {
    if (!this.autoFocusEnabled) return;
    
    // Détecter changement de shard
    if (currentShardIndex !== this.lastShardIndex) {
      this.lastShardIndex = currentShardIndex;
      this.lastSubStep = -1;
      
      // Annuler timer précédent
      if (this.autoFocusTimer) {
        clearTimeout(this.autoFocusTimer);
        this.autoFocusTimer = null;
      }
      
      // Unfocus si nécessaire
      if (this.state === FocusState.FOCUSED) {
        this.unfocus();
      }
    }
    
    // Détecter changement de sous-étape pour auto-focus
    if (currentSubStep !== this.lastSubStep) {
      this.lastSubStep = currentSubStep;
      
      // Auto-focus quand on atteint la sous-étape centrale
      const centerSubStep = Math.floor(SCROLL.SUB_STEPS_PER_SHARD * FOCUS.AUTO_FOCUS_SUB_STEP);
      
      if (currentSubStep === centerSubStep && this.state === FocusState.IDLE) {
        // Programmer l'auto-focus
        if (this.autoFocusTimer) {
          clearTimeout(this.autoFocusTimer);
        }
        
        this.autoFocusTimer = setTimeout(() => {
          const shard = this.shardManager.getShardByIndex(currentShardIndex);
          if (shard && this.state === FocusState.IDLE) {
            this.focus(shard);
          }
        }, FOCUS.AUTO_FOCUS_DELAY * 1000);
      }
    }
  }
  
  /**
   * Vérifie si on doit unfocus basé sur le scroll
   */
  checkScrollUnfocus(currentScroll) {
    if (this.state !== FocusState.FOCUSED) return;
    
    if (!FOCUS.AUTO_UNFOCUS_ON_SCROLL) return;
    
    const scrollDelta = Math.abs(currentScroll - this.scrollAtFocus);
    const threshold = 1 / (this.shardManager.getTotalShards() * 2);
    
    if (scrollDelta > threshold) {
      this.unfocus();
    }
  }
  
  /**
   * Focus sur un shard
   */
  focus(shard, scrollValue = 0) {
    if (this.state !== FocusState.IDLE || this.focusedShard) return;
    
    this.focusedShard = shard;
    this.state = FocusState.FOCUSING;
    this.scrollAtFocus = scrollValue;
    
    // Marquer le shard
    this.shardManager.setFocus(shard);
    
    // Callback
    if (this.onFocusStart) this.onFocusStart(shard);
    
    // Animation
    this.timelineManager.animateFocus(shard, this.camera.instance, () => {
      this.state = FocusState.FOCUSED;
      this.showInfo(shard);
      if (this.onFocusComplete) this.onFocusComplete(shard);
    });
  }
  
  /**
   * Unfocus
   */
  unfocus() {
    if (this.state !== FocusState.FOCUSED || !this.focusedShard) return;
    
    this.state = FocusState.UNFOCUSING;
    const shard = this.focusedShard;
    
    // Cacher infos
    this.hideInfo();
    
    // Animation
    this.timelineManager.animateUnfocus(shard, () => {
      this.shardManager.clearFocus();
      this.focusedShard = null;
      this.state = FocusState.IDLE;
      if (this.onUnfocusComplete) this.onUnfocusComplete(shard);
    });
  }
  
  /**
   * Change de facette
   */
  changeFacette(direction) {
    if (!this.focusedShard) return;
    
    const shard = this.focusedShard;
    const project = getProjectByIndex(shard.userData.index);
    
    if (!project) return;
    
    const facettes = project.facettes;
    const currentIndex = project.activeFacette;
    const newIndex = (currentIndex + direction + facettes.length) % facettes.length;
    
    project.activeFacette = newIndex;
    shard.userData.activeFacette = newIndex;
    
    // Animation rotation
    this.timelineManager.animateFacetteChange(shard, direction, () => {
      this.updateInfo(shard);
    });
  }
  
  /**
   * Affiche les infos
   */
  showInfo(shard) {
    this.updateInfo(shard);
    this.infoOverlay.style.opacity = '1';
    this.infoOverlay.style.pointerEvents = 'auto';
  }
  
  /**
   * Met à jour les infos
   */
  updateInfo(shard) {
    const project = getProjectByIndex(shard.userData.index);
    if (!project) return;
    
    const facette = project.facettes[project.activeFacette];
    if (!facette) return;
    
    const total = project.facettes.length;
    const current = project.activeFacette + 1;
    
    // Indicator
    this.infoOverlay.querySelector('.facette-indicator').textContent = `${current}/${total}`;
    
    // Category avec couleur
    const categoryEl = this.infoOverlay.querySelector('.shard-category');
    const categoryInfo = CATEGORIES[facette.category] || { label: facette.category, emoji: '' };
    categoryEl.textContent = `${categoryInfo.emoji || ''} ${categoryInfo.label || facette.category}`;
    
    // Titre et description
    this.infoOverlay.querySelector('.shard-title').textContent = facette.title;
    this.infoOverlay.querySelector('.shard-description').textContent = facette.longDescription || facette.description;
    
    // Technologies
    const techContainer = this.infoOverlay.querySelector('.shard-technologies');
    techContainer.innerHTML = facette.technologies
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join('');
    
    // Liens
    const linksContainer = this.infoOverlay.querySelector('.shard-links');
    const links = [];
    
    if (facette.links?.github) {
      links.push(`<a href="${facette.links.github}" target="_blank" rel="noopener" class="project-link">GitHub</a>`);
    }
    if (facette.links?.demo) {
      links.push(`<a href="${facette.links.demo}" target="_blank" rel="noopener" class="project-link">Demo</a>`);
    }
    if (facette.links?.video) {
      links.push(`<a href="${facette.links.video}" target="_blank" rel="noopener" class="project-link">Vidéo</a>`);
    }
    
    linksContainer.innerHTML = links.join('');
  }
  
  /**
   * Cache les infos
   */
  hideInfo() {
    this.infoOverlay.style.opacity = '0';
    this.infoOverlay.style.pointerEvents = 'none';
  }
  
  /**
   * Active/désactive auto-focus
   */
  setAutoFocus(enabled) {
    this.autoFocusEnabled = enabled;
    if (!enabled && this.autoFocusTimer) {
      clearTimeout(this.autoFocusTimer);
      this.autoFocusTimer = null;
    }
  }
  
  /**
   * États
   */
  isFocused() { return this.state === FocusState.FOCUSED; }
  isFocusing() { return this.state === FocusState.FOCUSING; }
  isUnfocusing() { return this.state === FocusState.UNFOCUSING; }
  isIdle() { return this.state === FocusState.IDLE; }
  getFocusedShard() { return this.focusedShard; }
  getState() { return this.state; }
}
