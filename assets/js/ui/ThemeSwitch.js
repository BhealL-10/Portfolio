/**
 * ThemeSwitch.js - Gestion du thème light/dark
 * Portfolio 3D V2.0
 */

export class ThemeSwitch {
  constructor(scene, shardManager) {
    this.scene = scene;
    this.shardManager = shardManager;
    this.isDarkMode = this.detectInitialTheme();
    
    this.toggleButton = null;
    this.createToggleButton();
    this.applyTheme();
  }
  
  /**
   * Détecte le thème initial
   */
  detectInitialTheme() {
    // Priorité: localStorage > data-theme > prefers-color-scheme
    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    }
    
    const dataTheme = document.documentElement.getAttribute('data-theme');
    if (dataTheme) {
      return dataTheme === 'dark';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  /**
   * Crée le bouton de toggle
   */
  createToggleButton() {
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'theme-toggle';
    this.toggleButton.setAttribute('aria-label', 'Toggle theme');
    this.toggleButton.innerHTML = this.isDarkMode ? '☀️' : '🌙';
    
    this.toggleButton.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: var(--bg-secondary, rgba(255,255,255,0.1));
      backdrop-filter: blur(10px);
      cursor: pointer;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease, background 0.3s ease;
    `;
    
    this.toggleButton.addEventListener('click', () => this.toggle());
    this.toggleButton.addEventListener('mouseenter', () => {
      this.toggleButton.style.transform = 'scale(1.1)';
    });
    this.toggleButton.addEventListener('mouseleave', () => {
      this.toggleButton.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(this.toggleButton);
  }
  
  /**
   * Toggle le thème
   */
  toggle() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    
    // Animation du bouton
    this.toggleButton.style.transform = 'scale(0.8) rotate(180deg)';
    setTimeout(() => {
      this.toggleButton.innerHTML = this.isDarkMode ? '☀️' : '🌙';
      this.toggleButton.style.transform = 'scale(1) rotate(0deg)';
    }, 150);
  }
  
  /**
   * Applique le thème
   */
  applyTheme() {
    // Sauvegarder
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    
    // HTML attribute
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    
    // Scene Three.js
    if (this.scene) {
      this.scene.setTheme(this.isDarkMode);
    }
    
    // Shards
    if (this.shardManager) {
      this.shardManager.setTheme(this.isDarkMode);
    }
  }
  
  /**
   * Getter
   */
  getIsDarkMode() {
    return this.isDarkMode;
  }
}
