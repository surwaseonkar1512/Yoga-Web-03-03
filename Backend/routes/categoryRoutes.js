const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");

router.get("/getCategory", getCategories);

// Route to create a new category
router.post("/yogaCategory", createCategory);
// Export the router for use in the main application
module.exports = router;
