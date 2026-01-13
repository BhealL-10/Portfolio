/**
 * Constants.js - Configuration centralisée V5.0
 * Portfolio 3D - Architecture optimisée avec physique fluide
 * Améliorations: Mouvement 100% fluide, navigation centralisée, transitions obligatoires
 */

// ==========================================
// TYPOGRAPHIE
// ==========================================
export const TYPOGRAPHY = {
  PRIMARY_FONT: "'Quicksand', 'Comfortaa', system-ui, -apple-system, sans-serif",
  FONT_WEIGHTS: { LIGHT: 300, REGULAR: 400, MEDIUM: 500, SEMIBOLD: 600, BOLD: 700 },
  SCALE: { XS: 11, SM: 13, BASE: 16, MD: 18, LG: 22, XL: 28, XXL: 36, HERO: 52 }
};

// ==========================================
// INTRO (Canvas 2D)
// ==========================================
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
    MOBILE: { HERO_FONT_SIZE: 24, SUBTITLE_FONT_SIZE: 12, CELL_SPREAD: 60, FRACTURE_DETECTION_RADIUS: 60, CELLS_PER_CLICK: 6 },
    MOBILE_LANDSCAPE: { HERO_FONT_SIZE: 28, SUBTITLE_FONT_SIZE: 13, CELL_SPREAD: 70, FRACTURE_DETECTION_RADIUS: 70, CELLS_PER_CLICK: 7 },
    TABLET: { HERO_FONT_SIZE: 36, SUBTITLE_FONT_SIZE: 16, CELL_SPREAD: 100, FRACTURE_DETECTION_RADIUS: 90, CELLS_PER_CLICK: 8 },
    TABLET_LANDSCAPE: { HERO_FONT_SIZE: 42, SUBTITLE_FONT_SIZE: 18, CELL_SPREAD: 120, FRACTURE_DETECTION_RADIUS: 100, CELLS_PER_CLICK: 8 },
    DESKTOP: { HERO_FONT_SIZE: 52, SUBTITLE_FONT_SIZE: 22, CELL_SPREAD: 150, FRACTURE_DETECTION_RADIUS: 120, CELLS_PER_CLICK: 8 },
    DESKTOP_LARGE: { HERO_FONT_SIZE: 64, SUBTITLE_FONT_SIZE: 26, CELL_SPREAD: 180, FRACTURE_DETECTION_RADIUS: 140, CELLS_PER_CLICK: 10 }
  }
};

// ==========================================
// SCROLL VIRTUEL - Optimisé pour fluidité
// ==========================================
export const SCROLL = {
  SPEED: 0.0006,
  TOUCH_MULTIPLIER: 2.5,
  MIN: 0,
  MAX: 1.2,
  SMOOTHING: 0.06,
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
// CAMÉRA - Mouvement 100% fluide
// ==========================================
export const CAMERA = {
  INITIAL_Z: -100,
  POST_INTRO_START_Z: -150,
  FOV: 55,
  NEAR: 0.1,
  FAR: 3000,
  SMOOTHING: 0.08,
  DISTANCE_FROM_SHARD: 25,
  LOOK_AHEAD: 20,
  CONTINUOUS_MOVEMENT: { ENABLED: true, EASE_FACTOR: 0.08, ANTICIPATION: 0.3 },
  RESPONSIVE: {
    MOBILE: { FOV: 65, DISTANCE_FROM_SHARD: 35, LOOK_AHEAD: 15, SMOOTHING: 0.1 },
    TABLET: { FOV: 60, DISTANCE_FROM_SHARD: 30, LOOK_AHEAD: 18, SMOOTHING: 0.09 },
    DESKTOP: { FOV: 55, DISTANCE_FROM_SHARD: 25, LOOK_AHEAD: 20, SMOOTHING: 0.08 }
  }
};

// ==========================================
// SHARDS - Paramètres optimisés sans tremblements
// ==========================================
export const SHARD = {
  GEOMETRY_DETAIL: 1,
  BASE_SCALE: 2.2,
  Z_SPACING: 60,
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
  CAMERA_DISTANCE: 25,
  SCALE: 1.8,
  RESPONSIVE: true,
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
// DEVICE RESPONSIVE
// ==========================================
export const DEVICE = {
  BREAKPOINTS: {
    MOBILE_SMALL: 375,
    MOBILE: 576,
    TABLET: 768,
    TABLET_LANDSCAPE: 992,
    DESKTOP: 1200,
    DESKTOP_LARGE: 1440,
    DESKTOP_XL: 1920
  },
  ASPECT_RATIOS: { PORTRAIT: 0.75, SQUARE: 1.0, LANDSCAPE: 1.33, WIDE: 1.78, ULTRAWIDE: 2.35 },
  FOCUS: {
    MOBILE: { SCALE: 1.0, CAMERA_DISTANCE: 30, Z_OFFSET: 6 },
    MOBILE_LANDSCAPE: { SCALE: 1.1, CAMERA_DISTANCE: 35, Z_OFFSET: 7 },
    TABLET: { SCALE: 1.3, CAMERA_DISTANCE: 30, Z_OFFSET: 9 },
    TABLET_LANDSCAPE: { SCALE: 1.5, CAMERA_DISTANCE: 35, Z_OFFSET: 10 },
    DESKTOP: { SCALE: 1.8, CAMERA_DISTANCE: 30, Z_OFFSET: 12 },
    DESKTOP_LARGE: { SCALE: 2.0, CAMERA_DISTANCE: 28, Z_OFFSET: 14 }
  },
  SHARD_TITLE: {
    MOBILE: { BASE_SCALE: 5, FONT_SIZE: 80 },
    TABLET: { BASE_SCALE: 7, FONT_SIZE: 100 },
    DESKTOP: { BASE_SCALE: 10, FONT_SIZE: 140 }
  },
  UI_SCALE: { MOBILE: 0.85, TABLET: 0.95, DESKTOP: 1.0, DESKTOP_LARGE: 1.1 }
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
// LOGO SHARD - Remplace ShardTitle
// ==========================================
export const SHARD_LOGO = {
  DARK: "assets/images/Logo/logomodedark.svg",
  LIGHT: "assets/images/Logo/logomodelight.svg",
  OFFSET_Z: 8,
  BASE_SCALE: 2.5,
  OPACITY_IDLE: 0.85,
  OPACITY_HIDDEN: 0,
  FADE_SPEED: 0.12,
  RESPONSIVE: {
    MOBILE: { BASE_SCALE: 1.5 },
    TABLET: { BASE_SCALE: 2.0 },
    DESKTOP: { BASE_SCALE: 2.5 }
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
// UI
// ==========================================
export const UI = {
  INFO_OVERLAY: {
    FADE_DURATION: 0.35,
    MAX_WIDTH: 550,
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
