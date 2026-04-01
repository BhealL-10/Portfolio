export const AUDIO_STORAGE_KEYS = {
  volume: 'portfolio-game-audio-volume-v1',
  muted: 'portfolio-game-audio-muted-v1'
} as const;

export const AUDIO_GLOBAL_CONFIG = {
  defaultMasterVolume: 1,
  categories: {
    music: 1,
    sfx: 1,
    ui: 1,
    ambient: 1
  },
  buses: {
    music: 0.92,
    feedback: 0.26,
    combat: 0.22,
    ambient: 0.16
  }
} as const;

export const AUDIO_LOOP_CONFIG = {
  blower: 0.34,
  glide: 0.42,
  onShard: 0.1
} as const;

export const AUDIO_EVENT_CONFIG = {
  jump: 0.58,
  jumpBoost: 0.54,
  sail: 0.22,
  land: 0.18,
  landMilestone: 0.24,
  landReward: 0.42,
  landShop: 0.48,
  grade: 0.42,
  twist: 0.46,
  grappleCast: 0.96,
  grappleHit: 1.04,
  grappleRecall: 0.86,
  coinPickup: 0.94,
  magnetCoin: 10,
  enemyDie: 0.54,
  enemyHitPlayer: 1.18,
  gameOver: 0.58,
  momentumLossStart: 1,
  blowerOff: 0.16,
  shield: 0.46,
  reactor: 0.42,
  thruster: 0.4,
  wings: 0.4,
  wrapper: 0.98,
  bigCanon: 0.46,
  frontCanon: 0.38
} as const;

export const AUDIO_DEBOUNCE_MS = {
  jump: 90,
  boost: 140,
  sail: 110,
  land: 180,
  grade: 140,
  twist: 140,
  grappleCast: 100,
  grappleHit: 90,
  grappleRecall: 100,
  coin: 70,
  shopLand: 180,
  enemyDie: 90,
  enemyHitPlayer: 120,
  gameOver: 320,
  momentumLoss: 280,
  blowerOff: 80,
  shield: 120,
  reactor: 90,
  thruster: 90,
  wings: 90,
  wrapper: 140,
  bigCanon: 70,
  frontCanon: 60
} as const;

export function resolveAudioBusGain(bus: keyof typeof AUDIO_GLOBAL_CONFIG.buses) {
  return AUDIO_GLOBAL_CONFIG.buses[bus];
}
