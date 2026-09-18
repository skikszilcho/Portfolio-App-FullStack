const BaseLLMAdapter = require('./base.adapter');

// TODO: To implement OpenAI support:
//   1. npm install openai
//   2. import OpenAI from 'openai'
//   3. Implement chat() using openai.chat.completions.create()
//   See: https://platform.openai.com/docs/api-reference/chat
class OpenAIAdapter extends BaseLLMAdapter {
  async chat(_messages, _systemPrompt) {
    throw new Error('NotImplementedError: OpenAI adapter not yet implemented. See comments above.');
  }
}

module.exports = OpenAIAdapter;