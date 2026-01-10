/**
 * ScrollManager.js - Gestionnaire de scroll virtuel
 * Portfolio 3D V2.0
 * 
 * Scroll 100% contrôlé sans scrollbar navigateur
 * Le scroll devient une valeur continue (0 → 1) pilotant la scène
 */

import { SCROLL } from '../config/constants.js';

export class ScrollManager {
  constructor() {
    // Scroll virtuel
    this.scroll = 0;           // Valeur actuelle (lissée)
    this.scrollTarget = 0;     // Valeur cible (input utilisateur)
    
    // État
    this.enabled = true;
    this.locked = false;
    
    // Touch support
    this.touchStartY = 0;
    this.lastTouchY = 0;
    
    // Vélocité pour effet d'inertie
    this.velocity = 0;
    
    // Callbacks
    this.onScrollChange = null;
    this.onSectionChange = null;
    
    // Section actuelle
    this.currentSection = 0;
    this.totalSections = 1;
    
    this.init();
  }
  
  init() {
    this.setupWheelListener();
    this.setupTouchListeners();
    this.setupKeyboardListener();
  }
  
  /**
   * Capture la molette (desktop)
   */
  setupWheelListener() {
    window.addEventListener('wheel', (e) => {
      if (!this.enabled || this.locked) return;
      
      e.preventDefault();
      
      const delta = e.deltaY * SCROLL.SPEED;
      this.scrollTarget += delta;
      this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, this.scrollTarget));
      
      // Calculer vélocité pour callback
      this.velocity = delta;
      
    }, { passive: false });
  }
  
  /**
   * Support tactile (mobile)
   */
  setupTouchListeners() {
    window.addEventListener('touchstart', (e) => {
      if (!this.enabled || this.locked) return;
      
      this.touchStartY = e.touches[0].clientY;
      this.lastTouchY = this.touchStartY;
    }, { passive: true });
    
    window.addEventListener('touchmove', (e) => {
      if (!this.enabled || this.locked) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = this.lastTouchY - currentY;
      this.lastTouchY = currentY;
      
      const delta = deltaY * SCROLL.SPEED * SCROLL.TOUCH_MULTIPLIER;
      this.scrollTarget += delta;
      this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, this.scrollTarget));
      
      this.velocity = delta;
      
      e.preventDefault();
    }, { passive: false });
    
    window.addEventListener('touchend', () => {
      // Reset touch state
      this.touchStartY = 0;
      this.lastTouchY = 0;
    }, { passive: true });
  }
  
  /**
   * Navigation clavier (flèches, Page Up/Down)
   */
  setupKeyboardListener() {
    window.addEventListener('keydown', (e) => {
      if (!this.enabled || this.locked) return;
      
      let delta = 0;
      const sectionSize = 1 / this.totalSections;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          delta = sectionSize * 0.5;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          delta = -sectionSize * 0.5;
          break;
        case 'PageDown':
          delta = sectionSize;
          break;
        case 'PageUp':
          delta = -sectionSize;
          break;
        case 'Home':
          this.scrollTarget = SCROLL.MIN;
          return;
        case 'End':
          this.scrollTarget = SCROLL.MAX;
          return;
        default:
          return;
      }
      
      e.preventDefault();
      this.scrollTarget += delta;
      this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, this.scrollTarget));
    });
  }
  
  /**
   * Mise à jour (appelée chaque frame)
   */
  update() {
    if (!this.enabled) return this.scroll;
    
    // Lissage du scroll
    const diff = this.scrollTarget - this.scroll;
    this.scroll += diff * SCROLL.SMOOTHING;
    
    // Snap si très proche de la cible
    if (Math.abs(diff) < 0.0001) {
      this.scroll = this.scrollTarget;
    }
    
    // Calculer section actuelle
    const newSection = this.calculateCurrentSection();
    if (newSection !== this.currentSection) {
      const oldSection = this.currentSection;
      this.currentSection = newSection;
      
      if (this.onSectionChange) {
        this.onSectionChange(newSection, oldSection);
      }
    }
    
    // Callback de changement
    if (this.onScrollChange && Math.abs(diff) > 0.0001) {
      this.onScrollChange(this.scroll, this.velocity);
    }
    
    return this.scroll;
  }
  
  /**
   * Calcule la section actuelle basée sur le scroll
   */
  calculateCurrentSection() {
    const sectionSize = 1 / this.totalSections;
    return Math.floor(this.scroll / sectionSize);
  }
  
  /**
   * Définit le nombre total de sections
   */
  setTotalSections(count) {
    this.totalSections = Math.max(1, count);
  }
  
  /**
   * Scroll vers une section spécifique
   */
  scrollToSection(index, instant = false) {
    const sectionSize = 1 / this.totalSections;
    const target = (index + 0.5) * sectionSize;
    
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, target));
    
    if (instant) {
      this.scroll = this.scrollTarget;
    }
  }
  
  /**
   * Scroll vers une valeur précise
   */
  scrollTo(value, instant = false) {
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, value));
    
    if (instant) {
      this.scroll = this.scrollTarget;
    }
  }
  
  /**
   * Verrouille/Déverrouille le scroll
   */
  lock() {
    this.locked = true;
  }
  
  unlock() {
    this.locked = false;
  }
  
  /**
   * Active/Désactive le scroll
   */
  enable() {
    this.enabled = true;
  }
  
  disable() {
    this.enabled = false;
  }
  
  /**
   * Reset du scroll
   */
  reset() {
    this.scroll = 0;
    this.scrollTarget = 0;
    this.velocity = 0;
    this.currentSection = 0;
  }
  
  /**
   * Getters
   */
  getScroll() {
    return this.scroll;
  }
  
  getScrollTarget() {
    return this.scrollTarget;
  }
  
  getCurrentSection() {
    return this.currentSection;
  }
  
  getProgress() {
    return this.scroll;
  }
  
  /**
   * Utilitaire: map une valeur entre deux ranges
   */
  static map(value, inMin, inMax, outMin, outMax) {
    return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
  }
  
  /**
   * Utilitaire: clamp une valeur
   */
  static clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
}
