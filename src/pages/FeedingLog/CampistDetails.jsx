import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";

import PhoneIcon from "@mui/icons-material/Phone";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

import CampistPhoto from "./CampistPhoto";

const getIconByCampistType = (campistType) =>
  campistType === "ESTADÍA" ? <HolidayVillageIcon /> : <DirectionsRunIcon />;

const CampistDetails = ({ campist }) => {
  return (
    <Box
      id="id_campist_section"
      component="section"
      sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
    >
      <CampistPhoto
        fullName={campist.fullName}
        gender={campist.gender}
        photoUrl={campist.photo}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        <Chip
          sx={{
            padding: "0px 8px",
            fontWeight: "bold",
            backgroundColor:
              campist.campistType == "ESTADÍA" ? "secondary.light" : "gold",
          }}
          icon={getIconByCampistType(campist.campistType)}
          label={campist.campistType}
          size="small"
        />
        <Chip
          sx={{ padding: "0px 8px" }}
          icon={<PhoneIcon />}
          label={campist.cellphone || "N/A"}
          size="small"
        />
        <Typography
          variant="h6"
          fontStyle="italic"
          color="primary.dark"
          sx={{
            display: "flex",
            flexBasis: "100%",
            lineHeight: "1.4",
            fontWeight: "600",
          }}
        >
          {campist.fullName}
        </Typography>
        <Alert severity="info" sx={{ width: "100%" }}>
          <b>¿Alergias?</b>
          {` ${campist.allergies}`}
        </Alert>
      </Box>
    </Box>
  );
};

CampistDetails.propTypes = {
  campist: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    lastName: PropTypes.string,
    idType: PropTypes.string,
    campistType: PropTypes.string,
    cellphone: PropTypes.string,
    birthdate: PropTypes.string,
    gender: PropTypes.string,
    bloodType: PropTypes.string,
    allergies: PropTypes.string,
    age: PropTypes.string,
    fullName: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default CampistDetails;
