import axios from "axios";

const BASE_URL = "https://yoga-web-03-03.onrender.com/api";
// const BASE_URL = "http://localhost:5000/api";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/getCategory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, message: "Error fetching categories" };
  }
};

export const createCategory = async (categoryData) => {
  try {
    const formData = new FormData();
    for (const key in categoryData) {
      formData.append(key, categoryData[key]);
    }

    const response = await axios.post(
      `${BASE_URL}/categories/yogaCategory`,
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
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/categories/deleteCategory/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Error deleting category" };
  }
};
