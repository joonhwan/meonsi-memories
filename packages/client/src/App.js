import React from "react";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import useStyles from "./styles";

export default function App() {
  const classes = useStyles();

  return (
    <Container maxwidth="lg">
      <Navbar />
      <Home />
    </Container>
  );
}
