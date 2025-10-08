import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import RestaurantIcon from "@mui/icons-material/Restaurant";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router";

const Camp = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: "attendance",
      title: "Asistencia",
      description: "Registro de asistencia de campistas",
      icon: <ChecklistRtlIcon fontSize="medium" sx={{ marginRight: "8px" }} />,
      navigateTo: "/camp/emunah-2025/attendance",
    },
    {
      id: "feeding-log",
      title: "Alimentación",
      description: "Registro de alimentación de campistas",
      icon: <RestaurantIcon fontSize="medium" sx={{ marginRight: "8px" }} />,
      navigateTo: "/camp/emunah-2025/feeding-log",
    },
  ];

  return (
    <Box component="div" sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid size={{ xs: 6, md: 4, lg: 3, xl: 2 }} key={option.id}>
            <Link
              to={option.navigateTo}
              style={{ textDecoration: "none" }}
              replace
            >
              {
                <Card
                  sx={{ width: "100%" }}
                  onClick={() => navigate(option.id)}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                        display="flex"
                        alignItems="center"
                        color="primary"
                      >
                        {option.icon}
                        {option.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {option.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              }
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Camp;
