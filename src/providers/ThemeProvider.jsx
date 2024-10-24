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
        main: "#0D0D0D",
      },
      secondary: {
        main: "#BFBFBF",
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
        main: "##f5f5f5",
      },
      name: "gray",
    }),
  },
});

theme = responsiveFontSizes(theme);

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;
