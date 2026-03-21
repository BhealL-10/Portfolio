import { getItemById, type RogueliteItemKind, type RogueliteRarity } from './roguelite';
import type { UIStringKey } from '../ui/I18nService';

interface GameOverEquipmentItem {
  id: string;
  iconSrc: string;
  rarityIconSrc: string;
  rarity: RogueliteRarity;
  kind: RogueliteItemKind;
}

interface GameOverSummaryData {
  score: number;
  bestScore: number;
  shardsLanded: number;
  distanceMeters: number;
  coinsCollected: number;
  enemiesKilled: number;
  longestMomentumSeconds: number;
  personalBests: {
    score: boolean;
    shardsLanded: boolean;
    distanceMeters: boolean;
    coinsCollected: boolean;
    enemiesKilled: boolean;
    longestMomentumSeconds: boolean;
  };
  equipment: GameOverEquipmentItem[];
}

interface GameOverSummaryMarkupOptions {
  score: number;
  summary: GameOverSummaryData;
  locale: 'fr' | 'en';
  t: (key: UIStringKey) => string;
}

export function buildGameOverSummaryMarkup(options: GameOverSummaryMarkupOptions) {
  const { score, summary, locale, t } = options;
  const newBadge = `<em class="game-hud__game-over-badge">${t('gameNewBadge')}</em>`;
  const signature = [
    score,
    Math.round(summary.distanceMeters),
    summary.coinsCollected,
    summary.enemiesKilled,
    Math.round(summary.longestMomentumSeconds * 10)
  ].join(':');

  const statsMarkup = `
    <div><span>${t('gameScore')}</span><strong>${summary.score}</strong>${summary.personalBests.score ? newBadge : ''}</div>
    <div><span>${t('gameDistance')}</span><strong>${Math.round(summary.distanceMeters)}m</strong>${summary.personalBests.distanceMeters ? newBadge : ''}</div>
    <div><span>${t('gameRunShards')}</span><strong>${summary.shardsLanded}</strong>${summary.personalBests.shardsLanded ? newBadge : ''}</div>
    <div><span>${t('gameCoins')}</span><strong>${summary.coinsCollected}</strong>${summary.personalBests.coinsCollected ? newBadge : ''}</div>
    <div><span>${t('gameRunKills')}</span><strong>${summary.enemiesKilled}</strong>${summary.personalBests.enemiesKilled ? newBadge : ''}</div>
    <div><span>${t('gameRunMomentum')}</span><strong>${summary.longestMomentumSeconds.toFixed(1)}s</strong>${summary.personalBests.longestMomentumSeconds ? newBadge : ''}</div>
  `;

  const equipmentMarkup = summary.equipment.length
    ? summary.equipment
        .map(
          (item) => `
            <span class="game-hud__game-over-item" title="${getItemById(item.id)?.name[locale] ?? item.id}">
              <img src="${item.iconSrc}" alt="" class="game-hud__game-over-item-icon" />
              ${item.kind === 'module' ? `<img src="${item.rarityIconSrc}" alt="" class="game-hud__game-over-item-rarity" />` : ''}
            </span>
          `
        )
        .join('')
    : `<span class="game-hud__game-over-empty">${t('gameRunNoItems')}</span>`;

  return {
    signature,
    statsMarkup,
    equipmentMarkup
  };
}
