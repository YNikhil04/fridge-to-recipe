export function isValidRecipe(data) {
  if (!data || typeof data !== "object") return false;
  if (typeof data.recipeName !== "string" || !data.recipeName.trim())
    return false;
  if (typeof data.baseServings !== "number" || data.baseServings <= 0)
    return false;

  if (!Array.isArray(data.ingredients) || data.ingredients.length === 0)
    return false;
  const ingredientsValid = data.ingredients.every(
    (i) =>
      i &&
      typeof i.id === "string" &&
      typeof i.name === "string" &&
      typeof i.amount === "number" &&
      i.amount > 0 &&
      typeof i.unit === "string",
  );
  if (!ingredientsValid) return false;

  if (!Array.isArray(data.steps) || data.steps.length === 0) return false;
  const stepsValid = data.steps.every(
    (s) =>
      s &&
      typeof s.id === "string" &&
      typeof s.text === "string" &&
      s.text.trim(),
  );
  if (!stepsValid) return false;

  if (data.swaps && !Array.isArray(data.swaps)) return false;

  return true;
}
