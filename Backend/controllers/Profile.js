const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose");
const Yoga = require("../models/Yoga");
const Recipe = require("../models/Recipe");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      dateOfBirth,
      about,
      contactNumber,
      gender,
    } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Find user by ID
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find associated profile
    const profile = await Profile.findById(userDetails.additionalDetails);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    // Update user details
    userDetails.firstName = firstName || userDetails.firstName;
    userDetails.lastName = lastName || userDetails.lastName;
    await userDetails.save();

    // Update profile details
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    profile.about = about || profile.about;
    profile.contactNumber = contactNumber || profile.contactNumber;
    profile.gender = gender || profile.gender;
    await profile.save();

    // Get updated user details
    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Method for deleting an account
exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Delete associated profile
    await Profile.findByIdAndDelete(user.additionalDetails);

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete Account Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Method for fetching user details
exports.getAllUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error("Get User Details Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Method for updating display picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const { userId } = req.body;
    const displayPicture = req.files?.displayPicture;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    if (!displayPicture) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    const image = await uploadImageToCloudinary(
      displayPicture,
      "profile_image"
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: image },
      { new: true }
    );
    console.log("updatedUser", image.secure_url);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Image updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update Display Picture Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Save a Yoga Pose

exports.saveYogaPose = async (req, res) => {
  try {
    const { userId, yogaPoseId } = req.body;

    if (!userId || !yogaPoseId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Yoga Pose ID are required",
      });
    }

    // Find user and profile
    const user = await User.findById(userId).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User profile not found" });
    }

    const profile = await Profile.findById(user.additionalDetails._id);

    // Find the full Yoga pose details
    const yogaPose = await Yoga.findById(yogaPoseId);
    if (!yogaPose) {
      return res
        .status(404)
        .json({ success: false, message: "Yoga pose not found" });
    }

    // Check if the yoga pose is already saved
    const isAlreadySaved = profile.savedYogaPoses.some(
      (pose) => pose._id.toString() === yogaPoseId
    );

    if (!isAlreadySaved) {
      profile.savedYogaPoses.push(yogaPose);
      await profile.save();
    }

    res.status(200).json({
      success: true,
      message: "Yoga pose saved successfully",
      data: profile.savedYogaPoses, // Now includes full yoga pose details
    });
  } catch (error) {
    console.error("Save Yoga Pose Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove a Yoga Pose
exports.removeYogaPose = async (req, res) => {
  try {
    const { userId, yogaPoseId } = req.body;

    if (!userId || !yogaPoseId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Yoga Pose ID are required",
      });
    }

    const user = await User.findById(userId).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User profile not found" });
    }

    const profile = user.additionalDetails;
    profile.savedYogaPoses = profile.savedYogaPoses.filter(
      (pose) => pose._id.toString() !== yogaPoseId
    );
    await profile.save();

    res.status(200).json({
      success: true,
      message: "Yoga pose removed successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Remove Yoga Pose Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Save a Recipe
exports.saveRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Recipe ID are required",
      });
    }

    // Find user and profile
    const user = await User.findById(userId).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User profile not found" });
    }

    const profile = await Profile.findById(user.additionalDetails._id);

    // Find the full Recipe details
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    // Check if the recipe is already saved
    const isAlreadySaved = profile.savedRecipes.some(
      (savedRecipe) => savedRecipe._id.toString() === recipeId
    );

    if (!isAlreadySaved) {
      profile.savedRecipes.push(recipe); // Store full recipe data
      await profile.save();
    }

    res.status(200).json({
      success: true,
      message: "Recipe saved successfully",
      data: profile.savedRecipes, // Now includes full recipe details
    });
  } catch (error) {
    console.error("Save Recipe Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove a Recipe
exports.removeRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Recipe ID are required",
      });
    }

    const user = await User.findById(userId).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User profile not found" });
    }

    const profile = user.additionalDetails;
    profile.savedRecipes = profile.savedRecipes.filter(
      (recipe) => recipe._id.toString() !== recipeId
    );
    await profile.save();

    res.status(200).json({
      success: true,
      message: "Recipe removed successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Remove Recipe Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Add a General Entry
exports.addGeneralEntry = async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    if (!userId || !title || !content) {
      return res.status(400).json({
        success: false,
        message: "User ID, title, and content are required",
      });
    }

    const user = await User.findById(userId).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User profile not found" });
    }

    const profile = user.additionalDetails;
    profile.generals.push({ title, content, date: new Date() });
    await profile.save();

    res.status(200).json({
      success: true,
      message: "General entry added successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Add General Entry Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove a General Entry
exports.removeGeneralEntry = async (req, res) => {
  try {
    const { userId, entryId } = req.body;

    if (!userId || !entryId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Entry ID are required" });
    }

    const user = await User.findById(userId).populate("additionalDetails");
    if (!user || !user.additionalDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User profile not found" });
    }

    const profile = user.additionalDetails;
    profile.generals = profile.generals.filter(
      (entry) => entry._id.toString() !== entryId
    );
    await profile.save();

    res.status(200).json({
      success: true,
      message: "General entry removed successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Remove General Entry Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
