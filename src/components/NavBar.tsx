import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { NavigationButton } from "./CustomButtons";
import ProfileMenu from "./ProfileMenu";
import Cart from "./Cart";

const NavBar = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <NavigationButton to="/" sx={{ flexGrow: 1 }}>
          Store
        </NavigationButton>

        <Cart sx={{ flexGrow: 0 }} />
        <ProfileMenu sx={{ flexGrow: 0 }} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
