import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import { quizService } from "../services/quizService";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";
import {
  ListAlt as ListAltIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const QuestionList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [feedbackDialog, setFeedbackDialog] = useState({
    open: false,
    message: "",
    isCorrect: false,
    questionId: null,
  });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await quizService.getQuizById(id);

        // Randomize answers for each question
        const questionsWithRandomizedAnswers = data.questions.map(
          (question) => ({
            ...question,
            answers: shuffleArray([...question.answers]),
          })
        );

        setQuiz(data);
        setQuestions(questionsWithRandomizedAnswers || []);
      } catch (err) {
        console.error("Error in loadQuestions:", err);
        setError(err.message || "Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [id]);

  const handleAnswerSelect = (questionId, answerId) => {
    if (!answeredQuestions.has(questionId)) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: answerId,
      }));
    }
  };

  const handleAnswerSubmit = async (questionId) => {
    try {
      const answerId = selectedAnswers[questionId];
      if (!answerId) return;

      const response = await quizService.submitAnswer(questionId, answerId);
      setFeedbackDialog({
        open: true,
        message: response.message,
        isCorrect: response.correct,
        questionId,
      });

      // Mark question as answered
      setAnsweredQuestions((prev) => new Set([...prev, questionId]));
    } catch (err) {
      setError(`Failed to submit answer: ${err.message}`);
    }
  };

  const handleCloseFeedback = () => {
    setFeedbackDialog((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD-MM-YYYY");
  };

  const isQuestionAnswered = (questionId) => {
    return answeredQuestions.has(questionId);
  };

  const renderQuizInfo = () => (
    <>
      <Typography variant="h4" gutterBottom>
        {quiz.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {quiz.description}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Added on: {formatDate(quiz.createdDate)} - Questions:{" "}
        {quiz.questionCount} - Category: {quiz.categoryName}
      </Typography>
    </>
  );

  const renderQuestions = () => (
    <Box sx={{ minWidth: 275, mb: 2 }}>
      {questions.map((question, index) => {
        const answered = isQuestionAnswered(question.id);

        return (
          <Card
            key={question.id}
            elevation={3}
            sx={{
              mb: 2,
              opacity: answered ? 0.7 : 1,
              transition: "opacity 0.3s",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {question.q_description}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                Question {index + 1} of {questions.length} - Difficulty:{" "}
                {question.difficulty}
                {answered && (
                  <Typography
                    component="span"
                    sx={{
                      ml: 2,
                      color: "text.secondary",
                      fontStyle: "italic",
                    }}
                  >
                    (Answered)
                  </Typography>
                )}
              </Typography>

              <RadioGroup
                value={selectedAnswers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerSelect(question.id, Number(e.target.value))
                }
              >
                {question.answers.map((answer) => (
                  <FormControlLabel
                    key={answer.id}
                    value={answer.id}
                    control={<Radio disabled={answered} />}
                    label={answer.option}
                    disabled={answered}
                    sx={{
                      color: answered ? "text.disabled" : "text.primary",
                    }}
                  />
                ))}
              </RadioGroup>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleAnswerSubmit(question.id)}
                disabled={!selectedAnswers[question.id] || answered}
              >
                {answered ? "Answered" : "Submit Answer"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );

  const renderNavigationButtons = () => (
    <Paper
      elevation={3}
      sx={{
        position: "sticky",
        bottom: 16,
        p: 2,
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 4,
        backgroundColor: "background.paper",
        zIndex: 1000,
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ListAltIcon />}
        onClick={() => navigate("/quizzes")}
        sx={{ minWidth: 200 }}
      >
        View Quizzes
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AssessmentIcon />}
        onClick={() => navigate(`/quizzes/${id}/results`)}
        sx={{ minWidth: 200 }}
      >
        View Results
      </Button>
    </Paper>
  );

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorAlert errorMessage={error} />;

  return (
    <div>
      {renderQuizInfo()}
      {questions.length > 0 ? (
        <>
          {renderQuestions()}
          {renderNavigationButtons()}
        </>
      ) : (
        <Typography>No questions available for this quiz</Typography>
      )}

      <Dialog
        open={feedbackDialog.open}
        onClose={handleCloseFeedback}
        aria-labelledby="feedback-dialog-title"
      >
        <DialogTitle id="feedback-dialog-title">
          {feedbackDialog.isCorrect ? "🎉 Correct!" : "❌ Incorrect"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{feedbackDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedback} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuestionList;
