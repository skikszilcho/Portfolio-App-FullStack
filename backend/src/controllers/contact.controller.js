const { asyncHandler } = require('../utils/helpers');
const { sendContactEmail } = require('../services/email.service');
const { logEvent, hashIp } = require('../middleware/monitor');

// Simple email regex — same pattern as frontend validateEmail() in helpers.js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contact = asyncHandler(async (req, res) => {
  const { fullName, email, mobileNumber, subject, message } = req.body;

  // ── Validation ────────────────────────────────────────────────────────────
  if (!fullName?.trim())      return res.status(400).json({ error: 'Full name is required.' });
  if (!EMAIL_REGEX.test(email)) return res.status(400).json({ error: 'Invalid email address.' });
  if (!mobileNumber?.trim())  return res.status(400).json({ error: 'Mobile number is required.' });
  if (!subject?.trim())       return res.status(400).json({ error: 'Subject is required.' });
  if (!message?.trim())       return res.status(400).json({ error: 'Message is required.' });

  // ── Send ──────────────────────────────────────────────────────────────────
  try {
    await sendContactEmail({ fullName, email, mobileNumber, subject, message });

    logEvent({
      event_type: 'contact_submission',
      ip_hash:    hashIp(req.ip),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    logEvent({
      event_type:    'contact_error',
      ip_hash:       hashIp(req.ip),
      error_message: err.message,
    });
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

module.exports = { contact };