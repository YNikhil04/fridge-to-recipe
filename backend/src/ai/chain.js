const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { recipeSchema } = require("../schema/recipeSchema");

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  temperature: 0.3,
});

const structuredModel = model.withStructuredOutput(recipeSchema, {
  name: "generate_recipe",
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a recipe generator. Given a list of ingredients the user
has on hand, create one practical recipe using mostly those ingredients.
Use numeric amount + unit fields separately (e.g. amount: 300, unit: "g"),
never combine them into one string. For each main ingredient, suggest 1-3
realistic substitutes in swaps.`,
  ],
  ["human", "Ingredients available: {ingredients}"],
]);

const recipeChain = prompt.pipe(structuredModel);

module.exports = { model, recipeChain };
