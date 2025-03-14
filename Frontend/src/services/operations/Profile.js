import axios from "axios";
const BASE_URL = "https://yoga-web-03-03.onrender.com/api";

// const BASE_URL = "http://localhost:5000/api";
// Save Yoga Pose
export const saveYoga = async ({ userId, yogaPoseId }) => {
  try {
    const response = await axios.post(`${BASE_URL}/profile/save-yoga-pose`, {
      userId,
      yogaPoseId,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving yoga pose:", error);
    return { success: false, message: "Error saving yoga pose" };
  }
};

// Remove Yoga Pose
export const removeYoga = async ({ userId, yogaPoseId }) => {
  console.log("userid", userId, yogaPoseId);
  try {
    const response = await axios.post(`${BASE_URL}/profile/remove-yoga-pose`, {
      userId,
      yogaPoseId,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing yoga pose:", error);
    return { success: false, message: "Error removing yoga pose" };
  }
};

// Save Recipe
export const saveRecipe = async ({ userId, recipeId }) => {
  try {
    const response = await axios.post(`${BASE_URL}/profile/save-recipe`, {
      userId,
      recipeId,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving recipe:", error);
    return { success: false, message: "Error saving recipe" };
  }
};

// Remove Recipe
export const removeRecipe = async ({ userId, recipeId }) => {
  console.log(" userIdrecipeId", userId, recipeId);
  try {
    const response = await axios.post(`${BASE_URL}/profile/remove-recipe`, {
      userId,
      recipeId,
    });

    return response.data;
  } catch (error) {
    console.error("Error removing recipe:", error);
    return { success: false, message: "Error removing recipe" };
  }
};
