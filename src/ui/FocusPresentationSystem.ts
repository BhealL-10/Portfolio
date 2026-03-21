import type { PortfolioProject } from '../types/content';
import { I18nService } from './I18nService';

interface FocusCallbacks {
  onClose: () => void;
  onPrevFacet: () => void;
  onNextFacet: () => void;
}

export class FocusPresentationSystem {
  readonly element: HTMLDivElement;
  private panel: HTMLDivElement;
  private project: PortfolioProject | null = null;
  private facetIndex = 0;
  private currentSlide = 0;
  private gridView = false;
  private facetTransitionDirection: -1 | 1 = 1;
  private facetTransitioning = false;
  private callbacks: FocusCallbacks;

  constructor(host: HTMLElement, private readonly i18n: I18nService, callbacks: FocusCallbacks) {
    this.callbacks = callbacks;
    this.element = document.createElement('div');
    this.element.className = 'focus-layer';
    this.panel = document.createElement('div');
    this.panel.className = 'focus-layer__panel';
    this.panel.dataset.uiInteractive = 'true';
    this.element.appendChild(this.panel);
    host.appendChild(this.element);

    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) this.callbacks.onClose();
    });

    this.i18n.onChange(() => this.render());
  }

  show(project: PortfolioProject, facetIndex: number) {
    this.project = project;
    this.facetIndex = facetIndex;
    this.currentSlide = 0;
    this.gridView = false;
    this.facetTransitioning = false;
    this.render();
    this.element.classList.add('is-visible');
  }

  hide() {
    this.element.classList.remove('is-visible');
    this.project = null;
    this.facetTransitioning = false;
  }

  beginFacetTransition(direction: -1 | 1) {
    this.facetTransitionDirection = direction;
    this.facetTransitioning = true;
    this.panel.classList.add('is-facet-transitioning');
    this.panel.dataset.facetDirection = direction > 0 ? 'next' : 'prev';
  }

  updateFacet(facetIndex: number) {
    this.facetIndex = facetIndex;
    this.currentSlide = 0;
    this.gridView = false;
    this.facetTransitioning = false;
    this.render();
  }

  private render() {
    if (!this.project) {
      this.panel.innerHTML = '';
      return;
    }

    const language = this.i18n.current;
    const facet = this.project.facets[this.facetIndex];

    this.panel.classList.toggle('is-facet-transitioning', this.facetTransitioning);
    this.panel.dataset.facetDirection = this.facetTransitionDirection > 0 ? 'next' : 'prev';
    this.panel.innerHTML = `
      <div class="focus-layer__panel-scroll">
      <div class="focus-layer__content">
      <div class="focus-layer__header">
        <button class="focus-layer__close" type="button">${this.i18n.t('close')}</button>
      </div>
      <div class="focus-layer__title-block">
        <p class="focus-layer__facet-category">${facet.categoryLabel[language]}</p>
        <div class="focus-layer__facet-nav">
          <button class="focus-layer__facet-btn" type="button">${this.i18n.t('previous')}</button>
          <div class="focus-layer__title-copy">
            <h2>${this.project.title[language]}</h2>
          </div>
          <button class="focus-layer__facet-btn" type="button">${this.i18n.t('next')}</button>
        </div>
        <p class="focus-layer__facet-progress">${this.facetIndex + 1} / ${this.project.facets.length}</p>
      </div>
      <div class="focus-layer__media">
        ${this.renderMedia(facet)}
      </div>
      <div class="focus-layer__body">
        ${facet.description[language]
          .split('\n\n')
          .map((paragraph) => `<p>${paragraph}</p>`)
          .join('')}
      </div>
      <section class="focus-layer__section">
        <h3>${this.i18n.t('technologies')}</h3>
        <div class="focus-layer__tags">
          ${facet.technologies.map((technology) => `<span>${technology[language]}</span>`).join('')}
        </div>
      </section>
      <section class="focus-layer__section">
        <h3>${this.i18n.t('links')}</h3>
        <div class="focus-layer__links">
          ${this.renderLinks()}
        </div>
      </section>
      </div>
      </div>
    `;

    const closeButton = this.panel.querySelector<HTMLButtonElement>('.focus-layer__close');
    const facetButtons = this.panel.querySelectorAll<HTMLButtonElement>('.focus-layer__facet-btn');
    closeButton?.addEventListener('click', () => this.callbacks.onClose());
    facetButtons[0]?.addEventListener('click', () => this.callbacks.onPrevFacet());
    facetButtons[1]?.addEventListener('click', () => this.callbacks.onNextFacet());

    this.bindMediaEvents(facet);
  }

  private renderMedia(facet: PortfolioProject['facets'][number]) {
    if (facet.media?.kind === 'youtube') {
      return `
        <div class="focus-layer__video-shell">
          <iframe
            class="focus-layer__video-frame"
            src="${facet.media.embedUrl}"
            title="${facet.media.title ?? this.project?.title[this.i18n.current] ?? 'Project video'}"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      `;
    }

    const images = facet.images.slice(0, 12);
    const currentImage = images[this.currentSlide] || '';
    if (images.length === 0) {
      return '';
    }

    if (images.length === 1) {
      return `<img class="focus-layer__image" src="${images[0]}" alt="Project media">`;
    }

    if (this.gridView) {
      return `
        <div class="focus-layer__grid">
          ${images
            .map(
              (image, index) => `<button class="focus-layer__thumb" data-slide="${index}" type="button"><img src="${image}" alt="Project media ${index + 1}"></button>`
            )
            .join('')}
        </div>
      `;
    }

    return `
      <div class="focus-layer__slideshow">
        <button class="focus-layer__slide-nav" data-slide-dir="-1" type="button">${this.i18n.t('previous')}</button>
        <img class="focus-layer__image" src="${currentImage}" alt="Project media ${this.currentSlide + 1}">
        <button class="focus-layer__slide-nav" data-slide-dir="1" type="button">${this.i18n.t('next')}</button>
      </div>
      <div class="focus-layer__facet-progress">${this.currentSlide + 1} / ${images.length}</div>
    `;
  }

  private renderLinks() {
    if (!this.project) return '';
    const facet = this.project.facets[this.facetIndex];
    const entries = Object.entries(facet.links).filter(([, href]) => href);
    if (entries.length === 0) return `<span class="focus-layer__empty">${this.i18n.t('links')}</span>`;

    return entries
      .map(([key, href]) => `<a class="focus-layer__link" href="${href}" target="_blank" rel="noopener">${key.toUpperCase()}</a>`)
      .join('');
  }

  private bindMediaEvents(facet: PortfolioProject['facets'][number]) {
    if (facet.media?.kind === 'youtube') {
      return;
    }

    const images = facet.images.slice(0, 12);
    if (images.length <= 1) return;

    const image = this.panel.querySelector<HTMLImageElement>('.focus-layer__image');
    const slideButtons = this.panel.querySelectorAll<HTMLButtonElement>('.focus-layer__slide-nav');
    const thumbButtons = this.panel.querySelectorAll<HTMLButtonElement>('.focus-layer__thumb');

    image?.addEventListener('click', () => {
      this.gridView = true;
      this.render();
    });

    slideButtons.forEach((button) =>
      button.addEventListener('click', () => {
        const direction = Number(button.dataset.slideDir) || 0;
        this.currentSlide = (this.currentSlide + direction + images.length) % images.length;
        this.render();
      })
    );

    thumbButtons.forEach((button) =>
      button.addEventListener('click', () => {
        this.currentSlide = Number(button.dataset.slide) || 0;
        this.gridView = false;
        this.render();
      })
    );
  }
}
