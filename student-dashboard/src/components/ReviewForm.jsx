import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Rating,
  Box,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const ReviewForm = ({ open, onClose, initialData, onSubmit, mode = "add" }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    rating: 0,
    comment: "",
  });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        studentName: initialData.studentName || "",
        rating: initialData.rating || 0,
        comment: initialData.comment || "",
      });
    }
  }, [initialData]);

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

  const handleSubmit = async (event) => {
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

    try {
      await onSubmit(formData);
      setShowSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to submit review");
    }
  };

  const handleClose = () => {
    setFormData({ studentName: "", rating: 0, comment: "" });
    setError("");
    setShowSuccess(false);
    onClose();
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Review {mode === "add" ? "Submitted" : "Updated"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your review has been successfully{" "}
            {mode === "add" ? "added" : "updated"}. Thank you for your feedback!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === "add" ? "Add Review" : "Edit Review"}</DialogTitle>
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
          <Button type="submit" variant="contained" color="primary">
            {mode === "add" ? "Submit Review" : "Save Changes"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

ReviewForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    studentName: PropTypes.string,
    rating: PropTypes.number,
    comment: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]),
};

export default ReviewForm;
