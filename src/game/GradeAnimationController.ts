export interface GradeAnimationSnapshot {
  frameIndex: 0 | 1 | 2 | 3;
  opacity: number;
}

const RAPID_PHASE_END = 0.162;
const HOLD_PHASE_END = 0.858;

export class GradeAnimationController {
  resolve(progress: number): GradeAnimationSnapshot {
    const normalized = Math.max(0, Math.min(1, progress));
    const frameIndex =
      normalized >= RAPID_PHASE_END
        ? 3
        : (Math.min(3, Math.floor((normalized / RAPID_PHASE_END) * 4)) as 0 | 1 | 2 | 3);
    const fadeRatio =
      normalized <= HOLD_PHASE_END ? 1 : 1 - Math.min(1, (normalized - HOLD_PHASE_END) / (1 - HOLD_PHASE_END));

    return {
      frameIndex,
      opacity: fadeRatio
    };
  }
}
