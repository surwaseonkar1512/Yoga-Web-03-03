const express = require("express");
const router = express.Router();
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  saveYogaPose,
  removeYogaPose,
  saveRecipe,
  removeRecipe,
  addGeneralEntry,
  removeGeneralEntry,
} = require("../controllers/profile");

// Update user profile
router.put("/update-profile", updateProfile);

// Get user details
router.post("/get-user-details", getAllUserDetails); // POST to include `userId` in body

// Update display picture
router.put("/update-display-picture", updateDisplayPicture);

// Delete account
router.post("/delete-account", deleteAccount); // POST to include `userId` in body

// Save Yoga Pose
router.post("/save-yoga-pose", saveYogaPose);

// Remove Yoga Pose
router.post("/remove-yoga-pose", removeYogaPose);

// Save Recipe
router.post("/save-recipe", saveRecipe);

// Remove Recipe
router.post("/remove-recipe", removeRecipe);

// Add General Entry
router.post("/add-general", addGeneralEntry);

// Remove General Entry
router.post("/remove-general", removeGeneralEntry);

module.exports = router;
