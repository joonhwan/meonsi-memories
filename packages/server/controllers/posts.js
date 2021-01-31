import PostMessage from "../models/postMessage.js  ";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
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
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
