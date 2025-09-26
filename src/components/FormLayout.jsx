import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import FuertesBackground from "@/assets/fuertes-bg.png";

const Image = styled("img")`
  object-fit: cover;
  object-position: 50% 56%;
  height: 180px;
  border-radius: 4px;
`;

const FormLayout = ({ children }) => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "600px",
        height: "fit-content",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Image src={FuertesBackground} alt="Avivados Fondo" loading="lazy" />
      {children}
    </Box>
  );
};

FormLayout.propTypes = {
  children: PropTypes.node,
};

export default FormLayout;
