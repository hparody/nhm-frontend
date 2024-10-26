import { useEffect, useState, useMemo, useCallback } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";

/** Select */
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PhoneIcon from "@mui/icons-material/Phone";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { getCampData } from "@/services/sheetsApi";
import { createFeedingRecord } from "@/services/appScriptsApi";
import { parseCampistsData } from "@/utils/sheets";

import AvivadosBgImage from "@/assets/avivados-bg-fullcolor.jpg";
import DefaultManPhoto from "@/assets/man-icon.png";
import DefaultWomanPhoto from "@/assets/woman-icon.png";

const Image = styled("img")`
  object-fit: cover;
  object-position: 50% 56%;
  height: 180px;
  border-radius: 4px;
`;

const DEFAULT_CAMPIST = {
  id: "",
  name: "",
  lastName: "",
  idType: "",
  campistType: "",
  cellphone: "",
  birthdate: "",
  gender: "",
  bloodType: "",
  allergies: "",
  age: "",
  fullName: "",
  photo: "",
};

const getDefaultIconByGender = (gender) =>
  gender === "Masculino" ? DefaultManPhoto : DefaultWomanPhoto;

const getIconByCampistType = (campistType) =>
  campistType === "ESTADÍA" ? <HolidayVillageIcon /> : <DirectionsRunIcon />;

const customAutocompleteOption = (props, option) => {
  const { key, ...optionProps } = props;
  let campistPhoto = option.photo;
  if (campistPhoto === "") {
    campistPhoto = getDefaultIconByGender(option.gender);
  } else {
    campistPhoto += "&w=300";
  }
  return (
    <Box
      key={key}
      component="li"
      sx={{
        "& > img": {
          mr: 2,
          flexShrink: 0,
          aspectRatio: 1,
          objectFit: "cover",
          borderRadius: "50%",
          border: "2px solid #ccc",
          objectPosition: "50% 25%",
        },
      }}
      {...optionProps}
    >
      <img loading="lazy" width="20" src={campistPhoto} alt={option.fullName} />
      {option.fullName}
    </Box>
  );
};

const foodDayOptions = [
  { label: <em>Selecciona un día</em>, value: "none" },
  { label: "Viernes", value: "friday" },
  { label: "Sábado", value: "saturday" },
  { label: "Domingo", value: "sunday" },
  { label: "Lunes", value: "monday" },
];
const foodTypeOptions = [
  { label: <em>Selecciona una comida</em>, value: "none" },
  { label: "Desayuno", value: "breakfast" },
  { label: "Almuerzo", value: "lunch" },
  { label: "Cena", value: "dinner" },
];

const FeedingLog = () => {
  const [campists, setCampists] = useState([]);
  const [feedingValues, setFeedingValues] = useState({
    foodDay: "none",
    foodType: "none",
  });
  const [selectedCampist, setSelectedCampist] = useState(DEFAULT_CAMPIST);
  const [searchCampist, setSearchCampist] = useState("");

  const filteredFoodDayOptions = foodDayOptions;
  const filteredFoodTypeOptions = useMemo(() => {
    switch (feedingValues.foodDay) {
      case "friday":
        return foodTypeOptions.filter(
          (opt) => opt.value !== "breakfast" && opt.value !== "lunch"
        );

      case "saturday":
      case "sunday":
        return foodTypeOptions;

      case "monday":
        return foodTypeOptions.filter((opt) => opt.value !== "dinner");

      case "none":
      default:
        return foodTypeOptions.filter((opt) => opt.value == "none");
    }
  }, [feedingValues.foodDay]);

  const handleFeedingValuesChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFeedingValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  const onCampistChange = (_, newValue) => {
    setSelectedCampist(newValue ?? DEFAULT_CAMPIST);
  };

  const fetchCampData = async () => {
    const res = await getCampData();
    if (!res.error) {
      setCampists(parseCampistsData(res.data.values));
    }
  };

  const onSubmitFeedingLog = useCallback(
    async (event) => {
      event.preventDefault();

      const feedingRecord = {
        datetime: new Date().toLocaleString(),
        id: selectedCampist.id,
        name: selectedCampist.fullName,
        day: feedingValues.foodDay,
        foodType: feedingValues.foodType,
      };

      const res = await createFeedingRecord(feedingRecord);
      if (!res.error) {
        console.log(res.data);
      } else {
        console.error("Error creating feeding record:", res.errorMessage);
      }
    },
    [selectedCampist, feedingValues]
  );

  useEffect(() => {
    fetchCampData();
  }, []);

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "600px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        overflow: "hidden auto",
        boxSizing: "border-box",
      }}
    >
      <Image src={AvivadosBgImage} alt="Avivados Fondo" loading="lazy" />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "20px 24px",
          gap: "12px",
        }}
        onSubmit={onSubmitFeedingLog}
      >
        <Box
          component="article"
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Registro de Alimentación
          </Typography>
          <Typography variant="body2" fontStyle="italic">
            A través de este formulario podrás registrar la información de
            alimentación de cada campista.
          </Typography>
        </Box>
        <Box
          component="article"
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <FormControl fullWidth required>
            <FormLabel id="id_food_day_label">Día de alimentación</FormLabel>
            <Select
              labelId="id_food_day_label"
              aria-labelledby="id_food_day_label"
              id="id_food_day"
              name="foodDay"
              value={feedingValues.foodDay}
              placeholder="Viernes"
              defaultValue="none"
              onChange={handleFeedingValuesChange}
            >
              {filteredFoodDayOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.value == "none"}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <FormLabel id="id_food_type_label">Tipo de comida</FormLabel>
            <Select
              labelId="id_food_type_label"
              id="id_food_type"
              name="foodType"
              value={feedingValues.foodType}
              placeholder="Desayuno"
              defaultValue="none"
              onChange={handleFeedingValuesChange}
            >
              {filteredFoodTypeOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.value === "none"}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ margin: "8px 0px" }} />
        <Box
          component="article"
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <Typography variant="body2" fontStyle="italic" sx={{ width: "100%" }}>
            Busca por el nombre del campista o escanea su código QR.
          </Typography>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            startIcon={<QrCodeScannerIcon />}
            sx={{ fontWeight: "bold" }}
          >
            Escanear QR
          </Button>
          <FormControl fullWidth required>
            <FormLabel id="id_campist_label">Campista</FormLabel>
            <Autocomplete
              id="id_campist"
              aria-labelledby="id_campist_label"
              value={selectedCampist}
              onChange={onCampistChange}
              inputValue={searchCampist}
              onInputChange={(_, newInputValue) =>
                setSearchCampist(newInputValue)
              }
              fullWidth
              autoComplete
              autoHighlight
              disablePortal
              clearOnEscape
              options={campists}
              getOptionKey={(option) => option.id}
              getOptionLabel={(option) => option.fullName}
              renderInput={(params) => (
                <TextField fullWidth {...params} placeholder="Juan Gómez" />
              )}
              renderOption={customAutocompleteOption}
            />
          </FormControl>
          {selectedCampist?.id !== "" && (
            <Box
              component="div"
              sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
            >
              <Avatar
                alt={selectedCampist.fullName || ""}
                src={
                  selectedCampist.photo ||
                  getDefaultIconByGender(selectedCampist.gender)
                }
                variant="rounded"
                sx={{
                  width: "100px",
                  height: "auto",
                  marginRight: "8px",
                }}
                imgProps={{
                  sx: {
                    aspectRatio: 1,
                    objectFit:
                      selectedCampist.photo !== "" ? "cover" : "contain",
                    objectPosition:
                      selectedCampist.photo !== "" ? "50% 20%" : "50% 50%",
                  },
                  loading: "lazy",
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
                      selectedCampist.campistType == "ESTADÍA"
                        ? "secondary.main"
                        : "coral",
                  }}
                  icon={getIconByCampistType(selectedCampist.campistType)}
                  label={selectedCampist.campistType}
                  size="small"
                />
                <Chip
                  sx={{ padding: "0px 8px" }}
                  icon={<PhoneIcon />}
                  label={selectedCampist.cellphone || "N/A"}
                  size="small"
                />
                <Typography
                  variant="h6"
                  fontStyle="italic"
                  color="primary.dark"
                  sx={{ display: "flex", flexBasis: "100%", lineHeight: "1.4" }}
                >
                  {selectedCampist.fullName}
                </Typography>
                <Alert severity="info" sx={{ width: "100%" }}>
                  <b>¿Alergias?</b>
                  {` ${selectedCampist.allergies}`}
                </Alert>
              </Box>
            </Box>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<HowToRegIcon />}
          disabled={selectedCampist.id === ""}
        >
          REGISTRAR ALIMENTACIÓN
        </Button>
      </Box>
    </Box>
  );
};

export default FeedingLog;
