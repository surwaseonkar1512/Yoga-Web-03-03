const express = require("express");
const upload = require("../middleware/upload");
const { uploadImage, getAllImages } = require("../controllers/controller");

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/images", getAllImages);

module.exports = router;
