import CssBaseline from "@mui/material/CssBaseline";

import CustomGlobalStyles from "@/components/CustomGlobalStyles";
import ThemeProvider from "@/providers/ThemeProvider";

import PageLayout from "@/components/PageLayout";
import Router from "./router/Router";

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline enableColorScheme />
      <CustomGlobalStyles />
      <PageLayout>
        <Router />
      </PageLayout>
    </ThemeProvider>
  );
};

export default App;
