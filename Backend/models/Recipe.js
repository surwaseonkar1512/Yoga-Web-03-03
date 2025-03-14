const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true }, // Slug for SEO-friendly URLs
  image: { type: String, required: true },
  infoImage: { type: String }, // Additional image for recipe information
  ingredientsImage: { type: String }, // Image related to ingredients
  instructionsImage: { type: String }, // Image related to instructions
  youtubeVideo: { type: String }, // YouTube video link
  description: { type: String, required: true },
  prep_time: { type: String, required: true },
  cook_time: { type: String, required: true },
  total_time: { type: String, required: true },
  servings: { type: String, required: true },
  difficulty: { type: String, required: true },
  calories: { type: String, required: true },
  type: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  instructions: [{ type: String, required: true }],
  tags: [{ type: String }],
  author: [{ type: String, required: true }],
});

module.exports = mongoose.model("Recipe", RecipeSchema);
