import { timestamp, db, storage } from "../../config/firebaseConfig";
import {
  LOADING,
  NOT_LOADING,
  ERROR,
  UPDATE_SUCCESS_FIELD,
  SELECT_ACTIVE_ROOM,
  UPLOAD_IMAGE_SUCCESS,
} from "./allActions";

export const updateProfileImage = (file) => {
  return (dispatch, getState) => {
    const currentProfile = getState().firebase.profile;
    const currentUser = getState().firebase.profile.userName;
    const currentPhoto = getState().firebase.profile.photo;
    const currentID = getState().firebase.auth.uid;
    const activeRoom = getState().activeRoom.activeRoom;
    let updatedParticipants;
    let photo = null;
    //references
    const storageRef = storage.ref(`users/${currentUser}/${file.name}`);
    const collectionRef = db.collection("users");

    dispatch({
      type: "LOADING",
      payload: `Updating profile's photo...`,
    });
    let task = storageRef.put(file);
    task.on(
      "state_changed",
      (snap) => {},
      (err) => {
        dispatch({ type: NOT_LOADING });
        dispatch({ type: ERROR, err });
      },
      async () => {
        photo = await storageRef.getDownloadURL();

        //updating participants photo field to correspond to image change
        db.collection("rooms")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              updatedParticipants = doc
                .data()
                .participants.map((participant, index) => {
                  if (participant.name === currentUser) {
                    console.log("log first");
                    if (participant.photo === currentPhoto) {
                      console.log("log second");
                      return { ...participant, photo };
                    }
                  }
                  return { ...participant };
                });
              doc.ref.update({
                participants: updatedParticipants,
              });

              //if active room is active we want to update it
              if (activeRoom.name) {
                dispatch({
                  type: SELECT_ACTIVE_ROOM,
                  payload: { ...activeRoom, participants: updatedParticipants },
                });
              }
            });
          });

        //pushing to collection
        collectionRef.doc(currentID).update({ ...currentProfile, photo });
        dispatch({
          type: UPLOAD_IMAGE_SUCCESS,
        });
      }
    );
  };
};

export const editProfileField = (fieldType, inputText) => {
  return (dispatch, getState) => {
    const activeRoom = getState().activeRoom.activeRoom;
    const userID = getState().firebase.auth.uid;
    const originalUserName = getState().firebase.profile.userName;
    const whatToChange = fieldType === "input" ? "userName" : "description";
    const updates = {};
    updates[whatToChange] = inputText;
    let updateActiveRoom = { messages: [], participants: [] };

    /* if user wants to change username we also need to update the name of ever room he created
    so if room was created by original user whose name is Rinko and the user changes his name to Rinko2
    the room.createdBy field will persist with the name change
    */
    if (whatToChange === "userName") {
      db.collection("rooms")
        .get()
        .then((querySnapshot) => {
          //then update
          querySnapshot.forEach((doc) => {
            if (doc.data().createdBy === originalUserName) {
              updateActiveRoom = { ...doc.data(), createdBy: inputText };
              doc.ref.update({ createdBy: inputText });
            }
            let updatedMessages = doc.data().messages.map((message, index) => {
              if (message.from === originalUserName) {
                updateActiveRoom.messages[index] = {
                  ...message,
                  from: inputText,
                };
                return { ...message, from: inputText };
              }
              return { ...message };
            });
            let updatedParticipants = doc
              .data()
              .participants.map((participant, index) => {
                if (participant.name === originalUserName) {
                  updateActiveRoom.participants[index] = {
                    ...participant,
                    name: inputText,
                  };
                  return { ...participant, name: inputText };
                }
                return { ...participant };
              });
            doc.ref.update({
              messages: updatedMessages,
              participants: updatedParticipants,
            });
          });
          if (activeRoom.name) {
            dispatch({
              type: SELECT_ACTIVE_ROOM,
              payload: updateActiveRoom,
            });
          }
        })
        .catch((err) => console.log(err));
    }

    dispatch({ type: LOADING, payload: `Updating ${whatToChange}...` });

    db.collection("users")
      .doc(userID)
      .update(updates)
      .then((res) => {
        dispatch({ type: NOT_LOADING });
        dispatch({ type: UPDATE_SUCCESS_FIELD, payload: whatToChange });
      })
      .catch((err) => {
        dispatch({ type: NOT_LOADING });
        dispatch({ type: ERROR, err });
      });
  };
};
