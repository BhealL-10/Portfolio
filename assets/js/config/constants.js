/**
 * ==================== CONSTANTS.JS - CONFIGURATION CENTRALE ====================
 * 
 * GUIDE POUR DÉBUTANTS : Ce fichier contient TOUTES les valeurs de configuration du projet
 * 
 * POURQUOI CE FICHIER EST IMPORTANT ?
 * - Centralise tous les paramètres en un seul endroit
 * - Permet de modifier le comportement sans toucher au code
 * - Facilite les ajustements et le fine-tuning
 * 
 * COMMENT L'UTILISER ?
 * 1. Trouvez la section qui vous intéresse (TYPOGRAPHIE, COULEURS, SCROLL, etc.)
 * 2. Modifiez les valeurs selon vos besoins
 * 3. Sauvegardez - les changements s'appliquent automatiquement
 * 
 * ASTUCE : Commencez par de petits changements et testez immédiatement
 * 
 * Portfolio 3D V5.0 - Architecture optimisée avec physique fluide
 */

// ==========================================
// TYPOGRAPHIE (Police et tailles de texte)
// ==========================================
/* 
 * POUR DÉBUTANTS : Configuration de la police et des tailles de texte
 * 
 * PRIMARY_FONT = Police principale utilisée partout dans le projet
 * - Correspond à la police définie dans variables.css
 * - Les polices de secours (system-ui, etc.) sont utilisées si la principale ne charge pas
 * 
 * FONT_WEIGHTS = Épaisseurs de police disponibles
 * - LIGHT (300) = Texte fin
 * - REGULAR (400) = Texte normal
 * - MEDIUM (500) = Légèrement plus épais
 * - SEMIBOLD (600) = Semi-gras
 * - BOLD (700) = Gras
 * 
 * SCALE = Échelle de tailles de texte en pixels
 * - XS à HERO = Du plus petit au plus grand
 * - Utilisé pour les titres 3D et les textes dynamiques
 * 
 * MODIFICATION FACILE :
 * - Changez PRIMARY_FONT si vous changez de police
 * - Multipliez toutes les valeurs de SCALE par 1.2 pour agrandir tous les textes
 */
export const TYPOGRAPHY = {
  PRIMARY_FONT: "'Text Me One', system-ui, -apple-system, sans-serif", // Police principale
  FONT_WEIGHTS: { 
    LIGHT: 300,      // Texte fin
    REGULAR: 400,    // Texte normal
    MEDIUM: 500,     // Légèrement épais
    SEMIBOLD: 600,   // Semi-gras
    BOLD: 700        // Gras
  },
  SCALE: { 
    XS: 11,      // Très petit texte
    SM: 13,      // Petit texte
    BASE: 16,    // Taille normale
    MD: 18,      // Moyen
    LG: 22,      // Grand
    XL: 28,      // Très grand
    XXL: 36,     // Extra grand
    HERO: 52     // Titre héro (le plus grand)
  }
};

// ==========================================
// INTRO (Séquence d'introduction Canvas 2D)
// ==========================================
/* 
 * POUR DÉBUTANTS : Configuration de l'animation d'introduction
 * 
 * Cette section contrôle l'effet de miroir brisé au démarrage
 * 
 * LOGO = Chemins vers les logos et leurs dimensions
 * - DARK/LIGHT = Logos pour mode sombre/clair
 * - WIDTH/HEIGHT = Taille du logo en pixels
 * - RESPONSIVE = Ajustements automatiques selon la taille d'écran
 * 
 * HERO_TEXT = Texte principal affiché ("Portfolio")
 * HERO_SUBTITLE = Sous-titre (votre nom)
 * 
 * CELLS_PER_CLICK = Nombre de fractures créées par clic
 * - Augmentez pour plus de fractures par clic
 * 
 * DESTRUCTION_THRESHOLD = Nombre de cellules avant fin de l'intro
 * - Réduisez pour une intro plus courte (ex: 50)
 * - Augmentez pour une intro plus longue (ex: 150)
 * 
 * FADE_DURATION = Durée du fondu en secondes
 * SHATTER_DURATION = Durée de l'effet d'éclatement
 * 
 * MODIFICATION FACILE :
 * - Changez DESTRUCTION_THRESHOLD pour contrôler la durée de l'intro
 * - Modifiez CELLS_PER_CLICK pour rendre l'intro plus rapide/lente
 */
export const INTRO = {
  LOGO: {
    DARK: "assets/images/Logo/logomodedark.svg",
    LIGHT: "assets/images/Logo/logomodelight.svg",
    WIDTH: 180, HEIGHT: 180, MARGIN_BOTTOM: 30,
    RESPONSIVE: {
      MOBILE: { WIDTH: 100, HEIGHT: 100, MARGIN_BOTTOM: 20 },
      TABLET: { WIDTH: 140, HEIGHT: 140, MARGIN_BOTTOM: 25 },
      DESKTOP: { WIDTH: 180, HEIGHT: 180, MARGIN_BOTTOM: 30 }
    }
  },
  HERO_TEXT: "Portfolio",
  HERO_SUBTITLE: "Bilel (Kharbouche) El Ouaer",
  CELLS_PER_CLICK: 8,
  CELL_SPREAD: 150,
  FRACTURE_DETECTION_RADIUS: 120,
  DESTRUCTION_THRESHOLD: 100,
  DECAY_RATE: 2.0,
  DECAY_DELAY: 1.5,
  FADE_DURATION: 1.5,
  SHATTER_DURATION: 1.2,
  STORAGE_KEY: 'portfolio_intro_completed',
  RESPONSIVE: {
    MOBILE: { HERO_FONT_SIZE: 28, SUBTITLE_FONT_SIZE: 14, CELL_SPREAD: 60, FRACTURE_DETECTION_RADIUS: 60, CELLS_PER_CLICK: 6 },
    MOBILE_LANDSCAPE: { HERO_FONT_SIZE: 32, SUBTITLE_FONT_SIZE: 16, CELL_SPREAD: 70, FRACTURE_DETECTION_RADIUS: 70, CELLS_PER_CLICK: 7 },
    TABLET: { HERO_FONT_SIZE: 42, SUBTITLE_FONT_SIZE: 20, CELL_SPREAD: 100, FRACTURE_DETECTION_RADIUS: 90, CELLS_PER_CLICK: 8 },
    TABLET_LANDSCAPE: { HERO_FONT_SIZE: 48, SUBTITLE_FONT_SIZE: 22, CELL_SPREAD: 120, FRACTURE_DETECTION_RADIUS: 100, CELLS_PER_CLICK: 8 },
    DESKTOP: { HERO_FONT_SIZE: 60, SUBTITLE_FONT_SIZE: 26, CELL_SPREAD: 150, FRACTURE_DETECTION_RADIUS: 120, CELLS_PER_CLICK: 8 },
    DESKTOP_LARGE: { HERO_FONT_SIZE: 72, SUBTITLE_FONT_SIZE: 30, CELL_SPREAD: 180, FRACTURE_DETECTION_RADIUS: 140, CELLS_PER_CLICK: 10 }
  }
};

// ==========================================
// SCROLL VIRTUEL (Navigation dans les projets)
// ==========================================
/* 
 * POUR DÉBUTANTS : Configuration du défilement virtuel
 * 
 * Le scroll virtuel permet de naviguer entre les projets 3D de manière fluide
 * 
 * SPEED = Vitesse de défilement (0.0006 = lent et fluide)
 * - Augmentez pour défiler plus vite (ex: 0.001)
 * - Réduisez pour défiler plus lentement (ex: 0.0003)
 * 
 * TOUCH_MULTIPLIER = Multiplicateur pour écrans tactiles
 * - Plus élevé = défilement plus rapide au doigt
 * 
 * MIN/MAX = Limites du scroll (0 = début, 1.2 = fin avec section About)
 * 
 * SMOOTHING = Lissage du mouvement (0.06 = très fluide)
 * - Plus petit = plus fluide mais plus lent à réagir
 * - Plus grand = plus réactif mais moins fluide
 * 
 * ABOUT_SECTION_THRESHOLD = Position où la section About apparaît (1.0 = à la fin)
 * 
 * MODIFICATION FACILE :
 * - Changez SPEED pour ajuster la vitesse de navigation
 * - Ajustez SMOOTHING pour modifier la fluidité
 */
export const SCROLL = {
  SPEED: 0.0006,              // Vitesse de base - MODIFIEZ ICI pour changer la vitesse
  TOUCH_MULTIPLIER: 2.5,      // Multiplicateur tactile
  MIN: 0,                     // Début du scroll
  MAX: 1.2,                   // Fin du scroll (inclut section About)
  SMOOTHING: 0.06,            // Lissage - MODIFIEZ ICI pour la fluidité
  SUB_STEPS_PER_SHARD: 5,
  SUB_STEP_THRESHOLDS: { APPROACHING: 0.2, ENTERING: 0.4, CENTERED: 0.6, LEAVING: 0.8, EXITING: 1.0 },
  SECTION_TRANSITION: 0.4,
  ABOUT_SECTION_THRESHOLD: 1.0,
  LOCKED: false,
  RESPONSIVE: {
    MOBILE: { SPEED: 0.0008, TOUCH_MULTIPLIER: 3.0, SMOOTHING: 0.08 },
    TABLET: { SPEED: 0.0007, TOUCH_MULTIPLIER: 2.5, SMOOTHING: 0.07 },
    DESKTOP: { SPEED: 0.0006, TOUCH_MULTIPLIER: 2.0, SMOOTHING: 0.06 }
  }
};

// ==========================================
// CAMÉRA (Point de vue 3D)
// ==========================================
/* 
 * POUR DÉBUTANTS : Configuration de la caméra 3D
 * 
 * La caméra détermine ce que vous voyez et comment vous le voyez
 * 
 * INITIAL_Z = Position de départ de la caméra (-100 = reculée)
 * POST_INTRO_START_Z = Position après l'intro
 * 
 * FOV (Field of View) = Angle de vision en degrés
 * - 55° = Vue normale (comme l'œil humain)
 * - Plus petit = Vue téléobjectif (zoom)
 * - Plus grand = Vue grand angle (fish-eye)
 * 
 * DISTANCE_FROM_SHARD = Distance entre caméra et projet actuel
 * - Augmentez pour voir de plus loin (ex: 30)
 * - Réduisez pour voir de plus près (ex: 20)
 * 
 * LOOK_AHEAD = Anticipation du mouvement
 * - La caméra regarde légèrement vers l'avant
 * 
 * SMOOTHING = Fluidité du mouvement de caméra
 * - Plus petit = plus fluide (ex: 0.05)
 * - Plus grand = plus réactif (ex: 0.12)
 * 
 * MODIFICATION FACILE :
 * - Changez FOV pour modifier l'angle de vue
 * - Ajustez DISTANCE_FROM_SHARD pour voir les projets de plus près/loin
 */
export const CAMERA = {
  INITIAL_Z: -150,            // Position initiale
  POST_INTRO_START_Z: -180,   // Position après intro (reculée pour voir mieux la première shard)
  FOV: 55,                    // Angle de vision - MODIFIEZ ICI pour changer la perspective
  NEAR: 0.1,                  // Distance minimale de rendu
  FAR: 3000,                  // Distance maximale de rendu
  SMOOTHING: 0.08,            // Fluidité du mouvement
  DISTANCE_FROM_SHARD: 25,    // Distance du projet - MODIFIEZ ICI pour zoomer/dézoomer
  LOOK_AHEAD: 20,             // Anticipation
  CONTINUOUS_MOVEMENT: { ENABLED: true, EASE_FACTOR: 0.08, ANTICIPATION: 0.3 },
  RESPONSIVE: {
    MOBILE: { FOV: 65, DISTANCE_FROM_SHARD: 18, LOOK_AHEAD: 12, SMOOTHING: 0.1 },
    TABLET: { FOV: 60, DISTANCE_FROM_SHARD: 24, LOOK_AHEAD: 16, SMOOTHING: 0.09 },
    DESKTOP: { FOV: 55, DISTANCE_FROM_SHARD: 22, LOOK_AHEAD: 18, SMOOTHING: 0.08 }
  }
};

// ==========================================
// SHARDS (Projets 3D flottants)
// ==========================================
/* 
 * POUR DÉBUTANTS : Configuration des shards (fragments 3D représentant vos projets)
 * 
 * Les shards sont les objets 3D qui flottent et tournent dans l'espace
 * 
 * BASE_SCALE = Taille de base des shards
 * - Augmentez pour des projets plus grands (ex: 2.5)
 * - Réduisez pour des projets plus petits (ex: 1.8)
 * 
 * Z_SPACING = Distance entre chaque projet en profondeur
 * - Plus grand = projets plus espacés (ex: 80)
 * - Plus petit = projets plus rapprochés (ex: 40)
 * 
 * ORBIT = Mouvement orbital des shards
 * - RADIUS_X/Y = Rayon de l'orbite horizontale/verticale
 * - SPEED = Vitesse de rotation (0.15 = lent)
 * - Augmentez RADIUS pour orbites plus larges
 * 
 * STATES = États visuels des shards
 * - IDLE = Au repos (loin)
 * - CURRENT = Projet actuel (au centre)
 * - HOVER = Survol avec la souris
 * - FOCUS = Projet sélectionné (agrandi)
 * 
 * MODIFICATION FACILE :
 * - Changez BASE_SCALE pour la taille globale
 * - Ajustez Z_SPACING pour l'espacement entre projets
 * - Modifiez ORBIT.RADIUS_X/Y pour l'amplitude du mouvement
 */
export const SHARD = {
  GEOMETRY_DETAIL: 1,         // Détail de la géométrie (1 = normal)
  BASE_SCALE: 2.2,            // Taille de base - MODIFIEZ ICI pour changer la taille
  Z_SPACING: 60,              // Espacement entre projets - MODIFIEZ ICI pour l'espacement
  INFINITE_LOOP: { ENABLED: true, BUFFER_COUNT: 3, WRAP_DISTANCE: 600 },
  ORBIT: {
    RADIUS_X: 12,
    RADIUS_Y: 8.5,
    SPEED: 0.15,
    VARIATION: 0.6,
    DISTANCE_MULTIPLIER: 12,
    SMOOTHING: 0.03,
    SPIRAL: {
      ENABLED: true,
      BASE_MULTIPLIER: 0.3,
      MAX_MULTIPLIER: 3.5,
      INDEX_FACTOR: 0.25,
      CAMERA_DISTANCE_FACTOR: 0.015,
      Z_CONVERGENCE: 0.85
    }
  },
  DISTANCE_SCALING: {
    ENABLED: true,
    MIN_SCALE: 0.85,
    MAX_SCALE: 1.8,
    DISTANCE_THRESHOLD: 100,
    SCALE_FACTOR: 0.008
  },
  ROTATION: {
    SPEED_X: 0.001,
    SPEED_Y: 0.0015,
    SPEED_Z: 0.0005,
    MULTIPLIER_CURRENT: 0.3,
    MULTIPLIER_IDLE: 0.6,
    MULTIPLIER_FOCUS: 0.1
  },
  STATES: {
    IDLE: { scale: 0.85, opacity: 1, emissive: 0.05, blur: 0.2 },
    APPROACHING: { scale: 1.1, opacity: 1, emissive: 0.12, blur: 0.05 },
    CURRENT: { scale: 1.5, opacity: 1, emissive: 0.22, blur: 0 },
    LEAVING: { scale: 1.1, opacity: 1, emissive: 0.12, blur: 0.05 },
    HOVER: { scale: 1.15, scaleIncrease: 0.25, opacity: 1, emissive: 0.22, flattenAmount: 0.35, morphStrength: 0.35, blur: 0 },
    FOCUS: { scale: 2.0, opacity: 1, emissive: 0, flattenAmount: 0.99, zOffset: 4, blur: 0 }
  },
  ALWAYS_VISIBLE: true,
  VISIBILITY_RANGE: 5500,
  RESPONSIVE: {
    MOBILE: { BASE_SCALE: 1.6, Z_SPACING: 45, ORBIT: { RADIUS_X: 8, RADIUS_Y: 6 } },
    TABLET: { BASE_SCALE: 1.9, Z_SPACING: 52, ORBIT: { RADIUS_X: 10, RADIUS_Y: 7 } },
    DESKTOP: { BASE_SCALE: 2.2, Z_SPACING: 60, ORBIT: { RADIUS_X: 12, RADIUS_Y: 8.5 } }
  }
};

// ==========================================
// PHYSIQUE - Retour fluide sans glitch
// ==========================================
export const PHYSICS = {
  FRICTION: 0.94,
  MAX_VELOCITY: 1.5,
  ORBITAL: {
    ATTRACTION_BASE: 0.006,
    ATTRACTION_SCALE: 1.2,
    SNAP_DISTANCE: 0.15,
    SNAP_VELOCITY_FACTOR: 0.3
  },
  REPULSION: { STRENGTH: 0.4, DISTANCE: 8 },
  BOUNCE: { DAMPING: 0.5, MARGIN: 15 },
  RETURN: { STRENGTH: 0.02, SNAP_THRESHOLD: 0.1 }
};

// ==========================================
// DRAG & DROP - Comportement fluide
// ==========================================
export const DRAG = {
  SENSITIVITY: 0.012,
  THROW_MULTIPLIER: 0.08,
  RETURN_DELAY: 800,
  CLICK_THRESHOLD: 180,
  DEFORM: { ENABLED: true, STRENGTH: 0.45, COMBINES_WITH_HOVER: true },
  FOCUS: {
    ROTATION_SPEED: 0.004,
    THRESHOLD_CHANGE_FACETTE: 100,
    SMOOTH_ROTATION: 0.1,
    SNAP_TO_180: true,
    SNAP_THRESHOLD: 0.3,
    MAX_ROTATION_ANGLE: Math.PI / 6,
    AUTO_CHANGE_THRESHOLD: 0.9
  }
};

// ==========================================
// FACETTES
// ==========================================
export const FACETTE = {
  COUNT: 3,
  ROTATION_ANGLE: (2 * Math.PI) / 3,
  DEFRAG_DURATION: 0.4,
  ROTATION_DURATION: 0.6,
  REFRAG_DURATION: 0.4,
  DEFRAG_INTENSITY: 4.0,
  TEXT_FADE_DURATION: 0.25,
  TEXT_FADE_DELAY: 0.08,
  SCALE_DEPTH: 0.05
};

// ==========================================
// FOCUS - Transitions obligatoires
// ==========================================
export const FOCUS = {
  Z_OFFSET: 12,
  CAMERA_DISTANCE: 18,
  SCALE: 1.8,
  RESPONSIVE: true,
  MOBILE_CAMERA_BOOST: 0.75,
  EMISSIVE: 0.3,
  DEFRAG_INTENSITY: 3.5,
  DEFRAG_DURATION: 0.4,
  ROTATION_DURATION: 0.5,
  REFRAG_DURATION: 0.4,
  POSITION_DURATION: 0.5,
  SCALE_DEPTH: 0.05,
  UNFOCUS_DURATION: 0.6,
  UNFOCUS_BLOCKING: true,
  AUTO_FOCUS_ENABLED: true,
  AUTO_FOCUS_DELAY: 0.5,
  AUTO_FOCUS_SUB_STEP: 0.5,
  AUTO_UNFOCUS_ON_SCROLL: true,
  QUICK_FOCUS: { ENABLED: true, SCROLL_SPEED: 0.15, BLUR_AMOUNT: 0.8, TRANSITION_DURATION: 0.5 },
  POSITION_CORRECTION: { ENABLED: true, SMOOTHING: 0.12, THRESHOLD: 0.3 },
  EASE_IN: 'power2.out',
  EASE_OUT: 'power2.inOut'
};

// ==========================================
// NAVIGATION CENTRALISÉE
// ==========================================
export const NAVIGATION = {
  SCROLL_TO_SECTION: {
    DURATION: 0.8,
    EASE: 'power2.inOut',
    BLUR_DURING: true,
    BLUR_AMOUNT: 4
  },
  SECTION_DOT_CLICK: {
    UNFOCUS_FIRST: true,
    FOCUS_AFTER: true,
    DELAY_BEFORE_FOCUS: 100
  },
  UNFOCUS_REQUIRED: true,
  UNFOCUS_TIMEOUT: 1000
};

// ==========================================
// ANIMATIONS
// ==========================================
export const ANIMATION = {
  EASE: { IN: 'power2.in', OUT: 'power2.out', IN_OUT: 'power2.inOut', ELASTIC: 'elastic.out(1, 0.5)' },
  DURATION: { INSTANT: 0.1, FAST: 0.25, NORMAL: 0.5, SLOW: 0.8, VERY_SLOW: 1.2 },
  TRANSITION: { DURATION: 0.8, EASE: 'power2.inOut', SCALE_DURATION: 0.6, OPACITY_DURATION: 0.4 },
  MORPH: { STRENGTH: 0.025, FREQUENCY: 0.4, DRAG_STRETCH: 4.5, MAX_AMOUNT: 2.0 },
  HOVER: { FRAGMENT_STRENGTH: 0.008, FRAGMENT_FREQUENCY: 0.4, CONTINUOUS: false }
};

// ==========================================
// COULEURS (Palette de couleurs du projet)
// ==========================================
/* 
 * POUR DÉBUTANTS : Couleurs principales utilisées dans le JavaScript
 * 
 * Ces couleurs doivent correspondre à celles définies dans variables.css
 * 
 * Format HEX = #RRGGBB (Rouge, Vert, Bleu en hexadécimal)
 * Format RGB = 'R, G, B' (Rouge, Vert, Bleu en décimal)
 * 
 * LIGHT = Couleur beige clair (mode clair)
 * DARK = Couleur gris foncé (mode sombre)
 * ACCENT = Couleur d'accentuation (bleu)
 * 
 * MODIFICATION FACILE :
 * - Changez ces valeurs pour modifier les couleurs du site
 * - Utilisez un color picker : https://htmlcolorcodes.com/
 * - IMPORTANT : Changez aussi les couleurs dans variables.css pour la cohérence
 * 
 * EXEMPLE :
 * Pour un thème vert :
 * - LIGHT_HEX: '#E8F5E9' (vert clair)
 * - DARK_HEX: '#1B5E20' (vert foncé)
 * - ACCENT: '#4CAF50' (vert vif)
 */
export const COLORS = {
  LIGHT_HEX: '#F2DDB8',       // Beige clair - MODIFIEZ pour changer la couleur claire
  LIGHT_RGB: '242, 221, 184', // Même couleur en format RGB
  DARK_HEX: '#393F4A',        // Gris foncé - MODIFIEZ pour changer la couleur sombre
  DARK_RGB: '57, 63, 74',     // Même couleur en format RGB
  TITLE_TEXT: '#2d2d2d',      // Gris très foncé pour titres
  ACCENT: '#4a90d9'           // Bleu d'accent - MODIFIEZ pour changer la couleur d'accent
};

// ==========================================
// DEVICE RESPONSIVE (Adaptation aux écrans)
// ==========================================
/* 
 * POUR DÉBUTANTS : Points de rupture pour le design responsive
 * 
 * Les breakpoints définissent à quelles largeurs d'écran le design change
 * 
 * BREAKPOINTS = Largeurs en pixels où le design s'adapte
 * - MOBILE_SMALL (375px) = Petits téléphones (iPhone SE)
 * - MOBILE (576px) = Téléphones standards
 * - TABLET (768px) = Tablettes portrait (iPad)
 * - TABLET_LANDSCAPE (992px) = Tablettes paysage
 * - DESKTOP (1200px) = Ordinateurs
 * - DESKTOP_LARGE (1440px) = Grands écrans
 * - DESKTOP_XL (1920px) = Écrans Full HD et plus
 * 
 * Le système détecte automatiquement la taille d'écran et ajuste :
 * - Taille des shards
 * - Distance de la caméra
 * - Vitesse de scroll
 * - Taille des textes
 * - Espacement des éléments
 * 
 * MODIFICATION FACILE :
 * - Ces valeurs sont standards, ne les changez que si nécessaire
 * - Testez sur différents appareils après modification
 */
export const DEVICE = {
  BREAKPOINTS: {
    MOBILE_SMALL: 375,      // Petits téléphones
    MOBILE: 576,            // Téléphones standards
    TABLET: 768,            // Tablettes portrait
    TABLET_LANDSCAPE: 992,  // Tablettes paysage
    DESKTOP: 1200,          // Ordinateurs
    DESKTOP_LARGE: 1440,    // Grands écrans
    DESKTOP_XL: 1920        // Écrans Full HD+
  },
  ASPECT_RATIOS: { PORTRAIT: 0.75, SQUARE: 1.0, LANDSCAPE: 1.33, WIDE: 1.78, ULTRAWIDE: 2.35 },
  FOCUS: {
    MOBILE: { SCALE: 1.2, CAMERA_DISTANCE: 22, Z_OFFSET: 6 },
    MOBILE_LANDSCAPE: { SCALE: 1.3, CAMERA_DISTANCE: 25, Z_OFFSET: 7 },
    TABLET: { SCALE: 1.4, CAMERA_DISTANCE: 28, Z_OFFSET: 9 },
    TABLET_LANDSCAPE: { SCALE: 1.5, CAMERA_DISTANCE: 30, Z_OFFSET: 10 },
    DESKTOP: { SCALE: 1.8, CAMERA_DISTANCE: 30, Z_OFFSET: 12 },
    DESKTOP_LARGE: { SCALE: 2.0, CAMERA_DISTANCE: 28, Z_OFFSET: 14 }
  },
  SHARD_TITLE: {
    MOBILE: { BASE_SCALE: 5, FONT_SIZE: 80 },
    TABLET: { BASE_SCALE: 7, FONT_SIZE: 100 },
    DESKTOP: { BASE_SCALE: 10, FONT_SIZE: 140 }
  },
  UI_SCALE: { MOBILE: 0.8, TABLET: 0.9, DESKTOP: 1.0, DESKTOP_LARGE: 1.1 }
};

// ==========================================
// TITRES DE SHARD (DEPRECATED - use SHARD_LOGO)
// ==========================================
export const TITLE = {
  CANVAS_WIDTH: 512,
  CANVAS_HEIGHT: 128,
  FONT_SIZE: 120,
  FONT_FAMILY: TYPOGRAPHY.PRIMARY_FONT,
  SHADOW_BLUR: 15,
  OFFSET_Y: 0,
  OFFSET_Z: 5,
  BASE_SCALE: 4,
  MIN_SCALE: 2,
  MAX_SCALE: 6,
  DISTANCE_SCALE_FACTOR: 0.02,
  OPACITY_IDLE: 0.9,
  OPACITY_CURRENT: 0,
  OPACITY_FOCUS: 0
};

// ==========================================
// LOGO SHARD - Logos intégrés sur géométrie V6.0
// ==========================================
export const SHARD_LOGO = {
  // Logos par défaut (utilisés si pas de config personnalisée dans shardLogosConfig.js)
  DARK: "assets/images/Logo/logomodedark.svg",
  LIGHT: "assets/images/Logo/logomodelight.svg",
  
  // Taille de base des logos (sprites attachés à la shard)
  BASE_SCALE: 1.8,
  
  // Opacité
  OPACITY_IDLE: 1.0,
  OPACITY_CURRENT: 0,
  OPACITY_FOCUSED: 0,
  OPACITY_HIDDEN: 0,
  FADE_SPEED: 0.12,
  
  // Canvas texture size (résolution du logo)
  CANVAS_SIZE: 512,
  
  // Configuration responsive
  RESPONSIVE: {
    MOBILE: { BASE_SCALE: 1.2 },
    TABLET: { BASE_SCALE: 1.5 },
    DESKTOP: { BASE_SCALE: 1.8 }
  }
};

// ==========================================
// THÈME
// ==========================================
export const THEME = {
  LIGHT: {
    background: 0xF2DDB8,
    ambient: 0xffffff,
    directional: 0xffffff,
    shardColor: 0x393F4A,
    emissiveColor: 0x393F4A,
    fogNear: 80,
    fogFar: 350
  },
  DARK: {
    background: 0x393F4A,
    ambient: 0x909090,
    directional: 0xffffff,
    shardColor: 0xF2DDB8,
    emissiveColor: 0xF2DDB8,
    fogNear: 80,
    fogFar: 350
  }
};

// ==========================================
// CATÉGORIES
// ==========================================
export const CATEGORIES = {
  dev: { label: 'Développement', color: 0x5ce1e6, emoji: '💻' },
  realisation: { label: 'Réalisation', color: 0xe74c3c, emoji: '🎬' },
  video: { label: 'Vidéo', color: 0x9b59b6, emoji: '🎥' },
  graphisme: { label: 'Graphisme', color: 0xf39c12, emoji: '🎨' },
  presentation: { label: 'Présentation', color: 0x27ae60, emoji: '👤' },
  skills: { label: 'Compétences', color: 0x3498db, emoji: '🎯' },
  contact: { label: 'Contact', color: 0xe91e63, emoji: '✉️' }
};

// ==========================================
// UI (Interface utilisateur)
// ==========================================
/* 
 * POUR DÉBUTANTS : Configuration de l'interface utilisateur
 * 
 * INFO_OVERLAY = Panneau d'information qui s'affiche quand on clique sur un projet
 * - FADE_DURATION = Durée de l'animation d'apparition (0.35s)
 * - MAX_WIDTH = Largeur maximale du panneau en pixels
 * 
 * SECTIONS = Sections About et Contact
 * - FADE_IN_DURATION = Durée d'apparition
 * - FADE_OUT_DURATION = Durée de disparition
 * - SCROLL_THRESHOLD = Position où elles apparaissent (1.0 = à la fin)
 * 
 * INDICATORS = Points de navigation sur le côté
 * - DOT_SIZE = Taille des points en pixels
 * - DOT_GAP = Espace entre les points
 * - ACTIVE_SCALE = Agrandissement du point actif (1.4 = 40% plus grand)
 * 
 * MODIFICATION FACILE :
 * - Changez MAX_WIDTH pour un panneau plus large/étroit
 * - Ajustez DOT_SIZE pour des indicateurs plus visibles
 * - Modifiez FADE_DURATION pour des animations plus rapides/lentes
 */
export const UI = {
  INFO_OVERLAY: {
    FADE_DURATION: 0.35,    // Durée d'animation du panneau
    MAX_WIDTH: 550,         // Largeur max du panneau - MODIFIEZ ICI
    RESPONSIVE: {
      MOBILE: { MAX_WIDTH: '90vw', PADDING: 20 },
      TABLET: { MAX_WIDTH: 450, PADDING: 25 },
      DESKTOP: { MAX_WIDTH: 550, PADDING: 30 }
    }
  },
  SECTIONS: { FADE_IN_DURATION: 0.7, FADE_OUT_DURATION: 0.35, SCROLL_THRESHOLD: 1.0 },
  INDICATORS: {
    DOT_SIZE: 12,
    DOT_GAP: 10,
    ACTIVE_SCALE: 1.4,
    RESPONSIVE: {
      MOBILE: { DOT_SIZE: 8, DOT_GAP: 6, ACTIVE_SCALE: 1.3 },
      TABLET: { DOT_SIZE: 10, DOT_GAP: 8, ACTIVE_SCALE: 1.35 },
      DESKTOP: { DOT_SIZE: 12, DOT_GAP: 10, ACTIVE_SCALE: 1.4 }
    }
  }
};

// ==========================================
// LAYERS
// ==========================================
export const LAYERS = {
  CANVAS_2D: { Z_INDEX: 100, INITIAL_OPACITY: 1 },
  THREE_JS: { Z_INDEX: 50, INITIAL_OPACITY: 1 },
  UI: { Z_INDEX: 200 }
};

// ==========================================
// UTILITAIRES
// ==========================================
export const ResponsiveUtils = {
  getDeviceType(width, height) {
    const isLandscape = width > height;
    if (width < DEVICE.BREAKPOINTS.MOBILE) return isLandscape ? 'MOBILE_LANDSCAPE' : 'MOBILE';
    if (width < DEVICE.BREAKPOINTS.TABLET) return isLandscape ? 'TABLET_LANDSCAPE' : 'TABLET';
    if (width < DEVICE.BREAKPOINTS.DESKTOP) return isLandscape ? 'TABLET_LANDSCAPE' : 'TABLET';
    if (width < DEVICE.BREAKPOINTS.DESKTOP_LARGE) return 'DESKTOP';
    return 'DESKTOP_LARGE';
  },
  getResponsiveValue(config, deviceType, fallback = null) {
    if (config.RESPONSIVE && config.RESPONSIVE[deviceType]) return config.RESPONSIVE[deviceType];
    return fallback || config;
  },
  getScaledFontSize(baseFontSize, deviceType) {
    const scale = DEVICE.UI_SCALE[deviceType] || 1;
    return Math.round(baseFontSize * scale);
  },
  clamp: (value, min, max) => Math.min(Math.max(value, min), max),
  lerp: (start, end, factor) => start + (end - start) * factor,
  smoothStep: (start, end, factor) => {
    const t = ResponsiveUtils.clamp((factor - start) / (end - start), 0, 1);
    return t * t * (3 - 2 * t);
  }
};
