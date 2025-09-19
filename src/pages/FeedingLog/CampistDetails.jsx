import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";

import PhoneIcon from "@mui/icons-material/Phone";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

import DefaultManPhoto from "@/assets/man-icon.png";
import DefaultWomanPhoto from "@/assets/woman-icon.png";

const getDefaultIconByGender = (gender) =>
  gender === "Masculino" ? DefaultManPhoto : DefaultWomanPhoto;

const getIconByCampistType = (campistType) =>
  campistType === "ESTADÍA" ? <HolidayVillageIcon /> : <DirectionsRunIcon />;

const CampistDetails = ({ campist }) => {
  return (
    <Box
      id="id_campist_section"
      component="section"
      sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
    >
      <Avatar
        alt={campist.fullName || ""}
        src={campist.photo || getDefaultIconByGender(campist.gender)}
        variant="rounded"
        sx={{
          width: "100px",
          height: "auto",
          marginRight: "8px",
        }}
        slotProps={{
          img: {
            sx: {
              aspectRatio: 1,
              objectFit: campist.photo !== "" ? "cover" : "contain",
              objectPosition: campist.photo !== "" ? "50% 20%" : "50% 50%",
              loading: "lazy",
            },
          },
        }}
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
          sx={{ display: "flex", flexBasis: "100%", lineHeight: "1.4" }}
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
