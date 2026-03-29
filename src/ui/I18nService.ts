import type { Language } from '../types/content';

const uiStrings = {
  fr: {
    theme: 'Thème',
    language: 'Langue',
    gameAudio: 'Audio',
    gameVolume: 'Volume',
    gameMute: 'Couper',
    gameUnmute: 'Activer',
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
    gameBest: 'Record',
    gameBestDistance: 'Meilleure distance',
    gameChain: 'Chaîne',
    gameMomentum: 'Momentum',
    gameCharge: 'Charge',
    gameDistance: 'Distance',
    gameCoins: 'Pièces',
    gameSplits: 'Splits',
    gameRestart: 'Recommencer',
    gameHighscores: 'Highscores',
    gameSaveScore: 'Enregistrer',
    gameRegisterScore: 'S’enregistrer',
    gameSaveAvatar: 'Enregistrer avatar',
    gamePlayerName: 'Votre nom',
    gameAnonymous: 'Anonyme',
    gameCurrentRun: 'Vous',
    gameMainMenu: 'Menu principal',
    gamePortfolio: 'Portfolio',
    gameStatusTransition: 'Le chemin s’aligne.',
    gameStatusRunning: 'Maintenez bas pour charger. Haut pour sauter.',
    gameStatusUpgrade: 'Sautez vers une branche pour choisir votre item.',
    gameStatusGameOver: 'Run terminée.',
    gameUpgradeTitle: 'Choisissez une amélioration',
    gameUpgradeHint: 'Sautez vers une branche. 1, 2, 3 restent disponibles en secours.',
    gameShopTitle: 'Marché orbital',
    gameShopHint: 'Tournez autour de la shard pour acheter une offre.',
    gameShopClose: 'Retour',
    gamePathLeft: 'Voie gauche',
    gamePathCenter: 'Voie centrale',
    gamePathRight: 'Voie droite',
    gamePathUpper: 'Voie haute',
    gamePathForward: 'Voie frontale',
    gamePathLower: 'Voie basse',
    gameShopOffer: 'Offre orbitale',
    gamePrice: 'Prix',
    gameOverTitle: 'Game Over',
    gameOverBody: 'La caméra vous a dépassé ou la trajectoire a été manquée.',
    gameOverCamera: 'La caméra vous a laissé derrière.',
    gameOverEnemy: 'Un ennemi vous a touché de face.',
    gameOverBounds: 'Vous êtes sorti de la zone jouable.',
    gameAcquired: 'Objet acquis',
    gameLandingMiss: 'Raté',
    gameLandingGood: 'Bon',
    gameLandingSuper: 'Super',
    gameLandingPerfect: 'Parfait',
    gameLandingTwist: 'Twist',
    gameNewBadge: 'Nouveau',
    gameRunShards: 'Fragments',
    gameRunKills: 'Monstres',
    gameRunMomentum: 'Meilleur momentum',
    gameRunNoItems: 'Aucun équipement trouvé',
    gameLeaderboardEmpty: 'Aucun score enregistré'
  },
  en: {
    theme: 'Theme',
    language: 'Language',
    gameAudio: 'Audio',
    gameVolume: 'Volume',
    gameMute: 'Mute',
    gameUnmute: 'Unmute',
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
    gameBestDistance: 'Best distance',
    gameChain: 'Chain',
    gameMomentum: 'Momentum',
    gameCharge: 'Charge',
    gameDistance: 'Distance',
    gameCoins: 'Coins',
    gameSplits: 'Splits',
    gameRestart: 'Restart',
    gameHighscores: 'Highscores',
    gameSaveScore: 'Save score',
    gameRegisterScore: 'Register',
    gameSaveAvatar: 'Save avatar',
    gamePlayerName: 'Your name',
    gameAnonymous: 'Anonymous',
    gameCurrentRun: 'You',
    gameMainMenu: 'Main menu',
    gamePortfolio: 'Portfolio',
    gameStatusTransition: 'Aligning the path.',
    gameStatusRunning: 'Hold Down to charge. Press Up to jump.',
    gameStatusUpgrade: 'Jump into a branch to claim an item.',
    gameStatusGameOver: 'Run over.',
    gameUpgradeTitle: 'Choose an upgrade',
    gameUpgradeHint: 'Jump into a branch. 1, 2, 3 remain available as fallback.',
    gameShopTitle: 'Orbital market',
    gameShopHint: 'Rotate around the shard to buy one offer.',
    gameShopClose: 'Return',
    gamePathLeft: 'Left path',
    gamePathCenter: 'Center path',
    gamePathRight: 'Right path',
    gamePathUpper: 'Upper path',
    gamePathForward: 'Forward path',
    gamePathLower: 'Lower path',
    gameShopOffer: 'Orbital offer',
    gamePrice: 'Price',
    gameOverTitle: 'Game Over',
    gameOverBody: 'The camera overtook you or the jump line was lost.',
    gameOverCamera: 'The camera left you behind.',
    gameOverEnemy: 'An enemy hit you from the front.',
    gameOverBounds: 'You left the playable zone.',
    gameAcquired: 'Item acquired',
    gameLandingMiss: 'Miss',
    gameLandingGood: 'Good',
    gameLandingSuper: 'Super',
    gameLandingPerfect: 'Perfect',
    gameLandingTwist: 'Twist',
    gameNewBadge: 'New',
    gameRunShards: 'Shards',
    gameRunKills: 'Monsters',
    gameRunMomentum: 'Longest momentum',
    gameRunNoItems: 'No equipment found',
    gameLeaderboardEmpty: 'No scores saved yet'
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
