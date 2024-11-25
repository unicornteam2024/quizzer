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
