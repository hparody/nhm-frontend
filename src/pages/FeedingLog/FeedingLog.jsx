import { useEffect, useState, useMemo, useCallback } from "react";

import { useNotifications } from "@toolpad/core";

import Box from "@mui/material/Box";
import {
  Button,
  FormHelperText,
  styled,
  CircularProgress,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";

/** Select */
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import HowToRegIcon from "@mui/icons-material/HowToReg";

import { getCampData } from "@/services/sheetsApi";
import { createFeedingRecord } from "@/services/appScriptsApi";
import { parseCampistsData } from "@/utils/sheets";
import { getOptionLabel } from "@/utils/array";

import QrScanButton from "@/components/QrScanButton";

import AvivadosBgImage from "@/assets/avivados-bg-fullcolor.jpg";

import CampistDetails from "./CampistDetails";

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

const DEFAULT_ERRORS = {
  registeredBy: false,
  foodDay: false,
  foodType: false,
  campist: false,
};

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
  const [loadingCampists, setLoadingCampists] = useState(true);
  const [feedingValues, setFeedingValues] = useState({
    registeredBy: "",
    foodDay: getSuggestedDay(),
    foodType: "none",
  });
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
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

  const updateFieldError = (fieldName, fieldValue) => {
    let errorObj = {};
    switch (fieldName) {
      case "registeredBy":
        errorObj[fieldName] = !fieldValue || fieldValue.trim().length === 0;
        break;

      case "foodDay":
      case "foodType":
        errorObj[fieldName] = fieldValue === "none";
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...errorObj,
    }));
  };

  const handleFeedingValuesChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFeedingValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
    updateFieldError(fieldName, fieldValue);
  };

  const onCampistChange = (_, newValue) => {
    setSelectedCampist(newValue ?? DEFAULT_CAMPIST);
  };

  const fetchCampData = useCallback(async () => {
    setLoadingCampists(true);
    const res = await getCampData();
    if (!res.error) {
      setCampists(parseCampistsData(res.data.values));
    } else {
      notifications.show("Error al cargar los campistas.", {
        key: "campists",
        severity: "error",
        autoHideDuration: 5000,
      });
    }
    setLoadingCampists(false);
  }, [notifications]);

  const isFormValid = useCallback(() => {
    return (
      selectedCampist.id &&
      feedingValues.foodDay !== "none" &&
      feedingValues.foodType !== "none" &&
      feedingValues.registeredBy !== ""
    );
  }, [selectedCampist, feedingValues]);

  const updateFormErrors = useCallback(() => {
    setErrors({
      registeredBy: feedingValues.registeredBy === "",
      foodDay: feedingValues.foodDay === "none",
      foodType: feedingValues.foodType === "none",
      campist: !selectedCampist.id,
    });
  }, [selectedCampist, feedingValues]);

  const saveFeedingRecord = useCallback(
    async ({ campistId, campistName, day, foodType, registeredBy }) => {
      const feedingRecord = {
        datetime: new Date().toLocaleString(),
        id: campistId,
        name: campistName,
        day,
        foodType,
        registeredBy,
      };

      const res = await createFeedingRecord(feedingRecord);
      if (!res.error) {
        const successMessage = `Alimentación (${getOptionLabel(day, foodDayOptions)} - ${getOptionLabel(foodType, foodTypeOptions)}) para ${campistName} registrada exitosamente.`;
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
    },
    [notifications]
  );

  const onSubmitFeedingLog = useCallback(
    async (event) => {
      event.preventDefault();
      setSavingRecord(true);

      if (isFormValid()) {
        await saveFeedingRecord({
          campistId: selectedCampist.id,
          campistName: selectedCampist.fullName,
          day: feedingValues.foodDay,
          foodType: feedingValues.foodType,
          registeredBy: feedingValues.registeredBy,
        });
      } else {
        notifications.show("Todos los campos son obligatorios.", {
          key: "form-errors",
          severity: "error",
          autoHideDuration: 3000,
        });
      }
      updateFormErrors();
      setSavingRecord(false);
    },
    [
      setSavingRecord,
      isFormValid,
      saveFeedingRecord,
      selectedCampist,
      feedingValues,
      notifications,
      updateFormErrors,
    ]
  );

  const onScanningCampist = (campistIdEncoded) => {
    try {
      const campistIdDecoded = atob(campistIdEncoded).toString();
      const campist = campists.find((c) => c.id === campistIdDecoded);
      if (campist) {
        setSelectedCampist(campist);
        notifications.show(campist.fullName, {
          key: "scanned-campist",
          severity: "info",
          autoHideDuration: 2000,
        });
      } else {
        notifications.show(
          "El código QR no corresponde a un campista registrado.",
          {
            key: "scanned-campist",
            severity: "warning",
            autoHideDuration: 3000,
          }
        );
      }
    } catch (e) {
      console.error("Error decoding campist ID:", e);
      notifications.show("El código QR no es válido.", {
        key: "scanned-campist",
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

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
        height: "fit-content",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {loadingCampists ? (
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
          <Typography variant="body1" sx={{ mt: 2 }}>
            Cargando campistas...
          </Typography>
        </Box>
      ) : (
        <>
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
            {/* ...existing code... */}
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
            {/* ...existing code... */}
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
                  error={errors.registeredBy}
                ></TextField>
                {errors.registeredBy && (
                  <FormHelperText error>
                    Este campo es obligatorio.
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth required error={errors.foodDay}>
                <FormLabel id="id_food_day_label">
                  Día de alimentación
                </FormLabel>
                <Select
                  labelId="id_food_day_label"
                  aria-labelledby="id_food_day_label"
                  id="id_food_day"
                  name="foodDay"
                  value={feedingValues.foodDay}
                  defaultValue="none"
                  onChange={handleFeedingValuesChange}
                  error={errors.foodDay}
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
                {errors.foodDay && (
                  <FormHelperText error>
                    Por favor, selecciona una opción.
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth required error={errors.foodType}>
                <FormLabel id="id_food_type_label">Tipo de comida</FormLabel>
                <Select
                  labelId="id_food_type_label"
                  id="id_food_type"
                  name="foodType"
                  value={feedingValues.foodType}
                  defaultValue="none"
                  onChange={handleFeedingValuesChange}
                  error={errors.foodType}
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
                {errors.foodType && (
                  <FormHelperText error>
                    Por favor, selecciona una opción.
                  </FormHelperText>
                )}
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
              <Typography
                variant="body2"
                fontStyle="italic"
                sx={{ width: "100%" }}
              >
                Busca por el nombre del campista o escanea su código QR.
              </Typography>
              <QrScanButton
                buttonProps={{
                  type: "button",
                  variant: "contained",
                  color: "secondary",
                  sx: { fontWeight: "bold" },
                }}
                onScanSuccess={onScanningCampist}
              >
                Escanear QR
              </QrScanButton>
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
                <CampistDetails campist={selectedCampist} />
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<HowToRegIcon />}
              disabled={selectedCampist.id === ""}
              loading={savingRecord}
              loadingPosition="center"
              onClick={onSubmitFeedingLog}
            >
              REGISTRAR ALIMENTACIÓN
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default FeedingLog;
