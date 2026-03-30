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

describe('AchievementSystem', () => {
  it('ships the full 110 achievement registry with 60 mysteries', () => {
    expect(ACHIEVEMENT_REGISTRY).toHaveLength(110);
    expect(ACHIEVEMENT_REGISTRY.filter((achievement) => achievement.hidden)).toHaveLength(60);
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
    expect(unlocked?.reward?.name).toBe('Eyes 4');
  });

  it('surfaces unlocked avatar assets in the profile snapshot', () => {
    const system = new AchievementSystem(createStorage());
    system.resetRun();

    for (let index = 0; index < 10; index += 1) {
      system.recordEnemyKill({ amount: 1 });
    }

    const snapshot = system.getPanelSnapshot('fr');
    expect(snapshot.profile.avatarUnlocks.background).toEqual([0, 6]);
    expect(snapshot.profile.unlockedRewards.some((reward) => reward.id === 'avatar-background-7')).toBe(true);
    expect(snapshot.profile.runUnlockedAchievements.some((entry) => entry.id === 'combat_kill_10')).toBe(true);
  });
});
