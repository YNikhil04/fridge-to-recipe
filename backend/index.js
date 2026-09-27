// Entry point: this file's only job is to set up Express and start
// listening. It does NOT contain any recipe-specific logic - that lives
// in src/routes/recipeRoute.js. Keeping this file thin means "how does
// the server boot" is always a 5-second read, no matter how complex the
// actual features get.
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const recipeRoute = require("./src/routes/recipeRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Every route in recipeRoute.js is mounted under /api, so
// router.post("/recipe", ...) becomes POST /api/recipe.
app.use("/api", recipeRoute);

// Anything else (unknown route) gets a clean JSON 404 instead of Express's
// default HTML error page, so the frontend never has to parse HTML.
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
