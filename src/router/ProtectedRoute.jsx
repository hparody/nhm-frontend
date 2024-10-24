import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/sign-in" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
export default ProtectedRoute;
