import axios from "axios";

const BASE_URL = "https://yoga-web-03-03.onrender.com/api";
// const BASE_URL = "http://localhost:5000/api";

export const getYogaPractice = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/yogas/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, message: "Error fetching categories" };
  }
};
export const getYogaPracticeBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/yogas/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, message: "Error fetching categories" };
  }
};
export const getYogaByCategory = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/yogas/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, message: "Error fetching categories" };
  }
};

export const createYogaPractices = async (categoryData) => {
  try {
    const formData = new FormData();
    for (const key in categoryData) {
      formData.append(key, categoryData[key]);
    }

    const response = await axios.post(`${BASE_URL}/yogas`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, message: "Error creating category" };
  }
};
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/yogas/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Error deleting category" };
  }
};
