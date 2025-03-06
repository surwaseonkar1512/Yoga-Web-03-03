const express = require("express");
const router = express.Router();

const {
  getNutrition,
  createNutrition,
  deleteNutrition,
} = require("../controllers/nutritionController");

router.get("/getNutrition", getNutrition);
router.post("/yogaNutrition", createNutrition);
router.delete("/deleteNutrition/:id", deleteNutrition); // ✅ Add delete route

module.exports = router;
