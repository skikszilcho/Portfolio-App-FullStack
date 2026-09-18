const crypto = require('crypto');
const store = require('./quota.store');

// ── Limits ────────────────────────────────────────────────────────────────────
const LIMITS = {
  RPM_SOFT: 12, RPM_HARD: 15,
  TPM_SOFT: 200_000, TPM_HARD: 250_000,
  RPD_SOFT: 450, RPD_HARD: 500,
};

// ── In-process rolling window state (60 seconds) ──────────────────────────────
let rpmWindow   = { count: 0, start: Date.now() };
let tpmWindow   = { tokens: 0, start: Date.now() };

function resetWindowIfExpired() {
  const now = Date.now();
  if (now - rpmWindow.start >= 60_000) rpmWindow = { count: 0, start: now };
  if (now - tpmWindow.start >= 60_000) tpmWindow = { tokens: 0, start: now };
}

// ── Concurrency limiter ───────────────────────────────────────────────────────
const MAX_CONCURRENT = 2;
let activeRequests = 0;

// ── Session key ───────────────────────────────────────────────────────────────
function buildSessionKey(sessionId, hashedIp) {
  return crypto.createHash('sha256').update(`${sessionId}:${hashedIp}`).digest('hex').slice(0, 32);
}

// ── Token estimate (before dispatch) ─────────────────────────────────────────
// Conservative: 1 token ≈ 4 characters. Overestimates = safe for a soft limit.
function estimateTokens(messages, systemPrompt) {
  const total = messages.reduce((acc, m) => acc + m.content.length, 0) + systemPrompt.length;
  return Math.ceil(total / 4);
}

// ── check() ───────────────────────────────────────────────────────────────────
// Call before dispatching to Gemini. Returns { allowed, reason, sessionKey }.
// If allowed, the caller must eventually call release().
async function check(sessionId, hashedIp, estimatedTokens) {
  resetWindowIfExpired();

  // 1. Concurrency
  if (activeRequests >= MAX_CONCURRENT) {
    return { allowed: false, reason: 'concurrency', sessionKey: null };
  }

  // 2. RPM
  if (rpmWindow.count >= LIMITS.RPM_SOFT) {
    return { allowed: false, reason: 'rpm', sessionKey: null };
  }

  // 3. TPM
  if (tpmWindow.tokens + estimatedTokens > LIMITS.TPM_SOFT) {
    return { allowed: false, reason: 'tpm', sessionKey: null };
  }

  // 4. RPD (SQLite)
  const dailyCount = store.getDailyCount();
  if (dailyCount >= LIMITS.RPD_SOFT) {
    return { allowed: false, reason: 'rpd', sessionKey: null };
  }

  // 5. Per-session (SQLite)
  const sessionKey = buildSessionKey(sessionId, hashedIp);
  const session = store.getSessionCount(sessionKey);
  if (!session.expired && session.count >= store.SESSION_HARD_LIMIT) {
    return { allowed: false, reason: 'session', sessionKey };
  }

  // All checks passed — reserve slot
  activeRequests++;
  rpmWindow.count++;
  tpmWindow.tokens += estimatedTokens;

  return { allowed: true, reason: null, sessionKey };
}

// ── release() ─────────────────────────────────────────────────────────────────
// Always call in a finally block after check() returns allowed: true.
function release() {
  activeRequests = Math.max(0, activeRequests - 1);
}

// ── reconcile() ───────────────────────────────────────────────────────────────
// Call after a successful generation with the actual promptTokenCount from
// usageMetadata. Corrects the TPM running total and increments persistent counts.
function reconcile(sessionKey, actualInputTokens, estimatedTokens) {
  // Correct TPM: replace estimate with actual
  tpmWindow.tokens = Math.max(0, tpmWindow.tokens - estimatedTokens + actualInputTokens);
  // Persist RPD and session counts
  store.incrementDailyCount();
  if (sessionKey) store.incrementSessionCount(sessionKey);
}

module.exports = { check, release, reconcile, estimateTokens };