import {
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
const handleSubmit = () => {};
const AddReview = () => {
  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          Add a review for
        </Typography>

        <TextField
          id="outlined-basic"
          label="Nickname"
          variant="outlined"
          sx={{ width: "100ch" }}
        />
      </div>
      <div>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Rating</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Review"
          variant="outlined"
          sx={{ width: "100ch" }}
        />
      </div>
      <Button variant="text" onClick={handleSubmit}>
        Submit your review
      </Button>
    </div>
  );
};
export default AddReview;
