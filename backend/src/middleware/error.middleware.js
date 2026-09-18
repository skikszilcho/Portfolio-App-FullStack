/**
 * error.middleware.js — Centralised validation helper and error handler.

 */

// ── Global error handler ──────────────────────────────────────────────────────
// Mounted LAST in app.js via: app.use(errorHandler)
// Receives any error passed to next(err) from controllers or middleware.
// CHANGE: customise the response shape to match your API contract.
const errorHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  const status  = err.status  || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ error: message });
};

module.exports = { validate, errorHandler };
