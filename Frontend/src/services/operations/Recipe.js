import axios from "axios";

const BASE_URL = "https://yoga-web-03-03.onrender.com/api/recipes";
// const BASE_URL = "http://localhost:5000/api/recipes";
export const createRecipe = async (recipeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/recipes`, recipeData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error creating recipe:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error creating recipe",
    };
  }
};

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching recipes:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching recipes",
    };
  }
};

export const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete recipe",
    };
  }
};
export const getRecipeBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${slug}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching recipe by slug:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching recipe",
    };
  }
};
