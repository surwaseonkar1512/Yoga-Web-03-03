import Category from "../models/Category.js";
import cloudinary from "cloudinary";

// Upload Image to Cloudinary Function
const uploadImageToCloudinary = async (file, folder) => {
  try {
    const options = { folder, resource_type: "auto" };
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result.secure_url; // Get the uploaded image URL
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

// @desc Create a new category
export const createCategory = async (req, res) => {
  try {
    // Get required fields from request body
    let { name, slug, heading, paragraph } = req.body;

    // Get the category image from request files
    const imageFile = req.files?.image;

    // Check if required fields are provided
    if (!name || !slug || !heading || !paragraph || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "All fields including an image are required",
      });
    }

    // Check if a category with the same slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this slug already exists",
      });
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(imageFile, "yoga_categories");

    // Create a new category
    const newCategory = await Category.create({
      name,
      slug,
      image: imageUrl,
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
