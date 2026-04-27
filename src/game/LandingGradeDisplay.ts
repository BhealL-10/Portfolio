import type { LandingGrade } from './gameSessionTypes';
import { GradeAnimationController } from './GradeAnimationController';
import { GradeSpriteResolver } from './GradeSpriteResolver';

export type LandingGradeDisplayVisualMode = 'full' | 'reduced' | 'static';

interface LandingGradeDisplayPayload {
  serial: number;
  grade: LandingGrade;
  twist: boolean;
  progress: number;
  screenX: number;
  screenY: number;
  gradeLabel: string;
  twistLabel: string;
}

const LANDING_GRADE_DURATION_MS = 1350;

export class LandingGradeDisplay {
  readonly element: HTMLDivElement;
  private readonly twistElement: HTMLDivElement;
  private readonly gradeElement: HTMLDivElement;
  private readonly animation = new GradeAnimationController();
  private readonly sprites = new GradeSpriteResolver();
  private activePayload: LandingGradeDisplayPayload | null = null;
  private activeSignature = '';
  private lastDismissedSignature = '';
  private startedAt = 0;
  private lastObservedProgress = 0;
  private visualMode: LandingGradeDisplayVisualMode = 'full';

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'game-hud__landing-feedback';
    this.element.dataset.animationMode = this.visualMode;

    this.twistElement = document.createElement('div');
    this.twistElement.className = 'game-hud__landing-feedback-sprite game-hud__landing-feedback-sprite--twist';
    this.twistElement.role = 'img';

    this.gradeElement = document.createElement('div');
    this.gradeElement.className = 'game-hud__landing-feedback-sprite game-hud__landing-feedback-sprite--grade';
    this.gradeElement.role = 'img';

    this.element.append(this.twistElement, this.gradeElement);
    this.clear();
  }

  setVisualMode(mode: LandingGradeDisplayVisualMode) {
    this.visualMode = mode;
    this.element.dataset.animationMode = mode;
  }

  clear() {
    if (this.activeSignature) {
      this.lastDismissedSignature = this.activeSignature;
    }
    this.activePayload = null;
    this.activeSignature = '';
    this.startedAt = 0;
    this.lastObservedProgress = 0;
    this.element.classList.remove('is-visible', 'is-twist');
    this.element.style.transform = 'translate(-9999px, -9999px)';
    this.element.style.opacity = '0';
    this.twistElement.hidden = true;
    this.twistElement.removeAttribute('aria-label');
    this.gradeElement.removeAttribute('aria-label');
  }

  update(payload: LandingGradeDisplayPayload | null) {
    const now = performance.now();

    if (payload) {
      const incomingSignature = this.buildSignature(payload);
      const progressRestarted = payload.progress < this.lastObservedProgress - 0.18;
      const canStartDismissedFeedback = incomingSignature !== this.lastDismissedSignature || payload.progress <= 0.14;

      if (!this.activePayload) {
        if (!canStartDismissedFeedback) {
          return;
        }
        this.activePayload = payload;
        this.activeSignature = incomingSignature;
        this.startedAt = now - Math.max(0, Math.min(1, payload.progress)) * LANDING_GRADE_DURATION_MS;
      } else {
        const signatureChanged = incomingSignature !== this.activeSignature;
        const shouldRestart =
          payload.grade !== this.activePayload.grade ||
          payload.twist !== this.activePayload.twist ||
          progressRestarted ||
          (signatureChanged && payload.progress <= 0.18);

        if (shouldRestart) {
          this.activeSignature = incomingSignature;
          this.startedAt = now - Math.max(0, Math.min(1, payload.progress)) * LANDING_GRADE_DURATION_MS;
          this.lastDismissedSignature = '';
        }

        this.activePayload = payload;
      }

      this.lastObservedProgress = payload.progress;
    }

    if (!this.activePayload) {
      this.clear();
      return;
    }

    const progress = Math.min(1, Math.max(0, (now - this.startedAt) / LANDING_GRADE_DURATION_MS));
    if (progress >= 1) {
      this.clear();
      return;
    }

    const animationState = this.animation.resolve(progress);
    const frameIndex = this.visualMode === 'full' ? animationState.frameIndex : 0;
    const opacity =
      this.visualMode === 'full'
        ? animationState.opacity
        : this.visualMode === 'reduced'
          ? Math.max(0, 1 - progress * 0.72)
          : 1;
    const popScale =
      this.visualMode === 'full'
        ? (
            progress < 0.18
              ? 0.82 + (progress / 0.18) * 0.28
              : 1.1 - Math.min(1, (progress - 0.18) / 0.82) * 0.1
          )
        : this.visualMode === 'reduced'
          ? 1.02
          : 1;
    const driftY =
      this.visualMode === 'static'
        ? this.activePayload.screenY
        : this.activePayload.screenY - progress * (this.visualMode === 'full' ? 28 : 14);

    this.applySprite(this.gradeElement, this.activePayload.grade, frameIndex, this.activePayload.gradeLabel);
    this.gradeElement.style.opacity = opacity.toFixed(3);

    this.twistElement.hidden = !this.activePayload.twist;
    if (this.activePayload.twist) {
      this.applySprite(this.twistElement, 'twist', frameIndex, this.activePayload.twistLabel);
      this.twistElement.style.opacity = opacity.toFixed(3);
    }

    this.element.classList.toggle('is-twist', this.activePayload.twist);
    this.element.classList.add('is-visible');
    this.element.style.opacity = opacity.toFixed(3);
    this.element.style.transform =
      this.visualMode === 'static'
        ? `scale(${popScale.toFixed(3)})`
        : `translate(${this.activePayload.screenX}px, ${driftY}px) scale(${popScale.toFixed(3)})`;
  }

  private buildSignature(payload: LandingGradeDisplayPayload) {
    return `${payload.serial}:${payload.grade}:${payload.twist ? 1 : 0}`;
  }

  private applySprite(node: HTMLDivElement, key: LandingGrade | 'twist', frameIndex: number, label: string) {
    node.style.backgroundImage = `url('${this.sprites.resolveAsset(key)}')`;
    node.style.backgroundPosition = this.sprites.resolveBackgroundPosition(frameIndex);
    node.setAttribute('aria-label', label);
  }
}
