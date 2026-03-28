import type { GameHudState, GamePlayerMotionState } from './gameSessionTypes';
import { resolveDocumentTheme } from './ThemeAssetResolver';

export const MOBILE_CONTROL_ASSETS = {
  grapple: {
    dark: new URL('../../assets/images/game/ui/mobile-controls/dark/grapple.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/mobile-controls/light/grapple.svg', import.meta.url).href
  },
  boost: {
    dark: new URL('../../assets/images/game/ui/mobile-controls/dark/boost.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/mobile-controls/light/boost.svg', import.meta.url).href
  },
  jump: {
    dark: new URL('../../assets/images/game/ui/mobile-controls/dark/jump.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/mobile-controls/light/jump.svg', import.meta.url).href
  }
} as const;

export const MOBILE_CHARGE_ASSETS = [
  {
    dark: new URL('../../assets/images/game/ui/mobile-controls/dark/charge-1.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/mobile-controls/light/charge-1.svg', import.meta.url).href
  },
  {
    dark: new URL('../../assets/images/game/ui/mobile-controls/dark/charge-2.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/mobile-controls/light/charge-2.svg', import.meta.url).href
  },
  {
    dark: new URL('../../assets/images/game/ui/mobile-controls/dark/charge-3.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/mobile-controls/light/charge-3.svg', import.meta.url).href
  },
  {
    dark: new URL('../../assets/images/game/ui/mobile-controls/dark/charge-4.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/mobile-controls/light/charge-4.svg', import.meta.url).href
  },
  {
    dark: new URL('../../assets/images/game/ui/mobile-controls/dark/charge-5.svg', import.meta.url).href,
    light: new URL('../../assets/images/game/ui/mobile-controls/light/charge-5.svg', import.meta.url).href
  }
] as const;

export type MobileControlAction = 'hidden' | 'tap_jump' | 'tap_grapple' | 'tap_airborne_charge' | 'hold_charge' | 'hold_boost';
export type MobileControlLabelKey = 'jump' | 'grapple' | 'charge' | 'boost';

interface MobileControlLayoutInput {
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

interface MobileControlDescriptor {
  visible: boolean;
  kind: 'jump' | 'grapple' | 'charge' | 'boost';
  iconSrc: string;
  labelKey: MobileControlLabelKey;
  action: MobileControlAction;
  dimmed: boolean;
}

export interface MobileControlLayout {
  visible: boolean;
  primary: MobileControlDescriptor;
  secondary: MobileControlDescriptor;
}

export function getMobileControlAsset(kind: keyof typeof MOBILE_CONTROL_ASSETS, theme = resolveDocumentTheme()) {
  return MOBILE_CONTROL_ASSETS[kind][theme];
}

export function getMobileChargeAsset(level: number, theme = resolveDocumentTheme()) {
  return MOBILE_CHARGE_ASSETS[Math.max(0, Math.min(MOBILE_CHARGE_ASSETS.length - 1, level - 1))][theme];
}

export class MobileControlLayoutResolver {
  resolve(input: MobileControlLayoutInput): MobileControlLayout {
    const theme = resolveDocumentTheme();
    const visible =
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900) &&
      window.innerWidth >= window.innerHeight &&
      input.state !== 'game_over';
    const grounded = input.playerMotionState === 'attached' || input.playerMotionState === 'charging';
    const airborne = input.playerMotionState === 'airborne';
    const airChargeLevel = Math.max(1, Math.min(5, input.mobile.airborneChargeDisplayCount || input.mobile.airborneChargeCount || 1));

    if (airborne) {
      return {
        visible,
        primary: input.mobile.hasGrapple
          ? {
              visible: true,
              kind: 'grapple',
              iconSrc: getMobileControlAsset('grapple', theme),
              labelKey: 'grapple',
              action: 'tap_grapple',
              dimmed: input.mobile.grappleBlocked
            }
          : {
              visible: false,
              kind: 'jump',
              iconSrc: getMobileControlAsset('jump', theme),
              labelKey: 'jump',
              action: 'hidden',
              dimmed: false
            },
        secondary: input.mobile.airborneChargeCount > 0
          ? {
              visible: true,
              kind: 'charge',
              iconSrc: getMobileChargeAsset(airChargeLevel, theme),
              labelKey: 'charge',
              action: 'tap_airborne_charge',
              dimmed: false
            }
          : input.mobile.hasSouffleur && input.mobile.hasSouffleurFuel
            ? {
                visible: true,
                kind: 'boost',
                iconSrc: getMobileControlAsset('boost', theme),
                labelKey: 'boost',
                action: 'hold_boost',
                dimmed: false
              }
            : {
                visible: false,
                kind: 'charge',
                iconSrc: getMobileChargeAsset(1, theme),
                labelKey: 'charge',
                action: 'hidden',
                dimmed: false
              }
      };
    }

    if (grounded) {
      return {
        visible,
        primary: {
          visible: true,
          kind: 'jump',
          iconSrc: getMobileControlAsset('jump', theme),
          labelKey: 'jump',
          action: 'tap_jump',
          dimmed: false
        },
        secondary: {
          visible: true,
          kind: 'boost',
          iconSrc: getMobileControlAsset('boost', theme),
          labelKey: 'boost',
          action: 'hold_boost',
          dimmed: input.chargeRatio <= 0.02
        }
      };
    }

    return {
      visible,
      primary: {
        visible: false,
        kind: 'jump',
        iconSrc: getMobileControlAsset('jump', theme),
        labelKey: 'jump',
        action: 'hidden',
        dimmed: false
      },
      secondary: {
        visible: false,
        kind: 'charge',
        iconSrc: getMobileChargeAsset(1, theme),
        labelKey: 'charge',
        action: 'hidden',
        dimmed: false
      }
    };
  }
}
