export interface RewardBranchLabelLayoutInput {
  screenX: number;
  screenY: number;
  slot: 0 | 1 | 2;
  mode?: 'reward_branch' | 'shop_orbit';
}

export interface RewardBranchLabelLayout {
  left: number;
  top: number;
  width: number;
  compact: boolean;
}

export class RewardBranchLabelLayoutResolver {
  resolve(input: RewardBranchLabelLayoutInput): RewardBranchLabelLayout {
    const compact = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 760;
    const sidePadding = compact ? 12 : 24;
    const topPadding = compact ? 14 : 26;
    const bottomPadding = compact ? 18 : 30;
    const width = Math.round(
      Math.max(160, Math.min(compact ? 196 : 248, window.innerWidth - sidePadding * 2))
    );
    const verticalOffset = compact
      ? input.mode === 'shop_orbit'
        ? 58
        : 68
      : input.mode === 'shop_orbit'
        ? 76
        : 88;
    const left = Math.round(
      Math.max(
        sidePadding + width * 0.5,
        Math.min(window.innerWidth - sidePadding - width * 0.5, input.screenX)
      )
    );
    const top = Math.round(
      Math.max(
        topPadding + 34,
        Math.min(window.innerHeight - bottomPadding - 52, input.screenY - verticalOffset)
      )
    );

    return {
      left,
      top,
      width,
      compact
    };
  }
}
