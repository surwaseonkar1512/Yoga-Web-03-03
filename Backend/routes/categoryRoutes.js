const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  deleteCategory, // ✅ Import deleteCategory function
} = require("../controllers/categoryController");

router.get("/getCategory", getCategories);
router.post("/yogaCategory", createCategory);
router.delete("/deleteCategory/:id", deleteCategory); // ✅ Add delete route

module.exports = router;
