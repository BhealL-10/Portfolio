import { createServer } from 'node:http';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const PORT = Number(process.env.PORT || 8080);
const DATA_DIR = process.env.LEADERBOARD_DATA_DIR || '/data';
const DATA_FILE = join(DATA_DIR, 'leaderboard.json');
const ACHIEVEMENT_RESET_FILE = join(DATA_DIR, 'achievement-reset.json');
const MAX_ENTRIES = 100;

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, status, text) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(text);
}

function normalizeName(value) {
  return typeof value === 'string' ? value.trim().slice(0, 18) : '';
}

function normalizeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function normalizeAvatar(avatar) {
  if (!avatar || typeof avatar !== 'object') {
    return undefined;
  }
  return {
    background: normalizeNumber(avatar.background),
    motif: normalizeNumber(avatar.motif),
    face: normalizeNumber(avatar.face),
    eyes: normalizeNumber(avatar.eyes),
    barbe: normalizeNumber(avatar.barbe)
  };
}

function normalizeDetails(details) {
  if (!details || typeof details !== 'object') {
    return undefined;
  }
  return {
    distanceMeters: normalizeNumber(details.distanceMeters),
    shardsLanded: normalizeNumber(details.shardsLanded),
    coinsCollected: normalizeNumber(details.coinsCollected),
    enemiesKilled: normalizeNumber(details.enemiesKilled),
    longestMomentumSeconds: normalizeNumber(details.longestMomentumSeconds)
  };
}

function getEntryIdentity(entry) {
  const playerId = typeof entry.playerId === 'string' ? entry.playerId.trim() : '';
  if (playerId) {
    return `id:${playerId}`;
  }
  return `legacy:${normalizeName(entry.name).toLocaleLowerCase('en-US')}`;
}

function normalizeEntry(entry) {
  const name = normalizeName(entry?.name);
  return {
    playerId: typeof entry?.playerId === 'string' && entry.playerId.trim() ? entry.playerId.trim() : undefined,
    name: name || 'Anonymous',
    score: Math.max(0, Math.round(normalizeNumber(entry?.score))),
    recordedAt: normalizeNumber(entry?.recordedAt) || Date.now(),
    avatar: normalizeAvatar(entry?.avatar),
    details: normalizeDetails(entry?.details)
  };
}

function dedupeAndSort(entries) {
  const map = new Map();
  for (const entry of entries.map(normalizeEntry)) {
    const key = getEntryIdentity(entry);
    const existing = map.get(key);
    if (!existing || entry.score > existing.score || (entry.score === existing.score && entry.recordedAt < existing.recordedAt)) {
      map.set(key, entry);
    }
  }
  return [...map.values()]
    .sort((a, b) => b.score - a.score || a.recordedAt - b.recordedAt)
    .slice(0, MAX_ENTRIES);
}

async function ensureDataFile() {
  await mkdir(dirname(DATA_FILE), { recursive: true });
  if (!existsSync(DATA_FILE)) {
    await writeFile(DATA_FILE, '[]\n', 'utf8');
  }
  if (!existsSync(ACHIEVEMENT_RESET_FILE)) {
    await writeFile(ACHIEVEMENT_RESET_FILE, `${JSON.stringify({ token: '0' }, null, 2)}\n`, 'utf8');
  }
}

async function readLeaderboard() {
  await ensureDataFile();
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return dedupeAndSort(parsed);
  } catch {
    return [];
  }
}

async function writeLeaderboard(entries) {
  await ensureDataFile();
  const normalized = dedupeAndSort(entries);
  const tempFile = `${DATA_FILE}.tmp`;
  await writeFile(tempFile, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
  await rename(tempFile, DATA_FILE);
  return normalized;
}

async function readAchievementResetToken() {
  await ensureDataFile();
  try {
    const raw = await readFile(ACHIEVEMENT_RESET_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return typeof parsed?.token === 'string' && parsed.token.trim() ? parsed.token.trim() : '0';
  } catch {
    return '0';
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 64) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

const server = createServer(async (req, res) => {
  try {
    if (!req.url) {
      sendText(res, 404, 'Not found');
      return;
    }

    const url = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && url.pathname === '/health') {
      sendText(res, 200, 'ok\n');
      return;
    }

    if (url.pathname !== '/leaderboard') {
      sendText(res, 404, 'Not found');
      return;
    }

    if (req.method === 'GET') {
      const entries = await readLeaderboard();
      const achievementResetToken = await readAchievementResetToken();
      sendJson(res, 200, { entries, achievementResetToken });
      return;
    }

    if (req.method === 'POST') {
      const rawBody = await readRequestBody(req);
      const parsed = rawBody ? JSON.parse(rawBody) : {};
      const incomingEntry = normalizeEntry(parsed?.entry ?? parsed);
      const currentEntries = await readLeaderboard();
      const nextEntries = dedupeAndSort([...currentEntries, incomingEntry]);
      const persisted = await writeLeaderboard(nextEntries);
      const achievementResetToken = await readAchievementResetToken();
      sendJson(res, 200, { entries: persisted, saved: incomingEntry, achievementResetToken });
      return;
    }

    sendText(res, 405, 'Method not allowed');
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[leaderboard] listening on :${PORT}`);
});
