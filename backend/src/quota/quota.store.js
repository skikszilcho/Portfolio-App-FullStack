const db = require('./db');

// Returns current LA date string: 'YYYY-MM-DD'
function getLADateString() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
}

// ── RPD (daily quota) ─────────────────────────────────────────────────────────

function getDailyCount() {
  const today = getLADateString();
  const row = db.prepare(`SELECT request_count FROM daily_quota WHERE date = ?`).get(today);
  return row ? row.request_count : 0;
}

function incrementDailyCount() {
  const today = getLADateString();
  db.prepare(`
    INSERT INTO daily_quota (date, request_count)
    VALUES (?, 1)
    ON CONFLICT(date) DO UPDATE SET request_count = request_count + 1
  `).run(today);
}

// ── Per-session (24-hour window) ──────────────────────────────────────────────

const SESSION_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const SESSION_HARD_LIMIT = 30;

function getSessionCount(sessionKey) {
  const row = db.prepare(`SELECT request_count, window_start FROM ip_sessions WHERE session_key = ?`).get(sessionKey);
  if (!row) return { count: 0, expired: true };
  const windowStart = new Date(row.window_start).getTime();
  const expired = Date.now() - windowStart > SESSION_WINDOW_MS;
  return { count: row.request_count, expired };
}

function incrementSessionCount(sessionKey) {
  const now = new Date().toISOString();
  const existing = getSessionCount(sessionKey);
  if (!existing || existing.expired) {
    db.prepare(`
      INSERT INTO ip_sessions (session_key, request_count, window_start)
      VALUES (?, 1, ?)
      ON CONFLICT(session_key) DO UPDATE SET request_count = 1, window_start = ?
    `).run(sessionKey, now, now);
  } else {
    db.prepare(`
      UPDATE ip_sessions SET request_count = request_count + 1 WHERE session_key = ?
    `).run(sessionKey);
  }
}

module.exports = { getDailyCount, incrementDailyCount, getSessionCount, incrementSessionCount, SESSION_HARD_LIMIT };