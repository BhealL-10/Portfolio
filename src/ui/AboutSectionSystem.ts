import { aboutSectionContent, contactLinks } from '../data/aboutContent';
import type { Language } from '../types/content';
import { I18nService } from './I18nService';

export class AboutSectionSystem {
  readonly element: HTMLDivElement;
  private panel: HTMLDivElement;
  private closeButton: HTMLButtonElement;
  private isOpen = false;
  onClose: (() => void) | null = null;

  constructor(host: HTMLElement, private readonly i18n: I18nService) {
    this.element = document.createElement('div');
    this.element.className = 'about-layer';

    this.panel = document.createElement('div');
    this.panel.className = 'about-layer__panel';
    this.panel.dataset.uiInteractive = 'true';

    this.closeButton = document.createElement('button');
    this.closeButton.className = 'about-layer__close';
    this.closeButton.type = 'button';
    this.closeButton.addEventListener('click', () => this.close());

    this.panel.appendChild(this.closeButton);
    this.element.appendChild(this.panel);
    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) this.close();
    });

    host.appendChild(this.element);

    this.i18n.onChange((language) => this.render(language));
    this.render(this.i18n.current);
  }

  open() {
    this.isOpen = true;
    this.element.classList.add('is-open');
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.element.classList.remove('is-open');
    this.onClose?.();
  }

  get opened() {
    return this.isOpen;
  }

  private render(language: Language) {
    this.closeButton.textContent = this.i18n.t('close');

    const skills = aboutSectionContent.skills
      .map(
        (skill) => `
          <article class="about-layer__skill">
            <h3>${skill.title[language]}</h3>
            <p>${skill.body[language]}</p>
          </article>
        `
      )
      .join('');

    const links = contactLinks
      .map(
        (link) => `
          <a class="about-layer__link" href="${link.href}" target="${link.id === 'email' ? '_self' : '_blank'}" rel="noopener">
            ${link.label[language]}
          </a>
        `
      )
      .join('');

    this.panel.innerHTML = `
      <button class="about-layer__close" type="button">${this.i18n.t('close')}</button>
      <h2>${aboutSectionContent.title[language]}</h2>
      <p>${aboutSectionContent.paragraphs[0][language]}</p>
      <p>${aboutSectionContent.paragraphs[1][language]}</p>
      <div class="about-layer__skills">${skills}</div>
      <h3>${aboutSectionContent.contactTitle[language]}</h3>
      <p>${aboutSectionContent.contactText[language]}</p>
      <div class="about-layer__links">${links}</div>
    `;

    const closeButton = this.panel.querySelector<HTMLButtonElement>('.about-layer__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }
  }
}
