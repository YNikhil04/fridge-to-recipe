import { useMemo, useState } from "react";
import ServingScaler from "./ServingScaler";
import IngredientList from "./IngredientList";
import StepChecklist from "./StepChecklist";
import { scaleIngredients } from "../lib/scaleIngredients";

/**
 * All the "once we have a valid recipe, what can the user DO with it"
 * interactivity lives here: scaling servings, checking off steps, and
 * swapping ingredients. This is the component that turns a static AI
 * response into something actually interactive - see the assignment's
 * "must not be a chatbot" requirement.
 *
 * Local state (servings/completedSteps/swappedNames) intentionally resets
 * every time a NEW recipe comes in, because ResultView renders this with
 * key={generationId} - a fresh key means React throws away the old
 * component instance and mounts a brand new one.
 */
export default function RecipeCard({ recipe }) {
  const [servings, setServings] = useState(recipe.baseServings);
  const [completedSteps, setCompletedSteps] = useState(() => new Set());
  const [swappedNames, setSwappedNames] = useState({});

  const scaledIngredients = useMemo(
    () => scaleIngredients(recipe.ingredients, recipe.baseServings, servings),
    [recipe.ingredients, recipe.baseServings, servings],
  );

  const swapsByIngredientId = useMemo(() => {
    const map = {};
    (recipe.swaps || []).forEach((s) => {
      map[s.ingredientId] = s.options;
    });
    return map;
  }, [recipe.swaps]);

  function toggleStep(id) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSwap(ingredientId, name) {
    setSwappedNames((prev) => ({ ...prev, [ingredientId]: name }));
  }

  return (
    <div className="recipe-ticket">
      <h2 className="recipe-name">{recipe.recipeName}</h2>
      {recipe.description && <p className="recipe-description">{recipe.description}</p>}

      <ServingScaler servings={servings} onChange={setServings} />

      <h3>Ingredients</h3>
      <IngredientList
        ingredients={scaledIngredients}
        swapsByIngredientId={swapsByIngredientId}
        swappedNames={swappedNames}
        onSwap={handleSwap}
      />

      <h3>Instructions</h3>
      <StepChecklist
        steps={recipe.steps}
        completedSteps={completedSteps}
        onToggle={toggleStep}
      />
    </div>
  );
}
