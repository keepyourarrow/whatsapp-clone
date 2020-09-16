import {
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  REMOVE_ERROR,
} from "../actions/allActions";

const initState = {
  authError: "",
};

export const authReducer = (state = initState, action) => {
  const { type, err } = action;
  let message;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, authError: null };

    case LOGIN_ERROR:
      message =
        err.code === "auth/user-not-found"
          ? "User not found"
          : (err.code = "auth/wrong-password"
              ? "Wrong password"
              : "Something went wrong");
      return { ...state, authError: message };

    case SIGNOUT_SUCCESS:
      return { ...state };

    case SIGNUP_SUCCESS:
      return { ...state, authError: null };

    case SIGNUP_ERROR:
      message =
        err.code === "auth/email-already-in-use"
          ? "User already exists"
          : "Something went wrong";
      return { ...state, authError: message };

    case REMOVE_ERROR:
      return { ...state, authError: "" };

    default:
      return state;
  }
};
