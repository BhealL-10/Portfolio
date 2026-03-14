import type { LocalizedText } from '../types/content';

export type RogueliteRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type RogueliteCategory = 'momentum' | 'mobility' | 'combat' | 'economy' | 'utility';
export type RogueliteItemKind = 'passive' | 'module';
export type RogueliteModuleSlot =
  | 'plane'
  | 'wings'
  | 'propulseur'
  | 'reacteur_front'
  | 'reacteur_back'
  | 'shield'
  | 'souffleur'
  | 'wrapper'
  | 'magnet'
  | 'big_canon'
  | 'front_canon'
  | 'grappin';

export interface RogueliteItemStats {
  momentumRetention?: number;
  coinBonus?: number;
  shopDiscount?: number;
  glideFactor?: number;
  preventFail?: boolean;
  rewardChance?: number;
  gradeWindowBonus?: number;
  landingPenaltyReduction?: number;
  shopChance?: number;
  shieldCooldownFactor?: number;
  planeStability?: number;
  planeGlide?: number;
  propulsionPower?: number;
  gaugeCapacity?: number;
  gaugeRegenPerSecond?: number;
  wrapperDistance?: number;
  magnetRange?: number;
  frontCanonRange?: number;
  frontCanonCooldown?: number;
  bigCanonRange?: number;
  bigCanonCooldown?: number;
  grapRange?: number;
  grapCooldown?: number;
}

export interface RogueliteGaugeConfig {
  capacity: number;
  regenPerSecond: number;
  regenDelay: number;
  emptyDelay: number;
}

export interface RogueliteBoatVisualConfig {
  spriteSheetUrl: string;
  columns: number;
  rows: number;
  layerOrder: number;
}

export interface RogueliteItemDefinition {
  id: string;
  baseId: string;
  icon: string;
  rarity: RogueliteRarity;
  category: RogueliteCategory;
  kind: RogueliteItemKind;
  slot: RogueliteModuleSlot | null;
  unlockScore: number;
  stackable: boolean;
  maxStacks: number;
  effects: string[];
  name: LocalizedText;
  description: LocalizedText;
  hudIconSrc: string;
  rarityIconSrc: string;
  boatVisual: RogueliteBoatVisualConfig | null;
  chargesByRarity?: Partial<Record<RogueliteRarity, number>>;
  gaugeConfig?: Partial<Record<RogueliteRarity, RogueliteGaugeConfig>>;
  statsByRarity: Record<RogueliteRarity, RogueliteItemStats>;
}

export interface RogueliteItemOffer {
  item: RogueliteItemDefinition;
  stackCount: number;
}

export interface ModuleRuntimeState {
  itemId: string;
  cooldownRemaining: number;
  chargesCurrent: number;
  chargesMax: number;
  gaugeCurrent: number;
  gaugeMax: number;
  regenDelayRemaining: number;
}

export interface PlayerModifierStack {
  glideFactor: number;
  landingTolerance: number;
  chargeRate: number;
  jumpPower: number;
  chargedLeapBonus: number;
  airControl: number;
  captureRadius: number;
  extraJumps: number;
  phaseJump: boolean;
  phaseJumpRescueRadius: number;
  phaseJumpCooldown: number;
  teleportRange: number;
  teleportCooldown: number;
  warpRange: number;
  warpCooldown: number;
  rocketBurst: boolean;
  rocketBurstCooldown: number;
  rocketBurstPower: number;
  airDashCharges: number;
  airDashPower: number;
  momentumRetention: number;
  infiniteFlaps: boolean;
  momentumGain: number;
  momentumCap: number;
  shieldCharges: number;
  doubleCoin: boolean;
  spikeOrbit: boolean;
  coinMagnet: number;
  shopDiscount: number;
  speedBonus: number;
  coinBonus: number;
  luck: number;
  eventLuck: number;
  enemyDamageBonus: number;
  timeSlowFactor: number;
  gravityInverter: boolean;
  phantomLanding: boolean;
  chaosWarp: boolean;
  rareItemBias: number;
  extraCoinSlots: number;
  momentumRedirect: number;
  failSafe: boolean;
  rewardChance: number;
  gradeWindowBonus: number;
  landingPenaltyReduction: number;
  shopChance: number;
  shieldCooldownFactor: number;
  planeGlide: number;
  planeStability: number;
  souffleurBoost: number;
  wrapperDistance: number;
  magnetRange: number;
  frontCanonRange: number;
  frontCanonCooldown: number;
  bigCanonRange: number;
  bigCanonCooldown: number;
  grapRange: number;
  grapCooldown: number;
}

export interface RunUpgradeState {
  counts: Record<string, number>;
  ownedOrder: string[];
  modifiers: PlayerModifierStack;
  passives: Partial<Record<string, string>>;
  modules: Partial<Record<RogueliteModuleSlot, string>>;
  moduleRuntime: Partial<Record<RogueliteModuleSlot, ModuleRuntimeState>>;
}

interface RogueliteItemBlueprint {
  baseId: string;
  icon: string;
  kind: RogueliteItemKind;
  slot: RogueliteModuleSlot | null;
  category: RogueliteCategory;
  unlockScore: number;
  name: LocalizedText;
  description: LocalizedText;
  hudIconSrc: string;
  boatVisual: RogueliteBoatVisualConfig | null;
  chargesByRarity?: Partial<Record<RogueliteRarity, number>>;
  gaugeConfig?: Partial<Record<RogueliteRarity, RogueliteGaugeConfig>>;
  statsByRarity: Record<RogueliteRarity, RogueliteItemStats>;
}

const loc = (fr: string, en: string): LocalizedText => ({ fr, en });

const RARITY_ICON_URLS: Record<RogueliteRarity, string> = {
  common: new URL('../../assets/images/itemhud/rarity-common.png', import.meta.url).href,
  uncommon: new URL('../../assets/images/itemhud/rarity-uncommon.png', import.meta.url).href,
  rare: new URL('../../assets/images/itemhud/rarity-rare.png', import.meta.url).href,
  epic: new URL('../../assets/images/itemhud/rarity-epique.png', import.meta.url).href,
  legendary: new URL('../../assets/images/itemhud/rarity-legendaire.png', import.meta.url).href
};
const A_PROD_ICON_URL = '/assets/images/Logo/logomodedark.svg';

const MODULE_SHEET_URLS = {
  plane: new URL('../../assets/images/spritesheet/PlaneSheet.png', import.meta.url).href,
  wings: new URL('../../assets/images/spritesheet/wingSheet.png', import.meta.url).href,
  propulseur: new URL('../../assets/images/spritesheet/PropulseurSheet.png', import.meta.url).href,
  reacteur_front: new URL('../../assets/images/spritesheet/ReacteurFrontSheet.png', import.meta.url).href,
  reacteur_back: new URL('../../assets/images/spritesheet/ReacteurBackSheet.png', import.meta.url).href,
  shield: new URL('../../assets/images/spritesheet/ShieldSheet.png', import.meta.url).href,
  souffleur: new URL('../../assets/images/spritesheet/SouffleurSheet.png', import.meta.url).href,
  wrapper: new URL('../../assets/images/spritesheet/WrapperSheet.png', import.meta.url).href,
  magnet: new URL('../../assets/images/spritesheet/Magnetsheet.png', import.meta.url).href,
  big_canon: new URL('../../assets/images/spritesheet/BigCanonSheet.png', import.meta.url).href,
  front_canon: new URL('../../assets/images/spritesheet/FrontCanonSheet.png', import.meta.url).href,
  grappin: new URL('../../assets/images/spritesheet/GrapSheet.png', import.meta.url).href
} as const;

const HUD_ICON_URLS = {
  plane: new URL('../../assets/images/itemhud/Planehud.png', import.meta.url).href,
  wings: new URL('../../assets/images/itemhud/WingHud.png', import.meta.url).href,
  propulseur: new URL('../../assets/images/itemhud/PropulseurHud.png', import.meta.url).href,
  reacteur_front: new URL('../../assets/images/itemhud/Frontreactorhud.png', import.meta.url).href,
  reacteur_back: new URL('../../assets/images/itemhud/backreactorhud.png', import.meta.url).href,
  shield: new URL('../../assets/images/itemhud/Shieldhud.png', import.meta.url).href,
  souffleur: new URL('../../assets/images/itemhud/Soufleurhud.png', import.meta.url).href,
  wrapper: new URL('../../assets/images/itemhud/Wrapperhud.png', import.meta.url).href,
  magnet: new URL('../../assets/images/itemhud/MagnetHud.png', import.meta.url).href,
  big_canon: new URL('../../assets/images/itemhud/Bigcanonhud.png', import.meta.url).href,
  front_canon: new URL('../../assets/images/itemhud/Frontcanonhud.png', import.meta.url).href,
  grappin: new URL('../../assets/images/itemhud/Grappin hud.png', import.meta.url).href,
  passive_momentum: A_PROD_ICON_URL,
  passive_coin: A_PROD_ICON_URL,
  passive_shop: A_PROD_ICON_URL,
  passive_shield: A_PROD_ICON_URL,
  passive_grade: A_PROD_ICON_URL
} as const;

const PASSIVE_BLUEPRINTS: RogueliteItemBlueprint[] = [
  {
    baseId: 'gyro_stabilizer',
    icon: 'GYR',
    kind: 'passive',
    slot: null,
    category: 'momentum',
    unlockScore: 0,
    name: loc('Stabilisateur gyroscopique', 'Gyro Stabilizer'),
    description: loc('Le momentum retombe moins vite.', 'Momentum decays more slowly.'),
    hudIconSrc: HUD_ICON_URLS.passive_momentum,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { momentumRetention: 0.1 },
      uncommon: { momentumRetention: 0.14 },
      rare: { momentumRetention: 0.18 },
      epic: { momentumRetention: 0.22 },
      legendary: { momentumRetention: 0.26 }
    })
  },
  {
    baseId: 'coin_booster',
    icon: 'COI',
    kind: 'passive',
    slot: null,
    category: 'economy',
    unlockScore: 0,
    name: loc('Booster de pieces', 'Coin Booster'),
    description: loc('Augmente les gains de pièces.', 'Increase coin rewards.'),
    hudIconSrc: HUD_ICON_URLS.passive_coin,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { coinBonus: 0.12 },
      uncommon: { coinBonus: 0.18 },
      rare: { coinBonus: 0.24 },
      epic: { coinBonus: 0.32 },
      legendary: { coinBonus: 0.4 }
    })
  },
  {
    baseId: 'market_discount',
    icon: 'MKT',
    kind: 'passive',
    slot: null,
    category: 'economy',
    unlockScore: 0,
    name: loc('Reduction marchand', 'Market Discount'),
    description: loc('Réduit les prix du shop.', 'Lower shop prices.'),
    hudIconSrc: HUD_ICON_URLS.passive_shop,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { shopDiscount: 0.08 },
      uncommon: { shopDiscount: 0.12 },
      rare: { shopDiscount: 0.18 },
      epic: { shopDiscount: 0.24 },
      legendary: { shopDiscount: 0.3 }
    })
  },
  {
    baseId: 'glide_liner',
    icon: 'GLD',
    kind: 'passive',
    slot: null,
    category: 'mobility',
    unlockScore: 0,
    name: loc('Lisseur de trajectoire', 'Flow Liner'),
    description: loc('Améliore légèrement le contrôle aérien sans ajouter de plané.', 'Slightly improve airborne control without adding glide.'),
    hudIconSrc: HUD_ICON_URLS.passive_momentum,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { planeStability: 0.04 },
      uncommon: { planeStability: 0.06 },
      rare: { planeStability: 0.08 },
      epic: { planeStability: 0.1 },
      legendary: { planeStability: 0.12 }
    })
  },
  {
    baseId: 'fail_guard',
    icon: 'FAIL',
    kind: 'passive',
    slot: null,
    category: 'utility',
    unlockScore: 20,
    name: loc('Garde-fou', 'Fail Guard'),
    description: loc('Empêche les grades Raté.', 'Prevent Fail landings.'),
    hudIconSrc: HUD_ICON_URLS.passive_grade,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { preventFail: true },
      uncommon: { preventFail: true },
      rare: { preventFail: true },
      epic: { preventFail: true },
      legendary: { preventFail: true }
    })
  },
  {
    baseId: 'reward_radar',
    icon: 'RWD',
    kind: 'passive',
    slot: null,
    category: 'economy',
    unlockScore: 20,
    name: loc('Radar de recompense', 'Reward Radar'),
    description: loc('Augmente la chance de croiser une reward shard.', 'Increase reward shard odds.'),
    hudIconSrc: HUD_ICON_URLS.passive_coin,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { rewardChance: 0.04 },
      uncommon: { rewardChance: 0.06 },
      rare: { rewardChance: 0.08 },
      epic: { rewardChance: 0.11 },
      legendary: { rewardChance: 0.14 }
    })
  },
  {
    baseId: 'grade_tuner',
    icon: 'GRD',
    kind: 'passive',
    slot: null,
    category: 'utility',
    unlockScore: 20,
    name: loc('Reglage de grade', 'Grade Tuner'),
    description: loc('Agrandit légèrement les fenêtres Great et Super.', 'Slightly widen Great and Super windows.'),
    hudIconSrc: HUD_ICON_URLS.passive_grade,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { gradeWindowBonus: 0.04 },
      uncommon: { gradeWindowBonus: 0.06 },
      rare: { gradeWindowBonus: 0.08 },
      epic: { gradeWindowBonus: 0.1 },
      legendary: { gradeWindowBonus: 0.12 }
    })
  },
  {
    baseId: 'soft_recovery',
    icon: 'REC',
    kind: 'passive',
    slot: null,
    category: 'momentum',
    unlockScore: 20,
    name: loc('Recuperation douce', 'Soft Recovery'),
    description: loc('Réduit la perte de momentum après un mauvais atterrissage.', 'Reduce momentum loss after awkward landings.'),
    hudIconSrc: HUD_ICON_URLS.passive_momentum,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { landingPenaltyReduction: 0.08 },
      uncommon: { landingPenaltyReduction: 0.12 },
      rare: { landingPenaltyReduction: 0.16 },
      epic: { landingPenaltyReduction: 0.2 },
      legendary: { landingPenaltyReduction: 0.25 }
    })
  },
  {
    baseId: 'shop_scanner',
    icon: 'SHP',
    kind: 'passive',
    slot: null,
    category: 'economy',
    unlockScore: 20,
    name: loc('Scanner marchand', 'Shop Scanner'),
    description: loc('Augmente la chance de shop.', 'Increase shop odds.'),
    hudIconSrc: HUD_ICON_URLS.passive_shop,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { shopChance: 0.04 },
      uncommon: { shopChance: 0.06 },
      rare: { shopChance: 0.08 },
      epic: { shopChance: 0.1 },
      legendary: { shopChance: 0.12 }
    })
  },
  {
    baseId: 'shield_cooler',
    icon: 'SHC',
    kind: 'passive',
    slot: null,
    category: 'utility',
    unlockScore: 20,
    name: loc('Refroidisseur de bouclier', 'Shield Cooler'),
    description: loc('Améliore la recharge du shield.', 'Improve shield recharge.'),
    hudIconSrc: HUD_ICON_URLS.passive_shield,
    boatVisual: null,
    statsByRarity: rarityStats({
      common: { shieldCooldownFactor: 0.08 },
      uncommon: { shieldCooldownFactor: 0.12 },
      rare: { shieldCooldownFactor: 0.16 },
      epic: { shieldCooldownFactor: 0.22 },
      legendary: { shieldCooldownFactor: 0.28 }
    })
  }
];

const MODULE_BLUEPRINTS: RogueliteItemBlueprint[] = [
  {
    baseId: 'plane',
    icon: 'PLN',
    kind: 'module',
    slot: 'plane',
    category: 'mobility',
    unlockScore: 0,
    name: loc('Planeur', 'Plane'),
    description: loc('Stabilise le joueur et améliore le plané.', 'Stabilize the player and strengthen gliding.'),
    hudIconSrc: HUD_ICON_URLS.plane,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.plane, columns: 2, rows: 2, layerOrder: 30 },
    statsByRarity: rarityStats({
      common: { planeGlide: 0.18, planeStability: 0.12 },
      uncommon: { planeGlide: 0.25, planeStability: 0.16 },
      rare: { planeGlide: 0.33, planeStability: 0.22 },
      epic: { planeGlide: 0.41, planeStability: 0.28 },
      legendary: { planeGlide: 0.5, planeStability: 0.34 }
    })
  },
  {
    baseId: 'wings',
    icon: 'WNG',
    kind: 'module',
    slot: 'wings',
    category: 'mobility',
    unlockScore: 20,
    name: loc('Ailes', 'Wings'),
    description: loc('Donne un fort boost diagonal vers l’avant et le haut.', 'Adds a strong diagonal forward-up boost.'),
    hudIconSrc: HUD_ICON_URLS.wings,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.wings, columns: 4, rows: 2, layerOrder: 90 },
    chargesByRarity: { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 },
    statsByRarity: rarityStats({
      common: { propulsionPower: 4.5 },
      uncommon: { propulsionPower: 5 },
      rare: { propulsionPower: 5.5 },
      epic: { propulsionPower: 6 },
      legendary: { propulsionPower: 6.5 }
    })
  },
  {
    baseId: 'propulseur',
    icon: 'PRP',
    kind: 'module',
    slot: 'propulseur',
    category: 'mobility',
    unlockScore: 0,
    name: loc('Propulseur', 'Propulsor'),
    description: loc('Dash vers l’avant dans les airs avec des charges par saut.', 'Forward airborne dash using per-jump charges.'),
    hudIconSrc: HUD_ICON_URLS.propulseur,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.propulseur, columns: 2, rows: 2, layerOrder: 12 },
    chargesByRarity: { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 },
    statsByRarity: rarityStats({
      common: { propulsionPower: 4.2 },
      uncommon: { propulsionPower: 4.7 },
      rare: { propulsionPower: 5.2 },
      epic: { propulsionPower: 5.7 },
      legendary: { propulsionPower: 6.2 }
    })
  },
  {
    baseId: 'reacteur_front',
    icon: 'FRT',
    kind: 'module',
    slot: 'reacteur_front',
    category: 'mobility',
    unlockScore: 10,
    name: loc('Réacteur Front', 'Front Reactor'),
    description: loc('Pousse vers le haut pendant le saut.', 'Push upward during airborne boosts.'),
    hudIconSrc: HUD_ICON_URLS.reacteur_front,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.reacteur_front, columns: 2, rows: 2, layerOrder: 42 },
    chargesByRarity: { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 },
    statsByRarity: rarityStats({
      common: { propulsionPower: 4 },
      uncommon: { propulsionPower: 4.4 },
      rare: { propulsionPower: 4.8 },
      epic: { propulsionPower: 5.2 },
      legendary: { propulsionPower: 5.6 }
    })
  },
  {
    baseId: 'reacteur_back',
    icon: 'BAK',
    kind: 'module',
    slot: 'reacteur_back',
    category: 'mobility',
    unlockScore: 10,
    name: loc('Réacteur arriere', 'Back Reactor'),
    description: loc('Ajoute une poussee diagonale vers l’avant et le haut.', 'Add a diagonal forward-up thrust.'),
    hudIconSrc: HUD_ICON_URLS.reacteur_back,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.reacteur_back, columns: 2, rows: 2, layerOrder: 38 },
    chargesByRarity: { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 },
    statsByRarity: rarityStats({
      common: { propulsionPower: 4.1 },
      uncommon: { propulsionPower: 4.5 },
      rare: { propulsionPower: 4.9 },
      epic: { propulsionPower: 5.3 },
      legendary: { propulsionPower: 5.7 }
    })
  },
  {
    baseId: 'shield',
    icon: 'SHD',
    kind: 'module',
    slot: 'shield',
    category: 'combat',
    unlockScore: 10,
    name: loc('Shield', 'Shield'),
    description: loc('Bloque un impact puis se recharge.', 'Block one hit, then recharge.'),
    hudIconSrc: HUD_ICON_URLS.shield,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.shield, columns: 2, rows: 2, layerOrder: 60 },
    statsByRarity: rarityStats({
      common: { shieldCooldownFactor: 0.18 },
      uncommon: { shieldCooldownFactor: 0.24 },
      rare: { shieldCooldownFactor: 0.32 },
      epic: { shieldCooldownFactor: 0.4 },
      legendary: { shieldCooldownFactor: 0.5 }
    })
  },
  {
    baseId: 'souffleur',
    icon: 'SOU',
    kind: 'module',
    slot: 'souffleur',
    category: 'mobility',
    unlockScore: 10,
    name: loc('Souffleur', 'Blower'),
    description: loc('Ajoute un boost aérien maintenu avec jauge.', 'Add a sustained airborne boost with a gauge.'),
    hudIconSrc: HUD_ICON_URLS.souffleur,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.souffleur, columns: 2, rows: 2, layerOrder: 54 },
    gaugeConfig: {
      common: { capacity: 1, regenPerSecond: 0.28, regenDelay: 1.2, emptyDelay: 2.4 },
      uncommon: { capacity: 1.12, regenPerSecond: 0.34, regenDelay: 1.1, emptyDelay: 2.2 },
      rare: { capacity: 1.26, regenPerSecond: 0.38, regenDelay: 1, emptyDelay: 2 },
      epic: { capacity: 1.42, regenPerSecond: 0.44, regenDelay: 0.9, emptyDelay: 1.9 },
      legendary: { capacity: 1.6, regenPerSecond: 0.5, regenDelay: 0.8, emptyDelay: 1.8 }
    },
    statsByRarity: rarityStats({
      common: { propulsionPower: 1.2, gaugeCapacity: 1, gaugeRegenPerSecond: 0.28 },
      uncommon: { propulsionPower: 1.38, gaugeCapacity: 1.12, gaugeRegenPerSecond: 0.34 },
      rare: { propulsionPower: 1.56, gaugeCapacity: 1.26, gaugeRegenPerSecond: 0.38 },
      epic: { propulsionPower: 1.76, gaugeCapacity: 1.42, gaugeRegenPerSecond: 0.44 },
      legendary: { propulsionPower: 2, gaugeCapacity: 1.6, gaugeRegenPerSecond: 0.5 }
    })
  },
  {
    baseId: 'wrapper',
    icon: 'WRP',
    kind: 'module',
    slot: 'wrapper',
    category: 'utility',
    unlockScore: 10,
    name: loc('Wrapper', 'Wrapper'),
    description: loc('Téléporte au moins 10m plus loin sur une shard valide.', 'Teleport at least 10m farther onto a valid shard.'),
    hudIconSrc: HUD_ICON_URLS.wrapper,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.wrapper, columns: 2, rows: 2, layerOrder: 80 },
    statsByRarity: rarityStats({
      common: { wrapperDistance: 10 },
      uncommon: { wrapperDistance: 12 },
      rare: { wrapperDistance: 14 },
      epic: { wrapperDistance: 16 },
      legendary: { wrapperDistance: 18 }
    })
  },
  {
    baseId: 'magnet',
    icon: 'MAG',
    kind: 'module',
    slot: 'magnet',
    category: 'economy',
    unlockScore: 10,
    name: loc('Magnet', 'Magnet'),
    description: loc('Attire les pièces plus loin.', 'Pull coins from farther away.'),
    hudIconSrc: HUD_ICON_URLS.magnet,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.magnet, columns: 2, rows: 2, layerOrder: 44 },
    statsByRarity: rarityStats({
      common: { magnetRange: 0.28 },
      uncommon: { magnetRange: 0.38 },
      rare: { magnetRange: 0.48 },
      epic: { magnetRange: 0.6 },
      legendary: { magnetRange: 0.72 }
    })
  },
  {
    baseId: 'big_canon',
    icon: 'BGC',
    kind: 'module',
    slot: 'big_canon',
    category: 'combat',
    unlockScore: 10,
    name: loc('Big Canon', 'Big Canon'),
    description: loc('Tire automatiquement dans une grande zone.', 'Auto-fire inside a medium-large radial zone.'),
    hudIconSrc: HUD_ICON_URLS.big_canon,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.big_canon, columns: 2, rows: 2, layerOrder: 52 },
    statsByRarity: rarityStats({
      common: { bigCanonRange: 5.2, bigCanonCooldown: 4.6 },
      uncommon: { bigCanonRange: 5.8, bigCanonCooldown: 4.2 },
      rare: { bigCanonRange: 6.4, bigCanonCooldown: 3.8 },
      epic: { bigCanonRange: 7, bigCanonCooldown: 3.3 },
      legendary: { bigCanonRange: 7.6, bigCanonCooldown: 2.8 }
    })
  },
  {
    baseId: 'front_canon',
    icon: 'FRC',
    kind: 'module',
    slot: 'front_canon',
    category: 'combat',
    unlockScore: 10,
    name: loc('Front Canon', 'Front Canon'),
    description: loc('Tire seulement sur les ennemis devant le bateau.', 'Fire only at enemies crossing the frontal laser.'),
    hudIconSrc: HUD_ICON_URLS.front_canon,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.front_canon, columns: 2, rows: 2, layerOrder: 56 },
    statsByRarity: rarityStats({
      common: { frontCanonRange: 4.4, frontCanonCooldown: 2.8 },
      uncommon: { frontCanonRange: 5, frontCanonCooldown: 2.5 },
      rare: { frontCanonRange: 5.6, frontCanonCooldown: 2.2 },
      epic: { frontCanonRange: 6.2, frontCanonCooldown: 1.95 },
      legendary: { frontCanonRange: 6.8, frontCanonCooldown: 1.7 }
    })
  },
  {
    baseId: 'grappin',
    icon: 'GRP',
    kind: 'module',
    slot: 'grappin',
    category: 'utility',
    unlockScore: 10,
    name: loc('Grappin', 'Grapple'),
    description: loc('Accroche une shard à portée et attire le joueur.', 'Hook a nearby shard and pull the player toward it.'),
    hudIconSrc: HUD_ICON_URLS.grappin,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.grappin, columns: 2, rows: 2, layerOrder: 58 },
    statsByRarity: rarityStats({
      common: { grapRange: 4.8, grapCooldown: 30 },
      uncommon: { grapRange: 5.4, grapCooldown: 28 },
      rare: { grapRange: 6.1, grapCooldown: 26 },
      epic: { grapRange: 6.8, grapCooldown: 24 },
      legendary: { grapRange: 7.6, grapCooldown: 22 }
    })
  }
];

const ITEM_BLUEPRINTS = [...PASSIVE_BLUEPRINTS, ...MODULE_BLUEPRINTS];

const rarityWeights: Record<RogueliteRarity, number> = {
  common: 56,
  uncommon: 28,
  rare: 11,
  epic: 4,
  legendary: 1
};

const rarityRank: Record<RogueliteRarity, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  epic: 3,
  legendary: 4
};

export const rarityLabels: Record<RogueliteRarity, LocalizedText> = {
  common: loc('Common', 'Common'),
  uncommon: loc('Uncommon', 'Uncommon'),
  rare: loc('Rare', 'Rare'),
  epic: loc('Epic', 'Epic'),
  legendary: loc('Legendary', 'Legendary')
};

export const rogueliteItems: RogueliteItemDefinition[] = ITEM_BLUEPRINTS.flatMap((blueprint) =>
  (Object.keys(rarityRank) as RogueliteRarity[]).map((rarity) => createItemDefinition(blueprint, rarity))
);

export function createRunUpgradeState(): RunUpgradeState {
  return {
    counts: {},
    ownedOrder: [],
    modifiers: createDefaultModifiers(),
    passives: {},
    modules: {},
    moduleRuntime: {}
  };
}

function createDefaultModifiers(): PlayerModifierStack {
  return {
    glideFactor: 0,
    landingTolerance: 0,
    chargeRate: 1,
    jumpPower: 1,
    chargedLeapBonus: 0,
    airControl: 0,
    captureRadius: 0,
    extraJumps: 0,
    phaseJump: false,
    phaseJumpRescueRadius: 0,
    phaseJumpCooldown: 20,
    teleportRange: 0,
    teleportCooldown: 30,
    warpRange: 0,
    warpCooldown: 24,
    rocketBurst: false,
    rocketBurstCooldown: 18,
    rocketBurstPower: 0,
    airDashCharges: 0,
    airDashPower: 0,
    momentumRetention: 0,
    infiniteFlaps: false,
    momentumGain: 0,
    momentumCap: 1,
    shieldCharges: 0,
    doubleCoin: false,
    spikeOrbit: false,
    coinMagnet: 0,
    shopDiscount: 0,
    speedBonus: 0,
    coinBonus: 0,
    luck: 0,
    eventLuck: 0,
    enemyDamageBonus: 0,
    timeSlowFactor: 0,
    gravityInverter: false,
    phantomLanding: false,
    chaosWarp: false,
    rareItemBias: 0,
    extraCoinSlots: 0,
    momentumRedirect: 0,
    failSafe: false,
    rewardChance: 0,
    gradeWindowBonus: 0,
    landingPenaltyReduction: 0,
    shopChance: 0,
    shieldCooldownFactor: 0,
    planeGlide: 0,
    planeStability: 0,
    souffleurBoost: 0,
    wrapperDistance: 0,
    magnetRange: 0,
    frontCanonRange: 0,
    frontCanonCooldown: 0,
    bigCanonRange: 0,
    bigCanonCooldown: 0,
    grapRange: 0,
    grapCooldown: 0
  };
}

function allowedRaritiesForScore(score: number): RogueliteRarity[] {
  if (score < 20) return ['common', 'uncommon'];
  if (score < 60) return ['common', 'uncommon', 'rare'];
  if (score < 100) return ['common', 'uncommon', 'rare', 'epic'];
  return ['common', 'uncommon', 'rare', 'epic', 'legendary'];
}

export function getNextUpgradeMilestone(distanceMeters: number) {
  if (distanceMeters < 10) return 10;
  if (distanceMeters < 100) return 100;
  if (distanceMeters < 1000) return 1000;
  return Math.floor(distanceMeters / 1000) * 1000 + 1000;
}

export function isUpgradeMilestone(distanceMeters: number) {
  return (
    distanceMeters === 10 ||
    distanceMeters === 100 ||
    distanceMeters === 1000 ||
    (distanceMeters > 1000 && distanceMeters % 1000 === 0)
  );
}

export function getCrossedUpgradeMilestone(previousDistanceMeters: number, currentDistanceMeters: number) {
  const milestone = getNextUpgradeMilestone(previousDistanceMeters);
  return currentDistanceMeters >= milestone ? milestone : null;
}

export function getItemById(itemId: string) {
  return rogueliteItems.find((entry) => entry.id === itemId) ?? null;
}

export function getItemByBaseId(baseId: string, rarity?: RogueliteRarity) {
  return rogueliteItems.find((entry) => entry.baseId === baseId && (rarity ? entry.rarity === rarity : true)) ?? null;
}

export function getRarityRank(rarity: RogueliteRarity) {
  return rarityRank[rarity];
}

export function getHigherRarityItem(baseId: string, rarity: RogueliteRarity) {
  return getItemByBaseId(baseId, rarity);
}

export function getModuleChargesForItem(item: RogueliteItemDefinition | null) {
  if (!item || !item.chargesByRarity) return 0;
  return item.chargesByRarity[item.rarity] ?? 0;
}

export function getModuleGaugeConfig(item: RogueliteItemDefinition | null) {
  if (!item || !item.gaugeConfig) return null;
  return item.gaugeConfig[item.rarity] ?? null;
}

export function buildUpgradeOffers(score: number, runState: RunUpgradeState, rng = Math.random): RogueliteItemOffer[] {
  const allowedRarities = allowedRaritiesForScore(score);
  const offers: RogueliteItemOffer[] = [];
  const usedBaseIds = new Set<string>();
  const eligibleBlueprints = ITEM_BLUEPRINTS.filter((blueprint) => {
    if (score < blueprint.unlockScore) return false;
    const current = getCurrentOwnedItemForBlueprint(runState, blueprint);
    if (!current) return true;
    if (blueprint.kind === 'passive') return false;
    return allowedRarities.some((rarity) => rarityRank[rarity] > rarityRank[current.rarity]);
  });

  while (offers.length < 3 && usedBaseIds.size < eligibleBlueprints.length) {
    const blueprint = pickEligibleBlueprint(eligibleBlueprints, usedBaseIds, rng);
    if (!blueprint) break;
    usedBaseIds.add(blueprint.baseId);
    const current = getCurrentOwnedItemForBlueprint(runState, blueprint);
    const rarityPool = blueprint.kind === 'passive' ? (['common'] as RogueliteRarity[]) : allowedRarities;
    const nextRarity = pickNextRarity(rarityPool, current?.rarity ?? null, rng);
    if (!nextRarity) continue;
    const item = getItemByBaseId(blueprint.baseId, nextRarity);
    if (!item) continue;
    offers.push({
      item,
      stackCount: current ? rarityRank[current.rarity] + 1 : 0
    });
  }

  return offers;
}

export function applyItemToRunState(runState: RunUpgradeState, itemId: string) {
  const item = getItemById(itemId);
  if (!item) {
    return runState;
  }

  const nextCounts = { ...runState.counts };
  const nextPassives = { ...runState.passives };
  const nextModules = { ...runState.modules };
  const nextRuntime: RunUpgradeState['moduleRuntime'] = { ...runState.moduleRuntime };
  let nextOwnedOrder = runState.ownedOrder.filter((ownedId) => {
    const owned = getItemById(ownedId);
    if (!owned) return false;
    const samePassive = item.kind === 'passive' && owned.kind === 'passive' && owned.baseId === item.baseId;
    const sameModule = item.kind === 'module' && owned.kind === 'module' && owned.slot === item.slot;
    if (samePassive || sameModule) {
      delete nextCounts[owned.id];
      return false;
    }
    return true;
  });

  nextCounts[item.id] = 1;
  nextOwnedOrder = [...nextOwnedOrder, item.id];
  if (item.kind === 'passive') {
    nextPassives[item.baseId] = item.id;
  } else if (item.slot) {
    nextModules[item.slot] = item.id;
    nextRuntime[item.slot] = createModuleRuntimeState(item, runState.moduleRuntime[item.slot] ?? null);
  }

  const nextState: RunUpgradeState = {
    counts: nextCounts,
    ownedOrder: nextOwnedOrder,
    modifiers: createDefaultModifiers(),
    passives: nextPassives,
    modules: nextModules,
    moduleRuntime: nextRuntime
  };

  recomputeModifiers(nextState);
  return nextState;
}

function createModuleRuntimeState(item: RogueliteItemDefinition, previous: ModuleRuntimeState | null): ModuleRuntimeState {
  const gaugeConfig = getModuleGaugeConfig(item);
  const chargesMax = getModuleChargesForItem(item);
  const previousGaugeRatio =
    previous && previous.gaugeMax > 0 ? Math.min(1, previous.gaugeCurrent / previous.gaugeMax) : 1;
  const gaugeMax = gaugeConfig?.capacity ?? 0;
  return {
    itemId: item.id,
    cooldownRemaining: previous?.cooldownRemaining ?? 0,
    chargesCurrent: chargesMax,
    chargesMax,
    gaugeCurrent: gaugeMax > 0 ? gaugeMax * previousGaugeRatio : 0,
    gaugeMax,
    regenDelayRemaining: previous?.regenDelayRemaining ?? 0
  };
}

function recomputeModifiers(runState: RunUpgradeState) {
  runState.modifiers = createDefaultModifiers();
  runState.ownedOrder.forEach((itemId) => {
    const item = getItemById(itemId);
    if (!item) return;
    const stats = item.statsByRarity[item.rarity];
    if (stats.momentumRetention) runState.modifiers.momentumRetention += stats.momentumRetention;
    if (stats.coinBonus) runState.modifiers.coinBonus += stats.coinBonus;
    if (stats.shopDiscount) runState.modifiers.shopDiscount += stats.shopDiscount;
    if (stats.glideFactor) runState.modifiers.glideFactor += stats.glideFactor;
    if (stats.preventFail) runState.modifiers.failSafe = true;
    if (stats.rewardChance) runState.modifiers.rewardChance += stats.rewardChance;
    if (stats.gradeWindowBonus) runState.modifiers.gradeWindowBonus += stats.gradeWindowBonus;
    if (stats.landingPenaltyReduction) runState.modifiers.landingPenaltyReduction += stats.landingPenaltyReduction;
    if (stats.shopChance) runState.modifiers.shopChance += stats.shopChance;
    if (stats.shieldCooldownFactor) runState.modifiers.shieldCooldownFactor += stats.shieldCooldownFactor;
    if (stats.planeGlide) runState.modifiers.planeGlide += stats.planeGlide;
    if (stats.planeStability) runState.modifiers.planeStability += stats.planeStability;
    if (stats.propulsionPower && item.baseId === 'souffleur') runState.modifiers.souffleurBoost += stats.propulsionPower;
    if (stats.wrapperDistance) runState.modifiers.wrapperDistance = Math.max(runState.modifiers.wrapperDistance, stats.wrapperDistance);
    if (stats.magnetRange) {
      runState.modifiers.magnetRange = Math.max(runState.modifiers.magnetRange, stats.magnetRange);
      runState.modifiers.coinMagnet = Math.max(runState.modifiers.coinMagnet, stats.magnetRange);
    }
    if (stats.frontCanonRange) runState.modifiers.frontCanonRange = Math.max(runState.modifiers.frontCanonRange, stats.frontCanonRange);
    if (stats.frontCanonCooldown) runState.modifiers.frontCanonCooldown = Math.max(runState.modifiers.frontCanonCooldown, stats.frontCanonCooldown);
    if (stats.bigCanonRange) runState.modifiers.bigCanonRange = Math.max(runState.modifiers.bigCanonRange, stats.bigCanonRange);
    if (stats.bigCanonCooldown) runState.modifiers.bigCanonCooldown = Math.max(runState.modifiers.bigCanonCooldown, stats.bigCanonCooldown);
    if (stats.grapRange) runState.modifiers.grapRange = Math.max(runState.modifiers.grapRange, stats.grapRange);
    if (stats.grapCooldown) runState.modifiers.grapCooldown = Math.max(runState.modifiers.grapCooldown, stats.grapCooldown);
  });

  runState.modifiers.shopDiscount = Math.min(0.45, runState.modifiers.shopDiscount);
  runState.modifiers.coinBonus = Math.min(1.2, runState.modifiers.coinBonus);
  runState.modifiers.momentumRetention = Math.min(0.72, runState.modifiers.momentumRetention);
  runState.modifiers.glideFactor = Math.min(1.9, runState.modifiers.glideFactor);
}

function pickEligibleBlueprint(pool: RogueliteItemBlueprint[], used: Set<string>, rng: () => number) {
  const eligible = pool.filter((entry) => !used.has(entry.baseId));
  if (eligible.length === 0) return null;
  return eligible[Math.floor(rng() * eligible.length)] ?? null;
}

function pickNextRarity(allowed: RogueliteRarity[], current: RogueliteRarity | null, rng: () => number) {
  const options = allowed.filter((rarity) => current === null || rarityRank[rarity] > rarityRank[current]);
  if (options.length === 0) return null;
  const total = options.reduce((sum, rarity) => sum + rarityWeights[rarity], 0);
  let cursor = rng() * total;
  for (const rarity of options) {
    cursor -= rarityWeights[rarity];
    if (cursor <= 0) return rarity;
  }
  return options[options.length - 1] ?? null;
}

function getCurrentOwnedItemForBlueprint(runState: RunUpgradeState, blueprint: RogueliteItemBlueprint) {
  const itemId = blueprint.kind === 'passive' ? runState.passives[blueprint.baseId] : blueprint.slot ? runState.modules[blueprint.slot] : undefined;
  return itemId ? getItemById(itemId) : null;
}

function createItemDefinition(blueprint: RogueliteItemBlueprint, rarity: RogueliteRarity): RogueliteItemDefinition {
  return {
    id: `${blueprint.baseId}_${rarity}`,
    baseId: blueprint.baseId,
    icon: blueprint.icon,
    rarity,
    category: blueprint.category,
    kind: blueprint.kind,
    slot: blueprint.slot,
    unlockScore: blueprint.unlockScore,
    stackable: false,
    maxStacks: 1,
    effects: [],
    name: blueprint.name,
    description: blueprint.description,
    hudIconSrc: blueprint.hudIconSrc,
    rarityIconSrc: RARITY_ICON_URLS[rarity],
    boatVisual: blueprint.boatVisual,
    chargesByRarity: blueprint.chargesByRarity,
    gaugeConfig: blueprint.gaugeConfig,
    statsByRarity: blueprint.statsByRarity
  };
}

function rarityStats(stats: Record<RogueliteRarity, RogueliteItemStats>) {
  return stats;
}
