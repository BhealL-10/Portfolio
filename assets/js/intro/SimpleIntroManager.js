/**
 * SimpleIntroManager.js - Gestionnaire intro avec transition Canvas → Three.js
 * Portfolio 3D V3.0
 * 
 * - Canvas 2D toujours visible initialement
 * - Transition progressive révélant Three.js
 * - Gestion de l'opacité
 */

import { INTRO, LAYERS } from '../config/constants.js';
import { SimpleMirror } from './SimpleMirror.js';

export class SimpleIntroManager {
  constructor() {
    this.mirror = null;
    this.isActive = false;
    this.clickCount = 0;
    this.lastTime = 0;
    
    // Callbacks
    this.onComplete = null;
    this.onProgress = null;
    
    // Gauge UI
    this.gaugeElement = null;
    
    // État de la transition
    this.isTransitioning = false;
  }
  
  /**
   * Vérifie si l'intro doit être affichée
   */
  shouldShowIntro(forceReset = false) {
    if (forceReset) {
      localStorage.removeItem(INTRO.STORAGE_KEY);
      return true;
    }
    
    const completed = localStorage.getItem(INTRO.STORAGE_KEY);
    return completed !== 'true';
  }
  
  /**
   * Démarre l'intro
   */
  start() {
    console.log('🎬 Starting intro with Canvas 2D...');
    
    this.isActive = true;
    
    // Créer le miroir Canvas
    this.mirror = new SimpleMirror();
    
    // Créer la jauge
    this.createGauge();
    
    // Click handler
    this.mirror.canvas.addEventListener('click', (e) => this.handleClick(e));
    
    // Update loop
    this.lastTime = Date.now();
    this.update();
  }
  
  /**
   * Crée l'indicateur (clics pendant intro, scroll après)
   */
  createGauge() {
    // Créer ou récupérer l'indicateur universel
    this.indicator = document.querySelector('.scroll-indicator');
    if (!this.indicator) {
      this.indicator = document.createElement('div');
      this.indicator.className = 'scroll-indicator';
      document.body.appendChild(this.indicator);
    }
    
    // Mode intro: indicateur de clics
    this.indicator.innerHTML = `
      <div class="indicator-content">
        <div class="indicator-bar">
          <div class="indicator-fill"></div>
        </div>
        <div class="indicator-text">
          <span class="cell-count">0</span> / <span class="cell-target">${INTRO.DESTRUCTION_THRESHOLD}</span> cellules
        </div>
        <div class="indicator-hint">Cliquez pour créer des fractures</div>
      </div>
    `;
    
    this.indicator.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
      text-align: center;
      font-family: system-ui, -apple-system, sans-serif;
      color: var(--text-primary, white);
      pointer-events: none;
      opacity: 0.8;
      transition: opacity 0.3s;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .indicator-content {
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(12px);
        padding: 20px 35px;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .indicator-bar {
        width: 280px;
        height: 8px;
        background: rgba(255,255,255,0.15);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 12px;
      }
      .indicator-fill {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #4a90d9, #67b26f);
        border-radius: 4px;
        transition: width 0.15s ease-out;
      }
      .indicator-text {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 6px;
      }
      .indicator-hint {
        font-size: 13px;
        opacity: 0.7;
      }
    `;
    if (!document.querySelector('#indicator-styles')) {
      style.id = 'indicator-styles';
      document.head.appendChild(style);
    }
  }
  
  /**
   * Gère le clic
   */
  handleClick(e) {
    if (!this.isActive || this.isTransitioning) return;
    
    this.clickCount++;
    
    // Ajouter fissure
    this.mirror.addCrack(e.clientX, e.clientY);
    
    // Mettre à jour la jauge
    this.updateGauge();
    
    // Callback de progression
    const percent = this.mirror.getDestructionPercent();
    if (this.onProgress) {
      this.onProgress(percent);
    }
    
    // Vérifier si complet
    if (percent >= 1) {
      this.complete();
    }
  }
  
  /**
   * Met à jour l'indicateur
   */
  updateGauge() {
    const cellCount = this.mirror.cells.length;
    const percent = cellCount / INTRO.DESTRUCTION_THRESHOLD;
    const fillBar = this.indicator.querySelector('.indicator-fill');
    const countText = this.indicator.querySelector('.cell-count');
    
    if (fillBar) {
      fillBar.style.width = `${Math.min(percent * 100, 100)}%`;
    }
    
    if (countText) {
      countText.textContent = cellCount;
    }
  }
  
  /**
   * Update loop
   */
  update() {
    if (!this.isActive) return;
    
    const now = Date.now();
    const deltaTime = (now - this.lastTime) / 1000;
    this.lastTime = now;
    
    // Update mirror
    this.mirror.update(deltaTime);
    
    // Update gauge
    this.updateGauge();
    
    requestAnimationFrame(() => this.update());
  }
  
  /**
   * Complète l'intro
   */
  complete() {
    if (this.isTransitioning) return;
    
    console.log('✅ Intro complete - starting transition');
    this.isTransitioning = true;
    this.isActive = false;
    
    // Sauvegarder
    localStorage.setItem(INTRO.STORAGE_KEY, 'true');
    
    // Masquer l'indicateur temporairement (sera transformé en scroll indicator)
    if (this.indicator) {
      this.indicator.style.opacity = '0';
    }
    
    // Animation de bris
    this.mirror.shatterAnimation(() => {
      console.log('✅ Mirror shattered - calling onComplete');
      if (this.onComplete) {
        this.onComplete();
      }
    });
  }
  
  /**
   * Force la fin de l'intro (skip)
   */
  skip() {
    if (this.isTransitioning) return;
    
    this.isActive = false;
    localStorage.setItem(INTRO.STORAGE_KEY, 'true');
    
    // Supprimer immédiatement
    if (this.mirror) {
      this.mirror.remove();
    }
    
    if (this.gaugeElement?.parentNode) {
      this.gaugeElement.parentNode.removeChild(this.gaugeElement);
    }
    
    if (this.onComplete) {
      this.onComplete();
    }
  }
  
  /**
   * Retourne l'opacité actuelle du canvas 2D
   */
  getCanvasOpacity() {
    return this.mirror ? this.mirror.opacity : 0;
  }
  
  /**
   * Dispose
   */
  dispose() {
    this.isActive = false;
    
    if (this.mirror) {
      this.mirror.remove();
    }
    
    if (this.gaugeElement?.parentNode) {
      this.gaugeElement.parentNode.removeChild(this.gaugeElement);
    }
  }
}
