import type { LocalizedText } from '../types/content';
import { I18nService } from './I18nService';

const GUIDE_CHARACTER_ASSET = new URL('../../assets/images/shared/branding/guide/anime_constant.png', import.meta.url).href;

const GUIDE_COPY: Record<GuideStep, { title: LocalizedText; body: LocalizedText }> = {
  intro: {
    title: { fr: 'Miroir', en: 'Mirror' },
    body: {
      fr: 'Passe la souris pour réveiller les fissures, puis clique pour ouvrir la surface.',
      en: 'Sweep the cursor to wake the fractures, then click to break the surface open.'
    }
  },
  primaterie: {
    title: { fr: 'Primaterie', en: 'Primaterie' },
    body: {
      fr: 'Ici tout répond au survol. Balaye, clique, et laisse les facettes venir à toi.',
      en: 'Everything answers to hover here. Sweep, click, and let the facets come to you.'
    }
  },
  orbit: {
    title: { fr: 'Orbites', en: 'Orbits' },
    body: {
      fr: 'Glisse horizontalement ou utilise les flèches pour changer de facette sans perdre le rythme.',
      en: 'Drag sideways or use the arrows to change facets without losing the rhythm.'
    }
  },
  focus: {
    title: { fr: 'Focus', en: 'Focus' },
    body: {
      fr: 'Une shard en focus montre plusieurs faces. Fais-la tourner doucement pour lire toute l’histoire.',
      en: 'A focused shard has more than one face. Turn it gently to read the full story.'
    }
  },
  drag: {
    title: { fr: 'Traque', en: 'Hunt' },
    body: {
      fr: 'Sors une shard du focus et cherche sa place secrète. Le bon emplacement finit par réagir.',
      en: 'Pull a shard out of focus and look for its hidden slot. The right placement always reacts.'
    }
  },
  slots: {
    title: { fr: 'Verrou', en: 'Lock' },
    body: {
      fr: 'Quand une zone frémit, insiste un peu. Chaque shard réclame exactement son propre verrou.',
      en: 'When one area starts twitching, stay with it. Each shard wants its own exact lock.'
    }
  },
  unlocked: {
    title: { fr: 'Ouvert', en: 'Unlocked' },
    body: {
      fr: 'Tout est en place. Le passage vers la suite est prêt quand toi tu l’es.',
      en: 'Everything is in place. The passage forward is ready whenever you are.'
    }
  },
  about: {
    title: { fr: 'Outro', en: 'Outro' },
    body: {
      fr: 'Pause ici si tu veux le contexte complet, puis replonge quand l’envie revient.',
      en: 'Pause here for the full context, then dive back in whenever the urge returns.'
    }
  }
};

export type GuideStep = 'intro' | 'primaterie' | 'orbit' | 'focus' | 'drag' | 'slots' | 'unlocked' | 'about';

export class GuideBubbleSystem {
  readonly element: HTMLDivElement;
  private readonly titleElement: HTMLParagraphElement;
  private readonly bodyElement: HTMLParagraphElement;
  private currentStep: GuideStep = 'intro';

  constructor(private readonly host: HTMLElement, private readonly i18n: I18nService) {
    this.element = document.createElement('div');
    this.element.className = 'guide-bubble';
    this.element.setAttribute('aria-hidden', 'true');

    const character = document.createElement('img');
    character.className = 'guide-bubble__character';
    character.src = GUIDE_CHARACTER_ASSET;
    character.alt = '';
    character.decoding = 'async';

    const panel = document.createElement('div');
    panel.className = 'guide-bubble__panel';

    this.titleElement = document.createElement('p');
    this.titleElement.className = 'guide-bubble__title';

    this.bodyElement = document.createElement('p');
    this.bodyElement.className = 'guide-bubble__body';

    panel.append(this.titleElement, this.bodyElement);
    this.element.append(character, panel);
    this.host.appendChild(this.element);

    this.i18n.onChange(() => this.render());
    this.render();
  }

  setStep(step: GuideStep) {
    if (step === this.currentStep) {
      return;
    }
    this.currentStep = step;
    this.render();
  }

  private render() {
    const copy = GUIDE_COPY[this.currentStep];
    const language = this.i18n.current;
    this.titleElement.textContent = copy.title[language];
    this.bodyElement.textContent = copy.body[language];
  }
}
