import { getSharedImageAsset } from '../core/browserAssetCache';
import type { LandingGrade } from './gameSessionTypes';

const FRAME_COUNT = 4 as const;
const AURA_FRAME_DURATION_MS = 150;
const FRONT_FRAME_DURATION_MS = 138;
const AURA_HIGHLIGHT_DECAY_MS = 1280;
const MOMENTUM_RAINBOW_START = 0.82;
const COLOR_LERP_ALPHA = 0.18;
const OPACITY_LERP_ALPHA = 0.16;
const LANDING_IMPULSE_DURATION_MS = 360;
const FRONT_ANIMATION_SEQUENCE = [0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3] as const;

const AURA_SPRITE_URL = new URL('../../assets/Avatar_asset/grade-sprite/auragradeavatar.png', import.meta.url).href;
const FAIL_SPRITE_URL = new URL('../../assets/Avatar_asset/grade-sprite/gradeavatarfailsprite.png', import.meta.url).href;
const SUCCESS_SPRITE_URL = new URL('../../assets/Avatar_asset/grade-sprite/gradeavatargreatsuperperfectsprite.png', import.meta.url).href;
const TWIST_SPRITE_URL = new URL('../../assets/Avatar_asset/grade-sprite/gradeavatartwistsprite.png', import.meta.url).href;

// Derived from avataremplacement.svg: a 500x500 avatar is placed inside a 312.044px slot on a 750x1000 body frame.
const BODY_LAYOUT = {
  frameWidth: 750,
  frameHeight: 1000,
  avatarX: 216.088104,
  avatarY: 77.655639,
  avatarSize: 312.044
} as const;

// Derived from avataremplacementonbarrehud.svg: the same avatar slot lands at 41.509x0 with a 21.652px size in a 512x64 bar viewBox.
const HUD_BAR_LAYOUT = {
  viewWidth: 512,
  viewHeight: 64,
  avatarX: 41.50934847031225,
  avatarY: 0,
  avatarSize: 21.651990000348583
} as const;

const GRADE_AURA_COLORS: Record<LandingGrade, string> = {
  miss: '#F06A5A',
  good: '#75AF80',
  super: '#49BCFF',
  perfect: '#8C53B4'
};

export const AVATAR_MOMENTUM_HUD_ASSET_URLS = [
  AURA_SPRITE_URL,
  FAIL_SPRITE_URL,
  SUCCESS_SPRITE_URL,
  TWIST_SPRITE_URL
] as const;

export type AvatarMomentumFrontAnimationKind = 'idle' | 'fail' | 'success' | 'twist';

export interface AvatarMomentumSpriteMetrics {
  frameCount: typeof FRAME_COUNT;
  totalWidth: number;
  totalHeight: number;
  frameWidth: number;
  frameHeight: number;
}

interface AvatarMomentumWidgetUpdatePayload {
  momentumGauge: number;
  landingFeedback: {
    serial: number;
    grade: LandingGrade;
    twist: boolean;
  } | null;
}

interface AvatarMomentumWidgetGeometry {
  widgetX: number;
  widgetY: number;
  widgetWidth: number;
  widgetHeight: number;
  widgetWidthPercent: number;
  widgetTopPercent: number;
  widgetLeftPercent: number;
  avatarLeftPercent: number;
  avatarTopPercent: number;
  avatarSizePercent: number;
}

interface FrontAnimationState {
  kind: Exclude<AvatarMomentumFrontAnimationKind, 'idle'>;
  startedAt: number;
}

type SpriteAssetKey = 'aura' | 'fail' | 'success' | 'twist';
type ColorRgb = readonly [number, number, number];

const HUD_WIDGET_GEOMETRY = resolveAvatarMomentumWidgetGeometry();
const MOMENTUM_AURA_STOPS = [
  { at: 0, color: parseHexColor('#F2DDB8') },
  { at: 0.42, color: parseHexColor('#75AF80') },
  { at: 0.74, color: parseHexColor('#49BCFF') },
  { at: 1, color: parseHexColor('#8C53B4') }
] as const;
const MOMENTUM_RAINBOW_COLORS = ['#F2DDB8', '#75AF80', '#49BCFF', '#8C53B4', '#F06A5A', '#F2DDB8'] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const normalized = clamp((value - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
  return normalized * normalized * (3 - 2 * normalized);
}

function mixColor(from: ColorRgb, to: ColorRgb, amount: number): ColorRgb {
  const t = clamp(amount, 0, 1);
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t
  ];
}

function parseHexColor(value: string): ColorRgb {
  const normalized = value.replace('#', '');
  const expanded = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;

  return [
    Number.parseInt(expanded.slice(0, 2), 16),
    Number.parseInt(expanded.slice(2, 4), 16),
    Number.parseInt(expanded.slice(4, 6), 16)
  ];
}

function formatRgb(color: ColorRgb) {
  return `rgb(${Math.round(color[0])} ${Math.round(color[1])} ${Math.round(color[2])})`;
}

function resolveMomentumAuraBaseColorRgb(momentumGauge: number): ColorRgb {
  const clampedMomentum = clamp(momentumGauge, 0, 1);
  for (let index = 0; index < MOMENTUM_AURA_STOPS.length - 1; index += 1) {
    const current = MOMENTUM_AURA_STOPS[index]!;
    const next = MOMENTUM_AURA_STOPS[index + 1]!;
    if (clampedMomentum <= next.at) {
      const localRatio = (clampedMomentum - current.at) / Math.max(0.0001, next.at - current.at);
      return mixColor(current.color, next.color, localRatio);
    }
  }
  return MOMENTUM_AURA_STOPS[MOMENTUM_AURA_STOPS.length - 1]!.color;
}

export function deriveAvatarMomentumSpriteMetrics(
  totalWidth: number,
  totalHeight: number,
  frameCount = FRAME_COUNT
): AvatarMomentumSpriteMetrics {
  const safeWidth = Math.max(1, totalWidth);
  const safeHeight = Math.max(1, totalHeight);
  return {
    frameCount,
    totalWidth: safeWidth,
    totalHeight: safeHeight,
    frameWidth: safeWidth / frameCount,
    frameHeight: safeHeight
  };
}

export function resolveAvatarMomentumFrontAnimationKind(
  grade: LandingGrade,
  twist: boolean
): Exclude<AvatarMomentumFrontAnimationKind, 'idle'> {
  if (twist) {
    return 'twist';
  }
  return grade === 'miss' ? 'fail' : 'success';
}

export function resolveMomentumAuraBaseColor(momentumGauge: number) {
  return formatRgb(resolveMomentumAuraBaseColorRgb(momentumGauge));
}

export function resolveMomentumAuraRainbowOpacity(momentumGauge: number) {
  return smoothstep(MOMENTUM_RAINBOW_START, 1, momentumGauge);
}

export function resolveAvatarMomentumFrontFrameSequence() {
  return [...FRONT_ANIMATION_SEQUENCE];
}

export function resolveAvatarMomentumLandingImpulseStrength(grade: LandingGrade, twist: boolean) {
  const baseStrength =
    grade === 'miss'
      ? 0.075
      : grade === 'good'
        ? 0.105
        : grade === 'super'
          ? 0.13
          : 0.16;
  return baseStrength + (twist ? 0.018 : 0);
}

export function resolveAvatarMomentumWidgetGeometry(): AvatarMomentumWidgetGeometry {
  const scale = HUD_BAR_LAYOUT.avatarSize / BODY_LAYOUT.avatarSize;
  const widgetWidth = BODY_LAYOUT.frameWidth * scale;
  const widgetHeight = BODY_LAYOUT.frameHeight * scale;
  const widgetX = HUD_BAR_LAYOUT.avatarX - BODY_LAYOUT.avatarX * scale;
  const widgetY = HUD_BAR_LAYOUT.avatarY - BODY_LAYOUT.avatarY * scale;

  return {
    widgetX,
    widgetY,
    widgetWidth,
    widgetHeight,
    widgetLeftPercent: (widgetX / HUD_BAR_LAYOUT.viewWidth) * 100,
    widgetTopPercent: (widgetY / HUD_BAR_LAYOUT.viewHeight) * 100,
    widgetWidthPercent: (widgetWidth / HUD_BAR_LAYOUT.viewWidth) * 100,
    avatarLeftPercent: (BODY_LAYOUT.avatarX / BODY_LAYOUT.frameWidth) * 100,
    avatarTopPercent: (BODY_LAYOUT.avatarY / BODY_LAYOUT.frameHeight) * 100,
    avatarSizePercent: (BODY_LAYOUT.avatarSize / BODY_LAYOUT.frameWidth) * 100
  };
}

function resolveFrontSpriteUrl(kind: AvatarMomentumFrontAnimationKind) {
  if (kind === 'fail') {
    return FAIL_SPRITE_URL;
  }
  if (kind === 'success') {
    return SUCCESS_SPRITE_URL;
  }
  return TWIST_SPRITE_URL;
}

function resolveSpriteAssetKey(kind: AvatarMomentumFrontAnimationKind): SpriteAssetKey {
  if (kind === 'fail') {
    return 'fail';
  }
  if (kind === 'success') {
    return 'success';
  }
  return 'twist';
}

function resolveFrameTranslatePercent(frameIndex: number) {
  return `translate3d(${Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(frameIndex))) * -25}%, 0, 0)`;
}

export class AvatarMomentumHudWidget {
  readonly element: HTMLDivElement;

  private readonly auraLayer: HTMLDivElement;
  private readonly auraBaseStrip: HTMLDivElement;
  private readonly auraRainbowStrip: HTMLDivElement;
  private readonly auraHighlightStrip: HTMLDivElement;
  private readonly avatarSlot: HTMLDivElement;
  private readonly frontLayer: HTMLDivElement;
  private readonly frontStrip: HTMLImageElement;
  private readonly spriteMetrics = new Map<SpriteAssetKey, AvatarMomentumSpriteMetrics>();
  private auraGrade: LandingGrade = 'good';
  private lastLandingSerial = 0;
  private frontAnimation: FrontAnimationState | null = null;
  private activeFrontKind: AvatarMomentumFrontAnimationKind = 'idle';
  private activeFrontFrame = -1;
  private activeAuraFrame = -1;
  private lastAvatarMarkup = '';
  private baseAuraColor: ColorRgb = parseHexColor('#F2DDB8');
  private highlightAuraColor: ColorRgb = parseHexColor(GRADE_AURA_COLORS.good);
  private rainbowOpacity = 0;
  private highlightOpacity = 0.22;
  private highlightStartedAt = -AURA_HIGHLIGHT_DECAY_MS;
  private landingImpulseStartedAt = -LANDING_IMPULSE_DURATION_MS;
  private landingImpulseStrength = 0;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'game-hud__momentum-avatar-widget';
    this.element.style.left = `${HUD_WIDGET_GEOMETRY.widgetLeftPercent}%`;
    this.element.style.top = `${HUD_WIDGET_GEOMETRY.widgetTopPercent}%`;
    this.element.style.width = `${HUD_WIDGET_GEOMETRY.widgetWidthPercent}%`;
    this.element.style.setProperty('--game-hud-avatar-slot-left', `${HUD_WIDGET_GEOMETRY.avatarLeftPercent}%`);
    this.element.style.setProperty('--game-hud-avatar-slot-top', `${HUD_WIDGET_GEOMETRY.avatarTopPercent}%`);
    this.element.style.setProperty('--game-hud-avatar-slot-size', `${HUD_WIDGET_GEOMETRY.avatarSizePercent}%`);
    this.element.style.setProperty('--game-hud-avatar-aura-color', GRADE_AURA_COLORS[this.auraGrade]);
    this.element.style.setProperty('--game-hud-avatar-frame-width', String(BODY_LAYOUT.frameWidth));
    this.element.style.setProperty('--game-hud-avatar-frame-height', String(BODY_LAYOUT.frameHeight));

    this.auraLayer = document.createElement('div');
    this.auraLayer.className = 'game-hud__momentum-avatar-widget-layer game-hud__momentum-avatar-widget-layer--aura';

    this.auraBaseStrip = document.createElement('div');
    this.auraBaseStrip.className = 'game-hud__momentum-avatar-widget-mask-strip game-hud__momentum-avatar-widget-mask-strip--base';
    this.auraBaseStrip.style.setProperty('--game-hud-avatar-aura-mask', `url("${AURA_SPRITE_URL}")`);

    this.auraRainbowStrip = document.createElement('div');
    this.auraRainbowStrip.className = 'game-hud__momentum-avatar-widget-mask-strip game-hud__momentum-avatar-widget-mask-strip--rainbow';
    this.auraRainbowStrip.style.setProperty('--game-hud-avatar-aura-mask', `url("${AURA_SPRITE_URL}")`);

    this.auraHighlightStrip = document.createElement('div');
    this.auraHighlightStrip.className = 'game-hud__momentum-avatar-widget-mask-strip game-hud__momentum-avatar-widget-mask-strip--highlight';
    this.auraHighlightStrip.style.setProperty('--game-hud-avatar-aura-mask', `url("${AURA_SPRITE_URL}")`);

    this.auraLayer.append(this.auraBaseStrip, this.auraRainbowStrip, this.auraHighlightStrip);

    this.avatarSlot = document.createElement('div');
    this.avatarSlot.className = 'game-hud__momentum-avatar-widget-layer game-hud__momentum-avatar-widget-layer--avatar';
    this.avatarSlot.hidden = true;

    this.frontLayer = document.createElement('div');
    this.frontLayer.className = 'game-hud__momentum-avatar-widget-layer game-hud__momentum-avatar-widget-layer--front';

    this.frontStrip = document.createElement('img');
    this.frontStrip.className = 'game-hud__momentum-avatar-widget-strip';
    this.frontStrip.alt = '';
    this.frontStrip.src = TWIST_SPRITE_URL;
    this.frontLayer.appendChild(this.frontStrip);

    this.element.append(this.auraLayer, this.avatarSlot, this.frontLayer);
    this.primeSpriteMetrics();
    this.applyAuraVisuals(0, performance.now());
    this.applyAuraFrame(0);
    this.applyFrontFrame(0, 'idle');
  }

  setAvatarMarkup(markup: string) {
    if (markup === this.lastAvatarMarkup) {
      return;
    }
    this.lastAvatarMarkup = markup;
    this.avatarSlot.hidden = markup.length <= 0;
    this.avatarSlot.innerHTML = markup;
  }

  update(payload: AvatarMomentumWidgetUpdatePayload) {
    const now = performance.now();

    if (payload.landingFeedback && payload.landingFeedback.serial !== this.lastLandingSerial) {
      this.lastLandingSerial = payload.landingFeedback.serial;
      this.auraGrade = payload.landingFeedback.grade;
      this.highlightStartedAt = now;
      this.frontAnimation = {
        kind: resolveAvatarMomentumFrontAnimationKind(payload.landingFeedback.grade, payload.landingFeedback.twist),
        startedAt: now
      };
      this.landingImpulseStartedAt = now;
      this.landingImpulseStrength = resolveAvatarMomentumLandingImpulseStrength(
        payload.landingFeedback.grade,
        payload.landingFeedback.twist
      );
    }

    const auraFrame = Math.floor(now / AURA_FRAME_DURATION_MS) % FRAME_COUNT;
    this.applyAuraFrame(auraFrame);
    this.applyAuraVisuals(payload.momentumGauge, now);
    this.applyLandingImpulse(now);

    if (this.frontAnimation) {
      const elapsed = Math.max(0, now - this.frontAnimation.startedAt);
      const totalDuration = FRONT_ANIMATION_SEQUENCE.length * FRONT_FRAME_DURATION_MS;
      if (elapsed < totalDuration) {
        const sequenceIndex = Math.min(
          FRONT_ANIMATION_SEQUENCE.length - 1,
          Math.floor(elapsed / FRONT_FRAME_DURATION_MS)
        );
        this.applyFrontFrame(FRONT_ANIMATION_SEQUENCE[sequenceIndex]!, this.frontAnimation.kind);
        return;
      }
      this.frontAnimation = null;
    }

    this.applyFrontFrame(0, 'idle');
  }

  private primeSpriteMetrics() {
    const registerSprite = (key: SpriteAssetKey, src: string) => {
      const image = getSharedImageAsset(src, {
        onLoad: () => this.captureSpriteMetrics(key, image)
      });
      if (image.complete && image.naturalWidth > 0 && image.naturalHeight > 0) {
        this.captureSpriteMetrics(key, image);
      }
    };

    registerSprite('aura', AURA_SPRITE_URL);
    registerSprite('fail', FAIL_SPRITE_URL);
    registerSprite('success', SUCCESS_SPRITE_URL);
    registerSprite('twist', TWIST_SPRITE_URL);
  }

  private captureSpriteMetrics(key: SpriteAssetKey, image: HTMLImageElement) {
    const metrics = deriveAvatarMomentumSpriteMetrics(image.naturalWidth, image.naturalHeight);
    this.spriteMetrics.set(key, metrics);
    this.element.style.setProperty('--game-hud-avatar-frame-width', String(metrics.frameWidth));
    this.element.style.setProperty('--game-hud-avatar-frame-height', String(metrics.frameHeight));
  }

  private applyAuraFrame(frameIndex: number) {
    if (this.activeAuraFrame === frameIndex) {
      return;
    }
    this.activeAuraFrame = frameIndex;
    const transform = resolveFrameTranslatePercent(frameIndex);
    this.auraBaseStrip.style.transform = transform;
    this.auraRainbowStrip.style.transform = transform;
    this.auraHighlightStrip.style.transform = transform;
  }

  private applyFrontFrame(frameIndex: number, kind: AvatarMomentumFrontAnimationKind) {
    if (this.activeFrontKind !== kind) {
      this.activeFrontKind = kind;
      this.frontStrip.src = resolveFrontSpriteUrl(kind);
      const metrics = this.spriteMetrics.get(resolveSpriteAssetKey(kind));
      if (metrics) {
        this.element.style.setProperty('--game-hud-avatar-frame-width', String(metrics.frameWidth));
        this.element.style.setProperty('--game-hud-avatar-frame-height', String(metrics.frameHeight));
      }
    }
    if (this.activeFrontFrame === frameIndex) {
      return;
    }
    this.activeFrontFrame = frameIndex;
    this.frontStrip.style.transform = resolveFrameTranslatePercent(frameIndex);
  }

  private applyAuraVisuals(momentumGauge: number, now: number) {
    const clampedMomentum = clamp(momentumGauge, 0, 1);
    const targetBaseColor = resolveMomentumAuraBaseColorRgb(clampedMomentum);
    const targetHighlightColor = parseHexColor(GRADE_AURA_COLORS[this.auraGrade]);
    const highlightElapsed = Math.max(0, now - this.highlightStartedAt);
    const persistentHighlightOpacity = 0.18 + clampedMomentum * 0.08;
    const highlightPulse = Math.max(0, 1 - highlightElapsed / AURA_HIGHLIGHT_DECAY_MS);
    const targetHighlightOpacity = persistentHighlightOpacity + highlightPulse * 0.54;
    const targetRainbowOpacity = resolveMomentumAuraRainbowOpacity(clampedMomentum);
    const rainbowShift = (now * 0.026) % 220;

    this.baseAuraColor = mixColor(this.baseAuraColor, targetBaseColor, COLOR_LERP_ALPHA);
    this.highlightAuraColor = mixColor(this.highlightAuraColor, targetHighlightColor, COLOR_LERP_ALPHA);
    this.highlightOpacity += (targetHighlightOpacity - this.highlightOpacity) * OPACITY_LERP_ALPHA;
    this.rainbowOpacity += (targetRainbowOpacity - this.rainbowOpacity) * OPACITY_LERP_ALPHA;

    this.auraBaseStrip.style.background = formatRgb(this.baseAuraColor);
    this.auraRainbowStrip.style.backgroundImage = `linear-gradient(90deg, ${MOMENTUM_RAINBOW_COLORS.join(', ')})`;
    this.auraRainbowStrip.style.backgroundSize = '240% 100%';
    this.auraRainbowStrip.style.backgroundPosition = `${rainbowShift.toFixed(2)}% 50%`;
    this.auraRainbowStrip.style.opacity = this.rainbowOpacity.toFixed(3);
    this.auraHighlightStrip.style.background = formatRgb(this.highlightAuraColor);
    this.auraHighlightStrip.style.opacity = this.highlightOpacity.toFixed(3);
  }

  private applyLandingImpulse(now: number) {
    const elapsed = Math.max(0, now - this.landingImpulseStartedAt);
    if (elapsed >= LANDING_IMPULSE_DURATION_MS || this.landingImpulseStrength <= 0.0001) {
      this.element.style.transform = 'scale(1)';
      return;
    }

    const progress = elapsed / LANDING_IMPULSE_DURATION_MS;
    const envelope = Math.sin(progress * Math.PI);
    const settle = 1 - progress * 0.18;
    const scale = 1 + this.landingImpulseStrength * envelope * settle;
    this.element.style.transform = `scale(${scale.toFixed(4)})`;
  }
}
