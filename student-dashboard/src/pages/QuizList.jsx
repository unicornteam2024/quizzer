import { useState, useEffect } from "react";
// import { fetchPublishedQuizzes } from "../services/mockQuizService";
import { quizService } from "../services/quizService";
// import { quizResultsService } from "../services/quizResultsService";
import { Box, Typography } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import QuizGrid from "../components/QuizGrid";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";

// const testQuizResults = async (quizId) => {
//   try {
//     const results = await quizResultsService.getQuizStatistics(quizId);
//     console.log("Quiz Results:", results);
//   } catch (error) {
//     console.error("Error testing quiz results:", error);
//   }
// };

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await quizService.getPublishedQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError(err.message || "Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorAlert errorMessage={error} />;

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Available Quizzes
      </Typography>
      <QuizGrid quizzes={quizzes} />
    </Box>
  );
};

export default QuizList;
