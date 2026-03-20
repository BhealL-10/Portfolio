import type { LandingGrade } from './gameSessionTypes';

export type GradeSpriteKey = LandingGrade | 'twist';

export const GRADE_SPRITE_ASSET_URLS: Record<GradeSpriteKey, string> = {
  miss: new URL('../../assets/images/spritesheet/Grade-Echecsheet.png', import.meta.url).href,
  good: new URL('../../assets/images/spritesheet/Grade-Greatsheet.png', import.meta.url).href,
  super: new URL('../../assets/images/spritesheet/Grade-supersheet.png', import.meta.url).href,
  perfect: new URL('../../assets/images/spritesheet/Grade-Perfectsheet.png', import.meta.url).href,
  twist: new URL('../../assets/images/spritesheet/Grade-Twistsheet.png', import.meta.url).href
};

const FRAME_POSITIONS = [
  '0% 0%',
  '100% 0%',
  '0% 100%',
  '100% 100%'
] as const;

export class GradeSpriteResolver {
  resolveAsset(key: GradeSpriteKey) {
    return GRADE_SPRITE_ASSET_URLS[key];
  }

  resolveBackgroundPosition(frameIndex: number) {
    return FRAME_POSITIONS[Math.max(0, Math.min(3, Math.floor(frameIndex))) as 0 | 1 | 2 | 3];
  }
}
