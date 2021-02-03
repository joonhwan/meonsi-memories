import { AUTH, LOGOUT } from "../actions/constants";

const initialState = {
  authData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      const { result, token } = action?.payload;
      const profile = { result, token };
      localStorage.setItem("profile", JSON.stringify({ ...profile }));
      return { ...state, authData: action.payload };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
