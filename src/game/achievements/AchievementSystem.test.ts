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
  it('ships the full 144 achievement registry with 69 mysteries', () => {
    expect(ACHIEVEMENT_REGISTRY).toHaveLength(144);
    expect(ACHIEVEMENT_REGISTRY.filter((achievement) => achievement.hidden)).toHaveLength(69);
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
    expect(unlocked?.name).toBe('Mirror Fangs');
    expect(unlocked?.reward?.name).toBe('Face motif 11');
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

  it('maps the explicit manual rewards requested for perfect and front canon achievements', () => {
    const firstPerfect = ACHIEVEMENT_REGISTRY.find((entry) => entry.id === 'skill_perfect_1');
    const frontCanonTrigger = ACHIEVEMENT_REGISTRY.find((entry) => entry.id === 'modules_front_canon_10');
    const frontCanonKills = ACHIEVEMENT_REGISTRY.find((entry) => entry.id === 'combat_front_canon_kill_10');

    expect(firstPerfect?.rewardId).toBe('avatar-facemotif-3');
    expect(frontCanonTrigger?.name.fr).toBe('Radar déréglé');
    expect(frontCanonTrigger?.name.en).toBe('ProgressFiles Strike 10');
    expect(frontCanonTrigger?.rewardId).toBe('avatar-accessoire-17');
    expect(frontCanonKills?.rewardId).toBe('avatar-accessoire-16');
  });

  it('unlocks the first perfect reward immediately on the first perfect landing', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    system.recordLanding({
      grade: 'perfect',
      twist: false,
      shapeKind: 'round',
      isMilestone: false
    });

    expect(consumeAllUnlockIds(system)).toContain('skill_perfect_1');
    const reward = system.getPanelSnapshot('en').entries.find((entry) => entry.id === 'skill_perfect_1')?.reward;
    expect(reward?.name).toBe('Face motif 3');
  });
});
