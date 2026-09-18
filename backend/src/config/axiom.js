const { Axiom } = require('@axiomhq/js');
const { AXIOM_API_KEY, AXIOM_DATASET } = require('./env');

// Returns an Axiom client if configured, null otherwise.
// Callers must handle null (fall back to console.log).
let axiomClient = null;

if (AXIOM_API_KEY) {
  axiomClient = new Axiom({ token: AXIOM_API_KEY });
}

module.exports = { axiomClient, AXIOM_DATASET };