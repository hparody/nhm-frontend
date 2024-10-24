import Box from "@mui/material/Box";

import { Outlet, useLocation } from "react-router-dom";

import NavBar from "./NavBar";

const PageLayout = () => {
  const location = useLocation();

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {location.pathname === "/" && <NavBar />}
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default PageLayout;
