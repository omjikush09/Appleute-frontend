import DrawerAppBar from "@/components/Dashboard";
import React, { useState,useRef } from "react";
import { Container, TextField, Grid, Button, Typography } from "@mui/material";
import backend from "@/utils/axios";
import ReCAPTCHA from "react-google-recaptcha";
const Login = () => {

  const reRef = useRef();
  const [values, setValues] = useState({
    email: "omjikush09@gmail.com",
    password: "232343",
    error: "",
    success: "",
  });

  const { email, password, error, success } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const onChange = (value) => {
  //   console.log("Captcha value:", value);
  // };

  const onSubmit = async (e) => {
    const token = await reRef.current.executeAsync();
      reRef.current.reset();
      console.log(token);
    try {
      const { data } = await backend.post("/login", {
        email,
        password,
        token,
      });
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.jwtToken));
      localStorage.setItem("cartId", data.user.cart.id);
      localStorage.setItem("userId", data.user.id);
      setValues({
        ...values,
        success: data.message,
        error: "",
        email: "",
        password: "",
      });

      // setTimeout(() => {
      //   router.push("/home");
      // }, 2000);
    } catch (error) {
      // setValues({ ...values, error: "Something went wrong", success: "" });
    }
  };

  const successMessage = () => {
    if (success) {
      return <Typography color="green">{success}</Typography>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
  };

  return (
    <>
      <DrawerAppBar />
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item sm={12}>
            {successMessage()}
          </Grid>
          <Grid item sm={12}>
            {errorMessage()}
          </Grid>
          <Grid item sm={12}>
            <Typography>Login</Typography>
          </Grid>
          <Grid item sm={12}>
            <TextField
              maxWidth="100%"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              value={email}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                onSubmit();
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
        size="invisible"
        ref={reRef}
      />
    </>
  );
};

export default Login;
