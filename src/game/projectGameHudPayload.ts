import type { GameHudSnapshot } from './gameSessionTypes';
import { projectWorldHudAnchor, type ScreenProjection } from './worldHudProjection';

export function projectGameHudPayload(
  hudState: GameHudSnapshot,
  projectWorldToScreen: (worldPosition: THREE.Vector3) => ScreenProjection
) {
  return {
    playerMotionState: hudState.playerMotionState,
    score: hudState.score,
    scoreFeed: hudState.scoreFeed,
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
      const projected = projectWorldHudAnchor(hint.worldPosition, projectWorldToScreen);
      if (projected) {
        acc.push({
          slot: hint.slot,
          offer: hint.offer,
          screenX: projected.screenX,
          screenY: projected.screenY,
          mode: hint.mode,
          price: hint.price
        });
      }
      return acc;
    }, []),
    shopCenter: hudState.shopCenter
      ? (() => {
          return projectWorldHudAnchor(hudState.shopCenter, projectWorldToScreen);
        })()
      : null,
    inventoryItems: hudState.inventoryItems,
    runSummary: hudState.runSummary,
    landingFeedback: hudState.landingFeedback
      ? (() => {
          const projected = projectWorldHudAnchor(hudState.landingFeedback.worldPosition, projectWorldToScreen, { paddingX: 18, paddingY: 18 });
          if (!projected) {
            return null;
          }
          return {
            serial: hudState.landingFeedback.serial,
            grade: hudState.landingFeedback.grade,
            twist: hudState.landingFeedback.twist,
            progress: hudState.landingFeedback.progress,
            screenX: projected.screenX,
            screenY: projected.screenY
          };
        })()
      : null,
    acquisition: hudState.acquisition,
    achievementToasts: hudState.achievementToasts,
    achievements: hudState.achievements,
    gameOverCause: hudState.gameOverCause
  } as const;
}
