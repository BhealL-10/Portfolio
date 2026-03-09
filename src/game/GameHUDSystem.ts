import { I18nService } from '../ui/I18nService';

interface GameHUDCallbacks {
  onRestart: () => void;
  onExit: () => void;
}

export class GameHUDSystem {
  readonly element: HTMLDivElement;
  private scoreLabel: HTMLSpanElement;
  private highscoreLabel: HTMLSpanElement;
  private scoreValue: HTMLSpanElement;
  private highscoreValue: HTMLSpanElement;
  private statusValue: HTMLParagraphElement;
  private restartButton: HTMLButtonElement;
  private exitButton: HTMLButtonElement;

  constructor(host: HTMLElement, private readonly i18n: I18nService, callbacks: GameHUDCallbacks) {
    this.element = document.createElement('div');
    this.element.className = 'game-hud';
    this.element.innerHTML = `
      <div class="game-hud__stats">
        <div><span data-score-label></span><strong data-score>0</strong></div>
        <div><span data-highscore-label></span><strong data-highscore>0</strong></div>
      </div>
      <p class="game-hud__status"></p>
      <div class="game-hud__actions">
        <button type="button" data-restart></button>
        <button type="button" data-exit></button>
      </div>
    `;

    this.scoreLabel = this.element.querySelector<HTMLSpanElement>('[data-score-label]')!;
    this.highscoreLabel = this.element.querySelector<HTMLSpanElement>('[data-highscore-label]')!;
    this.scoreValue = this.element.querySelector<HTMLSpanElement>('[data-score]')!;
    this.highscoreValue = this.element.querySelector<HTMLSpanElement>('[data-highscore]')!;
    this.statusValue = this.element.querySelector<HTMLParagraphElement>('.game-hud__status')!;
    this.restartButton = this.element.querySelector<HTMLButtonElement>('[data-restart]')!;
    this.exitButton = this.element.querySelector<HTMLButtonElement>('[data-exit]')!;

    this.restartButton.addEventListener('click', callbacks.onRestart);
    this.exitButton.addEventListener('click', callbacks.onExit);
    host.appendChild(this.element);

    this.i18n.onChange(() => this.renderStatic());
    this.renderStatic();
  }

  setVisible(visible: boolean) {
    this.element.classList.toggle('is-visible', visible);
  }

  update(score: number, highscore: number, state: 'transition' | 'running' | 'game_over') {
    this.scoreValue.textContent = String(score);
    this.highscoreValue.textContent = String(highscore);
    this.statusValue.textContent =
      state === 'transition'
        ? this.i18n.t('gameStatusTransition')
        : state === 'running'
          ? this.i18n.t('gameStatusRunning')
          : this.i18n.t('gameStatusGameOver');
  }

  private renderStatic() {
    this.scoreLabel.textContent = this.i18n.t('gameScore');
    this.highscoreLabel.textContent = this.i18n.t('gameBest');
    this.restartButton.textContent = this.i18n.t('gameRestart');
    this.exitButton.textContent = this.i18n.t('gamePortfolio');
  }
}
