/**
 * ScrollManager.js - Gestionnaire scroll virtuel avec sous-étapes
 * Portfolio 3D V3.0
 * 
 * - Scroll virtuel précis (0 → 1.2)
 * - Sous-étapes pour auto-focus progressif
 * - Support boucle infinie
 * - Gestion sections About/Contact
 */

import { SCROLL } from '../config/constants.js';

export class ScrollManager {
  constructor() {
    // Scroll virtuel
    this.scroll = 0;
    this.scrollTarget = 0;
    
    // État
    this.enabled = true;
    this.locked = false;
    
    // Touch
    this.touchStartY = 0;
    this.lastTouchY = 0;
    
    // Vélocité et inertie
    this.velocity = 0;
    this.lastScrollTime = 0;
    
    // Sections et sous-étapes
    this.currentSection = 0;
    this.currentSubStep = 0;
    this.totalSections = 10;
    
    // Callbacks
    this.onScrollChange = null;
    this.onSectionChange = null;
    this.onSubStepChange = null;
    this.onAboutSectionEnter = null;
    this.onAboutSectionLeave = null;
    
    // État section About/Contact
    this.isInAboutSection = false;
    
    this.init();
  }
  
  init() {
    this.setupWheelListener();
    this.setupTouchListeners();
    this.setupKeyboardListener();
  }
  
  /**
   * Molette desktop
   */
  setupWheelListener() {
    window.addEventListener('wheel', (e) => {
      this.onWheel(e);
    }, { passive: false });
  }
  
  onWheel(event) {
    if (this.locked) {
      event.preventDefault();
      return;
    }
    
    event.preventDefault();
    
    const delta = event.deltaY * SCROLL.SPEED;
    this.scrollTarget += delta;
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, this.scrollTarget));
    
    this.velocity = delta;
    this.lastScrollTime = Date.now();
  }
  
  /**
   * Support tactile
   */
  setupTouchListeners() {
    window.addEventListener('touchstart', (e) => {
      if (this.locked) return;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchmove', (e) => {
      this.onTouchMove(e);
    }, { passive: false });
    
    window.addEventListener('touchend', () => {
      this.touchStartY = null;
      this.lastTouchY = 0;
    }, { passive: true });
  }
  
  onTouchMove(event) {
    if (this.locked) {
      event.preventDefault();
      return;
    }
    
    if (this.touchStartY === null) return;
    
    event.preventDefault();
    
    const touchY = event.touches[0].clientY;
    const delta = (this.touchStartY - touchY) * SCROLL.SPEED * SCROLL.TOUCH_MULTIPLIER;
    
    this.scrollTarget += delta;
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, this.scrollTarget));
    
    this.touchStartY = touchY;
    this.velocity = delta;
  }
  
  /**
   * Navigation clavier
   */
  setupKeyboardListener() {
    window.addEventListener('keydown', (e) => {
      if (this.locked) {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
        }
        return;
      }
      
      if (!this.enabled) return;
      
      let delta = 0;
      const sectionSize = 1 / this.totalSections;
      const subStepSize = sectionSize / SCROLL.SUB_STEPS_PER_SHARD;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          delta = subStepSize;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          delta = -subStepSize;
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
   * Mise à jour (chaque frame)
   */
  update() {
    if (!this.enabled) return this.scroll;
    if (this.locked) return this.scroll;
    
    // Lissage du scroll
    const diff = this.scrollTarget - this.scroll;
    this.scroll += diff * SCROLL.SMOOTHING;
    
    // Snap si très proche
    if (Math.abs(diff) < 0.0001) {
      this.scroll = this.scrollTarget;
    }
    
    // Calculer section et sous-étape
    this.updateSectionAndSubStep();
    
    // Vérifier section About/Contact
    this.checkAboutSection();
    
    // Callback de changement
    if (this.onScrollChange && Math.abs(diff) > 0.0001) {
      this.onScrollChange(this.scroll, this.velocity);
    }
    
    return this.scroll;
  }
  
  /**
   * Calcule et met à jour la section et sous-étape courantes
   */
  updateSectionAndSubStep() {
    if (this.totalSections <= 0) return;
    
    // Limiter au scroll des shards (0-1)
    const shardScroll = Math.min(this.scroll, 1.0);
    
    // Section = index du shard (0-9 pour 10 shards)
    const newSection = Math.floor(shardScroll * this.totalSections);
    const clampedSection = Math.max(0, Math.min(newSection, this.totalSections - 1));
    
    // Calculer sous-étape dans la section
    const sectionProgress = (shardScroll * this.totalSections) % 1;
    const newSubStep = Math.floor(sectionProgress * SCROLL.SUB_STEPS_PER_SHARD);
    const clampedSubStep = Math.max(0, Math.min(newSubStep, SCROLL.SUB_STEPS_PER_SHARD - 1));
    
    // Détecter changement de section
    if (clampedSection !== this.currentSection) {
      const oldSection = this.currentSection;
      this.currentSection = clampedSection;
      
      if (this.onSectionChange) {
        this.onSectionChange(clampedSection, oldSection);
      }
    }
    
    // Détecter changement de sous-étape
    if (clampedSubStep !== this.currentSubStep) {
      const oldSubStep = this.currentSubStep;
      this.currentSubStep = clampedSubStep;
      
      if (this.onSubStepChange) {
        this.onSubStepChange(clampedSubStep, oldSubStep, this.currentSection);
      }
    }
  }
  
  /**
   * Vérifie si on est dans la section About/Contact
   */
  checkAboutSection() {
    const wasInAbout = this.isInAboutSection;
    this.isInAboutSection = this.scroll >= SCROLL.ABOUT_SECTION_THRESHOLD;
    
    if (this.isInAboutSection && !wasInAbout) {
      if (this.onAboutSectionEnter) {
        this.onAboutSectionEnter();
      }
    } else if (!this.isInAboutSection && wasInAbout) {
      if (this.onAboutSectionLeave) {
        this.onAboutSectionLeave();
      }
    }
  }
  
  /**
   * Obtient le progrès normalisé dans la section courante
   */
  getSectionProgress() {
    const sectionSize = 1 / this.totalSections;
    const sectionStart = this.currentSection * sectionSize;
    const shardScroll = Math.min(this.scroll, 1.0);
    return (shardScroll - sectionStart) / sectionSize;
  }
  
  /**
   * Obtient le seuil de sous-étape actuel
   */
  getSubStepThreshold() {
    const progress = this.getSectionProgress();
    const thresholds = SCROLL.SUB_STEP_THRESHOLDS;
    
    if (progress < thresholds.APPROACHING) return 'approaching';
    if (progress < thresholds.ENTERING) return 'entering';
    if (progress < thresholds.CENTERED) return 'centered';
    if (progress < thresholds.LEAVING) return 'leaving';
    return 'exiting';
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
    
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(1.0, target));
    
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
   * Scroll vers la section About/Contact
   */
  scrollToAbout(instant = false) {
    this.scrollTo(SCROLL.ABOUT_SECTION_THRESHOLD + 0.1, instant);
  }
  
  /**
   * Lock/Unlock
   */
  lock() {
    this.locked = true;
  }
  
  unlock() {
    this.locked = false;
  }
  
  /**
   * Enable/Disable
   */
  enable() {
    this.enabled = true;
  }
  
  disable() {
    this.enabled = false;
  }
  
  /**
   * Reset
   */
  reset() {
    this.scroll = 0;
    this.scrollTarget = 0;
    this.velocity = 0;
    this.currentSection = 0;
    this.currentSubStep = 0;
    this.isInAboutSection = false;
  }
  
  /**
   * Getters
   */
  getScroll() { return this.scroll; }
  getScrollTarget() { return this.scrollTarget; }
  getCurrentSection() { return this.currentSection; }
  getCurrentSubStep() { return this.currentSubStep; }
  getProgress() { return this.scroll; }
  getShardProgress() { return Math.min(this.scroll, 1.0); }
  isInAbout() { return this.isInAboutSection; }
  
  /**
   * Utilitaires
   */
  static map(value, inMin, inMax, outMin, outMax) {
    return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
  }
  
  static clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
}
