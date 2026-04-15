import { describe, expect, it } from 'vitest';
import { ViewportShardStream } from './ViewportShardStream';

describe('ViewportShardStream', () => {
  it('keeps warm-visible bindings on the same slots while recycling only released slots', () => {
    const stream = new ViewportShardStream();
    stream.ensureCapacity(4);

    stream.sync([10, 11, 12], () => true);
    expect(stream.getSlots().map((slot) => slot.nodeIndex)).toEqual([10, 11, 12, null]);

    stream.sync([11, 12, 13], (nodeIndex) => nodeIndex === 10 || nodeIndex === 13);
    expect(stream.getSlots().map((slot) => slot.nodeIndex)).toEqual([13, 11, 12, null]);
  });

  it('does not evict a slot when the viewport says that binding is still protected', () => {
    const stream = new ViewportShardStream();
    stream.ensureCapacity(3);

    stream.sync([20, 21, 22], () => true);
    stream.sync([21, 22, 23], () => false);

    expect(stream.getSlots().map((slot) => slot.nodeIndex)).toEqual([20, 21, 22]);
  });
});
