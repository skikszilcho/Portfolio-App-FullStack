const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const { CLIENT_URL } = require('./config/env');

const healthRouter = require('./routes/health.route');
// chatRouter is added in step 4.5 — mount it here when ready:
const chatRouter = require('./routes/chat.route');

const app = express();

app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRouter);
app.use('/api/chat', chatRouter);  //← uncomment in step 4.5

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;