import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Checkbox,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { register } from "../libs/auth";
import { useAppDispatch } from "../app/hooks";
import { setError, setAuth, getUser } from "../app/reducer/user";
import { NavigationButton } from "../components/CustomButtons";

interface FormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  login: boolean;
}

const initialValues: FormValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  login: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string()
    .min(5, "Password is too short - should be 5 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(/[0-9]/, "Password can only contain numbers.")
    .max(20, "Password is too long - should be 20 chars maximum.")
    .required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "Passwords must match"
  ),
  login: Yup.boolean(),
});

const SignUp = () => {
  const dispatch = useAppDispatch();
  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const { email, password, name, login } = values;
    try {
      await register({
        email,
        password,
        name,
        loginAfter: login,
      });

      if (login) {
        dispatch(setAuth(true));
        dispatch(getUser());
      }
      resetForm();
      setSubmitting(false);
    } catch (error: any) {
      dispatch(
        setError({
          isError: true,
          errorMessage: error.message,
        })
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
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
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  id="login"
                  name="login"
                  checked={values.login}
                  onChange={handleChange}
                />
                <Typography variant="body1" component="div">
                  Login after registration
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }} />
              <Typography variant="body1" component="div">
                Already have an account?{" "}
                <NavigationButton to="/login">Login</NavigationButton>
              </Typography>
              <Box sx={{ mt: 2 }} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  !isValid ||
                  !dirty ||
                  (values.login && !values.email) ||
                  (values.login && !values.password) ||
                  isSubmitting
                }
              >
                Submit
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUp;
