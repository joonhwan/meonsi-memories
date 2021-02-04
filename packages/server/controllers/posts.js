import PostMessage from "../models/postMessage.js  ";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log("found posts : ", postMessages.length);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new PostMessage(post); // js object를 사용한 named arguments 패턴 😅
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params; // http://host.com:5000/posts/{id}
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`Invalid Post's id(=${id})`);
    }
    console.log(`updating post(id=${id}) : ${post}`);
    // see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    // `{new : true}` 옵션을 주면, 갱신이 끝난 최종 객체가 반환된다.
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    const { _id, title, message, creator } = updatedPost;
    console.log(`updated post = `, { _id, title, message, creator });
    res.json(updatedPost);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params; // http://host.com:5000/posts/{id}
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`Invalid Post's id(=${id})`);
    }
    await PostMessage.findByIdAndRemove(id);
    res.status(204).send();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(403).json({ message: "Unauthenticated" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`Invalid Post's id(=${id})`);
    }
    console.log("like post : id = ", id);
    const post = await PostMessage.findById(id);
    const userIdString = String(req.userId);
    const index = post.likes.findIndex((id) => id === userIdString);
    if (index < 0) {
      // 이전에 이 사용자의 like 가 없었음. 새로 like에 추가.
      post.likes.push(userIdString);
    } else {
      // 이전에 이 사용자가 이미 Like 한 항목. 기존 like에서 이 사용자 제거
      post.likes = post.likes.filter((id) => id === userIdString);
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    ).lean();
    const { selectedFile, ...other } = updatedPost;
    console.log("liked post : ", other);
    res.json(updatedPost);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
