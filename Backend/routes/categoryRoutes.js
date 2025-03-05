// const express = require("express");
// const router = express.Router();
// const { getCategories, createCategory } = require("../controllers/categoryController");

// // Route to get all categories
// router.get("/", getCategories);

// // Route to create a new category
// router.post("/", createCategory);

// module.exports = router;
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
