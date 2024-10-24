import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NotFoundPage from "@/pages/NotFoundPage";
import Home from "@/pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} errorElement={<NotFoundPage />} />
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
