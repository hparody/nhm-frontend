import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.setItem("user", "");
    navigate("/sign-in", { replace: true });
  }, [navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="h1"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Software Security - G4
          </Typography>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <AccountCircle
              fontSize="large"
              aria-label="account of current user"
              sx={{ marginRight: "8px" }}
              color="inherit"
            />
            <Tooltip title="Log out">
              <IconButton
                size="large"
                aria-label="button to log out of the page"
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
