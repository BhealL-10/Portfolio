import * as THREE from 'three';
import { getThemeNonShardHex } from '../core/themePalette';
import type { ThemeMode } from '../types/content';
import type { GameEnemyTier } from './gameSessionTypes';
import { SpriteSheetPlane } from './SpriteSheetPlane';

export type EnemyMarkerKind = 'basic' | 'enemyTop' | 'enemyBot';
export type EnemyMarkerAnimation = 'alive' | 'death' | 'sprint';

export interface EnemyMarker {
  id: string;
  position: THREE.Vector3;
  visible: boolean;
  tier: GameEnemyTier;
  pole: 'north' | 'south';
  mirrored: boolean;
  kind?: EnemyMarkerKind;
  animation?: EnemyMarkerAnimation;
  animationStartedAt?: number;
  animationDuration?: number;
  scale?: number;
  zOffset?: number;
  bodyOffsetY?: number;
  showBackArrow?: boolean;
  tint?: string | null;
}

const ENEMY_SPRITE_URL = new URL('../../assets/images/game/sprites/characters/enemies/basic-sheet.png', import.meta.url).href;
const ENEMY_TOP_SPRITE_URL = new URL('../../assets/images/game/sprites/characters/enemies/Spritsheetennemietop.png', import.meta.url).href;
const ENEMY_BOT_SPRITE_URL = new URL('../../assets/images/game/sprites/characters/enemies/Spritsheetennemiebot.png', import.meta.url).href;

function getEnemyTextureUrl(kind: EnemyMarkerKind) {
  switch (kind) {
    case 'enemyTop':
      return ENEMY_TOP_SPRITE_URL;
    case 'enemyBot':
      return ENEMY_BOT_SPRITE_URL;
    case 'basic':
    default:
      return ENEMY_SPRITE_URL;
  }
}

function getAliveAnimationFps(kind: EnemyMarkerKind, tier: GameEnemyTier) {
  if (kind === 'enemyTop') {
    return 4.6;
  }
  if (kind === 'enemyBot') {
    return 4.2;
  }
  return tier === 'invincible' ? 4.8 : tier === 'elite' ? 4.2 : 3.6;
}

export class EnemySystem {
  private readonly group = new THREE.Group();
  private readonly pool: Array<{
    activeId: string | null;
    group: THREE.Group;
    body: SpriteSheetPlane;
    backArrow: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>;
    deathStartedAt: number;
    dying: boolean;
    autoDeathOnHide: boolean;
    kind: EnemyMarkerKind;
  }> = [];
  private readonly assignedIds = new Set<string>();
  private theme: ThemeMode;

  constructor(scene: THREE.Scene, theme: ThemeMode) {
    this.theme = theme;
    SpriteSheetPlane.preload(ENEMY_SPRITE_URL, { columns: 4, rows: 2 });
    SpriteSheetPlane.preload(ENEMY_TOP_SPRITE_URL, { columns: 4, rows: 2 });
    SpriteSheetPlane.preload(ENEMY_BOT_SPRITE_URL, { columns: 4, rows: 2 });
    for (let index = 0; index < 64; index += 1) {
      const group = new THREE.Group();
      const body = new SpriteSheetPlane({
        textureUrl: ENEMY_SPRITE_URL,
        layout: { columns: 4, rows: 2 },
        width: 2.56,
        height: 2.56,
        alphaTest: 0.08,
        doubleSided: true,
        renderOrder: 32
      });
      body.mesh.material.depthTest = false;
      body.mesh.material.depthWrite = false;
      const backArrow = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.34, 3),
        new THREE.MeshBasicMaterial({ color: getThemeNonShardHex(theme), transparent: true, opacity: 0.95 })
      );
      backArrow.material.depthTest = false;
      backArrow.renderOrder = 33;
      backArrow.rotation.z = Math.PI;
      group.add(body.group, backArrow);
      group.visible = false;
      this.pool.push({
        activeId: null,
        group,
        body,
        backArrow,
        deathStartedAt: 0,
        dying: false,
        autoDeathOnHide: true,
        kind: 'basic'
      });
      this.group.add(group);
    }
    this.group.visible = false;
    scene.add(this.group);
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    this.pool.forEach((entry) => {
      entry.backArrow.material.color.set(getThemeNonShardHex(this.theme));
    });
  }

  setVisible(visible: boolean) {
    this.group.visible = visible;
  }

  reset() {
    this.pool.forEach((entry) => {
      entry.activeId = null;
      entry.dying = false;
      entry.autoDeathOnHide = true;
      entry.kind = 'basic';
      entry.group.visible = false;
    });
  }

  update(markers: EnemyMarker[], elapsedTime: number) {
    const activeIds = new Set(markers.filter((marker) => marker.visible).map((marker) => marker.id));
    const usedEntries = new Set<(typeof this.pool)[number]>();
    this.assignedIds.clear();

    this.pool.forEach((entry) => {
      if (entry.activeId && !activeIds.has(entry.activeId) && !entry.dying && entry.group.visible) {
        if (!entry.autoDeathOnHide) {
          entry.activeId = null;
          entry.group.visible = false;
          return;
        }
        entry.dying = true;
        entry.deathStartedAt = elapsedTime;
      }
    });

    markers.forEach((marker, markerIndex) => {
      if (!marker.visible) {
        return;
      }
      const entry =
        this.pool.find((candidate) => candidate.activeId === marker.id) ??
        this.pool.find((candidate) => !usedEntries.has(candidate) && !candidate.dying && !candidate.group.visible) ??
        this.pool.find((candidate) => !usedEntries.has(candidate) && !candidate.dying && candidate.activeId === null) ??
        this.pool.find((candidate) => !usedEntries.has(candidate) && !candidate.dying) ??
        this.pool[markerIndex % this.pool.length];

      if (!entry) {
        return;
      }

      usedEntries.add(entry);
      this.assignedIds.add(marker.id);
      entry.activeId = marker.id;
      entry.dying = false;
      entry.kind = marker.kind ?? 'basic';
      entry.autoDeathOnHide = entry.kind === 'basic';
      entry.group.visible = true;
      entry.body.setTexture(getEnemyTextureUrl(entry.kind));
      entry.body.mesh.material.opacity = 1;
      entry.body.mesh.material.color.set(marker.tint ?? (marker.tier === 'invincible' ? '#F06A5A' : '#FFFFFF'));
      this.syncMarkerAnimation(entry.body, marker, elapsedTime, markerIndex);
      entry.backArrow.material.color.set(getThemeNonShardHex(this.theme));
      entry.backArrow.visible = marker.showBackArrow ?? entry.kind === 'basic';
      entry.backArrow.material.opacity = entry.backArrow.visible ? 0.95 : 0;
      entry.group.position.copy(marker.position);
      entry.group.position.z += marker.zOffset ?? 0.88;
      entry.group.rotation.set(0, 0, 0);
      const scale =
        marker.scale ??
        (marker.tier === 'elite' ? 0.85 : marker.tier === 'armored' ? 0.74 : marker.tier === 'invincible' ? 0.91 : 0.67);
      entry.group.scale.setScalar(scale);
      entry.body.group.scale.set(marker.mirrored ? -1 : 1, entry.kind === 'basic' && marker.pole === 'south' ? -1 : 1, 1);
      entry.body.group.position.set(0, marker.bodyOffsetY ?? (entry.kind === 'basic' ? (marker.pole === 'north' ? 0.46 : -0.46) : 0), 0);
      entry.backArrow.position.set(0, marker.pole === 'north' ? -1.34 : 1.34, 0.02);
      entry.backArrow.rotation.z = marker.pole === 'north' ? Math.PI : 0;
    });

    this.pool.forEach((entry) => {
      if (entry.activeId && this.assignedIds.has(entry.activeId)) {
        return;
      }
      if (!entry.activeId && !entry.dying) {
        entry.group.visible = false;
        return;
      }
      if (!entry.dying) {
        entry.group.visible = false;
        entry.activeId = null;
        return;
      }
      if (entry.dying) {
        const deathElapsed = elapsedTime - entry.deathStartedAt;
        if (deathElapsed >= 0.72) {
          entry.group.visible = false;
          entry.activeId = null;
          entry.dying = false;
          entry.kind = 'basic';
          entry.autoDeathOnHide = true;
          return;
        }
        entry.group.visible = true;
        entry.body.playLoop([4, 5, 6, 7], 4.4, deathElapsed);
        const fade = Math.max(0, 1 - deathElapsed / 0.72);
        entry.body.mesh.material.opacity = fade;
        entry.backArrow.material.opacity = fade;
      }
    });
  }

  private syncMarkerAnimation(
    body: SpriteSheetPlane,
    marker: EnemyMarker,
    elapsedTime: number,
    markerIndex: number
  ) {
    const kind = marker.kind ?? 'basic';
    const animation = marker.animation ?? 'alive';
    if (animation === 'death') {
      const startedAt = marker.animationStartedAt ?? elapsedTime;
      const duration = Math.max(0.001, marker.animationDuration ?? 0.72);
      const progress = THREE.MathUtils.clamp((elapsedTime - startedAt) / duration, 0, 0.999);
      const frames = [4, 5, 6, 7];
      const frameIndex = Math.min(frames.length - 1, Math.floor(progress * frames.length));
      body.setFrame(frames[frameIndex] ?? 4);
      return;
    }
    if (animation === 'sprint') {
      body.playLoop([4, 5, 6, 7], 5.2, elapsedTime + markerIndex * 0.05);
      return;
    }
    body.playLoop([0, 1, 2, 3], getAliveAnimationFps(kind, marker.tier), elapsedTime + markerIndex * 0.05);
  }
}
