import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Box,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const EditReviewForm = ({ open, onClose, review, onSave }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    rating: 0,
    comment: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (review) {
      setFormData({
        studentName: review.studentName,
        rating: review.rating,
        comment: review.comment,
      });
    }
  }, [review]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (_, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.studentName.trim()) {
      setError("Name is required");
      return;
    }
    if (!formData.comment.trim()) {
      setError("Comment is required");
      return;
    }
    if (!formData.rating) {
      setError("Rating is required");
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Review</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="studentName"
              label="Your Name"
              value={formData.studentName}
              onChange={handleChange}
              fullWidth
              required
            />
            <Box>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                precision={1}
              />
            </Box>
            <TextField
              name="comment"
              label="Your Review"
              value={formData.comment}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

EditReviewForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  review: PropTypes.shape({
    studentName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};

export default EditReviewForm;
