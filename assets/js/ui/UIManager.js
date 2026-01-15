/**
 * UIManager.js - Gestion UI V5.0
 * Portfolio 3D - Interface responsive optimisée
 */

import { LAYERS, UI, SCROLL, TYPOGRAPHY } from '../config/constants.js';
import { projectsMetadata } from '../data/projects_metadata.js';

export class UIManager {
  constructor(deviceManager) {
    this.deviceManager = deviceManager;
    this.sectionIndicator = null;
    this.scrollIndicator = null;
    this.aboutSection = null;
    this.isAboutVisible = false;
    this.navigationBar = null;
    
    this.focusController = null;
    
    this.init();
  }
  
  getConfig() {
    if (this.deviceManager) return this.deviceManager.getUIConfig();
    return {
      infoOverlay: UI.INFO_OVERLAY.RESPONSIVE.DESKTOP,
      indicators: UI.INDICATORS.RESPONSIVE.DESKTOP,
      scale: 1
    };
  }
  
  init() {
    this.createSectionIndicator();
    this.setupAboutSection();
  }
  
  createSectionIndicator() {
    this.sectionIndicator = document.createElement('div');
    this.sectionIndicator.className = 'section-indicator';
    
    projectsMetadata.forEach((project, i) => {
      const dot = document.createElement('div');
      dot.className = 'section-dot';
      dot.dataset.index = i;
      dot.title = project.title;
      this.sectionIndicator.appendChild(dot);
    });
    
    document.body.appendChild(this.sectionIndicator);
  }
  
  setupAboutSection() {
    this.aboutSection = document.getElementById('about');
    if (this.aboutSection) this.aboutSection.classList.remove('visible');
  }
  
  updateSectionIndicator(currentIndex) {
    if (!this.sectionIndicator) return;
    
    const config = this.getConfig();
    const indicatorConfig = config.indicators || UI.INDICATORS.RESPONSIVE.DESKTOP;
    
    const dots = this.sectionIndicator.querySelectorAll('.section-dot');
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.style.background = 'var(--accent)';
        dot.style.transform = `scale(${indicatorConfig.ACTIVE_SCALE})`;
      } else {
        dot.style.background = 'var(--text-secondary)';
        dot.style.transform = 'scale(1)';
      }
    });
  }
  
  updateScrollProgress(progress) {
    const bar = this.scrollIndicator?.querySelector('.scroll-progress-bar');
    if (bar) {
      const displayProgress = Math.min(progress, 1) * 100;
      bar.style.width = `${displayProgress}%`;
    }
  }
  
  setNavigationBar(navigationBar) {
    this.navigationBar = navigationBar;
  }
  
  setupNavigation(scrollManager, shardManager, focusController) {
    this.focusController = focusController;
    const dots = this.sectionIndicator?.querySelectorAll('.section-dot');
    
    dots?.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        if (focusController) {
          focusController.navigateToSection(i, true);
        } else if (scrollManager && shardManager) {
          const totalShards = shardManager.getTotalShards();
          const targetScroll = i / totalShards;
          scrollManager.setScroll(targetScroll);
        }
        
        this.updateSectionIndicator(i);
      });
    });
  }
  
  showAboutSection() {
    if (this.isAboutVisible) return;
    this.isAboutVisible = true;
    
    // Afficher la navigation bar quand About est visible
    if (this.navigationBar) {
      this.navigationBar.show();
    }
    
    if (this.aboutSection) {
      this.aboutSection.classList.add('visible');
      this.aboutSection.style.overflowY = 'auto';
      
      // Permettre le scroll natif dans la section About
      const container = this.aboutSection.querySelector('.container');
      if (container) {
        container.style.overflowY = 'auto';
        container.style.maxHeight = '100dvh';
        container.style.webkitOverflowScrolling = 'touch';
      }
    }
  }
  
  hideAboutSection() {
    if (!this.isAboutVisible) return;
    this.isAboutVisible = false;
    
    // Ne pas forcer l'affichage de la nav bar, laisser le focus controller gérer
    // La nav bar sera cachée si on est en focus, affichée sinon
    
    if (this.aboutSection) {
      this.aboutSection.classList.remove('visible');
      
      // Réinitialiser le scroll
      const container = this.aboutSection.querySelector('.container');
      if (container) {
        container.style.overflowY = '';
        container.scrollTop = 0;
      }
    }
  }
  
  enableAboutContactScroll() {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  }
  
  dispose() {
    if (this.sectionIndicator?.parentNode) this.sectionIndicator.parentNode.removeChild(this.sectionIndicator);
    if (this.scrollIndicator?.parentNode) this.scrollIndicator.parentNode.removeChild(this.scrollIndicator);
  }
}
