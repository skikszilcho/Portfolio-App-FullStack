// Load .env FIRST — before anything else reads process.env.
// dotenv.config() must live here (not only in server.js) because env.js is
// required by app.js and adapters before server.js finishes executing.
require('dotenv').config();
const path = require('path');

// Validates required environment variables at startup.
// If a required var is missing, the process exits immediately with a clear message.
const required = ['LLM_PROVIDER', 'LLM_API_KEY', 'LLM_MODEL'];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

module.exports = {
  PORT:          process.env.PORT          || 5000,
  CLIENT_URL:    process.env.CLIENT_URL    || 'http://localhost:3000',
  LLM_PROVIDER:  process.env.LLM_PROVIDER,
  LLM_API_KEY:   process.env.LLM_API_KEY,
  LLM_MODEL:     process.env.LLM_MODEL,
  AXIOM_API_KEY: process.env.AXIOM_API_KEY || null,
  AXIOM_DATASET: process.env.AXIOM_DATASET || 'portfolio-events',
  QUOTA_DB_PATH: process.env.QUOTA_DB_PATH || path.join(__dirname, '../../data/quota.db'),
};