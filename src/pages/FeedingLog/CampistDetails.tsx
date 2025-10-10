import { Campist, CampistNewApi } from "@/types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";

import CampistPhoto from "@/components/fields/CampistPhoto";

const getIconByCampistType = (campistType) => {
  const campistIcons = {
    ESTADÍA: <HolidayVillageIcon />,
    PASADÍA: <DirectionsRunIcon />,
    "NO ASISTIRÁ": <EventBusyIcon />,
  };
  return campistIcons[campistType] || null;
};

const getChipColorByCampistType = (campistType) => {
  const campistIcons = {
    ESTADÍA: "success",
    PASADÍA: "info",
    "NO ASISTIRÁ": "error",
  };

  return campistIcons[campistType] || "default";
};

const CampistDetails = ({ campist }: { campist: Campist | CampistNewApi }) => {
  return (
    <Box
      id="id_campist_section"
      component="section"
      sx={{ display: "flex", flexDirection: "row", gap: "8px", width: "100%" }}
    >
      <CampistPhoto
        photoUrl={campist.photo}
        gender={campist.gender}
        alt={campist.fullName}
        sx={{ marginRight: "8px" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: "4px",
        }}
      >
        {campist.campistType && (
          <Chip
            sx={{
              padding: "8px 12px",
              fontWeight: "bold",
              fontSize: "0.8rem",
              cursor: "default",
            }}
            icon={getIconByCampistType(campist.campistType)}
            label={campist.campistType}
            color={getChipColorByCampistType(campist.campistType)}
            size="small"
            variant="outlined"
          />
        )}
        <Typography
          variant="h6"
          color="text.main"
          sx={{
            display: "flex",
            flexBasis: "100%",
            lineHeight: "1.4",
            fontWeight: "600",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
          }}
        >
          {campist.fullName}
        </Typography>
        <Divider sx={{ margin: "0px", width: "100%" }} />
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: "4px",
            margin: "0px",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center", marginRight: "4px" }}
          >
            <PhoneAndroidIcon fontSize="small" />
            {`Teléfono: `}
            <Typography
              variant="caption"
              fontWeight="normal"
              color="text.secondary"
              sx={{ marginLeft: "4px" }}
            >
              {campist.cellphone || "N/A"}
            </Typography>
          </Typography>
          {campist.cellphone && campist.cellphone !== "" && (
            <Link
              href={`https://wa.me/57${campist.cellphone}`}
              underline="none"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#ffffff",
              }}
            >
              <Chip
                clickable
                variant="filled"
                size="small"
                label={"Enviar mensaje"}
                icon={
                  <WhatsAppIcon
                    fontSize="small"
                    sx={(theme) => ({ fill: theme.palette.white.main })}
                  />
                }
                sx={{
                  padding: "0px 8px",
                  fontWeight: "bold",
                  color: "white.main",
                  backgroundColor: "#25D366",
                  "&:hover": {
                    backgroundColor: "#08742f",
                  },
                }}
              />
            </Link>
          )}
        </Box>
        {campist.allergies && (
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ display: "flex", margin: "0px" }}
            color="text.secondary"
          >
            <GppMaybeIcon fontSize="small" />
            {`Alergias: `}
            <Typography
              variant="caption"
              fontWeight="normal"
              color="text.secondary"
              sx={{ marginLeft: "4px" }}
            >
              {campist.allergies ?? ""}
            </Typography>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CampistDetails;
