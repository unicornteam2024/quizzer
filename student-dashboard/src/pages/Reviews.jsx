import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Alert,
  IconButton,
} from "@mui/material";
import { Clear, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { quizService } from "../services/quizService";
import { reviewService } from "../services/reviewService";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";
import EditReviewForm from "../components/EditReviewForm";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      console.log("Updating review with data:", { ...updatedData, quizId });

      await reviewService.updateReview(editingReview.id, updatedData, quizId);
      console.log("Review updated, fetching new reviews...");

      // Fetch fresh reviews data
      const updatedReviewsData = await reviewService.getQuizReviews(quizId);
      console.log("Received updated reviews:", updatedReviewsData);

      setReviewStats(updatedReviewsData);
      setReviews(updatedReviewsData.reviews || []);

      handleCloseEditModal();
    } catch (err) {
      console.error("Error updating review:", err);
      setError(err.message || "Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  const { id: quizId } = useParams();

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        // Get quiz title
        const quizData = await quizService.getQuizById(quizId);
        console.log("Quiz data:", quizData);
        setQuizTitle(quizData.title);

        // Get reviews using new endpoint
        const reviewsData = await reviewService.getQuizReviews(quizId);
        console.log("Reviews data:", reviewsData);

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
    };

    loadReviews();
  }, [quizId]);
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
        <Link
          to={`/quizzes/${quizId}/write-review`}
          style={{
            color: "#1976d2",
          }}
        >
          WRITE YOUR REVIEW
        </Link>
      </Box>

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
                    <IconButton aria-label="delete">
                      <Clear />
                    </IconButton>
                  </Box>
                  <Typography variant="h6">{review.studentName}</Typography>
                  <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
                    Rating: {review.rating}/5
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
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
