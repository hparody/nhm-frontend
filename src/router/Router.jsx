import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NotFoundPage from "@/pages/NotFoundPage";
import Home from "@/pages/Home";
import FeedingLog from "@/pages/FeedingLog";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<NotFoundPage />} />
      <Route
        path="/camp/avivados2024/feeding-log"
        element={<FeedingLog />}
        errorElement={<NotFoundPage />}
      />
    </>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
