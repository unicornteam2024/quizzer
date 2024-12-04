import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Reviews = () => {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  const writeReview = () => {
    navigate(`/quizzes/${quizId}/write-review`); // Navigate to the Write Review page
  };

  return (
    <Button variant="text" onClick={writeReview}>
      Write your review
    </Button>
  );
};
export default Reviews;
