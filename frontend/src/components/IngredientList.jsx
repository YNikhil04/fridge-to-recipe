import SwapPicker from "./SwapPicker";

export default function IngredientList({
  ingredients,
  swapsByIngredientId,
  swappedNames,
  onSwap,
}) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ing) => {
        const swapOptions = swapsByIngredientId[ing.id];
        const displayName = swappedNames[ing.id] || ing.name;

        return (
          <li key={ing.id} className="ingredient-item">
            <div className="ingredient-row">
              <span className="ingredient-name">{displayName}</span>
              <span className="ingredient-amount">
                {ing.scaledAmount} {ing.unit}
              </span>
            </div>
            {swapOptions && swapOptions.length > 0 && (
              <SwapPicker
                options={[ing.name, ...swapOptions]}
                activeName={displayName}
                onSelect={(name) => onSwap(ing.id, name)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
