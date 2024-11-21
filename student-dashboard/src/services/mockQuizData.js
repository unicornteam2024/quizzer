// Mock data structure matching our backend entities
export const mockQuizData = {
  1: {
    // Quiz ID 1 (matching our existing English quiz)
    questions: [
      {
        id: 1,
        q_description: "Which word is a synonym for 'happy'?",
        difficulty: "Easy",
        answers: [
          {
            id: 1,
            option: "Joyful",
            isCorrect: true,
          },
          {
            id: 2,
            option: "Sad",
            isCorrect: false,
          },
          {
            id: 3,
            option: "Angry",
            isCorrect: false,
          },
          {
            id: 4,
            option: "Tired",
            isCorrect: false,
          },
        ],
      },
      {
        id: 2,
        q_description: "What is the past tense of 'eat'?",
        difficulty: "Normal",
        answers: [
          {
            id: 5,
            option: "Eat",
            isCorrect: false,
          },
          {
            id: 6,
            option: "Ate",
            isCorrect: true,
          },
          {
            id: 7,
            option: "Eaten",
            isCorrect: false,
          },
        ],
      },
      {
        id: 3,
        q_description: "Identify the correct sentence:",
        difficulty: "Hard",
        answers: [
          {
            id: 8,
            option: "They is going to school.",
            isCorrect: false,
          },
          {
            id: 9,
            option: "They are going to school.",
            isCorrect: true,
          },
          {
            id: 10,
            option: "They am going to school.",
            isCorrect: false,
          },
        ],
      },
    ],
  },
};

// Helper function to get questions for a specific quiz
export const getMockQuizQuestions = (quizId) => {
  return mockQuizData[quizId]?.questions || [];
};

// Helper function to get answers for a specific question
export const getMockQuestionAnswers = (quizId, questionId) => {
  const questions = getMockQuizQuestions(quizId);
  const question = questions.find((q) => q.id === questionId);
  return question?.answers || [];
};
