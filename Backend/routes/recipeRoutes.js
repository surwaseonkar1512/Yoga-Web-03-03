const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

router.post("/recipes", recipeController.createRecipe);
router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/:slug", recipeController.getRecipeBySlug);
router.put("/recipes/:id", recipeController.updateRecipe);
router.delete("/recipes/:id", recipeController.deleteRecipe);

module.exports = router;
