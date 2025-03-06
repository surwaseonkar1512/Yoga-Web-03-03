const express = require("express");
const router = express.Router();

const {
  createYoga,
  getAllYoga,
  getYogaBySlug,
  updateYoga,
  deleteYoga,
} = require("../controllers/yogaController");

router.post("/", createYoga);
router.get("/", getAllYoga);
router.get("/:slug", getYogaBySlug);
router.put("/:id", updateYoga);
router.delete("/:id", deleteYoga);

module.exports = router;
