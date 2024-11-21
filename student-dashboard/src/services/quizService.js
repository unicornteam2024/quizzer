import { handleResponse } from "./utils";

const API_BASE_URL = "http://localhost:8080/api";

export const quizService = {
  // Get all published quizzes
  getPublishedQuizzes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes?status=PUBLISHED`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }
  },

  // Get a specific quiz by ID (we'll need this later)
  getQuizById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${id}`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      throw error;
    }
  },
};
