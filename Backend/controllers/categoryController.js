const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;

// Upload Image to Cloudinary Function

// @desc Create a new category
exports.createCategory = async (req, res) => {
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
      "yoga_categories"
    );

    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // ✅ Store only the secure URL in MongoDB
    const newCategory = await Category.create({
      name,
      slug,
      image: imageUrl, // 🔹 Now this will be a valid string (URL)
      heading,
      paragraph,
    });

    res.status(201).json({
      success: true,
      data: newCategory,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// @desc Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
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
