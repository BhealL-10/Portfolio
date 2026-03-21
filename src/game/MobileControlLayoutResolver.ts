import type { GameHudState, GamePlayerMotionState } from './gameSessionTypes';

export const MOBILE_CONTROL_ASSETS = {
  grapple: new URL('../../assets/images/spritesheet/hud_grappinsvg.svg', import.meta.url).href,
  boost: new URL('../../assets/images/spritesheet/hud_boostsvg.svg', import.meta.url).href,
  jump: new URL('../../assets/images/spritesheet/hud_jumpsvg.svg', import.meta.url).href
} as const;

export const MOBILE_CHARGE_ASSETS = [
  new URL('../../assets/images/spritesheet/hud_1chargesvg.svg', import.meta.url).href,
  new URL('../../assets/images/spritesheet/hud_2chargesvg.svg', import.meta.url).href,
  new URL('../../assets/images/spritesheet/hud_3chargesvg.svg', import.meta.url).href,
  new URL('../../assets/images/spritesheet/hud_4chargesvg.svg', import.meta.url).href,
  new URL('../../assets/images/spritesheet/hud_5chargesvg.svg', import.meta.url).href
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

function getChargeAsset(level: number) {
  return MOBILE_CHARGE_ASSETS[Math.max(0, Math.min(MOBILE_CHARGE_ASSETS.length - 1, level - 1))];
}

export class MobileControlLayoutResolver {
  resolve(input: MobileControlLayoutInput): MobileControlLayout {
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
              iconSrc: MOBILE_CONTROL_ASSETS.grapple,
              labelKey: 'grapple',
              action: 'tap_grapple',
              dimmed: input.mobile.grappleBlocked
            }
          : {
              visible: false,
              kind: 'jump',
              iconSrc: MOBILE_CONTROL_ASSETS.jump,
              labelKey: 'jump',
              action: 'hidden',
              dimmed: false
            },
        secondary: input.mobile.airborneChargeCount > 0
          ? {
              visible: true,
              kind: 'charge',
              iconSrc: getChargeAsset(airChargeLevel),
              labelKey: 'charge',
              action: 'tap_airborne_charge',
              dimmed: false
            }
          : input.mobile.hasSouffleur && input.mobile.hasSouffleurFuel
            ? {
                visible: true,
                kind: 'boost',
                iconSrc: MOBILE_CONTROL_ASSETS.boost,
                labelKey: 'boost',
                action: 'hold_boost',
                dimmed: false
              }
            : {
                visible: false,
                kind: 'charge',
                iconSrc: getChargeAsset(1),
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
          iconSrc: MOBILE_CONTROL_ASSETS.jump,
          labelKey: 'jump',
          action: 'tap_jump',
          dimmed: false
        },
        secondary: {
          visible: true,
          kind: 'boost',
          iconSrc: MOBILE_CONTROL_ASSETS.boost,
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
        iconSrc: MOBILE_CONTROL_ASSETS.jump,
        labelKey: 'jump',
        action: 'hidden',
        dimmed: false
      },
      secondary: {
        visible: false,
        kind: 'charge',
        iconSrc: getChargeAsset(1),
        labelKey: 'charge',
        action: 'hidden',
        dimmed: false
      }
    };
  }
}
