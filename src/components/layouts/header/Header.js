import { AccountCircle, LogoutOutlined } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const dataPrincipal = decodeJwt(localStorage.token);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("Da clic close");
    setAnchorEl(null);
  };

  const handleCloseSession = () => {
    console.log("Da clic handleCloseSession");
    setAnchorEl(null);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AppBar
      sx={{
        // backgroundColor: "#5f6a6b",
        backgroundColor: "#FFFFFF",
      }}
      elevation={0}
    >
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <Typography>{dataPrincipal.UCM_NOMBRE}</Typography>
        <IconButton
          onClick={handleMenu}
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
          keepMounted
        >
          <MenuItem onClick={handleClose}>
            <Avatar sx={{ width: "25px", height: "25px" }} />
            <Box sx={{ ml: 6, fontSize: "16px" }}>
              {dataPrincipal.UCM_NOMBRE}
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleCloseSession}>
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadJson = atob(base64);
  const payload = JSON.parse(payloadJson);
  return payload;
}
