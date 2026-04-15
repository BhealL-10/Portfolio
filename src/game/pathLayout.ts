export const PLAYABLE_PATH_LANE_COUNT = 10;

const EARLY_PATH_LANE_SPACING = 6.4;
const LATE_PATH_LANE_SPACING = 5.6;
const EARLY_PATH_LANE_VERTICAL_OFFSET = 5.4;
const LATE_PATH_LANE_VERTICAL_OFFSET = 4.6;
const PATH_LANE_SCORE_PIVOT = 50;
const PATH_LANE_HALF_INDEX = (PLAYABLE_PATH_LANE_COUNT - 1) * 0.5;

export function getPathLaneSpacing(score: number) {
  return score < PATH_LANE_SCORE_PIVOT ? EARLY_PATH_LANE_SPACING : LATE_PATH_LANE_SPACING;
}

export function getPathLaneVerticalOffset(score: number) {
  return score < PATH_LANE_SCORE_PIVOT ? EARLY_PATH_LANE_VERTICAL_OFFSET : LATE_PATH_LANE_VERTICAL_OFFSET;
}

export function getPathLaneTargets(score: number) {
  const spacing = getPathLaneSpacing(score);
  const offset = getPathLaneVerticalOffset(score);
  return Array.from({ length: PLAYABLE_PATH_LANE_COUNT }, (_, index) => (index - PATH_LANE_HALF_INDEX) * spacing + offset);
}

export function getPathVerticalExtent(score: number) {
  return getPathLaneSpacing(score) * PATH_LANE_HALF_INDEX;
}
