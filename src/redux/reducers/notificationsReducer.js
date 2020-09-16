import {
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  UPDATE_SUCCESS_FIELD,
  ERROR,
  DELETE_ROOM_SUCCESS,
  ROOM_CREATED_SUCCESS,
  LOADING,
  NOT_LOADING,
  REMOVE_NOTIFICATION,
  UPLOAD_IMAGE_SUCCESS,
} from "../actions/allActions";

const initState = {
  message: "",
  error: false,
  loadingMessage: "",
};

export const notificationsReducer = (state = initState, action) => {
  const { type, payload } = action;
  let mes;

  switch (type) {
    case SIGNUP_SUCCESS:
      return { message: "Signup Successful" };

    case LOGIN_SUCCESS:
      return { message: "Login Succesful!" };

    case SIGNOUT_SUCCESS:
      return { message: "Successfully signed out!" };

    case UPDATE_SUCCESS_FIELD:
      mes =
        payload === "userName"
          ? "Username successfully updated!"
          : payload === "name"
          ? "Room name succesfully updated!"
          : "Description successfully updated!";
      return { message: mes };

    case ROOM_CREATED_SUCCESS:
      return { message: "Room has been created!" };

    case DELETE_ROOM_SUCCESS:
      return { message: "Room has been deleted!" };

    case UPLOAD_IMAGE_SUCCESS:
      return { message: "Image has been uploaded!" };

    case ERROR:
      return { message: "Something went wrong!", error: true };

    case LOADING:
      return { loading: payload };

    case NOT_LOADING:
      return { loading: "" };
    case REMOVE_NOTIFICATION:
      return { message: "", error: false };

    default:
      return state;
  }
};
