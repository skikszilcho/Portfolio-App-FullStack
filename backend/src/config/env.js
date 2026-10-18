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
  
    // Email Relay
  GMAIL_USER:              process.env.GMAIL_USER              || null,
  GMAIL_APP_PASSWORD:      process.env.GMAIL_APP_PASSWORD      || null,
  CONTACT_RECIPIENT_EMAIL: process.env.CONTACT_RECIPIENT_EMAIL || null,

  // Cloudflare R2
  R2_ACCOUNT_ID:       process.env.R2_ACCOUNT_ID       || null,
  R2_ACCESS_KEY_ID:    process.env.R2_ACCESS_KEY_ID    || null,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY || null,
  R2_BUCKET_NAME:      process.env.R2_BUCKET_NAME      || null,
  R2_CV_OBJECT_KEY:    process.env.R2_CV_OBJECT_KEY    || 'cv.pdf',
};