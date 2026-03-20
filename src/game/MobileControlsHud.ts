import { MobileControlButton } from './MobileControlButton';
import { MOBILE_CONTROL_ASSETS, MobileControlLayoutResolver } from './MobileControlLayoutResolver';

interface MobileControlsHudCallbacks {
  onChargeChange: (active: boolean) => void;
  onJump: () => void;
  onBoost: () => void;
  onGrapple: () => void;
}

interface MobileControlsHudPayload {
  chargeRatio: number;
  state: 'transition' | 'running' | 'upgrade_choice' | 'game_over';
  inventoryItems: Array<{
    kind: string;
    slot?: string | null;
  }>;
}

export class MobileControlsHud {
  readonly element: HTMLDivElement;
  private readonly resolver = new MobileControlLayoutResolver();
  private readonly jumpButton: MobileControlButton;
  private readonly boostButton: MobileControlButton;
  private readonly grappleButton: MobileControlButton;
  private readonly chargeButton: MobileControlButton;
  private chargePressed = false;

  constructor(host: HTMLElement, labels: Record<'jump' | 'boost' | 'grapple' | 'charge', string>, callbacks: MobileControlsHudCallbacks) {
    this.element = document.createElement('div');
    this.element.className = 'game-hud__mobile-controls';

    this.grappleButton = new MobileControlButton('grapple', labels.grapple, MOBILE_CONTROL_ASSETS.grapple);
    this.boostButton = new MobileControlButton('boost', labels.boost, MOBILE_CONTROL_ASSETS.boost);
    this.jumpButton = new MobileControlButton('jump', labels.jump, MOBILE_CONTROL_ASSETS.jump);
    this.chargeButton = new MobileControlButton('charge', labels.charge, MOBILE_CONTROL_ASSETS.jump);

    this.bindTap(this.grappleButton, callbacks.onGrapple);
    this.bindTap(this.boostButton, callbacks.onBoost);
    this.bindTap(this.jumpButton, callbacks.onJump);
    this.bindHold(this.chargeButton, callbacks.onChargeChange);

    this.element.append(
      this.grappleButton.element,
      this.boostButton.element,
      this.jumpButton.element,
      this.chargeButton.element
    );

    host.appendChild(this.element);
  }

  update(payload: MobileControlsHudPayload) {
    const layout = this.resolver.resolve(payload);
    this.element.classList.toggle('is-visible', layout.visible);
    this.grappleButton.setVisible(layout.showGrapple);
    this.boostButton.setVisible(layout.showBoost);
    this.jumpButton.setVisible(true);
    this.chargeButton.setVisible(true);
    this.chargeButton.setIcon(layout.chargeAsset);
    this.chargeButton.setDimmed(payload.chargeRatio <= 0.02);
    this.chargeButton.element.style.setProperty('--charge-fill-level', String(layout.chargeLevel));
  }

  private bindTap(button: MobileControlButton, onTap: () => void) {
    const release = () => button.setPressed(false);

    button.element.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      button.setPressed(true);
      onTap();
    });
    button.element.addEventListener('pointerup', release);
    button.element.addEventListener('pointercancel', release);
    button.element.addEventListener('pointerleave', release);
  }

  private bindHold(button: MobileControlButton, onChange: (active: boolean) => void) {
    const stop = () => {
      if (!this.chargePressed) return;
      this.chargePressed = false;
      button.setPressed(false);
      onChange(false);
    };

    button.element.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.chargePressed = true;
      button.setPressed(true);
      onChange(true);
    });
    button.element.addEventListener('pointerup', stop);
    button.element.addEventListener('pointercancel', stop);
    button.element.addEventListener('pointerleave', stop);
  }
}
