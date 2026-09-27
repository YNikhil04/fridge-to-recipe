// Pure math because the backend schema stores amount/unit as separate
// numeric + string fields (see backend/src/schema/recipeSchema.js) instead
// of a free-text string like "1 medium onion" - that's what makes this a
// one-line calculation instead of a parsing problem.
export function scaleIngredients(ingredients, baseServings, currentServings) {
  if (!baseServings || baseServings <= 0) return ingredients;
  const factor = currentServings / baseServings;

  return ingredients.map((ing) => ({
    ...ing,
    scaledAmount: Math.round(ing.amount * factor * 100) / 100,
  }));
}
