import { v4 as uuidv4 } from "uuid";

//auth reducer + notifications
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
//roomsReducer
export const SEND_MESSAGE = "SEND_MESSAGE";
export const SET_FILTERED_ROOMS = "SET_FILTERED_ROOMS";
export const SET_ACTIVE = "SET_ACTIVE";
export const DESELECT_ACTIVE = "DESELECT_ACTIVE";
export const FILTER_ROOMS = "FILTER_ROOMS";

//activeRoomReducer
export const SELECT_ACTIVE_ROOM = "SELECT_ACTIVE_ROOM";
export const DESELECT_ACTIVE_ROOM = "DESELECT_ACTIVE_ROOM";
// notificationsReducer
export const ROOM_CREATED_SUCCESS = "ROOM_CREATED_SUCCESS";
export const DELETE_ROOM_SUCCESS = "DELETE_ROOM_SUCCESS";
export const UPDATE_SUCCESS_IMAGE = "UPDATE_SUCCESS_IMAGE";
export const UPDATE_SUCCESS_FIELD = "UPDATE_SUCCESS_FIELD";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const ERROR = "ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";
export const LOADING = "LOADING";
export const NOT_LOADING = "NOT_LOADING";

// modal
export const TOGGLE_MODAL = "TOGGLE_MODAL";

// this function is for createRoom action so i dont have to retype the same thing all the time
export function setRoom(
  roomId,
  roomName,
  photo,
  createdBy,
  createdByPhoto,
  dbRef,
  dispatch
) {
  const room = {
    id: roomId,
    createdBy,
    name: roomName,
    photo,
    lastMessageSentAt: Date.now(),
    participants: [
      {
        name: createdBy,
        photo: createdByPhoto,
        id: uuidv4(),
      },
    ],
    description: "",
    active: false,
    createdAt: Date.now(),
    messages: [
      {
        from: "admin",
        message: " created a room",
        date: Date.now(),
        id: uuidv4(),
      },
    ],
  };

  dbRef
    .set(room)
    .then(() => {
      dispatch({ type: ROOM_CREATED_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: NOT_LOADING });
      dispatch({ type: ERROR, err });
    });
}
