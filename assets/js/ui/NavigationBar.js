/**
 * NavigationBar.js - Barre de navigation V5.0
 * Portfolio 3D - Navigation responsive
 */

import { TYPOGRAPHY } from '../config/constants.js';

export class NavigationBar {
  constructor(scrollManager, deviceManager) {
    this.scrollManager = scrollManager;
    this.deviceManager = deviceManager;
    this.navBar = null;
    this.isVisible = false;
    
    this.createNavigationBar();
  }
  
  createNavigationBar() {
    this.navBar = document.createElement('nav');
    this.navBar.className = 'navigation-bar';
    this.navBar.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      gap: 12px;
      padding: 8px 16px;
      background: var(--nav-bg);
      border: 1px solid var(--nav-border);
      border-radius: 24px;
      backdrop-filter: blur(10px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease, transform 0.4s ease;
      transform: translateX(-50%) translateY(-20px);
      user-select: none;
      font-family: ${TYPOGRAPHY.PRIMARY_FONT};
    `;
    
    const homeButton = this.createNavButton('Intro', () => this.scrollToTop());
    const aboutButton = this.createNavButton('Outro', () => this.scrollToAbout());
    
    this.navBar.appendChild(homeButton);
    this.navBar.appendChild(aboutButton);
    
    document.body.appendChild(this.navBar);
    
    this.updateTheme();
  }
  
  createNavButton(label, onClick) {
    const button = document.createElement('button');
    button.className = 'nav-button';
    button.textContent = label;
    button.style.cssText = `
      padding: 8px 20px;
      background: transparent;
      border: none;
      color: var(--nav-text);
      font-size: 14px;
      font-weight: ${TYPOGRAPHY.FONT_WEIGHTS.MEDIUM};
      cursor: pointer;
      border-radius: 16px;
      transition: all 0.2s ease;
      font-family: ${TYPOGRAPHY.PRIMARY_FONT};
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.background = 'var(--nav-hover-bg)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.background = 'transparent';
    });
    
    button.addEventListener('click', onClick);
    
    return button;
  }
  
  scrollToTop() {
    if (this.scrollManager) {
      this.scrollManager.setScroll(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  scrollToAbout() {
    if (this.scrollManager) {
      this.scrollManager.setScroll(1);
    } else {
      const aboutSection = document.getElementById('about');
      if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  show() {
    if (!this.isVisible) {
      this.isVisible = true;
      this.navBar.style.opacity = '1';
      this.navBar.style.transform = 'translateX(-50%) translateY(0)';
      this.navBar.style.pointerEvents = 'auto';
    }
  }
  
  hide() {
    if (this.isVisible) {
      this.isVisible = false;
      this.navBar.style.opacity = '0';
      this.navBar.style.transform = 'translateX(-50%) translateY(-20px)';
      this.navBar.style.pointerEvents = 'none';
    }
  }
  
  updateTheme() {}
}
