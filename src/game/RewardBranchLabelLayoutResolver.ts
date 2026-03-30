import { isMobileRuntime } from '../core/device';

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
  resolveMany(inputs: RewardBranchLabelLayoutInput[]) {
    const layouts = inputs.map((input) => this.resolveSingle(input));
    if (inputs.length <= 1) {
      return layouts;
    }

    const gap = layouts[0]?.compact ? 8 : 12;
    const allShopOrbit = inputs.every((input) => input.mode === 'shop_orbit');
    const estimatedHeight = allShopOrbit ? (layouts[0]?.compact ? 132 : 150) : layouts[0]?.compact ? 108 : 122;
    const topPadding = layouts[0]?.compact ? 10 : 16;
    const bottomPadding = layouts[0]?.compact ? 14 : 22;
    const viewportBottom = window.innerHeight - bottomPadding - estimatedHeight * 0.5;

    if (allShopOrbit) {
      const sharedTop = Math.round(
        Math.max(
          topPadding + estimatedHeight * 0.5,
          Math.min(viewportBottom, Math.min(...layouts.map((layout) => layout.top)))
        )
      );
      layouts.forEach((layout) => {
        layout.top = sharedTop;
      });
      return layouts;
    }

    const ordered = layouts
      .map((layout, index) => ({ layout, index }))
      .sort((a, b) => a.layout.top - b.layout.top);

    for (let index = 1; index < ordered.length; index += 1) {
      const previous = ordered[index - 1]!;
      const current = ordered[index]!;
      const minimumTop = previous.layout.top + estimatedHeight + gap;
      if (current.layout.top < minimumTop) {
        current.layout.top = minimumTop;
      }
    }

    for (let index = ordered.length - 2; index >= 0; index -= 1) {
      const current = ordered[index]!;
      const next = ordered[index + 1]!;
      if (next.layout.top > viewportBottom) {
        next.layout.top = viewportBottom;
      }
      const maximumTop = next.layout.top - estimatedHeight - gap;
      if (current.layout.top > maximumTop) {
        current.layout.top = maximumTop;
      }
    }

    ordered.forEach(({ layout }) => {
      layout.top = Math.round(Math.max(topPadding + estimatedHeight * 0.5, Math.min(viewportBottom, layout.top)));
    });

    return layouts;
  }

  resolve(input: RewardBranchLabelLayoutInput): RewardBranchLabelLayout {
    return this.resolveSingle(input);
  }

  private resolveSingle(input: RewardBranchLabelLayoutInput): RewardBranchLabelLayout {
    const compact = isMobileRuntime();
    const sidePadding = compact ? 10 : 20;
    const topPadding = compact ? 10 : 18;
    const bottomPadding = compact ? 14 : 22;
    const width = Math.round(Math.max(132, Math.min(compact ? 156 : 196, window.innerWidth - sidePadding * 2)));

    if (input.mode !== 'shop_orbit') {
      const anchorGap = compact ? 26 : 34;
      const slotVerticalOffset = input.slot === 0 ? (compact ? -10 : -12) : input.slot === 2 ? (compact ? 10 : 12) : 0;
      // Pour les branches/récompenses, aligner le panneau à droite (description à droite de la shard)
      const targetX = input.screenX + anchorGap;
      const left = Math.round(
        Math.max(
          sidePadding,
          Math.min(window.innerWidth - sidePadding - width, targetX)
        )
      );
      const top = Math.round(
        Math.max(
          topPadding + 48,
          Math.min(window.innerHeight - bottomPadding - 48, input.screenY + slotVerticalOffset)
        )
      );
      return {
        left,
        top,
        width,
        compact
      };
    }

    const verticalOffset = compact ? 86 : 108;
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
