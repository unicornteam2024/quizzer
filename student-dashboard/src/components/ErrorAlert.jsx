import { Box, Alert, AlertTitle } from "@mui/material";

const ErrorAlert = ({ errorMessage }) => (
  <Box sx={{ m: 2 }}>
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {errorMessage}
    </Alert>
  </Box>
);

export default ErrorAlert;