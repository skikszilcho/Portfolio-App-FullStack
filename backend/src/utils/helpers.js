/**
 * helpers.js — Shared utility functions.
 *
 * WHAT TO CHANGE:
 *  - Add any pure helper functions your app needs here.
 *  - Keep this file free of business logic — it should contain only reusable utilities.
 */

// ── asyncHandler ─────────────────────────────────────────────────────────────
// Wraps an async route handler so that any thrown errors are forwarded to
// Express's global error handler via next(err), avoiding try/catch boilerplate.
//
// Usage:
//   const getAll = asyncHandler(async (req, res) => {
//     const data = await SomeModel.findAll();
//     res.json(data);
//   });
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ── formatResponse ────────────────────────────────────────────────────────────
// Wraps data in a consistent API envelope.
// CHANGE: adjust the shape to match your API contract, or remove if not needed.
//
// Usage: res.json(formatResponse(data, 'Users fetched'));
const formatResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data,
});

// ── paginate ──────────────────────────────────────────────────────────────────
// Extracts and normalises `page` and `limit` from query parameters.
//
// Usage:
//   const { page, limit, offset } = paginate(req.query);
//   const items = await pool.query('SELECT * FROM examples LIMIT $1 OFFSET $2', [limit, offset]);
const paginate = (query) => {
  const page  = Math.max(1, parseInt(query.page, 10)  || 1);
  const limit = Math.min(100, parseInt(query.limit, 10) || 20);
  return { page, limit, offset: (page - 1) * limit };
};

module.exports = { asyncHandler, formatResponse, paginate };
