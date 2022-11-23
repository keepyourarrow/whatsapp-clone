import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import roomsReducer from "./roomsReducer";
import activeRoomReducer from "./activeRoomReducer";
import notificationsReducer from "./notificationsReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";

export const rootReducer = combineReducers({
  rooms: roomsReducer,
  activeRoom: activeRoomReducer,
  auth: authReducer,
  notifications: notificationsReducer,
  modal: modalReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
