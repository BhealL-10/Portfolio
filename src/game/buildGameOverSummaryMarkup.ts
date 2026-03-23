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
    summary.shardsLanded,
    summary.coinsCollected,
    summary.enemiesKilled,
    Math.round(summary.longestMomentumSeconds * 10)
  ].join(':');

  const statsMarkup = `
    <div class="game-hud__game-over-stat" data-record="${summary.personalBests.score ? 'true' : 'false'}" data-shape="1" style="--game-over-stat-index:0">
      <div class="game-hud__game-over-stat-content">
        <span class="game-hud__game-over-stat-label">${t('gameScore')}</span>
        <strong class="game-hud__game-over-stat-value">${summary.score}</strong>
        ${summary.personalBests.score ? newBadge : ''}
      </div>
    </div>
    <div class="game-hud__game-over-stat" data-record="${summary.personalBests.distanceMeters ? 'true' : 'false'}" data-shape="2" style="--game-over-stat-index:1">
      <div class="game-hud__game-over-stat-content">
        <span class="game-hud__game-over-stat-label">${t('gameDistance')}</span>
        <strong class="game-hud__game-over-stat-value">${Math.round(summary.distanceMeters)}m</strong>
        ${summary.personalBests.distanceMeters ? newBadge : ''}
      </div>
    </div>
    <div class="game-hud__game-over-stat" data-record="${summary.personalBests.shardsLanded ? 'true' : 'false'}" data-shape="3" style="--game-over-stat-index:2">
      <div class="game-hud__game-over-stat-content">
        <span class="game-hud__game-over-stat-label">${t('gameRunShards')}</span>
        <strong class="game-hud__game-over-stat-value">${summary.shardsLanded}</strong>
        ${summary.personalBests.shardsLanded ? newBadge : ''}
      </div>
    </div>
    <div class="game-hud__game-over-stat" data-record="${summary.personalBests.coinsCollected ? 'true' : 'false'}" data-shape="4" style="--game-over-stat-index:3">
      <div class="game-hud__game-over-stat-content">
        <span class="game-hud__game-over-stat-label">${t('gameCoins')}</span>
        <strong class="game-hud__game-over-stat-value">${summary.coinsCollected}</strong>
        ${summary.personalBests.coinsCollected ? newBadge : ''}
      </div>
    </div>
    <div class="game-hud__game-over-stat" data-record="${summary.personalBests.enemiesKilled ? 'true' : 'false'}" data-shape="1" style="--game-over-stat-index:4">
      <div class="game-hud__game-over-stat-content">
        <span class="game-hud__game-over-stat-label">${t('gameRunKills')}</span>
        <strong class="game-hud__game-over-stat-value">${summary.enemiesKilled}</strong>
        ${summary.personalBests.enemiesKilled ? newBadge : ''}
      </div>
    </div>
    <div class="game-hud__game-over-stat" data-record="${summary.personalBests.longestMomentumSeconds ? 'true' : 'false'}" data-shape="2" style="--game-over-stat-index:5">
      <div class="game-hud__game-over-stat-content">
        <span class="game-hud__game-over-stat-label">${t('gameRunMomentum')}</span>
        <strong class="game-hud__game-over-stat-value">${summary.longestMomentumSeconds.toFixed(1)}s</strong>
        ${summary.personalBests.longestMomentumSeconds ? newBadge : ''}
      </div>
    </div>
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
