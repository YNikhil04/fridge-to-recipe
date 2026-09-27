import { useState } from "react";

// A few one-click starting points so a first-time user isn't staring at a
// blank textarea wondering what format to type in. Purely a UX nicety -
// clicking a chip just fills the textarea, it doesn't submit anything.
const EXAMPLES = [
  "chicken, rice, onion, garlic, tomato",
  "paneer, capsicum, onion, yogurt",
  "eggs, spinach, cheese, bread",
];

export default function IngredientInput({ onSubmit, disabled }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <form className="ingredient-form" onSubmit={handleSubmit}>
      <textarea
        id="ingredients"
        className="ingredient-textarea"
        placeholder="chicken, rice, onion, garlic, tomato…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        disabled={disabled}
        aria-label="Ingredients you have"
      />

      <div className="example-chips">
        <span className="example-label">Try</span>
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            className="example-chip"
            onClick={() => setValue(example)}
            disabled={disabled}
          >
            {example.split(",")[0]}
          </button>
        ))}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={disabled || !value.trim()}
      >
        {disabled ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Cooking…
          </>
        ) : (
          "Get a recipe"
        )}
      </button>
    </form>
  );
}
