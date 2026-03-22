import { clamp } from '../core/math';
import { I18nService } from '../ui/I18nService';
import { ThemeService } from '../ui/ThemeService';

interface Site {
  x: number;
  y: number;
  fractureId: number;
}

interface Fragment {
  points: Array<{ x: number; y: number }>;
  centerX: number;
  centerY: number;
  velocityX: number;
  velocityY: number;
  angularVelocity: number;
  rotation: number;
}

export class IntroVoronoiSystem {
  readonly element: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private content: HTMLDivElement;
  private progress: HTMLDivElement;
  private logo: HTMLImageElement;
  private sites: Site[] = [];
  private cellCache: Array<Array<{ x: number; y: number }>> = [];
  private fragments: Fragment[] = [];
  private clickCount = 0;
  private readonly clickThreshold = 8;
  private fractureIndex = 0;
  private state: 'idle' | 'shattering' | 'hidden' = 'idle';
  private opacity = 1;
  private shatterElapsed = 0;
  onBroken: (() => void) | null = null;
  onHidden: (() => void) | null = null;

  constructor(host: HTMLElement, private readonly i18n: I18nService, private readonly theme: ThemeService) {
    this.element = document.createElement('div');
    this.element.className = 'intro-layer';

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'intro-layer__canvas';
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context unavailable');
    }
    this.context = context;

    this.content = document.createElement('div');
    this.content.className = 'intro-layer__content';
    this.content.innerHTML = `
      <div class="intro-layer__logo-wrap">
        <img class="intro-layer__logo" alt="Ape Prod logo">
      </div>
      <h1 class="intro-layer__title"></h1>
      <p class="intro-layer__subtitle"></p>
      <div class="intro-layer__progress"></div>
    `;

    this.logo = this.content.querySelector<HTMLImageElement>('.intro-layer__logo')!;
    this.progress = this.content.querySelector<HTMLDivElement>('.intro-layer__progress')!;

    this.element.append(this.canvas, this.content);
    host.appendChild(this.element);

    this.element.addEventListener('pointerdown', this.onPointerDown);
    this.i18n.onChange(() => this.renderText());
    this.theme.onChange(() => this.renderText());
    window.addEventListener('resize', this.resize);

    this.resize();
    this.renderText();
  }

  get isComplete() {
    return this.state === 'hidden';
  }

  hideImmediately() {
    this.state = 'hidden';
    this.opacity = 0;
    this.shatterElapsed = 0;
    this.element.classList.add('is-hidden');
    this.onHidden?.();
  }

  update(deltaTime: number) {
    if (this.state === 'shattering') {
      this.shatterElapsed += deltaTime;
      this.opacity = clamp(1 - this.shatterElapsed / 1.35, 0, 1);

      this.fragments.forEach((fragment) => {
        fragment.centerX += fragment.velocityX * deltaTime;
        fragment.centerY += fragment.velocityY * deltaTime;
        fragment.velocityY += 320 * deltaTime;
        fragment.rotation += fragment.angularVelocity * deltaTime;
      });

      if (this.shatterElapsed > 1.4) {
        this.state = 'hidden';
        this.element.classList.add('is-hidden');
        this.onHidden?.();
      }
    }

    this.draw();
  }

  private onPointerDown = (event: PointerEvent) => {
    if (this.state !== 'idle') return;

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.addFractureCluster(x, y);
    this.clickCount += 1;
    this.progress.style.setProperty('--intro-progress', String(this.clickCount / this.clickThreshold));
    this.progress.textContent = `${this.clickCount}/${this.clickThreshold}`;

    if (this.clickCount >= this.clickThreshold) {
      this.startShatter();
    } else {
      this.draw();
    }
  };

  private addFractureCluster(originX: number, originY: number) {
    const pointsPerClick = 9;
    const seed = this.fractureIndex + 1;
    this.fractureIndex += 1;

    for (let index = 0; index < pointsPerClick; index += 1) {
      const angle = (index / pointsPerClick) * Math.PI * 2;
      const radius = 18 + ((seed * 37 + index * 17) % 44);
      const jitterX = Math.sin(seed + index * 0.7) * 18;
      const jitterY = Math.cos(seed * 1.3 + index * 0.5) * 18;

      this.sites.push({
        x: originX + Math.cos(angle) * radius + jitterX,
        y: originY + Math.sin(angle) * radius + jitterY,
        fractureId: seed
      });
    }

    this.cellCache = this.sites.map((site) => this.computeCell(site));
  }

  private computeCell(site: Site) {
    const points: Array<{ x: number; y: number }> = [];
    const maxRadius = 44;
    const sampleCount = 18;

    for (let sample = 0; sample < sampleCount; sample += 1) {
      const angle = (sample / sampleCount) * Math.PI * 2;
      let radius = maxRadius;

      for (const neighbor of this.sites) {
        if (neighbor === site) continue;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const nx = neighbor.x - site.x;
        const ny = neighbor.y - site.y;
        const denominator = 2 * (dx * nx + dy * ny);
        const distanceSq = nx * nx + ny * ny;

        if (denominator > 0.001) {
          radius = Math.min(radius, distanceSq / denominator);
        }
      }

      points.push({
        x: site.x + Math.cos(angle) * Math.max(8, radius),
        y: site.y + Math.sin(angle) * Math.max(8, radius)
      });
    }

    return points;
  }

  private startShatter() {
    if (this.state !== 'idle') return;
    this.state = 'shattering';
    this.shatterElapsed = 0;

    this.fragments = this.cellCache.map((points, index) => {
      const centerX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
      const centerY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
      const angle = Math.atan2(centerY - this.canvas.height / 2, centerX - this.canvas.width / 2);

      return {
        points,
        centerX,
        centerY,
        velocityX: Math.cos(angle) * (60 + index * 2.5),
        velocityY: Math.sin(angle) * (40 + index * 1.5) - 20,
        angularVelocity: (Math.random() - 0.5) * 4,
        rotation: 0
      };
    });

    this.onBroken?.();
  }

  private draw() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const { context } = this;

    context.clearRect(0, 0, width, height);
    context.save();
    context.globalAlpha = this.opacity;
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();
    context.fillRect(0, 0, width, height);

    if (this.state === 'shattering') {
      context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-fg').trim();
      context.lineWidth = 1.1;
      this.fragments.forEach((fragment) => {
        context.save();
        context.translate(fragment.centerX, fragment.centerY);
        context.rotate(fragment.rotation);
        context.beginPath();
        fragment.points.forEach((point, index) => {
          const px = point.x - fragment.centerX;
          const py = point.y - fragment.centerY;
          if (index === 0) context.moveTo(px, py);
          else context.lineTo(px, py);
        });
        context.closePath();
        context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();
        context.fill();
        context.stroke();
        context.restore();
      });
    } else {
      context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-fg').trim();
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.lineWidth = 1.2;

      this.cellCache.forEach((points) => {
        context.beginPath();
        points.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.closePath();
        context.stroke();
      });
    }

    context.restore();
  }

  private renderText() {
    this.content.querySelector<HTMLHeadingElement>('.intro-layer__title')!.textContent = this.i18n.t('introTitle');
    this.content.querySelector<HTMLParagraphElement>('.intro-layer__subtitle')!.textContent = this.i18n.t('introSubtitle');
    this.progress.textContent = `${this.clickCount}/${this.clickThreshold}`;
    this.progress.style.setProperty('--intro-progress', String(this.clickCount / this.clickThreshold));
    this.logo.src =
      this.theme.current === 'dark' ? '/assets/images/Logo/LogoApeProdLight.png' : '/assets/images/Logo/LogoApeProdDark.png';
  }

  private resize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.draw();
  };
}
