const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const quizResultsService = {
  // Helper function to get answer details
  getAnswerDetails: async (answerId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/answers/${answerId}/question`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch answer details");
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching answer details for ID ${answerId}:`, error);
      throw error;
    }
  },

  getQuizAnswerHistory: async (quizId) => {
    try {
      // Get questions for this quiz first
      const questionsResponse = await fetch(
        `${API_BASE_URL}/quizzes/${quizId}/questions`
      );
      if (!questionsResponse.ok) {
        throw new Error("Failed to fetch quiz questions");
      }
      const questions = await questionsResponse.json();
      const questionIds = new Set(questions.map((q) => q.id));

      // Get answer history
      const historyResponse = await fetch(`${API_BASE_URL}/answer-history`);
      if (!historyResponse.ok) {
        throw new Error("Failed to fetch answer history");
      }
      const allHistory = await historyResponse.json();

      // For each history entry, get the answer details
      const enrichedHistory = await Promise.all(
        allHistory.map(async (history) => {
          const answerDetails = await quizResultsService.getAnswerDetails(
            history.chosenAnswer.id
          );
          return {
            ...history,
            answerDetails,
          };
        })
      );

      // Filter for only answers to this quiz's questions
      const quizHistory = enrichedHistory.filter((history) =>
        questionIds.has(history.answerDetails.question.id)
      );

      console.log("Enriched quiz history:", quizHistory);
      return quizHistory;
    } catch (error) {
      console.error("Error fetching quiz answer history:", error);
      throw error;
    }
  },

  getQuizStatistics: async (quizId) => {
    try {
      // Get questions
      const questionsResponse = await fetch(
        `${API_BASE_URL}/quizzes/${quizId}/questions`
      );
      if (!questionsResponse.ok) {
        throw new Error("Failed to fetch quiz questions");
      }
      const questions = await questionsResponse.json();

      // Get enriched answer history
      const answerHistory =
        await quizResultsService.getQuizAnswerHistory(quizId);

      // Calculate statistics for each question
      const questionStats = questions.map((question) => {
        // Get history entries for this question
        const questionHistory = answerHistory.filter(
          (history) => history.answerDetails.question.id === question.id
        );

        const totalAnswers = questionHistory.length;
        const correctAnswers = questionHistory.filter(
          (history) => history.chosenAnswer.correct === true
        ).length;

        return {
          questionId: question.id,
          questionText: question.q_description,
          difficulty: question.difficulty,
          totalAnswers,
          correctAnswers,
          wrongAnswers: totalAnswers - correctAnswers,
          correctPercentage:
            totalAnswers > 0
              ? ((correctAnswers / totalAnswers) * 100).toFixed(1)
              : 0,
        };
      });

      // Calculate overall statistics
      const totalAnswers = questionStats.reduce(
        (sum, stat) => sum + stat.totalAnswers,
        0
      );
      const totalCorrect = questionStats.reduce(
        (sum, stat) => sum + stat.correctAnswers,
        0
      );

      return {
        totalQuestions: questions.length,
        totalAnswers,
        correctAnswers: totalCorrect,
        wrongAnswers: totalAnswers - totalCorrect,
        overallCorrectPercentage:
          totalAnswers > 0
            ? ((totalCorrect / totalAnswers) * 100).toFixed(1)
            : 0,
        questionStats,
      };
    } catch (error) {
      console.error("Error calculating quiz statistics:", error);
      throw error;
    }
  },
};
