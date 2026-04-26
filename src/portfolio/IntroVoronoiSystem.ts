import { clamp } from '../core/math';
import { I18nService } from '../ui/I18nService';
import { ThemeService } from '../ui/ThemeService';
import type { VoronoiRevealSystem } from './VoronoiRevealSystem';

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
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly content: HTMLDivElement;
  private readonly titleElement: HTMLHeadingElement;
  private readonly fracturedCellIds = new Set<number>();
  private fragments: Fragment[] = [];
  private clickCount = 0;
  private readonly clickThreshold = 8;
  private state: 'idle' | 'shattering' | 'hidden' = 'idle';
  private opacity = 1;
  private shatterElapsed = 0;
  onBroken: (() => void) | null = null;
  onHidden: (() => void) | null = null;

  constructor(
    host: HTMLElement,
    private readonly i18n: I18nService,
    private readonly theme: ThemeService,
    private readonly revealSystem: VoronoiRevealSystem
  ) {
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
      <div class="intro-layer__title-wrap">
        <h1 class="intro-layer__title"></h1>
      </div>
    `;

    this.titleElement = this.content.querySelector<HTMLHeadingElement>('.intro-layer__title')!;

    this.element.append(this.canvas, this.content);
    host.appendChild(this.element);

    this.element.addEventListener('pointerdown', this.onPointerDown);
    this.element.addEventListener('pointermove', this.onPointerMove);
    this.element.addEventListener('pointerleave', this.onPointerLeave);
    this.i18n.onChange(() => {
      this.renderText();
      this.draw();
    });
    this.theme.onChange(() => {
      this.renderText();
      this.draw();
    });
    window.addEventListener('resize', this.resize);

    this.resize();
    this.renderText();
  }

  get isComplete() {
    return this.state === 'hidden';
  }

  get clickCountValue() {
    return this.clickCount;
  }

  get clickThresholdValue() {
    return this.clickThreshold;
  }

  get clickProgressRatio() {
    return clamp(this.clickCount / this.clickThreshold, 0, 1);
  }

  hideImmediately() {
    this.state = 'hidden';
    this.opacity = 0;
    this.shatterElapsed = 0;
    this.element.classList.add('is-hidden');
    this.onHidden?.();
  }

  update(deltaTime: number) {
    if (this.state === 'hidden') {
      return;
    }

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
        return;
      }
    }

    this.draw();
  }

  private onPointerDown = (event: PointerEvent) => {
    if (this.state !== 'idle') {
      return;
    }

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.revealSystem.pulseAt(x, y, {
      radiusPx: Math.max(220, Math.min(this.canvas.width, this.canvas.height) * 0.24),
      strength: 1.2,
      durationSeconds: 2.3
    });
    this.revealSystem
      .collectCellsNear(x, y, Math.max(180, Math.min(this.canvas.width, this.canvas.height) * 0.18), 8)
      .forEach((cell) => this.fracturedCellIds.add(cell.id));

    this.clickCount += 1;

    if (this.clickCount >= this.clickThreshold) {
      this.startShatter();
    } else {
      this.draw();
    }
  };

  private startShatter() {
    if (this.state !== 'idle') {
      return;
    }

    const viewportCells = this.revealSystem
      .getCells()
      .filter((cell) => cell.reveal > 0.08 || this.fracturedCellIds.has(cell.id));
    const sourceCells =
      viewportCells.length > 0
        ? viewportCells
        : this.revealSystem.collectCellsNear(this.canvas.width * 0.5, this.canvas.height * 0.5, Math.max(this.canvas.width, this.canvas.height), 18);

    this.revealSystem.pulseAt(this.canvas.width * 0.5, this.canvas.height * 0.5, {
      radiusPx: Math.hypot(this.canvas.width, this.canvas.height) * 0.76,
      strength: 1.15,
      durationSeconds: 1.8
    });

    this.state = 'shattering';
    this.shatterElapsed = 0;
    this.fragments = sourceCells.map((cell, index) => {
      const angle = Math.atan2(cell.centerY - this.canvas.height / 2, cell.centerX - this.canvas.width / 2);

      return {
        points: cell.points.map((point) => ({ x: point.x, y: point.y })),
        centerX: cell.centerX,
        centerY: cell.centerY,
        velocityX: Math.cos(angle) * (60 + index * 2.4),
        velocityY: Math.sin(angle) * (40 + index * 1.5) - 22,
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
    const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();
    const foregroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-fg').trim();

    context.clearRect(0, 0, width, height);

    if (this.state === 'shattering') {
      context.save();
      context.globalAlpha = this.opacity;
      context.strokeStyle = foregroundColor;
      context.lineWidth = 1.1;

      this.fragments.forEach((fragment) => {
        context.save();
        context.translate(fragment.centerX, fragment.centerY);
        context.rotate(fragment.rotation);
        context.beginPath();
        fragment.points.forEach((point, index) => {
          const px = point.x - fragment.centerX;
          const py = point.y - fragment.centerY;
          if (index === 0) {
            context.moveTo(px, py);
          } else {
            context.lineTo(px, py);
          }
        });
        context.closePath();
        context.fillStyle = backgroundColor;
        context.fill();
        context.stroke();
        context.restore();
      });

      context.restore();
      return;
    }

    context.save();
    context.globalAlpha = this.opacity;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);

    context.save();
    context.globalCompositeOperation = 'destination-out';
    this.revealSystem.getCells().forEach((cell) => {
      if (cell.reveal <= 0.001 || cell.points.length < 3) {
        return;
      }

      context.beginPath();
      cell.points.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.closePath();
      context.fillStyle = `rgba(0, 0, 0, ${clamp(cell.reveal * 0.94, 0, 0.94)})`;
      context.shadowBlur = 18;
      context.shadowColor = `rgba(0, 0, 0, ${clamp(cell.reveal * 0.55, 0, 0.55)})`;
      context.fill();
    });
    context.restore();

    context.strokeStyle = foregroundColor;
    this.revealSystem.getCells().forEach((cell) => {
      const fractured = this.fracturedCellIds.has(cell.id);
      const revealAlpha = fractured ? Math.max(cell.reveal, 0.5) : cell.reveal * 0.28;
      if (revealAlpha <= 0.01 || cell.points.length < 3) {
        return;
      }

      context.beginPath();
      cell.points.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.closePath();
      context.globalAlpha = clamp(revealAlpha, 0, 1);
      context.lineWidth = fractured ? 1.3 : 0.9;
      context.stroke();
    });

    context.restore();
  }

  private renderText() {
    const title = 'Portfolio';
    this.titleElement.textContent = title;
    this.titleElement.dataset.text = title;
    this.syncPointerGlow(window.innerWidth * 0.5, window.innerHeight * 0.82);
  }

  private resize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.draw();
  };

  private onPointerMove = (event: PointerEvent) => {
    this.syncPointerGlow(event.clientX, event.clientY);
  };

  private onPointerLeave = () => {
    this.syncPointerGlow(window.innerWidth * 0.5, window.innerHeight * 0.82);
  };

  private syncPointerGlow(clientX: number, clientY: number) {
    const x = clamp(clientX / Math.max(1, window.innerWidth), 0, 1);
    const y = clamp(clientY / Math.max(1, window.innerHeight), 0, 1);
    this.content.style.setProperty('--intro-pointer-x', `${(x * 100).toFixed(2)}%`);
    this.content.style.setProperty('--intro-pointer-y', `${(y * 100).toFixed(2)}%`);
    const offsetX = ((x - 0.5) * 24).toFixed(2);
    const offsetY = ((y - 0.72) * 16).toFixed(2);
    this.content.style.setProperty('--intro-pointer-offset-x', `${offsetX}px`);
    this.content.style.setProperty('--intro-pointer-offset-y', `${offsetY}px`);
  }
}
