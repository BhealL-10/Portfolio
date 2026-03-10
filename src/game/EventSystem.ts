import { getDifficultyProfile } from './difficultyScaler';
import type { GameEventType } from './gameSessionTypes';

const POST_MILESTONE_EVENTS: GameEventType[] = ['shop', 'treasure', 'gift', 'mini_boss', 'rare_item'];

export class EventSystem {
  private queuedEvents = new Map<number, GameEventType>();
  private bossConsumed = false;

  reset() {
    this.queuedEvents.clear();
    this.bossConsumed = false;
  }

  schedulePostMilestoneEvents(fromIndex: number, score: number, rng: () => number) {
    const profile = getDifficultyProfile(score);
    const count = rng() < profile.eventChance ? (rng() < 0.42 ? 2 : 1) : 0;

    for (let offset = 0; offset < count; offset += 1) {
      const triggerIndex = fromIndex + 10 + Math.floor(rng() * 11) + offset * 3;
      if (this.queuedEvents.has(triggerIndex)) continue;
      const type = POST_MILESTONE_EVENTS[Math.floor(rng() * POST_MILESTONE_EVENTS.length)] ?? 'gift';
      this.queuedEvents.set(triggerIndex, type);
    }
  }

  consumePlannedEvent(index: number, score: number) {
    if (!this.bossConsumed && score >= 150 && index >= 150) {
      this.bossConsumed = true;
      return 'boss' as GameEventType;
    }

    const event = this.queuedEvents.get(index);
    if (event) {
      this.queuedEvents.delete(index);
      return event;
    }

    return 'none' as GameEventType;
  }
}
