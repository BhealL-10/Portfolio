import { I18nService } from './I18nService';

export type GuideStep = 'intro' | 'orbit' | 'focus' | 'drag' | 'slots' | 'unlocked';

export class GuideBubbleSystem {
  readonly element: HTMLDivElement;
  private titleElement: HTMLParagraphElement;
  private bodyElement: HTMLParagraphElement;
  private currentStep: GuideStep = 'intro';

  constructor(private readonly host: HTMLElement, private readonly i18n: I18nService) {
    this.element = document.createElement('div');
    this.element.className = 'guide-bubble';

    this.titleElement = document.createElement('p');
    this.titleElement.className = 'guide-bubble__title';

    this.bodyElement = document.createElement('p');
    this.bodyElement.className = 'guide-bubble__body';

    this.element.append(this.titleElement, this.bodyElement);
    this.host.appendChild(this.element);

    this.i18n.onChange(() => this.render());
    this.render();
  }

  setStep(step: GuideStep) {
    if (step === this.currentStep) return;
    this.currentStep = step;
    this.render();
  }

  private render() {
    const title = this.currentStep === 'unlocked' ? this.i18n.t('unlocked') : this.i18n.t('home');
    const body = {
      intro: this.i18n.t('introHint'),
      orbit: this.i18n.t('orbitHint'),
      focus: this.i18n.t('focusHint'),
      drag: this.i18n.t('dragHint'),
      slots: this.i18n.t('slotHint'),
      unlocked: this.i18n.t('unlockedHint')
    }[this.currentStep];

    this.titleElement.textContent = title;
    this.bodyElement.textContent = body;
  }
}
