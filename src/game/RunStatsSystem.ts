import type { GameHudSnapshot } from './gameSessionTypes';
import { pathDistanceToMeters } from './difficultyScaler';
import { clamp } from '../core/math';

type ScoreEventType = 'landing' | 'coin' | 'kill';
const SCORE_MOMENTUM_REFERENCE_POINTS = [0, 0.25, 0.5, 1] as const;
const SCORE_BASE_VALUES: Record<ScoreEventType, readonly [number, number, number, number]> = {
  landing: [10, 15, 30, 100],
  coin: [20, 25, 50, 175],
  kill: [50, 75, 100, 250]
};
const MAX_TWIST_CHAIN_MULTIPLIER = 10;

const SCORE_KEY = 'portfolio-game-best-score';
const SHARDS_KEY = 'portfolio-game-best-shards';
const DISTANCE_KEY = 'portfolio-game-best-distance';
const COINS_KEY = 'portfolio-game-best-coins';
const KILLS_KEY = 'portfolio-game-best-kills';
const MOMENTUM_KEY = 'portfolio-game-best-momentum';
const SPLITS_KEY = 'portfolio-game-best-splits';

type SplitMap = Partial<Record<10 | 100 | 1000, number>>;

export class RunStatsSystem {
  private totalScore = 0;
  private shardsLanded = 0;
  private distanceMeters = 0;
  private coins = 0;
  private coinsCollected = 0;
  private enemiesKilled = 0;
  private longestMomentumSeconds = 0;
  private momentumChainStartedAt: number | null = null;
  private runStartTime = 0;
  private splitTimes: SplitMap = {};
  private bestScore = Number(window.localStorage.getItem(SCORE_KEY) || 0);
  private bestShards = Number(window.localStorage.getItem(SHARDS_KEY) || 0);
  private bestDistanceMeters = Number(window.localStorage.getItem(DISTANCE_KEY) || 0);
  private bestCoinsCollected = Number(window.localStorage.getItem(COINS_KEY) || 0);
  private bestEnemiesKilled = Number(window.localStorage.getItem(KILLS_KEY) || 0);
  private bestLongestMomentumSeconds = Number(window.localStorage.getItem(MOMENTUM_KEY) || 0);
  private bestSplitTimes: SplitMap = this.readSplits();
  private baselineBestScore = this.bestScore;
  private baselineBestShards = this.bestShards;
  private baselineBestDistanceMeters = this.bestDistanceMeters;
  private baselineBestCoinsCollected = this.bestCoinsCollected;
  private baselineBestEnemiesKilled = this.bestEnemiesKilled;
  private baselineBestLongestMomentumSeconds = this.bestLongestMomentumSeconds;
  private landingScore = 0;
  private killScore = 0;
  private coinScore = 0;
  private momentumBonusScore = 0;
  private maxTwistChainLength = 0;
  private scoreFeedSerial = 0;
  private lastScoreFeedEvent: {
    serial: number;
    basePoints: number;
    gained: number;
    multiplier: number;
    momentumRatio: number;
  } | null = null;

  reset(startTime = performance.now()) {
    this.totalScore = 0;
    this.shardsLanded = 0;
    this.distanceMeters = 0;
    this.coins = 0;
    this.coinsCollected = 0;
    this.enemiesKilled = 0;
    this.longestMomentumSeconds = 0;
    this.momentumChainStartedAt = null;
    this.runStartTime = startTime;
    this.splitTimes = {};
    this.baselineBestScore = this.bestScore;
    this.baselineBestShards = this.bestShards;
    this.baselineBestDistanceMeters = this.bestDistanceMeters;
    this.baselineBestCoinsCollected = this.bestCoinsCollected;
    this.baselineBestEnemiesKilled = this.bestEnemiesKilled;
    this.baselineBestLongestMomentumSeconds = this.bestLongestMomentumSeconds;
    this.landingScore = 0;
    this.killScore = 0;
    this.coinScore = 0;
    this.momentumBonusScore = 0;
    this.maxTwistChainLength = 0;
    this.lastScoreFeedEvent = null;
  }

  recordLanding(pathDistance: number, elapsedTime: number, momentumGauge = 0, twistChainLength = 0) {
    const previousDistanceMeters = this.distanceMeters;
    this.shardsLanded += 1;
    this.distanceMeters = Math.max(this.distanceMeters, Math.abs(pathDistanceToMeters(pathDistance)));
    const normalizedMomentum = clamp(momentumGauge, 0, 1);
    const basePoints = this.getScoreForEvent('landing', normalizedMomentum);
    this.awardLandingScore(basePoints, this.getTwistChainMultiplier(twistChainLength), normalizedMomentum);
    if (twistChainLength > this.maxTwistChainLength) {
      this.maxTwistChainLength = twistChainLength;
    }

    for (const milestone of [10, 100, 1000] as const) {
      if (previousDistanceMeters >= milestone || this.distanceMeters < milestone || this.splitTimes[milestone] !== undefined) {
        continue;
      }
      const split = Math.max(0, elapsedTime - this.runStartTime) / 1000;
      this.splitTimes[milestone] = split;
      const best = this.bestSplitTimes[milestone];
      if (best === undefined || split < best) {
        this.bestSplitTimes[milestone] = split;
        this.persist();
      }
    }

    if (this.shardsLanded > this.bestShards) {
      this.bestShards = this.shardsLanded;
      this.persist();
    }

    if (this.distanceMeters > this.bestDistanceMeters) {
      this.bestDistanceMeters = this.distanceMeters;
      this.persist();
    }
  }

  addCoins(amount: number, momentumGauge: number, twistChainLength = 0) {
    this.coins += amount;
    this.coinsCollected += amount;
    const normalizedMomentum = clamp(momentumGauge, 0, 1);
    if (amount > 0) {
      const basePoints = amount * this.getScoreForEvent('coin', normalizedMomentum);
      this.awardCoinScore(basePoints, this.getTwistChainMultiplier(twistChainLength), normalizedMomentum);
    }
    if (this.coinsCollected > this.bestCoinsCollected) {
      this.bestCoinsCollected = this.coinsCollected;
      this.persist();
    }
  }

  recordEnemyKill(amount = 1, momentumGauge = 0, twistChainLength = 0) {
    this.enemiesKilled += amount;
    const normalizedMomentum = clamp(momentumGauge, 0, 1);
    const basePoints = amount * this.getScoreForEvent('kill', normalizedMomentum);
    this.awardKillScore(basePoints, this.getTwistChainMultiplier(twistChainLength), normalizedMomentum);
    if (this.enemiesKilled > this.bestEnemiesKilled) {
      this.bestEnemiesKilled = this.enemiesKilled;
      this.persist();
    }
  }

  updateMomentumWindow(runElapsedSeconds: number, active: boolean) {
    if (!active) {
      this.momentumChainStartedAt = null;
      return;
    }
    if (this.momentumChainStartedAt === null) {
      this.momentumChainStartedAt = runElapsedSeconds;
    }
    this.longestMomentumSeconds = Math.max(this.longestMomentumSeconds, runElapsedSeconds - this.momentumChainStartedAt);
    if (this.longestMomentumSeconds > this.bestLongestMomentumSeconds) {
      this.bestLongestMomentumSeconds = this.longestMomentumSeconds;
      this.persist();
    }
  }

  canAfford(cost: number) {
    return this.coins >= cost;
  }

  spendCoins(cost: number) {
    if (this.coins < cost) return false;
    this.coins -= cost;
    return true;
  }

  getSnapshot() {
    const otherScore = Math.max(0, this.totalScore - this.landingScore - this.killScore - this.coinScore - this.momentumBonusScore);
    return {
      score: this.totalScore,
      bestScore: this.bestScore,
      shardsLanded: this.shardsLanded,
      bestShards: this.bestShards,
      distanceMeters: this.distanceMeters,
      bestDistanceMeters: this.bestDistanceMeters,
      coins: this.coins,
      coinsCollected: this.coinsCollected,
      bestCoinsCollected: this.bestCoinsCollected,
      enemiesKilled: this.enemiesKilled,
      bestEnemiesKilled: this.bestEnemiesKilled,
      longestMomentumSeconds: this.longestMomentumSeconds,
      bestLongestMomentumSeconds: this.bestLongestMomentumSeconds,
      twistChainMax: this.maxTwistChainLength,
      scoreBreakdown: {
        landings: {
          count: this.shardsLanded,
          score: this.landingScore
        },
        kills: {
          count: this.enemiesKilled,
          score: this.killScore
        },
        coins: {
          count: this.coinsCollected,
          score: this.coinScore
        },
        momentum: {
          score: this.momentumBonusScore
        },
        other: {
          score: otherScore
        }
      },
      personalBests: {
        score: this.totalScore > this.baselineBestScore,
        shardsLanded: this.shardsLanded > this.baselineBestShards,
        distanceMeters: this.distanceMeters > this.baselineBestDistanceMeters,
        coinsCollected: this.coinsCollected > this.baselineBestCoinsCollected,
        enemiesKilled: this.enemiesKilled > this.baselineBestEnemiesKilled,
        longestMomentumSeconds: this.longestMomentumSeconds > this.baselineBestLongestMomentumSeconds
      },
      splitTimes: { ...this.splitTimes },
      bestSplitTimes: { ...this.bestSplitTimes }
    };
  }

  fillHud(snapshot: Pick<GameHudSnapshot, 'score' | 'scoreFeed' | 'highscore' | 'distanceMeters' | 'bestDistanceMeters' | 'coins' | 'splitTimes'>) {
    snapshot.score = this.totalScore;
    snapshot.scoreFeed = this.lastScoreFeedEvent;
    snapshot.highscore = this.bestScore;
    snapshot.distanceMeters = this.distanceMeters;
    snapshot.bestDistanceMeters = this.bestDistanceMeters;
    snapshot.coins = this.coins;
    snapshot.splitTimes = { ...this.splitTimes };
  }

  private readSplits(): SplitMap {
    const raw = window.localStorage.getItem(SPLITS_KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as SplitMap;
    } catch {
      return {};
    }
  }

  private persist() {
    window.localStorage.setItem(SCORE_KEY, String(this.bestScore));
    window.localStorage.setItem(SHARDS_KEY, String(this.bestShards));
    window.localStorage.setItem(DISTANCE_KEY, String(this.bestDistanceMeters));
    window.localStorage.setItem(COINS_KEY, String(this.bestCoinsCollected));
    window.localStorage.setItem(KILLS_KEY, String(this.bestEnemiesKilled));
    window.localStorage.setItem(MOMENTUM_KEY, String(this.bestLongestMomentumSeconds));
    window.localStorage.setItem(SPLITS_KEY, JSON.stringify(this.bestSplitTimes));
  }

  private awardLandingScore(basePoints: number, multiplier: number, momentumRatio: number) {
    const result = this.awardScore(basePoints, multiplier, momentumRatio);
    this.landingScore += result.basePoints;
    this.momentumBonusScore += result.momentumBonus;
    return result.gained;
  }

  private awardScore(basePoints: number, multiplier: number, momentumRatio: number) {
    const safeBasePoints = Math.max(0, Math.round(basePoints));
    const safeMultiplier = Math.max(1, multiplier);
    const gained = Math.max(0, Math.round(safeBasePoints * safeMultiplier));
    const momentumBonus = Math.max(0, gained - safeBasePoints);
    this.scoreFeedSerial += 1;
    this.lastScoreFeedEvent = {
      serial: this.scoreFeedSerial,
      basePoints: safeBasePoints,
      gained,
      multiplier: safeMultiplier,
      momentumRatio: clamp(momentumRatio, 0, 1)
    };
    this.totalScore += gained;
    if (this.totalScore > this.bestScore) {
      this.bestScore = this.totalScore;
      this.persist();
    }
    return {
      basePoints: safeBasePoints,
      gained,
      momentumBonus
    };
  }

  private getScoreForEvent(eventType: ScoreEventType, momentumRatio: number) {
    const ratio = clamp(momentumRatio, 0, 1);
    return this.interpolateMomentumScore(ratio, SCORE_BASE_VALUES[eventType]);
  }

  private interpolateMomentumScore(ratio: number, values: readonly [number, number, number, number]) {
    if (ratio <= SCORE_MOMENTUM_REFERENCE_POINTS[1]) {
      const segment = ratio / SCORE_MOMENTUM_REFERENCE_POINTS[1];
      return this.lerp(values[0], values[1], segment);
    }
    if (ratio <= SCORE_MOMENTUM_REFERENCE_POINTS[2]) {
      const segment = (ratio - SCORE_MOMENTUM_REFERENCE_POINTS[1]) /
        (SCORE_MOMENTUM_REFERENCE_POINTS[2] - SCORE_MOMENTUM_REFERENCE_POINTS[1]);
      return this.lerp(values[1], values[2], segment);
    }
    const segment = (ratio - SCORE_MOMENTUM_REFERENCE_POINTS[2]) /
      (SCORE_MOMENTUM_REFERENCE_POINTS[3] - SCORE_MOMENTUM_REFERENCE_POINTS[2]);
    return this.lerp(values[2], values[3], segment);
  }

  private lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
  }

  private getTwistChainMultiplier(chainLength: number) {
    if (chainLength <= 1) {
      return 1;
    }
    return Math.min(chainLength, MAX_TWIST_CHAIN_MULTIPLIER);
  }

  private awardKillScore(basePoints: number, multiplier: number, momentumRatio: number) {
    const result = this.awardScore(basePoints, multiplier, momentumRatio);
    this.killScore += result.basePoints;
    this.momentumBonusScore += result.momentumBonus;
    return result.gained;
  }

  private awardCoinScore(basePoints: number, multiplier: number, momentumRatio: number) {
    const result = this.awardScore(basePoints, multiplier, momentumRatio);
    this.coinScore += result.basePoints;
    return result.gained;
  }
}
