const crypto = require('crypto');
const { axiomClient, AXIOM_DATASET } = require('../config/axiom');

// ── IP hashing ────────────────────────────────────────────────────────────────
// Never log raw IPs. Hash with SHA-256 for privacy-safe identification.
function hashIp(ip) {
  return crypto.createHash('sha256').update(ip || 'unknown').digest('hex').slice(0, 16);
}

// ── logEvent ──────────────────────────────────────────────────────────────────
// Fire-and-forget structured event logging.
// Never await this — it must never block the request.
function logEvent(eventData) {
  const event = {
    timestamp: new Date().toISOString(),
    ...eventData,
  };

  if (axiomClient) {
    // Non-blocking: ingest and flush asynchronously
    axiomClient.ingest(AXIOM_DATASET, [event]);
    axiomClient.flush().catch((err) => {
      console.error('[monitor] Axiom flush failed:', err.message);
    });
  } else {
    console.log('[monitor]', JSON.stringify(event));
  }
}
module.exports = { logEvent, hashIp };