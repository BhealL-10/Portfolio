export class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('portfolio-language') || 'fr';
    this.translations = {
      fr: {},
      en: {}
    };
    this.onLanguageChange = null;
  }
  
  getCurrentLanguage() {
    return this.currentLanguage;
  }
  
  setLanguage(lang) {
    if (lang !== 'fr' && lang !== 'en') return;
    
    this.currentLanguage = lang;
    localStorage.setItem('portfolio-language', lang);
    document.documentElement.setAttribute('lang', lang);
    
    if (this.onLanguageChange) {
      this.onLanguageChange(lang);
    }
    
    this.updatePageContent();
  }
  
  toggleLanguage() {
    const newLang = this.currentLanguage === 'fr' ? 'en' : 'fr';
    this.setLanguage(newLang);
  }
  
  translate(key, lang = null) {
    const targetLang = lang || this.currentLanguage;
    return this.translations[targetLang]?.[key] || key;
  }
  
  setTranslations(fr, en) {
    this.translations.fr = { ...this.translations.fr, ...fr };
    this.translations.en = { ...this.translations.en, ...en };
  }
  
  updatePageContent() {
    // Mettre à jour la section About
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      this.updateAboutSection(aboutSection);
    }
  }
  
  updateAboutSection(section) {
    const lang = this.currentLanguage;
    
    const aboutContent = {
      fr: {
        aboutTitle: 'À propos',
        aboutText1: 'Passionné par la création sous toutes ses formes, je combine développement web, réalisation audiovisuelle, montage vidéo et design graphique pour donner vie à des projets uniques.',
        aboutText2: 'Mon approche multidisciplinaire me permet de créer des expériences complètes, de la conception à la réalisation.',
        devTitle: '💻 Développement',
        devText: 'JavaScript, React, Three.js, Node.js, Ruby on Rails',
        realTitle: '🎬 Réalisation',
        realText: 'Direction artistique, Scénarisation, Storyboarding',
        videoTitle: '🎥 Vidéo',
        videoText: 'Montage, Motion Design, VFX, Color Grading',
        graphTitle: '🎨 Graphisme',
        graphText: 'UI/UX, Branding, Illustration, Design System',
        contactTitle: 'Contact',
        contactText: 'Intéressé par une collaboration ? N\'hésitez pas à me contacter.',
        emailLabel: 'Email',
        githubLabel: 'GitHub',
        linkedinLabel: 'LinkedIn'
      },
      en: {
        aboutTitle: 'About',
        aboutText1: 'Passionate about creation in all its forms, I combine web development, audiovisual production, video editing and graphic design to bring unique projects to life.',
        aboutText2: 'My multidisciplinary approach allows me to create complete experiences, from conception to realization.',
        devTitle: '💻 Development',
        devText: 'JavaScript, React, Three.js, Node.js, Ruby on Rails',
        realTitle: '🎬 Production',
        realText: 'Art Direction, Scriptwriting, Storyboarding',
        videoTitle: '🎥 Video',
        videoText: 'Editing, Motion Design, VFX, Color Grading',
        graphTitle: '🎨 Graphics',
        graphText: 'UI/UX, Branding, Illustration, Design System',
        contactTitle: 'Contact',
        contactText: 'Interested in a collaboration? Feel free to contact me.',
        emailLabel: 'Email',
        githubLabel: 'GitHub',
        linkedinLabel: 'LinkedIn'
      }
    };
    
    const content = aboutContent[lang];
    
    // Mettre à jour les titres
    const aboutH2 = section.querySelector('h2');
    if (aboutH2) aboutH2.textContent = content.aboutTitle;
    
    // Mettre à jour les textes About
    const aboutTexts = section.querySelectorAll('.about-text p');
    if (aboutTexts[0]) aboutTexts[0].textContent = content.aboutText1;
    if (aboutTexts[1]) aboutTexts[1].textContent = content.aboutText2;
    
    // Mettre à jour les skill cards
    const skillCards = section.querySelectorAll('.skill-card');
    if (skillCards[0]) {
      skillCards[0].querySelector('h3').textContent = content.devTitle;
      skillCards[0].querySelector('p').textContent = content.devText;
    }
    if (skillCards[1]) {
      skillCards[1].querySelector('h3').textContent = content.realTitle;
      skillCards[1].querySelector('p').textContent = content.realText;
    }
    if (skillCards[2]) {
      skillCards[2].querySelector('h3').textContent = content.videoTitle;
      skillCards[2].querySelector('p').textContent = content.videoText;
    }
    if (skillCards[3]) {
      skillCards[3].querySelector('h3').textContent = content.graphTitle;
      skillCards[3].querySelector('p').textContent = content.graphText;
    }
    
    // Mettre à jour Contact
    const contactH2 = section.querySelectorAll('h2')[1];
    if (contactH2) contactH2.textContent = content.contactTitle;
    
    const contactText = section.querySelector('.contact-content p');
    if (contactText) contactText.textContent = content.contactText;
    
    // Mettre à jour les labels des liens
    const contactLinks = section.querySelectorAll('.contact-link');
    if (contactLinks[0]) contactLinks[0].childNodes[contactLinks[0].childNodes.length - 1].textContent = content.emailLabel;
    if (contactLinks[1]) contactLinks[1].childNodes[contactLinks[1].childNodes.length - 1].textContent = content.githubLabel;
    if (contactLinks[2]) contactLinks[2].childNodes[contactLinks[2].childNodes.length - 1].textContent = content.linkedinLabel;
  }
}
