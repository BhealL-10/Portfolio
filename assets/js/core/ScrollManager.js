/**
 * ScrollManager.js - Gestionnaire scroll virtuel V5.0
 * Portfolio 3D - Navigation centralisée avec verrouillage obligatoire pendant unfocus
 */

import { SCROLL, NAVIGATION } from '../config/constants.js';

export class ScrollManager {
  constructor(deviceManager) {
    this.deviceManager = deviceManager;
    
    this.scroll = 0;
    this.scrollTarget = 0;
    
    this.enabled = true;
    this.locked = false;
    this.lockedByUnfocus = false;
    
    this.touchStartY = 0;
    this.lastTouchY = 0;
    
    this.velocity = 0;
    this.lastScrollTime = 0;
    
    this.currentSection = 0;
    this.currentSubStep = 0;
    this.totalSections = 10;
    
    this.onScrollChange = null;
    this.onSectionChange = null;
    this.onSubStepChange = null;
    this.onAboutSectionEnter = null;
    this.onAboutSectionLeave = null;
    
    this.isInAboutSection = false;
    
    this.init();
  }
  
  getConfig() {
    if (this.deviceManager) {
      return this.deviceManager.getScrollConfig();
    }
    return SCROLL.RESPONSIVE.DESKTOP;
  }
  
  init() {
    this.setupWheelListener();
    this.setupTouchListeners();
    this.setupKeyboardListener();
  }
  
  setupWheelListener() {
    window.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
  }
  
  onWheel(event) {
    if (this.locked || this.lockedByUnfocus) {
      event.preventDefault();
      return;
    }
    
    event.preventDefault();
    
    const config = this.getConfig();
    const delta = event.deltaY * (config.SPEED || SCROLL.SPEED);
    this.scrollTarget += delta;
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, this.scrollTarget));
    
    this.velocity = delta;
    this.lastScrollTime = Date.now();
  }
  
  setupTouchListeners() {
    window.addEventListener('touchstart', (e) => {
      if (this.locked || this.lockedByUnfocus) return;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    
    window.addEventListener('touchend', () => {
      this.touchStartY = null;
      this.lastTouchY = 0;
    }, { passive: true });
  }
  
  onTouchMove(event) {
    if (this.locked || this.lockedByUnfocus) {
      event.preventDefault();
      return;
    }
    
    if (this.touchStartY === null) return;
    
    event.preventDefault();
    
    const config = this.getConfig();
    const touchY = event.touches[0].clientY;
    const touchMultiplier = config.TOUCH_MULTIPLIER || SCROLL.TOUCH_MULTIPLIER;
    const speed = config.SPEED || SCROLL.SPEED;
    const delta = (this.touchStartY - touchY) * speed * touchMultiplier;
    
    this.scrollTarget += delta;
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, this.scrollTarget));
    
    this.touchStartY = touchY;
    this.velocity = delta;
  }
  
  setupKeyboardListener() {
    window.addEventListener('keydown', (e) => {
      if (this.locked || this.lockedByUnfocus) {
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
  
  addScroll(delta) {
    if (this.locked || this.lockedByUnfocus) return;
    this.scrollTarget += delta;
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, this.scrollTarget));
  }
  
  setScroll(value) {
    this.scroll = value;
    this.scrollTarget = value;
  }
  
  update() {
    if (!this.enabled) return this.scroll;
    if (this.locked || this.lockedByUnfocus) return this.scroll;
    
    const config = this.getConfig();
    const smoothing = config.SMOOTHING || SCROLL.SMOOTHING;
    
    const diff = this.scrollTarget - this.scroll;
    this.scroll += diff * smoothing;
    
    if (Math.abs(diff) < 0.0001) {
      this.scroll = this.scrollTarget;
    }
    
    this.updateSectionAndSubStep();
    this.checkAboutSection();
    
    if (this.onScrollChange && Math.abs(diff) > 0.0001) {
      this.onScrollChange(this.scroll, this.velocity);
    }
    
    return this.scroll;
  }
  
  updateSectionAndSubStep() {
    if (this.totalSections <= 0) return;
    
    const shardScroll = Math.min(this.scroll, 1.0);
    
    const newSection = Math.floor(shardScroll * this.totalSections);
    const clampedSection = Math.max(0, Math.min(newSection, this.totalSections - 1));
    
    const sectionProgress = (shardScroll * this.totalSections) % 1;
    const newSubStep = Math.floor(sectionProgress * SCROLL.SUB_STEPS_PER_SHARD);
    const clampedSubStep = Math.max(0, Math.min(newSubStep, SCROLL.SUB_STEPS_PER_SHARD - 1));
    
    if (clampedSection !== this.currentSection) {
      const oldSection = this.currentSection;
      this.currentSection = clampedSection;
      
      if (this.onSectionChange) {
        this.onSectionChange(clampedSection, oldSection);
      }
    }
    
    if (clampedSubStep !== this.currentSubStep) {
      const oldSubStep = this.currentSubStep;
      this.currentSubStep = clampedSubStep;
      
      if (this.onSubStepChange) {
        this.onSubStepChange(clampedSubStep, oldSubStep, this.currentSection);
      }
    }
  }
  
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
  
  getSectionProgress() {
    const sectionSize = 1 / this.totalSections;
    const sectionStart = this.currentSection * sectionSize;
    const shardScroll = Math.min(this.scroll, 1.0);
    return (shardScroll - sectionStart) / sectionSize;
  }
  
  setTotalSections(count) {
    this.totalSections = Math.max(1, count);
  }
  
  scrollToSection(index, instant = false) {
    const sectionSize = 1 / this.totalSections;
    const target = (index + 0.5) * sectionSize;
    
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(1.0, target));
    
    if (instant) {
      this.scroll = this.scrollTarget;
    }
  }
  
  scrollTo(value, instant = false) {
    this.scrollTarget = Math.max(SCROLL.MIN, Math.min(SCROLL.MAX, value));
    
    if (instant) {
      this.scroll = this.scrollTarget;
    }
  }
  
  lock() { this.locked = true; }
  unlock() { this.locked = false; }
  
  lockForUnfocus() {
    this.lockedByUnfocus = true;
  }
  
  unlockAfterUnfocus() {
    this.lockedByUnfocus = false;
  }
  
  setLocked(locked) {
    this.locked = locked;
  }
  
  enable() { this.enabled = true; }
  disable() { this.enabled = false; }
  
  reset() {
    this.scroll = 0;
    this.scrollTarget = 0;
    this.velocity = 0;
    this.currentSection = 0;
    this.currentSubStep = 0;
    this.isInAboutSection = false;
  }
  
  getScroll() { return this.scroll; }
  getScrollTarget() { return this.scrollTarget; }
  getCurrentSection() { return this.currentSection; }
  getCurrentSubStep() { return this.currentSubStep; }
  getProgress() { return this.scroll; }
  getShardProgress() { return Math.min(this.scroll, 1.0); }
  isInAbout() { return this.isInAboutSection; }
  getLocked() { return this.locked || this.lockedByUnfocus; }
  getEnabled() { return this.enabled; }
}
