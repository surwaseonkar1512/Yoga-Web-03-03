import axios from "axios";
const BASE_URL = "https://yoga-web-03-03.onrender.com/api";

// const BASE_URL = "http://localhost:5000/api";
// Save Yoga Pose
export const getUserData = async ({ userId }) => {
  console.log("userIduserId", userId);
  try {
    const response = await axios.post(`${BASE_URL}/profile/get-user-details`, {
      userId: userId,
    });
    return response;
  } catch (error) {
    console.error("Error saving yoga pose:", error);
    return { success: false, message: "Error saving yoga pose" };
  }
};
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

export const addJournals = async (userId, general) => {
  try {
    const response = await axios.post(`${BASE_URL}/profile/add-general`, {
      userId: userId,
      title: general.title,
      content: general.content,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving journal:", error);
    return { success: false, message: "Error saving journal" };
  }
};
export const updateDisplayPicture = async (userId, file, token) => {
  try {
    const formData = new FormData();
    formData.append("displayPicture", file);
    formData.append("userId", userId);

    const response = await axios.put(
      `${BASE_URL}/profile/update-display-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error.response?.data?.message || "Error updating profile picture.";
  }
};

export const updateUserProfile = async (userId, profile) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/profile/update-profile`,

      {
        userId,
        ...profile,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response?.data?.message || "Error updating profile.";
  }
};
export const removeGeneral = async (userId, generalId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/remove-general`,

      {
        userId: userId,
        entryId: generalId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response?.data?.message || "Error updating profile.";
  }
};
