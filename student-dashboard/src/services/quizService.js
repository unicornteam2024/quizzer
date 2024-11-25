import { handleResponse } from "./utils";
import { getMockQuestionAnswers } from "./mockQuizData";

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const quizService = {
  getPublishedQuizzes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes?status=PUBLISHED`);
      //console.log(response);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }
  },

  getQuizById: async (id) => {
    try {
      // First get the quiz details
      const quizResponse = await fetch(`${API_BASE_URL}/quizzes/${id}`);
      const quiz = await handleResponse(quizResponse);
      console.log("Quiz details:", quiz); // Debugging

      // Then get the questions for this quiz
      const questionsResponse = await fetch(
        `${API_BASE_URL}/quizzes/${id}/questions`
      );
      const questions = await handleResponse(questionsResponse);
      console.log("Questions from API:", questions); // Debugging

      // For each question, fetch its answers
      const questionsWithAnswers = await Promise.all(
        questions.map(async (question) => {
          const answersResponse = await fetch(
            `${API_BASE_URL}/questions/${question.id}/answers`
          );
          const answers = await handleResponse(answersResponse);
          console.log(`Answers for question ${question.id}:`, answers); // Debugging

          return {
            ...question,
            answers: answers,
          };
        })
      );

      // Return combined data
      return {
        ...quiz,
        questions: questionsWithAnswers,
      };
    } catch (error) {
      console.error("Error fetching quiz:", error);
      throw error;
    }
  },

  // Methods for handling questions and answers
  getQuizQuestions: async (quizId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/quizzes/${quizId}/questions`
      );
      const data = await handleResponse(response);
      console.log("Questions from API:", data); // Debugging line
      return data;
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
