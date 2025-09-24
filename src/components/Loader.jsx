import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

const Loader = ({ loaderMessage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        minHeight: "300px",
      }}
    >
      <CircularProgress color="primary" />
      {loaderMessage && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Cargando campistas...
        </Typography>
      )}
    </Box>
  );
};

Loader.propTypes = {
  loaderMessage: PropTypes.string,
};

export default Loader;
