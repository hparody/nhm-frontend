import CssBaseline from "@mui/material/CssBaseline";

import CustomGlobalStyles from "@/components/CustomGlobalStyles";
import ThemeProvider from "@/providers/ThemeProvider";

import Router from "./router/Router";

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline enableColorScheme />
      <CustomGlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;
