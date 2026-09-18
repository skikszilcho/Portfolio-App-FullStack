const { Router } = require('express');
const { abuseRateLimiter } = require('../middleware/abuse.limiter');
const { quotaMiddleware }  = require('../middleware/quota.middleware');
const { chat }             = require('../controllers/chat.controller');

const router = Router();

// 1. IP abuse guard — per-IP, resets on restart, protects against bots
// 2. Gemini quota guard — project-wide, SQLite-backed, survives restarts
router.post('/', abuseRateLimiter, quotaMiddleware, chat);

module.exports = router;