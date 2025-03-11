const express = require("express");
const router = express.Router();

const {
  createYoga,
  getAllYoga,
  getYogaBySlug,
  updateYoga,
  deleteYoga,
  getYogaByCategory,
} = require("../controllers/yogaController");

router.post("/", createYoga);
router.get("/", getAllYoga);
router.get("/:slug", getYogaBySlug);
router.put("/:id", updateYoga);
router.delete("/:id", deleteYoga);
router.get("/category/:categoryIdOrSlug", getYogaByCategory);

module.exports = router;
