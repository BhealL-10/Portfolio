import type { LocalizedText } from '../types/content';

export type RogueliteRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type RogueliteCategory = 'momentum' | 'mobility' | 'combat' | 'economy' | 'utility';

export interface RogueliteItemDefinition {
  id: string;
  icon: string;
  rarity: RogueliteRarity;
  category: RogueliteCategory;
  unlockScore: number;
  stackable: boolean;
  maxStacks: number;
  effects: string[];
  name: LocalizedText;
  description: LocalizedText;
}

export interface RogueliteItemOffer {
  item: RogueliteItemDefinition;
  stackCount: number;
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
  autoCannonLevel: number;
  enemyDamageBonus: number;
  timeSlowFactor: number;
  gravityInverter: boolean;
  phantomLanding: boolean;
  chaosWarp: boolean;
  rareItemBias: number;
  extraCoinSlots: number;
  momentumRedirect: number;
}

export interface RunUpgradeState {
  counts: Record<string, number>;
  ownedOrder: string[];
  modifiers: PlayerModifierStack;
}

const loc = (fr: string, en: string): LocalizedText => ({ fr, en });

const item = (definition: RogueliteItemDefinition) => definition;

export function createRunUpgradeState(): RunUpgradeState {
  return {
    counts: {},
    ownedOrder: [],
    modifiers: createDefaultModifiers()
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
    autoCannonLevel: 0,
    enemyDamageBonus: 0,
    timeSlowFactor: 0,
    gravityInverter: false,
    phantomLanding: false,
    chaosWarp: false,
    rareItemBias: 0,
    extraCoinSlots: 0,
    momentumRedirect: 0
  };
}

export const rarityLabels: Record<RogueliteRarity, LocalizedText> = {
  common: loc('Common', 'Common'),
  uncommon: loc('Uncommon', 'Uncommon'),
  rare: loc('Rare', 'Rare'),
  epic: loc('Epic', 'Epic'),
  legendary: loc('Legendary', 'Legendary')
};

export const rogueliteItems: RogueliteItemDefinition[] = [
  item({
    id: 'overdrive_core',
    icon: 'OVC',
    rarity: 'common',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 5,
    effects: ['momentum_gain'],
    name: loc('Overdrive Core', 'Overdrive Core'),
    description: loc('Augmente le gain de momentum.', 'Increase momentum gain.')
  }),
  item({
    id: 'gyro_stabilizer',
    icon: 'GYR',
    rarity: 'common',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    effects: ['momentum_decay_down'],
    name: loc('Gyro Stabilizer', 'Gyro Stabilizer'),
    description: loc('Le momentum retombe moins vite.', 'Momentum decays more slowly.')
  }),
  item({
    id: 'hyper_boost',
    icon: 'HPB',
    rarity: 'uncommon',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['speed_bonus', 'jump_bonus'],
    name: loc('Hyper Boost', 'Hyper Boost'),
    description: loc('Chaque chaîne réussie pousse plus loin.', 'Successful chains grant extra speed and jump power.')
  }),
  item({
    id: 'kinetic_engine',
    icon: 'KIN',
    rarity: 'uncommon',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['landing_tolerance', 'momentum_gain'],
    name: loc('Kinetic Engine', 'Kinetic Engine'),
    description: loc('Préserve mieux l’élan à l’atterrissage.', 'Preserve more speed on landing.')
  }),
  item({
    id: 'momentum_capacitor',
    icon: 'CAP',
    rarity: 'rare',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['momentum_cap'],
    name: loc('Momentum Capacitor', 'Momentum Capacitor'),
    description: loc('Augmente la capacité maximale de momentum.', 'Increase the maximum momentum gauge.')
  }),
  item({
    id: 'chain_amplifier',
    icon: 'CHN',
    rarity: 'rare',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['momentum_gain', 'charge_rate'],
    name: loc('Chain Amplifier', 'Chain Amplifier'),
    description: loc('Les enchaînements remplissent plus fort la jauge.', 'Chains fill the gauge more efficiently.')
  }),
  item({
    id: 'velocity_loop',
    icon: 'VLP',
    rarity: 'common',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    effects: ['speed_bonus'],
    name: loc('Velocity Loop', 'Velocity Loop'),
    description: loc('Augmente légèrement la vitesse globale.', 'Light permanent speed increase.')
  }),
  item({
    id: 'gravity_skimmer',
    icon: 'GSK',
    rarity: 'uncommon',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['glide', 'momentum_decay_down'],
    name: loc('Gravity Skimmer', 'Gravity Skimmer'),
    description: loc('Conserve mieux la vitesse après une trajectoire faible.', 'Retain more speed after awkward landings.')
  }),
  item({
    id: 'turbo_reactor',
    icon: 'TRB',
    rarity: 'rare',
    category: 'momentum',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    effects: ['rocket_burst'],
    name: loc('Turbo Reactor', 'Turbo Reactor'),
    description: loc('Déclenche des poussées sur les gros sauts.', 'Trigger a burst on high-energy launches.')
  }),
  item({
    id: 'speed_matrix',
    icon: 'SPD',
    rarity: 'common',
    category: 'momentum',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    effects: ['speed_bonus'],
    name: loc('Speed Matrix', 'Speed Matrix'),
    description: loc('Accélère légèrement le run.', 'Permanent +10% run speed feel.')
  }),

  item({
    id: 'double_jump_module',
    icon: 'DJP',
    rarity: 'uncommon',
    category: 'mobility',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    effects: ['extra_jump'],
    name: loc('Double Jump Module', 'Double Jump Module'),
    description: loc('Ajoute un saut en l’air.', 'Add one extra jump.')
  }),
  item({
    id: 'triple_jump_module',
    icon: 'TJP',
    rarity: 'epic',
    category: 'mobility',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['extra_jump_2'],
    name: loc('Triple Jump Module', 'Triple Jump Module'),
    description: loc('Ajoute deux sauts en l’air.', 'Add two extra jumps.')
  }),
  item({
    id: 'air_dash_thrusters',
    icon: 'ADS',
    rarity: 'rare',
    category: 'mobility',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    effects: ['air_dash'],
    name: loc('Air Dash Thrusters', 'Air Dash Thrusters'),
    description: loc('Permet un dash aérien court.', 'Add one short airborne dash.')
  }),
  item({
    id: 'glide_wings',
    icon: 'GLD',
    rarity: 'common',
    category: 'mobility',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    effects: ['glide'],
    name: loc('Glide Wings', 'Glide Wings'),
    description: loc('Réduit la chute en vol.', 'Reduce fall speed while airborne.')
  }),
  item({
    id: 'long_glide_core',
    icon: 'LGC',
    rarity: 'uncommon',
    category: 'mobility',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['glide'],
    name: loc('Long Glide Core', 'Long Glide Core'),
    description: loc('Glide beaucoup plus longtemps.', 'Make gliding significantly stronger.')
  }),
  item({
    id: 'magnetic_orbit',
    icon: 'MGO',
    rarity: 'uncommon',
    category: 'mobility',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    effects: ['capture_radius'],
    name: loc('Magnetic Orbit', 'Magnetic Orbit'),
    description: loc('La capture des shards est plus facile.', 'Increase shard capture radius.')
  }),
  item({
    id: 'momentum_redirector',
    icon: 'MRD',
    rarity: 'common',
    category: 'mobility',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    effects: ['air_control'],
    name: loc('Momentum Redirector', 'Momentum Redirector'),
    description: loc('Permet de corriger plus vite les angles.', 'Improve air control and redirect sharper.')
  }),
  item({
    id: 'teleport_pulse',
    icon: 'TLP',
    rarity: 'rare',
    category: 'mobility',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    effects: ['teleport'],
    name: loc('Teleport Pulse', 'Teleport Pulse'),
    description: loc('Téléporte plus loin sur un long cooldown.', 'Teleport forward every 30 seconds.')
  }),
  item({
    id: 'warp_blink',
    icon: 'WRP',
    rarity: 'rare',
    category: 'mobility',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    effects: ['warp'],
    name: loc('Warp Blink', 'Warp Blink'),
    description: loc('Ajoute un blink de secours plus court.', 'Add a shorter emergency warp.')
  }),
  item({
    id: 'anti_gravity_boots',
    icon: 'AGB',
    rarity: 'uncommon',
    category: 'mobility',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['jump_bonus', 'glide'],
    name: loc('Anti-Gravity Boots', 'Anti-Gravity Boots'),
    description: loc('Allège les sauts et adoucit la chute.', 'Lighten jumps and soften falling.')
  }),

  item({
    id: 'auto_cannon',
    icon: 'CAN',
    rarity: 'rare',
    category: 'combat',
    unlockScore: 20,
    stackable: false,
    maxStacks: 1,
    effects: ['auto_fire'],
    name: loc('Auto Cannon', 'Auto Cannon'),
    description: loc('Tire automatiquement sur les ennemis proches.', 'Auto-fire at nearby enemies.')
  }),
  item({
    id: 'laser_turret',
    icon: 'LSR',
    rarity: 'epic',
    category: 'combat',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['auto_fire_plus'],
    name: loc('Laser Turret', 'Laser Turret'),
    description: loc('Renforce fortement les tirs automatiques.', 'Stronger automatic shots.')
  }),
  item({
    id: 'shockwave_landing',
    icon: 'SHK',
    rarity: 'rare',
    category: 'combat',
    unlockScore: 20,
    stackable: true,
    maxStacks: 2,
    effects: ['landing_burst'],
    name: loc('Shockwave Landing', 'Shockwave Landing'),
    description: loc('Un atterrissage rapide nettoie les ennemis proches.', 'Strong landings clear nearby enemies.')
  }),
  item({
    id: 'impact_burst',
    icon: 'IMP',
    rarity: 'rare',
    category: 'combat',
    unlockScore: 20,
    stackable: true,
    maxStacks: 2,
    effects: ['impact_bonus'],
    name: loc('Impact Burst', 'Impact Burst'),
    description: loc('Les frappes rapides deviennent létales.', 'Fast impacts deal lethal damage.')
  }),
  item({
    id: 'drone_companion',
    icon: 'DRN',
    rarity: 'epic',
    category: 'combat',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['auto_fire'],
    name: loc('Drone Companion', 'Drone Companion'),
    description: loc('Un drone ajoute une pression offensive constante.', 'A drone adds constant offensive pressure.')
  }),
  item({
    id: 'plasma_trail',
    icon: 'PLS',
    rarity: 'rare',
    category: 'combat',
    unlockScore: 20,
    stackable: false,
    maxStacks: 1,
    effects: ['trail_damage'],
    name: loc('Plasma Trail', 'Plasma Trail'),
    description: loc('La traînée du joueur devient offensive.', 'Your trail damages enemies behind you.')
  }),
  item({
    id: 'spike_orbit',
    icon: 'SPK',
    rarity: 'uncommon',
    category: 'combat',
    unlockScore: 20,
    stackable: false,
    maxStacks: 1,
    effects: ['orbit_damage'],
    name: loc('Spike Orbit', 'Spike Orbit'),
    description: loc('Tourner sur une shard devient dangereux pour les ennemis.', 'Orbiting around shards damages enemies on contact.')
  }),
  item({
    id: 'pulse_shield',
    icon: 'SHD',
    rarity: 'rare',
    category: 'combat',
    unlockScore: 20,
    stackable: true,
    maxStacks: 2,
    effects: ['shield'],
    name: loc('Pulse Shield', 'Pulse Shield'),
    description: loc('Bloque un impact mortel.', 'Blocks one lethal collision.')
  }),
  item({
    id: 'emp_pulse',
    icon: 'EMP',
    rarity: 'epic',
    category: 'combat',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['emp'],
    name: loc('EMP Pulse', 'EMP Pulse'),
    description: loc('Neutralise brièvement les menaces proches.', 'Temporarily disable nearby enemies.')
  }),
  item({
    id: 'target_lock',
    icon: 'TLK',
    rarity: 'uncommon',
    category: 'combat',
    unlockScore: 20,
    stackable: false,
    maxStacks: 1,
    effects: ['auto_fire_accuracy'],
    name: loc('Target Lock', 'Target Lock'),
    description: loc('Les tirs automatiques ratent moins.', 'Improve auto-fire accuracy.')
  }),

  item({
    id: 'coin_magnet',
    icon: 'CNM',
    rarity: 'common',
    category: 'economy',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    effects: ['coin_magnet'],
    name: loc('Coin Magnet', 'Coin Magnet'),
    description: loc('Attire les pièces plus tôt sur l’orbite.', 'Pull coins toward the player sooner.')
  }),
  item({
    id: 'double_coin',
    icon: 'DBL',
    rarity: 'rare',
    category: 'economy',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    effects: ['double_coin'],
    name: loc('Double Coin', 'Double Coin'),
    description: loc('Double les pièces gagnées.', 'Double all coin rewards.')
  }),
  item({
    id: 'lucky_shard',
    icon: 'LCK',
    rarity: 'uncommon',
    category: 'economy',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['luck'],
    name: loc('Lucky Shard', 'Lucky Shard'),
    description: loc('Augmente légèrement la richesse des runs.', 'Increase general loot luck.')
  }),
  item({
    id: 'treasure_scanner',
    icon: 'TRS',
    rarity: 'uncommon',
    category: 'economy',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['event_luck'],
    name: loc('Treasure Scanner', 'Treasure Scanner'),
    description: loc('Augmente la fréquence des événements utiles.', 'Increase valuable event odds.')
  }),
  item({
    id: 'market_discount',
    icon: 'MKT',
    rarity: 'uncommon',
    category: 'economy',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['shop_discount'],
    name: loc('Market Discount', 'Market Discount'),
    description: loc('Réduit les prix du shop.', 'Lower shop prices.')
  }),
  item({
    id: 'loot_booster',
    icon: 'LBT',
    rarity: 'rare',
    category: 'economy',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    effects: ['coin_bonus'],
    name: loc('Loot Booster', 'Loot Booster'),
    description: loc('Chaque gain donne plus de ressources.', 'Increase resource payouts.')
  }),
  item({
    id: 'golden_orbit',
    icon: 'GLD',
    rarity: 'rare',
    category: 'economy',
    unlockScore: 0,
    stackable: true,
    maxStacks: 2,
    effects: ['extra_coin_slots'],
    name: loc('Golden Orbit', 'Golden Orbit'),
    description: loc('Ajoute plus de pièces sur les trajectoires.', 'Spawn more coins on orbit paths.')
  }),
  item({
    id: 'jackpot_engine',
    icon: 'JPT',
    rarity: 'epic',
    category: 'economy',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['coin_bonus', 'luck'],
    name: loc('Jackpot Engine', 'Jackpot Engine'),
    description: loc('Les gains rares deviennent plus lucratifs.', 'Rare drops pay out harder.')
  }),
  item({
    id: 'rare_item_finder',
    icon: 'RRF',
    rarity: 'epic',
    category: 'economy',
    unlockScore: 50,
    stackable: true,
    maxStacks: 2,
    effects: ['rare_item_bias'],
    name: loc('Rare Item Finder', 'Rare Item Finder'),
    description: loc('Pousse les offres vers de meilleures raretés.', 'Bias future offers toward higher rarity.')
  }),
  item({
    id: 'coin_storm',
    icon: 'CST',
    rarity: 'legendary',
    category: 'economy',
    unlockScore: 100,
    stackable: false,
    maxStacks: 1,
    effects: ['coin_bonus', 'extra_coin_slots'],
    name: loc('Coin Storm', 'Coin Storm'),
    description: loc('Déverse une pluie de pièces dans le run.', 'Flood the run with extra coin value.')
  }),

  item({
    id: 'chaos_warp',
    icon: 'CHW',
    rarity: 'rare',
    category: 'utility',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['chaos_warp'],
    name: loc('Chaos Warp', 'Chaos Warp'),
    description: loc('Ajoute un warp imprévisible mais salvateur.', 'Add a risky emergency warp.')
  }),
  item({
    id: 'shard_splitter',
    icon: 'SPL',
    rarity: 'uncommon',
    category: 'utility',
    unlockScore: 50,
    stackable: true,
    maxStacks: 2,
    effects: ['extra_coin_slots', 'event_luck'],
    name: loc('Shard Splitter', 'Shard Splitter'),
    description: loc('Multiplie les possibilités sur certaines sections.', 'Occasionally create richer shard sections.')
  }),
  item({
    id: 'phase_walk',
    icon: 'PHS',
    rarity: 'rare',
    category: 'utility',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['phase_jump'],
    name: loc('Phase Walk', 'Phase Walk'),
    description: loc('Permet de sauver une capture ratée.', 'Pass through one missed landing on cooldown.')
  }),
  item({
    id: 'time_slow_field',
    icon: 'TSF',
    rarity: 'epic',
    category: 'utility',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['time_slow'],
    name: loc('Time Slow Field', 'Time Slow Field'),
    description: loc('Ralentit légèrement la pression globale.', 'Slightly slow the world around you.')
  }),
  item({
    id: 'mirror_momentum',
    icon: 'MMR',
    rarity: 'rare',
    category: 'utility',
    unlockScore: 50,
    stackable: true,
    maxStacks: 2,
    effects: ['momentum_gain', 'momentum_cap'],
    name: loc('Mirror Momentum', 'Mirror Momentum'),
    description: loc('Amplifie la jauge quand le flow est propre.', 'Amplify gauge growth during clean flow.')
  }),
  item({
    id: 'overclock_core',
    icon: 'OCK',
    rarity: 'epic',
    category: 'utility',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    effects: ['charge_rate', 'speed_bonus'],
    name: loc('Overclock Core', 'Overclock Core'),
    description: loc('Charge plus vite et accélère tout le run.', 'Charge faster and push the whole run faster.')
  }),
  item({
    id: 'gravity_inverter',
    icon: 'GIV',
    rarity: 'legendary',
    category: 'utility',
    unlockScore: 100,
    stackable: false,
    maxStacks: 1,
    effects: ['gravity_invert'],
    name: loc('Gravity Inverter', 'Gravity Inverter'),
    description: loc('Inverse certains comportements de chute en votre faveur.', 'Invert some falling pressure in your favor.')
  }),
  item({
    id: 'phantom_landing',
    icon: 'PHN',
    rarity: 'rare',
    category: 'utility',
    unlockScore: 50,
    stackable: true,
    maxStacks: 2,
    effects: ['phase_jump', 'landing_tolerance'],
    name: loc('Phantom Landing', 'Phantom Landing'),
    description: loc('Ajoute une fenêtre fantôme de rattrapage.', 'Create a ghost landing rescue window.')
  }),
  item({
    id: 'energy_shield',
    icon: 'ENG',
    rarity: 'epic',
    category: 'utility',
    unlockScore: 50,
    stackable: true,
    maxStacks: 2,
    effects: ['shield'],
    name: loc('Energy Shield', 'Energy Shield'),
    description: loc('Ajoute plusieurs charges de protection.', 'Grant multiple protection charges.')
  }),
  item({
    id: 'orbital_wings',
    icon: 'WNG',
    rarity: 'legendary',
    category: 'utility',
    unlockScore: 100,
    stackable: false,
    maxStacks: 1,
    effects: ['infinite_flap', 'glide'],
    name: loc('Orbital Wings', 'Orbital Wings'),
    description: loc('Le vol devient presque libre.', 'Almost remove airborne limitations.')
  })
];

const rarityWeights: Record<RogueliteRarity, number> = {
  common: 56,
  uncommon: 28,
  rare: 11,
  epic: 4,
  legendary: 1
};

function allowedRaritiesForScore(score: number): RogueliteRarity[] {
  if (score < 50) return ['common', 'uncommon', 'rare'];
  if (score < 100) return ['common', 'uncommon', 'rare', 'epic'];
  return ['common', 'uncommon', 'rare', 'epic', 'legendary'];
}

export function getNextUpgradeMilestone(score: number) {
  if (score < 10) return 10;
  if (score < 50) return 50;
  if (score < 100) return 100;
  return Math.ceil((score + 1) / 100) * 100;
}

export function isUpgradeMilestone(score: number) {
  return score === 10 || score === 50 || score === 100 || (score > 100 && score % 100 === 0);
}

export function buildUpgradeOffers(score: number, runState: RunUpgradeState, rng = Math.random): RogueliteItemOffer[] {
  const allowed = new Set(allowedRaritiesForScore(score));
  const pool = rogueliteItems.filter((entry) => {
    if (!allowed.has(entry.rarity)) return false;
    if (score < entry.unlockScore) return false;
    const owned = runState.counts[entry.id] ?? 0;
    if (!entry.stackable && owned > 0) return false;
    if (entry.stackable && owned >= entry.maxStacks) return false;
    return true;
  });

  const offers: RogueliteItemOffer[] = [];
  const used = new Set<string>();
  while (offers.length < 3 && used.size < pool.length) {
    const next = pickWeightedItem(pool, rng, used, runState.modifiers.rareItemBias);
    if (!next) break;
    used.add(next.id);
    offers.push({
      item: next,
      stackCount: runState.counts[next.id] ?? 0
    });
  }

  return offers;
}

function pickWeightedItem(pool: RogueliteItemDefinition[], rng: () => number, used: Set<string>, rareItemBias: number) {
  const eligible = pool.filter((entry) => !used.has(entry.id));
  if (eligible.length === 0) return null;

  const total = eligible.reduce((sum, entry) => sum + getBiasedWeight(entry.rarity, rareItemBias), 0);
  let cursor = rng() * total;
  for (const entry of eligible) {
    cursor -= getBiasedWeight(entry.rarity, rareItemBias);
    if (cursor <= 0) {
      return entry;
    }
  }
  return eligible[eligible.length - 1] ?? null;
}

function getBiasedWeight(rarity: RogueliteRarity, rareItemBias: number) {
  const bias = Math.max(0, rareItemBias);
  if (rarity === 'legendary') return rarityWeights[rarity] * (1 + bias * 4);
  if (rarity === 'epic') return rarityWeights[rarity] * (1 + bias * 2.5);
  if (rarity === 'rare') return rarityWeights[rarity] * (1 + bias);
  return rarityWeights[rarity];
}

export function applyItemToRunState(runState: RunUpgradeState, itemId: string) {
  const counts = {
    ...runState.counts,
    [itemId]: (runState.counts[itemId] ?? 0) + 1
  };
  const ownedOrder = runState.ownedOrder.includes(itemId) ? runState.ownedOrder : [...runState.ownedOrder, itemId];
  const nextState: RunUpgradeState = {
    counts,
    ownedOrder,
    modifiers: createDefaultModifiers()
  };

  for (const entry of rogueliteItems) {
    const owned = counts[entry.id] ?? 0;
    if (owned <= 0) continue;

    switch (entry.id) {
      case 'overdrive_core':
        nextState.modifiers.momentumGain += 0.1 * owned;
        break;
      case 'gyro_stabilizer':
        nextState.modifiers.momentumRetention += 0.08 * owned;
        break;
      case 'hyper_boost':
        nextState.modifiers.speedBonus += 0.08 * owned;
        nextState.modifiers.jumpPower += 0.06 * owned;
        break;
      case 'kinetic_engine':
        nextState.modifiers.landingTolerance += 0.12 * owned;
        nextState.modifiers.momentumGain += 0.05 * owned;
        break;
      case 'momentum_capacitor':
        nextState.modifiers.momentumCap += 0.08 * owned;
        break;
      case 'chain_amplifier':
        nextState.modifiers.momentumGain += 0.06 * owned;
        nextState.modifiers.chargeRate += 0.08 * owned;
        break;
      case 'velocity_loop':
        nextState.modifiers.speedBonus += 0.05 * owned;
        break;
      case 'gravity_skimmer':
        nextState.modifiers.glideFactor += 0.16 * owned;
        nextState.modifiers.momentumRetention += 0.04 * owned;
        break;
      case 'turbo_reactor':
        nextState.modifiers.rocketBurst = true;
        nextState.modifiers.rocketBurstPower = 5.4;
        nextState.modifiers.rocketBurstCooldown = 16;
        break;
      case 'speed_matrix':
        nextState.modifiers.speedBonus += 0.1 * owned;
        break;
      case 'double_jump_module':
        nextState.modifiers.extraJumps = Math.max(nextState.modifiers.extraJumps, 1);
        break;
      case 'triple_jump_module':
        nextState.modifiers.extraJumps = Math.max(nextState.modifiers.extraJumps, 2);
        break;
      case 'air_dash_thrusters':
        nextState.modifiers.airDashCharges = Math.max(nextState.modifiers.airDashCharges, 1);
        nextState.modifiers.airDashPower = 4.8;
        break;
      case 'glide_wings':
        nextState.modifiers.glideFactor += 0.2 * owned;
        break;
      case 'long_glide_core':
        nextState.modifiers.glideFactor += 0.34 * owned;
        break;
      case 'magnetic_orbit':
        nextState.modifiers.captureRadius += 0.12 * owned;
        break;
      case 'momentum_redirector':
        nextState.modifiers.airControl += 0.12 * owned;
        nextState.modifiers.momentumRedirect += 0.1 * owned;
        break;
      case 'teleport_pulse':
        nextState.modifiers.teleportRange = 10;
        nextState.modifiers.teleportCooldown = 30;
        break;
      case 'warp_blink':
        nextState.modifiers.warpRange = 6;
        nextState.modifiers.warpCooldown = 20;
        break;
      case 'anti_gravity_boots':
        nextState.modifiers.glideFactor += 0.12 * owned;
        nextState.modifiers.jumpPower += 0.05 * owned;
        break;
      case 'auto_cannon':
        nextState.modifiers.autoCannonLevel = Math.max(nextState.modifiers.autoCannonLevel, 1);
        break;
      case 'laser_turret':
        nextState.modifiers.autoCannonLevel = Math.max(nextState.modifiers.autoCannonLevel, 2);
        nextState.modifiers.enemyDamageBonus += 1;
        break;
      case 'shockwave_landing':
        nextState.modifiers.enemyDamageBonus += 0.5 * owned;
        break;
      case 'impact_burst':
        nextState.modifiers.enemyDamageBonus += 0.6 * owned;
        break;
      case 'drone_companion':
        nextState.modifiers.autoCannonLevel = Math.max(nextState.modifiers.autoCannonLevel, 1);
        nextState.modifiers.enemyDamageBonus += 0.4;
        break;
      case 'plasma_trail':
        nextState.modifiers.enemyDamageBonus += 0.35;
        break;
      case 'spike_orbit':
        nextState.modifiers.spikeOrbit = true;
        break;
      case 'pulse_shield':
        nextState.modifiers.shieldCharges += 1;
        break;
      case 'emp_pulse':
        nextState.modifiers.enemyDamageBonus += 0.8;
        break;
      case 'target_lock':
        nextState.modifiers.autoCannonLevel = Math.max(nextState.modifiers.autoCannonLevel, 1);
        break;
      case 'coin_magnet':
        nextState.modifiers.coinMagnet += 0.18 * owned;
        break;
      case 'double_coin':
        nextState.modifiers.doubleCoin = true;
        break;
      case 'lucky_shard':
        nextState.modifiers.luck += 0.1 * owned;
        break;
      case 'treasure_scanner':
        nextState.modifiers.eventLuck += 0.1 * owned;
        break;
      case 'market_discount':
        nextState.modifiers.shopDiscount += 0.12 * owned;
        break;
      case 'loot_booster':
        nextState.modifiers.coinBonus += 0.15 * owned;
        break;
      case 'golden_orbit':
        nextState.modifiers.extraCoinSlots += owned;
        break;
      case 'jackpot_engine':
        nextState.modifiers.coinBonus += 0.28;
        nextState.modifiers.luck += 0.12;
        break;
      case 'rare_item_finder':
        nextState.modifiers.rareItemBias += 0.12 * owned;
        break;
      case 'coin_storm':
        nextState.modifiers.coinBonus += 0.35;
        nextState.modifiers.extraCoinSlots += 2;
        break;
      case 'chaos_warp':
        nextState.modifiers.chaosWarp = true;
        nextState.modifiers.warpRange = Math.max(nextState.modifiers.warpRange, 12);
        break;
      case 'shard_splitter':
        nextState.modifiers.extraCoinSlots += owned;
        nextState.modifiers.eventLuck += 0.06 * owned;
        break;
      case 'phase_walk':
        nextState.modifiers.phaseJump = true;
        nextState.modifiers.phaseJumpRescueRadius = 2.8;
        nextState.modifiers.phaseJumpCooldown = 18;
        break;
      case 'time_slow_field':
        nextState.modifiers.timeSlowFactor += 0.12;
        break;
      case 'mirror_momentum':
        nextState.modifiers.momentumGain += 0.12 * owned;
        nextState.modifiers.momentumCap += 0.06 * owned;
        break;
      case 'overclock_core':
        nextState.modifiers.chargeRate += 0.28;
        nextState.modifiers.speedBonus += 0.12;
        break;
      case 'gravity_inverter':
        nextState.modifiers.gravityInverter = true;
        nextState.modifiers.glideFactor += 0.2;
        break;
      case 'phantom_landing':
        nextState.modifiers.phaseJump = true;
        nextState.modifiers.phaseJumpRescueRadius = 2.2;
        nextState.modifiers.landingTolerance += 0.14 * owned;
        nextState.modifiers.phantomLanding = true;
        break;
      case 'energy_shield':
        nextState.modifiers.shieldCharges += 2 * owned;
        break;
      case 'orbital_wings':
        nextState.modifiers.infiniteFlaps = true;
        nextState.modifiers.glideFactor += 0.8;
        break;
      default:
        break;
    }
  }

  nextState.modifiers.glideFactor = Math.min(1.9, nextState.modifiers.glideFactor);
  nextState.modifiers.captureRadius = Math.min(1.25, nextState.modifiers.captureRadius);
  nextState.modifiers.airControl = Math.min(0.85, nextState.modifiers.airControl);
  nextState.modifiers.jumpPower = Math.min(1.9, nextState.modifiers.jumpPower);
  nextState.modifiers.chargeRate = Math.min(2.4, nextState.modifiers.chargeRate);
  nextState.modifiers.chargedLeapBonus = Math.min(0.8, nextState.modifiers.chargedLeapBonus);
  nextState.modifiers.momentumRetention = Math.min(0.72, nextState.modifiers.momentumRetention);
  nextState.modifiers.momentumGain = Math.min(1.2, nextState.modifiers.momentumGain);
  nextState.modifiers.momentumCap = Math.min(1.8, nextState.modifiers.momentumCap);
  nextState.modifiers.coinMagnet = Math.min(0.9, nextState.modifiers.coinMagnet);
  nextState.modifiers.shopDiscount = Math.min(0.45, nextState.modifiers.shopDiscount);
  nextState.modifiers.speedBonus = Math.min(0.9, nextState.modifiers.speedBonus);
  nextState.modifiers.coinBonus = Math.min(1.2, nextState.modifiers.coinBonus);
  nextState.modifiers.luck = Math.min(0.8, nextState.modifiers.luck);
  nextState.modifiers.eventLuck = Math.min(0.6, nextState.modifiers.eventLuck);
  nextState.modifiers.timeSlowFactor = Math.min(0.35, nextState.modifiers.timeSlowFactor);
  nextState.modifiers.rareItemBias = Math.min(0.5, nextState.modifiers.rareItemBias);

  return nextState;
}
