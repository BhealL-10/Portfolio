import { getDifficultyProfile } from './difficultyScaler';
import type { GameEventType } from './gameSessionTypes';

const POST_MILESTONE_EVENTS: GameEventType[] = ['shop', 'gift', 'rare_item'];

export class EventSystem {
  private queuedEvents = new Map<number, GameEventType>();
  private shopQueued = false;

  reset() {
    this.queuedEvents.clear();
    this.shopQueued = false;
  }

  schedulePostMilestoneEvents(fromIndex: number, score: number, rng: () => number) {
    const profile = getDifficultyProfile(score);
    const eventChance = Math.min(0.9, profile.eventChance + 0.08);
    const count = rng() < eventChance ? (rng() < 0.5 ? 2 : 1) : 0;

    for (let offset = 0; offset < count; offset += 1) {
      const triggerIndex = fromIndex + 8 + Math.floor(rng() * 9) + offset * 3;
      if (this.queuedEvents.has(triggerIndex)) continue;
      const type =
        !this.shopQueued && fromIndex >= 100
          ? 'shop'
          : POST_MILESTONE_EVENTS[Math.floor(rng() * POST_MILESTONE_EVENTS.length)] ?? 'gift';
      this.queuedEvents.set(triggerIndex, type);
      if (type === 'shop') {
        this.shopQueued = true;
      }
    }
  }

  consumePlannedEvent(index: number, _score: number) {
    const event = this.queuedEvents.get(index);
    if (event) {
      this.queuedEvents.delete(index);
      return event;
    }

    return 'none' as GameEventType;
  }
}
