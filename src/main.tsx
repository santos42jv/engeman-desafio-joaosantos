import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router/router.tsx";

import "./index.css";
import { createTheme, ThemeProvider, THEME_ID } from "@mui/material/styles";

const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#ee5f3d",
    },
    secondary: {
      main: "#2e4490",
      dark: "#23294b",
    },
    common: {
      white: "#f1f5fb",
      black: "#000000",
    },
  },
  typography: {
    fontFamily: "Montserrat, Roboto, sans-serif",

    h1: {
      fontSize: "2.5rem", // 40px
      fontWeight: 700,
      lineHeight: 1.2,
    },

    h2: {
      fontSize: "2rem", // 32px
      fontWeight: 700,
      lineHeight: 1.25,
    },

    h3: {
      fontSize: "1.75rem", // 28px
      fontWeight: 600,
      lineHeight: 1.3,
    },

    h4: {
      fontSize: "1.5rem", // 24px
      fontWeight: 600,
      lineHeight: 1.35,
    },

    h5: {
      fontSize: "1.25rem", // 20px
      fontWeight: 600,
      lineHeight: 1.4,
    },

    h6: {
      fontSize: "1rem", // 16px
      fontWeight: 600,
      lineHeight: 1.4,
    },

    subtitle1: {
      fontSize: "1rem",
      fontWeight: 700,
    },

    subtitle2: {
      fontSize: "0.9rem",
      fontWeight: 600,
    },

    body1: {
      fontSize: "0.95rem",
      lineHeight: 1.5,
    },

    body2: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      color: "#6b7280",
    },

    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
    },

    button: {
      fontSize: "0.9rem",
      fontWeight: 600,
      textTransform: "none",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <Router />
    </ThemeProvider>
  </StrictMode>,
);
