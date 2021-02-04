import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Button,
  AppBar,
  Typography,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import memories from "../../images/memories.png";
import useStyles from "./styles";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const authData = useSelector((state) => state.auth.authData);
  const user = authData;
  if (user && user.result) {
    const { name, firstName, lastName } = user.result;
    if (!name && firstName && lastName) {
      user.result.name = `${lastName} ${firstName}`;
    }
  }
  const showLoginButton = location.pathname !== "/auth";
  console.log("showLoginButton = ", showLoginButton);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/auth");
  };

  useEffect(() => {
    // TODO jwt 작업...
    if (!authData) {
      const profile = localStorage.getItem("profile");
      if (profile) {
        const { result, token } = profile;
        dispatch({ type: "AUTH", payload: { result, token } });
      }
    }
    //const token = authData?.token;
  }, [dispatch, location]);
  console.log("user = ", user);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h3"
          align="center"
        >
          메모장
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user.result.imageUrl}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logOut}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          showLoginButton && (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              로그인
            </Button>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
