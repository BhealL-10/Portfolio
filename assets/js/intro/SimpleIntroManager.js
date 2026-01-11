/**
 * SimpleIntroManager.js - Gestionnaire d'intro ultra-léger
 * Portfolio 3D V2.0
 * 
 * Approche Canvas 2D pure - pas de Three.js pour le miroir
 */

import { INTRO, SCROLL } from '../config/constants.js';
import { SimpleMirror } from './SimpleMirror.js';

export class SimpleIntroManager {
  constructor() {
    this.mirror = null;
    this.isActive = false;
    this.clickCount = 0;
    this.lastTime = 0;
    
    // Callbacks
    this.onComplete = null;
    
    // Gauge UI
    this.gaugeElement = null;
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
    console.log('🎬 Starting simple intro...');
    
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
   * Crée la jauge simple
   */
  createGauge() {
    this.gaugeElement = document.createElement('div');
    this.gaugeElement.innerHTML = `
      <div style="
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        padding: 15px 30px;
        border-radius: 10px;
        font-family: Arial, sans-serif;
        color: white;
        text-align: center;
      ">
        <div id="gauge-bar" style="
          width: 300px;
          height: 20px;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 10px;
        ">
          <div id="gauge-fill" style="
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #4CAF50, #8BC34A);
            transition: width 0.2s ease;
          "></div>
        </div>
        <div style="font-size: 14px; opacity: 0.8;">
          <span id="click-count">0</span> clics
        </div>
      </div>
    `;
    
    document.body.appendChild(this.gaugeElement);
  }
  
  /**
   * Gère le clic
   */
  handleClick(e) {
    if (!this.isActive) return;
    
    this.clickCount++;
    
    // Ajouter fissure
    this.mirror.addCrack(e.clientX, e.clientY);
    
    // Mettre à jour la jauge
    this.updateGauge();
    
    // Vérifier si complet
    const percent = this.mirror.getDestructionPercent();
    if (percent >= 1) {
      this.complete();
    }
  }
  
  /**
   * Met à jour la jauge
   */
  updateGauge() {
    const percent = this.mirror.getDestructionPercent();
    const fillBar = document.getElementById('gauge-fill');
    const countText = document.getElementById('click-count');
    
    if (fillBar) {
      fillBar.style.width = `${percent * 100}%`;
    }
    
    if (countText) {
      countText.textContent = this.clickCount;
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
    
    // Update mirror (decay des fissures)
    this.mirror.update(deltaTime);
    
    // Update gauge
    this.updateGauge();
    
    requestAnimationFrame(() => this.update());
  }
  
  /**
   * Complète l'intro
   */
  complete() {
    console.log('✅ Intro completed!');
    
    this.isActive = false;
    
    // Sauvegarder
    localStorage.setItem(INTRO.STORAGE_KEY, 'true');
    
    // Supprimer la jauge immédiatement
    if (this.gaugeElement) {
      this.gaugeElement.style.opacity = '0';
      this.gaugeElement.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        if (this.gaugeElement && this.gaugeElement.parentNode) {
          this.gaugeElement.parentNode.removeChild(this.gaugeElement);
        }
      }, 300);
    }
    
    // Phase 1: Animation de bris (1 seconde)
    this.mirror.shatterAnimation(() => {
      // Phase 2: Callback pour démarrer l'animation de caméra
      // (le canvas est déjà supprimé dans shatterAnimation)
      if (this.onComplete) {
        this.onComplete();
      }
    });
  }
  
  /**
   * Dispose
   */
  dispose() {
    this.isActive = false;
    
    if (this.mirror) {
      this.mirror.remove();
    }
    
    if (this.gaugeElement && this.gaugeElement.parentNode) {
      this.gaugeElement.parentNode.removeChild(this.gaugeElement);
    }
  }
}
