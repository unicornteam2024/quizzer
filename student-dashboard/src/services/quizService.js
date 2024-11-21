import { handleResponse } from "./utils";
import { getMockQuizQuestions, getMockQuestionAnswers } from "./mockQuizData";

const API_BASE_URL = "http://localhost:8080/api";

export const quizService = {
  getPublishedQuizzes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes?status=PUBLISHED`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }
  },

  getQuizById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${id}`);
      const quiz = await handleResponse(response);
      console.log("Original quiz:", quiz); // Debugging
      const mockQuestions = getMockQuizQuestions(id);
      console.log("Mock questions:", mockQuestions); // Debugging
      // Enhance the quiz with mock questions
      return {
        ...quiz,
        questions: getMockQuizQuestions(id),
      };
    } catch (error) {
      console.error("Error fetching quiz:", error);
      throw error;
    }
  },

  // Methods for handling questions and answers
  getQuizQuestions: async (quizId) => {
    try {
      // Using mock data instead of API call
      return getMockQuizQuestions(quizId);
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  },

  getQuestionAnswers: async (quizId, questionId) => {
    try {
      // Using mock data instead of API call
      return getMockQuestionAnswers(quizId, questionId);
    } catch (error) {
      console.error("Error fetching answers:", error);
      throw error;
    }
  },

  submitAnswer: async (questionId, answerId) => {
    try {
      // Mock answer submission
      const mockResponse = {
        success: true,
        message: "Answer submitted successfully",
        correct: false, // This will be determined by checking mock data
      };

      // Get the question's answers from mock data
      const answers = getMockQuestionAnswers(1, questionId); // Using quizId 1 for now
      const selectedAnswer = answers.find((a) => a.id === answerId);

      if (selectedAnswer) {
        mockResponse.correct = selectedAnswer.isCorrect;
        mockResponse.message = selectedAnswer.isCorrect
          ? "That is correct, good job!"
          : "That is not correct, try again";
      }

      return mockResponse;
    } catch (error) {
      console.error("Error submitting answer:", error);
      throw error;
    }
  },
};
