/**
 * Constants.js - Configuration centralisée
 * Portfolio 3D V4.0 - Système Focus Optimisé
 */

// ==========================================
// CONFIGURATION DE L'INTRO (Canvas 2D)
// ==========================================
export const INTRO = {
  LOGO: {
    DARK: "assets/images/Logo/logomodedark.svg",
    LIGHT: "assets/images/Logo/logomodelight.svg",
    WIDTH: 180,
    HEIGHT: 180,
    MARGIN_BOTTOM: 30
  },
  
  HERO_TEXT: "Portfolio",
  HERO_SUBTITLE: "Bilel (El Ouaer) Kharbouche",
  
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
    MOBILE: {
      HERO_FONT_SIZE: 28,
      SUBTITLE_FONT_SIZE: 14,
      CELL_SPREAD: 80,
      FRACTURE_DETECTION_RADIUS: 80
    },
    TABLET: {
      HERO_FONT_SIZE: 40,
      SUBTITLE_FONT_SIZE: 18,
      CELL_SPREAD: 120,
      FRACTURE_DETECTION_RADIUS: 100
    },
    DESKTOP: {
      HERO_FONT_SIZE: 52,
      SUBTITLE_FONT_SIZE: 22,
      CELL_SPREAD: 150,
      FRACTURE_DETECTION_RADIUS: 120
    }
  }
};

// ==========================================
// CONFIGURATION DU SCROLL VIRTUEL
// ==========================================
export const SCROLL = {
  SPEED: 0.0006,
  TOUCH_MULTIPLIER: 2.5,
  MIN: 0,
  MAX: 1.2,
  SMOOTHING: 0.04,
  SUB_STEPS_PER_SHARD: 5,
  
  SUB_STEP_THRESHOLDS: {
    APPROACHING: 0.2,
    ENTERING: 0.4,
    CENTERED: 0.6,
    LEAVING: 0.8,
    EXITING: 1.0
  },
  
  SECTION_TRANSITION: 0.4,
  ABOUT_SECTION_THRESHOLD: 1.0,
  LOCKED: false
};

// ==========================================
// CONFIGURATION DE LA CAMÉRA
// ==========================================
export const CAMERA = {
  INITIAL_Z: -100,
  POST_INTRO_START_Z: -150,
  FOV: 55,
  NEAR: 0.1,
  FAR: 3000,
  SMOOTHING: 0.05,
  DISTANCE_FROM_SHARD: 25,
  LOOK_AHEAD: 20,
  
  CONTINUOUS_MOVEMENT: {
    ENABLED: true,
    EASE_FACTOR: 0.06,
    ANTICIPATION: 0.3
  }
};

// ==========================================
// CONFIGURATION DES SHARDS
// ==========================================
export const SHARD = {
  GEOMETRY_DETAIL: 1,
  BASE_SCALE: 2.2,
  Z_SPACING: 60,
  
  INFINITE_LOOP: {
    ENABLED: true,
    BUFFER_COUNT: 3,
    WRAP_DISTANCE: 600
  },
  
  ORBIT: {
    RADIUS_X: 12,
    RADIUS_Y: 8.5,
    SPEED: 0.25,
    VARIATION: 0.3,
    DISTANCE_MULTIPLIER: 15.5
  },
  
  ROTATION: {
    SPEED_X: 0.0015,
    SPEED_Y: 0.002,
    SPEED_Z: 0.0008,
    MULTIPLIER_CURRENT: 0.4,
    MULTIPLIER_IDLE: 0.8,
    MULTIPLIER_FOCUS: 0.15
  },
  
  STATES: {
    IDLE: {
      scale: 0.85,
      opacity: 1,
      emissive: 0.05,
      blur: 0.2
    },
    APPROACHING: {
      scale: 1.1,
      opacity: 1,
      emissive: 0.12,
      blur: 0.05
    },
    CURRENT: {
      scale: 1.5,
      opacity: 1,
      emissive: 0.22,
      blur: 0
    },
    LEAVING: {
      scale: 1.1,
      opacity: 1,
      emissive: 0.12,
      blur: 0.05
    },
    HOVER: {
      scale: 1.15,
      scaleIncrease: 0.25,
      opacity: 1,
      emissive: 0.22,
      flattenAmount: 0.35,
      morphStrength: 0.35,
      blur: 0
    },
    FOCUS: {
      scale: 2.0,
      opacity: 1,
      emissive: 0,
      flattenAmount: 0.99,
      zOffset: 4,
      blur: 0
    }
  },
  
  ALWAYS_VISIBLE: true,
  VISIBILITY_RANGE: 5500
};

// ==========================================
// CONFIGURATION DES FACETTES
// ==========================================
export const FACETTE = {
  COUNT: 3,
  ROTATION_ANGLE: (2 * Math.PI) / 3,
  
  DEFRAG_DURATION: 0.5,
  ROTATION_DURATION: 0.7,
  REFRAG_DURATION: 0.5,
  DEFRAG_INTENSITY: 4.5,
  
  TEXT_FADE_DURATION: 0.3,
  TEXT_FADE_DELAY: 0.1,
  
  SCALE_DEPTH: 0.05
};

// ==========================================
// CONFIGURATION DU FOCUS OPTIMISÉ
// ==========================================
export const FOCUS = {
  Z_OFFSET: 12,
  CAMERA_DISTANCE: 30,
  SCALE: 1.8,
  
  RESPONSIVE: true,
  EMISSIVE: 0.3,
  DEFRAG_INTENSITY: 4.0,
  DEFRAG_DURATION: 0.5,
  ROTATION_DURATION: 0.6,
  REFRAG_DURATION: 0.5,
  POSITION_DURATION: 0.6,
  SCALE_DEPTH: 0.05,
  
  UNFOCUS_DURATION: 0.7,
  
  AUTO_FOCUS_ENABLED: true,
  AUTO_FOCUS_DELAY: 0.5,
  AUTO_FOCUS_SUB_STEP: 0.5,
  AUTO_UNFOCUS_ON_SCROLL: true,
  
  QUICK_FOCUS: {
    ENABLED: true,
    SCROLL_SPEED: 0.15,
    BLUR_AMOUNT: 0.8,
    TRANSITION_DURATION: 0.6
  },
  
  POSITION_CORRECTION: {
    ENABLED: true,
    SMOOTHING: 0.1,
    THRESHOLD: 0.5
  },
  
  EASE_IN: 'power2.out',
  EASE_OUT: 'power2.inOut'
};

// ==========================================
// CONFIGURATION DES ANIMATIONS
// ==========================================
export const ANIMATION = {
  EASE: {
    IN: 'power2.in',
    OUT: 'power2.out',
    IN_OUT: 'power2.inOut',
    ELASTIC: 'elastic.out(1, 0.5)'
  },
  
  DURATION: {
    INSTANT: 0.1,
    FAST: 0.3,
    NORMAL: 0.6,
    SLOW: 1.0,
    VERY_SLOW: 1.5
  },
  
  TRANSITION: {
    DURATION: 1.0,
    EASE: 'power2.inOut',
    SCALE_DURATION: 0.7,
    OPACITY_DURATION: 0.5
  },
  
  MORPH: {
    STRENGTH: 0.03,
    FREQUENCY: 0.5,
    DRAG_STRETCH: 5.4,
    MAX_AMOUNT: 2.5
  },
  
  HOVER: {
    FRAGMENT_STRENGTH: 0.01,
    FRAGMENT_FREQUENCY: 0.5,
    CONTINUOUS: false
  }
};

// ==========================================
// CONFIGURATION DE LA PHYSIQUE
// ==========================================
export const PHYSICS = {
  FRICTION: 0.92,
  MAX_VELOCITY: 2.5,
  
  REPULSION: {
    STRENGTH: 0.6,
    DISTANCE: 8
  },
  
  BOUNCE: {
    DAMPING: 0.65,
    MARGIN: 12
  },
  
  RETURN: {
    STRENGTH: 0.015,
    SNAP_THRESHOLD: 0.08
  }
};

// ==========================================
// CONFIGURATION DU DRAG & DROP
// ==========================================
export const DRAG = {
  SENSITIVITY: 0.012,
  THROW_MULTIPLIER: 0.12,
  RETURN_DELAY: 1800,
  
  DEFORM: {
    ENABLED: true,
    STRENGTH: 0.55,
    COMBINES_WITH_HOVER: true
  },
  
  FOCUS: {
    ROTATION_SPEED: 0.005,
    THRESHOLD_CHANGE_FACETTE: 100,
    SMOOTH_ROTATION: 0.08,
    SNAP_TO_180: true,
    SNAP_THRESHOLD: 0.3,
    MAX_ROTATION_ANGLE: Math.PI / 6,
    AUTO_CHANGE_THRESHOLD: 0.95
  }
};

// ==========================================
// COULEURS
// ==========================================
export const COLORS = {
  LIGHT_HEX: '#F2DDB8',
  LIGHT_RGB: '242, 221, 184',
  DARK_HEX: '#393F4A',
  DARK_RGB: '57, 63, 74',
  TITLE_TEXT: '#2d2d2d',
  ACCENT: '#4a90d9'
};

// ==========================================
// CONFIGURATION RESPONSIVE (DEVICE)
// ==========================================
export const DEVICE = {
  BREAKPOINTS: {
    MOBILE: 576,
    TABLET: 992,
    DESKTOP: 1200
  },
  
  FOCUS: {
    MOBILE: {
      SCALE: 1.2,
      CAMERA_DISTANCE: 45,
      Z_OFFSET: 8
    },
    TABLET: {
      SCALE: 1.5,
      CAMERA_DISTANCE: 38,
      Z_OFFSET: 10
    },
    DESKTOP: {
      SCALE: 1.8,
      CAMERA_DISTANCE: 30,
      Z_OFFSET: 12
    }
  },
  
  SHARD_TITLE: {
    MOBILE: {
      BASE_SCALE: 6,
      FONT_SIZE: 100
    },
    TABLET: {
      BASE_SCALE: 8,
      FONT_SIZE: 120
    },
    DESKTOP: {
      BASE_SCALE: 10,
      FONT_SIZE: 140
    }
  }
};

// ==========================================
// CONFIGURATION DES TITRES DE SHARD
// ==========================================
export const TITLE = {
  CANVAS_WIDTH: 512,
  CANVAS_HEIGHT: 128,
  FONT_SIZE: 120,
  FONT_FAMILY: "'Orbitron', 'Arial', sans-serif",
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
// CONFIGURATION DU THÈME
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
// CATÉGORIES DE PROJETS
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
// CONFIGURATION UI
// ==========================================
export const UI = {
  INFO_OVERLAY: {
    FADE_DURATION: 0.4,
    MAX_WIDTH: 550
  },
  
  SECTIONS: {
    FADE_IN_DURATION: 0.8,
    FADE_OUT_DURATION: 0.4,
    SCROLL_THRESHOLD: 1.0
  },
  
  INDICATORS: {
    DOT_SIZE: 12,
    DOT_GAP: 10,
    ACTIVE_SCALE: 1.4
  }
};

// ==========================================
// CANVAS LAYERS
// ==========================================
export const LAYERS = {
  CANVAS_2D: {
    Z_INDEX: 100,
    INITIAL_OPACITY: 1
  },
  THREE_JS: {
    Z_INDEX: 50,
    INITIAL_OPACITY: 1
  },
  UI: {
    Z_INDEX: 200
  }
};
