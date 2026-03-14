import { clamp } from '../core/math';
import type { GameHudSnapshot } from './gameSessionTypes';
import { pathDistanceToMeters } from './difficultyScaler';

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
  }

  recordLanding(shardsLanded: number, pathDistance: number, elapsedTime: number, momentumGauge: number) {
    const previousDistanceMeters = this.distanceMeters;
    this.shardsLanded = Math.max(this.shardsLanded, shardsLanded);
    this.distanceMeters = Math.max(this.distanceMeters, pathDistanceToMeters(pathDistance));
    this.awardScore(1, momentumGauge);

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

  addCoins(amount: number, momentumGauge: number) {
    this.coins += amount;
    this.coinsCollected += amount;
    this.awardScore(amount * 2, momentumGauge);
    if (this.coinsCollected > this.bestCoinsCollected) {
      this.bestCoinsCollected = this.coinsCollected;
      this.persist();
    }
  }

  recordEnemyKill(amount = 1, momentumGauge = 0) {
    this.enemiesKilled += amount;
    this.awardScore(amount * 5, momentumGauge);
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
    return {
      score: this.totalScore,
      bestScore: this.bestScore,
      shardsLanded: this.shardsLanded,
      bestShards: this.bestShards,
      distanceMeters: this.distanceMeters,
      bestDistanceMeters: this.bestDistanceMeters,
      coins: this.coins,
      coinsCollected: this.coinsCollected,
      enemiesKilled: this.enemiesKilled,
      longestMomentumSeconds: this.longestMomentumSeconds,
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

  fillHud(snapshot: Pick<GameHudSnapshot, 'score' | 'highscore' | 'distanceMeters' | 'bestDistanceMeters' | 'coins' | 'splitTimes'>) {
    snapshot.score = this.totalScore;
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

  private awardScore(basePoints: number, momentumGauge: number) {
    const multiplier = 1 + clamp(momentumGauge, 0, 1);
    const gained = Math.max(1, Math.round(basePoints * multiplier));
    this.totalScore += gained;
    if (this.totalScore > this.bestScore) {
      this.bestScore = this.totalScore;
      this.persist();
    }
    return gained;
  }
}
