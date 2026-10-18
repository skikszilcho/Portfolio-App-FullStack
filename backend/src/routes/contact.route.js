const { Router } = require('express');
const { abuseRateLimiter } = require('../middleware/abuse.limiter');
const { contact } = require('../controllers/contact.controller');

const router = Router();

// IP abuse guard (30 req / 15 min per IP) — same guard used on /api/chat.
// No quota guard needed — this route does not call the LLM.
router.post('/', abuseRateLimiter, contact);

module.exports = router;