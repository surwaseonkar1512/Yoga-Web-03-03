const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createCategory,
  getAllCategories,
  getCategoryBySlug
} = require("../controllers/categoryController");

router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategories);
router.get("/:slug", getCategoryBySlug);

module.exports = router;
