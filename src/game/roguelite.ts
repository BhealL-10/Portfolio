import type { LocalizedText } from '../types/content';

export type RogueliteRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface RogueliteItemDefinition {
  id: string;
  icon: string;
  rarity: RogueliteRarity;
  unlockScore: number;
  stackable: boolean;
  maxStacks: number;
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
}

export interface RunUpgradeState {
  counts: Record<string, number>;
  ownedOrder: string[];
  modifiers: PlayerModifierStack;
}

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
    warpCooldown: 30,
    rocketBurst: false,
    rocketBurstCooldown: 25,
    rocketBurstPower: 0,
    airDashCharges: 0,
    airDashPower: 0,
    momentumRetention: 0,
    infiniteFlaps: false
  };
}

export const rarityLabels: Record<RogueliteRarity, LocalizedText> = {
  common: { fr: 'Common', en: 'Common' },
  uncommon: { fr: 'Uncommon', en: 'Uncommon' },
  rare: { fr: 'Rare', en: 'Rare' },
  epic: { fr: 'Epic', en: 'Epic' },
  legendary: { fr: 'Legendary', en: 'Legendary' }
};

export const rogueliteItems: RogueliteItemDefinition[] = [
  {
    id: 'light_glide',
    icon: 'GLD',
    rarity: 'common',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    name: { fr: 'Light Glide', en: 'Light Glide' },
    description: { fr: 'Ralentit legerement la chute.', en: 'Slightly reduces fall speed.' }
  },
  {
    id: 'stable_landing',
    icon: 'LND',
    rarity: 'common',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    name: { fr: 'Stable Landing', en: 'Stable Landing' },
    description: { fr: 'Augmente legerement la tolerance d atterrissage.', en: 'Small bonus to landing tolerance.' }
  },
  {
    id: 'light_momentum',
    icon: 'MOM',
    rarity: 'common',
    unlockScore: 0,
    stackable: true,
    maxStacks: 5,
    name: { fr: 'Light Momentum', en: 'Light Momentum' },
    description: { fr: 'La charge monte un peu plus vite.', en: 'Charge builds momentum slightly faster.' }
  },
  {
    id: 'minor_thrusters',
    icon: 'THR',
    rarity: 'common',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    name: { fr: 'Minor Thrusters', en: 'Minor Thrusters' },
    description: { fr: 'Ameliore legerement le controle aerien.', en: 'Tiny air control increase.' }
  },
  {
    id: 'extended_grip',
    icon: 'GRP',
    rarity: 'common',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    name: { fr: 'Extended Grip', en: 'Extended Grip' },
    description: { fr: 'Agrandit legerement la zone de capture.', en: 'Slightly larger shard capture radius.' }
  },
  {
    id: 'balanced_jump',
    icon: 'JMP',
    rarity: 'common',
    unlockScore: 0,
    stackable: true,
    maxStacks: 4,
    name: { fr: 'Balanced Jump', en: 'Balanced Jump' },
    description: { fr: 'Petit bonus de puissance de saut.', en: 'Small boost to jump power.' }
  },
  {
    id: 'double_jump',
    icon: 'DJP',
    rarity: 'uncommon',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Double Jump', en: 'Double Jump' },
    description: { fr: 'Ajoute un saut supplementaire en l air.', en: 'Allows one additional jump in the air.' }
  },
  {
    id: 'long_glide',
    icon: 'LGD',
    rarity: 'uncommon',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    name: { fr: 'Long Glide', en: 'Long Glide' },
    description: { fr: 'Le glide devient nettement plus efficace.', en: 'Gliding lasts longer.' }
  },
  {
    id: 'charged_leap',
    icon: 'CLP',
    rarity: 'uncommon',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    name: { fr: 'Charged Leap', en: 'Charged Leap' },
    description: { fr: 'Les charges hautes donnent un saut plus puissant.', en: 'Jump strength increases when charge is high.' }
  },
  {
    id: 'air_stabilizer',
    icon: 'AIR',
    rarity: 'uncommon',
    unlockScore: 0,
    stackable: true,
    maxStacks: 3,
    name: { fr: 'Air Stabilizer', en: 'Air Stabilizer' },
    description: { fr: 'Renforce fortement le controle aerien.', en: 'Improves mid-air direction control.' }
  },
  {
    id: 'phase_jump',
    icon: 'PHS',
    rarity: 'rare',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Phase Jump', en: 'Phase Jump' },
    description: { fr: 'Sauve une capture ratee toutes les 20 secondes.', en: 'Every 20 seconds you can phase through one miss.' }
  },
  {
    id: 'teleport_pulse',
    icon: 'TLP',
    rarity: 'rare',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Teleport Pulse', en: 'Teleport Pulse' },
    description: { fr: 'Teleportation de 10 shards sur cooldown.', en: 'Teleport forward 10 shards every 30 seconds.' }
  },
  {
    id: 'rocket_burst',
    icon: 'RKT',
    rarity: 'rare',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Rocket Burst', en: 'Rocket Burst' },
    description: { fr: 'Un saut tres charge declenche un boost fusée.', en: 'A fully charged jump can trigger a short rocket burst.' }
  },
  {
    id: 'air_dash',
    icon: 'DSH',
    rarity: 'rare',
    unlockScore: 0,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Air Dash', en: 'Air Dash' },
    description: { fr: 'Ajoute un dash unique pendant un segment aerien.', en: 'Dash once while airborne.' }
  },
  {
    id: 'infinite_glide',
    icon: 'IFG',
    rarity: 'epic',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Infinite Glide', en: 'Infinite Glide' },
    description: { fr: 'Le glide devient extremement efficace.', en: 'Gliding becomes extremely efficient.' }
  },
  {
    id: 'triple_jump',
    icon: 'TJP',
    rarity: 'epic',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Triple Jump', en: 'Triple Jump' },
    description: { fr: 'Ajoute deux sauts supplementaires.', en: 'Allows two extra jumps.' }
  },
  {
    id: 'momentum_overdrive',
    icon: 'OVR',
    rarity: 'epic',
    unlockScore: 50,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Momentum Overdrive', en: 'Momentum Overdrive' },
    description: { fr: 'La charge gagne enormement en vitesse.', en: 'Charge speed becomes dramatically faster.' }
  },
  {
    id: 'warp_core',
    icon: 'WRP',
    rarity: 'legendary',
    unlockScore: 100,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Warp Core', en: 'Warp Core' },
    description: { fr: 'Teleportation de 20 shards sur long cooldown.', en: 'Teleport forward 20 shards every 30 seconds.' }
  },
  {
    id: 'icar_engine',
    icon: 'ICR',
    rarity: 'legendary',
    unlockScore: 100,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Icar Engine', en: 'Icar Engine' },
    description: { fr: 'Transforme les sauts en flaps aeriens repetables.', en: 'Turns the run into repeated flappy-like air jumps.' }
  },
  {
    id: 'orbital_wings',
    icon: 'WNG',
    rarity: 'legendary',
    unlockScore: 100,
    stackable: false,
    maxStacks: 1,
    name: { fr: 'Orbital Wings', en: 'Orbital Wings' },
    description: { fr: 'Le glide devient presque infini.', en: 'Player can glide almost indefinitely.' }
  }
];

const rarityWeights: Record<RogueliteRarity, number> = {
  common: 56,
  uncommon: 28,
  rare: 12,
  epic: 3,
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
  const pool = rogueliteItems.filter((item) => {
    if (!allowed.has(item.rarity)) return false;
    if (score < item.unlockScore) return false;
    const owned = runState.counts[item.id] ?? 0;
    if (!item.stackable && owned > 0) return false;
    if (item.stackable && owned >= item.maxStacks) return false;
    return true;
  });

  const offers: RogueliteItemOffer[] = [];
  const used = new Set<string>();

  while (offers.length < 3 && pool.length > used.size) {
    const item = pickWeightedItem(pool, allowed, rng, used);
    if (!item) break;
    used.add(item.id);
    offers.push({
      item,
      stackCount: runState.counts[item.id] ?? 0
    });
  }

  return offers;
}

function pickWeightedItem(
  pool: RogueliteItemDefinition[],
  allowed: Set<RogueliteRarity>,
  rng: () => number,
  used: Set<string>
) {
  const eligible = pool.filter((item) => !used.has(item.id) && allowed.has(item.rarity));
  if (eligible.length === 0) return null;

  const totalWeight = eligible.reduce((sum, item) => sum + rarityWeights[item.rarity], 0);
  let cursor = rng() * totalWeight;
  for (const item of eligible) {
    cursor -= rarityWeights[item.rarity];
    if (cursor <= 0) {
      return item;
    }
  }
  return eligible[eligible.length - 1] || null;
}

export function applyItemToRunState(runState: RunUpgradeState, itemId: string) {
  const nextCounts = {
    ...runState.counts,
    [itemId]: (runState.counts[itemId] ?? 0) + 1
  };

  const ownedOrder = runState.ownedOrder.includes(itemId) ? runState.ownedOrder : [...runState.ownedOrder, itemId];
  const nextState: RunUpgradeState = {
    counts: nextCounts,
    ownedOrder,
    modifiers: createDefaultModifiers()
  };

  for (const item of rogueliteItems) {
    const count = nextCounts[item.id] ?? 0;
    if (count <= 0) continue;

    switch (item.id) {
      case 'light_glide':
        nextState.modifiers.glideFactor += 0.18 * count;
        break;
      case 'stable_landing':
        nextState.modifiers.landingTolerance += 0.12 * count;
        break;
      case 'light_momentum':
        nextState.modifiers.chargeRate += 0.16 * count;
        nextState.modifiers.momentumRetention += 0.04 * count;
        break;
      case 'minor_thrusters':
        nextState.modifiers.airControl += 0.08 * count;
        break;
      case 'extended_grip':
        nextState.modifiers.captureRadius += 0.14 * count;
        break;
      case 'balanced_jump':
        nextState.modifiers.jumpPower += 0.14 * count;
        break;
      case 'double_jump':
        nextState.modifiers.extraJumps = Math.max(nextState.modifiers.extraJumps, 1);
        break;
      case 'long_glide':
        nextState.modifiers.glideFactor += 0.34 * count;
        break;
      case 'charged_leap':
        nextState.modifiers.chargedLeapBonus += 0.18 * count;
        break;
      case 'air_stabilizer':
        nextState.modifiers.airControl += 0.2 * count;
        nextState.modifiers.landingTolerance += 0.08 * count;
        break;
      case 'phase_jump':
        nextState.modifiers.phaseJump = true;
        nextState.modifiers.phaseJumpRescueRadius = 2.8;
        nextState.modifiers.phaseJumpCooldown = 20;
        break;
      case 'teleport_pulse':
        nextState.modifiers.teleportRange = 10;
        nextState.modifiers.teleportCooldown = 30;
        break;
      case 'rocket_burst':
        nextState.modifiers.rocketBurst = true;
        nextState.modifiers.rocketBurstCooldown = 25;
        nextState.modifiers.rocketBurstPower = 5.2;
        break;
      case 'air_dash':
        nextState.modifiers.airDashCharges = Math.max(nextState.modifiers.airDashCharges, 1);
        nextState.modifiers.airDashPower = 4.6;
        break;
      case 'infinite_glide':
        nextState.modifiers.glideFactor += 0.85;
        break;
      case 'triple_jump':
        nextState.modifiers.extraJumps = Math.max(nextState.modifiers.extraJumps, 2);
        break;
      case 'momentum_overdrive':
        nextState.modifiers.chargeRate += 0.58;
        nextState.modifiers.momentumRetention += 0.12;
        break;
      case 'warp_core':
        nextState.modifiers.warpRange = 20;
        nextState.modifiers.warpCooldown = 30;
        break;
      case 'icar_engine':
        nextState.modifiers.infiniteFlaps = true;
        nextState.modifiers.extraJumps = Math.max(nextState.modifiers.extraJumps, 2);
        break;
      case 'orbital_wings':
        nextState.modifiers.glideFactor += 1.2;
        break;
      default:
        break;
    }
  }

  nextState.modifiers.glideFactor = Math.min(1.75, nextState.modifiers.glideFactor);
  nextState.modifiers.captureRadius = Math.min(1.1, nextState.modifiers.captureRadius);
  nextState.modifiers.airControl = Math.min(0.65, nextState.modifiers.airControl);
  nextState.modifiers.jumpPower = Math.min(1.75, nextState.modifiers.jumpPower);
  nextState.modifiers.chargeRate = Math.min(2.25, nextState.modifiers.chargeRate);
  nextState.modifiers.chargedLeapBonus = Math.min(0.55, nextState.modifiers.chargedLeapBonus);
  nextState.modifiers.momentumRetention = Math.min(0.32, nextState.modifiers.momentumRetention);

  return nextState;
}
