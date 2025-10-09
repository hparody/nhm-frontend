import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NotFoundPage from "@/pages/NotFoundPage";
import Home from "@/pages/Home";
import Camp from "@/pages/Camp";
import FeedingLog from "@/pages/FeedingLog";
import FeedingLogSheets from "@/pages/FeedingLog/FeedingLogSheets";
import FeedingReport from "@/pages/FeedingReport";
import AttendanceLog from "@/pages/AttendanceLog";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<NotFoundPage />} />
      <Route
        path="/camp/emunah-2025"
        element={<Camp />}
        errorElement={<NotFoundPage />}
      />
      <Route
        path="/camp/emunah-2025/attendance"
        element={<AttendanceLog />}
        errorElement={<NotFoundPage />}
      />
      <Route
        path="/camp/emunah-2025/feeding-log"
        element={<FeedingLog />}
        errorElement={<NotFoundPage />}
      />
      <Route
        path="/camp/emunah-2025/feeding-log-sheets"
        element={<FeedingLogSheets />}
        errorElement={<NotFoundPage />}
      />
      <Route
        path="/camp/emunah-2025/feeding-report"
        element={<FeedingReport />}
        errorElement={<NotFoundPage />}
      />
    </>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
