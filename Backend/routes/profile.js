const express = require("express");
const router = express.Router();
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
} = require("../controllers/profile");

// Update user profile
router.put("/update-profile", updateProfile);

// Get user details
router.post("/get-user-details", getAllUserDetails); // Changed from GET to POST to pass `userId` in body

// Update display picture
router.put("/update-display-picture", updateDisplayPicture);

// Delete account
router.post("/delete-account", deleteAccount); // Changed from DELETE to POST to pass `userId` in body

module.exports = router;
