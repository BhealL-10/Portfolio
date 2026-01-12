/**
 * ThemeSwitch.js - Gestion du thème light/dark
 * Portfolio 3D V4.0
 */

import { LAYERS } from '../config/constants.js';

export class ThemeSwitch {
  constructor(scene, shardManager) {
    this.scene = scene;
    this.shardManager = shardManager;
    this.isDarkMode = this.detectInitialTheme();
    
    this.toggleButton = null;
    this.createToggleButton();
    this.applyTheme();
  }
  
  detectInitialTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    
    const dataTheme = document.documentElement.getAttribute('data-theme');
    if (dataTheme) return dataTheme === 'dark';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  createToggleButton() {
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'theme-toggle';
    this.toggleButton.setAttribute('aria-label', 'Toggle theme');
    this.toggleButton.innerHTML = this.getIcon();
    
    this.toggleButton.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 10000;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: var(--bg-secondary, rgba(255,255,255,0.1));
      backdrop-filter: blur(12px);
      cursor: pointer;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    
    this.toggleButton.addEventListener('click', () => this.toggle());
    this.toggleButton.addEventListener('mouseenter', () => {
      this.toggleButton.style.transform = 'scale(1.1)';
      this.toggleButton.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
    });
    this.toggleButton.addEventListener('mouseleave', () => {
      this.toggleButton.style.transform = 'scale(1)';
      this.toggleButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
    
    document.body.appendChild(this.toggleButton);
  }
  
  getIcon() {
    return this.isDarkMode 
      ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  
  toggle() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    
    this.toggleButton.style.transform = 'scale(0.8) rotate(180deg)';
    setTimeout(() => {
      this.toggleButton.innerHTML = this.getIcon();
      this.toggleButton.style.transform = 'scale(1) rotate(0deg)';
    }, 150);
  }
  
  applyTheme() {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    
    document.documentElement.style.setProperty('--bg-primary', this.isDarkMode ? '#393F4A' : '#F2DDB8');
    document.documentElement.style.setProperty('--bg-secondary', this.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)');
    document.documentElement.style.setProperty('--text-primary', this.isDarkMode ? '#F2DDB8' : '#393F4A');
    document.documentElement.style.setProperty('--text-secondary', this.isDarkMode ? 'rgba(242,221,184,0.7)' : 'rgba(57,63,74,0.7)');
    
    if (this.scene) {
      this.scene.setTheme(this.isDarkMode);
    }
    
    if (this.shardManager) {
      this.shardManager.setTheme(this.isDarkMode);
    }
  }
  
  getIsDarkMode() {
    return this.isDarkMode;
  }
}
