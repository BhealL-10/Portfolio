import type { GameHudState, GamePlayerMotionState, LandingGrade } from './gameSessionTypes';
import type { RogueliteModuleSlot } from './roguelite';

export interface GameAudioRuntimeState {
  state: GameHudState;
  playerMotionState: GamePlayerMotionState;
  distanceMeters: number;
  momentumRatio: number;
  awaitingFirstJump: boolean;
  blowerActive: boolean;
  onShardActive: boolean;
  glideActive: boolean;
  speed: number;
}

export type GameAudioEvent =
  | { type: 'run_start' }
  | { type: 'jump'; maxBoost: boolean; speed: number }
  | { type: 'sail'; fast: boolean }
  | { type: 'land'; kind: 'normal' | 'milestone' | 'reward' | 'shop' }
  | { type: 'grade'; grade: LandingGrade }
  | { type: 'twist' }
  | { type: 'module_activate'; slot: RogueliteModuleSlot }
  | { type: 'grapple_cast' }
  | { type: 'grapple_hit' }
  | { type: 'grapple_recall' }
  | { type: 'coin'; magnet: boolean }
  | { type: 'shop_land' }
  | { type: 'enemy_die' }
  | { type: 'enemy_hit_player' }
  | { type: 'game_over' }
  | { type: 'momentum_loss_start' };
