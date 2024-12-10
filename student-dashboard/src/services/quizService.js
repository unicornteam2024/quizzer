import { handleResponse } from "./utils";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
      // First get the quiz details
      const quizResponse = await fetch(`${API_BASE_URL}/quizzes/${id}`);
      const quiz = await handleResponse(quizResponse);

      // Then get the questions for this quiz
      const questionsResponse = await fetch(
        `${API_BASE_URL}/quizzes/${id}/questions`
      );
      const questions = await handleResponse(questionsResponse);

      // For each question, fetch its answers
      const questionsWithAnswers = await Promise.all(
        questions.map(async (question) => {
          const answersResponse = await fetch(
            `${API_BASE_URL}/questions/${question.id}/answers`
          );
          const answers = await handleResponse(answersResponse);

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
      return data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  },

  getQuestionAnswers: async (quizId, questionId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/${questionId}/answers`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch answers");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching answers:", error);
      throw error;
    }
  },

  submitAnswer: async (questionId, answerId) => {
    try {
      await fetch(`${API_BASE_URL}/answers/${answerId}/submit`, {
        method: "POST",
      });

      const chosenAnswer = await fetch(
        `${API_BASE_URL}/answers/${answerId}`
      ).then((res) => res.json());

      return {
        success: true,
        message: chosenAnswer.correct
          ? "That is correct, good job!"
          : "That is not correct, try again",
        correct: chosenAnswer.correct,
      };
    } catch (error) {
      console.error("Error submitting answer:", error);
      throw error;
    }
  },
};
