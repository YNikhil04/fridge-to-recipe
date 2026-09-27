const { recipeChain } = require("../ai/chain");
const { withTimeout } = require("./withTimeout");

const TIMEOUT_MS = 15000;
const MAX_ATTEMPTS = 2;

async function generateRecipe(ingredients) {
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await withTimeout(recipeChain.invoke({ ingredients }), TIMEOUT_MS);
    } catch (err) {
      lastError = err;
      console.error(
        `Recipe generation attempt ${attempt} failed:`,
        err.message,
      );
    }
  }

  throw lastError;
}

module.exports = { generateRecipe };
