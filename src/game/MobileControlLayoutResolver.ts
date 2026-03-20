export const MOBILE_CONTROL_ASSETS = {
  grapple: new URL('../../assets/images/spritesheet/hud_haponsvg.svg', import.meta.url).href,
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

interface MobileControlInventoryItem {
  kind: string;
  slot?: string | null;
}

interface MobileControlLayoutInput {
  chargeRatio: number;
  state: 'transition' | 'running' | 'upgrade_choice' | 'game_over';
  inventoryItems: MobileControlInventoryItem[];
}

export interface MobileControlLayout {
  visible: boolean;
  showBoost: boolean;
  showGrapple: boolean;
  chargeAsset: string;
  chargeLevel: number;
}

const BOOST_SLOTS = new Set(['propulseur', 'wings', 'reacteur_front', 'reacteur_back', 'souffleur']);

export class MobileControlLayoutResolver {
  resolve(input: MobileControlLayoutInput): MobileControlLayout {
    const moduleSlots = new Set(
      input.inventoryItems
        .filter((item) => item.kind === 'module' && item.slot)
        .map((item) => item.slot as string)
    );
    const chargeLevel = Math.max(1, Math.min(5, Math.ceil(input.chargeRatio * 5)));
    const visible =
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900) &&
      window.innerWidth >= window.innerHeight &&
      input.state !== 'game_over';

    return {
      visible,
      showBoost: Array.from(moduleSlots).some((slot) => BOOST_SLOTS.has(slot)),
      showGrapple: moduleSlots.has('grappin'),
      chargeAsset: MOBILE_CHARGE_ASSETS[chargeLevel - 1],
      chargeLevel
    };
  }
}
