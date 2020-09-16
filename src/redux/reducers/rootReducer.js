import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import { roomsReducer } from "./roomsReducer";
import { activeRoomReducer } from "./activeRoomReducer";
import { notificationsReducer } from "./notificationsReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  rooms: roomsReducer,
  activeRoom: activeRoomReducer,
  auth: authReducer,
  notifications: notificationsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
