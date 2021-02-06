import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  Paper,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions";

const Form = ({ currentId, setCurrentId }) => {
  console.log("rendering Form : currentId = ", currentId);
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentPost = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const auth = useSelector((state) => state.auth);
  const user = auth?.authData?.result;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setMessage(currentPost.message);
      setTags(currentPost.tags.join(","));
      setSelectedFile(currentPost.selectedFile);
    }
  }, [currentPost]);

  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center">
          새로운 메모를 작성하려면 로그인하세요.
        </Typography>
      </Paper>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("create/update post for user = ", user);
    const name = `${user.lastName} ${user.firstName}`;
    const post = {
      title,
      name,
      message,
      tags: tags.split(",").map((s) => s.trim()),
      selectedFile,
    };
    let action = currentId ? updatePost(currentId, post) : createPost(post);
    console.log("submit : post = ", post);
    dispatch(action);
    clear();
  };
  const clear = (e) => {
    setTitle("");
    setMessage("");
    setTags("");
    setSelectedFile(null);
    setCurrentId(null);
  };
  return (
    <Paper className={classes.paper}>
      {/* prettier-ignore */}
      <FormControl component="form" autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant="h6">메모 {currentId ? "편집하기" : "작성하기"}</Typography>
        {/* <TextField name="creator" value={creator} onChange={(e)=>setCreator(e.target.value)} variant="outlined" label="Creator" fullWidth /> */}
        <TextField name="title" value={title} onChange={(e)=>setTitle(e.target.value)} variant="outlined" label="Title" fullWidth />
        <TextField name="message" value={message} onChange={(e) => setMessage(e.target.value)} variant="outlined" label="Message" multiline rows={4}  fullWidth />
        <TextField name="tags" value={tags} onChange={(e) => setTags(e.target.value)} variant="outlined" label="Tags" fullWidth />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({base64})=> setSelectedFile(base64)} />
        </div>
        <Button type="submit" fullWidth variant="contained" color="primary" size="large" >저장</Button>
          <Button fullWidth variant="contained" color="secondary" size="medium" onClick={clear}>취소</Button>
      </FormControl>
    </Paper>
  );
};
export default Form;
