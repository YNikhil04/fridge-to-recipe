import { useRecipeGenerator } from "./hooks/useRecipeGenerator";
import IngredientInput from "./components/IngredientInput";
import ResultView from "./components/ResultView";
import SteamBowlIcon from "./components/icons/SteamBowlIcon";
import "./App.css";

// Split-screen layout: the left panel ("prep station") is where you tell
// us what you have, and stays put. The right panel ("the ticket") is
// where the result appears and scrolls independently - so the app never
// scrolls as a whole page, it behaves like a tool, not a landing page.
function App() {
  const { status, recipe, errorMessage, generate, retry, reset, generationId } =
    useRecipeGenerator();

  return (
    <div className="app-shell">
      <aside className="prep-panel">
        <div className="prep-panel-inner">
          <div className="brand-mark">
            <SteamBowlIcon className="brand-icon" />
            <span className="brand-name">Fridge → Recipe</span>
          </div>

          <h1>What's in your fridge?</h1>
          <p className="prep-subtitle">
            List what you've got. We'll turn it into a recipe you can actually cook.
          </p>

          <IngredientInput onSubmit={generate} disabled={status === "loading"} />
        </div>
      </aside>

      <main className="ticket-panel">
        <div className="ticket-panel-inner">
          <ResultView
            status={status}
            recipe={recipe}
            errorMessage={errorMessage}
            onRetry={retry}
            onReset={reset}
            generationId={generationId}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
