import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Autocomplete,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { updateUserProfile } from "../app/reducer/user";
import { User } from "../types/User";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

const initialValues: User = {
  name: "",
  email: "",
  role: "customer",
  password: "",
  confirmPassword: "",
};

const EddditForm = (props: { open?: boolean; handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  return (
    <Formik
      initialValues={user || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updateUserProfile(values));
        props.handleClose();
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            margin="normal"
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            margin="normal"
            fullWidth
          />
          <Autocomplete
            options={["customer", "admin"]}
            value={values.role}
            onChange={(event, value) => {
              handleChange({
                target: {
                  name: "role",
                  value,
                },
              });
            }}
            onBlur={handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                name="role"
                label="Role"
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
                margin="normal"
                fullWidth
              />
            )}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            margin="normal"
            fullWidth
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            margin="normal"
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!(dirty && isValid) || isSubmitting}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      )}
    </Formik>
  );
};

const EditProfile = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpen} color="primary" fullWidth>
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <EddditForm handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditProfile;
