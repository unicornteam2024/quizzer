import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { quizService } from "../services/quizService";
import { reviewService } from "../services/reviewService";
import ReviewForm from "../components/ReviewForm";

const AddReview = () => {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizData = await quizService.getQuizById(quizId);
        setQuiz(quizData);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleSubmit = async (formData) => {
    const reviewData = {
      studentName: formData.studentName,
      rating: formData.rating,
      comment: formData.comment,
    };

    try {
      await reviewService.writeReview(quizId, reviewData);
      return true; // Success will trigger the success dialog in ReviewForm
    } catch (error) {
      throw new Error(error.message || "Failed to create review");
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    navigate(`/quizzes/${quizId}/reviews`);
  };

  if (!quiz) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Reviews for &quot;{quiz.title}&quot;
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormOpen(true)}
      >
        Write a Review
      </Button>

      <ReviewForm
        open={isFormOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        mode="add"
      />
    </div>
  );
};

export default AddReview;
