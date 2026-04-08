import { clamp } from '../core/math';

export interface VoronoiPoint {
  x: number;
  y: number;
}

export interface VoronoiRevealCell {
  id: number;
  points: VoronoiPoint[];
  centerX: number;
  centerY: number;
  radius: number;
  reveal: number;
}

export interface PlacementGuideBounds {
  viewWidth: number;
  viewHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

interface InternalVoronoiRevealCell extends VoronoiRevealCell {
  targetReveal: number;
  noise: number;
}

interface RevealPulse {
  x: number;
  y: number;
  radiusPx: number;
  strength: number;
  elapsed: number;
  durationSeconds: number;
}

interface Site {
  x: number;
  y: number;
}

const TARGET_CELL_AREA_PX = 45000;
const MIN_CELL_COUNT = 170;
const MAX_CELL_COUNT = 220;
const REVEAL_FADE_IN_SECONDS = 2;
const REVEAL_FADE_OUT_SECONDS = 4;

function hashNoise(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return value - Math.floor(value);
}

function smoothstep(value: number) {
  const clamped = clamp(value, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function easeOutCubic(value: number) {
  const clamped = clamp(value, 0, 1);
  return 1 - (1 - clamped) ** 3;
}

function moveToward(current: number, target: number, maxDelta: number) {
  if (Math.abs(target - current) <= maxDelta) {
    return target;
  }
  return current + Math.sign(target - current) * maxDelta;
}

function polygonCentroid(points: VoronoiPoint[]) {
  if (points.length < 3) {
    const centerX = points.reduce((sum, point) => sum + point.x, 0) / Math.max(1, points.length);
    const centerY = points.reduce((sum, point) => sum + point.y, 0) / Math.max(1, points.length);
    return { centerX, centerY };
  }

  let signedArea = 0;
  let centerX = 0;
  let centerY = 0;

  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    const cross = current.x * next.y - next.x * current.y;
    signedArea += cross;
    centerX += (current.x + next.x) * cross;
    centerY += (current.y + next.y) * cross;
  }

  if (Math.abs(signedArea) < 0.0001) {
    const fallbackX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
    const fallbackY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
    return { centerX: fallbackX, centerY: fallbackY };
  }

  const areaFactor = signedArea * 3;
  return {
    centerX: centerX / areaFactor,
    centerY: centerY / areaFactor
  };
}

function clipPolygonAgainstBisector(polygon: VoronoiPoint[], site: Site, other: Site) {
  const clipped: VoronoiPoint[] = [];
  const epsilon = 0.0001;
  const evaluate = (point: VoronoiPoint) => {
    const dxSite = point.x - site.x;
    const dySite = point.y - site.y;
    const dxOther = point.x - other.x;
    const dyOther = point.y - other.y;
    return dxSite * dxSite + dySite * dySite - (dxOther * dxOther + dyOther * dyOther);
  };

  for (let index = 0; index < polygon.length; index += 1) {
    const current = polygon[index];
    const next = polygon[(index + 1) % polygon.length];
    const currentValue = evaluate(current);
    const nextValue = evaluate(next);
    const currentInside = currentValue <= epsilon;
    const nextInside = nextValue <= epsilon;

    if (currentInside && nextInside) {
      clipped.push({ x: next.x, y: next.y });
      continue;
    }

    if (currentInside !== nextInside) {
      const denominator = currentValue - nextValue;
      const t = Math.abs(denominator) < epsilon ? 0 : currentValue / denominator;
      clipped.push({
        x: current.x + (next.x - current.x) * t,
        y: current.y + (next.y - current.y) * t
      });
    }

    if (!currentInside && nextInside) {
      clipped.push({ x: next.x, y: next.y });
    }
  }

  return clipped;
}

function buildJitteredSites(viewportWidth: number, viewportHeight: number) {
  const desiredCount = clamp(Math.round((viewportWidth * viewportHeight) / TARGET_CELL_AREA_PX), MIN_CELL_COUNT, MAX_CELL_COUNT);
  const aspect = viewportWidth / Math.max(1, viewportHeight);
  const columns = Math.max(4, Math.round(Math.sqrt(desiredCount * aspect)));
  const rows = Math.max(4, Math.ceil(desiredCount / columns));
  const cellWidth = viewportWidth / columns;
  const cellHeight = viewportHeight / rows;
  const sites: Site[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const seed = row * columns + column + 1 + Math.round(viewportWidth * 0.37) + Math.round(viewportHeight * 0.61);
      const jitterX = (hashNoise(seed) - 0.5) * cellWidth * 0.72;
      const jitterY = (hashNoise(seed * 1.93) - 0.5) * cellHeight * 0.72;
      const x = clamp((column + 0.5) * cellWidth + jitterX, 0, viewportWidth);
      const y = clamp((row + 0.5) * cellHeight + jitterY, 0, viewportHeight);
      sites.push({ x, y });
    }
  }

  return sites;
}

export function buildVoronoiRevealCells(viewportWidth: number, viewportHeight: number) {
  const width = Math.max(1, Math.round(viewportWidth));
  const height = Math.max(1, Math.round(viewportHeight));
  const sites = buildJitteredSites(width, height);

  return sites.map((site, index) => {
    let polygon: VoronoiPoint[] = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height }
    ];

    sites.forEach((other, otherIndex) => {
      if (otherIndex === index || polygon.length === 0) {
        return;
      }
      polygon = clipPolygonAgainstBisector(polygon, site, other);
    });

    const { centerX, centerY } = polygonCentroid(polygon);
    const radius = polygon.reduce((maxRadius, point) => {
      const distance = Math.hypot(point.x - centerX, point.y - centerY);
      return Math.max(maxRadius, distance);
    }, 1);

    return {
      id: index,
      points: polygon,
      centerX,
      centerY,
      radius,
      reveal: 0
    } satisfies VoronoiRevealCell;
  });
}

function parseViewBox(svgText: string) {
  const match = svgText.match(/viewBox="([^"]+)"/i);
  if (!match) {
    throw new Error('Placement guide is missing a viewBox.');
  }
  const values = match[1]
    .trim()
    .split(/[ ,]+/)
    .map((value) => Number(value));

  if (values.length !== 4 || values.some((value) => Number.isNaN(value))) {
    throw new Error('Placement guide has an invalid viewBox.');
  }

  return {
    viewWidth: values[2],
    viewHeight: values[3]
  };
}

function parseUseTag(svgText: string) {
  const match = svgText.match(/<use\b[^>]*>/i);
  if (!match) {
    throw new Error('Placement guide is missing a <use> tag.');
  }
  return match[0];
}

function parseNumericAttribute(tag: string, attribute: string) {
  const match = tag.match(new RegExp(`${attribute}="([^"]+)"`, 'i'));
  if (!match) {
    throw new Error(`Placement guide is missing ${attribute}.`);
  }
  const value = Number(match[1].replace(/px$/i, ''));
  if (Number.isNaN(value)) {
    throw new Error(`Placement guide has an invalid ${attribute}.`);
  }
  return value;
}

export function parsePlacementGuideSvg(svgText: string): PlacementGuideBounds {
  const { viewWidth, viewHeight } = parseViewBox(svgText);
  const useTag = parseUseTag(svgText);
  const x = parseNumericAttribute(useTag, 'x');
  const y = parseNumericAttribute(useTag, 'y');
  const width = parseNumericAttribute(useTag, 'width');
  const height = parseNumericAttribute(useTag, 'height');

  return {
    viewWidth,
    viewHeight,
    x,
    y,
    width,
    height,
    centerX: x + width / 2,
    centerY: y + height / 2
  };
}

export class VoronoiRevealField {
  private cells: InternalVoronoiRevealCell[] = [];
  private pulses: RevealPulse[] = [];
  private pointerX = 0;
  private pointerY = 0;
  private pointerActive = false;
  private enabled = true;
  private viewportWidth = 1;
  private viewportHeight = 1;

  constructor(viewportWidth: number, viewportHeight: number) {
    this.resize(viewportWidth, viewportHeight);
  }

  getCells() {
    return this.cells as readonly VoronoiRevealCell[];
  }

  resize(viewportWidth: number, viewportHeight: number) {
    this.viewportWidth = Math.max(1, Math.round(viewportWidth));
    this.viewportHeight = Math.max(1, Math.round(viewportHeight));

    this.cells = buildVoronoiRevealCells(this.viewportWidth, this.viewportHeight).map((cell) => ({
      ...cell,
      targetReveal: 0,
      noise: hashNoise((cell.id + 1) * 2.17)
    }));
    this.pulses = [];
  }

  setEnabled(enabled: boolean) {
    if (this.enabled === enabled) {
      return;
    }
    this.enabled = enabled;
    this.pointerActive = false;
    this.pulses = [];
    this.cells.forEach((cell) => {
      cell.reveal = 0;
      cell.targetReveal = 0;
    });
  }

  setPointer(x: number, y: number) {
    this.pointerX = x;
    this.pointerY = y;
    this.pointerActive = true;
  }

  clearPointer() {
    this.pointerActive = false;
  }

  pulseAt(
    x: number,
    y: number,
    options: {
      radiusPx?: number;
      strength?: number;
      durationSeconds?: number;
    } = {}
  ) {
    this.pulses.push({
      x,
      y,
      radiusPx: options.radiusPx ?? Math.max(220, Math.min(this.viewportWidth, this.viewportHeight) * 0.22),
      strength: options.strength ?? 1,
      elapsed: 0,
      durationSeconds: options.durationSeconds ?? 2.2
    });
  }

  collectCellsNear(x: number, y: number, radiusPx: number, maxCount = 10) {
    const sorted = [...this.cells]
      .map((cell) => ({
        cell,
        distance: Math.hypot(cell.centerX - x, cell.centerY - y)
      }))
      .sort((left, right) => left.distance - right.distance);

    const nearby = sorted.filter((entry) => entry.distance <= radiusPx).slice(0, maxCount);
    if (nearby.length > 0) {
      return nearby.map((entry) => entry.cell);
    }

    return sorted.slice(0, Math.max(1, Math.min(4, maxCount))).map((entry) => entry.cell);
  }

  update(deltaTime: number) {
    if (!this.enabled) {
      return;
    }

    this.pulses = this.pulses
      .map((pulse) => ({
        ...pulse,
        elapsed: pulse.elapsed + deltaTime
      }))
      .filter((pulse) => pulse.elapsed < pulse.durationSeconds);

    const diagonal = Math.hypot(this.viewportWidth, this.viewportHeight);
    const pointerInnerRadius = clamp(diagonal * 0.035, 72, 132);
    const pointerOuterRadius = clamp(diagonal * 0.13, 220, 360);

    this.cells.forEach((cell) => {
      let targetReveal = 0;

      if (this.pointerActive) {
        const pointerDistance = Math.max(
          0,
          Math.hypot(cell.centerX - this.pointerX, cell.centerY - this.pointerY) - cell.radius * 0.32
        );
        const pointerInfluence = smoothstep((pointerOuterRadius - pointerDistance) / Math.max(1, pointerOuterRadius - pointerInnerRadius));
        targetReveal = Math.max(targetReveal, pointerInfluence * (0.72 + cell.noise * 0.18));
      }

      this.pulses.forEach((pulse) => {
        const distance = Math.max(0, Math.hypot(cell.centerX - pulse.x, cell.centerY - pulse.y) - cell.radius * 0.28);
        const pulseInfluence = smoothstep((pulse.radiusPx - distance) / Math.max(1, pulse.radiusPx));
        const decay = easeOutCubic(1 - pulse.elapsed / pulse.durationSeconds);
        targetReveal = Math.max(targetReveal, pulseInfluence * pulse.strength * decay);
      });

      cell.targetReveal = clamp(targetReveal, 0, 1);
      const delta = cell.targetReveal > cell.reveal ? deltaTime / REVEAL_FADE_IN_SECONDS : deltaTime / REVEAL_FADE_OUT_SECONDS;
      cell.reveal = moveToward(cell.reveal, cell.targetReveal, delta);
    });
  }
}
