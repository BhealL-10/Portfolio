import type { LandingGrade } from './gameSessionTypes';
import { resolveDocumentTheme } from './ThemeAssetResolver';

export type GradeSpriteKey = LandingGrade | 'twist';

export const GRADE_SPRITE_ASSET_URLS: Record<'dark' | 'light', Record<GradeSpriteKey, string>> = {
  dark: {
    miss: new URL('../../assets/images/game/sprites/grades/light/miss-sheet-light.png', import.meta.url).href,
    good: new URL('../../assets/images/game/sprites/grades/light/great-sheet-light.png', import.meta.url).href,
    super: new URL('../../assets/images/game/sprites/grades/light/super-sheet-light.png', import.meta.url).href,
    perfect: new URL('../../assets/images/game/sprites/grades/light/perfect-sheet-light.png', import.meta.url).href,
    twist: new URL('../../assets/images/game/sprites/grades/light/twist-sheet-light.png', import.meta.url).href
  },
  light: {
    miss: new URL('../../assets/images/game/sprites/grades/dark/miss-sheet-dark.png', import.meta.url).href,
    good: new URL('../../assets/images/game/sprites/grades/dark/great-sheet-dark.png', import.meta.url).href,
    super: new URL('../../assets/images/game/sprites/grades/dark/super-sheet-dark.png', import.meta.url).href,
    perfect: new URL('../../assets/images/game/sprites/grades/dark/perfect-sheet-dark.png', import.meta.url).href,
    twist: new URL('../../assets/images/game/sprites/grades/dark/twist-sheet-dark.png', import.meta.url).href
  }
};

const FRAME_POSITIONS = [
  '0% 0%',
  '100% 0%',
  '0% 100%',
  '100% 100%'
] as const;

export class GradeSpriteResolver {
  resolveAsset(key: GradeSpriteKey) {
    return GRADE_SPRITE_ASSET_URLS[resolveDocumentTheme()][key];
  }

  resolveBackgroundPosition(frameIndex: number) {
    return FRAME_POSITIONS[Math.max(0, Math.min(3, Math.floor(frameIndex))) as 0 | 1 | 2 | 3];
  }
}
