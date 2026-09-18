const { LLM_PROVIDER } = require('../../config/env');

const providers = {
  gemini:        require('./gemini.adapter'),
  openai:        require('./openai.adapter'),
  'local-agent': require('./local-agent.adapter'),
};

const AdapterClass = providers[LLM_PROVIDER];
if (!AdapterClass) {
  throw new Error(`Unknown LLM_PROVIDER: "${LLM_PROVIDER}". Valid options: ${Object.keys(providers).join(', ')}`);
}

module.exports = new AdapterClass();