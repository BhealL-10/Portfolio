/**
 * Constants.js - Configuration centralisée
 * Portfolio 3D V3.0 - Système Immersif Optimisé
 * 
 * - 10 shards en boucle infinie
 * - Scroll virtuel avec sous-étapes
 * - Dual canvas (2D + Three.js)
 * - Animations focus 4 phases améliorées
 */

// ==========================================
// CONFIGURATION DE L'INTRO (Canvas 2D)
// ==========================================
export const INTRO = {
  HERO_TEXT: "Bienvenue dans mon univers",
  HERO_SUBTITLE: "Cliquez pour entrer",
  
  // Fractures et cellules Voronoi
  CELLS_PER_CLICK: 8,
  CELL_SPREAD: 150,
  FRACTURE_DETECTION_RADIUS: 120,
  
  // Destruction
  DESTRUCTION_THRESHOLD: 100,
  DECAY_RATE: 2.0,
  DECAY_DELAY: 1.5,
  
  // Transition
  FADE_DURATION: 1.5,
  SHATTER_DURATION: 1.2,
  
  // LocalStorage
  STORAGE_KEY: 'portfolio_intro_completed'
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
    RADIUS_X: 6,
    RADIUS_Y: 4.5,
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
      opacity: 0.9,
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
      opacity: 0.9,
      emissive: 0.12,
      blur: 0.05
    },
    HOVER: {
      scale: 1.15,
      scaleIncrease: 0.25,
      opacity: 1,
      emissive: 0.22,
      flattenAmount: 0.35,
      morphStrength: 0.15,
      blur: 0
    },
    FOCUS: {
      scale: 2.0,
      opacity: 1,
      emissive: 0.35,
      flattenAmount: 0.92,
      zOffset: 12,
      blur: 0
    }
  },
  
  ALWAYS_VISIBLE: true,
  VISIBILITY_RANGE: 500
};

// ==========================================
// CONFIGURATION DES FACETTES
// ==========================================
export const FACETTE = {
  COUNT: 3,
  ROTATION_ANGLE: (2 * Math.PI) / 3,
  TRANSITION_DURATION: 0.8,
  TRANSITION_EASE: 'power2.inOut',
  
  // Rotation triangulaire
  TRIANGLE_ROTATION: true,
  TRIANGLE_SCALE_DEPTH: 0.15,
  TRIANGLE_ROTATION_AXIS_Y: true,
  
  // Animation pendant focus
  KEEP_FOCUS_STATE: true,
  MORPH_DURING_TRANSITION: true
};

// ==========================================
// CONFIGURATION DU FOCUS (4 PHASES)
// ==========================================
export const FOCUS = {
  Z_OFFSET: 12,
  CAMERA_DISTANCE_BASE: 25,
  CAMERA_DISTANCE_MULTIPLIER: 1.0,
  SCALE: 2.0,
  EMISSIVE: 0.35,
  
  // Durées par phase
  PHASE1_DURATION: 0.5,  // Sphérique → Fragmenté
  PHASE2_DURATION: 0.7,  // Fragmenté → Plat
  PHASE3_DURATION: 1.0,  // Approche caméra
  PHASE4_DURATION: 0.7,  // Transformation matériau
  
  FOCUS_DURATION: 0.9,
  UNFOCUS_DURATION: 0.7,
  
  AUTO_FOCUS_ENABLED: true,
  AUTO_FOCUS_DELAY: 0.5,
  AUTO_FOCUS_SUB_STEP: 0.5,
  AUTO_UNFOCUS_ON_SCROLL: true,
  
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
  
  // Morphing hover
  MORPH: {
    STRENGTH: 0.15,
    FREQUENCY: 2.0,
    DRAG_STRETCH: 0.4
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
    STRENGTH: 0.025,
    SNAP_THRESHOLD: 0.08
  }
};

// ==========================================
// CONFIGURATION DU DRAG & DROP
// ==========================================
export const DRAG = {
  SENSITIVITY: 0.012,
  THROW_MULTIPLIER: 0.12,
  RETURN_DELAY: 1800
};

// ==========================================
// COULEURS
// ==========================================
export const COLORS = {
  LIGHT_HEX: '#F2DDB8',
  DARK_HEX: '#393F4A',
  ACCENT: '#4a90d9'
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
  graphisme: { label: 'Graphisme', color: 0xf39c12, emoji: '🎨' }
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
