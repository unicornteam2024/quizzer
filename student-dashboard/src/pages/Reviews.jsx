import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Alert,
  IconButton,
  Button,
} from "@mui/material";
import { Clear, Edit } from "@mui/icons-material";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { quizService } from "../services/quizService";
import { reviewService } from "../services/reviewService";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";
import EditReviewForm from "../components/EditReviewForm";
import ReviewForm from "../components/ReviewForm";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reviewStats, setReviewStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    reviews: [],
  });

  const handleEditClick = (review) => {
    setEditingReview(review);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingReview(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateReview = async (updatedData) => {
    try {
      setLoading(true);
      await reviewService.updateReview(editingReview.id, updatedData);

      // Fetch updated reviews
      const updatedReviewsData = await reviewService.getQuizReviews(quizId);
      setReviewStats(updatedReviewsData);
      setReviews(updatedReviewsData.reviews || []);

      handleCloseEditModal();
    } catch (err) {
      setError(err.message || "Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  const { id: quizId } = useParams();

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      // Get quiz title
      const quizData = await quizService.getQuizById(quizId);
      setQuizTitle(quizData.title);

      // Get reviews using new endpoint
      const reviewsData = await reviewService.getQuizReviews(quizId);

      // Update with the full stats object
      setReviewStats(reviewsData);
      // Set reviews array for the list
      setReviews(reviewsData.reviews || []);
    } catch (err) {
      console.error("Error loading reviews:", err);
      setError(err.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleDeleteReview = (reviewId) => {
    if (confirm("Are you sure you want to delete this review?")) {
      reviewService.deleteReview(reviewId);
      loadReviews();
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await reviewService.writeReview(quizId, formData);
      setIsFormOpen(false);
      // Refresh reviews list
      loadReviews();
      return true;
    } catch (error) {
      throw new Error(error.message || "Failed to create review");
    }
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorAlert errorMessage={error} />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reviews of &quot;{quizTitle}&quot;
      </Typography>

      <Typography variant="h6" gutterBottom>
        {Number.isInteger(reviewStats.averageRating)
          ? reviewStats.averageRating
          : reviewStats.averageRating.toFixed(1)}
        /5 rating average based on {reviewStats.totalReviews}{" "}
        {reviewStats.totalReviews !== 1 ? "reviews" : "review"}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormOpen(true)}
        >
          Write Your Review
        </Button>
      </Box>

      <ReviewForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        mode="add"
      />

      {!reviews?.length ? (
        <Box>
          <Alert severity="info">No reviews available</Alert>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {reviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <Card variant="outlined">
                <CardContent sx={{ position: "relative" }}>
                  <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(review)}
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleDeleteReview(review.id);
                      }}
                    >
                      <Clear />
                    </IconButton>
                  </Box>
                  <Typography variant="h6">{review.studentName}</Typography>
                  <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
                    Rating: {review.rating}/5
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1, mb: 1, wordWrap: "break-word" }}
                  >
                    {review.comment}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Written on:{" "}
                    {new Date(review.createdDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <EditReviewForm
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        review={editingReview}
        onSave={handleUpdateReview}
      />
    </Container>
  );
};
export default Reviews;
