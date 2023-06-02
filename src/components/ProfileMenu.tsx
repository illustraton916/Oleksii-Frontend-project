import React from "react";
import {
  IconButton,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  BoxProps,
  Avatar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutUser } from "../app/reducer/user";
import { NavigationButton } from "./CustomButtons";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const ProfileMenu = (props: BoxProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useAppDispatch();
  const { user, isAuth, isAdmin } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logoutUser());
  };

  if (isAuth) {
    return (
      <Box {...props}>
        <Tooltip title="Profile">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar src={user?.avatar} />
          </IconButton>
        </Tooltip>
        <Menu
          id="user-menu"
          anchorEl={anchorElUser}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <NavigationButton to="/user">
              <Typography variant="body1" component="div">
                {user?.name}
              </Typography>
            </NavigationButton>
          </MenuItem>
          {isAdmin && (
            <MenuItem onClick={handleCloseUserMenu}>
              <NavigationButton to="/admin">
                <Typography variant="body1" component="div">
                  Admin
                </Typography>
              </NavigationButton>
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    );
  }
  return (
    <Box {...props}>
      <NavigationButton to="/login">
        <Tooltip title="Login">
          <IconButton>
            <AccountBoxIcon />
          </IconButton>
        </Tooltip>
      </NavigationButton>
    </Box>
  );
};

export default ProfileMenu;
