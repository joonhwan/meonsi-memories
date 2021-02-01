import React from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
} from "@material-ui/core";
import moment from "moment";
import "moment/locale/ko";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { deletePost, likePost } from "../../../actions";

moment.locale("ko");

const Post = ({ post, setCurrentId, setPopupPost }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleImageClick = () => {
    if (post.selectedFile) {
      setPopupPost(post);
    }
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        src={post.title}
        onClick={handleImageClick}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <div>
        <Typography className={classes.title}>{post.title}</Typography>
        <Typography
          className={classes.content}
          variant="body2"
          color="textSecondary"
        >
          {post.message}
        </Typography>
      </div>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          좋아요 {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" />
          지우기
        </Button>
      </CardActions>
    </Card>
  );
};
export default Post;
