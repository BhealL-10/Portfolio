export class MobileControlButton {
  readonly element: HTMLDivElement;
  private readonly image: HTMLImageElement;
  private readonly cooldown: HTMLSpanElement;

  constructor(kind: string, label: string, iconSrc: string) {
    this.element = document.createElement('div');
    this.element.className = 'game-hud__mobile-control';
    this.element.dataset.kind = kind;
    this.element.setAttribute('aria-hidden', 'true');
    this.element.dataset.label = label;

    this.cooldown = document.createElement('span');
    this.cooldown.className = 'game-hud__mobile-control-cooldown';

    this.image = document.createElement('img');
    this.image.className = 'game-hud__mobile-control-icon';
    this.image.alt = '';
    this.image.decoding = 'async';
    this.image.src = iconSrc;
    this.element.style.setProperty('--mobile-control-asset', `url('${iconSrc}')`);

    this.element.append(this.cooldown, this.image);
  }

  setKind(kind: string) {
    this.element.dataset.kind = kind;
  }

  setIcon(iconSrc: string) {
    this.image.src = iconSrc;
    this.element.style.setProperty('--mobile-control-asset', `url('${iconSrc}')`);
  }

  setVisible(visible: boolean) {
    this.element.hidden = !visible;
  }

  setActive(active: boolean) {
    this.element.classList.toggle('is-active', active);
  }

  setDimmed(dimmed: boolean) {
    this.element.classList.toggle('is-dimmed', dimmed);
  }

  setDepleted(depleted: boolean) {
    this.element.classList.toggle('is-depleted', depleted);
  }

  setCooldownRatio(ratio: number | null) {
    const normalized = ratio === null ? null : Math.max(0, Math.min(1, ratio));
    const visible = normalized !== null && normalized > 0.001;
    this.element.classList.toggle('has-cooldown', visible);
    this.element.style.setProperty('--mobile-control-cooldown', visible ? normalized!.toFixed(3) : '0');
  }
}
