import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FormLayout from "@/components/FormLayout";
import Loader from "@/components/Loader";

import useCampists from "@/hooks/useCampists";

const FeedingReport = () => {
  const { campists, loadingCampists, error } = useCampists();

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
          <Typography variant="h5" fontWeight="bold">
            Reporte de Alimentación
          </Typography>
        </Box>
      )}
    </FormLayout>
  );
};

export default FeedingReport;
