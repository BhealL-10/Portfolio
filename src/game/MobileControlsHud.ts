import type { GameHudState, GamePlayerMotionState } from './gameSessionTypes';
import { MobileControlButton } from './MobileControlButton';
import { getMobileChargeAsset, getMobileControlAsset, MobileControlLayoutResolver, type MobileControlSlot } from './MobileControlLayoutResolver';

interface MobileControlsHudPayload {
  chargeRatio: number;
  state: GameHudState;
  playerMotionState: GamePlayerMotionState;
  mobile: {
    airborneChargeCount: number;
    airborneChargeDisplayCount: number;
    hasTeleport: boolean;
    teleportBlocked: boolean;
    teleportCooldownRatio: number;
    teleportActive: boolean;
    hasGrapple: boolean;
    grappleBlocked: boolean;
    grappleCooldownRatio: number;
    grappleActive: boolean;
    hasAirAction: boolean;
    airActionBlocked: boolean;
    airActionActive: boolean;
    airActionDepleted: boolean;
    hasSouffleur: boolean;
    hasSouffleurFuel: boolean;
    boostActive: boolean;
  };
}

export class MobileControlsHud {
  readonly element: HTMLDivElement;
  private readonly resolver = new MobileControlLayoutResolver();
  private readonly buttons: Record<MobileControlSlot, MobileControlButton>;

  constructor(host: HTMLElement, labels: Record<'teleport' | 'grapple' | 'charge' | 'boost', string>) {
    this.element = document.createElement('div');
    this.element.className = 'game-hud__mobile-controls';
    this.element.setAttribute('aria-hidden', 'true');

    this.buttons = {
      left: new MobileControlButton('teleport', labels.teleport, getMobileControlAsset('teleport')),
      up: new MobileControlButton('charge', labels.charge, getMobileChargeAsset(1)),
      right: new MobileControlButton('grapple', labels.grapple, getMobileControlAsset('grapple')),
      down: new MobileControlButton('boost', labels.boost, getMobileControlAsset('boost'))
    };

    (Object.entries(this.buttons) as Array<[MobileControlSlot, MobileControlButton]>).forEach(([slot, button]) => {
      button.element.dataset.slot = slot;
      this.element.appendChild(button.element);
    });

    host.appendChild(this.element);
  }

  update(payload: MobileControlsHudPayload) {
    const layout = this.resolver.resolve(payload);
    this.element.classList.toggle('is-visible', layout.visible);

    (Object.entries(layout.buttons) as Array<[MobileControlSlot, (typeof layout.buttons)[MobileControlSlot]]>).forEach(([slot, descriptor]) => {
      const button = this.buttons[slot];
      button.setKind(descriptor.kind);
      button.setIcon(descriptor.iconSrc);
      button.setVisible(descriptor.visible);
      button.setDimmed(descriptor.dimmed);
      button.setActive(descriptor.active);
      button.setDepleted(Boolean(descriptor.depleted));
      button.setCooldownRatio(descriptor.cooldownRatio);
    });
  }
}
