import { createTheme } from "@mui/material/styles";
import "vazirmatn/misc/UI-Farsi-Digits/Vazirmatn-UI-FD-font-face.css";
import { lightPalette, darkPalette } from './types/ThemeColor';

export const createAppTheme = (mode: "light" | "dark") => {
  return createTheme({
    typography: {
      fontFamily: "Vazirmatn UI FD",
    },
    palette: mode === "light" ? lightPalette : darkPalette,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            userSelect: "none",
            overflow: "overlay",
            touchAction: "pan-x pan-y",
          },
          "::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "::-webkit-scrollbar-track": {
            border: "2px solid transparent",
            backgroundClip: "padding-box",
            backgroundColor: "rgba(0, 0, 0, 0.02)",
            borderRadius: "10px",
          },
          "::-webkit-scrollbar-track:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          },
          "::-webkit-scrollbar-thumb": {
            border: "4px solid transparent",
            backgroundClip: "padding-box",
            backgroundColor: "#888",
            borderRadius: "10px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            borderWidth: "3.5px",
            backgroundColor: "#555",
          },
          "*:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "#666",
          },
          "::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#444",
          },
          "::-webkit-scrollbar-corner": {
            backgroundColor: "rgb(37, 37, 38)",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: "Vazirmatn UI FD",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontFamily: "Vazirmatn UI FD",
          },
        },
      },
    },
  });
};
