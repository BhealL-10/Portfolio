import { describe, expect, it } from 'vitest';
import { buildVoronoiRevealCells, parsePlacementGuideSvg, type VoronoiPoint } from './VoronoiRevealField';

function pointOnSegment(point: VoronoiPoint, a: VoronoiPoint, b: VoronoiPoint) {
  const cross = Math.abs((point.y - a.y) * (b.x - a.x) - (point.x - a.x) * (b.y - a.y));
  if (cross > 0.001) {
    return false;
  }
  const dot = (point.x - a.x) * (b.x - a.x) + (point.y - a.y) * (b.y - a.y);
  if (dot < -0.001) {
    return false;
  }
  const lengthSq = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  return dot <= lengthSq + 0.001;
}

function pointInPolygon(point: VoronoiPoint, polygon: VoronoiPoint[]) {
  let inside = false;

  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const current = polygon[index];
    const earlier = polygon[previous];

    if (pointOnSegment(point, earlier, current)) {
      return true;
    }

    const intersects =
      current.y > point.y !== earlier.y > point.y &&
      point.x < ((earlier.x - current.x) * (point.y - current.y)) / (earlier.y - current.y) + current.x;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

describe('VoronoiRevealField utilities', () => {
  it('parses placement guides from the helper SVG use tag', () => {
    const bounds = parsePlacementGuideSvg(`
      <svg viewBox="0 0 2048 1024">
        <g>
          <use xlink:href="#_Image2" x="409.942" y="227.59" width="67px" height="67px"/>
        </g>
      </svg>
    `);

    expect(bounds.viewWidth).toBe(2048);
    expect(bounds.viewHeight).toBe(1024);
    expect(bounds.x).toBeCloseTo(409.942, 3);
    expect(bounds.y).toBeCloseTo(227.59, 3);
    expect(bounds.centerX).toBeCloseTo(443.442, 3);
    expect(bounds.centerY).toBeCloseTo(261.09, 3);
  });

  it('builds fullscreen cells that cover representative viewport samples', () => {
    const width = 1280;
    const height = 720;
    const cells = buildVoronoiRevealCells(width, height);

    expect(cells.length).toBeGreaterThan(20);
    cells.forEach((cell) => {
      expect(cell.points.length).toBeGreaterThan(2);
      expect(cell.centerX).toBeGreaterThanOrEqual(0);
      expect(cell.centerX).toBeLessThanOrEqual(width);
      expect(cell.centerY).toBeGreaterThanOrEqual(0);
      expect(cell.centerY).toBeLessThanOrEqual(height);
    });

    const samplePoints = [
      { x: width * 0.08, y: height * 0.08 },
      { x: width * 0.3, y: height * 0.16 },
      { x: width * 0.55, y: height * 0.28 },
      { x: width * 0.82, y: height * 0.18 },
      { x: width * 0.14, y: height * 0.54 },
      { x: width * 0.46, y: height * 0.56 },
      { x: width * 0.74, y: height * 0.62 },
      { x: width * 0.92, y: height * 0.78 }
    ];

    samplePoints.forEach((point) => {
      expect(cells.some((cell) => pointInPolygon(point, cell.points))).toBe(true);
    });
  });
});
