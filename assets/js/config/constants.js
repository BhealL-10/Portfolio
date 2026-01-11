/**
 * Constants.js - Configuration centralisée
 * Portfolio 3D V2.0 - Scroll Virtuel
 */

// ==========================================
// CONFIGURATION DE L'INTRO (Canvas 2D)
// ==========================================
export const INTRO = {
  // Hero text
  HERO_TEXT: "Bienvenue dans mon univers",
  HERO_SUBTITLE: "Cliquez pour entrer",
  
  // Voronoi cells (effet bris de miroir)
  INITIAL_CELLS: 10, // Cellules initiales par clic
  CELL_SPREAD: 120, // Rayon de dispersion
  CELL_GROWTH_RATE: 1.8, // Vitesse de croissance par seconde
  CELL_MAX_SIZE: 3, // Taille max d'une cellule
  CELL_SPLIT_THRESHOLD: 1.0, // Taille pour se diviser
  
  // Destruction
  DESTRUCTION_THRESHOLD: 50, // 10 clics pour détruire
  GROWTH_PER_CLICK: 1, // Growth ajouté par clic
  DECAY_RATE: 0.3, // Vitesse de réduction par seconde
  DECAY_DELAY: 0.8, // Délai avant decay (secondes)
  
  // LocalStorage key
  STORAGE_KEY: 'portfolio_intro_completed'
};

// ==========================================
// CONFIGURATION DU SCROLL VIRTUEL
// ==========================================
export const SCROLL = {
  // Vitesse de scroll (sensibilité molette/touch)
  SPEED: 0.0008,
  TOUCH_MULTIPLIER: 2,
  
  // Limites du scroll virtuel (0 = début, 1 = fin)
  MIN: 0,
  MAX: 1,
  
  // Lissage (plus petit = plus fluide, plus lent)
  SMOOTHING: 0.02,
  
  // Sections par shard (découpage de la timeline)
  SECTION_SIZE: null, // Calculé dynamiquement selon nombre de shards
  
  // Durée de transition entre sections (secondes)
  SECTION_TRANSITION: 0.3,
  
  // Blocage pendant intro
  LOCKED: false
};

// ==========================================
// CONFIGURATION DE LA CAMÉRA
// ==========================================
export const CAMERA = {
  // Position initiale (navigation normale)
  INITIAL_Z: 30,
  
  // Position de départ post-intro (très loin)
  POST_INTRO_START_Z: 150,
  
  // Distance de déplacement sur l'axe Z (début → fin)
  Z_TRAVEL: 150,
  
  // FOV
  FOV: 60,
  NEAR: 0.1,
  FAR: 1000,
  
  // Lissage de la caméra (plus bas = plus lent et fluide)
  SMOOTHING: 0.05,
  
  // LookAt offset
  LOOK_AHEAD: 10
};

// ==========================================
// CONFIGURATION DES SHARDS
// ==========================================
export const SHARD = {
  // Géométrie
  GEOMETRY_DETAIL: 5,
  BASE_SCALE: 1.5,
  
  // Espacement entre shards sur Z
  Z_SPACING: 25,
  
  // Orbite (mouvement orbital autour de la position centrale)
  ORBIT: {
    BASE_RADIUS_X: 3,
    BASE_RADIUS_Y: 2,
    GROWTH_PER_INDEX: 12.5,  // L'orbite grandit avec la distance
    SPEED: 0.15
  },
  
  // Rotation automatique
  ROTATION: {
    SPEED_X: 0.002,
    SPEED_Y: 0.003,
    SPEED_Z: 0.001
  },
  
  // États visuels
  STATES: {
    IDLE: {
      scale: 1,
      opacity: 1,
      emissive: 0.05
    },
    CURRENT: {
      scale: 1.3,
      opacity: 1,
      emissive: 0.15
    },
    HOVER: {
      scale: 1.2,
      opacity: 1,
      emissive: 0.25
    },
    FOCUS: {
      scale: 2.0,
      opacity: 1,
      emissive: 0.4,
      flattenAmount: 0.95
    },
    DISTANT: {
      scale: 0.8,
      opacity: 0.7,
      emissive: 0.02
    }
  }
};

// ==========================================
// CONFIGURATION DES FACETTES
// ==========================================
export const FACETTE = {
  // Nombre de facettes par shard
  COUNT: 3,
  
  // Angle de rotation pour changer de facette (radians)
  ROTATION_ANGLE: (2 * Math.PI) / 3,  // 120°
  
  // Durée de transition entre facettes
  TRANSITION_DURATION: 0.6,
  
  // Easing de la transition
  TRANSITION_EASE: 'power2.inOut'
};

// ==========================================
// CONFIGURATION DU FOCUS
// ==========================================
export const FOCUS = {
  // Distance devant la caméra
  DISTANCE: 8,
  
  // Durées d'animation
  FOCUS_DURATION: 0.8,
  UNFOCUS_DURATION: 0.6,
  INFO_FADE_DURATION: 0.4,
  
  // Release (éloignement lors de l'unfocus)
  RELEASE_DISTANCE: 15,
  RELEASE_DURATION: 1.0,
  
  // Scroll threshold pour unfocus automatique
  SCROLL_THRESHOLD: 0.05
};

// ==========================================
// CONFIGURATION DE LA PHYSIQUE
// ==========================================
export const PHYSICS = {
  // Friction (décélération)
  FRICTION: 0.95,
  
  // Vélocité max
  MAX_VELOCITY: 2,
  
  // Force de répulsion entre shards
  REPULSION: {
    STRENGTH: 0.5,
    DISTANCE: 5
  },
  
  // Rebond sur les bords
  BOUNCE: {
    DAMPING: 0.7,
    MARGIN: 10
  },
  
  // Retour à la position canonique
  RETURN: {
    STRENGTH: 0.02,
    SNAP_THRESHOLD: 0.1
  }
};

// ==========================================
// CONFIGURATION DU DRAG & DROP
// ==========================================
export const DRAG = {
  // Sensibilité
  SENSITIVITY: 0.01,
  
  // Vélocité au lâcher
  THROW_MULTIPLIER: 0.1,
  
  // Délai avant retour (ms)
  RETURN_DELAY: 2000
};

// ==========================================
// CONFIGURATION DES ANIMATIONS
// ==========================================
export const ANIMATION = {
  // Durées par défaut
  DURATION: {
    FAST: 0.3,
    NORMAL: 0.6,
    SLOW: 1.0
  },
  
  // Easings
  EASE: {
    IN: 'power2.in',
    OUT: 'power2.out',
    IN_OUT: 'power3.inOut',
    ELASTIC: 'elastic.out(1, 0.5)',
    BOUNCE: 'bounce.out'
  }
};

// ==========================================
// COULEURS (pour CSS et Three.js)
// ==========================================
export const COLORS = {
  LIGHT_HEX: '#F2DDB8',
  DARK_HEX: '#393F4A'
};

// ==========================================
// CONFIGURATION DU THÈME
// ==========================================
export const THEME = {
  LIGHT: {
    background: 0xF2DDB8,      // Beige clair
    ambient: 0xffffff,
    directional: 0xffffff,
    shardColor: 0x393F4A,      // Gris foncé
    emissiveColor: 0x393F4A
  },
  DARK: {
    background: 0x393F4A,      // Gris foncé
    ambient: 0x808080,
    directional: 0xffffff,
    shardColor: 0xF2DDB8,      // Beige clair
    emissiveColor: 0xF2DDB8
  }
};

// ==========================================
// CATÉGORIES DE PROJETS
// ==========================================
export const CATEGORIES = {
  dev: { label: 'Développement', color: 0x5ce1e6 },
  realisation: { label: 'Réalisation', color: 0xe74c3c },
  video: { label: 'Vidéo', color: 0x9b59b6 },
  graphisme: { label: 'Graphisme', color: 0xf39c12 }
};
