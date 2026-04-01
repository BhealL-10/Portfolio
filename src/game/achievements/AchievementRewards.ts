import type { AchievementAvatarLayer, AchievementRewardDefinition } from './AchievementTypes';

const AVATAR_LAYER_COUNTS: Record<AchievementAvatarLayer, number> = {
  oreille: 9,
  face: 5,
  eyes: 9,
  facemotif: 15,
  accessoire: 17
};

const AVATAR_LAYER_NAMES = {
  oreille: { fr: 'Oreilles', en: 'Ears' },
  face: { fr: 'Face', en: 'Face' },
  eyes: { fr: 'Yeux', en: 'Eyes' },
  facemotif: { fr: 'Face motif', en: 'Face motif' },
  accessoire: { fr: 'Accessoire', en: 'Accessory' }
} as const;

const LEGACY_LAYER_ALIASES = {
  background: 'oreille',
  motif: 'face',
  face: 'eyes',
  eyes: 'facemotif',
  barbe: 'accessoire'
} as const;

export function createAchievementRewardId(layer: AchievementAvatarLayer, humanIndex: number) {
  return `avatar-${layer}-${humanIndex}`;
}

function createAvatarReward(layer: AchievementAvatarLayer, index: number): AchievementRewardDefinition {
  const humanIndex = index + 1;
  const layerName = AVATAR_LAYER_NAMES[layer];
  return {
    id: createAchievementRewardId(layer, humanIndex),
    name: {
      fr: `${layerName.fr} ${humanIndex}`,
      en: `${layerName.en} ${humanIndex}`
    },
    description: {
      fr: `Débloque ${layerName.fr.toLocaleLowerCase('fr-FR')} ${humanIndex} dans l’éditeur d’avatar.`,
      en: `Unlocks ${layerName.en.toLocaleLowerCase('en-US')} ${humanIndex} in the avatar editor.`
    },
    avatarUnlocks: [
      {
        layer,
        index,
        label: {
          fr: `${layerName.fr} ${humanIndex}`,
          en: `${layerName.en} ${humanIndex}`
        }
      }
    ]
  };
}

export const ACHIEVEMENT_REWARDS: AchievementRewardDefinition[] = (Object.entries(AVATAR_LAYER_COUNTS) as Array<
  [AchievementAvatarLayer, number]
>).flatMap(([layer, count]) => {
  const rewards: AchievementRewardDefinition[] = [];
  for (let index = 1; index < count; index += 1) {
    rewards.push(createAvatarReward(layer, index));
  }
  return rewards;
});

export const ACHIEVEMENT_REWARDS_BY_ID = new Map(ACHIEVEMENT_REWARDS.map((reward) => [reward.id, reward]));

for (const reward of ACHIEVEMENT_REWARDS) {
  const legacyLayer = Object.entries(LEGACY_LAYER_ALIASES).find(([, layer]) => layer === reward.avatarUnlocks[0]?.layer)?.[0];
  if (!legacyLayer) {
    continue;
  }
  const humanIndex = reward.avatarUnlocks[0]!.index + 1;
  ACHIEVEMENT_REWARDS_BY_ID.set(`avatar-${legacyLayer}-${humanIndex}`, reward);
}
