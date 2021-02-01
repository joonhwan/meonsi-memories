import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 10,
    margin: "20px auto",
    padding: "10px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
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
