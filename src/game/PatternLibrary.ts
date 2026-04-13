import type {
  GameEventType,
  GameShardMotionDirection,
  GameShardMotionPattern,
  GameShardShapeKind,
  GameShardSizeTier
} from './gameSessionTypes';

export interface GamePatternNodeTemplate {
  x: number;
  y: number;
  sizeTier?: GameShardSizeTier;
  motionPattern?: GameShardMotionPattern;
  motionDirection?: GameShardMotionDirection;
  motionDistance?: number;
  motionDuration?: number;
  coinAngles?: number[];
  enemyPole?: 'north' | 'south' | null;
}

export type GamePatternScale = 'intro_10m' | 'main_100m';
export type GamePatternDensity = 'dense' | 'balanced' | 'selective';

export interface GamePathPattern {
  id: string;
  scale: GamePatternScale;
  density: GamePatternDensity;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  verticality: 'low' | 'medium' | 'high';
  movementType: 'static' | 'mixed' | 'moving';
  allowedShardSizes: GameShardSizeTier[];
  allowedShapeKinds: GameShardShapeKind[];
  eventCompatibility: GameEventType[];
  nodes: GamePatternNodeTemplate[];
}

const ALL_EVENTS: GameEventType[] = ['shop', 'gift', 'rare_item'];
const ROUND_SHAPES: GameShardShapeKind[] = ['round'];
const TUTORIAL_SHAPES: GameShardShapeKind[] = ['round', 'oval'];
const MAIN_SHAPES: GameShardShapeKind[] = ['round', 'oval', 'triangular'];
export const PATTERN_CONTENT_WINDOWS: Record<GamePatternScale, { start: number; end: number }> = {
  intro_10m: { start: 0.4, end: 9.2 },
  main_100m: { start: 2, end: 97 }
};

function node(x: number, y: number, options: Omit<Partial<GamePatternNodeTemplate>, 'x' | 'y'> = {}): GamePatternNodeTemplate {
  return {
    x,
    y,
    ...options
  };
}

function roundPatternX(x: number) {
  return Math.round(x * 100) / 100;
}

function normalizePatternNodes(scale: GamePatternScale, nodes: GamePatternNodeTemplate[]) {
  if (nodes.length === 0) {
    return nodes;
  }

  const window = PATTERN_CONTENT_WINDOWS[scale];
  const minX = Math.min(...nodes.map((template) => template.x));
  const maxX = Math.max(...nodes.map((template) => template.x));
  const span = maxX - minX;
  const needsNormalization = minX < window.start - 0.001 || maxX > window.end + 0.001;

  if (!needsNormalization) {
    return nodes;
  }

  if (span <= 0.001) {
    const centeredX = roundPatternX((window.start + window.end) * 0.5);
    return nodes.map((template) => ({
      ...template,
      x: centeredX
    }));
  }

  const targetSpan = window.end - window.start;
  return nodes.map((template) => ({
    ...template,
    x: roundPatternX(window.start + ((template.x - minX) / span) * targetSpan)
  }));
}

function pattern(
  id: string,
  scale: GamePatternScale,
  density: GamePatternDensity,
  difficulty: GamePathPattern['difficulty'],
  verticality: GamePathPattern['verticality'],
  movementType: GamePathPattern['movementType'],
  allowedShardSizes: GameShardSizeTier[],
  allowedShapeKinds: GameShardShapeKind[],
  nodes: GamePatternNodeTemplate[]
): GamePathPattern {
  return {
    id,
    scale,
    density,
    difficulty,
    verticality,
    movementType,
    allowedShardSizes,
    allowedShapeKinds,
    eventCompatibility: ALL_EVENTS,
    nodes: normalizePatternNodes(scale, nodes)
  };
}

export const INTRO_10M_PATTERN_LIBRARY: GamePathPattern[] = [
  pattern(
    'intro_low_arc',
    'intro_10m',
    'dense',
    'easy',
    'low',
    'mixed',
    ['tiny', 'very_small', 'small', 'medium_small', 'medium'],
    TUTORIAL_SHAPES,
    [
      node(0.8, -3.4),
      node(1.6, -2.4),
      node(2.3, -1.4),
      node(3.0, -0.2, { coinAngles: [Math.PI * 0.65] }),
      node(3.8, 1.3),
      node(4.7, 2.2),
      node(5.4, 1.1, { motionPattern: 'horizontal', motionDirection: 'right', motionDistance: 4.7, motionDuration: 1.02 }),
      node(6.1, 0.2),
      node(6.8, -0.8),
      node(7.6, -1.6),
      node(8.3, -0.4),
      node(8.9, 0.5)
    ]
  ),
  pattern(
    'intro_wave_ladder',
    'intro_10m',
    'dense',
    'easy',
    'medium',
    'mixed',
    ['tiny', 'very_small', 'small', 'medium_small'],
    TUTORIAL_SHAPES,
    [
      node(0.9, -2.7, { coinAngles: [Math.PI * 0.35] }),
      node(1.5, -1.2),
      node(2.1, 0.2),
      node(2.8, 1.5, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 4.4, motionDuration: 1.05 }),
      node(3.5, 2.8),
      node(4.2, 1.1),
      node(4.9, -0.6),
      node(5.7, -2.3),
      node(6.6, 0.8),
      node(7.2, 2.4, { enemyPole: 'north' }),
      node(7.9, -1.4),
      node(8.6, 0.6)
    ]
  ),
  pattern(
    'intro_upper_ribbon',
    'intro_10m',
    'dense',
    'easy',
    'high',
    'moving',
    ['very_small', 'small', 'medium_small'],
    TUTORIAL_SHAPES,
    [
      node(0.9, 0.8),
      node(1.5, 1.8),
      node(2.2, 3.0),
      node(3.0, 4.1, { coinAngles: [Math.PI * 0.22] }),
      node(3.9, 3.1, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 4.8, motionDuration: 1.08 }),
      node(4.7, 1.9),
      node(5.4, 0.6),
      node(6.2, -0.7),
      node(7.0, 2.5),
      node(7.7, 3.8),
      node(8.4, 1.3, { enemyPole: 'south' }),
      node(9.0, 0.2)
    ]
  )
];

export const HUNDRED_METER_PATTERN_LIBRARY: GamePathPattern[] = [
  pattern(
    'block_canyon_switchbacks',
    'main_100m',
    'dense',
    'easy',
    'high',
    'moving',
    ['tiny', 'very_small', 'small', 'medium_small', 'medium'],
    MAIN_SHAPES,
    [
      node(5, -3.7, { sizeTier: 'medium' }),
      node(9, -2.4),
      node(13, -0.8),
      node(17, 1.1, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 4.8, motionDuration: 1.06 }),
      node(21, 3.0),
      node(25, 4.2),
      node(29, 2.1),
      node(33, -0.4, { coinAngles: [Math.PI * 0.45] }),
      node(37, -2.8),
      node(41, -4.0),
      node(45, -1.7),
      node(49, 1.0, { enemyPole: 'north' }),
      node(53, 3.5),
      node(57, 1.9),
      node(61, -0.6, { motionPattern: 'horizontal', motionDirection: 'right', motionDistance: 5.4, motionDuration: 1.08 }),
      node(65, -2.9),
      node(69, -1.2),
      node(73, 1.4),
      node(77, 3.8),
      node(81, 2.5),
      node(85, 0.1),
      node(89, -1.8),
      node(92, 1.2)
    ]
  ),
  pattern(
    'block_mid_boulevard',
    'main_100m',
    'dense',
    'easy',
    'medium',
    'mixed',
    ['small', 'medium_small', 'medium', 'medium_large'],
    MAIN_SHAPES,
    [
      node(6, -1.5, { sizeTier: 'medium_large' }),
      node(10, 0.4),
      node(14, 1.8),
      node(18, 0.6),
      node(22, -0.9, { coinAngles: [Math.PI * 0.6] }),
      node(26, -2.2),
      node(30, 1.1),
      node(34, 3.0, { motionPattern: 'drift', motionDirection: 'up_right', motionDistance: 4.8, motionDuration: 1.1 }),
      node(38, 1.2),
      node(42, -0.7),
      node(46, -2.6),
      node(50, -1.1),
      node(54, 0.7, { enemyPole: 'south' }),
      node(58, 2.6),
      node(62, 4.0),
      node(66, 2.1),
      node(70, 0.2),
      node(74, -1.8),
      node(78, -3.3),
      node(82, -1.2),
      node(86, 0.9),
      node(90, 2.5)
    ]
  ),
  pattern(
    'block_basin_columns',
    'main_100m',
    'dense',
    'medium',
    'high',
    'moving',
    ['tiny', 'very_small', 'small', 'medium_small'],
    ROUND_SHAPES,
    [
      node(5, -3.9),
      node(7, 3.8),
      node(11, -2.4),
      node(13, 2.1),
      node(17, -0.9, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 4.6, motionDuration: 1.08 }),
      node(19, 0.7),
      node(24, -3.5),
      node(26, 3.4),
      node(31, -1.8),
      node(33, 1.6, { coinAngles: [Math.PI * 1.44] }),
      node(38, -0.4),
      node(40, 0.5),
      node(45, -3.2, { motionPattern: 'horizontal', motionDirection: 'left', motionDistance: 5.2, motionDuration: 1.05 }),
      node(47, 3.1),
      node(52, -1.5),
      node(54, 1.5),
      node(59, -0.1),
      node(61, 0.2),
      node(66, -3.4),
      node(68, 3.6, { enemyPole: 'north' }),
      node(73, -1.9),
      node(75, 1.8),
      node(80, -0.5),
      node(82, 0.6),
      node(87, -2.8),
      node(89, 2.7)
    ]
  ),
  pattern(
    'block_lower_highway',
    'main_100m',
    'dense',
    'medium',
    'medium',
    'moving',
    ['very_small', 'small', 'medium_small', 'medium', 'medium_large'],
    MAIN_SHAPES,
    [
      node(6, -4.0, { sizeTier: 'large' }),
      node(10, -2.7),
      node(14, -1.2),
      node(18, 0.4),
      node(22, 2.0, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 5, motionDuration: 1.08 }),
      node(26, 3.4),
      node(30, 1.7),
      node(34, -0.2),
      node(38, -2.0),
      node(42, -3.6, { coinAngles: [Math.PI * 0.8] }),
      node(46, -1.5),
      node(50, 0.6),
      node(54, 2.6),
      node(58, 4.1),
      node(62, 2.3, { motionPattern: 'horizontal', motionDirection: 'right', motionDistance: 5.1, motionDuration: 1.1 }),
      node(66, 0.2),
      node(70, -1.8),
      node(74, -3.3),
      node(78, -1.1),
      node(82, 1.0, { enemyPole: 'south' }),
      node(86, 2.7),
      node(90, 0.8)
    ]
  ),
  pattern(
    'block_orbit_spires',
    'main_100m',
    'dense',
    'hard',
    'high',
    'moving',
    ['tiny', 'very_small', 'small', 'medium_small', 'medium'],
    MAIN_SHAPES,
    [
      node(5, 2.8),
      node(9, 4.1, { motionPattern: 'micro_orbit', motionDirection: 'up_left', motionDistance: 4.4, motionDuration: 1.18 }),
      node(13, 2.2),
      node(17, -0.4),
      node(21, -2.7),
      node(25, -4.1, { coinAngles: [Math.PI * 1.22] }),
      node(29, -1.9),
      node(33, 0.5),
      node(37, 2.9),
      node(41, 4.4),
      node(45, 1.5, { enemyPole: 'north' }),
      node(49, -1.2),
      node(53, -3.6, { motionPattern: 'horizontal', motionDirection: 'left', motionDistance: 5.3, motionDuration: 1.1 }),
      node(57, -0.9),
      node(61, 2.0),
      node(65, 4.2),
      node(69, 1.6),
      node(73, -1.4),
      node(77, -3.7),
      node(81, -1.1),
      node(85, 1.7),
      node(90, 0.4)
    ]
  ),
  pattern(
    'block_center_islands',
    'main_100m',
    'balanced',
    'medium',
    'medium',
    'mixed',
    ['small', 'medium_small', 'medium', 'medium_large', 'large'],
    MAIN_SHAPES,
    [
      node(7, -1.0, { sizeTier: 'large' }),
      node(12, 0.8),
      node(16, 2.5),
      node(20, 1.1),
      node(24, -0.6),
      node(28, -2.4),
      node(32, -0.8, { coinAngles: [Math.PI * 0.42] }),
      node(36, 1.0),
      node(40, 2.9),
      node(44, 4.1, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 4.8, motionDuration: 1.06 }),
      node(48, 2.0),
      node(52, -0.2),
      node(56, -2.1),
      node(60, -3.5),
      node(64, -1.3),
      node(68, 1.1, { enemyPole: 'north' }),
      node(72, 3.2),
      node(76, 1.7),
      node(80, -0.3),
      node(84, -2.0, { motionPattern: 'drift', motionDirection: 'down_right', motionDistance: 4.6, motionDuration: 1.12 }),
      node(88, 0.9),
      node(92, 2.4)
    ]
  ),
  pattern(
    'block_crosswinds',
    'main_100m',
    'balanced',
    'hard',
    'high',
    'moving',
    ['tiny', 'very_small', 'small', 'medium_small', 'medium'],
    ROUND_SHAPES,
    [
      node(6, 3.8),
      node(10, 1.9),
      node(14, -0.4),
      node(18, -2.6, { motionPattern: 'horizontal', motionDirection: 'right', motionDistance: 5.6, motionDuration: 1.08 }),
      node(22, -4.0),
      node(26, -1.5),
      node(30, 1.2),
      node(34, 3.5),
      node(38, 1.6, { coinAngles: [Math.PI * 0.3] }),
      node(42, -0.9),
      node(46, -3.1),
      node(50, -0.8),
      node(54, 1.6),
      node(58, 3.9, { motionPattern: 'horizontal', motionDirection: 'left', motionDistance: 5.5, motionDuration: 1.1 }),
      node(62, 1.1),
      node(66, -1.3),
      node(70, -3.6),
      node(74, -1.4, { enemyPole: 'south' }),
      node(78, 1.2),
      node(82, 3.4),
      node(86, 1.9),
      node(90, 0.3)
    ]
  ),
  pattern(
    'block_outer_shelves',
    'main_100m',
    'balanced',
    'medium',
    'high',
    'mixed',
    ['small', 'medium_small', 'medium', 'medium_large'],
    MAIN_SHAPES,
    [
      node(5, -4.1, { sizeTier: 'medium_large' }),
      node(10, -2.9),
      node(15, -1.5),
      node(20, 1.7),
      node(25, 3.8),
      node(30, 2.0, { coinAngles: [Math.PI * 1.1] }),
      node(35, -1.0),
      node(40, -3.5),
      node(45, -1.7, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 4.4, motionDuration: 1.05 }),
      node(50, 1.4),
      node(55, 4.0),
      node(60, 2.4),
      node(65, -0.7),
      node(70, -3.2, { enemyPole: 'north' }),
      node(75, -1.6),
      node(80, 1.1),
      node(85, 3.3),
      node(90, 0.6)
    ]
  ),
  pattern(
    'block_shifted_steps',
    'main_100m',
    'balanced',
    'hard',
    'medium',
    'moving',
    ['tiny', 'very_small', 'small', 'medium_small', 'medium', 'medium_large'],
    MAIN_SHAPES,
    [
      node(6, -2.8),
      node(11, -1.0),
      node(16, 0.9, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 4.8, motionDuration: 1.08 }),
      node(21, 2.7),
      node(26, 4.1),
      node(31, 1.6),
      node(36, -0.5),
      node(41, -2.6),
      node(46, -4.0, { coinAngles: [Math.PI * 0.94] }),
      node(51, -1.7),
      node(56, 0.8),
      node(61, 3.0, { motionPattern: 'drift', motionDirection: 'up_right', motionDistance: 5, motionDuration: 1.14 }),
      node(66, 1.1),
      node(71, -1.0),
      node(76, -3.1),
      node(81, -1.0, { enemyPole: 'south' }),
      node(86, 1.7),
      node(91, 0.2)
    ]
  ),
  pattern(
    'block_selective_bridges',
    'main_100m',
    'selective',
    'expert',
    'high',
    'moving',
    ['small', 'medium_small', 'medium', 'medium_large', 'large'],
    MAIN_SHAPES,
    [
      node(8, -3.9, { sizeTier: 'large' }),
      node(14, -1.5),
      node(20, 1.8),
      node(26, 4.2, { motionPattern: 'horizontal', motionDirection: 'left', motionDistance: 5.6, motionDuration: 1.12 }),
      node(32, 1.9),
      node(38, -1.6),
      node(44, -4.0),
      node(50, -1.1, { coinAngles: [Math.PI * 1.32] }),
      node(56, 2.0),
      node(62, 4.3, { enemyPole: 'north' }),
      node(68, 1.4),
      node(74, -1.7),
      node(80, -3.9, { motionPattern: 'micro_orbit', motionDirection: 'down_left', motionDistance: 4.6, motionDuration: 1.2 }),
      node(86, -0.8),
      node(92, 1.6)
    ]
  ),
  pattern(
    'block_selective_forks',
    'main_100m',
    'selective',
    'expert',
    'high',
    'moving',
    ['tiny', 'very_small', 'small', 'medium_small', 'medium'],
    ROUND_SHAPES,
    [
      node(7, 0.4),
      node(12, 3.1),
      node(17, 4.3, { motionPattern: 'vertical', motionDirection: 'up', motionDistance: 5, motionDuration: 1.08 }),
      node(22, 1.2),
      node(27, -1.8),
      node(32, -4.1),
      node(37, -1.4),
      node(42, 1.6),
      node(47, 4.0, { coinAngles: [Math.PI * 0.26] }),
      node(52, 1.4),
      node(57, -1.9, { motionPattern: 'horizontal', motionDirection: 'right', motionDistance: 5.6, motionDuration: 1.12 }),
      node(62, -4.2),
      node(67, -1.2),
      node(72, 1.9),
      node(77, 4.1, { enemyPole: 'south' }),
      node(82, 1.0),
      node(87, -1.8),
      node(92, 0.3)
    ]
  ),
  pattern(
    'block_recovery_arches',
    'main_100m',
    'balanced',
    'easy',
    'medium',
    'mixed',
    ['very_small', 'small', 'medium_small', 'medium', 'medium_large'],
    MAIN_SHAPES,
    [
      node(6, -2.0),
      node(11, -0.6),
      node(16, 1.0),
      node(21, 2.6),
      node(26, 3.8, { coinAngles: [Math.PI * 0.55] }),
      node(31, 2.1),
      node(36, 0.1),
      node(41, -1.8),
      node(46, -3.1),
      node(51, -1.4, { motionPattern: 'drift', motionDirection: 'down_right', motionDistance: 4.7, motionDuration: 1.08 }),
      node(56, 0.4),
      node(61, 2.4),
      node(66, 3.9),
      node(71, 2.2),
      node(76, 0.2),
      node(81, -1.8),
      node(86, -0.4),
      node(91, 1.1)
    ]
  )
];

export const PATTERN_LIBRARY: GamePathPattern[] = [...INTRO_10M_PATTERN_LIBRARY, ...HUNDRED_METER_PATTERN_LIBRARY];
