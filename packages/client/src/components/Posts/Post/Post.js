import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { deletePost, likePost } from "../../../actions";

moment.locale("ko");

const objectIdPattern = /^([0-9a-zA-Z]{24}|[0-9]+)$/;

const Post = ({ post, setCurrentId, setPopupPost }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleImageClick = () => {
    if (post.selectedFile) {
      setPopupPost(post);
    }
  };
  const user = useSelector((state) => state.auth.authData?.result);

  //console.log("@@@ POST : post,use  = ", post, user);
  let author = post.creator;
  if (objectIdPattern.test(author)) {
    author = post.name;
  }

  // 로그인 사용자가 "좋아요" 했는지 여부 확인.. 등.
  const likeCount = post.likes.length;
  const youLiked = post.likes.find(
    (like) => like === (user?.googleId || user?._id)
  );
  let likeCountDescription = `${likeCount}`;
  //console.log("@@@ user = ", user);
  if (youLiked) {
    likeCountDescription =
      likeCount == 1 ? `(당신만)` : `(당신포함 ${likeCount}명)`;
  } else {
    likeCountDescription = likeCount > 0 ? `(${likeCount} 명)` : "";
  }

  const canEdit = user && post.creator === (user._id || user.googleId);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        src={post.title}
        onClick={handleImageClick}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{author}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {canEdit && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
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
          disabled={!!!user}
          onClick={() => dispatch(likePost(post._id))}
        >
          {youLiked ? (
            <ThumbUpAltIcon fontSize="small" />
          ) : (
            <ThumbUpAltOutlinedIcon fontSize="small" />
          )}
          좋아요 {likeCountDescription}
        </Button>
        {canEdit && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            지우기
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Post;
