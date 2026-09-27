const { z } = require("zod");

// This is the single source of truth for "what does a recipe look like."
// It's used in TWO places:
//   1. src/ai/chain.js passes this to withStructuredOutput() so the model
//      is forced to return data matching this exact shape.
//   2. If you ever add server-side re-validation beyond what LangChain
//      does, you'd import recipeSchema and call .safeParse() here too.
// The frontend has its own copy of this shape's logic in
// frontend/src/lib/validateResult.js (JS, not Zod, since the frontend
// doesn't share this package) - if you change one, change the other.

const recipeSchema = z.object({
  recipeName: z.string().describe("Name of the Recipe"),

  description: z.string().describe("One-Sentence Description"),

  baseServings: z.number().int().positive(),

  ingredients: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        amount: z.number().positive(),
        unit: z.string(),
      }),
    )
    .min(1),
  steps: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
    )
    .min(1),
  swaps: z.array(
    z.object({
      ingredientId: z.string(),
      options: z.array(z.string()),
    }),
  ),
});

module.exports = { recipeSchema };
