import type { LocalizedText, Language } from '../../types/content';

export const ACHIEVEMENT_AVATAR_LAYERS = ['background', 'motif', 'face', 'eyes', 'barbe'] as const;

export type AchievementAvatarLayer = (typeof ACHIEVEMENT_AVATAR_LAYERS)[number];
export type AchievementCategory = 'progression' | 'shards' | 'skill' | 'momentum' | 'combat' | 'economy' | 'modules';
export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface AchievementAvatarUnlockDefinition {
  layer: AchievementAvatarLayer;
  index: number;
  label?: LocalizedText;
}

export interface AchievementRewardDefinition {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  avatarUnlocks: AchievementAvatarUnlockDefinition[];
}

export interface AchievementDefinition {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  category: AchievementCategory;
  rarity: AchievementRarity;
  hidden?: boolean;
  target?: number;
  rewardId?: string | null;
}

export interface AchievementPersistenceState {
  unlocked: string[];
  progress: Record<string, number>;
  claimedRewards?: string[];
}

export interface AchievementUnlockNotification {
  achievementId: string;
}

export interface AchievementAvatarUnlockSnapshot {
  layer: AchievementAvatarLayer;
  layerLabel: string;
  index: number;
  label: string;
}

export interface AchievementRewardSnapshot {
  id: string;
  name: string;
  description: string;
  unlocks: AchievementAvatarUnlockSnapshot[];
}

export interface AchievementEntrySnapshot {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  categoryLabel: string;
  rarity: AchievementRarity;
  rarityEmoji: string;
  rarityLabel: string;
  unlocked: boolean;
  unlockOrder: number | null;
  hidden: boolean;
  mystery: boolean;
  progress: number;
  target: number | null;
  reward: AchievementRewardSnapshot | null;
}

export interface AchievementPanelSnapshot {
  serial: number;
  summary: {
    unlockedCount: number;
    totalCount: number;
    rewardsUnlocked: number;
    hiddenRemaining: number;
  };
  entries: AchievementEntrySnapshot[];
  profile: {
    unlockedRewards: AchievementRewardSnapshot[];
    unlockedAchievements: AchievementEntrySnapshot[];
    runUnlockedAchievements: AchievementEntrySnapshot[];
    avatarUnlocks: Record<AchievementAvatarLayer, number[]>;
  };
}

export interface AchievementToastSnapshot {
  serial: number;
  id: string;
  name: string;
  rarity: AchievementRarity;
  rarityEmoji: string;
  rarityLabel: string;
  rewardLabel: string | null;
  progress: number;
}

export const ACHIEVEMENT_RARITY_EMOJIS: Record<AchievementRarity, string> = {
  common: '⚪',
  uncommon: '🟢',
  rare: '🔵',
  epic: '🟣',
  legendary: '🟡'
};

export const ACHIEVEMENT_CATEGORY_LABELS: Record<AchievementCategory, LocalizedText> = {
  progression: { fr: 'Navigation', en: 'Navigation' },
  shards: { fr: 'Fragments', en: 'Shards' },
  skill: { fr: 'Flow', en: 'Flow' },
  momentum: { fr: 'Momentum', en: 'Momentum' },
  combat: { fr: 'Combat', en: 'Combat' },
  economy: { fr: 'Cale', en: 'Cargo' },
  modules: { fr: 'Arsenal', en: 'Arsenal' }
};

export const ACHIEVEMENT_RARITY_LABELS: Record<AchievementRarity, LocalizedText> = {
  common: { fr: 'Commun', en: 'Common' },
  uncommon: { fr: 'Peu commun', en: 'Uncommon' },
  rare: { fr: 'Rare', en: 'Rare' },
  epic: { fr: 'Epic', en: 'Epic' },
  legendary: { fr: 'Légendaire', en: 'Legendary' }
};

export const ACHIEVEMENT_AVATAR_LAYER_LABELS: Record<AchievementAvatarLayer, LocalizedText> = {
  background: { fr: 'Fond', en: 'Background' },
  motif: { fr: 'Motif', en: 'Pattern' },
  face: { fr: 'Visage', en: 'Face' },
  eyes: { fr: 'Yeux', en: 'Eyes' },
  barbe: { fr: 'Barbe', en: 'Beard' }
};

export function localizeAchievementText(value: LocalizedText, locale: Language) {
  return value[locale];
}

export function createDefaultAchievementAvatarUnlocks(): Record<AchievementAvatarLayer, number[]> {
  return {
    background: [0],
    motif: [0],
    face: [0],
    eyes: [0],
    barbe: [0]
  };
}

export function createEmptyAchievementPanelSnapshot(): AchievementPanelSnapshot {
  return {
    serial: 0,
    summary: {
      unlockedCount: 0,
      totalCount: 0,
      rewardsUnlocked: 0,
      hiddenRemaining: 0
    },
    entries: [],
    profile: {
      unlockedRewards: [],
      unlockedAchievements: [],
      runUnlockedAchievements: [],
      avatarUnlocks: createDefaultAchievementAvatarUnlocks()
    }
  };
}
