import * as api from "../api";
import { AUTH } from "./constants";

// Action Creators

// export const getPosts = () => ({
//   type: "FETCH_ALL",
//   payload: [],
// });
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    console.log("getPosts response : post count = ", data.length);
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    console.log("creating post : ", post);
    const { data } = await api.createPost(post);
    console.log("createPost response data = ", data);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log("updating post : ", id, post);
    const { data } = await api.updatePost(id, post);
    console.log("updatePost response data = ", data);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    console.log("deleting post : id = ", id);
    await api.deletePost(id);
    console.log("deleted post : id = ", id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in here...
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign out here.
    const { data } = await api.signup(formData);
    const { name, firstName, lastName } = data.result;
    dispatch({ type: AUTH, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
