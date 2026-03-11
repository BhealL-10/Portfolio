import { describe, expect, it } from 'vitest';
import { applyItemToRunState, buildUpgradeOffers, createRunUpgradeState, getNextUpgradeMilestone } from './roguelite';

describe('roguelite milestones', () => {
  it('returns the expected milestone sequence', () => {
    expect(getNextUpgradeMilestone(0)).toBe(10);
    expect(getNextUpgradeMilestone(10)).toBe(100);
    expect(getNextUpgradeMilestone(100)).toBe(1000);
    expect(getNextUpgradeMilestone(1299)).toBe(2000);
    expect(getNextUpgradeMilestone(2000)).toBe(3000);
  });
});

describe('buildUpgradeOffers', () => {
  it('returns three distinct offers', () => {
    const offers = buildUpgradeOffers(10, createRunUpgradeState(), () => 0.2);
    expect(offers).toHaveLength(3);
    expect(new Set(offers.map((offer) => offer.item.id)).size).toBe(3);
  });

  it('respects early rarity gates', () => {
    const offers = buildUpgradeOffers(10, createRunUpgradeState(), () => 0.98);
    expect(offers.every((offer) => ['common', 'uncommon', 'rare'].includes(offer.item.rarity))).toBe(true);
  });

  it('unlocks epic and legendary later', () => {
    const midOffers = buildUpgradeOffers(60, createRunUpgradeState(), () => 0.99);
    expect(midOffers.every((offer) => offer.item.rarity !== 'legendary')).toBe(true);

    const lateOffers = buildUpgradeOffers(160, createRunUpgradeState(), () => 0.999);
    expect(lateOffers.some((offer) => ['epic', 'legendary'].includes(offer.item.rarity))).toBe(true);
  });

  it('filters non stackable owned items', () => {
    let state = createRunUpgradeState();
    state = applyItemToRunState(state, 'double_jump_module');
    const offers = buildUpgradeOffers(60, state, () => 0.1);
    expect(offers.some((offer) => offer.item.id === 'double_jump_module')).toBe(false);
  });
});

describe('applyItemToRunState', () => {
  it('stacks passive modifiers and clamps them', () => {
    let state = createRunUpgradeState();
    state = applyItemToRunState(state, 'overdrive_core');
    state = applyItemToRunState(state, 'overdrive_core');
    expect(state.modifiers.momentumGain).toBeGreaterThan(0);
    expect(state.counts.overdrive_core).toBe(2);
  });
});
