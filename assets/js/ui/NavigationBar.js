/**
 * NavigationBar.js - Barre de navigation V5.0
 * Portfolio 3D - Navigation responsive
 */

import { TYPOGRAPHY } from '../config/constants.js';

export class NavigationBar {
  constructor(scrollManager, deviceManager, languageManager) {
    this.scrollManager = scrollManager;
    this.deviceManager = deviceManager;
    this.languageManager = languageManager;
    this.navBar = null;
    this.isVisible = false;
    this.langButton = null;
    
    this.createNavigationBar();
  }
  
  createNavigationBar() {
    this.navBar = document.createElement('nav');
    this.navBar.className = 'navigation-bar';
    
    // Bouton de langue (drapeau)
    this.langButton = this.createLanguageButton();
    this.navBar.appendChild(this.langButton);
    
    const homeButton = this.createNavButton('Intro', () => this.scrollToTop());
    const aboutButton = this.createNavButton('Outro', () => this.scrollToAbout());
    
    this.navBar.appendChild(homeButton);
    this.navBar.appendChild(aboutButton);
    
    document.body.appendChild(this.navBar);
    
    this.updateTheme();
  }
  
  createLanguageButton() {
    const button = document.createElement('button');
    button.className = 'lang-button';
    button.setAttribute('aria-label', 'Change language');
    
    const currentLang = this.languageManager ? this.languageManager.getCurrentLanguage() : 'fr';
    const flagImg = document.createElement('img');
    flagImg.src = currentLang === 'fr' ? 'assets/images/Langue/FR.svg' : 'assets/images/Langue/EN.svg';
    flagImg.alt = currentLang === 'fr' ? 'Français' : 'English';
    flagImg.style.width = '24px';
    flagImg.style.height = '24px';
    button.appendChild(flagImg);
    
    button.addEventListener('click', () => {
      if (this.languageManager) {
        this.languageManager.toggleLanguage();
        const newLang = this.languageManager.getCurrentLanguage();
        flagImg.src = newLang === 'fr' ? 'assets/images/Langue/FR.svg' : 'assets/images/Langue/EN.svg';
        flagImg.alt = newLang === 'fr' ? 'Français' : 'English';
      }
    });
    
    return button;
  }
  
  createNavButton(label, onClick) {
    const button = document.createElement('button');
    button.className = 'nav-button';
    button.textContent = label;
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
