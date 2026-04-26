export type SanitizedLogPrimitive = string | number | boolean | null;
export type SanitizedLogValue =
  | SanitizedLogPrimitive
  | SanitizedLogValue[]
  | { [key: string]: SanitizedLogValue };

export interface SanitizeLogOptions {
  maxDepth?: number;
  maxStringLength?: number;
  maxArrayLength?: number;
  maxObjectEntries?: number;
}

const DEFAULT_OPTIONS: Required<SanitizeLogOptions> = {
  maxDepth: 4,
  maxStringLength: 320,
  maxArrayLength: 12,
  maxObjectEntries: 14
};

const DATA_URI_PREFIX = 'data:';
const DATA_URI_BOUNDARY_CHARS = new Set(['"', "'", '`', '<', '>', ')', '(', ' ', '\n', '\r', '\t']);

function resolveOptions(options: SanitizeLogOptions = {}): Required<SanitizeLogOptions> {
  return {
    maxDepth: options.maxDepth ?? DEFAULT_OPTIONS.maxDepth,
    maxStringLength: options.maxStringLength ?? DEFAULT_OPTIONS.maxStringLength,
    maxArrayLength: options.maxArrayLength ?? DEFAULT_OPTIONS.maxArrayLength,
    maxObjectEntries: options.maxObjectEntries ?? DEFAULT_OPTIONS.maxObjectEntries
  };
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, '0').slice(0, 8);
}

export function isDataUriString(value: string) {
  return value.trimStart().toLowerCase().startsWith(DATA_URI_PREFIX);
}

export function summarizeDataUri(value: string): SanitizedLogValue {
  const commaIndex = value.indexOf(',');
  const metadata = commaIndex >= 0 ? value.slice(DATA_URI_PREFIX.length, commaIndex) : value.slice(DATA_URI_PREFIX.length);
  const mime = metadata.split(';')[0]?.trim().toLowerCase() || 'text/plain';
  return {
    type: 'data-uri',
    mime,
    length: value.length,
    hash: hashString(value)
  };
}

function summarizeDataUriForInlineText(value: string) {
  const summary = summarizeDataUri(value) as Record<string, SanitizedLogValue>;
  return `[data-uri:${summary.mime};length=${summary.length};hash=${summary.hash}]`;
}

function findInlineDataUriEnd(value: string, start: number, lowerValue: string) {
  const commaIndex = value.indexOf(',', start + DATA_URI_PREFIX.length);
  if (commaIndex >= 0) {
    const metadata = lowerValue.slice(start + DATA_URI_PREFIX.length, commaIndex);
    const payloadStart = commaIndex + 1;
    if (metadata.includes('image/svg+xml') && lowerValue.slice(payloadStart, payloadStart + 4) === '<svg') {
      const closingTagIndex = lowerValue.indexOf('</svg>', payloadStart);
      if (closingTagIndex >= 0) {
        return closingTagIndex + '</svg>'.length;
      }
    }
  }

  let end = start + DATA_URI_PREFIX.length;
  while (end < value.length && !DATA_URI_BOUNDARY_CHARS.has(value[end]!)) {
    end += 1;
  }
  return end;
}

function replaceInlineDataUris(value: string) {
  let cursor = 0;
  let output = '';
  let searchFrom = 0;
  const lowerValue = value.toLowerCase();

  while (searchFrom < value.length) {
    const start = lowerValue.indexOf(DATA_URI_PREFIX, searchFrom);
    if (start < 0) {
      break;
    }

    const end = findInlineDataUriEnd(value, start, lowerValue);

    output += value.slice(cursor, start);
    output += summarizeDataUriForInlineText(value.slice(start, end));
    cursor = end;
    searchFrom = end;
  }

  if (cursor === 0) {
    return value;
  }
  return output + value.slice(cursor);
}

export function sanitizeLogString(value: string, options: SanitizeLogOptions = {}): SanitizedLogValue {
  const resolved = resolveOptions(options);
  if (isDataUriString(value)) {
    return summarizeDataUri(value);
  }

  const withoutDataUris = replaceInlineDataUris(value);
  if (withoutDataUris.length <= resolved.maxStringLength) {
    return withoutDataUris;
  }

  const marker = `[truncated length=${withoutDataUris.length} hash=${hashString(withoutDataUris)}]`;
  const available = Math.max(24, resolved.maxStringLength - marker.length - 6);
  const headLength = Math.ceil(available * 0.65);
  const tailLength = Math.max(8, available - headLength);
  return `${withoutDataUris.slice(0, headLength)}...${marker}...${withoutDataUris.slice(-tailLength)}`;
}

export function sanitizeLogValue(
  value: unknown,
  options: SanitizeLogOptions = {},
  depth = 0,
  seen = new WeakSet<object>()
): SanitizedLogValue {
  const resolved = resolveOptions(options);

  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'string') {
    return sanitizeLogString(value, resolved);
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'bigint') {
    return sanitizeLogString(value.toString(), resolved);
  }
  if (typeof value === 'symbol' || typeof value === 'function') {
    return sanitizeLogString(String(value), resolved);
  }

  if (depth >= resolved.maxDepth) {
    return sanitizeLogString(String(value), resolved);
  }

  if (typeof value === 'object') {
    if (seen.has(value)) {
      return '[Circular]';
    }
    seen.add(value);
  }

  if (value instanceof Error) {
    return {
      name: sanitizeLogString(value.name, resolved),
      message: sanitizeLogString(value.message, resolved),
      stack: value.stack
        ? sanitizeLogString(
            value.stack
              .split('\n')
              .slice(0, 8)
              .join('\n'),
            { ...resolved, maxStringLength: Math.max(resolved.maxStringLength, 640) }
          )
        : null,
      cause: value.cause ? sanitizeLogValue(value.cause, resolved, depth + 1, seen) : null
    };
  }

  if (value instanceof URL) {
    return sanitizeLogString(value.toString(), resolved);
  }

  if (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement) {
    return {
      tag: value.tagName.toLowerCase(),
      id: value.id || null,
      className: sanitizeLogString(String(value.className || ''), resolved),
      src: value.getAttribute('src') ? sanitizeLogString(value.getAttribute('src')!, resolved) : null,
      href: value.getAttribute('href') ? sanitizeLogString(value.getAttribute('href')!, resolved) : null
    };
  }

  if (Array.isArray(value)) {
    const items = value
      .slice(0, resolved.maxArrayLength)
      .map((entry) => sanitizeLogValue(entry, resolved, depth + 1, seen));
    if (value.length > resolved.maxArrayLength) {
      items.push(`[+${value.length - resolved.maxArrayLength} more]`);
    }
    return items;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    const sanitizedEntries = entries.slice(0, resolved.maxObjectEntries).map(([key, nestedValue]) => [
      key,
      sanitizeLogValue(nestedValue, resolved, depth + 1, seen)
    ]);
    if (entries.length > resolved.maxObjectEntries) {
      sanitizedEntries.push(['__truncatedKeys', entries.length - resolved.maxObjectEntries]);
    }
    return Object.fromEntries(sanitizedEntries) as Record<string, SanitizedLogValue>;
  }

  return sanitizeLogString(String(value), resolved);
}

export function sanitizeLogRecord(data?: Record<string, unknown>, options: SanitizeLogOptions = {}) {
  if (!data) {
    return undefined;
  }
  const sanitized = sanitizeLogValue(data, options);
  return sanitized && typeof sanitized === 'object' && !Array.isArray(sanitized)
    ? (sanitized as Record<string, SanitizedLogValue>)
    : { payload: sanitized };
}

export function decodeDataUriText(value: string) {
  if (!isDataUriString(value)) {
    return null;
  }

  const commaIndex = value.indexOf(',');
  if (commaIndex < 0) {
    return null;
  }

  const metadata = value.slice(DATA_URI_PREFIX.length, commaIndex).toLowerCase();
  const payload = value.slice(commaIndex + 1);

  try {
    if (metadata.includes(';base64')) {
      return atob(payload);
    }
    return decodeURIComponent(payload.replace(/\+/g, '%20'));
  } catch {
    return null;
  }
}
