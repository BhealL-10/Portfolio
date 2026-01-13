/**
 * UIManager.js - Gestion UI V5.0
 * Portfolio 3D - Interface responsive optimisée
 */

import { LAYERS, UI, SCROLL, TYPOGRAPHY } from '../config/constants.js';
import { projects } from '../data/projects.js';

export class UIManager {
  constructor(deviceManager) {
    this.deviceManager = deviceManager;
    this.sectionIndicator = null;
    this.scrollIndicator = null;
    this.aboutSection = null;
    this.isAboutVisible = false;
    
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
    this.injectStyles();
  }
  
  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .shard-info-content {
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
        background: transparent;
        padding: 30px;
        border-radius: 20px;
      }
      
      .shard-category {
        display: inline-block;
        padding: 6px 14px;
        background: var(--accent);
        color: white;
        border-radius: 20px;
        font-size: 13px;
        font-weight: ${TYPOGRAPHY.FONT_WEIGHTS.SEMIBOLD};
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      }
      
      .shard-title {
        font-size: 28px;
        font-weight: ${TYPOGRAPHY.FONT_WEIGHTS.BOLD};
        margin: 0 0 12px 0;
        color: var(--focus-text);
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      }
      
      .shard-description {
        font-size: 16px;
        line-height: 1.6;
        color: var(--focus-text-secondary);
        margin: 0 0 20px 0;
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      }
      
      .shard-technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        margin-bottom: 20px;
      }
      
      .tech-tag, .tech-badge {
        padding: 5px 12px;
        background: rgba(74, 144, 217, 0.2);
        border-radius: 15px;
        font-size: 13px;
        color: var(--focus-text);
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      }
      
      .shard-links {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      
      .project-link, .shard-link {
        padding: 10px 20px;
        background: var(--accent);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: ${TYPOGRAPHY.FONT_WEIGHTS.SEMIBOLD};
        font-size: 14px;
        transition: transform 0.2s, box-shadow 0.2s;
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      }
      
      .project-link:hover, .shard-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(74, 144, 217, 0.4);
      }
      
      .facette-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 120px;
        margin-bottom: 20px;
      }
      
      .facette-prev, .facette-next {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: rgba(74, 144, 217, 0.3);
        color: var(--focus-text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s, transform 0.2s;
        pointer-events: auto;
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
      }
      
      .facette-prev:hover, .facette-next:hover {
        background: var(--accent);
        color: white;
        transform: scale(1.1);
      }
      
      .facette-indicator {
        font-size: 14px;
        font-weight: ${TYPOGRAPHY.FONT_WEIGHTS.SEMIBOLD};
        color: var(--focus-text-secondary);
        font-family: ${TYPOGRAPHY.PRIMARY_FONT};
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
      
      @media (max-width: 576px) {
        .shard-info-content { padding: 20px; }
        .shard-title { font-size: 22px; }
        .shard-description { font-size: 14px; }
        .facette-nav { gap: 60px; }
        .facette-prev, .facette-next { width: 36px; height: 36px; }
      }
      
      @media (max-width: 768px) {
        .shard-info-content { padding: 25px; }
        .shard-title { font-size: 24px; }
        .facette-nav { gap: 80px; }
      }
    `;
    document.head.appendChild(style);
  }
  
  createSectionIndicator() {
    const config = this.getConfig();
    const indicatorConfig = config.indicators || UI.INDICATORS.RESPONSIVE.DESKTOP;
    
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
      gap: ${indicatorConfig.DOT_GAP}px;
    `;
    
    projects.forEach((project, i) => {
      const dot = document.createElement('div');
      dot.className = 'section-dot';
      dot.dataset.index = i;
      dot.title = project.title;
      dot.style.cssText = `
        width: ${indicatorConfig.DOT_SIZE}px;
        height: ${indicatorConfig.DOT_SIZE}px;
        border-radius: 50%;
        background: var(--text-secondary);
        cursor: pointer;
        transition: transform 0.3s, background 0.3s;
      `;
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
    
    if (this.aboutSection) {
      this.aboutSection.classList.add('visible');
      this.aboutSection.style.overflowY = 'auto';
    }
  }
  
  hideAboutSection() {
    if (!this.isAboutVisible) return;
    this.isAboutVisible = false;
    
    if (this.aboutSection) this.aboutSection.classList.remove('visible');
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
