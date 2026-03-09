import type { Vec3Like } from '../core/math';

export type ShardRole = 'presentation' | 'project' | 'hint';

const portfolioLayout: Vec3Like[] = [
  { x: 0, y: 0, z: 0 },
  { x: -3.05, y: 3.95, z: -0.55 },
  { x: -1.52, y: 1.98, z: -0.28 },
  { x: 3.05, y: 3.95, z: 0.55 },
  { x: 1.52, y: 1.98, z: 0.28 },
  { x: -3.05, y: -3.95, z: -0.55 },
  { x: -1.52, y: -1.98, z: -0.28 },
  { x: 3.05, y: -3.95, z: 0.55 },
  { x: 1.52, y: -1.98, z: 0.28 },
  { x: 0, y: -4.7, z: 0 }
];

const slotLayout: Vec3Like[] = [
  { x: 0, y: 0, z: 0 },
  { x: -5.3, y: 6.9, z: -0.46 },
  { x: -2.65, y: 3.45, z: -0.22 },
  { x: 5.3, y: 6.9, z: 0.46 },
  { x: 2.65, y: 3.45, z: 0.22 },
  { x: -5.3, y: -6.9, z: -0.46 },
  { x: -2.65, y: -3.45, z: -0.22 },
  { x: 5.3, y: -6.9, z: 0.46 },
  { x: 2.65, y: -3.45, z: 0.22 },
  { x: 0, y: -6.1, z: 0 }
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
