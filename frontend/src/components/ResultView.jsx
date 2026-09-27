import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import RecipeCard from "./RecipeCard";

/**
 * Takes the raw state from useRecipeGenerator and decides which UI to show.
 * This is the ONE place in the app with a "what state are we in" switch -
 * every other component only ever renders one specific state, which keeps
 * them simple and easy to test/reason about in isolation.
 */
export default function ResultView({
  status,
  recipe,
  errorMessage,
  onRetry,
  onReset,
  generationId,
}) {
  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "error") {
    return <ErrorState message={errorMessage} onRetry={onRetry} />;
  }

  if (status === "success" && recipe) {
    return (
      <div className="ticket-reveal">
        {/* key={generationId} forces a clean remount on every new recipe,
            so servings/checklist/swap state never leaks from the last result. */}
        <RecipeCard key={generationId} recipe={recipe} />
        <button type="button" className="btn-text" onClick={onReset}>
          Start a new search
        </button>
      </div>
    );
  }

  return <EmptyState />;
}
