export class MobileControlButton {
  readonly element: HTMLButtonElement;
  private readonly image: HTMLImageElement;

  constructor(kind: string, label: string, iconSrc: string) {
    this.element = document.createElement('button');
    this.element.type = 'button';
    this.element.className = 'game-hud__mobile-control';
    this.element.dataset.kind = kind;
    this.element.setAttribute('aria-label', label);

    this.image = document.createElement('img');
    this.image.className = 'game-hud__mobile-control-icon';
    this.image.alt = '';
    this.image.decoding = 'async';
    this.image.src = iconSrc;

    this.element.appendChild(this.image);
  }

  setKind(kind: string) {
    this.element.dataset.kind = kind;
  }

  setLabel(label: string) {
    this.element.setAttribute('aria-label', label);
  }

  setIcon(iconSrc: string) {
    this.image.src = iconSrc;
  }

  setVisible(visible: boolean) {
    this.element.hidden = !visible;
  }

  setEnabled(enabled: boolean) {
    this.element.disabled = !enabled;
  }

  setPressed(pressed: boolean) {
    this.element.classList.toggle('is-pressed', pressed);
  }

  setDimmed(dimmed: boolean) {
    this.element.classList.toggle('is-dimmed', dimmed);
  }
}
