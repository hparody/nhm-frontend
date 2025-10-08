// src/theme/_augment.d.ts

import "@mui/material/styles";
import "@mui/material/Button";
import "@mui/material/SvgIcon";

// Augment the Palette with your new custom color
declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
    black: Palette["primary"];
    gray: Palette["primary"];
  }
  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

// Augment the component's color props
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
    black: true;
    gray: true;
  }
}
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    white: true;
    black: true;
    gray: true;
  }
}
