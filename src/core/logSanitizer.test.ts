import { describe, expect, it } from 'vitest';
import { sanitizeLogString, summarizeDataUri } from './logSanitizer';

describe('logSanitizer', () => {
  it('summarizes raw data URIs instead of keeping the full payload', () => {
    const dataUri = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64"/></svg>';

    expect(summarizeDataUri(dataUri)).toEqual({
      type: 'data-uri',
      mime: 'image/svg+xml',
      length: dataUri.length,
      hash: expect.any(String)
    });
  });

  it('replaces inline data URIs inside longer strings with compact summaries', () => {
    const dataUri = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><circle r="12"/></svg>';
    const sanitized = sanitizeLogString(`fetch failed for ${dataUri}`, { maxStringLength: 240 });

    expect(typeof sanitized).toBe('string');
    expect(String(sanitized)).toContain('[data-uri:image/svg+xml;length=');
    expect(String(sanitized)).not.toContain('<svg');
  });
});
