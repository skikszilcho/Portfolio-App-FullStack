const fs = require('fs');
const path = require('path');
const adapter = require('../adapters/llm/index');
const { asyncHandler } = require('../utils/helpers');
const { logEvent, hashIp } = require('../middleware/monitor');
const quotaGuard = require('../quota/quota.guard');

const SYSTEM_PROMPT = fs.readFileSync(
  path.join(__dirname, '../prompts/skikszilcho-system-prompt.md'),
  'utf-8'
);

const chat = asyncHandler(async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' });
  }

  const { sessionKey, quotaEstimated } = req;
  let reply, inputTokens, outputTokens, totalTokens;

  try {
    ({ reply, inputTokens, outputTokens, totalTokens } = await adapter.chat(messages, SYSTEM_PROMPT));

    // Reconcile: correct TPM estimate with actual, persist RPD + session counts
    quotaGuard.reconcile(sessionKey, inputTokens || quotaEstimated, quotaEstimated);

    logEvent({
      event_type:            'chat_request',
      ip_hash:               hashIp(req.ip),
      model:                 process.env.LLM_MODEL,
      session_message_count: messages.length,
      input_tokens:          inputTokens,
      output_tokens:         outputTokens,
      total_tokens:          totalTokens,
    });

    res.json({ reply });
  } catch (err) {
    logEvent({
      event_type:    'chat_error',
      ip_hash:       hashIp(req.ip),
      model:         process.env.LLM_MODEL,
      error_message: err.message,
    });
    throw err;
  } finally {
    quotaGuard.release();
  }
});

module.exports = { chat };