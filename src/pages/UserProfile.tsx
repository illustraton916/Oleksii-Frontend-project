import React from "react";
import {
  Box,
  Typography,
  styled,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useAppSelector } from "../app/hooks";
import EditProfile from "../components/EditProfile";

const UserProfileAvatar = styled("img")(({ theme }) => ({
  width: 200,
  height: 200,
  borderRadius: "50%",
  objectFit: "cover",
  margin: "auto",
  display: "block",
  [theme.breakpoints.down("sm")]: {
    width: 150,
    height: 150,
  },
}));

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        UserProfile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <UserProfileAvatar src={user?.avatar} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell>{user?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Email
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Role
                  </TableCell>
                  <TableCell>{user?.role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={2}>
                    <EditProfile />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
