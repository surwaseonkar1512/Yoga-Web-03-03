const Nutrition = require("../models/Nutrition");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;

// Upload Image to Cloudinary Function

// @desc Create a new Nutrition
exports.createNutrition = async (req, res) => {
  try {
    let { name, slug, heading, paragraph } = req.body;
    const imageFile = req.files?.image;

    if (!name || !slug || !heading || !paragraph || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "All fields including an image are required",
      });
    }

    // ✅ Ensure Cloudinary returns a valid URL
    const imageUrl = await uploadImageToCloudinary(
      imageFile,
      "nutrition_catrgory"
    );

    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // ✅ Store only the secure URL in MongoDB
    const newNutrition = await Nutrition.create({
      name,
      slug,
      image: imageUrl, // 🔹 Now this will be a valid string (URL)
      heading,
      paragraph,
    });

    res.status(201).json({
      success: true,
      data: newNutrition,
      message: "Nutrition Created Successfully",
    });
  } catch (error) {
    console.error("Error creating Nutrition:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Nutrition",
      error: error.message,
    });
  }
};

// @desc Get all categories
exports.getNutrition = async (req, res) => {
  try {
    const categories = await Nutrition.find();
    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// @desc Delete a Nutrition
exports.deleteNutrition = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if Nutrition exists
    const nutrition = await Nutrition.findById(id);
    if (!nutrition) {
      return res.status(404).json({
        success: false,
        message: "Nutrition not found",
      });
    }

    // Extract Public ID from Image URL
    const imagePublicId = nutrition.image.split("/").pop().split(".")[0];

    // Delete Image from Cloudinary
    await cloudinary.uploader.destroy(`nutrition_category/${imagePublicId}`);

    // Delete Nutrition from Database
    await Nutrition.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Nutrition deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Nutrition:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Nutrition",
      error: error.message,
    });
  }
};
