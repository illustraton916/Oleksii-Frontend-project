import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export const NavigationButton = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  marginRight: 16,
  "&:hover": {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
}));
