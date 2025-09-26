import PropTypes from "prop-types";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { esES } from "@mui/x-data-grid/locales";
import { esES as coreesES } from "@mui/material/locale";

let theme = createTheme(
  {
    palette: {
      primary: {
        main: "#d63016",
      },
      secondary: {
        main: "#e95424",
      },
      mode: "light",
    },
    typography: {
      fontFamily: [
        "Inter, sans-serif",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  },
  esES, // x-data-grid translations
  coreesES // mui translations
);

// Make theme responsive for different screen sizes
theme = responsiveFontSizes(theme);

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    white: theme.palette.augmentColor({
      color: {
        main: "#EEEEEE",
      },
      name: "white",
    }),
    black: theme.palette.augmentColor({
      color: {
        main: "#151515",
      },
      name: "black",
    }),
    gray: theme.palette.augmentColor({
      color: {
        main: "#f5f5f5",
      },
      name: "gray",
    }),
  },
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;
