export const PLAYABLE_PATH_LANE_COUNT = 10;

const EARLY_PATH_LANE_SPACING = 4.8;
const LATE_PATH_LANE_SPACING = 4.4;
const PATH_LANE_SCORE_PIVOT = 50;
const PATH_LANE_HALF_INDEX = (PLAYABLE_PATH_LANE_COUNT - 1) * 0.5;

export function getPathLaneSpacing(score: number) {
  return score < PATH_LANE_SCORE_PIVOT ? EARLY_PATH_LANE_SPACING : LATE_PATH_LANE_SPACING;
}

export function getPathLaneTargets(score: number) {
  const spacing = getPathLaneSpacing(score);
  return Array.from({ length: PLAYABLE_PATH_LANE_COUNT }, (_, index) => (index - PATH_LANE_HALF_INDEX) * spacing);
}

export function getPathVerticalExtent(score: number) {
  return getPathLaneSpacing(score) * PATH_LANE_HALF_INDEX;
}
