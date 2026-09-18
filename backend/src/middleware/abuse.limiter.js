const rateLimit = require('express-rate-limit');

// Per-IP abuse throttle: 30 requests per 15 minutes.
// This is NOT the Gemini quota guard. It protects against obvious bot abuse.
// Resets on server restart — that is acceptable.
const abuseRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP. Please try again later.' },
});

module.exports = { abuseRateLimiter };