const express = require("express");
const { generateRecipe } = require("../utils/generateRecipe");

const router = express.Router();

router.post("/recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || typeof ingredients !== "string" || !ingredients.trim()) {
    return res
      .status(400)
      .json({ error: "Please provide a list of ingredients." });
  }

  try {
    const result = await generateRecipe(ingredients.trim());
    return res.json(result);
  } catch (err) {
    if (err.message === "TIMEOUT") {
      return res
        .status(504)
        .json({
          error: "The model took too long to respond. Please try again.",
        });
    }

    console.error("Recipe generation failed:", err.message);
    return res.status(502).json({
      error: "The model couldn't generate a valid recipe. Please try again.",
    });
  }
});

module.exports = router;
