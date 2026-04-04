import type { GameHudState, GamePlayerMotionState } from './gameSessionTypes';
import { resolveDocumentTheme } from './ThemeAssetResolver';

export const MOBILE_CONTROL_ASSETS = {
  teleport: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-wrapper-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-wrapper-light.svg', import.meta.url).href
  },
  grapple: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-grap-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-grap-light.svg', import.meta.url).href
  },
  boost: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-boost-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-boost-light.svg', import.meta.url).href
  },
  charge: {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-charge1-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-charge1-light.svg', import.meta.url).href
  }
} as const;

export const MOBILE_CHARGE_ASSETS = [
  {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-charge1-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-charge1-light.svg', import.meta.url).href
  },
  {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-charge2-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-charge2-light.svg', import.meta.url).href
  },
  {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-charge3-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-charge3-light.svg', import.meta.url).href
  },
  {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-charge4-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-charge4-light.svg', import.meta.url).href
  },
  {
    dark: new URL('../../assets/images/game/ui/buttons/icons/btn-charge5-dark.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/buttons/icons/btn-charge5-light.svg', import.meta.url).href
  }
] as const;

export type MobileControlSlot = 'left' | 'up' | 'right' | 'down';
export type MobileControlLabelKey = 'teleport' | 'grapple' | 'charge' | 'boost';

interface MobileControlLayoutInput {
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

interface MobileControlDescriptor {
  visible: boolean;
  kind: 'teleport' | 'grapple' | 'charge' | 'boost';
  iconSrc: string;
  labelKey: MobileControlLabelKey;
  dimmed: boolean;
  active: boolean;
  depleted?: boolean;
  cooldownRatio: number | null;
}

export interface MobileControlLayout {
  visible: boolean;
  buttons: Record<MobileControlSlot, MobileControlDescriptor>;
}

function isCooldownReady(ratio: number) {
  return ratio <= 0.001;
}

function resolveIndicatorTheme() {
  return resolveDocumentTheme();
}

export function getMobileControlAsset(kind: keyof typeof MOBILE_CONTROL_ASSETS, theme = resolveIndicatorTheme()) {
  return MOBILE_CONTROL_ASSETS[kind][theme];
}

export function getMobileChargeAsset(level: number, theme = resolveIndicatorTheme()) {
  return MOBILE_CHARGE_ASSETS[Math.max(0, Math.min(MOBILE_CHARGE_ASSETS.length - 1, level - 1))][theme];
}

function createHiddenDescriptor(kind: MobileControlDescriptor['kind'], labelKey: MobileControlLabelKey, iconSrc: string): MobileControlDescriptor {
  return {
    visible: false,
    kind,
    iconSrc,
    labelKey,
    dimmed: false,
    active: false,
    depleted: false,
    cooldownRatio: null
  };
}

export class MobileControlLayoutResolver {
  resolve(input: MobileControlLayoutInput): MobileControlLayout {
    const theme = resolveIndicatorTheme();
    const hudVisible = input.state === 'running' || input.state === 'upgrade_choice';
    const airChargeLevel = Math.max(1, Math.min(5, input.mobile.airborneChargeDisplayCount || input.mobile.airborneChargeCount || 1));
    const teleportReady = input.mobile.hasTeleport && !input.mobile.teleportBlocked && isCooldownReady(input.mobile.teleportCooldownRatio);
    const grappleReady = input.mobile.hasGrapple && !input.mobile.grappleBlocked && isCooldownReady(input.mobile.grappleCooldownRatio);
    const buttons: Record<MobileControlSlot, MobileControlDescriptor> = {
      left: input.mobile.hasTeleport
        ? {
            visible: true,
            kind: 'teleport',
            iconSrc: getMobileControlAsset('teleport', theme),
            labelKey: 'teleport',
            dimmed: !input.mobile.teleportActive && !teleportReady,
            active: input.mobile.teleportActive || teleportReady,
            cooldownRatio: input.mobile.teleportCooldownRatio
          }
        : createHiddenDescriptor('teleport', 'teleport', getMobileControlAsset('teleport', theme)),
      up: input.mobile.hasAirAction
        ? {
            visible: true,
            kind: 'charge',
            iconSrc: getMobileChargeAsset(airChargeLevel, theme),
            labelKey: 'charge',
            dimmed:
              input.mobile.airActionDepleted ||
              (input.playerMotionState === 'airborne' ? false : !input.mobile.airActionActive),
            active: input.playerMotionState === 'airborne' ? !input.mobile.airActionDepleted : input.mobile.airActionActive,
            depleted: input.mobile.airActionDepleted,
            cooldownRatio: null
          }
        : createHiddenDescriptor('charge', 'charge', getMobileChargeAsset(1, theme)),
      right: input.mobile.hasGrapple
        ? {
            visible: true,
            kind: 'grapple',
            iconSrc: getMobileControlAsset('grapple', theme),
            labelKey: 'grapple',
            dimmed: !input.mobile.grappleActive && !grappleReady,
            active: input.mobile.grappleActive || grappleReady,
            cooldownRatio: input.mobile.grappleCooldownRatio
          }
        : createHiddenDescriptor('grapple', 'grapple', getMobileControlAsset('grapple', theme)),
      down: input.mobile.hasSouffleur
        ? {
            visible: true,
            kind: 'boost',
            iconSrc: getMobileControlAsset('boost', theme),
            labelKey: 'boost',
            dimmed: !input.mobile.boostActive,
            active: input.mobile.boostActive,
            cooldownRatio: null
          }
        : createHiddenDescriptor('boost', 'boost', getMobileControlAsset('boost', theme))
    };

    return {
      visible: hudVisible && Object.values(buttons).some((button) => button.visible),
      buttons
    };
  }
}
