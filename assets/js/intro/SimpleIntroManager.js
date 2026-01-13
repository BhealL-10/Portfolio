/**
 * SimpleIntroManager.js - Gestionnaire intro V5.0
 * Portfolio 3D - Intro responsive optimisée
 */

import { INTRO, LAYERS, TYPOGRAPHY } from '../config/constants.js';
import { SimpleMirror } from './SimpleMirror.js';

export class SimpleIntroManager {
  constructor(deviceManager) {
    this.deviceManager = deviceManager;
    this.mirror = null;
    this.isActive = false;
    this.clickCount = 0;
    this.lastTime = 0;
    
    this.onComplete = null;
    this.onProgress = null;
    
    this.indicator = null;
    this.isTransitioning = false;
  }
  
  shouldShowIntro(forceReset = false) {
    if (forceReset) {
      localStorage.removeItem(INTRO.STORAGE_KEY);
      return true;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('intro') || performance.navigation.type === 1) {
      localStorage.removeItem(INTRO.STORAGE_KEY);
      return true;
    }
    
    const completed = localStorage.getItem(INTRO.STORAGE_KEY);
    return completed !== 'true';
  }
  
  start() {
    this.isActive = true;
    
    this.mirror = new SimpleMirror(this.deviceManager);
    
    this.createGauge();
    
    this.mirror.canvas.addEventListener('click', (e) => this.handleClick(e));
    
    this.lastTime = Date.now();
    this.update();
  }
  
  createGauge() {
    this.indicator = document.querySelector('.scroll-indicator');
    if (!this.indicator) {
      this.indicator = document.createElement('div');
      this.indicator.className = 'scroll-indicator';
      document.body.appendChild(this.indicator);
    }
    
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
      font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      color: var(--text-primary, white);
      pointer-events: none;
      opacity: 0;
      display: none;
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
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
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
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      }
      .indicator-hint {
        font-size: 13px;
        opacity: 0.7;
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      }
      
      @media (max-width: 576px) {
        .indicator-content { padding: 15px 25px; }
        .indicator-bar { width: 200px; }
        .indicator-text { font-size: 14px; }
        .indicator-hint { font-size: 11px; }
      }
    `;
    if (!document.querySelector('#indicator-styles')) {
      style.id = 'indicator-styles';
      document.head.appendChild(style);
    }
  }
  
  handleClick(e) {
    if (!this.isActive || this.isTransitioning) return;
    
    this.clickCount++;
    
    this.mirror.addCrack(e.clientX, e.clientY);
    
    this.updateGauge();
    
    const percent = this.mirror.getDestructionPercent();
    if (this.onProgress) this.onProgress(percent);
    
    if (percent >= 1) this.complete();
  }
  
  updateGauge() {
    const cellCount = this.mirror.cells.length;
    const percent = cellCount / INTRO.DESTRUCTION_THRESHOLD;
    const fillBar = this.indicator.querySelector('.indicator-fill');
    const countText = this.indicator.querySelector('.cell-count');
    
    if (fillBar) fillBar.style.width = `${Math.min(percent * 100, 100)}%`;
    if (countText) countText.textContent = cellCount;
  }
  
  update() {
    if (!this.isActive) return;
    
    const now = Date.now();
    const deltaTime = (now - this.lastTime) / 1000;
    this.lastTime = now;
    
    this.mirror.update(deltaTime);
    
    this.updateGauge();
    
    requestAnimationFrame(() => this.update());
  }
  
  complete() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.isActive = false;
    
    localStorage.setItem(INTRO.STORAGE_KEY, 'true');
    
    if (this.indicator) this.indicator.style.opacity = '0';
    
    this.mirror.shatterAnimation(() => {
      if (this.onComplete) this.onComplete();
    });
  }
  
  skip() {
    if (this.isTransitioning) return;
    
    this.isActive = false;
    localStorage.setItem(INTRO.STORAGE_KEY, 'true');
    
    if (this.mirror) this.mirror.remove();
    if (this.indicator?.parentNode) this.indicator.parentNode.removeChild(this.indicator);
    
    if (this.onComplete) this.onComplete();
  }
  
  getCanvasOpacity() { return this.mirror ? this.mirror.opacity : 0; }
  
  dispose() {
    this.isActive = false;
    if (this.mirror) this.mirror.remove();
    if (this.indicator?.parentNode) this.indicator.parentNode.removeChild(this.indicator);
  }
}
