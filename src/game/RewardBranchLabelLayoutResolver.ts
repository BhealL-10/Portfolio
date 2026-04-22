import { isMobileRuntime } from '../core/device';
import { getRuntimeViewportSize } from '../core/viewport';
import { readAppliedGameUiScale } from './gameUiScale';

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
    const viewport = getRuntimeViewportSize();
    const uiScale = readAppliedGameUiScale();
    const layouts = inputs.map((input) => this.resolveSingle(input));
    if (inputs.length <= 1) {
      return layouts;
    }

    const compact = layouts[0]?.compact ?? false;
    const gap = Math.round((compact ? 6 : 12) * uiScale);
    const allShopOrbit = inputs.every((input) => input.mode === 'shop_orbit');
    const estimatedHeight = Math.round((allShopOrbit ? (compact ? 136 : 154) : compact ? 108 : 122) * uiScale);
    const topPadding = Math.round((compact ? 10 : 16) * uiScale);
    const bottomPadding = Math.round((compact ? 14 : 22) * uiScale);
    const viewportBottom = viewport.height - bottomPadding - estimatedHeight * 0.5;

    if (allShopOrbit) {
      const sidePadding = Math.round((compact ? 10 : 20) * uiScale);
      const shopGap = Math.round((compact ? 12 : 18) * uiScale);
      const sharedTop = Math.round(topPadding + estimatedHeight * 0.5);

      if (compact) {
        const width = Math.round(Math.max(140 * uiScale, Math.min(192 * uiScale, viewport.width - sidePadding * 2)));
        layouts.forEach((layout, index) => {
          layout.width = width;
          layout.left = Math.round(viewport.width * 0.5);
          layout.top = Math.round(sharedTop + index * (estimatedHeight + shopGap));
        });
        return layouts;
      }

      const availableWidth = Math.max(180 * uiScale, viewport.width - sidePadding * 2);
      const width = Math.round(Math.max(152 * uiScale, Math.min(184 * uiScale, (availableWidth - shopGap * (inputs.length - 1)) / inputs.length)));
      const totalWidth = width * inputs.length + shopGap * (inputs.length - 1);
      const startCenter = Math.round((viewport.width - totalWidth) * 0.5 + width * 0.5);
      layouts.forEach((layout, index) => {
        layout.width = width;
        layout.left = startCenter + index * (width + shopGap);
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
    const viewport = getRuntimeViewportSize();
    const uiScale = readAppliedGameUiScale();
    const compact = isMobileRuntime();
    const sidePadding = Math.round((compact ? 10 : 20) * uiScale);
    const topPadding = Math.round((compact ? 10 : 18) * uiScale);
    const bottomPadding = Math.round((compact ? 14 : 22) * uiScale);
    const width = Math.round(
      Math.max(
        132 * uiScale,
        Math.min((input.mode === 'shop_orbit' ? (compact ? 162 : 184) : compact ? 156 : 196) * uiScale, viewport.width - sidePadding * 2)
      )
    );

    if (input.mode !== 'shop_orbit') {
      const anchorGap = (compact ? 26 : 34) * uiScale;
      const slotVerticalOffset = input.slot === 0 ? (compact ? -10 : -12) * uiScale : input.slot === 2 ? (compact ? 10 : 12) * uiScale : 0;
      // Pour les branches/récompenses, aligner le panneau à droite (description à droite de la shard)
      const targetX = input.screenX + anchorGap;
      const left = Math.round(
        Math.max(
          sidePadding,
          Math.min(viewport.width - sidePadding - width, targetX)
        )
      );
      const top = Math.round(
        Math.max(
          topPadding + 48 * uiScale,
          Math.min(viewport.height - bottomPadding - 48 * uiScale, input.screenY + slotVerticalOffset)
        )
      );
      return {
        left,
        top,
        width,
        compact
      };
    }

    const verticalOffset = (compact ? 78 : 108) * uiScale;
    const left = Math.round(
      Math.max(
        sidePadding + width * 0.5,
        Math.min(viewport.width - sidePadding - width * 0.5, input.screenX)
      )
    );
    const top = Math.round(
      Math.max(
        topPadding + 34 * uiScale,
        Math.min(viewport.height - bottomPadding - 52 * uiScale, input.screenY - verticalOffset)
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
