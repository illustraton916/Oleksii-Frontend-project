import React from "react";
import { Box, Typography, Container } from "@mui/material";

const ErrorNotFound = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default ErrorNotFound;
