import type { GameEventType, GameShardMotionPattern, GameShardShapeKind, GameShardSizeTier } from './gameSessionTypes';

export interface GamePatternNodeTemplate {
  x: number;
  y: number;
  sizeTier?: GameShardSizeTier;
  motionPattern?: GameShardMotionPattern;
  coinAngles?: number[];
  enemyPole?: 'north' | 'south' | null;
}

export interface GamePathPattern {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  verticality: 'low' | 'medium' | 'high';
  movementType: 'static' | 'mixed' | 'moving';
  allowedShardSizes: GameShardSizeTier[];
  allowedShapeKinds: GameShardShapeKind[];
  eventCompatibility: GameEventType[];
  nodes: GamePatternNodeTemplate[];
}

const ALL_EVENTS: GameEventType[] = ['shop', 'gift', 'rare_item'];
const ROUND_ONLY: GameShardShapeKind[] = ['round', 'oval', 'triangular'];
const ROUND_OVAL: GameShardShapeKind[] = ['round', 'oval', 'triangular'];
const ALL_SHAPES: GameShardShapeKind[] = ['round', 'oval', 'triangular'];

function pattern(
  id: string,
  difficulty: GamePathPattern['difficulty'],
  verticality: GamePathPattern['verticality'],
  movementType: GamePathPattern['movementType'],
  allowedShardSizes: GameShardSizeTier[],
  allowedShapeKinds: GameShardShapeKind[],
  nodes: GamePatternNodeTemplate[]
): GamePathPattern {
  return {
    id,
    difficulty,
    verticality,
    movementType,
    allowedShardSizes,
    allowedShapeKinds,
    eventCompatibility: ALL_EVENTS,
    nodes
  };
}

export const PATTERN_LIBRARY: GamePathPattern[] = [
  pattern('easy_01', 'easy', 'low', 'static', ['tiny', 'very_small', 'small', 'medium_small'], ROUND_ONLY, [
    { x: 10, y: 1, coinAngles: [Math.PI * 0.5] },
    { x: 21, y: -1 },
    { x: 33, y: 2, enemyPole: 'north' },
    { x: 46, y: 0, coinAngles: [Math.PI * 1.35] }
  ]),
  pattern('easy_02', 'easy', 'medium', 'static', ['tiny', 'small', 'medium_small', 'medium'], ROUND_ONLY, [
    { x: 9, y: 3 },
    { x: 20, y: 5, coinAngles: [Math.PI * 0.25] },
    { x: 33, y: 2 },
    { x: 47, y: -1, enemyPole: 'south' }
  ]),
  pattern('easy_03', 'easy', 'medium', 'moving', ['very_small', 'small', 'medium_small'], ROUND_ONLY, [
    { x: 11, y: -3, motionPattern: 'vertical' },
    { x: 22, y: 1 },
    { x: 34, y: 4, coinAngles: [Math.PI * 0.75] },
    { x: 47, y: 2, motionPattern: 'horizontal' }
  ]),
  pattern('easy_04', 'easy', 'low', 'moving', ['tiny', 'very_small', 'small'], ROUND_ONLY, [
    { x: 8, y: 2 },
    { x: 18, y: -1, motionPattern: 'drift' },
    { x: 30, y: 0 },
    { x: 43, y: 3, coinAngles: [Math.PI * 1.75] }
  ]),
  pattern('easy_05', 'easy', 'high', 'static', ['small', 'medium_small', 'medium'], ROUND_ONLY, [
    { x: 10, y: 5 },
    { x: 20, y: 8 },
    { x: 31, y: 4, enemyPole: 'north' },
    { x: 44, y: 1 }
  ]),
  pattern('easy_06', 'easy', 'high', 'moving', ['very_small', 'small', 'medium_small'], ROUND_ONLY, [
    { x: 10, y: -4, motionPattern: 'vertical' },
    { x: 21, y: -7, coinAngles: [Math.PI * 0.9] },
    { x: 33, y: -3, motionPattern: 'micro_orbit' },
    { x: 45, y: 1 }
  ]),
  pattern('easy_07', 'easy', 'medium', 'static', ['small', 'medium_small', 'medium'], ROUND_ONLY, [
    { x: 11, y: 1 },
    { x: 23, y: 6 },
    { x: 36, y: 5 },
    { x: 50, y: 0, coinAngles: [Math.PI * 0.4], enemyPole: 'south' }
  ]),
  pattern('easy_08', 'easy', 'medium', 'moving', ['tiny', 'very_small', 'small', 'medium_small'], ROUND_ONLY, [
    { x: 9, y: -2, motionPattern: 'horizontal' },
    { x: 19, y: 1 },
    { x: 31, y: -3, coinAngles: [Math.PI * 1.1] },
    { x: 43, y: 2, motionPattern: 'vertical' }
  ]),
  pattern('easy_09', 'easy', 'low', 'static', ['small', 'medium_small', 'medium'], ROUND_ONLY, [
    { x: 12, y: 0 },
    { x: 25, y: 2 },
    { x: 39, y: -2, enemyPole: 'north' },
    { x: 54, y: 1 }
  ]),
  pattern('easy_10', 'easy', 'medium', 'moving', ['tiny', 'very_small', 'small'], ROUND_ONLY, [
    { x: 10, y: 4, motionPattern: 'vertical' },
    { x: 21, y: 1 },
    { x: 33, y: -2, coinAngles: [Math.PI * 0.6] },
    { x: 46, y: -5, motionPattern: 'drift' }
  ]),

  pattern('medium_01', 'medium', 'medium', 'moving', ['small', 'medium_small', 'medium', 'medium_large'], ROUND_OVAL, [
    { x: 12, y: 5, motionPattern: 'vertical' },
    { x: 25, y: 2, sizeTier: 'medium' },
    { x: 39, y: 8, coinAngles: [Math.PI * 0.2], enemyPole: 'north' },
    { x: 54, y: 4, motionPattern: 'horizontal' },
    { x: 69, y: 1 }
  ]),
  pattern('medium_02', 'medium', 'high', 'moving', ['small', 'medium_small', 'medium', 'medium_large'], ROUND_OVAL, [
    { x: 13, y: -6 },
    { x: 27, y: -2, motionPattern: 'drift' },
    { x: 40, y: 4, sizeTier: 'medium_large' },
    { x: 55, y: 8, coinAngles: [Math.PI * 1.5] },
    { x: 71, y: 3, enemyPole: 'south' }
  ]),
  pattern('medium_03', 'medium', 'medium', 'static', ['very_small', 'small', 'medium_small', 'medium'], ROUND_OVAL, [
    { x: 11, y: 3, sizeTier: 'small' },
    { x: 23, y: -1, sizeTier: 'medium_small' },
    { x: 36, y: 5, sizeTier: 'very_large', coinAngles: [Math.PI * 0.95] },
    { x: 52, y: 1, sizeTier: 'small' }
  ]),
  pattern('medium_04', 'medium', 'high', 'moving', ['very_small', 'small', 'medium_small', 'medium_large'], ROUND_OVAL, [
    { x: 12, y: 7, motionPattern: 'vertical' },
    { x: 26, y: 2 },
    { x: 40, y: -4, motionPattern: 'micro_orbit' },
    { x: 54, y: -8, enemyPole: 'north' },
    { x: 70, y: -2, coinAngles: [Math.PI * 0.4] }
  ]),
  pattern('medium_05', 'medium', 'medium', 'moving', ['small', 'medium_small', 'medium', 'large'], ROUND_OVAL, [
    { x: 12, y: 1 },
    { x: 24, y: 6, motionPattern: 'horizontal' },
    { x: 39, y: 1, sizeTier: 'large' },
    { x: 55, y: -3, coinAngles: [Math.PI * 1.2] },
    { x: 71, y: 2 }
  ]),
  pattern('medium_06', 'medium', 'high', 'moving', ['tiny', 'small', 'medium_small', 'medium'], ROUND_OVAL, [
    { x: 10, y: -5, sizeTier: 'tiny' },
    { x: 22, y: 3, motionPattern: 'drift' },
    { x: 36, y: 9, sizeTier: 'medium_large', coinAngles: [Math.PI * 0.1] },
    { x: 52, y: 5 },
    { x: 68, y: -1, enemyPole: 'south' }
  ]),
  pattern('medium_07', 'medium', 'medium', 'static', ['small', 'medium_small', 'medium', 'medium_large'], ROUND_OVAL, [
    { x: 13, y: -2 },
    { x: 28, y: 4, sizeTier: 'medium_large' },
    { x: 43, y: 7, sizeTier: 'medium' },
    { x: 58, y: 1, coinAngles: [Math.PI * 0.65] },
    { x: 74, y: -2 }
  ]),
  pattern('medium_08', 'medium', 'high', 'moving', ['small', 'medium_small', 'medium', 'large'], ROUND_OVAL, [
    { x: 12, y: 6, motionPattern: 'vertical' },
    { x: 26, y: -2 },
    { x: 40, y: -8, motionPattern: 'horizontal' },
    { x: 56, y: -3, sizeTier: 'large', enemyPole: 'north' },
    { x: 72, y: 4, coinAngles: [Math.PI * 1.4] }
  ]),
  pattern('medium_09', 'medium', 'medium', 'moving', ['very_small', 'small', 'medium_small', 'medium'], ROUND_OVAL, [
    { x: 11, y: 2, sizeTier: 'very_small' },
    { x: 24, y: 8, motionPattern: 'drift' },
    { x: 40, y: 4 },
    { x: 56, y: -1, enemyPole: 'south' },
    { x: 72, y: 3, coinAngles: [Math.PI * 0.5] }
  ]),
  pattern('medium_10', 'medium', 'high', 'moving', ['small', 'medium_small', 'medium', 'very_large'], ROUND_OVAL, [
    { x: 12, y: -7, motionPattern: 'vertical' },
    { x: 27, y: -1, sizeTier: 'small' },
    { x: 42, y: 6, sizeTier: 'very_large' },
    { x: 58, y: 9, coinAngles: [Math.PI * 0.3], enemyPole: 'north' },
    { x: 76, y: 2 }
  ]),

  pattern('hard_01', 'hard', 'high', 'moving', ['small', 'medium_small', 'medium', 'large', 'very_large'], ALL_SHAPES, [
    { x: 14, y: 7, motionPattern: 'vertical' },
    { x: 31, y: 0, sizeTier: 'large' },
    { x: 48, y: -8, motionPattern: 'micro_orbit', enemyPole: 'north' },
    { x: 66, y: -1, coinAngles: [Math.PI * 1.5] },
    { x: 86, y: 6, sizeTier: 'very_large' }
  ]),
  pattern('hard_02', 'hard', 'high', 'moving', ['tiny', 'small', 'medium_small', 'medium', 'large'], ALL_SHAPES, [
    { x: 13, y: -8, sizeTier: 'tiny' },
    { x: 30, y: -2, motionPattern: 'drift' },
    { x: 47, y: 6, sizeTier: 'medium_large' },
    { x: 66, y: 10, coinAngles: [Math.PI * 0.95] },
    { x: 86, y: 1, enemyPole: 'south' }
  ]),
  pattern('hard_03', 'hard', 'medium', 'moving', ['small', 'medium_small', 'medium', 'large', 'very_large'], ALL_SHAPES, [
    { x: 15, y: 2, sizeTier: 'very_large' },
    { x: 33, y: 7, motionPattern: 'horizontal' },
    { x: 51, y: 1, sizeTier: 'small' },
    { x: 70, y: -6, motionPattern: 'vertical' },
    { x: 91, y: 0, coinAngles: [Math.PI * 0.2], enemyPole: 'north' }
  ]),
  pattern('hard_04', 'hard', 'high', 'moving', ['tiny', 'small', 'medium_small', 'large'], ALL_SHAPES, [
    { x: 14, y: 9, sizeTier: 'tiny' },
    { x: 31, y: 2 },
    { x: 49, y: -7, motionPattern: 'horizontal' },
    { x: 68, y: -10, sizeTier: 'large', coinAngles: [Math.PI * 1.1] },
    { x: 90, y: -1, enemyPole: 'south' }
  ]),
  pattern('hard_05', 'hard', 'high', 'moving', ['small', 'medium_small', 'medium', 'medium_large', 'huge'], ALL_SHAPES, [
    { x: 15, y: -3 },
    { x: 32, y: 8, sizeTier: 'huge' },
    { x: 50, y: 2, motionPattern: 'micro_orbit' },
    { x: 70, y: -9, sizeTier: 'small', enemyPole: 'north' },
    { x: 92, y: -4, coinAngles: [Math.PI * 0.55] }
  ]),
  pattern('hard_06', 'hard', 'medium', 'moving', ['tiny', 'small', 'medium_small', 'medium', 'large'], ALL_SHAPES, [
    { x: 14, y: 5, sizeTier: 'small' },
    { x: 31, y: -4, motionPattern: 'vertical' },
    { x: 49, y: 5, sizeTier: 'tiny' },
    { x: 69, y: 11, motionPattern: 'drift', enemyPole: 'south' },
    { x: 91, y: 4, coinAngles: [Math.PI * 0.25] }
  ]),
  pattern('expert_01', 'expert', 'high', 'moving', ['tiny', 'small', 'medium_small', 'large', 'very_large'], ALL_SHAPES, [
    { x: 16, y: 10, sizeTier: 'tiny', motionPattern: 'vertical' },
    { x: 36, y: 1, sizeTier: 'large' },
    { x: 57, y: -10, motionPattern: 'micro_orbit', enemyPole: 'north' },
    { x: 79, y: 0, sizeTier: 'very_large' },
    { x: 103, y: 9, coinAngles: [Math.PI * 1.65] }
  ]),
  pattern('expert_02', 'expert', 'high', 'moving', ['tiny', 'small', 'medium_small', 'medium', 'huge'], ALL_SHAPES, [
    { x: 17, y: -11, sizeTier: 'tiny' },
    { x: 37, y: -2, motionPattern: 'drift' },
    { x: 59, y: 9, sizeTier: 'huge' },
    { x: 82, y: 12, motionPattern: 'horizontal', enemyPole: 'south' },
    { x: 107, y: 1, coinAngles: [Math.PI * 0.15] }
  ]),
  pattern('expert_03', 'expert', 'medium', 'moving', ['small', 'medium_small', 'medium', 'large', 'massive'], ALL_SHAPES, [
    { x: 16, y: 2, sizeTier: 'massive' },
    { x: 38, y: 10, motionPattern: 'vertical' },
    { x: 61, y: 0, sizeTier: 'small' },
    { x: 85, y: -10, motionPattern: 'drift', enemyPole: 'north' },
    { x: 111, y: -1, coinAngles: [Math.PI * 1.1] }
  ]),
  pattern('expert_04', 'expert', 'high', 'moving', ['tiny', 'small', 'medium', 'large', 'very_large'], ALL_SHAPES, [
    { x: 15, y: 8, motionPattern: 'horizontal' },
    { x: 35, y: -7, sizeTier: 'tiny' },
    { x: 57, y: 11, sizeTier: 'large' },
    { x: 81, y: -9, motionPattern: 'micro_orbit', enemyPole: 'south' },
    { x: 108, y: 3, coinAngles: [Math.PI * 0.35] }
  ])
];
