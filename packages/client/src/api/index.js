import axios from "axios";
import { getLocalStoreItem } from "@mern-app/common/utils";
//const url = "http://localhost:5000";
const url = "https://my-memories-mern-app.herokuapp.com";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  const { token } = getLocalStoreItem("profile");
  if (token) {
    req.headers.Authorization = "Bearer " + token;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/like`);

export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
