import { describe, expect, it } from 'vitest';
import { ACHIEVEMENT_REGISTRY } from './AchievementRegistry';
import { AchievementSystem } from './AchievementSystem';

function createStorage() {
  const map = new Map<string, string>();
  return {
    getItem(key: string) {
      return map.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    }
  };
}

function consumeAllUnlockIds(system: AchievementSystem) {
  const ids: string[] = [];
  for (;;) {
    const next = system.consumePendingUnlock();
    if (!next) {
      return ids;
    }
    ids.push(next.achievementId);
  }
}

describe('AchievementSystem', () => {
  it('ships the expanded 167 achievement registry with 115 mysteries', () => {
    expect(ACHIEVEMENT_REGISTRY).toHaveLength(167);
    expect(ACHIEVEMENT_REGISTRY.filter((achievement) => achievement.hidden)).toHaveLength(115);
  });

  it('unlocks combat achievements cumulatively and queues unlock toasts once', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    system.recordEnemyKill({ amount: 1 });
    expect(system.consumePendingUnlock()).toEqual({ achievementId: 'combat_kill_1' });
    expect(system.consumePendingUnlock()).toBeNull();

    system.recordEnemyKill({ amount: 9 });
    expect(system.consumePendingUnlock()).toEqual({ achievementId: 'combat_kill_10' });
  });

  it('keeps hidden achievements masked until they unlock', () => {
    const system = new AchievementSystem(createStorage());
    const beforeUnlock = system.getPanelSnapshot('en');
    const hiddenEntry = beforeUnlock.entries.find((entry) => entry.id === 'shards_triangular_5');
    expect(hiddenEntry?.name).toBe('???');
    expect(hiddenEntry?.reward).toBeNull();

    system.resetRun();
    for (let index = 0; index < 5; index += 1) {
      system.recordLanding({
        grade: 'good',
        twist: false,
        shapeKind: 'triangular',
        isMilestone: false
      });
    }

    const unlocked = system.getPanelSnapshot('en').entries.find((entry) => entry.id === 'shards_triangular_5');
    expect(unlocked?.unlocked).toBe(true);
    expect(unlocked?.name).toBe('These ones bite back');
    expect(unlocked?.reward?.name).toBe('Face motif 4');
  });

  it('surfaces unlocked skins in the profile snapshot', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    for (let index = 0; index < 10; index += 1) {
      system.recordEnemyKill({ amount: 1 });
    }

    const snapshot = system.getPanelSnapshot('fr');
    expect(snapshot.profile.avatarUnlocks.oreille).toEqual([0, 6]);
    expect(snapshot.profile.unlockedRewards.some((reward) => reward.id === 'avatar-oreille-7')).toBe(true);
    expect(snapshot.profile.runUnlockedAchievements.some((entry) => entry.id === 'combat_kill_10')).toBe(true);
  });

  it('tracks new run-based achievements from real run signals', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    system.recordItemAcquired({ kind: 'module', slot: 'wings', rarity: 'common', baseId: 'wings' });
    system.recordItemAcquired({ kind: 'module', slot: 'propulseur', rarity: 'common', baseId: 'propulseur' });
    system.recordItemAcquired({ kind: 'module', slot: 'reacteur_front', rarity: 'common', baseId: 'reacteur_front' });
    expect(consumeAllUnlockIds(system)).toContain('modules_air_combo_3');

    system.resetRun();
    system.recordDistance(100);
    expect(consumeAllUnlockIds(system)).toContain('shards_100_without_milestone_reward');

    for (let index = 0; index < 5; index += 1) {
      system.recordRunEnded(6);
    }
    expect(consumeAllUnlockIds(system)).toContain('progress_early_fail_streak_5');
  });

  it('requires 300 perfect landings for Capitaine du Verre Fendu', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    for (let index = 0; index < 299; index += 1) {
      system.recordLanding({
        grade: 'perfect',
        twist: false,
        shapeKind: 'round',
        isMilestone: false
      });
    }
    expect(system.getPanelSnapshot('fr').entries.find((entry) => entry.id === 'shards_land_300')?.unlocked).toBe(false);

    system.recordLanding({
      grade: 'perfect',
      twist: false,
      shapeKind: 'round',
      isMilestone: false
    });

    const unlockedEntry = system.getPanelSnapshot('fr').entries.find((entry) => entry.id === 'shards_land_300');
    expect(unlockedEntry?.unlocked).toBe(true);
    expect(unlockedEntry?.description).toBe('Réussir 300 atterrissages perfect.');
  });

  it('uses current reward names directly in the registry', () => {
    const firstRewardedPerfect = ACHIEVEMENT_REGISTRY.find((entry) => entry.id === 'skill_perfect_10');
    const frontCanonTrigger = ACHIEVEMENT_REGISTRY.find((entry) => entry.id === 'modules_front_canon_10');

    expect(firstRewardedPerfect?.rewardId).toBe('avatar-eyes-7');
    expect(frontCanonTrigger?.name.fr).toBe('Ça part tout seul');
    expect(frontCanonTrigger?.name.en).toBe('It just goes off');
    expect(frontCanonTrigger?.rewardId).toBe('avatar-accessoire-11');
    expect(ACHIEVEMENT_REGISTRY.some((entry) => entry.rewardId?.includes('avatar-background-'))).toBe(false);
    expect(ACHIEVEMENT_REGISTRY.some((entry) => entry.rewardId?.includes('avatar-motif-'))).toBe(false);
    expect(ACHIEVEMENT_REGISTRY.some((entry) => entry.rewardId?.includes('avatar-barbe-'))).toBe(false);
  });

  it('unlocks the first rewarded perfect achievement after 10 perfect landings', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    for (let index = 0; index < 10; index += 1) {
      system.recordLanding({
        grade: 'perfect',
        twist: false,
        shapeKind: 'round',
        isMilestone: false
      });
    }

    expect(consumeAllUnlockIds(system)).toContain('skill_perfect_10');
    const reward = system.getPanelSnapshot('en').entries.find((entry) => entry.id === 'skill_perfect_10')?.reward;
    expect(reward?.name).toBe('Eyes 7');
  });

  it('clears persisted achievements when the global reset token changes', () => {
    const storage = createStorage();
    const system = new AchievementSystem(storage);
    system.resetRun();
    system.recordEnemyKill({ amount: 10 });
    expect(system.getPanelSnapshot('en').entries.find((entry) => entry.id === 'combat_kill_10')?.unlocked).toBe(true);

    expect(system.syncGlobalResetToken('leaderboard-reset-1')).toBe(true);

    const resetSnapshot = system.getPanelSnapshot('en');
    expect(resetSnapshot.entries.find((entry) => entry.id === 'combat_kill_10')?.unlocked).toBe(false);
    expect(resetSnapshot.profile.unlockedRewards).toHaveLength(0);
    expect(system.consumePendingUnlock()).toBeNull();
    expect(system.syncGlobalResetToken('leaderboard-reset-1')).toBe(false);
  });

  it('unlocks mirror achievements from the current mirror toggle pipeline', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    system.recordReverseLaunchFromAnchor();
    system.recordMirrorModeToggled(true);
    for (let index = 0; index < 5; index += 1) {
      system.recordLanding({
        grade: index < 3 ? 'perfect' : 'good',
        twist: false,
        shapeKind: 'round',
        isMilestone: false,
        inMirror: true
      });
    }
    system.recordEnemyKill({ amount: 5, inMirror: true, fromBehind: true });
    system.recordMirrorModeToggled(false);

    const unlocked = consumeAllUnlockIds(system);
    expect(unlocked).toContain('progress_reverse_launch_1');
    expect(unlocked).toContain('mirror_mode_1');
    expect(unlocked).toContain('mirror_land_5');
    expect(unlocked).toContain('mirror_perfect_3');
    expect(unlocked).toContain('mirror_kill_5');
    expect(unlocked).toContain('mirror_back_kill_3');
    expect(unlocked).toContain('mirror_return_1');
  });

  it('tracks new ambient enemy, shop, sprint-fish, fast-travel, and moving-shard achievements from real event hooks', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    system.recordAmbientEnemyKill('enemyTop');
    system.recordAmbientEnemyKill('enemyBot');
    system.recordSprintFishRide();
    system.recordSprintFishRide();
    system.recordSprintFishRide();
    system.recordFastTravel('wrapper');
    system.recordFastTravel('teleport');
    system.recordFastTravel('warp');
    system.recordFastTravel('wrapper');
    system.recordFastTravel('wrapper');
    system.recordFastTravel('wrapper');
    system.recordFastTravel('wrapper');
    system.recordNodeEventEncounter('shop');
    system.recordNodeEventEncounter('gift');
    system.recordItemAcquired({ kind: 'module', slot: 'wrapper', rarity: 'rare', baseId: 'wrapper' }, { purchased: true });
    system.recordItemAcquired({ kind: 'module', slot: 'magnet', rarity: 'epic', baseId: 'magnet' }, { purchased: true });
    system.recordItemAcquired({ kind: 'module', slot: 'front_canon', rarity: 'legendary', baseId: 'front_canon' }, { purchased: true });
    for (let index = 0; index < 5; index += 1) {
      system.recordLanding({
        grade: 'good',
        twist: false,
        shapeKind: 'round',
        isMilestone: index < 3,
        motionPattern: 'vertical',
        eventType: index < 3 ? 'shop' : 'none',
        fromSprintFish: index < 3
      });
    }

    const unlocked = consumeAllUnlockIds(system);
    expect(unlocked).toContain('combat_enemy_top_1');
    expect(unlocked).toContain('combat_enemy_bot_1');
    expect(unlocked).toContain('modules_sprint_fish_1');
    expect(unlocked).toContain('modules_sprint_fish_land_3');
    expect(unlocked).toContain('modules_fast_travel_5');
    expect(unlocked).toContain('economy_shop_visit_1');
    expect(unlocked).toContain('economy_question_pickup_1');
    expect(unlocked).toContain('economy_buy_rare_3');
    expect(unlocked).toContain('modules_wrapper_1');
    expect(unlocked).toContain('modules_magnet_1');
    expect(unlocked).toContain('modules_front_canon_1');
    expect(unlocked).toContain('shards_moving_land_5');
    expect(unlocked).toContain('shards_shop_land_3');
    expect(unlocked).toContain('shards_milestone_peek_3');
  });
});
