import { useParams } from "react-router-dom";
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
} from "@mui/material";
import dayjs from "dayjs";
import { quizService } from "../services/quizService";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";

const QuestionList = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
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
        console.log("Quiz data received:", data); // Debugging
        console.log("Questions received:", data.questions); // Debugging
        setQuiz(data);
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Error in loadQuestions:", err); // Debugging
        setError(err.message || "Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [id]);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleAnswerSubmit = async (questionId) => {
    try {
      const answerId = selectedAnswers[questionId];
      if (!answerId) return; // Don't submit if no answer selected

      const response = await quizService.submitAnswer(questionId, answerId);
      setFeedbackDialog({
        open: true,
        message: response.message,
        isCorrect: response.correct,
        questionId,
      });
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
        {quiz.questionCount}
      </Typography>
    </>
  );

  const renderQuestions = () => (
    <Box sx={{ minWidth: 275, mb: 2 }}>
      {questions.map((question, index) => (
        <Card key={question.id} elevation={3} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {question.q_description}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Question {index + 1} of {questions.length} - Difficulty:{" "}
              {question.difficulty} - Category: {quiz.categoryName}
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
                  control={<Radio />}
                  label={answer.option}
                />
              ))}
            </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => handleAnswerSubmit(question.id)}
              disabled={!selectedAnswers[question.id]}
            >
              Submit Answer
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorAlert errorMessage={error} />;

  return (
    <div>
      {renderQuizInfo()}
      {questions.length > 0 ? (
        renderQuestions()
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
