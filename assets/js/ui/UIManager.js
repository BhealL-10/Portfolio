/**
 * UIManager.js - Gestion des sections About/Contact
 * Portfolio 3D V3.0
 * 
 * - Affichage conditionnel des sections About/Contact
 * - Indicateurs de scroll et navigation
 */

import { LAYERS, UI, SCROLL } from '../config/constants.js';
import { projects } from '../data/projects.js';

export class UIManager {
  constructor() {
    this.sectionIndicator = null;
    this.scrollIndicator = null;
    this.aboutSection = null;
    this.isAboutVisible = false;
    
    this.init();
  }
  
  /**
   * Initialisation
   */
  init() {
    this.createScrollIndicator();
    this.createSectionIndicator();
    this.setupAboutSection();
    this.injectStyles();
  }
  
  /**
   * Injecte les styles CSS
   */
  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --bg-primary: #F2DDB8;
        --bg-secondary: rgba(0,0,0,0.1);
        --text-primary: #393F4A;
        --text-secondary: rgba(57,63,74,0.7);
        --accent: #4a90d9;
      }
      
      [data-theme="dark"] {
        --bg-primary: #393F4A;
        --bg-secondary: rgba(255,255,255,0.1);
        --text-primary: #F2DDB8;
        --text-secondary: rgba(242,221,184,0.7);
      }
      
      .shard-info-content {
        font-family: system-ui, -apple-system, sans-serif;
      }
      
      .shard-category {
        display: inline-block;
        padding: 6px 14px;
        background: var(--accent);
        color: white;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .shard-title {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 12px 0;
        color: var(--text-primary);
      }
      
      .shard-description {
        font-size: 16px;
        line-height: 1.6;
        color: var(--text-secondary);
        margin: 0 0 20px 0;
      }
      
      .shard-technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        margin-bottom: 20px;
      }
      
      .tech-tag {
        padding: 5px 12px;
        background: var(--bg-secondary);
        border-radius: 15px;
        font-size: 13px;
        color: var(--text-primary);
      }
      
      .shard-links {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      
      .project-link {
        padding: 10px 20px;
        background: var(--accent);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .project-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(74, 144, 217, 0.4);
      }
      
      .facette-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-bottom: 20px;
      }
      
      .facette-prev, .facette-next {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: var(--bg-secondary);
        color: var(--text-primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s, transform 0.2s;
        pointer-events: auto;
      }
      
      .facette-prev:hover, .facette-next:hover {
        background: var(--accent);
        color: white;
        transform: scale(1.1);
      }
      
      .facette-indicator {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-secondary);
      }
      
      .about-section, .contact-section {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.6s ease;
      }
      
      .about-section.visible, .contact-section.visible {
        opacity: 1;
        pointer-events: auto;
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Crée l'indicateur de scroll
   */
  createScrollIndicator() {
    this.scrollIndicator = document.createElement('div');
    this.scrollIndicator.className = 'scroll-indicator';
    this.scrollIndicator.innerHTML = `
      <div class="scroll-progress-container">
        <div class="scroll-progress-bar"></div>
      </div>
    `;
    this.scrollIndicator.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: ${LAYERS.UI.Z_INDEX};
      opacity: 0.8;
      transition: opacity 0.3s;
    `;
    
    const containerStyle = `
      width: 200px;
      height: 4px;
      background: var(--bg-secondary);
      border-radius: 2px;
      overflow: hidden;
    `;
    
    const barStyle = `
      width: 0%;
      height: 100%;
      background: var(--accent);
      border-radius: 2px;
      transition: width 0.1s ease-out;
    `;
    
    this.scrollIndicator.querySelector('.scroll-progress-container').style.cssText = containerStyle;
    this.scrollIndicator.querySelector('.scroll-progress-bar').style.cssText = barStyle;
    
    document.body.appendChild(this.scrollIndicator);
  }
  
  /**
   * Crée l'indicateur de section (dots)
   */
  createSectionIndicator() {
    this.sectionIndicator = document.createElement('div');
    this.sectionIndicator.className = 'section-indicator';
    this.sectionIndicator.style.cssText = `
      position: fixed;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      z-index: ${LAYERS.UI.Z_INDEX};
      display: flex;
      flex-direction: column;
      gap: ${UI.INDICATORS.DOT_GAP}px;
    `;
    
    // Dots pour chaque projet
    projects.forEach((project, i) => {
      const dot = document.createElement('div');
      dot.className = 'section-dot';
      dot.dataset.index = i;
      dot.title = project.title;
      dot.style.cssText = `
        width: ${UI.INDICATORS.DOT_SIZE}px;
        height: ${UI.INDICATORS.DOT_SIZE}px;
        border-radius: 50%;
        background: var(--text-secondary);
        cursor: pointer;
        transition: transform 0.3s, background 0.3s;
      `;
      this.sectionIndicator.appendChild(dot);
    });
    
    document.body.appendChild(this.sectionIndicator);
  }
  
  /**
   * Configure la section About/Contact
   */
  setupAboutSection() {
    this.aboutSection = document.getElementById('about');
    this.contactSection = document.getElementById('contact');
    
    // Masquer par défaut
    if (this.aboutSection) {
      this.aboutSection.classList.remove('visible');
    }
    if (this.contactSection) {
      this.contactSection.classList.remove('visible');
    }
  }
  
  /**
   * Met à jour l'indicateur de section
   */
  updateSectionIndicator(currentIndex) {
    if (!this.sectionIndicator) return;
    
    const dots = this.sectionIndicator.querySelectorAll('.section-dot');
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.style.background = 'var(--accent)';
        dot.style.transform = `scale(${UI.INDICATORS.ACTIVE_SCALE})`;
      } else {
        dot.style.background = 'var(--text-secondary)';
        dot.style.transform = 'scale(1)';
      }
    });
  }
  
  /**
   * Met à jour la barre de progression
   */
  updateScrollProgress(progress) {
    const bar = this.scrollIndicator?.querySelector('.scroll-progress-bar');
    if (bar) {
      // Limiter à 100% pour la partie shards
      const displayProgress = Math.min(progress, 1) * 100;
      bar.style.width = `${displayProgress}%`;
    }
  }
  
  /**
   * Configure les callbacks de navigation
   */
  setupNavigation(scrollManager) {
    const dots = this.sectionIndicator?.querySelectorAll('.section-dot');
    dots?.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        scrollManager.scrollToSection(i);
      });
    });
  }
  
  /**
   * Affiche la section About/Contact
   */
  showAboutSection() {
    if (this.isAboutVisible) return;
    this.isAboutVisible = true;
    
    if (this.aboutSection) {
      this.aboutSection.classList.add('visible');
    }
    if (this.contactSection) {
      this.contactSection.classList.add('visible');
    }
    
    console.log('📖 About/Contact sections shown');
  }
  
  /**
   * Masque la section About/Contact
   */
  hideAboutSection() {
    if (!this.isAboutVisible) return;
    this.isAboutVisible = false;
    
    if (this.aboutSection) {
      this.aboutSection.classList.remove('visible');
    }
    if (this.contactSection) {
      this.contactSection.classList.remove('visible');
    }
    
    console.log('📖 About/Contact sections hidden');
  }
  
  /**
   * Dispose
   */
  dispose() {
    if (this.sectionIndicator?.parentNode) {
      this.sectionIndicator.parentNode.removeChild(this.sectionIndicator);
    }
    if (this.scrollIndicator?.parentNode) {
      this.scrollIndicator.parentNode.removeChild(this.scrollIndicator);
    }
  }
}
