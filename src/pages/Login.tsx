import React from "react";
import { Box, Typography, Button, TextField, Container } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../libs/auth";
import { useAppDispatch } from "../app/hooks";
import { setError, getUser } from "../app/reducer/user";
import { NavigationButton } from "../components/CustomButtons";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const onSubmit = async (values: FormValues) => {
    const { email, password } = values;
    try {
      await login({
        email,
        password,
      });
      dispatch(getUser());
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
          Login
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
            values,
            errors,
            touched,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NavigationButton to="/signup">Sign Up</NavigationButton>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid || isSubmitting || !dirty}
                >
                  Login
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
