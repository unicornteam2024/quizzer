const API_BASE_URL = "http://localhost:8080/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Something went wrong");
  }
  return response.json();
};

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
