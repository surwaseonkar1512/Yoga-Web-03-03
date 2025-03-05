const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log("Received:", req.body, req.file);

    if (!name || !description || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "categories" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Generate slug (convert name to lowercase and replace spaces with hyphens)
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    // Create new category
    const newCategory = new Category({
      name,
      description,
      slug,
      image: result.secure_url,
      createdAt: new Date(),
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get category by slug
exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
