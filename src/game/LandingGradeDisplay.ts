import type { LandingGrade } from './gameSessionTypes';
import { GradeAnimationController } from './GradeAnimationController';
import { GradeSpriteResolver } from './GradeSpriteResolver';

interface LandingGradeDisplayPayload {
  grade: LandingGrade;
  twist: boolean;
  progress: number;
  screenX: number;
  screenY: number;
  gradeLabel: string;
  twistLabel: string;
}

export class LandingGradeDisplay {
  readonly element: HTMLDivElement;
  private readonly twistElement: HTMLDivElement;
  private readonly gradeElement: HTMLDivElement;
  private readonly animation = new GradeAnimationController();
  private readonly sprites = new GradeSpriteResolver();

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'game-hud__landing-feedback';

    this.twistElement = document.createElement('div');
    this.twistElement.className = 'game-hud__landing-feedback-sprite game-hud__landing-feedback-sprite--twist';
    this.twistElement.role = 'img';

    this.gradeElement = document.createElement('div');
    this.gradeElement.className = 'game-hud__landing-feedback-sprite game-hud__landing-feedback-sprite--grade';
    this.gradeElement.role = 'img';

    this.element.append(this.twistElement, this.gradeElement);
    this.clear();
  }

  clear() {
    this.element.classList.remove('is-visible', 'is-twist');
    this.element.style.transform = 'translate(-9999px, -9999px)';
    this.element.style.opacity = '0';
    this.twistElement.hidden = true;
    this.twistElement.removeAttribute('aria-label');
    this.gradeElement.removeAttribute('aria-label');
  }

  render(payload: LandingGradeDisplayPayload) {
    const animationState = this.animation.resolve(payload.progress);
    const popScale =
      payload.progress < 0.18
        ? 0.82 + (payload.progress / 0.18) * 0.28
        : 1.1 - Math.min(1, (payload.progress - 0.18) / 0.82) * 0.1;
    const driftY = payload.screenY - payload.progress * 28;

    this.applySprite(this.gradeElement, payload.grade, animationState.frameIndex, payload.gradeLabel);
    this.gradeElement.style.opacity = animationState.opacity.toFixed(3);

    this.twistElement.hidden = !payload.twist;
    if (payload.twist) {
      this.applySprite(this.twistElement, 'twist', animationState.frameIndex, payload.twistLabel);
      this.twistElement.style.opacity = animationState.opacity.toFixed(3);
    }

    this.element.classList.toggle('is-twist', payload.twist);
    this.element.classList.add('is-visible');
    this.element.style.opacity = animationState.opacity.toFixed(3);
    this.element.style.transform = `translate(${payload.screenX}px, ${driftY}px) scale(${popScale.toFixed(3)})`;
  }

  private applySprite(node: HTMLDivElement, key: LandingGrade | 'twist', frameIndex: number, label: string) {
    node.style.backgroundImage = `url('${this.sprites.resolveAsset(key)}')`;
    node.style.backgroundPosition = this.sprites.resolveBackgroundPosition(frameIndex);
    node.setAttribute('aria-label', label);
  }
}
