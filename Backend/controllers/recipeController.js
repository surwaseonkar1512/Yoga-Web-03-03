const Recipe = require("../models/Recipe");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;

exports.createRecipe = async (req, res) => {
  try {
    let {
      title,
      slug,
      description,
      prep_time,
      cook_time,
      total_time,
      servings,
      difficulty,
      calories,
      type,
      ingredients,
      instructions,
      tags,
      author,
      youtubeVideo,
    } = req.body;

    const imageFile = req.files?.image;
    const infoImageFile = req.files?.infoImage;
    const ingredientsImageFile = req.files?.ingredientsImage;
    const instructionsImageFile = req.files?.instructionsImage;

    // List of required fields
    const requiredFields = {
      title,
      slug,
      description,
      prep_time,
      cook_time,
      total_time,
      servings,
      difficulty,
      calories,
      type,
      ingredients,
      instructions,
      author,
      image: imageFile,
    };

    // Find missing fields
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Upload images to Cloudinary
    const recipeImageUrl = await uploadImageToCloudinary(
      imageFile,
      "recipe_category"
    );
    const infoImageUrl = infoImageFile
      ? await uploadImageToCloudinary(infoImageFile, "recipe_info")
      : null;
    const ingredientsImageUrl = ingredientsImageFile
      ? await uploadImageToCloudinary(
          ingredientsImageFile,
          "recipe_ingredients"
        )
      : null;
    const instructionsImageUrl = instructionsImageFile
      ? await uploadImageToCloudinary(
          instructionsImageFile,
          "recipe_instructions"
        )
      : null;

    if (!recipeImageUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed" });
    }

    // Convert ingredients to array if it's a string
    if (typeof ingredients === "string") {
      try {
        ingredients = JSON.parse(ingredients);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid ingredients format. Must be a valid JSON array.",
        });
      }
    }

    // Upload ingredient images (if provided)
    const resolvedIngredients = await Promise.all(
      ingredients.map(async (ingredient) => {
        return {
          name: ingredient.name,
          quantity: ingredient.quantity,
        };
      })
    );

    if (typeof author === "string") {
      try {
        author = author;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid author format. Must be a valid JSON object.",
        });
      }
    }

    const newRecipe = await Recipe.create({
      title,
      slug,
      image: recipeImageUrl,
      infoImage: infoImageUrl,
      ingredientsImage: ingredientsImageUrl,
      instructionsImage: instructionsImageUrl,
      youtubeVideo,
      description,
      prep_time,
      cook_time,
      total_time,
      servings,
      difficulty,
      calories,
      type,
      ingredients: resolvedIngredients,
      instructions,
      tags,
      author,
    });

    res.status(201).json({
      success: true,
      data: newRecipe,
      message: "Recipe Created Successfully",
    });
  } catch (error) {
    console.error("Error creating Recipe:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Recipe",
      error: error.message,
    });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes.length) {
      return res
        .status(404)
        .json({ success: false, message: "No recipes found" });
    }
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes",
      error: error.message,
    });
  }
};

// Get a single recipe by slug
// Get a single recipe by slug
exports.getRecipeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the recipe by slug
    const recipe = await Recipe.findOne({ slug });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found with the provided slug",
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
      message: "Recipe fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching recipe by slug:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the recipe",
      error: error.message,
    });
  }
};

// Update an existing recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    // Handle main image update
    if (req.files?.image) {
      // Delete old image from Cloudinary
      const imagePublicId = recipe.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`recipe_category/${imagePublicId}`);

      // Upload new image
      updatedData.image = await uploadImageToCloudinary(
        req.files.image,
        "recipe_category"
      );
    }

    // Handle ingredient image updates
    if (updatedData.ingredients) {
      const ingredientList = JSON.parse(updatedData.ingredients).map(
        async (ingredient) => {
          const ingredientImageUrl = ingredient.image
            ? await uploadImageToCloudinary(
                ingredient.image,
                "ingredient_images"
              )
            : ingredient.image;
          return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            image: ingredientImageUrl,
          };
        }
      );

      updatedData.ingredients = await Promise.all(ingredientList);
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json({
      success: true,
      message: "Recipe updated successfully",
      updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating Recipe:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Recipe",
      error: error.message,
    });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    // Delete main image from Cloudinary
    const imagePublicId = recipe.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`recipe_category/${imagePublicId}`);

    // Delete ingredient images from Cloudinary
    if (recipe.ingredients) {
      for (const ingredient of recipe.ingredients) {
        if (ingredient.image) {
          const ingredientImagePublicId = ingredient.image
            .split("/")
            .pop()
            .split(".")[0];
          await cloudinary.uploader.destroy(
            `ingredient_images/${ingredientImagePublicId}`
          );
        }
      }
    }

    await Recipe.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting Recipe:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Recipe",
      error: error.message,
    });
  }
};
