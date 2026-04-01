import type { Language } from '../../types/content';
import { clamp } from '../../core/math';
import type { RogueliteItemDefinition, RogueliteModuleSlot } from '../roguelite';
import { ACHIEVEMENT_REGISTRY, ACHIEVEMENT_REGISTRY_BY_ID } from './AchievementRegistry';
import {
  clearAchievementPersistence,
  readAchievementPersistence,
  readAchievementResetToken,
  type StorageLike,
  writeAchievementPersistence,
  writeAchievementResetToken
} from './AchievementPersistence';
import { ACHIEVEMENT_REWARDS_BY_ID } from './AchievementRewards';
import {
  ACHIEVEMENT_AVATAR_LAYER_LABELS,
  ACHIEVEMENT_CATEGORY_LABELS,
  ACHIEVEMENT_RARITY_EMOJIS,
  ACHIEVEMENT_RARITY_LABELS,
  createDefaultAchievementAvatarUnlocks,
  localizeAchievementText,
  type AchievementCategory,
  type AchievementEntrySnapshot,
  type AchievementPanelSnapshot,
  type AchievementPersistenceState,
  type AchievementRewardDefinition,
  type AchievementRewardSnapshot,
  type AchievementRarity,
  type AchievementToastSnapshot,
  type AchievementUnlockNotification
} from './AchievementTypes';

const CATEGORY_ORDER: AchievementCategory[] = ['progression', 'shards', 'skill', 'momentum', 'combat', 'economy', 'modules'];
const RARITY_ORDER: AchievementRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
const MAIN_MODULE_SLOTS: RogueliteModuleSlot[] = [
  'wings',
  'souffleur',
  'shield',
  'wrapper',
  'grappin',
  'reacteur_front',
  'reacteur_back',
  'plane',
  'magnet',
  'big_canon',
  'front_canon',
  'propulseur'
];

interface AchievementRunState {
  backKills: number;
  landings: number;
  cleanLandingStreak: number;
  twistStreak: number;
  superLandingStreak: number;
  perfectStreak: number;
  landingGradeHistory: LandingAchievementEvent['grade'][];
  perfectTwistCount: number;
  maxMomentumWindowStart: number | null;
  highMomentumWindowStart: number | null;
  lastRecordedSecond: number;
  lastRecordedDistance: number;
  airborneSeconds: number;
  milestoneRewardClaimed: boolean;
  airborneModuleSlots: Set<RogueliteModuleSlot>;
  recentKillTimes: number[];
  recentBackKillTimes: number[];
  recentCanonActivations: Array<{ slot: 'front_canon' | 'big_canon'; atSeconds: number }>;
  mirrorActive: boolean;
}

interface LandingAchievementEvent {
  grade: 'miss' | 'good' | 'super' | 'perfect';
  twist: boolean;
  shapeKind: 'round' | 'oval' | 'triangular';
  isMilestone: boolean;
  inMirror?: boolean;
}

interface EnemyKillAchievementEvent {
  amount?: number;
  fromBehind?: boolean;
  shieldSave?: boolean;
  source?: 'impact' | 'front_canon' | 'big_canon' | 'shield';
  inMirror?: boolean;
  atSeconds?: number;
}

interface ItemAchievementOptions {
  purchased?: boolean;
}

function createRunState(): AchievementRunState {
  return {
    backKills: 0,
    landings: 0,
    cleanLandingStreak: 0,
    twistStreak: 0,
    superLandingStreak: 0,
    perfectStreak: 0,
    landingGradeHistory: [],
    perfectTwistCount: 0,
    maxMomentumWindowStart: null,
    highMomentumWindowStart: null,
    lastRecordedSecond: -1,
    lastRecordedDistance: -1,
    airborneSeconds: 0,
    milestoneRewardClaimed: false,
    airborneModuleSlots: new Set<RogueliteModuleSlot>(),
    recentKillTimes: [],
    recentBackKillTimes: [],
    recentCanonActivations: [],
    mirrorActive: false
  };
}

const DISTANCE_ACHIEVEMENT_IDS = [
  'progress_distance_100',
  'progress_distance_250',
  'progress_distance_500',
  'progress_distance_750',
  'progress_distance_1000',
  'progress_distance_1500',
  'progress_distance_2000',
  'progress_distance_3000',
  'progress_distance_4000',
  'progress_distance_5000'
] as const;

const SURVIVAL_ACHIEVEMENT_IDS = [
  'progress_survive_60',
  'progress_survive_90',
  'progress_survive_120',
  'progress_survive_180',
  'progress_survive_300',
  'progress_survive_900'
] as const;

const LANDING_ACHIEVEMENT_IDS = [
  'shards_land_1',
  'shards_land_10',
  'shards_land_25',
  'shards_land_50',
  'shards_land_100',
  'shards_land_200'
] as const;

const LANDING_CHAIN_ACHIEVEMENT_IDS = [
  'shards_chain_8',
  'shards_chain_12',
  'shards_chain_20',
  'shards_chain_30',
  'shards_chain_40'
] as const;

const EARLY_FAIL_STREAK_ACHIEVEMENT_ID = 'progress_early_fail_streak_5';
const FAIL_STREAK_ACHIEVEMENT_ID = 'progress_fail_streak_10';
const NO_MILESTONE_REWARD_ACHIEVEMENT_ID = 'shards_100_without_milestone_reward';
const AIR_MODULE_COMBO_ACHIEVEMENT_ID = 'modules_air_combo_3';
const REVERSE_LAUNCH_ACHIEVEMENT_IDS = ['progress_reverse_launch_1', 'progress_reverse_launch_5', 'progress_reverse_launch_15'] as const;
const MIRROR_MODE_ACHIEVEMENT_ID = 'mirror_mode_1';
const MIRROR_TOGGLE_ACHIEVEMENT_ID = 'mirror_toggle_3';
const MIRROR_RETURN_ACHIEVEMENT_ID = 'mirror_return_1';

const MILESTONE_ACHIEVEMENT_IDS = ['shards_milestone_1', 'shards_milestone_3', 'shards_milestone_5'] as const;
const TRIANGULAR_SHARD_ACHIEVEMENT_IDS = ['shards_triangular_5', 'shards_triangular_15', 'shards_triangular_30'] as const;
const MIRROR_LANDING_ACHIEVEMENT_IDS = ['mirror_land_5', 'mirror_land_15'] as const;

const TWIST_ACHIEVEMENT_IDS = ['skill_twist_5', 'skill_twist_15', 'skill_twist_30', 'skill_twist_50', 'skill_twist_75', 'skill_twist_150'] as const;
const PERFECT_ACHIEVEMENT_IDS = ['skill_perfect_1', 'skill_perfect_3', 'skill_perfect_10', 'skill_perfect_25', 'skill_perfect_50', 'skill_perfect_100'] as const;
const TWIST_STREAK_ACHIEVEMENT_IDS = ['skill_twist_streak_3', 'skill_twist_streak_5', 'skill_twist_streak_10', 'skill_twist_streak_20'] as const;
const PERFECT_STREAK_ACHIEVEMENT_IDS = ['skill_perfect_streak_2', 'skill_perfect_streak_3', 'skill_perfect_streak_4', 'skill_perfect_streak_6'] as const;
const SUPER_STREAK_ACHIEVEMENT_IDS = ['skill_super_streak_3', 'skill_super_streak_5'] as const;
const CLEAN_STREAK_ACHIEVEMENT_ID = 'skill_clean_streak_8';
const PERFECT_TWIST_ACHIEVEMENT_IDS = ['skill_perfect_twist_3', 'skill_perfect_twist_10'] as const;
const MILESTONE_PERFECT_ACHIEVEMENT_ID = 'skill_milestone_perfect_1';
const GRADE_PATTERN_FAIL_GOOD_SUPER_PERFECT_ID = 'skill_grade_pattern_fail_good_super_perfect';
const GRADE_PATTERN_PERFECT_SUPER_GOOD_MISS_ID = 'skill_grade_pattern_perfect_super_good_miss';
const GRADE_PATTERN_PERFECT_GOOD_PERFECT_ID = 'skill_grade_pattern_perfect_good_perfect';
const MIRROR_PERFECT_ACHIEVEMENT_ID = 'mirror_perfect_3';

const KILL_ACHIEVEMENT_IDS = ['combat_kill_1', 'combat_kill_10', 'combat_kill_25', 'combat_kill_50', 'combat_kill_75', 'combat_kill_150', 'combat_kill_300'] as const;
const BACK_KILL_ACHIEVEMENT_IDS = ['combat_back_run_10', 'combat_back_run_25', 'combat_back_run_50'] as const;
const SHIELD_SAVE_ACHIEVEMENT_IDS = ['combat_shield_save_1', 'combat_shield_save_10', 'combat_shield_save_25'] as const;
const FRONT_CANON_KILL_ACHIEVEMENT_IDS = ['combat_front_canon_kill_10', 'combat_front_canon_kill_25'] as const;
const BIG_CANON_KILL_ACHIEVEMENT_IDS = ['combat_big_canon_kill_10', 'combat_big_canon_kill_25'] as const;
const DOUBLE_KILL_ACHIEVEMENT_ID = 'combat_double_kill_5s';
const TRIPLE_KILL_ACHIEVEMENT_ID = 'combat_triple_kill_5s';
const BACK_DOUBLE_KILL_ACHIEVEMENT_ID = 'combat_back_double_kill_5s';
const MIRROR_KILL_ACHIEVEMENT_ID = 'mirror_kill_5';
const MIRROR_BACK_KILL_ACHIEVEMENT_ID = 'mirror_back_kill_3';

const COIN_ACHIEVEMENT_IDS = ['economy_coins_20', 'economy_coins_100', 'economy_coins_300', 'economy_coins_500', 'economy_coins_700', 'economy_coins_1200'] as const;
const SHOP_ACHIEVEMENT_IDS = ['economy_buy_1', 'economy_buy_5', 'economy_buy_15', 'economy_buy_30'] as const;

const UNIQUE_MODULE_ACHIEVEMENT_IDS = ['modules_unique_3', 'modules_unique_6', 'modules_unique_9', 'modules_unique_12'] as const;
const MOMENTUM_MAX_HOLD_IDS = ['momentum_hold_max_5', 'momentum_hold_max_10', 'momentum_hold_max_20'] as const;
const MOMENTUM_HIGH_HOLD_IDS = ['momentum_hold_high_15', 'momentum_hold_high_45', 'momentum_hold_high_90', 'momentum_hold_high_120'] as const;
const CANON_COMBO_ACHIEVEMENT_IDS = ['modules_canon_combo_1', 'modules_canon_combo_5'] as const;

const MODULE_ACQUISITION_IDS: Partial<Record<RogueliteModuleSlot, string>> = {
  plane: 'modules_plane_1',
  shield: 'modules_shield_1',
  souffleur: 'modules_souffleur_1',
  propulseur: 'modules_propulseur_1',
  reacteur_back: 'modules_reacteur_back_1',
  reacteur_front: 'modules_reacteur_front_1'
};

const MODULE_ACTIVATION_IDS: Partial<Record<RogueliteModuleSlot, readonly string[]>> = {
  grappin: ['modules_grappin_10', 'modules_grappin_40'],
  wrapper: ['modules_wrapper_5', 'modules_wrapper_25'],
  wings: ['modules_wings_10'],
  front_canon: ['modules_front_canon_10', 'modules_front_canon_25'],
  big_canon: ['modules_big_canon_10', 'modules_big_canon_25']
};

function getRarityRank(rarity: AchievementRarity) {
  return RARITY_ORDER.indexOf(rarity);
}

function getRawKey(parts: string[]) {
  return `meta:${parts.join(':')}`;
}

function getEventTimeSeconds(candidate?: number) {
  if (typeof candidate === 'number' && Number.isFinite(candidate)) {
    return candidate;
  }
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now() / 1000;
  }
  return Date.now() / 1000;
}

function trimWindow(values: number[], now: number, windowSeconds: number) {
  return values.filter((value) => now - value <= windowSeconds);
}

function matchesEndingPattern(history: LandingAchievementEvent['grade'][], pattern: LandingAchievementEvent['grade'][]) {
  if (history.length < pattern.length) {
    return false;
  }
  const offset = history.length - pattern.length;
  return pattern.every((grade, index) => history[offset + index] === grade);
}

export class AchievementSystem {
  private readonly storage?: StorageLike | null;
  private readonly pendingUnlocks: AchievementUnlockNotification[] = [];
  private state: AchievementPersistenceState;
  private runState = createRunState();
  private readonly runUnlockedIds: string[] = [];
  private uiVersion = 0;
  private readonly uiCache = new Map<Language, AchievementPanelSnapshot>();
  private mutationChanged = false;

  constructor(storage?: StorageLike | null) {
    this.storage = storage;
    this.state = readAchievementPersistence(storage);
    this.backfillClaimedRewards();
  }

  syncGlobalResetToken(token: string | null | undefined) {
    const normalizedToken = typeof token === 'string' ? token.trim() : '';
    if (!normalizedToken) {
      return false;
    }
    const currentToken = readAchievementResetToken(this.storage);
    if (currentToken === normalizedToken) {
      return false;
    }
    clearAchievementPersistence(this.storage);
    writeAchievementResetToken(normalizedToken, this.storage);
    this.state = readAchievementPersistence(this.storage);
    this.runState = createRunState();
    this.pendingUnlocks.length = 0;
    this.runUnlockedIds.length = 0;
    this.mutationChanged = false;
    this.uiVersion += 1;
    this.uiCache.clear();
    return true;
  }

  resetRun() {
    this.runState = createRunState();
    this.runUnlockedIds.length = 0;
    this.uiVersion += 1;
    this.uiCache.clear();
  }

  recordEnemyKill(event: EnemyKillAchievementEvent = {}) {
    const amount = Math.max(1, Math.trunc(event.amount ?? 1));
    const timestamp = getEventTimeSeconds(event.atSeconds);
    this.mutate(() => {
      this.incrementAll(KILL_ACHIEVEMENT_IDS, amount);
      if (event.fromBehind) {
        this.runState.backKills += amount;
        this.raiseAll(BACK_KILL_ACHIEVEMENT_IDS, this.runState.backKills);
      }
      if (event.shieldSave) {
        this.incrementAll(SHIELD_SAVE_ACHIEVEMENT_IDS, amount);
      }
      if (event.source === 'front_canon') {
        this.incrementAll(FRONT_CANON_KILL_ACHIEVEMENT_IDS, amount);
      }
      if (event.source === 'big_canon') {
        this.incrementAll(BIG_CANON_KILL_ACHIEVEMENT_IDS, amount);
      }
      if (event.inMirror) {
        this.incrementProgress(MIRROR_KILL_ACHIEVEMENT_ID, amount);
        if (event.fromBehind) {
          this.incrementProgress(MIRROR_BACK_KILL_ACHIEVEMENT_ID, amount);
        }
      }
      for (let index = 0; index < amount; index += 1) {
        this.recordKillWindow(timestamp, Boolean(event.fromBehind));
      }
    });
  }

  recordCoinsCollected(amount: number) {
    if (amount <= 0) {
      return;
    }
    this.mutate(() => {
      this.incrementAll(COIN_ACHIEVEMENT_IDS, amount);
    });
  }

  recordItemAcquired(item: Pick<RogueliteItemDefinition, 'kind' | 'slot' | 'rarity' | 'baseId'>, options: ItemAchievementOptions = {}) {
    this.mutate(() => {
      if (options.purchased) {
        this.incrementAll(SHOP_ACHIEVEMENT_IDS, 1);
      }

      if (item.baseId === 'gravity_belt') {
        this.raiseProgress('modules_gravity_belt_1', 1);
      }

      if (item.kind !== 'module' || !item.slot) {
        return;
      }

      if (item.slot === 'propulseur' || item.slot === 'wings' || item.slot === 'reacteur_front' || item.slot === 'reacteur_back') {
        this.runState.airborneModuleSlots.add(item.slot);
        this.raiseProgress(AIR_MODULE_COMBO_ACHIEVEMENT_ID, this.runState.airborneModuleSlots.size);
      }

      if (this.markRawFlag(getRawKey(['module-owned', item.slot]))) {
        const uniqueModules = MAIN_MODULE_SLOTS.reduce((count, slot) => {
          return count + (this.getRawProgress(getRawKey(['module-owned', slot])) > 0 ? 1 : 0);
        }, 0);
        this.raiseAll(UNIQUE_MODULE_ACHIEVEMENT_IDS, uniqueModules);
        const acquisitionId = MODULE_ACQUISITION_IDS[item.slot];
        if (acquisitionId) {
          this.raiseProgress(acquisitionId, 1);
        }
      }

      if (item.rarity === 'rare') {
        this.incrementProgress('modules_rare_1', 1);
        this.incrementProgress('modules_rare_10', 1);
      }
      if (item.rarity === 'legendary') {
        this.incrementProgress('modules_legendary_1', 1);
        this.incrementProgress('modules_legendary_5', 1);
      }
      if (item.rarity === 'epic') {
        this.incrementProgress('modules_epic_1', 1);
      }
    });
  }

  recordModuleActivated(slot: RogueliteModuleSlot, atSeconds?: number) {
    this.mutate(() => {
      const ids = MODULE_ACTIVATION_IDS[slot];
      if (ids) {
        this.incrementAll(ids, 1);
      }

      if (slot === 'front_canon' || slot === 'big_canon') {
        this.recordCanonCombo(slot, getEventTimeSeconds(atSeconds));
      }
    });
  }

  recordLanding(event: LandingAchievementEvent) {
    this.mutate(() => {
      this.runState.landings += 1;
      this.incrementAll(LANDING_ACHIEVEMENT_IDS, 1);

      if (event.isMilestone) {
        this.incrementAll(MILESTONE_ACHIEVEMENT_IDS, 1);
      }
      if (event.shapeKind === 'triangular') {
        this.incrementAll(TRIANGULAR_SHARD_ACHIEVEMENT_IDS, 1);
      }
      if (event.twist) {
        this.runState.twistStreak += 1;
        this.incrementAll(TWIST_ACHIEVEMENT_IDS, 1);
        this.raiseAll(TWIST_STREAK_ACHIEVEMENT_IDS, this.runState.twistStreak);
      } else {
        this.runState.twistStreak = 0;
      }
      if (event.grade === 'super' || event.grade === 'perfect') {
        this.runState.cleanLandingStreak += 1;
      } else {
        this.runState.cleanLandingStreak = 0;
      }
      if (event.grade === 'super') {
        this.runState.superLandingStreak += 1;
      } else {
        this.runState.superLandingStreak = 0;
      }
      if (event.grade === 'perfect') {
        this.runState.perfectStreak += 1;
        this.incrementAll(PERFECT_ACHIEVEMENT_IDS, 1);
        this.incrementProgress('shards_land_300', 1);
        this.raiseAll(PERFECT_STREAK_ACHIEVEMENT_IDS, this.runState.perfectStreak);
        if (event.twist) {
          this.runState.perfectTwistCount += 1;
          this.raiseAll(PERFECT_TWIST_ACHIEVEMENT_IDS, this.runState.perfectTwistCount);
        }
        if (event.isMilestone) {
          this.raiseProgress(MILESTONE_PERFECT_ACHIEVEMENT_ID, 1);
        }
      } else {
        this.runState.perfectStreak = 0;
      }

      this.raiseProgress(CLEAN_STREAK_ACHIEVEMENT_ID, this.runState.cleanLandingStreak);
      this.raiseAll(SUPER_STREAK_ACHIEVEMENT_IDS, this.runState.superLandingStreak);
      this.raiseProgress(LANDING_CHAIN_ACHIEVEMENT_IDS[0], this.runState.cleanLandingStreak);
      this.raiseProgress(LANDING_CHAIN_ACHIEVEMENT_IDS[1], this.runState.cleanLandingStreak);
      this.raiseProgress(LANDING_CHAIN_ACHIEVEMENT_IDS[2], this.runState.perfectStreak);
      this.raiseProgress(LANDING_CHAIN_ACHIEVEMENT_IDS[3], this.runState.perfectStreak);
      this.raiseProgress(LANDING_CHAIN_ACHIEVEMENT_IDS[4], this.runState.perfectStreak);

      this.runState.landingGradeHistory = [...this.runState.landingGradeHistory.slice(-3), event.grade];
      if (matchesEndingPattern(this.runState.landingGradeHistory, ['miss', 'good', 'super', 'perfect'])) {
        this.raiseProgress(GRADE_PATTERN_FAIL_GOOD_SUPER_PERFECT_ID, 1);
      }
      if (matchesEndingPattern(this.runState.landingGradeHistory, ['perfect', 'super', 'good', 'miss'])) {
        this.raiseProgress(GRADE_PATTERN_PERFECT_SUPER_GOOD_MISS_ID, 1);
      }
      if (matchesEndingPattern(this.runState.landingGradeHistory, ['perfect', 'good', 'perfect'])) {
        this.raiseProgress(GRADE_PATTERN_PERFECT_GOOD_PERFECT_ID, 1);
      }

      if (event.inMirror) {
        this.incrementAll(MIRROR_LANDING_ACHIEVEMENT_IDS, 1);
        if (event.grade === 'perfect') {
          this.incrementProgress(MIRROR_PERFECT_ACHIEVEMENT_ID, 1);
        }
      }
    });
  }

  recordDistance(distanceMeters: number) {
    const roundedDistance = Math.max(0, Math.floor(distanceMeters));
    if (roundedDistance <= this.runState.lastRecordedDistance) {
      return;
    }
    this.mutate(() => {
      this.runState.lastRecordedDistance = roundedDistance;
      this.raiseAll(DISTANCE_ACHIEVEMENT_IDS, roundedDistance);
      if (!this.runState.milestoneRewardClaimed && roundedDistance >= 100) {
        this.raiseProgress(NO_MILESTONE_REWARD_ACHIEVEMENT_ID, 1);
      }
    });
  }

  recordMilestoneRewardClaimed() {
    this.runState.milestoneRewardClaimed = true;
  }

  recordReverseLaunchFromAnchor() {
    this.mutate(() => {
      this.incrementAll(REVERSE_LAUNCH_ACHIEVEMENT_IDS, 1);
    });
  }

  recordMirrorModeToggled(enabled: boolean) {
    this.mutate(() => {
      if (enabled) {
        this.raiseProgress(MIRROR_MODE_ACHIEVEMENT_ID, 1);
      } else if (this.runState.mirrorActive) {
        this.raiseProgress(MIRROR_RETURN_ACHIEVEMENT_ID, 1);
      }
      const toggleCount = this.getRawProgress(getRawKey(['mirror-toggle-count'])) + 1;
      this.setRawProgress(getRawKey(['mirror-toggle-count']), toggleCount);
      this.raiseProgress(MIRROR_TOGGLE_ACHIEVEMENT_ID, toggleCount);
      this.runState.mirrorActive = enabled;
    });
  }

  recordRunEnded(distanceMeters: number) {
    this.mutate(() => {
      const nextFailStreak = this.getRawProgress(getRawKey(['run-fail-streak'])) + 1;
      this.setRawProgress(getRawKey(['run-fail-streak']), nextFailStreak);
      this.raiseProgress(FAIL_STREAK_ACHIEVEMENT_ID, nextFailStreak);

      if (distanceMeters < 10) {
        const nextEarlyFailStreak = this.getRawProgress(getRawKey(['run-early-fail-streak'])) + 1;
        this.setRawProgress(getRawKey(['run-early-fail-streak']), nextEarlyFailStreak);
        this.raiseProgress(EARLY_FAIL_STREAK_ACHIEVEMENT_ID, nextEarlyFailStreak);
      } else {
        this.setRawProgress(getRawKey(['run-early-fail-streak']), 0);
      }

      this.runState.mirrorActive = false;
    });
  }

  recordRunTime(deltaSeconds: number) {
    if (deltaSeconds <= 0) {
      return;
    }
    const nextAirborneSeconds = Math.max(0, this.runState.airborneSeconds + deltaSeconds);
    const roundedSeconds = Math.floor(nextAirborneSeconds);
    if (roundedSeconds <= this.runState.lastRecordedSecond) {
      this.runState.airborneSeconds = nextAirborneSeconds;
      return;
    }
    this.runState.airborneSeconds = nextAirborneSeconds;
    this.runState.lastRecordedSecond = roundedSeconds;
    if (roundedSeconds === 0) {
      return;
    }
    this.mutate(() => {
      this.raiseAll(SURVIVAL_ACHIEVEMENT_IDS, roundedSeconds);
    });
  }

  recordMomentumGauge(momentumRatio: number, elapsedSeconds: number) {
    const normalized = clamp(momentumRatio, 0, 1);
    this.mutate(() => {
      if (normalized >= 0.8) {
        this.raiseProgress('momentum_reach_80', 1);
      }
      if (normalized >= 0.995) {
        this.raiseProgress('momentum_reach_max', 1);
        if (this.runState.maxMomentumWindowStart === null) {
          this.runState.maxMomentumWindowStart = elapsedSeconds;
        }
        const holdProgress = Math.max(0, Math.floor(elapsedSeconds - this.runState.maxMomentumWindowStart));
        this.raiseAll(MOMENTUM_MAX_HOLD_IDS, holdProgress);
      } else {
        this.runState.maxMomentumWindowStart = null;
      }

      if (normalized >= 0.82) {
        if (this.runState.highMomentumWindowStart === null) {
          this.runState.highMomentumWindowStart = elapsedSeconds;
        }
        const highHoldProgress = Math.max(0, Math.floor(elapsedSeconds - this.runState.highMomentumWindowStart));
        this.raiseAll(MOMENTUM_HIGH_HOLD_IDS, highHoldProgress);
      } else {
        this.runState.highMomentumWindowStart = null;
      }
    });
  }

  consumePendingUnlock() {
    return this.pendingUnlocks.shift() ?? null;
  }

  getPanelSnapshot(locale: Language): AchievementPanelSnapshot {
    const cached = this.uiCache.get(locale);
    if (cached && cached.serial === this.uiVersion) {
      return cached;
    }

    const unlockedRewards = (this.state.claimedRewards ?? [])
      .filter((rewardId): rewardId is string => Boolean(rewardId) && this.isRewardClaimed(rewardId))
      .map((rewardId) => this.buildRewardSnapshot(rewardId, locale))
      .filter((reward): reward is AchievementRewardSnapshot => Boolean(reward));

    const avatarUnlocks = this.buildUnlockedAvatarMap();
    const entries = [...ACHIEVEMENT_REGISTRY]
      .sort((left, right) => {
        const categoryDelta = CATEGORY_ORDER.indexOf(left.category) - CATEGORY_ORDER.indexOf(right.category);
        if (categoryDelta !== 0) {
          return categoryDelta;
        }
        const rarityDelta = getRarityRank(left.rarity) - getRarityRank(right.rarity);
        if (rarityDelta !== 0) {
          return rarityDelta;
        }
        const targetDelta = (left.target ?? 0) - (right.target ?? 0);
        if (targetDelta !== 0) {
          return targetDelta;
        }
        return left.id.localeCompare(right.id);
      })
      .map((achievement) => this.buildEntrySnapshot(achievement.id, locale));

    const snapshot: AchievementPanelSnapshot = {
      serial: this.uiVersion,
      summary: {
        unlockedCount: entries.filter((entry) => entry.unlocked).length,
        totalCount: entries.length,
        rewardsUnlocked: Object.values(avatarUnlocks).reduce((total, indices) => total + Math.max(0, indices.length - 1), 0),
        hiddenRemaining: entries.filter((entry) => entry.hidden && !entry.unlocked).length
      },
      entries,
      profile: {
        unlockedRewards,
        unlockedAchievements: this.state.unlocked
          .filter((achievementId) => ACHIEVEMENT_REGISTRY_BY_ID.has(achievementId))
          .map((achievementId) => this.buildEntrySnapshot(achievementId, locale))
          .filter((entry) => entry.unlocked),
        runUnlockedAchievements: this.runUnlockedIds.map((achievementId) => this.buildEntrySnapshot(achievementId, locale)).filter((entry) => entry.unlocked),
        avatarUnlocks
      }
    };

    this.uiCache.set(locale, snapshot);
    return snapshot;
  }

  getToastSnapshot(achievementId: string, locale: Language, serial: number, progress: number): AchievementToastSnapshot | null {
    const entry = this.buildEntrySnapshot(achievementId, locale);
    if (!entry.unlocked) {
      return null;
    }
    return {
      serial,
      id: entry.id,
      name: entry.name,
      rarity: entry.rarity,
      rarityEmoji: entry.rarityEmoji,
      rarityLabel: entry.rarityLabel,
      rewardLabel: entry.reward?.name ?? null,
      reward: entry.reward,
      progress
    };
  }

  private mutate(mutator: () => void) {
    this.mutationChanged = false;
    mutator();
    if (this.mutationChanged) {
      this.uiVersion += 1;
      this.uiCache.clear();
      writeAchievementPersistence(this.state, this.storage);
    }
  }

  private recordKillWindow(atSeconds: number, fromBehind: boolean) {
    this.runState.recentKillTimes = trimWindow([...this.runState.recentKillTimes, atSeconds], atSeconds, 5);
    if (this.runState.recentKillTimes.length >= 2) {
      this.raiseProgress(DOUBLE_KILL_ACHIEVEMENT_ID, 1);
    }
    if (this.runState.recentKillTimes.length >= 3) {
      this.raiseProgress(TRIPLE_KILL_ACHIEVEMENT_ID, 1);
    }
    if (!fromBehind) {
      return;
    }
    this.runState.recentBackKillTimes = trimWindow([...this.runState.recentBackKillTimes, atSeconds], atSeconds, 5);
    if (this.runState.recentBackKillTimes.length >= 2) {
      this.raiseProgress(BACK_DOUBLE_KILL_ACHIEVEMENT_ID, 1);
    }
  }

  private recordCanonCombo(slot: 'front_canon' | 'big_canon', atSeconds: number) {
    this.runState.recentCanonActivations = this.runState.recentCanonActivations.filter((entry) => atSeconds - entry.atSeconds <= 5);
    if (this.runState.recentCanonActivations.some((entry) => entry.slot !== slot)) {
      this.incrementAll(CANON_COMBO_ACHIEVEMENT_IDS, 1);
    }
    this.runState.recentCanonActivations.push({ slot, atSeconds });
  }

  private incrementProgress(id: string, amount: number) {
    const current = this.state.progress[id] ?? 0;
    this.setProgress(id, current + amount);
  }

  private incrementAll(ids: readonly string[], amount: number) {
    ids.forEach((id) => this.incrementProgress(id, amount));
  }

  private raiseProgress(id: string, value: number) {
    const current = this.state.progress[id] ?? 0;
    if (value <= current) {
      return;
    }
    this.setProgress(id, value);
  }

  private raiseAll(ids: readonly string[], value: number) {
    ids.forEach((id) => this.raiseProgress(id, value));
  }

  private setProgress(id: string, value: number) {
    const definition = ACHIEVEMENT_REGISTRY_BY_ID.get(id);
    if (!definition) {
      return;
    }
    const nextValue = Math.max(0, value);
    if ((this.state.progress[id] ?? 0) === nextValue) {
      return;
    }
    this.state.progress[id] = nextValue;
    this.mutationChanged = true;
    if (!this.isUnlocked(id) && definition.target !== undefined && nextValue >= definition.target) {
      this.unlock(id);
    }
  }

  private setRawProgress(id: string, value: number) {
    const nextValue = Math.max(0, value);
    if ((this.state.progress[id] ?? 0) === nextValue) {
      return false;
    }
    this.state.progress[id] = nextValue;
    this.mutationChanged = true;
    return true;
  }

  private getRawProgress(id: string) {
    return this.state.progress[id] ?? 0;
  }

  private markRawFlag(id: string) {
    if (this.getRawProgress(id) > 0) {
      return false;
    }
    this.setRawProgress(id, 1);
    return true;
  }

  private unlock(id: string) {
    if (this.isUnlocked(id)) {
      return;
    }
    this.state.unlocked = [...this.state.unlocked, id];
    this.mutationChanged = true;
    if (!this.runUnlockedIds.includes(id)) {
      this.runUnlockedIds.push(id);
    }
    const definition = ACHIEVEMENT_REGISTRY_BY_ID.get(id);
    if (definition?.rewardId && !this.isRewardClaimed(definition.rewardId)) {
      this.state.claimedRewards = [...(this.state.claimedRewards ?? []), definition.rewardId];
      this.mutationChanged = true;
    }
    this.pendingUnlocks.push({ achievementId: id });
  }

  private isUnlocked(id: string) {
    return this.state.unlocked.includes(id);
  }

  private isRewardClaimed(id: string) {
    return (this.state.claimedRewards ?? []).includes(id);
  }

  private backfillClaimedRewards() {
    let changed = false;
    const nextClaimed = new Set(this.state.claimedRewards ?? []);
    this.state.unlocked.forEach((achievementId) => {
      const rewardId = ACHIEVEMENT_REGISTRY_BY_ID.get(achievementId)?.rewardId;
      if (rewardId && !nextClaimed.has(rewardId)) {
        nextClaimed.add(rewardId);
        changed = true;
      }
    });
    if (changed) {
      this.state.claimedRewards = [...nextClaimed];
      writeAchievementPersistence(this.state, this.storage);
    }
  }

  private buildEntrySnapshot(id: string, locale: Language): AchievementEntrySnapshot {
    const definition = ACHIEVEMENT_REGISTRY_BY_ID.get(id);
    if (!definition) {
      throw new Error(`Unknown achievement id "${id}".`);
    }
    const unlocked = this.isUnlocked(id);
    const mystery = Boolean(definition.hidden && !unlocked);
    const unlockIndex = this.state.unlocked.indexOf(id);
    return {
      id: definition.id,
      name: mystery ? '???' : localizeAchievementText(definition.name, locale),
      description: mystery ? (locale === 'fr' ? 'Succès mystère. Continuez à naviguer.' : 'Mystery achievement. Keep sailing.') : localizeAchievementText(definition.description, locale),
      category: definition.category,
      categoryLabel: localizeAchievementText(ACHIEVEMENT_CATEGORY_LABELS[definition.category], locale),
      rarity: definition.rarity,
      rarityEmoji: ACHIEVEMENT_RARITY_EMOJIS[definition.rarity],
      rarityLabel: localizeAchievementText(ACHIEVEMENT_RARITY_LABELS[definition.rarity], locale),
      unlocked,
      unlockOrder: unlockIndex >= 0 ? unlockIndex : null,
      hidden: Boolean(definition.hidden),
      mystery,
      progress: definition.target !== undefined ? Math.min(definition.target, this.state.progress[id] ?? 0) : this.state.progress[id] ?? 0,
      target: definition.target ?? null,
      reward: mystery || !definition.rewardId ? null : this.buildRewardSnapshot(definition.rewardId, locale)
    };
  }

  private buildRewardSnapshot(id: string, locale: Language): AchievementRewardSnapshot | null {
    const reward = ACHIEVEMENT_REWARDS_BY_ID.get(id);
    if (!reward) {
      return null;
    }
    return this.localizeRewardSnapshot(reward, locale);
  }

  private localizeRewardSnapshot(reward: AchievementRewardDefinition, locale: Language): AchievementRewardSnapshot {
    return {
      id: reward.id,
      name: localizeAchievementText(reward.name, locale),
      description: localizeAchievementText(reward.description, locale),
      unlocks: reward.avatarUnlocks.map((unlock) => ({
        layer: unlock.layer,
        layerLabel: localizeAchievementText(ACHIEVEMENT_AVATAR_LAYER_LABELS[unlock.layer], locale),
        index: unlock.index,
        label: unlock.label ? localizeAchievementText(unlock.label, locale) : `${localizeAchievementText(ACHIEVEMENT_AVATAR_LAYER_LABELS[unlock.layer], locale)} ${unlock.index + 1}`
      }))
    };
  }

  private buildUnlockedAvatarMap() {
    const unlocks = createDefaultAchievementAvatarUnlocks();
    (this.state.claimedRewards ?? []).forEach((rewardId) => {
      const reward = ACHIEVEMENT_REWARDS_BY_ID.get(rewardId);
      if (!reward) {
        return;
      }
      reward.avatarUnlocks.forEach((unlock) => {
        const target = unlocks[unlock.layer];
        if (!target.includes(unlock.index)) {
          target.push(unlock.index);
          target.sort((left, right) => left - right);
        }
      });
    });
    return unlocks;
  }
}
