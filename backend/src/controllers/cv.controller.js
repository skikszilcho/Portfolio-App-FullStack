const { asyncHandler } = require('../utils/helpers');
const { getCvSignedUrl } = require('../services/r2.service');
const { logEvent, hashIp } = require('../middleware/monitor');

const cv = asyncHandler(async (req, res) => {
  try {
    const url = await getCvSignedUrl();

    // Fire-and-forget monitoring event
    logEvent({
      event_type: 'cv_download',
      ip_hash:    hashIp(req.ip),
    });

    return res.status(200).json({ url });
  } catch (err) {
    logEvent({
      event_type:    'cv_error',
      ip_hash:       hashIp(req.ip),
      error_message: err.message,
    });
    return res.status(500).json({ error: 'CV unavailable. Please try again.' });
  }
});

module.exports = { cv };
