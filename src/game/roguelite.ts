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
  preventFail?: boolean;
  rewardChance?: number;
  gradeWindowBonus?: number;
  landingPenaltyReduction?: number;
  shopChance?: number;
  shieldCooldownFactor?: number;
  cameraBaseZoomBonus?: number;
  cameraMomentumZoomBonus?: number;
  gravityCentering?: number;
  shockwaveDamping?: number;
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
  cameraBaseZoomBonus: number;
  cameraMomentumZoomBonus: number;
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
  gravityCentering: number;
  shockwaveDamping: number;
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
  common: new URL('../../assets/images/itemhud/hud-rarity-common.png', import.meta.url).href,
  uncommon: new URL('../../assets/images/itemhud/hud-rarity-uncommon.png', import.meta.url).href,
  rare: new URL('../../assets/images/itemhud/hud-rarity-rare.png', import.meta.url).href,
  epic: new URL('../../assets/images/itemhud/hud-rarity-epic.png', import.meta.url).href,
  legendary: new URL('../../assets/images/itemhud/hud-rarity-legendary.png', import.meta.url).href
};
const A_PROD_ICON_URL = '/assets/images/Logo/logomodedark.svg';

const MODULE_SHEET_URLS = {
  plane: new URL('../../assets/images/spritesheet/module-plane-spritesheet.png', import.meta.url).href,
  wings: new URL('../../assets/images/spritesheet/module-wings-spritesheet.png', import.meta.url).href,
  propulseur: new URL('../../assets/images/spritesheet/module-thruster-spritesheet.png', import.meta.url).href,
  reacteur_front: new URL('../../assets/images/spritesheet/module-front-reactor-spritesheet.png', import.meta.url).href,
  reacteur_back: new URL('../../assets/images/spritesheet/module-rear-reactor-spritesheet.png', import.meta.url).href,
  shield: new URL('../../assets/images/spritesheet/module-shield-spritesheet.png', import.meta.url).href,
  souffleur: new URL('../../assets/images/spritesheet/module-blower-spritesheet.png', import.meta.url).href,
  wrapper: new URL('../../assets/images/spritesheet/module-wrapper-spritesheet.png', import.meta.url).href,
  magnet: new URL('../../assets/images/spritesheet/module-magnet-spritesheet.png', import.meta.url).href,
  big_canon: new URL('../../assets/images/spritesheet/module-big-cannon-spritesheet.png', import.meta.url).href,
  front_canon: new URL('../../assets/images/spritesheet/module-front-cannon-spritesheet.png', import.meta.url).href,
  grappin: new URL('../../assets/images/spritesheet/module-grappling-hook-spritesheet.png', import.meta.url).href
} as const;

const HUD_ICON_URLS = {
  plane: new URL('../../assets/images/itemhud/hud-module-plane.png', import.meta.url).href,
  wings: new URL('../../assets/images/itemhud/hud-module-wings.png', import.meta.url).href,
  propulseur: new URL('../../assets/images/itemhud/hud-module-thruster.png', import.meta.url).href,
  reacteur_front: new URL('../../assets/images/itemhud/hud-module-front-reactor.png', import.meta.url).href,
  reacteur_back: new URL('../../assets/images/itemhud/hud-module-rear-reactor.png', import.meta.url).href,
  shield: new URL('../../assets/images/itemhud/hud-module-shield.png', import.meta.url).href,
  souffleur: new URL('../../assets/images/itemhud/hud-module-blower.png', import.meta.url).href,
  wrapper: new URL('../../assets/images/itemhud/hud-module-wrapper.png', import.meta.url).href,
  magnet: new URL('../../assets/images/itemhud/hud-module-magnet.png', import.meta.url).href,
  big_canon: new URL('../../assets/images/itemhud/hud-module-big-cannon.png', import.meta.url).href,
  front_canon: new URL('../../assets/images/itemhud/hud-module-front-cannon.png', import.meta.url).href,
  grappin: new URL('../../assets/images/itemhud/hud-module-grappling-hook.png', import.meta.url).href,
  gouvernail: new URL('../../assets/images/itemhud/hud-passive-rudder.png', import.meta.url).href,
  bourse: new URL('../../assets/images/itemhud/hud-passive-purse.png', import.meta.url).href,
  contrebandier: new URL('../../assets/images/itemhud/hud-passive-map.png', import.meta.url).href,
  longue_vue: new URL('../../assets/images/itemhud/hud-passive-spyglass.png', import.meta.url).href,
  totem: new URL('../../assets/images/itemhud/hud-passive-totem.png', import.meta.url).href,
  carte_tresor: new URL('../../assets/images/itemhud/hud-passive-map.png', import.meta.url).href,
  compas: new URL('../../assets/images/itemhud/hud-passive-compass.png', import.meta.url).href,
  queue: new URL('../../assets/images/itemhud/hud-passive-tail.png', import.meta.url).href,
  perroquet: new URL('../../assets/images/itemhud/hud-passive-parrot.png', import.meta.url).href,
  ceinture: new URL('../../assets/images/itemhud/hud-passive-belt.png', import.meta.url).href,
  amortisseurs: new URL('../../assets/images/itemhud/hud-passive-shock-absorbers.png', import.meta.url).href,
  passive_fallback: A_PROD_ICON_URL
} as const;

const PASSIVE_BLUEPRINTS: RogueliteItemBlueprint[] = [
  {
    baseId: 'old_ape_rudder',
    icon: 'RUD',
    kind: 'passive',
    slot: null,
    category: 'momentum',
    unlockScore: 0,
    name: loc('Gouvernail', 'Helmwheel'),
    description: loc('Le momentum retombe moins vite.', 'Momentum decays more slowly.'),
    hudIconSrc: HUD_ICON_URLS.gouvernail,
    boatVisual: null,
    statsByRarity: passiveStats({ momentumRetention: 0.40 })
  },
  {
    baseId: 'corsair_purse',
    icon: 'PUR',
    kind: 'passive',
    slot: null,
    category: 'economy',
    unlockScore: 0,
    name: loc('Bourse du capitalisme', 'Capital Purse'),
    description: loc('Augmente les gains de pièces.', 'Increase coin rewards.'),
    hudIconSrc: HUD_ICON_URLS.bourse,
    boatVisual: null,
    statsByRarity: passiveStats({ coinBonus: 2.0 })
  },
  {
    baseId: 'smuggler_favor',
    icon: 'FAV',
    kind: 'passive',
    slot: null,
    category: 'economy',
    unlockScore: 0,
    name: loc('Déflation primate', 'Primate Deflation'),
    description: loc('Réduit les prix chez le marchand.', 'Reduce shop prices.'),
    hudIconSrc: HUD_ICON_URLS.queue,
    boatVisual: null,
    statsByRarity: passiveStats({ shopDiscount: 0.50 })
  },
  {
    baseId: 'crows_nest_spyglass',
    icon: 'SPY',
    kind: 'passive',
    slot: null,
    category: 'mobility',
    unlockScore: 0,
    name: loc('Longue-Vue', 'Spyglass'),
    description: loc('Augmente le dézoom par défaut et accentue le dézoom gagné avec le momentum.', 'Increase default zoom-out and amplify momentum-based zoom-out.'),
    hudIconSrc: HUD_ICON_URLS.longue_vue,
    boatVisual: null,
    statsByRarity: passiveStats({ cameraBaseZoomBonus: 1.5, cameraMomentumZoomBonus: 0.5 })
  },
  {
    baseId: 'cunning_ape_totem',
    icon: 'FAIL',
    kind: 'passive',
    slot: null,
    category: 'utility',
    unlockScore: 20,
    name: loc('Totem du Déni', 'Denial Totem'),
    description: loc('Empêche les grades Raté.', 'Prevent Fail landings.'),
    hudIconSrc: HUD_ICON_URLS.totem,
    boatVisual: null,
    statsByRarity: passiveStats({ preventFail: true })
  },
  {
    baseId: 'living_treasure_map',
    icon: 'RWD',
    kind: 'passive',
    slot: null,
    category: 'economy',
    unlockScore: 20,
    name: loc('Trèfle à 3 feuilles et demi', 'Three-and-a-Half Leaf Clover'),
    description: loc('Augmente les chances de croiser une plateforme de récompense.', 'Increase reward shard odds.'),
    hudIconSrc: HUD_ICON_URLS.perroquet,
    boatVisual: null,
    statsByRarity: passiveStats({ rewardChance: 0.33 })
  },
  {
    baseId: 'freebooter_compass',
    icon: 'GRD',
    kind: 'passive',
    slot: null,
    category: 'utility',
    unlockScore: 20,
    name: loc('L’Angle-mort', 'Blind Angle'),
    description: loc('Agrandit légèrement les fenêtres Bon et Super.', 'Slightly widen Good and Super timing windows.'),
    hudIconSrc: HUD_ICON_URLS.compas,
    boatVisual: null,
    statsByRarity: passiveStats({ gradeWindowBonus: 0.1 })
  },
  {
    baseId: 'lucky_monkey_tail',
    icon: 'LCK',
    kind: 'passive',
    slot: null,
    category: 'momentum',
    unlockScore: 20,
    name: loc('Amortisseurs', 'Shock Absorbers'),
    description: loc('Réduit la perte de momentum après un mauvais atterrissage.', 'Reduce momentum loss after awkward landings.'),
    hudIconSrc: HUD_ICON_URLS.amortisseurs,
    boatVisual: null,
    statsByRarity: passiveStats({ landingPenaltyReduction: 0.40 })
  },
  {
    baseId: 'merchant_parrot',
    icon: 'PAR',
    kind: 'passive',
    slot: null,
    category: 'economy',
    unlockScore: 20,
    name: loc('Abonnement Prémium', 'Premium Card'),
    description: loc('Augmente la chance de croiser un marchand.', 'Increase shop odds.'),
    hudIconSrc: HUD_ICON_URLS.carte_tresor,
    boatVisual: null,
    statsByRarity: passiveStats({ shopChance: 0.22 })
  },
  {
    baseId: 'gravity_belt',
    icon: 'BLT',
    kind: 'passive',
    slot: null,
    category: 'utility',
    unlockScore: 0,
    name: loc('Ceinture d’orbite', 'Orbit Belt'),
    description: loc('Ramène progressivement la trajectoire du joueur vers le centre quand l’orbite dérive trop vers le haut ou le bas.', 'Gradually pull the player trajectory back toward center when orbit drifts too far up or down.'),
    hudIconSrc: HUD_ICON_URLS.ceinture,
    boatVisual: null,
    statsByRarity: passiveStats({ gravityCentering: 0.82 })
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
    description: loc('Stabilise le bateau et prolonge le plané.', 'Stabilize the boat and extend glide.'),
    hudIconSrc: HUD_ICON_URLS.plane,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.plane, columns: 2, rows: 2, layerOrder: 30 },
    statsByRarity: rarityStats({
      common: { planeGlide: 0.40, planeStability: 0.25 },
      uncommon: { planeGlide: 0.42, planeStability: 0.25 },
      rare: { planeGlide: 0.45, planeStability: 0.25 },
      epic: { planeGlide: 0.48, planeStability: 0.25 },
      legendary: { planeGlide: 0.5, planeStability: 0.25 }
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
    description: loc('ajoute une poussée dans les airs diagonale.', 'Add a diagonal air thrust.'),
    hudIconSrc: HUD_ICON_URLS.wings,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.wings, columns: 4, rows: 2, layerOrder: 90 },
    chargesByRarity: { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 },
    statsByRarity: rarityStats({
      common: { propulsionPower: 5 },
      uncommon: { propulsionPower: 5 },
      rare: { propulsionPower: 5 },
      epic: { propulsionPower: 5 },
      legendary: { propulsionPower: 6 }
    })
  },
  {
    baseId: 'propulseur',
    icon: 'PRP',
    kind: 'module',
    slot: 'propulseur',
    category: 'mobility',
    unlockScore: 0,
    name: loc('Propulseur', 'Thruster'),
    description: loc('ajoute une poussée dans les airs horizontal.', 'Add a horizontal air thrust.'),
    hudIconSrc: HUD_ICON_URLS.propulseur,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.propulseur, columns: 2, rows: 2, layerOrder: 12 },
    chargesByRarity: { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 },
    statsByRarity: rarityStats({
      common: { propulsionPower: 5 },
      uncommon: { propulsionPower: 5 },
      rare: { propulsionPower: 5 },
      epic: { propulsionPower: 5 },
      legendary: { propulsionPower: 6 }
    })
  },
  {
    baseId: 'reacteur_front',
    icon: 'FRT',
    kind: 'module',
    slot: 'reacteur_front',
    category: 'mobility',
    unlockScore: 10,
    name: loc('Réacteur avant', 'Front Reactor'),
    description: loc('Ajoute un poussée dans les airs en verticale.', 'Add a vertical air thrust.'),
    hudIconSrc: HUD_ICON_URLS.reacteur_front,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.reacteur_front, columns: 2, rows: 2, layerOrder: 42 },
    chargesByRarity: { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 },
    statsByRarity: rarityStats({
      common: { propulsionPower: 5 },
      uncommon: { propulsionPower: 5 },
      rare: { propulsionPower: 5 },
      epic: { propulsionPower: 6 },
      legendary: { propulsionPower: 6 }
    })
  },
  {
    baseId: 'reacteur_back',
    icon: 'BAK',
    kind: 'module',
    slot: 'reacteur_back',
    category: 'mobility',
    unlockScore: 10,
    name: loc('Réacteur arrière', 'Back Reactor'),
    description: loc('Ajoute un poussée dans les airs en diagonale.', 'Add a diagonal air thrust.'),
    hudIconSrc: HUD_ICON_URLS.reacteur_back,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.reacteur_back, columns: 2, rows: 2, layerOrder: 38 },
    chargesByRarity: { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 },
    statsByRarity: rarityStats({
      common: { propulsionPower: 5 },
      uncommon: { propulsionPower: 5 },
      rare: { propulsionPower: 5 },
      epic: { propulsionPower: 5 },
      legendary: { propulsionPower: 6 }
    })
  },
  {
    baseId: 'shield',
    icon: 'SHD',
    kind: 'module',
    slot: 'shield',
    category: 'combat',
    unlockScore: 10,
    name: loc('Bouclier', 'Shield'),
    description: loc('Protège contre un contact ennemi de front.', 'Protects against enemy contact front.'),
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
    description: loc('Ajoute un boost de vitesse', 'Add a speed boost.'),
    hudIconSrc: HUD_ICON_URLS.souffleur,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.souffleur, columns: 2, rows: 2, layerOrder: 54 },
    gaugeConfig: {
      common: { capacity: 2, regenPerSecond: 0.28, regenDelay: 1.2, emptyDelay: 2.0 },
      uncommon: { capacity: 2.5, regenPerSecond: 0.34, regenDelay: 1.1, emptyDelay: 2.0 },
      rare: { capacity: 3, regenPerSecond: 0.38, regenDelay: 1, emptyDelay: 2 },
      epic: { capacity: 4, regenPerSecond: 0.44, regenDelay: 0.9, emptyDelay: 1.5 },
      legendary: { capacity: 5, regenPerSecond: 0.5, regenDelay: 0.8, emptyDelay: 1.0 }
    },
    statsByRarity: rarityStats({
      common: { propulsionPower: 2, gaugeCapacity: 2, gaugeRegenPerSecond: 0.28 },
      uncommon: { propulsionPower: 2.5, gaugeCapacity: 2.5, gaugeRegenPerSecond: 0.34 },
      rare: { propulsionPower: 3, gaugeCapacity: 3, gaugeRegenPerSecond: 0.38 },
      epic: { propulsionPower: 4, gaugeCapacity: 4, gaugeRegenPerSecond: 0.44 },
      legendary: { propulsionPower: 5, gaugeCapacity: 5, gaugeRegenPerSecond: 0.5 }
    })
  },
  {
    baseId: 'wrapper',
    icon: 'WRP',
    kind: 'module',
    slot: 'wrapper',
    category: 'utility',
    unlockScore: 10,
    name: loc('Téléporteur', 'Wrapper'),
    description: loc('Téléporte vers une projet inconnue', 'Teleport forward to a unknown project'),
    hudIconSrc: HUD_ICON_URLS.wrapper,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.wrapper, columns: 2, rows: 2, layerOrder: 80 },
    statsByRarity: rarityStats({
      common: { wrapperDistance: 20 },
      uncommon: { wrapperDistance: 30 },
      rare: { wrapperDistance: 40 },
      epic: { wrapperDistance: 50 },
      legendary: { wrapperDistance: 100 }
    })
  },
  {
    baseId: 'magnet',
    icon: 'MAG',
    kind: 'module',
    slot: 'magnet',
    category: 'economy',
    unlockScore: 10,
    name: loc('Aimant', 'Magnet'),
    description: loc('Attire et récupère les pièces à plus grande distance.', 'Pull in and collect coins from farther away.'),
    hudIconSrc: HUD_ICON_URLS.magnet,
    boatVisual: { spriteSheetUrl: MODULE_SHEET_URLS.magnet, columns: 2, rows: 2, layerOrder: 44 },
    statsByRarity: rarityStats({
      common: { magnetRange: 0.3 },
      uncommon: { magnetRange: 0.4 },
      rare: { magnetRange: 0.6 },
      epic: { magnetRange: 0.8 },
      legendary: { magnetRange: 1.0 }
    })
  },
  {
    baseId: 'big_canon',
    icon: 'BGC',
    kind: 'module',
    slot: 'big_canon',
    category: 'combat',
    unlockScore: 10,
    name: loc('Grand canon', 'Big Cannon'),
    description: loc('Tire automatiquement quand un ennemi est dans la zone.', 'Auto-fire inside a large radial zone.'),
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
    name: loc('Canon frontal', 'Front Cannon'),
    description: loc('Tire automatiquement quand un ennemi est devant le bateau.', 'Auto-fire when an enemy is in front of the boat.'),
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
    description: loc('Un grappin quoi...', 'Just a grappling hook.'),
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
  common: loc('Commun', 'Common'),
  uncommon: loc('Peu commun', 'Uncommon'),
  rare: loc('Rare', 'Rare'),
  epic: loc('Épique', 'Epic'),
  legendary: loc('Légendaire', 'Legendary')
};

export const rogueliteItems: RogueliteItemDefinition[] = ITEM_BLUEPRINTS.flatMap((blueprint) =>
  blueprint.kind === 'passive'
    ? [createItemDefinition(blueprint, 'common')]
    : (Object.keys(rarityRank) as RogueliteRarity[]).map((rarity) => createItemDefinition(blueprint, rarity))
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
    cameraBaseZoomBonus: 0,
    cameraMomentumZoomBonus: 0,
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
    gravityCentering: 0,
    shockwaveDamping: 0,
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
    if (stats.preventFail) runState.modifiers.failSafe = true;
    if (stats.rewardChance) runState.modifiers.rewardChance += stats.rewardChance;
    if (stats.gradeWindowBonus) runState.modifiers.gradeWindowBonus += stats.gradeWindowBonus;
    if (stats.landingPenaltyReduction) runState.modifiers.landingPenaltyReduction += stats.landingPenaltyReduction;
    if (stats.shopChance) runState.modifiers.shopChance += stats.shopChance;
    if (stats.cameraBaseZoomBonus) runState.modifiers.cameraBaseZoomBonus += stats.cameraBaseZoomBonus;
    if (stats.cameraMomentumZoomBonus) runState.modifiers.cameraMomentumZoomBonus += stats.cameraMomentumZoomBonus;
    if (stats.gravityCentering) runState.modifiers.gravityCentering += stats.gravityCentering;
    if (stats.shockwaveDamping) runState.modifiers.shockwaveDamping += stats.shockwaveDamping;
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
  runState.modifiers.cameraBaseZoomBonus = Math.min(2.4, runState.modifiers.cameraBaseZoomBonus);
  runState.modifiers.cameraMomentumZoomBonus = Math.min(0.8, runState.modifiers.cameraMomentumZoomBonus);
  runState.modifiers.gravityCentering = Math.min(1.6, runState.modifiers.gravityCentering);
  runState.modifiers.shockwaveDamping = Math.min(0.82, runState.modifiers.shockwaveDamping);
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

function passiveStats(stats: RogueliteItemStats) {
  return rarityStats({
    common: stats,
    uncommon: stats,
    rare: stats,
    epic: stats,
    legendary: stats
  });
}
