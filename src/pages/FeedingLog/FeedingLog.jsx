import { useEffect, useState, useMemo, useCallback } from "react";

import { useNotifications } from "@toolpad/core";

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

import LoadingButton from "@mui/lab/LoadingButton";

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
import { getOptionLabel } from "@/utils/array";

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
  return (
    <Box key={key} component="li" {...optionProps}>
      <Avatar
        alt={option.fullName}
        variant="rounded"
        sx={{
          mr: 2,
          flexShrink: 0,
          aspectRatio: 1,
          width: "36px",
          height: "36px",
          fontSize: "1.2rem",
        }}
      >{`${option.fullName.split(" ")[0][0]}${option.fullName.split(" ")[1][0]}`}</Avatar>
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

const getSuggestedDay = () => {
  const currentDay = new Date().getDay();

  switch (currentDay) {
    case 0:
      return "sunday";
    case 1:
      return "monday";

    case 5:
      return "friday";

    case 6:
      return "saturday";
    case 2:
    case 3:
    case 4:
    default:
      return "none";
  }
};

const FeedingLog = () => {
  const notifications = useNotifications();

  const [campists, setCampists] = useState([]);
  const [feedingValues, setFeedingValues] = useState({
    registeredBy: undefined,
    foodDay: getSuggestedDay(),
    foodType: "none",
  });
  const [selectedCampist, setSelectedCampist] = useState(DEFAULT_CAMPIST);
  const [searchCampist, setSearchCampist] = useState("");
  const [savingRecord, setSavingRecord] = useState(false);

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

  const fetchCampData = useCallback(async () => {
    const res = await getCampData();
    if (!res.error) {
      setCampists(parseCampistsData(res.data.values));
    } else {
      notifications.show("Error al cargar los campistas.", {
        key: "feeding-log",
        severity: "error",
        autoHideDuration: 5000,
      });
    }
  }, [notifications]);

  const onSubmitFeedingLog = useCallback(
    async (event) => {
      event.preventDefault();
      setSavingRecord(true);

      const feedingRecord = {
        datetime: new Date().toLocaleString(),
        id: selectedCampist.id,
        name: selectedCampist.fullName,
        day: feedingValues.foodDay,
        foodType: feedingValues.foodType,
      };

      const res = await createFeedingRecord(feedingRecord);
      if (!res.error) {
        const successMessage = `Alimentación (${getOptionLabel(feedingValues.foodDay, foodDayOptions)} - ${getOptionLabel(feedingValues.foodType, foodTypeOptions)}) para ${selectedCampist.fullName} registrada exitosamente.`;
        notifications.show(successMessage, {
          key: "feeding-log",
          severity: "success",
          autoHideDuration: 3000,
        });
        setSelectedCampist(DEFAULT_CAMPIST);
      } else {
        console.error("Error creating feeding record:", res.errorMessage);
        const errorMessage = `Error: ${res.errorMessage}`;
        notifications.show(errorMessage, {
          key: "feeding-log",
          severity: "error",
          autoHideDuration: 3000,
        });
      }
      setSavingRecord(false);
    },
    [selectedCampist, feedingValues, notifications]
  );

  useEffect(() => {
    fetchCampData();
  }, [fetchCampData]);

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
        overflow: "hidden",
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
            A través de este formulario podrás realizar el registro de
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
            <FormLabel id="id_registered_by">
              Nombre de quien registra
            </FormLabel>
            <TextField
              required
              fullWidth
              name="registeredBy"
              placeholder="Luis Álvarez"
              aria-labelledby="id_registered_by"
              value={feedingValues.registeredBy}
              onChange={handleFeedingValuesChange}
            ></TextField>
          </FormControl>
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
                        ? "secondary.light"
                        : "gold",
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
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<HowToRegIcon />}
          disabled={selectedCampist.id === ""}
          loading={savingRecord}
          loadingPosition="center"
        >
          REGISTRAR ALIMENTACIÓN
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default FeedingLog;
