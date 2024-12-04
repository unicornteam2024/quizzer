import {
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { quizService } from "../services/quizService";
import { reviewService } from "../services/reviewService";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const SuccessDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Review Submitted</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Your review has been successfully added. Thank you for your feedback!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);
const AddReview = () => {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nickname: "",
    rating: "",
    review: "",
  });
  const [quiz, setQuiz] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      studentName: formValues.nickname,
      rating: parseInt(formValues.rating, 10),
      comment: formValues.review,
    };
    try {
      const createdReview = await reviewService.writeReview(quizId, reviewData);
      console.log("Review created successfully: ", createdReview);
      setDialogOpen(true);
    } catch (error) {
      console.error("Failed to create review: ", error.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate(`/quizzes/${quizId}/reviews`);
  };

  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          Add a review for &quot;{quiz.title}&quot;
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            name="nickname"
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            sx={{ width: "100%" }}
            value={formValues.nickname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Rating</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="rating"
              value={formValues.rating}
              onChange={handleInputChange}
              required
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="1 - Useless"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="2 - Poor"
              />
              <FormControlLabel value="3" control={<Radio />} label="3 - OK" />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="4 - Good"
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="5 - Execellent"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <TextField
            name="review"
            id="outlined-basic"
            label="Review"
            variant="outlined"
            sx={{ width: "100%" }}
            multiline
            rows={4}
            value={formValues.review}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" variant="text">
          Submit your review
        </Button>
      </form>
      <SuccessDialog open={dialogOpen} onClose={handleDialogClose} />
    </div>
  );
};
export default AddReview;
