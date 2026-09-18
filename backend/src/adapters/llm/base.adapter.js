// Extend this class to add a new LLM provider.
// Implement one method: async chat(messages, systemPrompt) → string
//   messages:     Array<{ role: 'user' | 'assistant', content: string }>
//   systemPrompt: string
//   returns:      string — the assistant's reply
class BaseLLMAdapter {
  async chat(_messages, _systemPrompt) {
    throw new Error('NotImplementedError: chat() must be implemented by subclass');
  }
}

module.exports = BaseLLMAdapter;