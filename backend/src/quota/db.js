const Database = require('better-sqlite3');
const path = require('path');
const { QUOTA_DB_PATH } = require('../config/env');

const db = new Database(QUOTA_DB_PATH);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS daily_quota (
    id          INTEGER PRIMARY KEY,
    date        TEXT NOT NULL UNIQUE,   -- YYYY-MM-DD in America/Los_Angeles
    request_count INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS ip_sessions (
    session_key   TEXT PRIMARY KEY,    -- SHA-256(sessionId + hashedIp)
    request_count INTEGER NOT NULL DEFAULT 0,
    window_start  TEXT NOT NULL,       -- ISO-8601
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Purge rows older than 7 days
function purgeOldRecords() {
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(`DELETE FROM daily_quota  WHERE created_at < ?`).run(cutoff);
  db.prepare(`DELETE FROM ip_sessions  WHERE created_at < ?`).run(cutoff);
  console.log('[quota/db] Purged records older than 7 days');
}

// Run purge on startup
purgeOldRecords();

// Schedule daily purge at midnight
function scheduleMidnightPurge() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const msUntilMidnight = midnight - now;
  setTimeout(() => {
    purgeOldRecords();
    setInterval(purgeOldRecords, 24 * 60 * 60 * 1000);
  }, msUntilMidnight);
}
scheduleMidnightPurge();

module.exports = db;