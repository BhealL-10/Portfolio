import type { Language } from '../types/content';

const uiStrings = {
  fr: {
    theme: 'Thème',
    language: 'Langue',
    about: 'About / Outro',
    backToOrbit: 'Retour à l’orbite',
    unlocked: 'Mini-jeu débloqué',
    locked: 'Mini-jeu verrouillé',
    close: 'Fermer',
    previous: 'Précédent',
    next: 'Suivant',
    technologies: 'Technologies',
    links: 'Liens',
    media: 'Médias',
    clickToGrid: 'Cliquez sur le média pour afficher la grille.',
    introTitle: 'Portfolio',
    introSubtitle: 'Bilel Kharbouche',
    introHint: 'Cliquez plusieurs fois pour fissurer la surface.',
    orbitHint: 'Cliquez une shard pour la mettre en focus.',
    focusHint: 'Glissez horizontalement ou utilisez les flèches pour changer de facette.',
    dragHint: 'Faites glisser une shard hors focus pour chercher sa place secrète.',
    slotHint: 'La bonne place réagit quand la bonne shard s’en approche.',
    unlockedHint: 'Toutes les shards sont placées. Le mini-jeu est prêt à être branché.',
    aboutTitle: 'About / Outro',
    home: 'Accueil',
    gameScore: 'Score',
    gameBest: 'Meilleur score',
    gameRestart: 'Recommencer',
    gamePortfolio: 'Portfolio',
    gameStatusTransition: 'Le chemin s’aligne.',
    gameStatusRunning: 'Maintenez bas pour charger. Haut pour sauter.',
    gameStatusGameOver: 'Capture manquée. Relancez immédiatement ou revenez au portfolio.'
  },
  en: {
    theme: 'Theme',
    language: 'Language',
    about: 'About / Outro',
    backToOrbit: 'Back to orbit',
    unlocked: 'Mini-game unlocked',
    locked: 'Mini-game locked',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    technologies: 'Technologies',
    links: 'Links',
    media: 'Media',
    clickToGrid: 'Click the media to open the grid.',
    introTitle: 'Portfolio',
    introSubtitle: 'Bilel Kharbouche',
    introHint: 'Click repeatedly to fracture the surface.',
    orbitHint: 'Click a shard to focus it.',
    focusHint: 'Swipe or drag horizontally to change facets.',
    dragHint: 'Drag a shard outside focus to look for its hidden slot.',
    slotHint: 'The correct slot reacts when the correct shard gets close.',
    unlockedHint: 'All shards are placed. The mini-game hook is ready.',
    aboutTitle: 'About / Outro',
    home: 'Home',
    gameScore: 'Score',
    gameBest: 'Best',
    gameRestart: 'Restart',
    gamePortfolio: 'Portfolio',
    gameStatusTransition: 'Aligning the path.',
    gameStatusRunning: 'Hold Down to charge. Press Up to jump.',
    gameStatusGameOver: 'Missed the capture. Restart instantly or return to the portfolio.'
  }
} as const;

export type UIStringKey = keyof typeof uiStrings.fr;

export class I18nService {
  private language: Language;
  private listeners = new Set<(language: Language) => void>();

  constructor() {
    const stored = window.localStorage.getItem('portfolio-language');
    this.language = stored === 'en' ? 'en' : 'fr';
    document.documentElement.lang = this.language;
  }

  get current() {
    return this.language;
  }

  toggle() {
    this.language = this.language === 'fr' ? 'en' : 'fr';
    window.localStorage.setItem('portfolio-language', this.language);
    document.documentElement.lang = this.language;
    this.listeners.forEach((listener) => listener(this.language));
  }

  t(key: UIStringKey) {
    return uiStrings[this.language][key];
  }

  onChange(listener: (language: Language) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
