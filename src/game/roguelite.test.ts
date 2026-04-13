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
    expect(getNextUpgradeMilestone(10)).toBe(110);
    expect(getNextUpgradeMilestone(110)).toBe(210);
    expect(getNextUpgradeMilestone(210)).toBe(310);
    expect(getNextUpgradeMilestone(310)).toBe(410);
    expect(getNextUpgradeMilestone(410)).toBe(510);
    expect(getNextUpgradeMilestone(510)).toBe(610);
    expect(getNextUpgradeMilestone(610)).toBe(710);
    expect(getNextUpgradeMilestone(710)).toBe(810);
    expect(getNextUpgradeMilestone(810)).toBe(910);
    expect(getNextUpgradeMilestone(910)).toBe(1010);
    expect(getNextUpgradeMilestone(1010)).toBe(1110);
    expect(getNextUpgradeMilestone(1110)).toBe(1210);
    expect(getNextUpgradeMilestone(1210)).toBe(1310);
    expect(getNextUpgradeMilestone(1310)).toBe(1410);
    expect(getNextUpgradeMilestone(1410)).toBe(1510);
    expect(getNextUpgradeMilestone(1510)).toBe(1610);
    expect(getNextUpgradeMilestone(1610)).toBe(1710);
    expect(getNextUpgradeMilestone(1710)).toBe(1810);
    expect(getNextUpgradeMilestone(1810)).toBe(1910);
    expect(getNextUpgradeMilestone(1910)).toBe(2010);
  });
});

describe('buildUpgradeOffers', () => {
  it('returns three distinct offers', () => {
    const offers = buildUpgradeOffers(10, createRunUpgradeState(), () => 0.2);
    expect(offers).toHaveLength(3);
    expect(new Set(offers.map((offer) => offer.item.id)).size).toBe(3);
  });

  it('allows an occasional rare item very early without unlocking epic tiers', () => {
    const offers = buildUpgradeOffers(10, createRunUpgradeState(), () => 0.98);
    expect(offers.every((offer) => ['common', 'uncommon', 'rare'].includes(offer.item.rarity))).toBe(true);
    expect(offers.some((offer) => offer.item.rarity === 'rare')).toBe(true);
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
