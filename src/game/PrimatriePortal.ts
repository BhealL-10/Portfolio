export class PrimatriePortal {
  readonly element: HTMLDivElement;
  private readonly anchor: HTMLDivElement;
  private readonly portfolioButton: HTMLButtonElement;
  private readonly singlePlayerButton: HTMLButtonElement;
  private readonly threeVsThreeButton: HTMLButtonElement;
  private readonly tenVsTenButton: HTMLButtonElement;
  private visible = false;

  constructor(host: HTMLElement, callbacks: { onPortfolio: () => void; onSinglePlayer: () => void }) {
    this.element = document.createElement('div');
    this.element.className = 'primatrie-portal';
    this.element.innerHTML = `
      <div class="primatrie-portal__anchor">
        <p class="primatrie-portal__eyebrow">Primatrie</p>
        <div class="primatrie-portal__actions">
          <button type="button" data-primatrie-portfolio></button>
          <button type="button" data-primatrie-single></button>
          <button type="button" data-primatrie-3v3 disabled></button>
          <button type="button" data-primatrie-10v10 disabled></button>
        </div>
      </div>
    `;

    this.anchor = this.element.querySelector<HTMLDivElement>('.primatrie-portal__anchor')!;
    this.portfolioButton = this.element.querySelector<HTMLButtonElement>('[data-primatrie-portfolio]')!;
    this.singlePlayerButton = this.element.querySelector<HTMLButtonElement>('[data-primatrie-single]')!;
    this.threeVsThreeButton = this.element.querySelector<HTMLButtonElement>('[data-primatrie-3v3]')!;
    this.tenVsTenButton = this.element.querySelector<HTMLButtonElement>('[data-primatrie-10v10]')!;

    this.portfolioButton.textContent = 'Portfolio';
    this.singlePlayerButton.textContent = 'Aventure';
    this.threeVsThreeButton.textContent = '3v3';
    this.tenVsTenButton.textContent = '10v10';

    this.portfolioButton.addEventListener('click', callbacks.onPortfolio);
    this.singlePlayerButton.addEventListener('click', callbacks.onSinglePlayer);

    this.element.hidden = true;
    host.appendChild(this.element);
  }

  get isVisible() {
    return this.visible;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    if (!visible) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement && this.element.contains(activeElement)) {
        activeElement.blur();
      }
      this.element.setAttribute('inert', '');
    } else {
      this.element.removeAttribute('inert');
    }
    this.element.hidden = !visible;
    this.element.setAttribute('aria-hidden', String(!visible));
    this.element.classList.toggle('is-visible', visible);
  }

  setAnchor(screenX: number, screenY: number, scale = 1) {
    this.anchor.style.setProperty('--primatrie-anchor-x', `${screenX.toFixed(2)}px`);
    this.anchor.style.setProperty('--primatrie-anchor-y', `${screenY.toFixed(2)}px`);
    this.anchor.style.setProperty('--primatrie-anchor-scale', scale.toFixed(3));
  }
}
