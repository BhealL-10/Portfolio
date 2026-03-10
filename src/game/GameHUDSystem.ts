import type { RogueliteItemOffer, RogueliteRarity } from './roguelite';
import { rarityLabels } from './roguelite';
import { I18nService } from '../ui/I18nService';
import type { AcquisitionFeedback } from './gameSessionTypes';

type GameHUDState = 'transition' | 'running' | 'upgrade_choice' | 'game_over';

interface GameHUDCallbacks {
  onRestart: () => void;
  onExit: () => void;
  onSelectUpgrade: (index: number) => void;
}

interface GameHUDPayload {
  score: number;
  highscore: number;
  chargeRatio: number;
  momentumGauge: number;
  momentumTier: number;
  state: GameHUDState;
  offers: RogueliteItemOffer[];
  branchHints: Array<{
    slot: 0 | 1 | 2;
    offer: RogueliteItemOffer;
    screenX: number;
    screenY: number;
  }>;
  acquisition: AcquisitionFeedback | null;
}

export class GameHUDSystem {
  readonly element: HTMLDivElement;
  private panel: HTMLDivElement;
  private scoreLabel: HTMLSpanElement;
  private highscoreLabel: HTMLSpanElement;
  private chargeLabel: HTMLSpanElement;
  private chainLabel: HTMLSpanElement;
  private scoreValue: HTMLSpanElement;
  private highscoreValue: HTMLSpanElement;
  private chainValue: HTMLSpanElement;
  private chargeFill: HTMLDivElement;
  private statusValue: HTMLParagraphElement;
  private exitButton: HTMLButtonElement;
  private branchLayer: HTMLDivElement;
  private branchTitle: HTMLHeadingElement;
  private branchHint: HTMLParagraphElement;
  private branchCards: HTMLDivElement[];
  private toast: HTMLDivElement;
  private toastLabel: HTMLSpanElement;
  private toastName: HTMLElement;
  private gameOverOverlay: HTMLDivElement;
  private gameOverTitle: HTMLHeadingElement;
  private gameOverBody: HTMLParagraphElement;
  private restartButton: HTMLButtonElement;
  private returnButton: HTMLButtonElement;

  constructor(host: HTMLElement, private readonly i18n: I18nService, callbacks: GameHUDCallbacks) {
    this.element = document.createElement('div');
    this.element.className = 'game-hud';
    this.element.innerHTML = `
      <div class="game-hud__panel">
        <div class="game-hud__stats">
          <div><span data-score-label></span><strong data-score>0</strong></div>
          <div><span data-highscore-label></span><strong data-highscore>0</strong></div>
          <div><span data-chain-label></span><strong data-chain>0</strong></div>
        </div>
        <div class="game-hud__charge">
          <div class="game-hud__charge-meta">
            <span data-charge-label></span>
            <strong data-charge-value>0%</strong>
          </div>
          <div class="game-hud__charge-bar"><div class="game-hud__charge-fill" data-charge-fill></div></div>
        </div>
        <p class="game-hud__status"></p>
        <div class="game-hud__actions">
          <button type="button" data-exit></button>
        </div>
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
    this.chargeLabel = this.element.querySelector<HTMLSpanElement>('[data-charge-label]')!;
    this.chainLabel = this.element.querySelector<HTMLSpanElement>('[data-chain-label]')!;
    this.scoreValue = this.element.querySelector<HTMLSpanElement>('[data-score]')!;
    this.highscoreValue = this.element.querySelector<HTMLSpanElement>('[data-highscore]')!;
    this.chainValue = this.element.querySelector<HTMLSpanElement>('[data-chain]')!;
    this.chargeFill = this.element.querySelector<HTMLDivElement>('[data-charge-fill]')!;
    this.statusValue = this.element.querySelector<HTMLParagraphElement>('.game-hud__status')!;
    this.exitButton = this.element.querySelector<HTMLButtonElement>('[data-exit]')!;
    this.branchLayer = this.element.querySelector<HTMLDivElement>('.game-hud__branch-layer')!;
    this.branchTitle = this.element.querySelector<HTMLHeadingElement>('[data-upgrade-title]')!;
    this.branchHint = this.element.querySelector<HTMLParagraphElement>('[data-upgrade-hint]')!;
    this.branchCards = Array.from(this.element.querySelectorAll<HTMLDivElement>('[data-branch-card]'));
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
    this.chainValue.textContent = `${Math.round(payload.momentumGauge * 100)}%`;
    this.chainValue.style.opacity = `${0.58 + payload.momentumGauge * 0.42}`;
    this.chargeFill.style.setProperty('--charge-ratio', payload.chargeRatio.toFixed(3));
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

    this.panel.classList.toggle('is-hidden', payload.state === 'game_over');
    this.branchLayer.classList.toggle('is-visible', payload.state === 'upgrade_choice');
    this.gameOverOverlay.classList.toggle('is-visible', payload.state === 'game_over');
    this.toast.classList.toggle('is-visible', Boolean(payload.acquisition));
    if (payload.acquisition) {
      this.toast.style.setProperty('--toast-progress', payload.acquisition.progress.toFixed(3));
      this.toastName.textContent = payload.acquisition.offer.item.name[this.i18n.current];
    }
    this.renderBranchHints(payload.branchHints);
  }

  private renderStatic() {
    this.scoreLabel.textContent = this.i18n.t('gameScore');
    this.highscoreLabel.textContent = this.i18n.t('gameBest');
    this.chargeLabel.textContent = this.i18n.t('gameCharge');
    this.chainLabel.textContent = this.i18n.t('gameMomentum');
    this.exitButton.textContent = this.i18n.t('gamePortfolio');
    this.branchTitle.textContent = this.i18n.t('gameUpgradeTitle');
    this.branchHint.textContent = this.i18n.t('gameUpgradeHint');
    this.toastLabel.textContent = this.i18n.t('gameAcquired');
    this.gameOverTitle.textContent = this.i18n.t('gameOverTitle');
    this.gameOverBody.textContent = this.i18n.t('gameOverBody');
    this.restartButton.textContent = this.i18n.t('gameRestart');
    this.returnButton.textContent = this.i18n.t('gamePortfolio');
  }

  private renderBranchHints(
    hints: Array<{
      slot: 0 | 1 | 2;
      offer: RogueliteItemOffer;
      screenX: number;
      screenY: number;
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
      const label = index === 0
        ? this.i18n.t('gamePathUpper')
        : index === 1
          ? this.i18n.t('gamePathForward')
          : this.i18n.t('gamePathLower');
      card.style.transform = `translate(${offer.screenX}px, ${offer.screenY}px)`;
      card.innerHTML = `
        <span class="game-hud__upgrade-icon">${offer.offer.item.icon}</span>
        <span class="game-hud__upgrade-rarity">${this.getRarityLabel(offer.offer.item.rarity)}</span>
        <span class="game-hud__upgrade-path-label">${label}</span>
        <strong class="game-hud__upgrade-path-name">${offer.offer.item.name[this.i18n.current]}</strong>
        <span class="game-hud__upgrade-path-desc">${offer.offer.item.description[this.i18n.current]}</span>
      `;
    });
  }

  private getRarityLabel(rarity: RogueliteRarity) {
    return rarityLabels[rarity][this.i18n.current];
  }
}
