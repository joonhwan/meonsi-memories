import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles.js";
import { getPosts } from "../../actions";

export const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [popupPost, setPopupPost] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      {popupPost ? (
        <Grid item xs={12}>
          <img
            className={classes.zoomedImage}
            src={popupPost.selectedFile}
            alt={popupPost.title}
            onClick={() => setPopupPost(null)}
          />
        </Grid>
      ) : (
        <>
          <Grow in>
            <Container>
              <Grid
                container
                className={classes.mainContainer}
                justify="space-between"
                //alignItems="stretch"
                spacing={1}
              >
                <Grid item xs={12} sm={7}>
                  <Posts
                    setCurrentId={setCurrentId}
                    setPopupPost={setPopupPost}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </>
      )}
    </>
  );
};

export default Home;
