import type { AchievementAvatarLayer, AchievementCategory, AchievementDefinition, AchievementRarity } from './AchievementTypes';
import { createAchievementRewardId } from './AchievementRewards';

const loc = (fr: string, en: string) => ({ fr, en });
const reward = (layer: AchievementAvatarLayer, humanIndex: number) => createAchievementRewardId(layer, humanIndex);

function achievement(
  id: string,
  name: ReturnType<typeof loc>,
  description: ReturnType<typeof loc>,
  category: AchievementCategory,
  rarity: AchievementRarity,
  target: number,
  options: {
    hidden?: boolean;
    rewardId?: string | null;
  } = {}
): AchievementDefinition {
  return {
    id,
    name,
    description,
    category,
    rarity,
    target,
    hidden: options.hidden,
    rewardId: options.rewardId ?? null
  };
}

const ACHIEVEMENT_RARITY_ORDER: AchievementRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

function getAchievementRarityRank(rarity: AchievementRarity) {
  return ACHIEVEMENT_RARITY_ORDER.indexOf(rarity);
}

function sortAchievementsByRarity(left: AchievementDefinition, right: AchievementDefinition) {
  const rarityDelta = getAchievementRarityRank(left.rarity) - getAchievementRarityRank(right.rarity);
  if (rarityDelta !== 0) {
    return rarityDelta;
  }

  const targetDelta = (left.target ?? 0) - (right.target ?? 0);
  if (targetDelta !== 0) {
    return targetDelta;
  }

  return left.id.localeCompare(right.id);
}

const progressionAchievements: AchievementDefinition[] = [
  achievement('progress_distance_100', loc('Sillage Naissant', 'Fresh Wake'), loc('Parcourir 100 m dans une run.', 'Travel 100m in a single run.'), 'progression', 'common', 100),
  achievement('progress_distance_250', loc('Hublot de Brume', 'Mist Porthole'), loc('Parcourir 250 m dans une run.', 'Travel 250m in a single run.'), 'progression', 'common', 250, { rewardId: reward('oreille', 2) }),
  achievement('progress_distance_500', loc('Houle du Large', 'Open-Sea Swell'), loc('Parcourir 500 m dans une run.', 'Travel 500m in a single run.'), 'progression', 'uncommon', 500, { rewardId: reward('oreille', 3) }),
  achievement('progress_distance_750', loc('Courant Fantôme', 'Phantom Current'), loc('Parcourir 750 m dans une run.', 'Travel 750m in a single run.'), 'progression', 'uncommon', 750, { hidden: true }),
  achievement('progress_distance_1000', loc('Courant Brisé', 'Broken Current'), loc('Parcourir 1 000 m dans une run.', 'Travel 1,000m in a single run.'), 'progression', 'rare', 1000, { hidden: true }),
  achievement('progress_distance_1500', loc('Traverse de Verre', 'Glass Traverse'), loc('Parcourir 1 500 m dans une run.', 'Travel 1,500m in a single run.'), 'progression', 'rare', 1500, { rewardId: reward('facemotif', 2) }),
  achievement('progress_distance_2000', loc('Sillage des Reflets', 'Wake of Reflections'), loc('Parcourir 2 000 m dans une run.', 'Travel 2,000m in a single run.'), 'progression', 'rare', 2000, { hidden: true }),
  achievement('progress_distance_3000', loc('Traversée des Miroirs', 'Mirror Crossing'), loc('Parcourir 3 000 m dans une run.', 'Travel 3,000m in a single run.'), 'progression', 'epic', 3000, { rewardId: reward('facemotif', 6) }),
  achievement('progress_distance_4000', loc('Marée des Verrières', 'Glasshouse Tide'), loc('Parcourir 4 000 m dans une run.', 'Travel 4,000m in a single run.'), 'progression', 'epic', 4000, { hidden: true, rewardId: reward('facemotif', 7) }),
  achievement('progress_distance_5000', loc('Horizon Primaterie', 'Primaterie Horizon'), loc('Parcourir 5 000 m dans une run.', 'Travel 5,000m in a single run.'), 'progression', 'legendary', 5000, { hidden: true }),
  achievement('progress_survive_60', loc('Marée Vive', 'Spring Tide'), loc('Planer pendant 60 secondes.', 'Gliding for 60 seconds.'), 'progression', 'common', 60),
  achievement('progress_survive_90', loc('Cale Silencieuse', 'Silent Hold'), loc('Planer pendant 90 secondes.', 'Gliding for 90 seconds.'), 'progression', 'common', 90),
  achievement('progress_survive_120', loc('Quart d’Écume', 'Foam Watch'), loc('Planer pendant 120 secondes.', 'Gliding for 120 seconds.'), 'progression', 'common', 120, { rewardId: reward('face', 2) }),
  achievement('progress_survive_180', loc('Quart de Nuit', 'Night Watch'), loc('Planer pendant 180 secondes.', 'Gliding for 180 seconds.'), 'progression', 'uncommon', 180, { rewardId: reward('face', 3) }),
  achievement('progress_survive_300', loc('Veille Océane', 'Ocean Watch'), loc('Planer pendant 300 secondes.', 'Gliding for 300 seconds.'), 'progression', 'rare', 300, { rewardId: reward('accessoire', 2) }),
  achievement('progress_survive_900', loc('Traversée sans Port', 'Harborless Crossing'), loc('Planer pendant 900 secondes.', 'Gliding for 900 seconds.'), 'progression', 'legendary', 900, { hidden: true }),
  achievement('progress_early_fail_streak_5', loc('Série Noire Courte', 'Short Black Streak'), loc('Mourir avant 10 m pendant 5 runs d’affilée.', 'Die before 10m in 5 runs in a row.'), 'progression', 'rare', 5, { hidden: true, rewardId: reward('accessoire', 7) }),
  achievement('progress_fail_streak_10', loc('Radeau des Ratés', 'Raft of Misfires'), loc('Enchaîner 10 game overs d’affilée.', 'Chain 10 game overs in a row.'), 'progression', 'epic', 10, { hidden: true, rewardId: reward('accessoire', 8) })
];

const shardAchievements: AchievementDefinition[] = [
  achievement('shards_land_1', loc('Premier Éclat', 'First Shard'), loc('Atterrir une première fois.', 'Land once.'), 'shards', 'common', 1),
  achievement('shards_land_10', loc('Mousse des Fragments', 'Fragment Deckhand'), loc('Atterrir 10 fois.', 'Land 10 times.'), 'shards', 'common', 10, { rewardId: reward('oreille', 4) }),
  achievement('shards_land_25', loc('Gabier des Éclats', 'Shard Lookout'), loc('Atterrir 25 fois.', 'Land 25 times.'), 'shards', 'uncommon', 25, { rewardId: reward('eyes', 2) }),
  achievement('shards_land_50', loc('Pilote des Reflets', 'Pilot of Reflections'), loc('Atterrir 50 fois.', 'Land 50 times.'), 'shards', 'uncommon', 50, { rewardId: reward('oreille', 5) }),
  achievement('shards_land_100', loc('Cap sur les Verrières', 'Course for the Panes'), loc('Atterrir 100 fois.', 'Land 100 times.'), 'shards', 'rare', 100),
  achievement('shards_land_200', loc('Pont des Brisures', 'Deck of Breaks'), loc('Atterrir 200 fois.', 'Land 200 times.'), 'shards', 'epic', 200, { hidden: true }),
  achievement('shards_land_300', loc('Capitaine du Verre Fendu', 'Captain of Broken Glass'), loc('Réussir 300 atterrissages perfect.', 'Land 300 perfects.'), 'shards', 'legendary', 300, { hidden: true }),
  achievement('shards_chain_8', loc('Chapelet d’Éclats', 'String of Shards'), loc('Enchaîner 3 atterrissages Super ou Perfect.', 'Chain 3 Super or Perfect landings.'), 'shards', 'uncommon', 3, { rewardId: reward('eyes', 3) }),
  achievement('shards_chain_12', loc('Nœud de Reflets', 'Reflection Knot'), loc('Enchaîner 5 atterrissages Super ou Perfect.', 'Chain 5 Super or Perfect landings.'), 'shards', 'uncommon', 5, { hidden: true }),
  achievement('shards_chain_20', loc('Route de Verre', 'Glass Route'), loc('Enchaîner 2 atterrissages Perfect.', 'Chain 2 Perfect landings.'), 'shards', 'rare', 2, { rewardId: reward('facemotif', 3) }),
  achievement('shards_chain_30', loc('Convoi des Brumes', 'Fog Convoy'), loc('Enchaîner 3 atterrissages Perfect.', 'Chain 3 Perfect landings.'), 'shards', 'epic', 3, { hidden: true }),
  achievement('shards_chain_40', loc('Couronne de Shards', 'Crown of Shards'), loc('Enchaîner 5 atterrissages Perfect.', 'Chain 5 Perfect landings.'), 'shards', 'legendary', 5, { hidden: true }),
  achievement('shards_milestone_1', loc('Balise de Marée', 'Tide Beacon'), loc('Atteindre une shard milestone.', 'Reach a milestone shard.'), 'shards', 'uncommon', 1, { rewardId: reward('eyes', 4) }),
  achievement('shards_milestone_3', loc('Fanal des Projets', 'Project Beacon'), loc('Atteindre 3 shards milestone.', 'Reach 3 milestone shards.'), 'shards', 'rare', 3, { hidden: true }),
  achievement('shards_milestone_5', loc('Cartographe des Routes', 'Route Cartographer'), loc('Atteindre 5 shards milestone.', 'Reach 5 milestone shards.'), 'shards', 'epic', 5, { hidden: true }),
  achievement('shards_triangular_5', loc('Dents de Reflets', 'Mirror Fangs'), loc('Dompter 5 shards triangulaires.', 'Master 5 triangular shards.'), 'shards', 'epic', 5, { hidden: true, rewardId: reward('facemotif', 11) }),
  achievement('shards_triangular_15', loc('Morsure de Verrière', 'Glassbite'), loc('Dompter 15 shards triangulaires.', 'Master 15 triangular shards.'), 'shards', 'rare', 15, { hidden: true }),
  achievement('shards_triangular_30', loc('Dérive des Crocs', 'Fang Drift'), loc('Dompter 30 shards triangulaires.', 'Master 30 triangular shards.'), 'shards', 'epic', 30, { hidden: true }),
  achievement('shards_100_without_milestone_reward', loc('Route Sans Prime', 'Rewardless Route'), loc('Atteindre 100 m sans prendre de récompense de milestone.', 'Reach 100m without taking a milestone reward.'), 'shards', 'epic', 1, { hidden: true, rewardId: reward('accessoire', 9) })
];

const skillAchievements: AchievementDefinition[] = [
  achievement('skill_twist_5', loc('Queue en Spirale', 'Spiral Tail'), loc('Réaliser 5 twists.', 'Perform 5 twists.'), 'skill', 'common', 5),
  achievement('skill_twist_15', loc('Danse du Macaque', 'Macaque Dance'), loc('Réaliser 15 twists.', 'Perform 15 twists.'), 'skill', 'common', 15, { rewardId: reward('oreille', 6) }),
  achievement('skill_twist_30', loc('Vrille de Babouin', 'Baboon Corkscrew'), loc('Réaliser 30 twists.', 'Perform 30 twists.'), 'skill', 'uncommon', 30, { hidden: true }),
  achievement('skill_twist_50', loc('Tourbillon Primate', 'Primate Whirl'), loc('Réaliser 50 twists.', 'Perform 50 twists.'), 'skill', 'rare', 50, { rewardId: reward('facemotif', 4) }),
  achievement('skill_twist_75', loc('Spirale de Tempête', 'Storm Spiral'), loc('Réaliser 75 twists.', 'Perform 75 twists.'), 'skill', 'rare', 75, { hidden: true }),
  achievement('skill_twist_150', loc('Houle en Hélice', 'Helix Swell'), loc('Réaliser 150 twists.', 'Perform 150 twists.'), 'skill', 'epic', 150, { hidden: true }),
  achievement('skill_perfect_3', loc('Reflet Juste', 'True Reflection'), loc('Réussir 3 atterrissages perfect.', 'Land 3 perfects.'), 'skill', 'common', 3),
  achievement('skill_perfect_10', loc('Verre Bien Taillé', 'Sharpened Glass'), loc('Réussir 10 atterrissages perfect.', 'Land 10 perfects.'), 'skill', 'uncommon', 10, { rewardId: reward('face', 4) }),
  achievement('skill_perfect_25', loc('Éclat Chirurgical', 'Surgical Shard'), loc('Réussir 25 atterrissages perfect.', 'Land 25 perfects.'), 'skill', 'rare', 25, { rewardId: reward('facemotif', 8) }),
  achievement('skill_perfect_50', loc('Coupe de Marée', 'Tidal Cut'), loc('Réussir 50 atterrissages perfect.', 'Land 50 perfects.'), 'skill', 'epic', 50, { hidden: true }),
  achievement('skill_perfect_100', loc('Miroir Absolu', 'Absolute Mirror'), loc('Réussir 100 atterrissages perfect.', 'Land 100 perfects.'), 'skill', 'legendary', 100, { hidden: true }),
  achievement('skill_perfect_streak_2', loc('Reflet Filé', 'Spun Reflection'), loc('Réaliser 2 perfects d’affilée.', 'Chain 2 perfects in a row.'), 'skill', 'uncommon', 2, { hidden: true }),
  achievement('skill_perfect_streak_3', loc('Coupe Miroir', 'Mirror Cut'), loc('Réaliser 3 perfects d’affilée.', 'Chain 3 perfects in a row.'), 'skill', 'epic', 3, { hidden: true, rewardId: reward('facemotif', 9) }),
  achievement('skill_perfect_streak_4', loc('Lame de Sillage', 'Wake Blade'), loc('Réaliser 4 perfects d’affilée.', 'Chain 4 perfects in a row.'), 'skill', 'rare', 4, { hidden: true }),
  achievement('skill_perfect_streak_6', loc('Foudre de Verre', 'Glass Lightning'), loc('Réaliser 6 perfects d’affilée.', 'Chain 6 perfects in a row.'), 'skill', 'legendary', 6, { hidden: true }),
  achievement('skill_twist_streak_3', loc('Flow Captif', 'Captured Flow'), loc('Enchaîner 3 twists d’affilée.', 'Chain 3 twists in a row.'), 'skill', 'uncommon', 3, { hidden: true }),
  achievement('skill_twist_streak_5', loc('Flow Fendu', 'Split Flow'), loc('Enchaîner 5 twists d’affilée.', 'Chain 5 twists in a row.'), 'skill', 'rare', 5, { hidden: true }),
  achievement('skill_twist_streak_10', loc('Houle Noire', 'Black Swell'), loc('Enchaîner 10 twists d’affilée.', 'Chain 10 twists in a row.'), 'skill', 'epic', 10, { hidden: true }),
  achievement('skill_twist_streak_20', loc('Roue des Tempêtes', 'Stormwheel'), loc('Enchaîner 20 twists d’affilée.', 'Chain 20 twists in a row.'), 'skill', 'legendary', 20, { hidden: true })
];

const momentumAchievements: AchievementDefinition[] = [
  achievement('momentum_reach_80', loc('Brise de Pont', 'Deck Breeze'), loc('Atteindre 80 % de momentum.', 'Reach 80% momentum.'), 'momentum', 'uncommon', 1),
  achievement('momentum_reach_max', loc('Vent en Poupe', 'Full Sail'), loc('Atteindre le momentum maximum.', 'Reach maximum momentum.'), 'momentum', 'common', 1),
  achievement('momentum_hold_max_5', loc('Marée Tendue', 'Tension Tide'), loc('Garder le momentum max 5 secondes.', 'Hold max momentum for 5 seconds.'), 'momentum', 'rare', 5, { rewardId: reward('facemotif', 5) }),
  achievement('momentum_hold_max_10', loc('Lame de Fond', 'Deep Blade'), loc('Garder le momentum max 10 secondes.', 'Hold max momentum for 10 seconds.'), 'momentum', 'epic', 10),
  achievement('momentum_hold_max_20', loc('Océan de Verre', 'Glass Ocean'), loc('Garder le momentum max 20 secondes.', 'Hold max momentum for 20 seconds.'), 'momentum', 'legendary', 20, { hidden: true }),
  achievement('momentum_hold_high_15', loc('Vitesse de Cale', 'Hold Speed'), loc('Rester en momentum élevé 15 secondes cumulées.', 'Stay at high momentum for 15 cumulative seconds.'), 'momentum', 'uncommon', 15, { hidden: true }),
  achievement('momentum_hold_high_45', loc('Courant des Singes', 'Ape Current'), loc('Rester en momentum élevé 45 secondes cumulées.', 'Stay at high momentum for 45 cumulative seconds.'), 'momentum', 'rare', 45, { rewardId: reward('facemotif', 10) }),
  achievement('momentum_hold_high_90', loc('Tempête Primale', 'Primal Storm'), loc('Rester en momentum élevé 90 secondes cumulées.', 'Stay at high momentum for 90 cumulative seconds.'), 'momentum', 'epic', 90),
  achievement('momentum_hold_high_120', loc('Ligne de Grain', 'Squall Line'), loc('Rester en momentum élevé 120 secondes cumulées.', 'Stay at high momentum for 120 cumulative seconds.'), 'momentum', 'legendary', 120, { hidden: true })
];

const combatAchievements: AchievementDefinition[] = [
  achievement('combat_kill_1', loc('Premier Revers', 'First Reversal'), loc('Éliminer 1 ennemi.', 'Eliminate 1 enemy.'), 'combat', 'common', 1),
  achievement('combat_kill_10', loc('Croc en Recul', 'Backstep Fang'), loc('Éliminer 10 ennemis.', 'Eliminate 10 enemies.'), 'combat', 'common', 10, { rewardId: reward('oreille', 7) }),
  achievement('combat_kill_25', loc('Flibustier des Ombres', 'Shadow Freebooter'), loc('Éliminer 25 ennemis.', 'Eliminate 25 enemies.'), 'combat', 'uncommon', 25),
  achievement('combat_kill_50', loc('Chasseur de Poupe', 'Hunter of the Stern'), loc('Éliminer 50 ennemis.', 'Eliminate 50 enemies.'), 'combat', 'uncommon', 50),
  achievement('combat_kill_75', loc('Morsure de Sillage', 'Wakebite'), loc('Éliminer 75 ennemis.', 'Eliminate 75 enemies.'), 'combat', 'rare', 75, { hidden: true }),
  achievement('combat_kill_150', loc('Fléau du Sillage', 'Scourge of the Wake'), loc('Éliminer 150 ennemis.', 'Eliminate 150 enemies.'), 'combat', 'epic', 150),
  achievement('combat_kill_300', loc('Épouvante des Profondeurs', 'Terror of the Depths'), loc('Éliminer 300 ennemis.', 'Eliminate 300 enemies.'), 'combat', 'legendary', 300, { hidden: true }),
  achievement('combat_back_run_10', loc('Main de Traverse', 'Crosswind Hand'), loc('Tuer 10 ennemis par l’arrière dans une même run.', 'Kill 10 enemies from behind in a single run.'), 'combat', 'rare', 10, { rewardId: reward('accessoire', 3) }),
  achievement('combat_back_run_25', loc('Pirate à Rebours', 'Reverse Pirate'), loc('Tuer 25 ennemis par l’arrière dans une même run.', 'Kill 25 enemies from behind in a single run.'), 'combat', 'rare', 25, { hidden: true }),
  achievement('combat_back_run_50', loc('Juge des Arrières', 'Judge of Sterns'), loc('Tuer 50 ennemis par l’arrière dans une même run.', 'Kill 50 enemies from behind in a single run.'), 'combat', 'epic', 50, { hidden: true }),
  achievement('combat_shield_save_1', loc('Coque Sauvée', 'Saved Hull'), loc('Survivre une fois grâce au Bouclier.', 'Survive once thanks to the Shield.'), 'combat', 'common', 1),
  achievement('combat_shield_save_10', loc('Garde de Quart', 'Watch Guard'), loc('Survivre 10 fois grâce au Bouclier.', 'Survive 10 times thanks to the Shield.'), 'combat', 'rare', 10, { rewardId: reward('accessoire', 4) }),
  achievement('combat_shield_save_25', loc('Carapace de Corsaire', 'Corsair Carapace'), loc('Survivre 25 fois grâce au Bouclier.', 'Survive 25 times thanks to the Shield.'), 'combat', 'rare', 25, { hidden: true })
];

const economyAchievements: AchievementDefinition[] = [
  achievement('economy_coins_20', loc('Pièce de Soute', 'Cargo Coin'), loc('Ramasser 20 pièces.', 'Collect 20 coins.'), 'economy', 'common', 20),
  achievement('economy_coins_100', loc('Bourse Fendue', 'Split Purse'), loc('Ramasser 100 pièces.', 'Collect 100 coins.'), 'economy', 'uncommon', 100, { rewardId: reward('oreille', 8) }),
  achievement('economy_coins_300', loc('Coffre de Verre', 'Glass Chest'), loc('Ramasser 300 pièces.', 'Collect 300 coins.'), 'economy', 'rare', 300),
  achievement('economy_coins_500', loc('Trésor de Cale', 'Hold Treasure'), loc('Ramasser 500 pièces.', 'Collect 500 coins.'), 'economy', 'rare', 500, { rewardId: reward('accessoire', 5) }),
  achievement('economy_coins_700', loc('Marée au Butin', 'Booty Tide'), loc('Ramasser 700 pièces.', 'Collect 700 coins.'), 'economy', 'epic', 700, { hidden: true }),
  achievement('economy_coins_1200', loc('Île au Butin', 'Treasure Isle'), loc('Ramasser 1 200 pièces.', 'Collect 1,200 coins.'), 'economy', 'legendary', 1200, { hidden: true }),
  achievement('economy_buy_1', loc('Premier Troc', 'First Trade'), loc('Acheter un item en boutique.', 'Buy an item in the shop.'), 'economy', 'common', 1),
  achievement('economy_buy_5', loc('Cale Équipée', 'Outfitted Hold'), loc('Acheter 5 items en boutique.', 'Buy 5 shop items.'), 'economy', 'rare', 5),
  achievement('economy_buy_15', loc('Atelier de Bord', 'Deck Workshop'), loc('Acheter 15 items en boutique.', 'Buy 15 shop items.'), 'economy', 'rare', 15),
  achievement('economy_buy_30', loc('Arsenal de Reflets', 'Arsenal of Reflections'), loc('Acheter 30 items en boutique.', 'Buy 30 shop items.'), 'economy', 'epic', 30, { hidden: true }),
  achievement('modules_rare_1', loc('Première Trouvaille Rare', 'First Rare Find'), loc('Obtenir un module rare.', 'Collect a rare module.'), 'modules', 'uncommon', 1, { rewardId: reward('oreille', 9) }),
  achievement('modules_rare_10', loc('Râtelier Rare', 'Rare Rack'), loc('Obtenir 10 modules rares au total.', 'Collect 10 rare modules total.'), 'modules', 'rare', 10, { hidden: true }),
  achievement('modules_epic_1', loc('Première Trouvaille Epic', 'First Epic Find'), loc('Obtenir un module epic.', 'Collect an epic module.'), 'modules', 'rare', 1, { hidden: true }),
  achievement('modules_legendary_1', loc('Première Relique', 'First Relic'), loc('Obtenir un module légendaire.', 'Collect a legendary module.'), 'modules', 'epic', 1, { hidden: true, rewardId: reward('facemotif', 13) }),
  achievement('modules_legendary_5', loc('Cargaison de Légende', 'Legend Cargo'), loc('Obtenir 5 modules légendaires au total.', 'Collect 5 legendary modules total.'), 'modules', 'legendary', 5, { hidden: true })
];

const moduleAchievements: AchievementDefinition[] = [
  achievement('modules_unique_3', loc('Inventaire du Mousse', 'Deckhand Loadout'), loc('Obtenir 3 modules différents.', 'Collect 3 different modules.'), 'modules', 'common', 3),
  achievement('modules_unique_6', loc('Sac du Gabier', 'Lookout Satchel'), loc('Obtenir 6 modules différents.', 'Collect 6 different modules.'), 'modules', 'uncommon', 6, { rewardId: reward('eyes', 5) }),
  achievement('modules_unique_9', loc('Pont Bien Garni', 'Loaded Deck'), loc('Obtenir 9 modules différents.', 'Collect 9 different modules.'), 'modules', 'rare', 9, { rewardId: reward('eyes', 6) }),
  achievement('modules_unique_12', loc('Collection du Capitaine', 'Captain’s Collection'), loc('Obtenir les 12 modules principaux au moins une fois.', 'Collect all 12 main modules at least once.'), 'modules', 'epic', 12, { rewardId: reward('eyes', 7) }),
  achievement('modules_plane_1', loc('Première Toile', 'First Sailcloth'), loc('Obtenir le Planeur.', 'Collect the Glider.'), 'modules', 'common', 1),
  achievement('modules_shield_1', loc('Première Carapace', 'First Carapace'), loc('Obtenir le Bouclier.', 'Collect the Shield.'), 'modules', 'common', 1),
  achievement('modules_souffleur_1', loc('Premier Souffle', 'First Gust'), loc('Obtenir le Souffleur.', 'Collect the Blower.'), 'modules', 'common', 1),
  achievement('modules_propulseur_1', loc('Premier Réacteur', 'First Thruster'), loc('Obtenir le Réacteur.', 'Collect the Reactor.'), 'modules', 'common', 1),
  achievement('modules_reacteur_back_1', loc('Première Poupe Chaude', 'First Warm Stern'), loc('Obtenir le Réacteur arrière.', 'Collect the Rear Reactor.'), 'modules', 'common', 1),
  achievement('modules_reacteur_front_1', loc('Première Proue Chaude', 'First Warm Prow'), loc('Obtenir le Réacteur avant.', 'Collect the Front Reactor.'), 'modules', 'common', 1),
  achievement('modules_wings_10', loc('Battement d’Écume', 'Foambeat'), loc('Utiliser les Ailes 10 fois.', 'Use Wings 10 times.'), 'modules', 'uncommon', 10, { rewardId: reward('eyes', 8) }),
  achievement('modules_grappin_10', loc('Accroche-Houle', 'Swell Hook'), loc('Réussir 10 grappins.', 'Land 10 successful grapples.'), 'modules', 'rare', 10, { rewardId: reward('accessoire', 6) }),
  achievement('modules_grappin_40', loc('Liane des Éclats', 'Shard Vine'), loc('Réussir 40 grappins.', 'Land 40 successful grapples.'), 'modules', 'epic', 40, { hidden: true }),
  achievement('modules_wrapper_5', loc('Claquement d’Éclat', 'Shard Snap'), loc('Utiliser le Téléporteur 5 fois.', 'Use the Teleporter 5 times.'), 'modules', 'rare', 5, { rewardId: reward('facemotif', 12) }),
  achievement('modules_wrapper_25', loc('Traverse-Miroir', 'Mirror Traverse'), loc('Utiliser le Téléporteur 25 fois.', 'Use the Teleporter 25 times.'), 'modules', 'epic', 25, { hidden: true }),
  achievement('modules_front_canon_10', loc('Impulsion de Proue', 'Prow Pulse'), loc('Déclencher le Canon avant 10 fois.', 'Trigger the Front Cannon 10 times.'), 'modules', 'uncommon', 10),
  achievement('modules_front_canon_25', loc('Percée de Proue', 'Prow Breakthrough'), loc('Déclencher le Canon avant 25 fois.', 'Trigger the Front Cannon 25 times.'), 'modules', 'epic', 25, { hidden: true }),
  achievement('modules_big_canon_10', loc('Tonnerre de Cale', 'Hold Thunder'), loc('Déclencher le Canon géant 10 fois.', 'Trigger the Big Cannon 10 times.'), 'modules', 'rare', 10),
  achievement('modules_big_canon_25', loc('Canon des Tempêtes', 'Storm Cannon'), loc('Déclencher le Canon géant 25 fois.', 'Trigger the Big Cannon 25 times.'), 'modules', 'epic', 25, { hidden: true }),
  achievement('modules_gravity_belt_1', loc('Suture Gravitationnelle', 'Gravity Stitch'), loc('Obtenir la Suture gravitationnelle.', 'Collect the Gravity Stitch passive.'), 'modules', 'uncommon', 1),
  achievement('modules_air_combo_3', loc('Escadre de Poche', 'Pocket Air Squadron'), loc('Combiner 3 modules aériens dans une même run.', 'Combine 3 airborne modules in a single run.'), 'modules', 'rare', 3, { hidden: true, rewardId: reward('accessoire', 10) })
];

export const ACHIEVEMENT_REGISTRY: AchievementDefinition[] = [
  ...progressionAchievements,
  ...shardAchievements,
  ...skillAchievements,
  ...momentumAchievements,
  ...combatAchievements,
  ...economyAchievements,
  ...moduleAchievements
].sort(sortAchievementsByRarity);

export const ACHIEVEMENT_REGISTRY_BY_ID = new Map(ACHIEVEMENT_REGISTRY.map((achievement) => [achievement.id, achievement]));
