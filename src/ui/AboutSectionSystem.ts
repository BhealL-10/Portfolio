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
      <section class="about-layer__hero">
        <h2>${aboutSectionContent.title[language]}</h2>
        <p class="about-layer__hero-copy">${aboutSectionContent.formIntro[language]}</p>
        <div class="about-layer__links">${links}</div>
      </section>
      <section class="about-layer__contact-card">
        <p class="about-layer__eyebrow">${aboutSectionContent.directLabel[language]}</p>
        <a class="about-layer__email" href="mailto:${aboutSectionContent.emailAddress}">${aboutSectionContent.emailAddress}</a>
        <p class="about-layer__direct-copy">${aboutSectionContent.directHint[language]}</p>
      </section>
      <section class="about-layer__form-shell">
        <h3>${aboutSectionContent.formTitle[language]}</h3>
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
          <button class="about-layer__submit" type="submit">${aboutSectionContent.submitLabel[language]}</button>
        </form>
      </section>
    `;

    const closeButton = this.panel.querySelector<HTMLButtonElement>('.about-layer__close');
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
      message || (language === 'fr' ? 'Bonjour' : 'Hello')
    ];

    const href = `mailto:${aboutSectionContent.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = href;
  }
}
