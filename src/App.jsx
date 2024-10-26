import CssBaseline from "@mui/material/CssBaseline";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import CustomGlobalStyles from "@/components/CustomGlobalStyles";
import ThemeProvider from "@/providers/ThemeProvider";

import PageLayout from "@/components/PageLayout";
import Router from "./router/Router";

const App = () => {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <CssBaseline enableColorScheme />
        <CustomGlobalStyles />
        <PageLayout>
          <Router />
        </PageLayout>
      </NotificationsProvider>
    </ThemeProvider>
  );
};

export default App;
