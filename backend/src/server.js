/**
 * server.js — Application entry point.
 *
 * WHAT TO CHANGE:
 *  - PORT: set via .env (default 5000). Change if your infrastructure requires a different port.
 *  - Add additional middleware imports below the existing ones (e.g. rate-limiting, sessions).
 *  - Mount additional route groups under the "Routes" section.
 */

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
