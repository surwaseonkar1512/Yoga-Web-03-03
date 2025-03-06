import axios from "axios";

// const BASE_URL = "https://yoga-web-03-03.onrender.com/api/nutrition";
const BASE_URL = "http://localhost:5000/api";

export const getNutrition = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/nutrition/getNutrition`);
    return response.data;
  } catch (error) {
    console.error("Error fetching nutrition:", error);
    return { success: false, message: "Error fetching nutrition" };
  }
};

export const createNutrition = async (categoryData) => {
  try {
    const formData = new FormData();
    for (const key in categoryData) {
      formData.append(key, categoryData[key]);
    }

    const response = await axios.post(
      `${BASE_URL}/nutrition/yogaNutrition`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, message: "Error creating category" };
  }
};
export const deleteNutrition = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/nutrition/deleteNutrition/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Error deleting category" };
  }
};
