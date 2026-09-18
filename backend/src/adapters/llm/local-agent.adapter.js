const BaseLLMAdapter = require('./base.adapter');

// TODO: To implement local-agent support:
//   POST to process.env.LOCAL_AGENT_URL + '/api/chat' with the messages payload.
//   See local-agent/src/mcp_server.py for the expected request/response shape.
class LocalAgentAdapter extends BaseLLMAdapter {
  async chat(_messages, _systemPrompt) {
    throw new Error('NotImplementedError: local-agent adapter not yet implemented. See comments above.');
  }
}

module.exports = LocalAgentAdapter;