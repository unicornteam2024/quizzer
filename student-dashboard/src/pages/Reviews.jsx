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
import { Clear } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { quizService } from "../services/quizService";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorAlert from "../components/ErrorAlert";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: quizId } = useParams();

  const totalRating = reviews.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);

  const averageRating = reviews.length
    ? totalRating / reviews.length
    : totalRating;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await quizService.getQuizById(quizId);
        setReviews(data.reviews);
        setQuizTitle(data.title);
      } catch (err) {
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
        {Number.isInteger(averageRating)
          ? averageRating
          : averageRating.toFixed(1)}
        /5 rating average based on {reviews.length}{" "}
        {reviews.length > 1 ? "reviews" : "review"}
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

      {reviews.length === 0 ? (
        <Box>
          <Alert severity="info">No reviews available</Alert>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {reviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <Card variant="outlined">
                <CardContent sx={{ position: "relative" }}>
                  <IconButton
                    aria-label="delete"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                  >
                    <Clear />
                  </IconButton>
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
    </Container>
  );
};
export default Reviews;
