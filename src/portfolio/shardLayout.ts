import type { Vec3Like } from '../core/math';

export type ShardRole = 'presentation' | 'project' | 'hint';

const portfolioLayout: Vec3Like[] = [
  { x: 0, y: 0, z: 0 },
  { x: -4.8, y: 6.4, z: -0.9 },
  { x: -2.4, y: 3.2, z: -0.45 },
  { x: 4.8, y: 6.4, z: 0.9 },
  { x: 2.4, y: 3.2, z: 0.45 },
  { x: -4.8, y: -6.4, z: -0.9 },
  { x: -2.4, y: -3.2, z: -0.45 },
  { x: 4.8, y: -6.4, z: 0.9 },
  { x: 2.4, y: -3.2, z: 0.45 },
  { x: 0, y: -9.6, z: 0 }
];

const slotLayout: Vec3Like[] = [
  { x: 0, y: 0, z: 0 },
  { x: -8.2, y: 10.8, z: -0.7 },
  { x: -4.1, y: 5.4, z: -0.35 },
  { x: 8.2, y: 10.8, z: 0.7 },
  { x: 4.1, y: 5.4, z: 0.35 },
  { x: -8.2, y: -10.8, z: -0.7 },
  { x: -4.1, y: -5.4, z: -0.35 },
  { x: 8.2, y: -10.8, z: 0.7 },
  { x: 4.1, y: -5.4, z: 0.35 },
  { x: 0, y: -15.6, z: 0 }
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
