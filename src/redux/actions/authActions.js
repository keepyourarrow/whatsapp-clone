import { timestamp, db, firebase } from "../../config/firebaseConfig";
import {
  DESELECT_ACTIVE,
  DESELECT_ACTIVE_ROOM,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "./allActions";

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    console.log(credentials);
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((err) => dispatch({ type: LOGIN_ERROR, err }));
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            email: newUser.email,
            userName: newUser.name,
            photo: null,
            description: "Hey there! I am using WhatsApp.",
            createdAt: timestamp(),
          })
          .then(() => dispatch({ type: SIGNUP_SUCCESS }));
      })
      .catch((err) => dispatch({ type: SIGNUP_ERROR, err }));
  };
};

export const getGoogleAuthData = (user) => {
  return (dispatch) => {
    const usersRef = db.collection("users").doc(user.uid);

    usersRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        dispatch({ type: LOGIN_SUCCESS });
      } else {
        usersRef
          .set({
            userName: user.displayName,
            userEmail: user.email,
            photo: user.photoURL,
            description: "Hey there! I am using WhatsApp.",
            createdAt: timestamp(),
          })
          .then(() => {
            dispatch({ type: SIGNUP_SUCCESS });
          })
          .catch((err) => dispatch({ type: SIGNUP_ERROR }));
      }
    });
  };
};

export const signOut = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: DESELECT_ACTIVE });
        dispatch({ type: DESELECT_ACTIVE_ROOM });
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  };
};
