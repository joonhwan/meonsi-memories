const initialState = [];

const translate = (post) => {
  post.likeCount = post.likes?.length || post.likeCount;
  return post;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      const posts = action.payload.map(translate);
      return posts;
    case "CREATE":
      return [...state, translate(action.payload)];
    case "UPDATE":
      const updatedPost = translate(action.payload);
      return state.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    case "DELETE":
      console.log("reducer : DELETE : id =", action.payload);
      const deletedId = action.payload;
      return state.filter((post) => post._id !== deletedId);
    default:
      return state;
  }
};
export default reducer;
