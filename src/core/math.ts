export interface Vec3Like {
  x: number;
  y: number;
  z: number;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function damp(current: number, target: number, smoothing: number, deltaTime: number) {
  return current + (target - current) * (1 - Math.exp(-smoothing * deltaTime));
}

export function distance3(a: Vec3Like, b: Vec3Like) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function wrapIndex(value: number, length: number) {
  return ((value % length) + length) % length;
}
