import PropTypes from "prop-types";
import ReviewForm from "./ReviewForm";

const EditReviewForm = ({ open, onClose, review, onSave }) => {
  const handleSubmit = async (formData) => {
    try {
      await onSave(formData);
      return true; // Success will trigger the success dialog in ReviewForm
    } catch (error) {
      throw new Error(error.message || "Failed to update review");
    }
  };

  return (
    <ReviewForm
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      initialData={review}
      mode="edit"
    />
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
