/**
 * This file has no runtime logic — it exists purely as documentation.
 *
 * The project doesn't use TypeScript, so instead of a `.ts` interface we
 * document the exact shape the backend promises to return (and that
 * lib/validateResult.js checks for) using JSDoc typedefs. Editors like
 * VS Code pick these up automatically and will show you this shape as
 * autocomplete/hover info anywhere you type `recipe.` in the codebase.
 *
 * This is the single source of truth for "what does a recipe object look
 * like" — if you ever change the backend's Zod schema (backend/src/schema/
 * recipeSchema.js), update this file to match.
 */

/**
 * @typedef {Object} Ingredient
 * @property {string} id            - Stable unique id, e.g. "i1"
 * @property {string} name          - Ingredient name, e.g. "Chicken"
 * @property {number} amount        - Numeric quantity at baseServings, e.g. 300
 * @property {string} unit          - Unit for the amount, e.g. "g", "cup", "tsp"
 */

/**
 * @typedef {Object} Step
 * @property {string} id            - Stable unique id, e.g. "s1"
 * @property {string} text          - Instruction text, e.g. "Cook the chicken"
 */

/**
 * @typedef {Object} Swap
 * @property {string} ingredientId  - Matches an Ingredient.id above
 * @property {string[]} options     - Alternative ingredient names, e.g. ["tofu", "paneer"]
 */

/**
 * @typedef {Object} Recipe
 * @property {string} recipeName
 * @property {string} description
 * @property {number} baseServings  - The serving count the listed amounts are written for
 * @property {Ingredient[]} ingredients
 * @property {Step[]} steps
 * @property {Swap[]} swaps
 */

// Nothing to export at runtime - this file is imported for its JSDoc only.
export {};
