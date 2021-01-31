const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...state, action.payload];
    case "UPDATE":
      const updatedPost = action.payload;
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
