import type { RogueliteItemKind, RogueliteItemOffer, RogueliteRarity } from './roguelite';
import { getItemById, rarityLabels, rogueliteItems } from './roguelite';
import { I18nService } from '../ui/I18nService';
import type { AcquisitionFeedback, GameOverCause, LandingGrade } from './gameSessionTypes';

const GRADE_ASSET_URLS: Record<'miss' | 'good' | 'super' | 'perfect' | 'twist', string> = {
  miss: new URL('../../assets/images/spritesheet/Grade-Echec.png', import.meta.url).href,
  good: new URL('../../assets/images/spritesheet/Grade-Great.png', import.meta.url).href,
  super: new URL('../../assets/images/spritesheet/Grade-super.png', import.meta.url).href,
  perfect: new URL('../../assets/images/spritesheet/Grade-Perfect.png', import.meta.url).href,
  twist: new URL('../../assets/images/spritesheet/Grade-Twist.png', import.meta.url).href
};

const MOMENTUM_BAR_ASSETS = {
  bg: new URL('../../assets/images/spritesheet/HUDmomentum_bar_bg.png', import.meta.url).href,
  fill: new URL('../../assets/images/spritesheet/HUDmomentum_bar_fill.png', import.meta.url).href,
  top: new URL('../../assets/images/spritesheet/momentum_bar_toplayer.png', import.meta.url).href
};
const COIN_ICON_URL = new URL('../../assets/images/spritesheet/coinsheetsprite.png', import.meta.url).href;

type GameHUDState = 'transition' | 'running' | 'upgrade_choice' | 'game_over';

interface GameHUDCallbacks {
  onRestart: () => void;
  onExit: () => void;
  onSelectUpgrade: (index: number) => void;
  onCloseShop: () => void;
}

interface GameHUDPayload {
  score: number;
  highscore: number;
  distanceMeters: number;
  bestDistanceMeters: number;
  coins: number;
  splitTimes: Partial<Record<10 | 100 | 1000, number>>;
  chargeRatio: number;
  momentumGauge: number;
  momentumTier: number;
  orbitGraceActive: boolean;
  orbitGraceProgress: number;
  state: GameHUDState;
  offers: RogueliteItemOffer[];
  branchHints: Array<{
    slot: 0 | 1 | 2;
    offer: RogueliteItemOffer;
    screenX: number;
    screenY: number;
    mode?: 'reward_branch' | 'shop_orbit';
    price?: number;
  }>;
  inventoryItems: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
    iconSrc: string;
    rarity: RogueliteRarity;
    rarityIconSrc: string;
    kind: RogueliteItemKind;
    cooldownRatio?: number;
    chargeCurrent?: number;
    chargeMax?: number;
    resourceRatio?: number;
    slot?: string | null;
  }>;
  landingFeedback: {
    grade: LandingGrade;
    twist: boolean;
    progress: number;
    screenX: number;
    screenY: number;
  } | null;
  acquisition: AcquisitionFeedback | null;
  gameOverCause: GameOverCause;
}

export class GameHUDSystem {
  readonly element: HTMLDivElement;
  private panel: HTMLDivElement;
  private scoreLabel: HTMLSpanElement;
  private highscoreLabel: HTMLSpanElement;
  private bestDistanceLabel: HTMLSpanElement;
  private chargeLabel: HTMLSpanElement;
  private chainLabel: HTMLSpanElement;
  private distanceLabel: HTMLSpanElement;
  private scoreValue: HTMLSpanElement;
  private highscoreValue: HTMLSpanElement;
  private bestDistanceValue: HTMLSpanElement;
  private chainValue: HTMLSpanElement;
  private distanceValue: HTMLSpanElement;
  private walletIcon: HTMLSpanElement;
  private coinsValue: HTMLSpanElement;
  private momentumBarLabel: HTMLSpanElement;
  private momentumBarValue: HTMLSpanElement;
  private momentumShell: HTMLDivElement;
  private chargeFill: HTMLDivElement;
  private orbitGraceIndicator: HTMLDivElement;
  private statusValue: HTMLParagraphElement;
  private metaValue: HTMLParagraphElement;
  private exitButton: HTMLButtonElement;
  private branchLayer: HTMLDivElement;
  private stashBar: HTMLDivElement;
  private inventoryBar: HTMLDivElement;
  private branchTitle: HTMLHeadingElement;
  private branchHint: HTMLParagraphElement;
  private branchCards: HTMLDivElement[];
  private shopBar: HTMLDivElement;
  private shopButtons: HTMLButtonElement[];
  private shopCloseButton: HTMLButtonElement;
  private landingFeedbackBadge: HTMLDivElement;
  private toast: HTMLDivElement;
  private toastLabel: HTMLSpanElement;
  private toastName: HTMLElement;
  private gameOverOverlay: HTMLDivElement;
  private gameOverTitle: HTMLHeadingElement;
  private gameOverBody: HTMLParagraphElement;
  private restartButton: HTMLButtonElement;
  private returnButton: HTMLButtonElement;

  constructor(host: HTMLElement, private readonly i18n: I18nService, callbacks: GameHUDCallbacks) {
    this.preloadUiAssets();
    this.element = document.createElement('div');
    this.element.className = 'game-hud';
    this.element.innerHTML = `
      <div class="game-hud__panel">
        <div class="game-hud__stats">
          <div><span data-score-label></span><strong data-score>0</strong></div>
          <div><span data-highscore-label></span><strong data-highscore>0</strong></div>
          <div><span data-best-distance-label></span><strong data-best-distance>0m</strong></div>
          <div><span data-distance-label></span><strong data-distance>0m</strong></div>
          <div><span data-chain-label></span><strong data-chain>0%</strong></div>
        </div>
        <div class="game-hud__charge">
          <div class="game-hud__charge-meta">
            <span data-charge-label></span>
            <strong data-charge-value>0%</strong>
          </div>
          <div class="game-hud__charge-bar"><div class="game-hud__charge-fill" data-charge-fill></div></div>
        </div>
        <div class="game-hud__orbit-grace" data-orbit-grace></div>
        <p class="game-hud__status"></p>
        <p class="game-hud__meta"></p>
        <div class="game-hud__actions">
          <button type="button" data-exit></button>
        </div>
      </div>
      <div class="game-hud__momentum-dock">
        <div class="game-hud__momentum-meter">
          <div class="game-hud__momentum-meta">
            <span data-momentum-bar-label></span>
            <strong data-momentum-bar-value>0%</strong>
          </div>
          <div class="game-hud__momentum-shell">
            <div class="game-hud__momentum-mask" data-momentum-mask>
              <img src="${MOMENTUM_BAR_ASSETS.fill}" alt="" class="game-hud__momentum-fill" data-momentum-fill />
            </div>
            <img src="${MOMENTUM_BAR_ASSETS.bg}" alt="" class="game-hud__momentum-bg" />
            <img src="${MOMENTUM_BAR_ASSETS.top}" alt="" class="game-hud__momentum-top" />
          </div>
        </div>
      </div>
      <div class="game-hud__play-zone game-hud__play-zone--top"></div>
      <div class="game-hud__play-zone game-hud__play-zone--bottom"></div>
      <div class="game-hud__stash">
        <div class="game-hud__wallet">
          <span class="game-hud__wallet-icon" data-wallet-icon aria-hidden="true" style="--wallet-coin-url:url('${COIN_ICON_URL}')"></span>
          <strong data-coins>× 0</strong>
        </div>
        <div class="game-hud__inventory"></div>
      </div>
      <div class="game-hud__branch-layer">
        <div class="game-hud__branch-header">
          <h3 data-upgrade-title></h3>
          <p data-upgrade-hint></p>
        </div>
        <div class="game-hud__branch-card" data-branch-card="0"></div>
        <div class="game-hud__branch-card" data-branch-card="1"></div>
        <div class="game-hud__branch-card" data-branch-card="2"></div>
      </div>
      <div class="game-hud__shop-bar">
        <button type="button" data-shop-offer="0"></button>
        <button type="button" data-shop-offer="1"></button>
        <button type="button" data-shop-offer="2"></button>
        <button type="button" data-shop-close></button>
      </div>
      <div class="game-hud__landing-feedback"></div>
      <div class="game-hud__toast">
        <span data-toast-label></span>
        <strong data-toast-name></strong>
      </div>
      <div class="game-hud__game-over">
        <div class="game-hud__game-over-panel">
          <h2 data-game-over-title></h2>
          <p data-game-over-body></p>
          <div class="game-hud__game-over-actions">
            <button type="button" data-restart></button>
            <button type="button" data-return></button>
          </div>
        </div>
      </div>
    `;

    this.panel = this.element.querySelector<HTMLDivElement>('.game-hud__panel')!;
    this.scoreLabel = this.element.querySelector<HTMLSpanElement>('[data-score-label]')!;
    this.highscoreLabel = this.element.querySelector<HTMLSpanElement>('[data-highscore-label]')!;
    this.bestDistanceLabel = this.element.querySelector<HTMLSpanElement>('[data-best-distance-label]')!;
    this.chargeLabel = this.element.querySelector<HTMLSpanElement>('[data-charge-label]')!;
    this.chainLabel = this.element.querySelector<HTMLSpanElement>('[data-chain-label]')!;
    this.distanceLabel = this.element.querySelector<HTMLSpanElement>('[data-distance-label]')!;
    this.scoreValue = this.element.querySelector<HTMLSpanElement>('[data-score]')!;
    this.highscoreValue = this.element.querySelector<HTMLSpanElement>('[data-highscore]')!;
    this.bestDistanceValue = this.element.querySelector<HTMLSpanElement>('[data-best-distance]')!;
    this.chainValue = this.element.querySelector<HTMLSpanElement>('[data-chain]')!;
    this.distanceValue = this.element.querySelector<HTMLSpanElement>('[data-distance]')!;
    this.walletIcon = this.element.querySelector<HTMLSpanElement>('[data-wallet-icon]')!;
    this.coinsValue = this.element.querySelector<HTMLSpanElement>('[data-coins]')!;
    this.momentumBarLabel = this.element.querySelector<HTMLSpanElement>('[data-momentum-bar-label]')!;
    this.momentumBarValue = this.element.querySelector<HTMLSpanElement>('[data-momentum-bar-value]')!;
    this.momentumShell = this.element.querySelector<HTMLDivElement>('.game-hud__momentum-shell')!;
    this.chargeFill = this.element.querySelector<HTMLDivElement>('[data-charge-fill]')!;
    this.orbitGraceIndicator = this.element.querySelector<HTMLDivElement>('[data-orbit-grace]')!;
    this.statusValue = this.element.querySelector<HTMLParagraphElement>('.game-hud__status')!;
    this.metaValue = this.element.querySelector<HTMLParagraphElement>('.game-hud__meta')!;
    this.exitButton = this.element.querySelector<HTMLButtonElement>('[data-exit]')!;
    this.branchLayer = this.element.querySelector<HTMLDivElement>('.game-hud__branch-layer')!;
    this.stashBar = this.element.querySelector<HTMLDivElement>('.game-hud__stash')!;
    this.inventoryBar = this.element.querySelector<HTMLDivElement>('.game-hud__inventory')!;
    this.branchTitle = this.element.querySelector<HTMLHeadingElement>('[data-upgrade-title]')!;
    this.branchHint = this.element.querySelector<HTMLParagraphElement>('[data-upgrade-hint]')!;
    this.branchCards = Array.from(this.element.querySelectorAll<HTMLDivElement>('[data-branch-card]'));
    this.shopBar = this.element.querySelector<HTMLDivElement>('.game-hud__shop-bar')!;
    this.shopButtons = Array.from(this.element.querySelectorAll<HTMLButtonElement>('[data-shop-offer]'));
    this.shopCloseButton = this.element.querySelector<HTMLButtonElement>('[data-shop-close]')!;
    this.landingFeedbackBadge = this.element.querySelector<HTMLDivElement>('.game-hud__landing-feedback')!;
    this.toast = this.element.querySelector<HTMLDivElement>('.game-hud__toast')!;
    this.toastLabel = this.element.querySelector<HTMLSpanElement>('[data-toast-label]')!;
    this.toastName = this.element.querySelector<HTMLElement>('[data-toast-name]')!;
    this.gameOverOverlay = this.element.querySelector<HTMLDivElement>('.game-hud__game-over')!;
    this.gameOverTitle = this.element.querySelector<HTMLHeadingElement>('[data-game-over-title]')!;
    this.gameOverBody = this.element.querySelector<HTMLParagraphElement>('[data-game-over-body]')!;
    this.restartButton = this.element.querySelector<HTMLButtonElement>('[data-restart]')!;
    this.returnButton = this.element.querySelector<HTMLButtonElement>('[data-return]')!;

    this.exitButton.addEventListener('click', callbacks.onExit);
    this.restartButton.addEventListener('click', callbacks.onRestart);
    this.returnButton.addEventListener('click', callbacks.onExit);
    this.shopButtons.forEach((button, index) => {
      button.addEventListener('click', () => callbacks.onSelectUpgrade(index));
    });
    this.shopCloseButton.addEventListener('click', callbacks.onCloseShop);
    host.appendChild(this.element);

    this.i18n.onChange(() => this.renderStatic());
    this.renderStatic();
  }

  setVisible(visible: boolean) {
    this.element.classList.toggle('is-visible', visible);
  }

  update(payload: GameHUDPayload) {
    this.scoreValue.textContent = String(payload.score);
    this.highscoreValue.textContent = String(payload.highscore);
    this.bestDistanceValue.textContent = `${Math.round(payload.bestDistanceMeters)}m`;
    this.distanceValue.textContent = `${Math.round(payload.distanceMeters)}m`;
    this.coinsValue.textContent = `× ${payload.coins}`;
    this.chainValue.textContent = `${Math.round(payload.momentumGauge * 100)}%`;
    this.chainValue.style.opacity = `${0.58 + payload.momentumGauge * 0.42}`;
    this.momentumBarValue.textContent = `${Math.round(payload.momentumGauge * 100)}%`;
    this.momentumShell.style.setProperty('--momentum-ratio', payload.momentumGauge.toFixed(3));
    const fillIntervalMs = 120;
    const fillPhase = Math.floor(performance.now() / fillIntervalMs) % 4;
    this.momentumShell.style.setProperty('--momentum-frame', String(fillPhase));
    this.chargeFill.style.setProperty('--charge-ratio', payload.chargeRatio.toFixed(3));
    this.orbitGraceIndicator.classList.toggle('is-visible', payload.orbitGraceActive);
    this.orbitGraceIndicator.style.setProperty('--orbit-grace-progress', payload.orbitGraceProgress.toFixed(3));
    const chargeValue = this.element.querySelector<HTMLElement>('[data-charge-value]');
    if (chargeValue) {
      chargeValue.textContent = `${Math.round(payload.chargeRatio * 100)}%`;
    }

    this.statusValue.textContent =
      payload.state === 'transition'
        ? this.i18n.t('gameStatusTransition')
        : payload.state === 'running'
          ? this.i18n.t('gameStatusRunning')
          : payload.state === 'upgrade_choice'
            ? this.i18n.t('gameStatusUpgrade')
            : this.i18n.t('gameStatusGameOver');
    this.metaValue.textContent = this.renderMeta(payload);
    const showingShop = payload.branchHints.some((hint) => hint.mode === 'shop_orbit');
    this.branchTitle.textContent = showingShop ? this.i18n.t('gameShopTitle') : this.i18n.t('gameUpgradeTitle');
    this.branchHint.textContent = showingShop ? this.i18n.t('gameShopHint') : this.i18n.t('gameUpgradeHint');

    this.panel.classList.toggle('is-hidden', payload.state === 'game_over');
    this.branchLayer.classList.toggle('is-visible', payload.state === 'upgrade_choice' && !showingShop);
    this.shopBar.classList.toggle('is-visible', payload.state === 'upgrade_choice' && showingShop);
    this.gameOverOverlay.classList.toggle('is-visible', payload.state === 'game_over');
    this.toast.classList.toggle('is-visible', Boolean(payload.acquisition));
    if (payload.acquisition) {
      this.toast.style.setProperty('--toast-progress', payload.acquisition.progress.toFixed(3));
      this.toastName.textContent = payload.acquisition.offer.item.name[this.i18n.current];
    }
    this.renderLandingFeedback(payload.landingFeedback);
    if (payload.state === 'game_over') {
      this.gameOverBody.textContent = this.getGameOverBody(payload.gameOverCause);
    }
    this.renderInventory(payload.inventoryItems);
    this.renderBranchHints(payload.branchHints);
    this.renderShopBar(payload.branchHints, payload.coins);
  }

  private renderStatic() {
    this.scoreLabel.textContent = this.i18n.t('gameScore');
    this.highscoreLabel.textContent = this.i18n.t('gameBest');
    this.chargeLabel.textContent = this.i18n.t('gameCharge');
    this.chainLabel.textContent = this.i18n.t('gameMomentum');
    this.momentumBarLabel.textContent = this.i18n.t('gameMomentum');
    this.distanceLabel.textContent = this.i18n.t('gameDistance');
    this.exitButton.textContent = this.i18n.t('gamePortfolio');
    this.branchTitle.textContent = this.i18n.t('gameUpgradeTitle');
    this.branchHint.textContent = this.i18n.t('gameUpgradeHint');
    this.shopCloseButton.textContent = this.i18n.t('gameShopClose');
    this.toastLabel.textContent = this.i18n.t('gameAcquired');
    this.gameOverTitle.textContent = this.i18n.t('gameOverTitle');
    this.gameOverBody.textContent = this.i18n.t('gameOverBody');
    this.restartButton.textContent = this.i18n.t('gameRestart');
    this.returnButton.textContent = this.i18n.t('gamePortfolio');
    this.bestDistanceLabel.textContent = this.i18n.t('gameBestDistance');
    this.walletIcon.title = this.i18n.t('gameCoins');
  }

  private renderBranchHints(
    hints: Array<{
      slot: 0 | 1 | 2;
      offer: RogueliteItemOffer;
      screenX: number;
      screenY: number;
      mode?: 'reward_branch' | 'shop_orbit';
      price?: number;
    }>
  ) {
    this.branchCards.forEach((card, index) => {
      const offer = hints[index];
      if (!offer) {
        card.hidden = true;
        return;
      }

      card.hidden = false;
      card.dataset.rarity = offer.offer.item.rarity;
      const label = offer.mode === 'shop_orbit'
        ? this.i18n.t('gameShopOffer')
        : index === 0
          ? this.i18n.t('gamePathUpper')
          : index === 1
            ? this.i18n.t('gamePathForward')
            : this.i18n.t('gamePathLower');
      card.style.transform = `translate(${offer.screenX}px, ${offer.screenY}px)`;
      const showRarity = offer.offer.item.kind === 'module';
      card.innerHTML = `
        <span class="game-hud__upgrade-media">
          <img src="${offer.offer.item.hudIconSrc}" alt="" class="game-hud__upgrade-icon-img" />
          ${showRarity ? `<img src="${offer.offer.item.rarityIconSrc}" alt="" class="game-hud__upgrade-rarity-icon" />` : ''}
        </span>
        ${showRarity ? `<span class="game-hud__upgrade-rarity">${this.getRarityLabel(offer.offer.item.rarity)}</span>` : ''}
        <span class="game-hud__upgrade-path-label">${label}</span>
        <strong class="game-hud__upgrade-path-name">${offer.offer.item.name[this.i18n.current]}</strong>
        <span class="game-hud__upgrade-path-desc">${offer.offer.item.description[this.i18n.current]}</span>
        ${
          offer.price !== undefined
            ? `<span class="game-hud__upgrade-price">${this.i18n.t('gamePrice')}: <span class="game-hud__coin-inline" aria-hidden="true" style="--wallet-coin-url:url('${COIN_ICON_URL}')"></span> × ${offer.price}</span>`
            : ''
        }
      `;
    });
  }

  private renderInventory(items: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
    iconSrc: string;
    rarity: RogueliteRarity;
    rarityIconSrc: string;
    kind: RogueliteItemKind;
    cooldownRatio?: number;
    chargeCurrent?: number;
    chargeMax?: number;
    resourceRatio?: number;
    slot?: string | null;
  }>) {
    this.inventoryBar.innerHTML = '';
    this.stashBar.classList.add('is-visible');
    items.forEach((item) => {
      const chip = document.createElement('div');
      chip.className = 'game-hud__inventory-item';
      const itemDefinition = getItemById(item.id);
      const showRarity = item.kind === 'module';
      const hasCharges = (item.chargeMax ?? 0) > 0;
      const hasResource = (item.resourceRatio ?? 0) > 0 || item.slot === 'souffleur';
      const hasCooldown =
        (item.cooldownRatio ?? 0) > 0 ||
        item.slot === 'souffleur' ||
        item.slot === 'shield' ||
        item.slot === 'wrapper' ||
        item.slot === 'big_canon' ||
        item.slot === 'front_canon' ||
        item.slot === 'grappin';
      const cooldownProgress = Math.max(0, Math.min(1, 1 - (item.cooldownRatio ?? 0)));
      const chargeDots = hasCharges
        ? Array.from({ length: item.chargeMax ?? 0 }, (_, index) => {
            const active = index < (item.chargeCurrent ?? 0);
            return `<span class="game-hud__inventory-charge-dot${active ? ' is-active' : ''}" aria-hidden="true"></span>`;
          }).join('')
        : '';
      chip.innerHTML = `
        <div class="game-hud__inventory-media">
          <img src="${item.iconSrc}" alt="" class="game-hud__inventory-icon" />
          ${showRarity ? `<img src="${item.rarityIconSrc}" alt="" class="game-hud__inventory-rarity" />` : ''}
        </div>
        <div class="game-hud__inventory-copy">
          <strong class="game-hud__inventory-name">${itemDefinition?.name[this.i18n.current] ?? item.name}</strong>
          <span class="game-hud__inventory-desc">${itemDefinition?.description[this.i18n.current] ?? item.description}</span>
          ${hasCooldown || hasCharges ? `<span class="game-hud__inventory-signals">${hasCooldown ? `<span class="game-hud__inventory-cooldown" style="--cooldown-progress:${cooldownProgress.toFixed(3)}"><span></span></span>` : ''}${hasCharges ? `<span class="game-hud__inventory-charge-dots">${chargeDots}</span>` : ''}</span>` : ''}
          ${hasResource ? `<span class="game-hud__inventory-meter game-hud__inventory-meter--resource"><span style="width:${Math.round((item.resourceRatio ?? 0) * 100)}%"></span></span>` : ''}
        </div>
        ${item.count > 1 ? `<span class="game-hud__inventory-count">x${item.count}</span>` : ''}
      `;
      this.inventoryBar.appendChild(chip);
    });
  }

  private renderShopBar(
    hints: Array<{
      slot: 0 | 1 | 2;
      offer: RogueliteItemOffer;
      screenX: number;
      screenY: number;
      mode?: 'reward_branch' | 'shop_orbit';
      price?: number;
    }>,
    coins = 0
  ) {
    const shopHints = hints.filter((hint) => hint.mode === 'shop_orbit');
    this.shopButtons.forEach((button, index) => {
      const hint = shopHints[index];
      button.hidden = !hint;
      button.disabled = !hint;
      if (!hint) return;
      const affordable = (hint.price ?? 0) <= coins;
      button.disabled = !affordable;
      const showRarity = hint.offer.item.kind === 'module';
      button.innerHTML = `
        <span class="game-hud__shop-offer-media">
          <img src="${hint.offer.item.hudIconSrc}" alt="" class="game-hud__shop-offer-icon" />
          ${showRarity ? `<img src="${hint.offer.item.rarityIconSrc}" alt="" class="game-hud__shop-offer-rarity" />` : ''}
        </span>
        <strong>${hint.offer.item.name[this.i18n.current]}</strong>
        <span>${hint.offer.item.description[this.i18n.current]}</span>
        <em class="game-hud__shop-price"><span class="game-hud__coin-inline" aria-hidden="true" style="--wallet-coin-url:url('${COIN_ICON_URL}')"></span> × ${hint.price ?? 0}</em>
      `;
      button.classList.toggle('is-disabled', !affordable);
    });
    this.shopCloseButton.textContent = this.i18n.t('gameShopClose');
  }

  private renderMeta(payload: GameHUDPayload) {
    const splits = [10, 100, 1000]
      .map((milestone) => {
        const split = payload.splitTimes[milestone as 10 | 100 | 1000];
        return split === undefined ? null : `${milestone}: ${split.toFixed(1)}s`;
      })
      .filter(Boolean)
      .join(' • ');
    if (!splits) {
      return `${this.i18n.t('gameBestDistance')}: ${Math.round(payload.bestDistanceMeters)}m`;
    }
    return `${this.i18n.t('gameSplits')}: ${splits}`;
  }

  private renderLandingFeedback(
    feedback: {
      grade: LandingGrade;
      twist: boolean;
      progress: number;
      screenX: number;
      screenY: number;
    } | null
  ) {
    if (!feedback) {
      this.landingFeedbackBadge.classList.remove('is-visible');
      this.landingFeedbackBadge.innerHTML = '';
      return;
    }

    const gradeSrc = this.getLandingGradeAsset(feedback.grade);
    this.landingFeedbackBadge.innerHTML = `
      ${feedback.twist ? `<img src="${GRADE_ASSET_URLS.twist}" alt="${this.i18n.t('gameLandingTwist')}" class="game-hud__landing-feedback-asset game-hud__landing-feedback-asset--twist" />` : ''}
      <img src="${gradeSrc}" alt="${this.getLandingGradeLabel(feedback.grade)}" class="game-hud__landing-feedback-asset game-hud__landing-feedback-asset--grade" />
    `;
    this.landingFeedbackBadge.dataset.grade = feedback.grade;
    this.landingFeedbackBadge.classList.toggle('is-twist', feedback.twist);
    this.landingFeedbackBadge.classList.add('is-visible');
    this.landingFeedbackBadge.style.setProperty('--landing-progress', feedback.progress.toFixed(3));
    const popScale =
      feedback.progress < 0.2
        ? 0.78 + (feedback.progress / 0.2) * 0.34
        : 1.12 - Math.min(1, (feedback.progress - 0.2) / 0.8) * 0.12;
    const driftY = feedback.screenY - feedback.progress * 24;
    this.landingFeedbackBadge.style.transform = `translate(${feedback.screenX}px, ${driftY}px) scale(${popScale.toFixed(3)})`;
  }

  private getLandingGradeLabel(grade: LandingGrade) {
    if (grade === 'miss') return this.i18n.t('gameLandingMiss');
    if (grade === 'super') return this.i18n.t('gameLandingSuper');
    if (grade === 'perfect') return this.i18n.t('gameLandingPerfect');
    return this.i18n.t('gameLandingGood');
  }

  private getLandingGradeAsset(grade: LandingGrade) {
    if (grade === 'miss') return GRADE_ASSET_URLS.miss;
    if (grade === 'super') return GRADE_ASSET_URLS.super;
    if (grade === 'perfect') return GRADE_ASSET_URLS.perfect;
    return GRADE_ASSET_URLS.good;
  }

  private getRarityLabel(rarity: RogueliteRarity) {
    return rarityLabels[rarity][this.i18n.current];
  }

  private getGameOverBody(cause: GameOverCause) {
    if (cause === 'enemy') return this.i18n.t('gameOverEnemy');
    if (cause === 'out_of_bounds') return this.i18n.t('gameOverBounds');
    return this.i18n.t('gameOverCamera');
  }

  private preloadUiAssets() {
    const itemAssets = rogueliteItems.flatMap((item) => [item.hudIconSrc, item.rarityIconSrc]);
    Object.values(GRADE_ASSET_URLS)
      .concat(Object.values(MOMENTUM_BAR_ASSETS), [COIN_ICON_URL], itemAssets)
      .forEach((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
    });
  }
}
