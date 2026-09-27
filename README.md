# Fridge → Recipe

Turn a list of ingredients you have on hand into a real, interactive recipe:
scalable servings, a checkable step list, and ingredient swaps — not a chatbot.

## Design concept

The UI is a **split-screen "kitchen ticket" layout**, not a scrolling page:

- **Left — the prep panel.** A dark, chef's-notebook-style panel where you
  type your ingredients. It stays fixed in place; it never scrolls away.
- **Right — the ticket panel.** A warm paper-colored panel, styled like an
  order ticket, where the result appears. It scrolls independently of the
  left panel, so long recipes never push your input off-screen.
- A perforated seam runs down the middle (and along the top on mobile),
  echoing a tear-off ticket. When a recipe arrives, it "prints out" with a
  single deliberate reveal animation rather than a generic fade.
- One custom icon (`SteamBowlIcon`, in `components/icons/`) is reused as
  the brand mark, the empty-state icon, and the loading icon (with gentle
  animated steam) — one consistent visual signature instead of scattered
  decoration.
- On narrow screens (≤900px), the layout stacks vertically and both panels
  scroll normally — the split-screen effect is a desktop enhancement, not
  a requirement the mobile layout depends on.

## How it works, end to end

1. You type what's in your fridge (free text) in the browser.
2. The frontend sends that text to **our own backend** — never directly to
   Groq, so the API key is never exposed in the browser.
3. The backend asks Groq's `openai/gpt-oss-120b` model for a recipe via
   LangChain, using `.withStructuredOutput()` with a Zod schema, so the
   model is forced to return data matching an exact shape instead of
   free-form text.
4. The backend validates that shape, retries once if the model fails, and
   returns either a clean recipe object or a clean error.
5. The frontend validates the shape *again* on its own, then turns it into
   real interactive React components — servings scaler, checklist, swaps.

## Project structure

```
Fridge---to---recipe/
├── backend/
│   ├── index.js                     # Entry point: boots Express, mounts routes, starts listening
│   ├── src/
│   │   ├── routes/
│   │   │   └── recipeRoute.js       # POST /api/recipe — validates input, calls the AI, handles errors
│   │   ├── ai/
│   │   │   └── chain.js             # LangChain: model + prompt + schema wired into one callable chain
│   │   ├── schema/
│   │   │   └── recipeSchema.js      # Zod schema — the single source of truth for the recipe's JSON shape
│   │   └── utils/
│   │       ├── withTimeout.js       # Generic "reject if this promise takes too long" helper
│   │       └── generateRecipe.js    # Calls the chain with a timeout + one automatic retry
│   ├── .env                         # GROQ_API_KEY, GROQ_MODEL (not committed — see .env.example)
│   └── package.json
│
└── frontend/
    └── src/
        ├── components/
        │   ├── icons/
        │   │   └── SteamBowlIcon.jsx # The one custom icon, reused as brand mark / empty / loading state
        │   ├── IngredientInput.jsx  # The free-form text input + example chips
        │   ├── ResultView.jsx       # Routes the current status to the right UI (loading/error/empty/success)
        │   ├── RecipeCard.jsx       # The interactive recipe display once we have valid data
        │   ├── ServingScaler.jsx    # +/- servings control
        │   ├── IngredientList.jsx   # Scaled ingredient list + swap picker per ingredient
        │   ├── SwapPicker.jsx       # The chip row for one ingredient's substitute options
        │   ├── StepChecklist.jsx    # Checkable step list with a progress bar
        │   ├── LoadingState.jsx
        │   ├── ErrorState.jsx
        │   └── EmptyState.jsx
        ├── lib/
        │   ├── api.js               # The ONLY place the frontend calls our backend
        │   ├── validateResult.js    # Re-checks the recipe shape before anything renders it
        │   └── scaleIngredients.js  # Pure math for scaling ingredient amounts by servings
        ├── types/
        │   └── recipe.js            # JSDoc typedefs documenting the exact recipe shape (JS's version of a .ts type file)
        ├── hooks/
        │   └── useRecipeGenerator.js # Owns all async state: status, recipe, error, and the stale-response guard
        ├── App.jsx                  # Composition root — wires input + hook + ResultView together
        └── App.css
```

### Why it's organized this way (for the interview)

- **`backend/index.js` vs `backend/src/routes/recipeRoute.js`** — `index.js`
  only knows how to boot a server; it has zero recipe-specific code. All the
  actual endpoint logic (validation, calling the AI, error handling) lives
  in `recipeRoute.js`. If a second feature were added later, it would get
  its own file in `routes/`, mounted the same way.
- **`backend/src/ai/chain.js` vs `backend/src/schema/recipeSchema.js`** —
  split so the "what shape do we want back" question (schema) is answered
  in one small file, separate from "how do we ask the model for it" (chain).
- **`frontend/src/lib/` vs `frontend/src/components/`** — `lib/` has zero
  React in it; it's plain functions (network call, validation, math) that
  could be unit-tested with no rendering involved. `components/` is purely
  UI. This split is what makes `lib/validateResult.js` the one file to
  point to when asked "how do you handle bad AI output on the frontend?"
- **`frontend/src/hooks/useRecipeGenerator.js`** — every other component is
  a "dumb" presentational component that just renders props. All the async
  complexity (loading state, the stale-request guard, retry) is
  concentrated in this one hook instead of spread across components.
- **`ResultView.jsx`** — the one place in the whole app with a "what state
  are we in" branch. Every state-specific component (`LoadingState`,
  `ErrorState`, etc.) only ever renders exactly one state, which keeps each
  of them trivially simple.

## Setup

**Backend**
```
cd backend
npm install
cp .env.example .env
# then edit .env and paste in your real GROQ_API_KEY
npm run dev      # nodemon, auto-restarts on save
```
Runs on `http://localhost:3000`.

**Frontend**
```
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173` by default (Vite). If your backend runs
somewhere other than `localhost:3000`, copy `.env.example` to `.env` and set
`VITE_API_BASE_URL`.

## AI-usage note

Used Claude to scaffold the Express backend around LangChain's
`.withStructuredOutput()`, the timeout/retry wrapper, the race-condition
guard in `useRecipeGenerator`, and the overall file/folder structure. I
reviewed and understand each piece and can walk through/modify any of it
live.

*(Personalize this paragraph honestly before submitting — mention anything
you changed, debugged, or wrote yourself on top of this.)*

## Known limitations

- Ingredient swaps change the displayed name only — they don't recompute
  `amount`/`unit` for the substitute (e.g. tofu isn't 1:1 with chicken by
  weight in reality). Flagged here rather than silently getting it wrong.
- Unusual units returned by the model (e.g. "pinch", "whole") scale
  proportionally like any other unit, which isn't always meaningful for
  non-divisible items (you can't really have 1.5 onions).
- No session persistence yet — refreshing the page loses the current
  recipe (see stretch goals: `localStorage` save/reload).

## Time spent

*(Fill in honestly, broken down roughly: backend, frontend, styling/mobile,
testing failure paths, README/recording.)*
