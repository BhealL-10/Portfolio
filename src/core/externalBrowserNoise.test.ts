import { describe, expect, it } from 'vitest';
import { classifyExternalBrowserNoise } from './externalBrowserNoise';

describe('classifyExternalBrowserNoise', () => {
  it('detects runtime.sendMessage tab lifecycle errors', () => {
    expect(
      classifyExternalBrowserNoise(
        new Error('Invalid call to runtime.sendMessage(). Tab not found.')
      )
    ).toMatchObject({
      kind: 'external_browser_extension_error',
      reason: 'runtime.sendMessage'
    });
  });

  it('ignores unrelated game errors', () => {
    expect(classifyExternalBrowserNoise(new Error('Renderer context lost unexpectedly'))).toBeNull();
  });
});
