import * as THREE from 'three';
import type { GameHudSnapshot } from './gameSessionTypes';

interface ScreenProjection {
  visible: boolean;
  x: number;
  y: number;
}

export function projectGameHudPayload(
  hudState: GameHudSnapshot,
  projectWorldToScreen: (worldPosition: THREE.Vector3) => ScreenProjection
) {
  return {
    playerMotionState: hudState.playerMotionState,
    score: hudState.score,
    highscore: hudState.highscore,
    distanceMeters: hudState.distanceMeters,
    bestDistanceMeters: hudState.bestDistanceMeters,
    coins: hudState.coins,
    splitTimes: hudState.splitTimes,
    chargeRatio: hudState.chargeRatio,
    momentumGauge: hudState.momentumGauge,
    momentumTier: hudState.momentumTier,
    orbitGraceActive: hudState.orbitGraceActive,
    orbitGraceProgress: hudState.orbitGraceProgress,
    mobile: hudState.mobile,
    state: hudState.state,
    offers: hudState.offers,
    branchHints: hudState.branchHints.reduce<Array<{
      slot: 0 | 1 | 2;
      offer: typeof hudState.branchHints[number]['offer'];
      screenX: number;
      screenY: number;
      mode?: typeof hudState.branchHints[number]['mode'];
      price?: number;
    }>>((acc, hint) => {
      const projected = projectWorldToScreen(hint.worldPosition);
      if (projected.visible) {
        acc.push({
          slot: hint.slot,
          offer: hint.offer,
          screenX: projected.x,
          screenY: projected.y,
          mode: hint.mode,
          price: hint.price
        });
      }
      return acc;
    }, []),
    shopCenter: hudState.shopCenter
      ? (() => {
          const projected = projectWorldToScreen(hudState.shopCenter);
          if (!projected.visible) {
            return null;
          }
          return {
            screenX: projected.x,
            screenY: projected.y
          };
        })()
      : null,
    inventoryItems: hudState.inventoryItems,
    runSummary: hudState.runSummary,
    landingFeedback: hudState.landingFeedback
      ? (() => {
          const projected = projectWorldToScreen(hudState.landingFeedback.worldPosition);
          if (!projected.visible) {
            return null;
          }
          return {
            grade: hudState.landingFeedback.grade,
            twist: hudState.landingFeedback.twist,
            progress: hudState.landingFeedback.progress,
            screenX: THREE.MathUtils.clamp(projected.x, 18, window.innerWidth - 18),
            screenY: THREE.MathUtils.clamp(projected.y, 18, window.innerHeight - 18)
          };
        })()
      : null,
    acquisition: hudState.acquisition,
    gameOverCause: hudState.gameOverCause
  } as const;
}
