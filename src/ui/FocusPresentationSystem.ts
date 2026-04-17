import type { PortfolioProject, ProjectFacet, ProjectFacetAsset } from '../types/content';
import { SECONDARY_NAV_ASSETS } from '../game/GameUiAssetResolver';
import { observeThemeChanges, resolveDocumentTheme } from '../game/ThemeAssetResolver';
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
    observeThemeChanges(() => {
      if (this.project) {
        this.render();
      }
    });
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
    const theme = resolveDocumentTheme();
    const closeIcon = SECONDARY_NAV_ASSETS.close[theme];
    const prevIcon = SECONDARY_NAV_ASSETS.left[theme];
    const nextIcon = SECONDARY_NAV_ASSETS.right[theme];

    this.panel.classList.toggle('is-facet-transitioning', this.facetTransitioning);
    this.panel.dataset.facetDirection = this.facetTransitionDirection > 0 ? 'next' : 'prev';
    this.panel.innerHTML = `
      <div class="focus-layer__panel-scroll">
      <div class="focus-layer__content">
      <div class="focus-layer__header" aria-hidden="true"></div>
      <div class="focus-layer__close-row">
        <button class="focus-layer__icon-button focus-layer__icon-button--close" type="button" aria-label="${this.i18n.t('close')}">
          <img src="${closeIcon}" alt="" class="focus-layer__icon-button-art" />
        </button>
      </div>
      <div class="focus-layer__title-block">
        <div class="focus-layer__facet-nav">
          <button class="focus-layer__icon-button focus-layer__icon-button--nav" type="button" aria-label="${this.i18n.t('previous')}">
            <img src="${prevIcon}" alt="" class="focus-layer__icon-button-art" />
          </button>
          <div class="focus-layer__title-copy">
            <h2 class="focus-layer__title">${this.project.title[language]}</h2>
          </div>
          <button class="focus-layer__icon-button focus-layer__icon-button--nav" type="button" aria-label="${this.i18n.t('next')}">
            <img src="${nextIcon}" alt="" class="focus-layer__icon-button-art" />
          </button>
        </div>
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
      </div>
      </div>
    `;

    const closeButton = this.panel.querySelector<HTMLButtonElement>('.focus-layer__icon-button--close');
    const facetButtons = this.panel.querySelectorAll<HTMLButtonElement>('.focus-layer__icon-button--nav');
    closeButton?.addEventListener('click', () => this.callbacks.onClose());
    facetButtons[0]?.addEventListener('click', () => this.callbacks.onPrevFacet());
    facetButtons[1]?.addEventListener('click', () => this.callbacks.onNextFacet());

    this.bindMediaEvents(facet);
  }

  private renderMedia(facet: PortfolioProject['facets'][number]) {
    const assets = this.getFacetAssets(facet);
    const displayAssets = assets.filter((asset) => asset.kind !== 'site');
    const actionAssets = assets.filter((asset) => asset.kind === 'site');

    if (displayAssets.length === 1 && displayAssets[0]?.kind === 'youtube') {
      const asset = displayAssets[0];
      return `
        <div class="focus-layer__video-shell">
          <iframe
            class="focus-layer__video-frame"
            src="${asset.embedUrl}"
            title="${asset.title?.[this.i18n.current] ?? this.project?.title[this.i18n.current] ?? 'Project video'}"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        ${this.renderActionLinks(actionAssets)}
      `;
    }

    const images = displayAssets.filter((asset) => asset.kind === 'image' || asset.kind === 'gif');
    const hasMixedRichMedia = displayAssets.some((asset) => asset.kind === 'youtube');
    const imageSources = images.map((asset) => asset.src).filter((value): value is string => Boolean(value)).slice(0, 12);

    if (hasMixedRichMedia) {
      return `
        <div class="focus-layer__asset-stack">
          ${displayAssets
            .map((asset) => {
              if (asset.kind === 'youtube') {
                return `
                  <div class="focus-layer__video-shell focus-layer__asset-card">
                    <iframe
                      class="focus-layer__video-frame"
                      src="${asset.embedUrl}"
                      title="${asset.title?.[this.i18n.current] ?? this.project?.title[this.i18n.current] ?? 'Project video'}"
                      loading="lazy"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                `;
              }
              return `<figure class="focus-layer__asset-card"><img class="focus-layer__image focus-layer__image--framed" src="${asset.src}" alt="Project media"></figure>`;
            })
            .join('')}
        </div>
        ${this.renderActionLinks(actionAssets)}
      `;
    }

    const currentImage = imageSources[this.currentSlide] || '';
    if (imageSources.length === 0) {
      return this.renderActionLinks(actionAssets);
    }

    if (imageSources.length === 1) {
      return `<img class="focus-layer__image" src="${imageSources[0]}" alt="Project media">${this.renderActionLinks(actionAssets)}`;
    }

    if (this.gridView) {
      return `
        <div class="focus-layer__grid">
          ${imageSources
            .map(
              (image, index) => `<button class="focus-layer__thumb" data-slide="${index}" type="button"><img src="${image}" alt="Project media ${index + 1}"></button>`
            )
            .join('')}
        </div>
        ${this.renderActionLinks(actionAssets)}
      `;
    }

    return `
      <div class="focus-layer__slideshow">
        <button class="focus-layer__icon-button focus-layer__icon-button--nav focus-layer__slide-nav" data-slide-dir="-1" type="button" aria-label="${this.i18n.t('previous')}">
          <img src="${SECONDARY_NAV_ASSETS.left[resolveDocumentTheme()]}" alt="" class="focus-layer__icon-button-art" />
        </button>
        <img class="focus-layer__image" src="${currentImage}" alt="Project media ${this.currentSlide + 1}">
        <button class="focus-layer__icon-button focus-layer__icon-button--nav focus-layer__slide-nav" data-slide-dir="1" type="button" aria-label="${this.i18n.t('next')}">
          <img src="${SECONDARY_NAV_ASSETS.right[resolveDocumentTheme()]}" alt="" class="focus-layer__icon-button-art" />
        </button>
      </div>
      ${this.renderActionLinks(actionAssets)}
    `;
  }

  private getFacetAssets(facet: ProjectFacet) {
    const assets: ProjectFacetAsset[] = [...(facet.assets ?? [])];

    if (assets.length === 0 && facet.media?.kind === 'youtube') {
      assets.push({
        kind: 'youtube',
        embedUrl: facet.media.embedUrl,
        title: facet.media.title ? { fr: facet.media.title, en: facet.media.title } : undefined
      });
    }

    if (assets.length === 0 && facet.images.length > 0) {
      facet.images.forEach((image) => {
        assets.push({
          kind: image.toLowerCase().endsWith('.gif') ? 'gif' : 'image',
          src: image
        });
      });
    }

    const linkLabels: Record<string, { fr: string; en: string }> = {
      github: { fr: 'GitHub', en: 'GitHub' },
      demo: { fr: 'Site', en: 'Site' },
      video: { fr: 'Video', en: 'Video' }
    };

    Object.entries(facet.links)
      .filter(([, href]) => href)
      .forEach(([key, href]) => {
        if (assets.some((asset) => asset.kind === 'site' && asset.href === href)) {
          return;
        }
        assets.push({
          kind: 'site',
          href: href ?? undefined,
          label: linkLabels[key] ?? { fr: key.toUpperCase(), en: key.toUpperCase() }
        });
      });

    return assets;
  }

  private renderActionLinks(assets: ProjectFacetAsset[]) {
    if (assets.length === 0) {
      return '';
    }

    return `
      <div class="focus-layer__actions">
        ${assets
          .map((asset) => `<a class="focus-layer__action-link" href="${asset.href}" target="_blank" rel="noopener">${asset.label?.[this.i18n.current] ?? 'Open'}</a>`)
          .join('')}
      </div>
    `;
  }

  private bindMediaEvents(facet: PortfolioProject['facets'][number]) {
    const images = this.getFacetAssets(facet)
      .filter((asset) => asset.kind === 'image' || asset.kind === 'gif')
      .map((asset) => asset.src)
      .filter((value): value is string => Boolean(value))
      .slice(0, 12);
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
