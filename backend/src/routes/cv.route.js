const { Router } = require('express');
const { cv } = require('../controllers/cv.controller');

const router = Router();

// Public endpoint — no auth, no quota guard.
// abuseRateLimiter is intentionally omitted: CV downloads are not a spam vector.
router.get('/', cv);

module.exports = router;
