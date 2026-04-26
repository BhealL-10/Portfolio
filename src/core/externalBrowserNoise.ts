import { sanitizeLogString } from './logSanitizer';

export type ExternalBrowserNoiseKind = 'external_browser_extension_error';

const EXTERNAL_BROWSER_NOISE_PATTERNS = [
  { kind: 'external_browser_extension_error' as const, reason: 'runtime.sendMessage', pattern: /runtime\.sendmessage/i },
  { kind: 'external_browser_extension_error' as const, reason: 'tab_not_found', pattern: /tab not found/i },
  { kind: 'external_browser_extension_error' as const, reason: 'extension_context_invalidated', pattern: /extension context invalidated/i },
  { kind: 'external_browser_extension_error' as const, reason: 'receiving_end_missing', pattern: /receiving end does not exist/i }
] as const;

function collectErrorStrings(value: unknown, strings: string[], depth = 0, seen = new WeakSet<object>()) {
  if (value === null || value === undefined || depth >= 4) {
    return;
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    strings.push(String(value));
    return;
  }
  if (value instanceof Error) {
    strings.push(value.name, value.message);
    if (value.stack) {
      strings.push(value.stack);
    }
    collectErrorStrings(value.cause, strings, depth + 1, seen);
    return;
  }
  if (typeof value !== 'object') {
    strings.push(String(value));
    return;
  }
  if (seen.has(value)) {
    return;
  }
  seen.add(value);
  Object.values(value as Record<string, unknown>)
    .slice(0, 24)
    .forEach((nestedValue) => collectErrorStrings(nestedValue, strings, depth + 1, seen));
}

export function classifyExternalBrowserNoise(value: unknown, hints: Record<string, unknown> = {}) {
  const strings: string[] = [];
  collectErrorStrings(value, strings);
  collectErrorStrings(hints, strings);
  const payload = strings.filter(Boolean).join('\n');
  if (!payload) {
    return null;
  }

  const match = EXTERNAL_BROWSER_NOISE_PATTERNS.find(({ pattern }) => pattern.test(payload));
  if (!match) {
    return null;
  }

  const sanitizedMessage = sanitizeLogString(payload, { maxStringLength: 240 });
  return {
    kind: match.kind,
    reason: match.reason,
    message: typeof sanitizedMessage === 'string' ? sanitizedMessage : JSON.stringify(sanitizedMessage)
  };
}
