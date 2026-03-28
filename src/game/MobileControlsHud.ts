import type { GameHudState, GamePlayerMotionState } from './gameSessionTypes';
import { MobileControlButton } from './MobileControlButton';
import { getMobileControlAsset, MobileControlAction, MobileControlLayoutResolver } from './MobileControlLayoutResolver';

interface MobileControlsHudCallbacks {
  onChargeChange: (active: boolean) => void;
  onJump: () => void;
  onAirborneCharge: () => void;
  onGrapple: () => void;
}

interface MobileControlsHudPayload {
  chargeRatio: number;
  state: GameHudState;
  playerMotionState: GamePlayerMotionState;
  mobile: {
    airborneChargeCount: number;
    airborneChargeDisplayCount: number;
    hasGrapple: boolean;
    grappleBlocked: boolean;
    hasSouffleur: boolean;
    hasSouffleurFuel: boolean;
  };
}

export class MobileControlsHud {
  readonly element: HTMLDivElement;
  private readonly resolver = new MobileControlLayoutResolver();
  private readonly primaryButton: MobileControlButton;
  private readonly secondaryButton: MobileControlButton;
  private currentPrimaryAction: MobileControlAction = 'hidden';
  private currentSecondaryAction: MobileControlAction = 'hidden';
  private chargePressed = false;

  constructor(host: HTMLElement, private readonly labels: Record<'jump' | 'boost' | 'grapple' | 'charge', string>, private readonly callbacks: MobileControlsHudCallbacks) {
    this.element = document.createElement('div');
    this.element.className = 'game-hud__mobile-controls';

    this.primaryButton = new MobileControlButton('jump', labels.jump, getMobileControlAsset('jump'));
    this.primaryButton.element.dataset.slot = 'primary';
    this.secondaryButton = new MobileControlButton('charge', labels.charge, getMobileControlAsset('jump'));
    this.secondaryButton.element.dataset.slot = 'secondary';

    this.bindPrimary();
    this.bindSecondary();

    this.element.append(this.primaryButton.element, this.secondaryButton.element);
    host.appendChild(this.element);
  }

  update(payload: MobileControlsHudPayload) {
    const layout = this.resolver.resolve(payload);
    this.element.classList.toggle('is-visible', layout.visible);

    this.currentPrimaryAction = layout.primary.action;
    this.currentSecondaryAction = layout.secondary.action;
    this.applyDescriptor(this.primaryButton, layout.primary.kind, layout.primary.iconSrc, this.labels[layout.primary.labelKey], layout.primary.visible, layout.primary.dimmed);
    this.applyDescriptor(this.secondaryButton, layout.secondary.kind, layout.secondary.iconSrc, this.labels[layout.secondary.labelKey], layout.secondary.visible, layout.secondary.dimmed);

    if (this.chargePressed && this.currentSecondaryAction !== 'hold_charge' && this.currentSecondaryAction !== 'hold_boost') {
      this.chargePressed = false;
      this.secondaryButton.setPressed(false);
      this.callbacks.onChargeChange(false);
    }
  }

  private applyDescriptor(button: MobileControlButton, kind: string, iconSrc: string, label: string, visible: boolean, dimmed: boolean) {
    button.setKind(kind);
    button.setIcon(iconSrc);
    button.setLabel(label);
    button.setVisible(visible);
    button.setDimmed(dimmed);
    button.setEnabled(visible);
  }

  private bindPrimary() {
    const release = () => this.primaryButton.setPressed(false);
    this.primaryButton.element.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.primaryButton.setPressed(true);
      if (this.currentPrimaryAction === 'tap_jump') {
        this.callbacks.onJump();
      } else if (this.currentPrimaryAction === 'tap_grapple') {
        this.callbacks.onGrapple();
      }
    });
    this.primaryButton.element.addEventListener('pointerup', release);
    this.primaryButton.element.addEventListener('pointercancel', release);
    this.primaryButton.element.addEventListener('pointerleave', release);
  }

  private bindSecondary() {
    const stopHold = () => {
      if (!this.chargePressed) return;
      this.chargePressed = false;
      this.secondaryButton.setPressed(false);
      this.callbacks.onChargeChange(false);
    };

    this.secondaryButton.element.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.secondaryButton.setPressed(true);
      if (this.currentSecondaryAction === 'tap_airborne_charge') {
        this.callbacks.onAirborneCharge();
        return;
      }
      if (this.currentSecondaryAction === 'hold_charge' || this.currentSecondaryAction === 'hold_boost') {
        this.chargePressed = true;
        this.callbacks.onChargeChange(true);
      }
    });
    this.secondaryButton.element.addEventListener('pointerup', stopHold);
    this.secondaryButton.element.addEventListener('pointercancel', stopHold);
    this.secondaryButton.element.addEventListener('pointerleave', stopHold);
  }
}
