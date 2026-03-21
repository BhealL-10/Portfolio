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
    const width = Math.round(Math.max(156, Math.min(compact ? 212 : 248, window.innerWidth - sidePadding * 2)));

    if (input.mode !== 'shop_orbit') {
      if (compact) {
        const top = Math.round(topPadding + 124 + input.slot * 132);
        return {
          left: Math.round(window.innerWidth * 0.5),
          top,
          width: Math.min(width, window.innerWidth - sidePadding * 2),
          compact: true
        };
      }

      const gap = 18;
      const totalWidth = width * 3 + gap * 2;
      const startLeft = Math.max(sidePadding, (window.innerWidth - totalWidth) * 0.5);
      return {
        left: Math.round(startLeft + input.slot * (width + gap) + width * 0.5),
        top: Math.round(window.innerHeight - bottomPadding - 170),
        width,
        compact: false
      };
    }

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
