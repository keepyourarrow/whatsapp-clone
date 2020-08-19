import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import { testReducer } from "./testReducer";

export const rootReducer = combineReducers({
  test: testReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
