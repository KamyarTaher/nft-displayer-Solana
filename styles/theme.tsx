"use client";
import { createTheme } from "@mui/material/styles";

/**
 * Theme configuration for the MUI components.
 */
export const colorPrimaryLight = "#4a4a5e";
export const colorPrimaryMain = "#3a3a46";
const theme = createTheme({
  palette: {
    text: {
      primary: "#e0e0e0",
      secondary: "#e0e0e0",
    },
    primary: {
      light: colorPrimaryLight,
      main: colorPrimaryMain,
      dark: "#2a2a36",
    },
    background: {
      default: "#120c18",
      paper: "#2a2a36",
    },
  },
});

export default theme;
