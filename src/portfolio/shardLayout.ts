import type { Vec3Like } from '../core/math';

export type ShardRole = 'presentation' | 'project' | 'hint';

const portfolioLayout: Vec3Like[] = [
  { x: 0, y: 0, z: 0 },
  { x: -2.7, y: 3.6, z: 1.7 },
  { x: -1.3, y: 1.75, z: 0.8 },
  { x: 2.7, y: 3.6, z: -1.7 },
  { x: 1.3, y: 1.75, z: -0.8 },
  { x: -2.7, y: -3.6, z: -1.7 },
  { x: -1.3, y: -1.75, z: -0.8 },
  { x: 2.7, y: -3.6, z: 1.7 },
  { x: 1.3, y: -1.75, z: 0.8 },
  { x: 0, y: -4.35, z: 0.15 }
];

const slotLayout: Vec3Like[] = [
  { x: 0, y: 0, z: 0 },
  { x: -4.8, y: 6.1, z: 3.4 },
  { x: -2.15, y: 2.95, z: 1.55 },
  { x: 4.8, y: 6.1, z: -3.4 },
  { x: 2.15, y: 2.95, z: -1.55 },
  { x: -4.8, y: -6.1, z: -3.4 },
  { x: -2.15, y: -2.95, z: -1.55 },
  { x: 4.8, y: -6.1, z: 3.4 },
  { x: 2.15, y: -2.95, z: 1.55 },
  { x: 0, y: -5.05, z: 0.2 }
];

export function getShardRole(order: number, total: number): ShardRole {
  if (order === 0) return 'presentation';
  if (order === total - 1) return 'hint';
  return 'project';
}

export function getPortfolioAnchor(order: number) {
  return portfolioLayout[order] || portfolioLayout[0];
}

export function getSlotAnchor(order: number) {
  return slotLayout[order] || slotLayout[0];
}
