import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId, setPopupPost }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  console.log("posts", posts);

  return (
    <>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={2}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post
                post={post}
                setCurrentId={setCurrentId}
                setPopupPost={setPopupPost}
              ></Post>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
export default Posts;
