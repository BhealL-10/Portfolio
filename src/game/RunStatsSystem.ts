import type { GameHudSnapshot } from './gameSessionTypes';
import { pathDistanceToMeters } from './difficultyScaler';

const SHARDS_KEY = 'portfolio-game-highscore';
const DISTANCE_KEY = 'portfolio-game-best-distance';
const SPLITS_KEY = 'portfolio-game-best-splits';

type SplitMap = Partial<Record<100 | 500 | 1000, number>>;

export class RunStatsSystem {
  private shardsLanded = 0;
  private distanceMeters = 0;
  private coins = 0;
  private runStartTime = 0;
  private splitTimes: SplitMap = {};
  private bestShards = Number(window.localStorage.getItem(SHARDS_KEY) || 0);
  private bestDistanceMeters = Number(window.localStorage.getItem(DISTANCE_KEY) || 0);
  private bestSplitTimes: SplitMap = this.readSplits();

  reset(startTime = performance.now()) {
    this.shardsLanded = 0;
    this.distanceMeters = 0;
    this.coins = 0;
    this.runStartTime = startTime;
    this.splitTimes = {};
  }

  recordLanding(shardsLanded: number, pathDistance: number, elapsedTime: number) {
    const previousDistanceMeters = this.distanceMeters;
    this.shardsLanded = Math.max(this.shardsLanded, shardsLanded);
    this.distanceMeters = Math.max(this.distanceMeters, pathDistanceToMeters(pathDistance));

    for (const milestone of [100, 500, 1000] as const) {
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

  addCoins(amount: number) {
    this.coins += amount;
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
      shardsLanded: this.shardsLanded,
      bestShards: this.bestShards,
      distanceMeters: this.distanceMeters,
      bestDistanceMeters: this.bestDistanceMeters,
      coins: this.coins,
      splitTimes: { ...this.splitTimes },
      bestSplitTimes: { ...this.bestSplitTimes }
    };
  }

  fillHud(snapshot: Pick<GameHudSnapshot, 'score' | 'highscore' | 'distanceMeters' | 'bestDistanceMeters' | 'coins' | 'splitTimes'>) {
    snapshot.score = this.shardsLanded;
    snapshot.highscore = this.bestShards;
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
    window.localStorage.setItem(SHARDS_KEY, String(this.bestShards));
    window.localStorage.setItem(DISTANCE_KEY, String(this.bestDistanceMeters));
    window.localStorage.setItem(SPLITS_KEY, JSON.stringify(this.bestSplitTimes));
  }
}
