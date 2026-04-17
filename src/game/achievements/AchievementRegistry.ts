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
  achievement('progress_distance_100', loc('Ça commence bien', 'That’s a start'), loc('Parcourir 100 m dans une run.', 'Travel 100m in a single run.'), 'progression', 'common', 100),
  achievement('progress_distance_250', loc('Tu peux faire mieux', 'You can do better'), loc('Parcourir 250 m dans une run.', 'Travel 250m in a single run.'), 'progression', 'common', 250, { rewardId: reward('oreille', 2) }),
  achievement('progress_distance_500', loc('Tu prends la distance', 'You’re getting somewhere'), loc('Parcourir 500 m dans une run.', 'Travel 500m in a single run.'), 'progression', 'uncommon', 500, { rewardId: reward('oreille', 3) }),
  achievement('progress_distance_750', loc('Qui va t’arrêter ?', 'Who’s stopping you?'), loc('Parcourir 750 m dans une run.', 'Travel 750m in a single run.'), 'progression', 'uncommon', 750, { hidden: true }),
  achievement('progress_distance_1000', loc('Là, ça devient gênant', 'Okay, this is getting serious'), loc('Parcourir 1 000 m dans une run.', 'Travel 1,000m in a single run.'), 'progression', 'rare', 1000, { hidden: true }),
  achievement('progress_distance_1500', loc('Toujours pas coulé', 'Still not sunk'), loc('Parcourir 1 500 m dans une run.', 'Travel 1,500m in a single run.'), 'progression', 'rare', 1500, { rewardId: reward('face', 2) }),
  achievement('progress_distance_2000', loc('Tu forces un peu là', 'You’re overdoing it now'), loc('Parcourir 2 000 m dans une run.', 'Travel 2,000m in a single run.'), 'progression', 'rare', 2000, { hidden: true }),
  achievement('progress_distance_3000', loc('Le rivage te cherche encore', 'The shore lost you'), loc('Parcourir 3 000 m dans une run.', 'Travel 3,000m in a single run.'), 'progression', 'epic', 3000, { rewardId: reward('facemotif', 2) }),
  achievement('progress_distance_4000', loc('Même les mouettes ont lâché', 'Even the gulls gave up'), loc('Parcourir 4 000 m dans une run.', 'Travel 4,000m in a single run.'), 'progression', 'epic', 4000, { hidden: true, rewardId: reward('facemotif', 3) }),
  achievement('progress_distance_5000', loc('Bon, t’habites ici maintenant', 'You live here now'), loc('Parcourir 5 000 m dans une run.', 'Travel 5,000m in a single run.'), 'progression', 'legendary', 5000, { hidden: true }),
  achievement('progress_survive_60', loc('Tomber ? Quelle idée', 'Falling? Weird choice'), loc('Cumuler 60 secondes réelles en l’air dans une run.', 'Accumulate 60 real airtime seconds in a run.'), 'progression', 'common', 60),
  achievement('progress_survive_90', loc('Toujours en l’air ?', 'Still up there?'), loc('Cumuler 90 secondes réelles en l’air dans une run.', 'Accumulate 90 real airtime seconds in a run.'), 'progression', 'common', 90, { hidden: true }),
  achievement('progress_survive_120', loc('Pas très terrestre tout ça', 'Not very ground-based'), loc('Cumuler 120 secondes réelles en l’air dans une run.', 'Accumulate 120 real airtime seconds in a run.'), 'progression', 'common', 120, { rewardId: reward('eyes', 2) }),
  achievement('progress_survive_180', loc('Le sol te manque pas ?', 'Don’t you miss the ground?'), loc('Cumuler 180 secondes réelles en l’air dans une run.', 'Accumulate 180 real airtime seconds in a run.'), 'progression', 'uncommon', 180, { rewardId: reward('eyes', 3) }),
  achievement('progress_survive_300', loc('Pilote sans permis', 'Unlicensed pilot'), loc('Cumuler 300 secondes réelles en l’air dans une run.', 'Accumulate 300 real airtime seconds in a run.'), 'progression', 'rare', 300, { rewardId: reward('accessoire', 2) }),
  achievement('progress_survive_900', loc('T’as oublié d’atterrir', 'You forgot to land'), loc('Cumuler 900 secondes réelles en l’air dans une run.', 'Accumulate 900 real airtime seconds in a run.'), 'progression', 'legendary', 900, { hidden: true }),
  achievement('progress_early_fail_streak_5', loc('Plan très court', 'Very short flight plan'), loc('Mourir avant 10 m pendant 5 runs d’affilée.', 'Die before 10m in 5 runs in a row.'), 'progression', 'rare', 5, { hidden: true, rewardId: reward('accessoire', 17) }),
  achievement('progress_fail_streak_10', loc('Persévérer dans l’échec', 'Consistently terrible'), loc('Enchaîner 5 game overs d’affilée.', 'Chain 5 game overs in a row.'), 'progression', 'epic', 5, { hidden: true, rewardId: reward('accessoire', 8) }),
  achievement('progress_leaderboard_first', loc('Tiens, le boss, tu le sais ça ?', 'You’re the boss at the top, you know that?'), loc('Être premier du leaderboard.', 'Be first on the leaderboard.'), 'progression', 'legendary', 1, { hidden: true, rewardId: reward('accessoire', 13) }),
  achievement('progress_reverse_launch_1', loc('Demi-tour sec', 'Snap reverse'), loc('Réussir un premier lancement inversé sur une ancre.', 'Trigger your first reverse launch from an anchor.'), 'progression', 'common', 1, { hidden: true }),
  achievement('progress_reverse_launch_5', loc('Tu repars en arrière ?', 'Going backwards again?'), loc('Réussir 5 lancements inversés sur une ancre.', 'Trigger 5 reverse launches from anchors.'), 'progression', 'rare', 5, { hidden: true, rewardId: reward('accessoire', 14) }),
  achievement('progress_reverse_launch_15', loc('Rétrograde officiel', 'Official backslider'), loc('Réussir 15 lancements inversés sur une ancre.', 'Trigger 15 reverse launches from anchors.'), 'progression', 'epic', 15, { hidden: true }),
  achievement('mirror_mode_1', loc('De l’autre côté', 'Other side now'), loc('Entrer une première fois en mode miroir.', 'Enter mirror mode for the first time.'), 'progression', 'rare', 1, { hidden: true, rewardId: reward('facemotif', 13) }),
  achievement('mirror_toggle_3', loc('Va-et-vient', 'Back and forth'), loc('Basculer 3 fois entre les deux sens du monde.', 'Toggle between both world directions 3 times.'), 'progression', 'epic', 3, { hidden: true }),
  achievement('mirror_return_1', loc('Reviens donc', 'Come back then'), loc('Revenir du miroir une première fois.', 'Return from mirror mode once.'), 'progression', 'rare', 1, { hidden: true })
];

const shardAchievements: AchievementDefinition[] = [
  achievement('shards_land_1', loc('Bon, déjà ça', 'Well, that’s one'), loc('Atterrir une première fois.', 'Land once.'), 'shards', 'common', 1),
  achievement('shards_land_10', loc('Continue, t’es sur la bonne voie', 'You’re landing on purpose'), loc('Atterrir 10 fois.', 'Land 10 times.'), 'shards', 'common', 10, { rewardId: reward('oreille', 4) }),
  achievement('shards_land_25', loc('Ça devient une habitude', 'Starting to look intentional'), loc('Atterrir 25 fois.', 'Land 25 times.'), 'shards', 'uncommon', 25, { rewardId: reward('eyes', 4) }),
  achievement('shards_land_50', loc('Tu connais le pont maintenant', 'You know the drill now'), loc('Atterrir 50 fois.', 'Land 50 times.'), 'shards', 'uncommon', 50, { rewardId: reward('oreille', 5) }),
  achievement('shards_land_100', loc('Tu retombes toujours sur tes pattes', 'You keep sticking the landing'), loc('Atterrir 100 fois.', 'Land 100 times.'), 'shards', 'rare', 100, { hidden: true }),
  achievement('shards_land_200', loc('À ce stade, tu te gares', 'At this point you’re parking'), loc('Atterrir 200 fois.', 'Land 200 times.'), 'shards', 'epic', 200, { hidden: true }),
  achievement('shards_land_300', loc('T’atterris mieux que tu vis', 'You land better than you live'), loc('Réussir 300 atterrissages perfect.', 'Land 300 perfects.'), 'shards', 'legendary', 300, { hidden: true }),
  achievement('shards_chain_8', loc('Ça s’enchaîne pas mal', 'That’s a nice streak'), loc('Enchaîner 3 atterrissages Super ou Perfect.', 'Chain 3 Super or Perfect landings.'), 'shards', 'uncommon', 3, { rewardId: reward('eyes', 5) }),
  achievement('shards_chain_12', loc('Ne casse pas le rythme', 'Don’t ruin it now'), loc('Enchaîner 5 atterrissages Super ou Perfect.', 'Chain 5 Super or Perfect landings.'), 'shards', 'uncommon', 5, { hidden: true }),
  achievement('shards_chain_20', loc('Là c’est propre', 'Now that’s clean'), loc('Enchaîner 2 atterrissages Perfect.', 'Chain 2 Perfect landings.'), 'shards', 'rare', 2, { rewardId: reward('face', 3) }),
  achievement('shards_chain_30', loc('Tu te la racontes un peu', 'You’re showing off now'), loc('Enchaîner 3 atterrissages Perfect.', 'Chain 3 Perfect landings.'), 'shards', 'epic', 3, { hidden: true }),
  achievement('shards_chain_40', loc('On a compris, t’es précis', 'Okay, we get it, you’re precise'), loc('Enchaîner 5 atterrissages Perfect.', 'Chain 5 Perfect landings.'), 'shards', 'legendary', 5, { hidden: true }),
  achievement('shards_milestone_1', loc('Tiens, un gros caillou', 'Oh look, a big one'), loc('Atteindre une shard milestone.', 'Reach a milestone shard.'), 'shards', 'uncommon', 1, { rewardId: reward('eyes', 6) }),
  achievement('shards_milestone_3', loc('T’as chopé le timing, j’espère ?', 'You’re seeing the pattern'), loc('Atteindre 3 shards milestone.', 'Reach 3 milestone shards.'), 'shards', 'rare', 3, { hidden: true }),
  achievement('shards_milestone_5', loc('Ça devient gênant si t’as pas compris le truc, là ?', 'Are you reading the secret map?'), loc('Atteindre 5 shards milestone.', 'Reach 5 milestone shards.'), 'shards', 'epic', 5, { hidden: true }),
  achievement('shards_triangular_5', loc('Elles ne lâchent pas l’affaire', 'These ones bite back'), loc('Dompter 5 shards triangulaires.', 'Master 5 triangular shards.'), 'shards', 'epic', 5, { hidden: true, rewardId: reward('facemotif', 4) }),
  achievement('shards_triangular_15', loc('Tu cherches les ennuis', 'You do pick bad ideas'), loc('Dompter 15 shards triangulaires.', 'Master 15 triangular shards.'), 'shards', 'rare', 15, { hidden: true }),
  achievement('shards_triangular_30', loc('Tu mords avant qu’elles mordent', 'Bite them before they bite you'), loc('Dompter 30 shards triangulaires.', 'Master 30 triangular shards.'), 'shards', 'epic', 30, { hidden: true }),
  achievement('shards_100_without_milestone_reward', loc('Même pas tenté', 'You didn’t even peek'), loc('Atteindre 100 m sans prendre de récompense de milestone.', 'Reach 100m without taking a milestone reward.'), 'shards', 'epic', 1, { hidden: true, rewardId: reward('accessoire', 9) }),
  achievement('mirror_land_5', loc('Côté pile', 'Backside glass'), loc('Atterrir 5 fois en mode miroir.', 'Land 5 times in mirror mode.'), 'shards', 'rare', 5, { hidden: true }),
  achievement('mirror_land_15', loc('Reflet stable', 'Steady reflection'), loc('Atterrir 15 fois en mode miroir.', 'Land 15 times in mirror mode.'), 'shards', 'epic', 15, { hidden: true }),
  achievement('shards_moving_land_5', loc('Tu peux rester en place ?', 'Could you hold still?'), loc('Atterrir 5 fois sur des shards mouvantes.', 'Land 5 times on moving shards.'), 'shards', 'rare', 5, { hidden: true }),
  achievement('shards_shop_land_3', loc('Atterrissage marchand', 'Retail landing'), loc('Atterrir 3 fois sur une shard boutique.', 'Land 3 times on a shop shard.'), 'shards', 'uncommon', 3),
  achievement('shards_milestone_peek_3', loc('Je regarde juste', 'Just looking'), loc('Toucher 3 milestones avant de prendre une récompense.', 'Touch 3 milestones before claiming a reward.'), 'shards', 'epic', 3, { hidden: true })
];

const skillAchievements: AchievementDefinition[] = [
  achievement('skill_twist_5', loc('Petit tour pour voir', 'Just a little spin'), loc('Réaliser 5 twists.', 'Perform 5 twists.'), 'skill', 'common', 5),
  achievement('skill_twist_15', loc('Tu tournes bien toi', 'You spin nicely'), loc('Réaliser 15 twists.', 'Perform 15 twists.'), 'skill', 'common', 15, { rewardId: reward('oreille', 6) }),
  achievement('skill_twist_30', loc('On dirait presque du style', 'Almost looks stylish'), loc('Réaliser 30 twists.', 'Perform 30 twists.'), 'skill', 'uncommon', 30, { hidden: true }),
  achievement('skill_twist_50', loc('T’as mangé une toupie ?', 'Did you eat a spinning top?'), loc('Réaliser 50 twists.', 'Perform 50 twists.'), 'skill', 'rare', 50, { rewardId: reward('face', 4) }),
  achievement('skill_twist_75', loc('Ça visse sec', 'That thing’s screwed in'), loc('Réaliser 75 twists.', 'Perform 75 twists.'), 'skill', 'rare', 75, { hidden: true }),
  achievement('skill_twist_150', loc('Machine à vrilles', 'Industrial-grade spinning'), loc('Réaliser 150 twists.', 'Perform 150 twists.'), 'skill', 'epic', 150, { hidden: true }),
  achievement('skill_perfect_1', loc('Pile dedans', 'Right on it'), loc('Réussir un premier atterrissage perfect.', 'Land your first perfect.'), 'skill', 'common', 1),
  achievement('skill_perfect_3', loc('Pas mal du tout', 'Pretty clean'), loc('Réussir 3 atterrissages perfect.', 'Land 3 perfects.'), 'skill', 'common', 3),
  achievement('skill_perfect_10', loc('Là, tu pinaille', 'Now you’re nitpicking'), loc('Réussir 10 atterrissages perfect.', 'Land 10 perfects.'), 'skill', 'uncommon', 10, { rewardId: reward('eyes', 7) }),
  achievement('skill_perfect_25', loc('Tu coupes les angles au rasoir', 'Cutting corners with a scalpel'), loc('Réussir 25 atterrissages perfect.', 'Land 25 perfects.'), 'skill', 'rare', 25, { rewardId: reward('facemotif', 5) }),
  achievement('skill_perfect_50', loc('Le verre te respecte', 'The glass respects you'), loc('Réussir 50 atterrissages perfect.', 'Land 50 perfects.'), 'skill', 'epic', 50, { hidden: true }),
  achievement('skill_perfect_100', loc('Tu triches avec la gravité', 'You are cheating gravity'), loc('Réussir 100 atterrissages perfect.', 'Land 100 perfects.'), 'skill', 'legendary', 100, { hidden: true }),
  achievement('skill_perfect_streak_2', loc('Ça se répète bien', 'Nice, do it again'), loc('Réaliser 2 perfects d’affilée.', 'Chain 2 perfects in a row.'), 'skill', 'uncommon', 2, { hidden: true }),
  achievement('skill_perfect_streak_3', loc('Continue, respire pas', 'Keep going, don’t blink'), loc('Réaliser 3 perfects d’affilée.', 'Chain 3 perfects in a row.'), 'skill', 'epic', 3, { hidden: true, rewardId: reward('facemotif', 6) }),
  achievement('skill_perfect_streak_4', loc('Tu joues avec un compas ?', 'Are you using a ruler?'), loc('Réaliser 4 perfects d’affilée.', 'Chain 4 perfects in a row.'), 'skill', 'rare', 4, { hidden: true }),
  achievement('skill_perfect_streak_6', loc('Bon, là c’est insultant', 'Okay, now it’s offensive'), loc('Réaliser 6 perfects d’affilée.', 'Chain 6 perfects in a row.'), 'skill', 'legendary', 6, { hidden: true }),
  achievement('skill_twist_streak_3', loc('Tu commences à t’emballer', 'You’re getting carried away'), loc('Enchaîner 3 twists d’affilée.', 'Chain 3 twists in a row.'), 'skill', 'uncommon', 3, { hidden: true }),
  achievement('skill_twist_streak_5', loc('On visse tout droit vers l’erreur', 'Spinning directly into trouble'), loc('Enchaîner 5 twists d’affilée.', 'Chain 5 twists in a row.'), 'skill', 'rare', 5, { hidden: true }),
  achievement('skill_twist_streak_10', loc('Lave-linge primate', 'Monkey washing machine'), loc('Enchaîner 10 twists d’affilée.', 'Chain 10 twists in a row.'), 'skill', 'epic', 10, { hidden: true }),
  achievement('skill_twist_streak_20', loc('T’arrêtes quand exactement ?', 'Do you ever stop spinning?'), loc('Enchaîner 20 twists d’affilée.', 'Chain 20 twists in a row.'), 'skill', 'legendary', 20, { hidden: true }),
  achievement('skill_super_streak_3', loc('Ça glisse bien', 'That flows nicely'), loc('Enchaîner 3 atterrissages Super d’affilée.', 'Chain 3 Super landings in a row.'), 'skill', 'uncommon', 3, { hidden: true }),
  achievement('skill_super_streak_5', loc('Toujours au-dessus', 'Still above average'), loc('Enchaîner 5 atterrissages Super d’affilée.', 'Chain 5 Super landings in a row.'), 'skill', 'rare', 5, { hidden: true }),
  achievement('skill_clean_streak_8', loc('Pas de bavure', 'No smudges'), loc('Enchaîner 8 atterrissages Good ou mieux sans rater.', 'Chain 8 Good-or-better landings without missing.'), 'skill', 'epic', 8, { hidden: true }),
  achievement('skill_perfect_twist_3', loc('Vrille propre', 'Clean spin'), loc('Réussir 3 perfects avec twist.', 'Land 3 twist perfects.'), 'skill', 'rare', 3, { hidden: true }),
  achievement('skill_perfect_twist_10', loc('Chirurgie orbitale', 'Orbital surgery'), loc('Réussir 10 perfects avec twist.', 'Land 10 twist perfects.'), 'skill', 'legendary', 10, { hidden: true }),
  achievement('skill_milestone_perfect_1', loc('Même sur les grosses', 'Even on the big ones'), loc('Réussir un perfect sur une milestone.', 'Land a perfect on a milestone.'), 'skill', 'rare', 1, { hidden: true }),
  achievement('skill_grade_pattern_fail_good_super_perfect', loc('Escalier social', 'Upward mobility'), loc('Enchaîner Miss, Good, Super puis Perfect dans cet ordre.', 'Chain Miss, Good, Super, then Perfect in that order.'), 'skill', 'epic', 1, { hidden: true }),
  achievement('skill_grade_pattern_perfect_super_good_miss', loc('La chute du roi', 'Royal collapse'), loc('Enchaîner Perfect, Super, Good puis Miss dans cet ordre.', 'Chain Perfect, Super, Good, then Miss in that order.'), 'skill', 'epic', 1, { hidden: true }),
  achievement('skill_grade_pattern_perfect_good_perfect', loc('Petit accroc, gros ego', 'Tiny wobble, huge ego'), loc('Enchaîner Perfect, Good puis Perfect.', 'Chain Perfect, Good, then Perfect.'), 'skill', 'rare', 1, { hidden: true }),
  achievement('mirror_perfect_3', loc('Reflet impeccable', 'Mirror-clean'), loc('Réussir 3 perfects en mode miroir.', 'Land 3 perfects in mirror mode.'), 'skill', 'epic', 3, { hidden: true, rewardId: reward('facemotif', 14) })
];

const momentumAchievements: AchievementDefinition[] = [
  achievement('momentum_reach_80', loc('Ça commence à pousser', 'Now it’s picking up'), loc('Atteindre 80 % de momentum.', 'Reach 80% momentum.'), 'momentum', 'uncommon', 1, { hidden: true }),
  achievement('momentum_reach_max', loc('Voilà, là ça va vite', 'There it is, full speed'), loc('Atteindre le momentum maximum.', 'Reach maximum momentum.'), 'momentum', 'common', 1),
  achievement('momentum_hold_max_5', loc('Tiens bon la barre', 'Hold that speed'), loc('Garder le momentum max 5 secondes.', 'Hold max momentum for 5 seconds.'), 'momentum', 'rare', 5, { rewardId: reward('face', 5) }),
  achievement('momentum_hold_max_10', loc('Le vent paie le loyer', 'Speed pays rent now'), loc('Garder le momentum max 10 secondes.', 'Hold max momentum for 10 seconds.'), 'momentum', 'epic', 10),
  achievement('momentum_hold_max_20', loc('On va fendre le décor', 'You’re about to cut the scenery'), loc('Garder le momentum max 20 secondes.', 'Hold max momentum for 20 seconds.'), 'momentum', 'legendary', 20, { hidden: true }),
  achievement('momentum_hold_high_15', loc('Tu gardes le rythme', 'You’re keeping pace'), loc('Rester en momentum élevé 15 secondes cumulées.', 'Stay at high momentum for 15 cumulative seconds.'), 'momentum', 'uncommon', 15, { hidden: true }),
  achievement('momentum_hold_high_45', loc('Ça file sans clignoter', 'Now that’s sustained speed'), loc('Rester en momentum élevé 45 secondes cumulées.', 'Stay at high momentum for 45 cumulative seconds.'), 'momentum', 'rare', 45, { rewardId: reward('facemotif', 7) }),
  achievement('momentum_hold_high_90', loc('Le moteur a peur de toi', 'The engine fears you'), loc('Rester en momentum élevé 90 secondes cumulées.', 'Stay at high momentum for 90 cumulative seconds.'), 'momentum', 'epic', 90),
  achievement('momentum_hold_high_120', loc('T’es devenu le courant', 'You became the current'), loc('Rester en momentum élevé 120 secondes cumulées.', 'Stay at high momentum for 120 cumulative seconds.'), 'momentum', 'legendary', 120, { hidden: true })
];

const combatAchievements: AchievementDefinition[] = [
  achievement('combat_kill_1', loc('Bon, lui non plus', 'Well, not that guy'), loc('Éliminer 1 ennemi.', 'Eliminate 1 enemy.'), 'combat', 'common', 1),
  achievement('combat_kill_10', loc('Ça tape déjà mieux', 'You’re getting the hang of violence'), loc('Éliminer 10 ennemis.', 'Eliminate 10 enemies.'), 'combat', 'common', 10, { rewardId: reward('oreille', 7) }),
  achievement('combat_kill_25', loc('Tu règles tes comptes', 'Settling things nicely'), loc('Éliminer 25 ennemis.', 'Eliminate 25 enemies.'), 'combat', 'uncommon', 25, { hidden: true }),
  achievement('combat_kill_50', loc('Ils devraient commencer à courir', 'They should start running'), loc('Éliminer 50 ennemis.', 'Eliminate 50 enemies.'), 'combat', 'uncommon', 50),
  achievement('combat_kill_75', loc('Tu laisses personne finir sa journée', 'Nobody’s clocking out today'), loc('Éliminer 75 ennemis.', 'Eliminate 75 enemies.'), 'combat', 'rare', 75, { hidden: true }),
  achievement('combat_kill_150', loc('Le service après-vente va appeler', 'Support is filing reports'), loc('Éliminer 150 ennemis.', 'Eliminate 150 enemies.'), 'combat', 'epic', 150),
  achievement('combat_kill_300', loc('On va manquer d’ennemis', 'We’re running out of enemies'), loc('Éliminer 300 ennemis.', 'Eliminate 300 enemies.'), 'combat', 'legendary', 300, { hidden: true }),
  achievement('combat_back_run_10', loc('Par derrière, évidemment', 'From behind, obviously'), loc('Tuer 10 ennemis par l’arrière dans une même run.', 'Kill 10 enemies from behind in a single run.'), 'combat', 'rare', 10, { rewardId: reward('accessoire', 3) }),
  achievement('combat_back_run_25', loc('Très fair-play tout ça', 'Very honorable combat'), loc('Tuer 25 ennemis par l’arrière dans une même run.', 'Kill 25 enemies from behind in a single run.'), 'combat', 'rare', 25, { hidden: true }),
  achievement('combat_back_run_50', loc('La discrétion a très mal tourné', 'Stealth escalated quickly'), loc('Tuer 50 ennemis par l’arrière dans une même run.', 'Kill 50 enemies from behind in a single run.'), 'combat', 'epic', 50, { hidden: true }),
  achievement('combat_shield_save_1', loc('Ça compte comme du skill', 'Totally counts as skill'), loc('Survivre une fois grâce au Bouclier.', 'Survive once thanks to the Shield.'), 'combat', 'common', 1),
  achievement('combat_shield_save_10', loc('Sans ça, t’étais fini', 'That shield is carrying you'), loc('Survivre 10 fois grâce au Bouclier.', 'Survive 10 times thanks to the Shield.'), 'combat', 'rare', 10, { rewardId: reward('accessoire', 4) }),
  achievement('combat_shield_save_25', loc('Bouclier sous CDI', 'Your shield has a full-time job'), loc('Survivre 25 fois grâce au Bouclier.', 'Survive 25 times thanks to the Shield.'), 'combat', 'rare', 25, { hidden: true }),
  achievement('combat_front_canon_kill_10', loc('Impulsion de Proue', 'Prow Pulse'), loc('Éliminer 10 ennemis avec le Canon avant.', 'Eliminate 10 enemies with the Front Cannon.'), 'combat', 'rare', 10, { hidden: true, rewardId: reward('accessoire', 11) }),
  achievement('combat_front_canon_kill_25', loc('Couloir nettoyé', 'Cleared corridor'), loc('Éliminer 25 ennemis avec le Canon avant.', 'Eliminate 25 enemies with the Front Cannon.'), 'combat', 'epic', 25, { hidden: true }),
  achievement('combat_big_canon_kill_10', loc('Diplomatie lourde', 'Heavy diplomacy'), loc('Éliminer 10 ennemis avec le Canon géant.', 'Eliminate 10 enemies with the Big Cannon.'), 'combat', 'rare', 10, { hidden: true }),
  achievement('combat_big_canon_kill_25', loc('Argument géant', 'Oversized argument'), loc('Éliminer 25 ennemis avec le Canon géant.', 'Eliminate 25 enemies with the Big Cannon.'), 'combat', 'epic', 25, { hidden: true }),
  achievement('combat_double_kill_5s', loc('Deux d’un coup', 'Two in one go'), loc('Éliminer 2 ennemis en moins de 5 secondes.', 'Eliminate 2 enemies within 5 seconds.'), 'combat', 'uncommon', 1, { hidden: true }),
  achievement('combat_triple_kill_5s', loc('Service rapide', 'Fast service'), loc('Éliminer 3 ennemis en moins de 5 secondes.', 'Eliminate 3 enemies within 5 seconds.'), 'combat', 'rare', 1, { hidden: true }),
  achievement('combat_back_double_kill_5s', loc('Par derrière, en double', 'Double cheap shot'), loc('Éliminer 2 ennemis par l’arrière en moins de 5 secondes.', 'Eliminate 2 enemies from behind within 5 seconds.'), 'combat', 'rare', 1, { hidden: true }),
  achievement('mirror_kill_5', loc('Nettoyage du reflet', 'Mirror cleanup'), loc('Éliminer 5 ennemis en mode miroir.', 'Eliminate 5 enemies in mirror mode.'), 'combat', 'epic', 5, { hidden: true }),
  achievement('mirror_back_kill_3', loc('Le reflet n’a rien vu', 'The reflection saw nothing'), loc('Éliminer 3 ennemis par l’arrière en mode miroir.', 'Eliminate 3 back kills in mirror mode.'), 'combat', 'epic', 3, { hidden: true }),
  achievement('combat_enemy_top_1', loc('Le plafond attaque', 'The ceiling fights back'), loc('Éliminer un premier ennemi du haut.', 'Defeat your first top enemy.'), 'combat', 'common', 1, { hidden: true }),
  achievement('combat_enemy_top_10', loc('Anti-plafond', 'Ceiling inspector'), loc('Éliminer 10 ennemis du haut.', 'Defeat 10 top enemies.'), 'combat', 'rare', 10, { hidden: true, rewardId: reward('accessoire', 15) }),
  achievement('combat_enemy_bot_1', loc('Ça sort du sol', 'Something came from below'), loc('Éliminer un premier ennemi du bas.', 'Defeat your first bottom enemy.'), 'combat', 'common', 1, { hidden: true }),
  achievement('combat_enemy_bot_15', loc('Pêche au fond', 'Bottom feeder'), loc('Éliminer 15 ennemis du bas.', 'Defeat 15 bottom enemies.'), 'combat', 'epic', 15, { hidden: true })
];

const economyAchievements: AchievementDefinition[] = [
  achievement('economy_coins_20', loc('Ça paie une soupe', 'That buys soup'), loc('Ramasser 20 pièces.', 'Collect 20 coins.'), 'economy', 'common', 20),
  achievement('economy_coins_100', loc('C’est bon, t’es devenu un libéral', 'Now you check price tags'), loc('Ramasser 100 pièces.', 'Collect 100 coins.'), 'economy', 'uncommon', 100, { rewardId: reward('oreille', 8) }),
  achievement('economy_coins_300', loc('Le capitalisme t’a eu', 'Certified loot goblin'), loc('Ramasser 300 pièces.', 'Collect 300 coins.'), 'economy', 'rare', 300, { hidden: true }),
  achievement('economy_coins_500', loc('Tu veux un bon plan d’exil fiscal ?', 'Your hold is jingling'), loc('Ramasser 500 pièces.', 'Collect 500 coins.'), 'economy', 'rare', 500, { rewardId: reward('accessoire', 5) }),
  achievement('economy_coins_700', loc('Tu peux arrêter la faim dans le monde, mais tu joues, et c’est bien', 'This is becoming taxable'), loc('Ramasser 700 pièces.', 'Collect 700 coins.'), 'economy', 'epic', 700, { hidden: true }),
  achievement('economy_coins_1200', loc('Bernard Arnault ?', 'Pirate-sector millionaire'), loc('Ramasser 1 200 pièces.', 'Collect 1,200 coins.'), 'economy', 'legendary', 1200, { hidden: true }),
  achievement('economy_buy_1', loc('Bon, allez, un petit achat', 'Fine, one little purchase'), loc('Acheter un item en boutique.', 'Buy an item in the shop.'), 'economy', 'common', 1),
  achievement('economy_buy_5', loc('Tu prends goût aux dépenses', 'You enjoy spending, huh'), loc('Acheter 5 items en boutique.', 'Buy 5 shop items.'), 'economy', 'rare', 5),
  achievement('economy_buy_15', loc('La boutique te connaît par ton prénom', 'The shopkeeper knows you now'), loc('Acheter 15 items en boutique.', 'Buy 15 shop items.'), 'economy', 'rare', 15, { hidden: true }),
  achievement('economy_buy_30', loc('Client beaucoup trop fidèle', 'Way too loyal a customer'), loc('Acheter 30 items en boutique.', 'Buy 30 shop items.'), 'economy', 'epic', 30, { hidden: true }),
  achievement('economy_shop_visit_1', loc('Lèche-vitrine', 'Window shopper'), loc('Atteindre une boutique pour la première fois.', 'Reach a shop for the first time.'), 'economy', 'common', 1, { hidden: true }),
  achievement('economy_question_pickup_1', loc('Mystère ramassé', 'Mystery collected'), loc('Toucher un premier bonus marqué d’un point d’interrogation.', 'Touch your first question-mark reward.'), 'economy', 'common', 1, { hidden: true }),
  achievement('economy_buy_rare_3', loc('Goût coûteux', 'Expensive taste'), loc('Acheter 3 objets rares ou mieux.', 'Buy 3 rare-or-better items.'), 'economy', 'rare', 3, { hidden: true }),
  achievement('modules_rare_1', loc('Oh, ça brille un peu', 'Ooh, a shiny one'), loc('Obtenir un module rare.', 'Collect a rare module.'), 'modules', 'uncommon', 1, { rewardId: reward('oreille', 9) }),
  achievement('modules_rare_10', loc('Tu fouilles bien les débris', 'You really dig through scraps'), loc('Obtenir 10 modules rares au total.', 'Collect 10 rare modules total.'), 'modules', 'rare', 10, { hidden: true }),
  achievement('modules_epic_1', loc('Là, ça sent la bonne pioche', 'Now that’s a good pull'), loc('Obtenir un module epic.', 'Collect an epic module.'), 'modules', 'rare', 1, { hidden: true }),
  achievement('modules_legendary_1', loc('Ça, fallait le toucher', 'That one was worth finding'), loc('Obtenir un module légendaire.', 'Collect a legendary module.'), 'modules', 'epic', 1, { hidden: true, rewardId: reward('facemotif', 10) }),
  achievement('modules_legendary_5', loc('T’es dans une autre catégorie', 'You’re in another league'), loc('Obtenir 5 modules légendaires au total.', 'Collect 5 legendary modules total.'), 'modules', 'legendary', 5, { hidden: true })
];

const moduleAchievements: AchievementDefinition[] = [
  achievement('modules_unique_3', loc('Tu touches à tout', 'Trying everything once'), loc('Obtenir 3 modules différents.', 'Collect 3 different modules.'), 'modules', 'common', 3),
  achievement('modules_unique_6', loc('Tu commences un vrai build', 'That’s starting to look like a build'), loc('Obtenir 6 modules différents.', 'Collect 6 different modules.'), 'modules', 'uncommon', 6, { rewardId: reward('eyes', 8) }),
  achievement('modules_unique_9', loc('T’as pris tout le rayon', 'You bought half the shop'), loc('Obtenir 9 modules différents.', 'Collect 9 different modules.'), 'modules', 'rare', 9, { rewardId: reward('facemotif', 8) }),
  achievement('modules_unique_12', loc('Plus d’excuse maintenant', 'No excuses now'), loc('Obtenir les 12 modules principaux au moins une fois.', 'Collect all 12 main modules at least once.'), 'modules', 'epic', 12, { rewardId: reward('facemotif', 9) }),
  achievement('modules_plane_1', loc('Ça plane pour toi', 'This should help'), loc('Obtenir le Planeur.', 'Collect the Glider.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_shield_1', loc('Tiens, une deuxième chance', 'Here, have a second chance'), loc('Obtenir le Bouclier.', 'Collect the Shield.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_souffleur_1', loc('Souffle mais reste digne', 'Blow responsibly'), loc('Obtenir le Souffleur.', 'Collect the Blower.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_propulseur_1', loc('Ça pousse derrière', 'Something’s pushing now'), loc('Obtenir le Réacteur.', 'Collect the Reactor.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_reacteur_back_1', loc('Attention aux fesses', 'Rear end now armed'), loc('Obtenir le Réacteur arrière.', 'Collect the Rear Reactor.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_reacteur_front_1', loc('Ça souffle devant aussi', 'Front end means business'), loc('Obtenir le Réacteur avant.', 'Collect the Front Reactor.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_magnet_1', loc('Aimant à problèmes', 'Trouble magnet'), loc('Obtenir l’Aimant.', 'Collect the Magnet.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_wrapper_1', loc('Pliage de réel', 'Fold the real'), loc('Obtenir le Téléporteur.', 'Collect the Teleporter.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_big_canon_1', loc('Gros calibre', 'Big caliber'), loc('Obtenir le Canon géant.', 'Collect the Big Cannon.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_front_canon_1', loc('Proue armée', 'Armed prow'), loc('Obtenir le Canon avant.', 'Collect the Front Cannon.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_grappin_1', loc('Premier crochet', 'First hook'), loc('Obtenir le Grappin.', 'Collect the Grapple.'), 'modules', 'common', 1, { hidden: true }),
  achievement('modules_wings_10', loc('Bats des ailes, pas des records', 'Flap first, ask questions later'), loc('Utiliser les Ailes 10 fois.', 'Use Wings 10 times.'), 'modules', 'uncommon', 10, { rewardId: reward('eyes', 9) }),
  achievement('modules_grappin_10', loc('Accroche-toi bien', 'Hang on tight'), loc('Réussir 10 grappins.', 'Land 10 successful grapples.'), 'modules', 'rare', 10, { rewardId: reward('accessoire', 6) }),
  achievement('modules_grappin_40', loc('Lâche rien, surtout pas ça', 'Do not let go'), loc('Réussir 40 grappins.', 'Land 40 successful grapples.'), 'modules', 'epic', 40, { hidden: true }),
  achievement('modules_wrapper_5', loc('Hop, plus là', 'Boop, gone'), loc('Utiliser le Téléporteur 5 fois.', 'Use the Teleporter 5 times.'), 'modules', 'rare', 5, { rewardId: reward('facemotif', 11) }),
  achievement('modules_wrapper_25', loc('Le réel est optionnel', 'Reality is negotiable'), loc('Utiliser le Téléporteur 25 fois.', 'Use the Teleporter 25 times.'), 'modules', 'epic', 25, { hidden: true }),
  achievement('modules_front_canon_10', loc('Ça part tout seul', 'It just goes off'), loc('Déclencher le Canon avant 10 fois.', 'Trigger the Front Cannon 10 times.'), 'modules', 'uncommon', 10, { rewardId: reward('accessoire', 11) }),
  achievement('modules_front_canon_25', loc('Pointe ça ailleurs', 'Point that somewhere else'), loc('Déclencher le Canon avant 25 fois.', 'Trigger the Front Cannon 25 times.'), 'modules', 'epic', 25, { hidden: true }),
  achievement('modules_big_canon_10', loc('Ça fait un gros bruit, oui', 'Big cannon, big noise'), loc('Déclencher le Canon géant 10 fois.', 'Trigger the Big Cannon 10 times.'), 'modules', 'rare', 10),
  achievement('modules_big_canon_25', loc('Toujours plus subtil', 'Still choosing subtlety, huh'), loc('Déclencher le Canon géant 25 fois.', 'Trigger the Big Cannon 25 times.'), 'modules', 'epic', 25, { hidden: true }),
  achievement('modules_gravity_belt_1', loc('La gravité fait un effort', 'Gravity is cooperating'), loc('Obtenir la Suture gravitationnelle.', 'Collect the Gravity Stitch passive.'), 'modules', 'uncommon', 1),
  achievement('modules_air_combo_3', loc('Escadre de Poche', 'Pocket Air Squadron'), loc('Combiner 3 modules aériens dans une même run.', 'Combine 3 airborne modules in a single run.'), 'modules', 'rare', 3, { hidden: true, rewardId: reward('facemotif', 12) }),
  achievement('modules_canon_combo_1', loc('Artillerie croisée', 'Cross artillery'), loc('Enchaîner Canon avant et Canon géant à moins de 5 secondes d’intervalle.', 'Use the Front Cannon and Big Cannon within 5 seconds of each other.'), 'modules', 'rare', 1, { hidden: true }),
  achievement('modules_canon_combo_5', loc('Batterie complète', 'Full battery'), loc('Réussir 5 combos entre Canon avant et Canon géant.', 'Pull off 5 Front Cannon and Big Cannon combos.'), 'modules', 'epic', 5, { hidden: true }),
  achievement('modules_sprint_fish_1', loc('Taxi poisson', 'Fish taxi'), loc('Monter une première fois sur un sprintFish.', 'Ride a sprintFish for the first time.'), 'modules', 'rare', 1, { hidden: true }),
  achievement('modules_sprint_fish_5', loc('Express saumâtre', 'Briny express'), loc('Monter 5 fois sur un sprintFish.', 'Ride a sprintFish 5 times.'), 'modules', 'epic', 5, { hidden: true, rewardId: reward('accessoire', 16) }),
  achievement('modules_sprint_fish_land_3', loc('Descendre avec grâce', 'Dismount with dignity'), loc('Réussir 3 atterrissages après un sprintFish.', 'Stick 3 landings after a sprintFish ride.'), 'modules', 'epic', 3, { hidden: true }),
  achievement('modules_fast_travel_5', loc('Couper par les débris', 'Take the shortcut'), loc('Réaliser 5 fast travels.', 'Perform 5 fast travels.'), 'modules', 'rare', 5, { hidden: true }),
  achievement('modules_fast_travel_20', loc('La ligne droite triche', 'Straight lines are cheating'), loc('Réaliser 20 fast travels.', 'Perform 20 fast travels.'), 'modules', 'legendary', 20, { hidden: true, rewardId: reward('facemotif', 15) }),
  achievement('modules_auto_teleport_5', loc('Téléporté, pas désolé', 'Teleported, not sorry'), loc('Déclencher 5 téléportations automatiques.', 'Trigger 5 automatic teleports.'), 'modules', 'epic', 5, { hidden: true }),
  achievement('modules_warp_3', loc('Trou de verre', 'Glass warp'), loc('Déclencher 3 warps longue portée.', 'Trigger 3 long-range warps.'), 'modules', 'epic', 3, { hidden: true })
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
