import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  [theme.breakpoints.down("xs")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
  zoomedImage: {
    padding: 0,
    display: "block",
    margin: "0 auto",
    width: "100%",
    height: "auto",
    maxWidth: "none",
    maxHeight: "100%",
    objectFit: "contain",
  },
}));
