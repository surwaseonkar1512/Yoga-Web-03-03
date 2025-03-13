const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose");

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
