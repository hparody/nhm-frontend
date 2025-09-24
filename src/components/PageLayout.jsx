import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const PageLayout = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        boxSizing: "border-box",
        justifyContent: "center",
        backgroundColor: "#f5f5f5c3",
        padding: "12px",
      }}
    >
      {children}
    </Box>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
