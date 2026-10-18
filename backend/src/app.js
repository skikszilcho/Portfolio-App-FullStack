const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const { CLIENT_URL } = require('./config/env');

const healthRouter  = require('./routes/health.route');
const chatRouter    = require('./routes/chat.route');
const contactRouter = require('./routes/contact.route');
const cvRouter      = require('./routes/cv.route');         // added in step 5.4

const app = express();

app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health',  healthRouter);
app.use('/api/chat',    chatRouter);
app.use('/api/contact', contactRouter);
app.use('/api/cv',      cvRouter);                         // added in step 5.4

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;