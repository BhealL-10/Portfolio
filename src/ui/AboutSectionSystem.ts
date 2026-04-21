import { aboutSectionContent, contactLinks } from '../data/aboutContent';
import { SECONDARY_NAV_ASSETS } from '../game/GameUiAssetResolver';
import { observeThemeChanges } from '../game/ThemeAssetResolver';
import type { Language } from '../types/content';
import { I18nService } from './I18nService';

const CONTACT_LINK_ICONS: Record<'email' | 'github' | 'x', string> = {
  email:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.75 6.75h16.5a1.5 1.5 0 0 1 1.5 1.5v7.5a3 3 0 0 1-3 3h-13.5a3 3 0 0 1-3-3v-7.5a1.5 1.5 0 0 1 1.5-1.5Zm0 1.8v.28l8.25 5.24 8.25-5.24v-.28H3.75Zm16.5 1.97-7.85 4.99a.75.75 0 0 1-.8 0l-7.85-4.99v5.23A1.2 1.2 0 0 0 4.95 16.95h14.1a1.2 1.2 0 0 0 1.2-1.2v-5.23Z" fill="currentColor"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.76-.24.76-.54v-1.9c-3.09.67-3.74-1.31-3.74-1.31-.5-1.28-1.22-1.62-1.22-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.99 1.68 2.58 1.2 3.2.92.1-.71.39-1.2.71-1.47-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.43.11-2.99 0 0 .94-.3 3.08 1.15a10.66 10.66 0 0 1 5.6 0c2.13-1.45 3.07-1.15 3.07-1.15.62 1.56.24 2.71.12 2.99.72.78 1.15 1.78 1.15 3 0 4.3-2.6 5.23-5.09 5.51.4.35.76 1.02.76 2.07v3.07c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z" fill="currentColor"/></svg>',
  x:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.9 2.25h2.85l-6.22 7.1 7.32 12.4h-5.74l-4.49-7.5-6.56 7.5H3.2l6.66-7.62L2.85 2.25h5.89l4.05 6.84 6.11-6.84Zm-1 17.77h1.58L7.88 3.9H6.19L17.9 20.02Z" fill="currentColor"/></svg>'
};

export class AboutSectionSystem {
  readonly element: HTMLDivElement;
  private panel: HTMLDivElement;
  private isOpen = false;
  onClose: (() => void) | null = null;

  constructor(host: HTMLElement, private readonly i18n: I18nService) {
    this.element = document.createElement('div');
    this.element.className = 'about-layer';

    this.panel = document.createElement('div');
    this.panel.className = 'about-layer__panel';
    this.panel.dataset.uiInteractive = 'true';

    this.element.appendChild(this.panel);
    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) this.close();
    });

    host.appendChild(this.element);

    this.i18n.onChange((language) => this.render(language));
    observeThemeChanges(() => {
      if (this.isOpen) {
        this.render(this.i18n.current);
      }
    });
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
    const closeIcon = SECONDARY_NAV_ASSETS.close.light;

    const links = contactLinks
      .map(
        (link, index) => `
          <a class="about-layer__link about-layer__link--svg" data-shape="${String(((index + 1) % 4) + 2)}" href="${link.href}" target="${link.id === 'email' ? '_self' : '_blank'}" rel="noopener">
            <span class="about-layer__link-icon" aria-hidden="true">${CONTACT_LINK_ICONS[link.id]}</span>
          </a>
        `
      )
      .join('');

    this.panel.innerHTML = `
      <div class="about-layer__close-row">
        <button class="about-layer__icon-button about-layer__icon-button--close" type="button" aria-label="${this.i18n.t('close')}">
          <img src="${closeIcon}" alt="" class="about-layer__icon-button-art" />
        </button>
      </div>
      <section class="about-layer__hero">
        <h2>${aboutSectionContent.title[language]}</h2>
        <div class="about-layer__links">${links}</div>
      </section>
      <section class="about-layer__contact-card">
        <p class="about-layer__eyebrow">${aboutSectionContent.directLabel[language]}</p>
        <a class="about-layer__email" href="mailto:${aboutSectionContent.emailAddress}">${aboutSectionContent.emailAddress}</a>
      </section>
      <section class="about-layer__form-shell">
        <h3 class="about-layer__section-label">${aboutSectionContent.formTitle[language]}</h3>
        <form class="about-layer__form">
          <label class="about-layer__field">
            <span>${aboutSectionContent.fields.name[language]}</span>
            <input name="name" type="text" autocomplete="name" placeholder="${aboutSectionContent.placeholders.name[language]}" />
          </label>
          <label class="about-layer__field">
            <span>${aboutSectionContent.fields.email[language]}</span>
            <input name="email" type="email" autocomplete="email" placeholder="${aboutSectionContent.placeholders.email[language]}" />
          </label>
          <label class="about-layer__field about-layer__field--wide">
            <span>${aboutSectionContent.fields.interest[language]}</span>
            <input name="interest" type="text" placeholder="${aboutSectionContent.placeholders.interest[language]}" />
          </label>
          <label class="about-layer__field about-layer__field--wide">
            <span>${aboutSectionContent.fields.message[language]}</span>
            <textarea name="message" rows="7" placeholder="${aboutSectionContent.placeholders.message[language]}"></textarea>
          </label>
          <button class="about-layer__submit" type="submit"><span>${aboutSectionContent.submitLabel[language]}</span></button>
        </form>
      </section>
    `;

    const closeButton = this.panel.querySelector<HTMLButtonElement>('.about-layer__icon-button--close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }

    const form = this.panel.querySelector<HTMLFormElement>('.about-layer__form');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.openMailtoDraft(form, language);
      });
    }
  }

  private openMailtoDraft(form: HTMLFormElement, language: Language) {
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const interest = String(formData.get('interest') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const subject = interest || (language === 'fr' ? 'Prise de contact portfolio' : 'Portfolio contact');
    const lines = [
      `${aboutSectionContent.fields.name[language]}: ${name || '-'}`,
      `${aboutSectionContent.fields.email[language]}: ${email || '-'}`,
      `${aboutSectionContent.fields.interest[language]}: ${interest || '-'}`,
      '',
      message || (language === 'fr' ? 'Bonjour Bilal,' : 'Hello Bilal,')
    ];

    const href = `mailto:${aboutSectionContent.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = href;
  }
}
