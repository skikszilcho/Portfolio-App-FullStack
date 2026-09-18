const { GoogleGenerativeAI } = require('@google/generative-ai');
const BaseLLMAdapter = require('./base.adapter');
const { LLM_API_KEY, LLM_MODEL } = require('../../config/env');

class GeminiAdapter extends BaseLLMAdapter {
  constructor() {
    super();
    this.genAI = new GoogleGenerativeAI(LLM_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: LLM_MODEL });
  }

  async chat(messages, systemPrompt) {
    // Gemini uses { role: 'user' | 'model', parts: [{ text }] }
    // Our standard format uses role: 'assistant' — translate here.
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const lastUserMessage = messages.at(-1).content;

    const chat = this.model.startChat({
      history,
      systemInstruction: { parts: [{ text: systemPrompt }] },
    });

    const result = await chat.sendMessage(lastUserMessage);
    const reply = result.response.text();
    const usage = result.response.usageMetadata || {};
    
    return {
      reply,
      inputTokens:  usage.promptTokenCount     || null,
      outputTokens: usage.candidatesTokenCount  || null,
      totalTokens:  usage.totalTokenCount       || null,
    };
  }
}

module.exports = GeminiAdapter;