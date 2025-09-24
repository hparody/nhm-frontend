import Box from "@mui/material/Box";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/camp/emunah-2025/feeding-log");
  }, [navigate]);

  return <Box>HOME</Box>;
};

export default Home;
