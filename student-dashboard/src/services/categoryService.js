import { handleResponse } from "./utils";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const categoryService = {
  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching categories", error);
      throw error;
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${id}`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching category", error);
      throw error;
    }
  },
};
