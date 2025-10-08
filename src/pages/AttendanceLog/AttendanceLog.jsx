import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Virtuoso } from "react-virtuoso";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNotifications } from "@toolpad/core";

import FormLayout from "@/components/FormLayout";
import Loader from "@/components/Loader";
import QrScanButton from "@/components/QrScanButton";
import { getSessionItem, setSessionItem } from "@/utils/sessionStorageUtils";
import useCampists from "@/hooks/useCampists";
import useDebounce from "@/hooks/useDebounce";
import CampistListRow from "./CampistListRow";

const AttendanceLog = () => {
  const notifications = useNotifications();
  const { campists, loadingCampists, error } = useCampists();

  const [updatedAttendance, setUpdatedAttendance] = useState(
    getSessionItem("campists_attendance", {})
  );
  const campistListRef = useRef(null);

  if (error) {
    notifications.show("Error al cargar los campistas.", {
      key: "campists",
      severity: "error",
      autoHideDuration: 5000,
    });
    console.error(error.message);
  }

  const [attendanceMap, setAttendanceMap] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 250); // wait 250ms after typing

  useEffect(() => {
    setSessionItem("campists_attendance", updatedAttendance);
  }, [updatedAttendance]);

  const filteredCampists = useMemo(() => {
    if (!debouncedSearch) return campists;
    const search = debouncedSearch.toLowerCase();
    return campists.filter((item) => item._searchIndex.includes(search));
  }, [debouncedSearch, campists]);

  /** Get campist data after scanning: update tha map and set it as true and update the ref for session storage  */
  const onScanningCampist = useCallback(
    (campistSysId) => {
      try {
        const campist = campists.find((c) => c.sysId === campistSysId);
        setUpdatedAttendance((prev) => ({ ...prev, [campist.sysId]: true }));
        setAttendanceMap((prevValue) => ({
          ...prevValue,
          [campist.sysId]: true,
        }));
        const campistIdx = filteredCampists.findIndex(
          (c) => c.sysId === campistSysId
        );
        campistListRef.current.scrollToIndex({
          index: campistIdx,
          align: "center",
          behavior: "smooth",
        });
      } catch (e) {
        console.error("Error decoding campist ID:", e);
        notifications.show("El código QR no es válido.", {
          key: "scanned-campist",
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    },
    [campists, filteredCampists, notifications]
  );

  /** Load initial attendance values form Campists API as well as Session Storage */
  useEffect(() => {
    const storedAttendance = getSessionItem("campists_attendance", {});
    const initialMapping = campists.reduce(
      (prevVal, currentVal) => ({
        ...prevVal,
        [currentVal.sysId]:
          storedAttendance[currentVal.sysId] ?? currentVal.attendance,
      }),
      {}
    );
    setAttendanceMap(initialMapping);
  }, [campists, setAttendanceMap]);

  const toggleAttendance = useCallback((sysId) => {
    setAttendanceMap((prevValue) => {
      if (
        !prevValue[sysId] ||
        (prevValue[sysId] &&
          confirm(
            "¿Estás seguro de eliminar el registro de asistencia de este campista?"
          ))
      ) {
        setUpdatedAttendance((prev) => ({
          ...prev,
          [sysId]: !prevValue[sysId],
        }));
        return { ...prevValue, [sysId]: !prevValue[sysId] };
      } else {
        setUpdatedAttendance((prev) => ({
          ...prev,
          [sysId]: prevValue[sysId],
        }));
        return prevValue;
      }
    });
  }, []);

  const registerAttendance = useCallback(() => {}, []);

  const VirtuosoItem = useCallback(
    (_, campist) => {
      return (
        <CampistListRow
          campist={campist}
          checked={!!attendanceMap[campist.sysId]}
          onToggle={() => toggleAttendance(campist.sysId)}
        />
      );
    },
    [attendanceMap, toggleAttendance]
  );

  return (
    <FormLayout>
      {loadingCampists ? (
        <Loader loaderMessage="Cargando campistas..." />
      ) : (
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
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <ChecklistRtlIcon fontSize="large" />
              Registro de Asistencia
            </Typography>
            <Typography variant="body2">
              A través de este formulario podrás realizar el registro de de
              asistencia de uno o más campistas.
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
                color: "black",
                sx: { fontWeight: "bold" },
              }}
              onScanSuccess={onScanningCampist}
            >
              Escanear QR
            </QrScanButton>
            <FormControl fullWidth required>
              <FormLabel id="id_campist_label" htmlFor="id_campist">
                Campista
              </FormLabel>
              <Box sx={{ display: "flex", alignItems: "flex-end", mt: "4px" }}>
                <TextField
                  id="id_campist"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  variant="outlined"
                  placeholder="Buscar campista"
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </FormControl>
          </Box>
          <Box sx={{ width: "100%", height: 400 }}>
            <Virtuoso
              id="id_campists_list"
              ref={campistListRef}
              style={{ height: "100%", width: "100%" }}
              data={filteredCampists}
              itemContent={VirtuosoItem}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            size="large"
            startIcon={<HowToRegIcon />}
            onClick={registerAttendance}
          >
            REGISTRAR ASISTENCIA
          </Button>
        </Box>
      )}
    </FormLayout>
  );
};

export default AttendanceLog;
