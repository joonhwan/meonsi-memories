import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import useStyles from "./styles";

export default function App() {
  const classes = useStyles();

  return (
    <Container maxwidth="lg">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
      </Switch>
    </Container>
  );
}
