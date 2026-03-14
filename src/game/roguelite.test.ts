import { describe, expect, it } from 'vitest';
import {
  applyItemToRunState,
  buildUpgradeOffers,
  createRunUpgradeState,
  getNextUpgradeMilestone,
  getRarityRank
} from './roguelite';

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
    expect(offers.every((offer) => ['common', 'uncommon'].includes(offer.item.rarity))).toBe(true);
  });

  it('unlocks epic and legendary later', () => {
    const midOffers = buildUpgradeOffers(60, createRunUpgradeState(), () => 0.99);
    expect(midOffers.every((offer) => offer.item.rarity !== 'legendary')).toBe(true);

    const lateOffers = buildUpgradeOffers(160, createRunUpgradeState(), () => 0.999);
    expect(lateOffers.some((offer) => ['epic', 'legendary'].includes(offer.item.rarity))).toBe(true);
  });

  it('does not offer the same owned module rarity again', () => {
    let state = createRunUpgradeState();
    state = applyItemToRunState(state, 'plane_common');
    const offers = buildUpgradeOffers(60, state, () => 0.1);
    expect(offers.some((offer) => offer.item.id === 'plane_common')).toBe(false);
  });
});

describe('applyItemToRunState', () => {
  it('keeps passive utilities as unique common items', () => {
    let state = createRunUpgradeState();
    state = applyItemToRunState(state, 'old_ape_rudder_common');
    expect(state.counts.old_ape_rudder_common).toBe(1);
    expect(state.passives.old_ape_rudder).toBe('old_ape_rudder_common');
    expect(state.ownedOrder).toEqual(['old_ape_rudder_common']);
  });

  it('replaces a module with a higher rarity version and refreshes runtime', () => {
    let state = createRunUpgradeState();
    state = applyItemToRunState(state, 'wrapper_common');
    state = applyItemToRunState(state, 'wrapper_epic');
    expect(state.counts.wrapper_common).toBeUndefined();
    expect(state.counts.wrapper_epic).toBe(1);
    expect(state.modules.wrapper).toBe('wrapper_epic');
    expect(state.moduleRuntime.wrapper?.itemId).toBe('wrapper_epic');
  });

  it('only offers higher rarities for an already owned module', () => {
    let state = createRunUpgradeState();
    state = applyItemToRunState(state, 'shield_uncommon');
    const offers = buildUpgradeOffers(100, state, () => 0.72);
    const shieldOffers = offers.filter((offer) => offer.item.baseId === 'shield');
    expect(shieldOffers.every((offer) => getRarityRank(offer.item.rarity) > getRarityRank('uncommon'))).toBe(true);
  });
});
