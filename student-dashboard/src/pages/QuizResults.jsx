import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { quizResultsService } from "../services/quizResultsService";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  Assessment as AssessmentIcon,
  Help as HelpIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";

export default function QuizResults() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await quizResultsService.getQuizStatistics(id);
        setStats(data);
      } catch (err) {
        setError(err.message || "Failed to load quiz statistics");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [id]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "success";
      case "normal":
        return "warning";
      case "hard":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorAlert errorMessage={error} />;
  if (!stats) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">No statistics available</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <AssessmentIcon fontSize="large" />
        {stats.quizTitle} Statistics
      </Typography>

      {/* Overall Statistics */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Overall Performance
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography color="text.secondary" gutterBottom>
                Total Questions
              </Typography>
              <Typography variant="h4">{stats.totalQuestions}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography color="text.secondary" gutterBottom>
                Total Answers
              </Typography>
              <Typography variant="h4">{stats.totalAnswers}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography color="text.secondary" gutterBottom>
                Correct Answers
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.correctAnswers}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography color="text.secondary" gutterBottom>
                Success Rate
              </Typography>
              <Typography variant="h4" color="primary">
                {stats.overallCorrectPercentage}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Question Statistics */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <HelpIcon />
        Question Details
      </Typography>
      <Grid container spacing={3}>
        {stats.questionStats.map((question, index) => (
          <Grid item xs={12} key={question.questionId}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Question {index + 1}: {question.questionText}
                  </Typography>
                  <Chip
                    label={question.difficulty}
                    color={getDifficultyColor(question.difficulty)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" />
                      <Typography>
                        Correct: {question.correctAnswers}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CloseIcon color="error" />
                      <Typography>Wrong: {question.wrongAnswers}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Total Attempts: {question.totalAnswers}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Success Rate: {question.correctPercentage}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(question.correctPercentage)}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      bgcolor: "#ffcdd2",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#81c784",
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
