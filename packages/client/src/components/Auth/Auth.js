import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import Icon from "./googleIcon";

import Input from "./Input";

function Auth() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = () => {
    console.log("submit.....");
  };
  const handleChange = (e) => {
    console.log("handle change...");
  };
  const handleShowPassword = () => {
    setPasswordVisible((state) => !state);
  };
  const switchMode = () => {
    setIsSignUp((state) => !state);
  };
  const googleSuccess = async (res) => {
    console.log("google success : res = ", res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({
        type: "AUTH",
        payload: { result, token },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (error) => {
    //
    console.log("google login failed. ");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignUp ? "사용자등록" : "로그인"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="lastName"
                  label="성"
                  autoFocus
                  half
                  handleChange={handleChange} //
                />
                <Input
                  name="firstName"
                  label="이름"
                  half
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="이메일"
              handleChange={handleChange}
              type="email"
              autoFocus
            />
            <Input
              name="password"
              label="암호"
              type={passwordVisible ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="암호확인"
                type={passwordVisible ? "text" : "password"}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "사용자등록" : "로그인"}
          </Button>
          <GoogleLogin
            clientId="1058980898389-75ettb1ri5qrcicgvi8ufeevgkeogguo.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                //disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? "등록된 사용자인가요?" : "처음 사용자인가요?"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
