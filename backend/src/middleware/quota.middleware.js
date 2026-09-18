const { hashIp } = require('./monitor');
const quotaGuard = require('../quota/quota.guard');

// Human-readable 429 messages per reason code.
const QUOTA_MESSAGES = {
  concurrency: 'Skikszilcho is handling another conversation right now. Please wait a moment and try again.',
  rpm:         'Skikszilcho is a little overwhelmed right now. Please wait a minute and try again.',
  tpm:         'Skikszilcho is a little overwhelmed right now. Please wait a minute and try again.',
  rpd:         'Skikszilcho is taking a short break — the daily conversation quota has been reached. Come back tomorrow and we\'ll pick up where we left off.',
  session:     'You\'ve reached the chat limit for today. Skikszilcho will be back for you tomorrow.',
};

function quotaMiddleware(req, res, next) {
  const sessionId = req.headers['x-session-id'] || 'anonymous';
  const hashedIp  = hashIp(req.ip);

  // Estimate tokens from the already-parsed body
  const { messages = [] } = req.body;
  // SYSTEM_PROMPT length is approximated here; exact value is in the controller.
  // Over-estimation is safe for a soft-limit guard.
  const SYSTEM_PROMPT_CHAR_ESTIMATE = 8000;
  const totalChars = messages.reduce((a, m) => a + (m.content || '').length, 0) + SYSTEM_PROMPT_CHAR_ESTIMATE;
  const estimatedTokens = Math.ceil(totalChars / 4);

  quotaGuard.check(sessionId, hashedIp, estimatedTokens).then(({ allowed, reason, sessionKey }) => {
    if (!allowed) {
      return res.status(429).json({ error: QUOTA_MESSAGES[reason] || 'Rate limit exceeded.' });
    }
    // Attach guard state to req for the controller to use in release/reconcile
    req.quotaSessionKey  = sessionKey;
    req.quotaEstimated   = estimatedTokens;
    next();
  }).catch(next);
}

module.exports = { quotaMiddleware };