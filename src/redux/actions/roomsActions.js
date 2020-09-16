import { firebase, storage, db } from "../../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import {
  DELETE_ROOM_SUCCESS,
  DESELECT_ACTIVE_ROOM,
  ERROR,
  NOT_LOADING,
  ROOM_CREATED_SUCCESS,
  SELECT_ACTIVE_ROOM,
  UPLOAD_IMAGE_SUCCESS,
  UPDATE_SUCCESS_FIELD,
  setRoom,
} from "./allActions";

// this function is

export const createRoom = (name, file) => {
  return (dispatch, getState) => {
    const createdBy = getState().firebase.profile.userName;
    const createdByPhoto = getState().firebase.profile.photo;
    const dbRef = db.collection("rooms").doc();
    const roomId = dbRef.id;
    const roomName = name;
    let photo = null;


    // uploading image if it exists
    if (file) {
      const storageRef = storage.ref(`rooms/${roomName}/${file.name}`);
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
          console.log(photo);
          setRoom(
            roomId,
            roomName,
            photo,
            createdBy,
            createdByPhoto,
            dbRef,
            dispatch
          );
        }
      );
    } else {
      setRoom(
        roomId,
        roomName,
        photo,
        createdBy,
        createdByPhoto,
        dbRef,
        dispatch
      );
    }
  };
};
export const deleteRoom = (payload) => {
  return (dispatch, getState) => {
    const currentID = payload.id;

    dispatch({
      type: "LOADING",
      payload: `Deleting "${payload.name}" room...`,
    });
    db.collection("rooms")
      .doc(currentID)
      .delete()
      .then((res) => {
        dispatch({ type: DESELECT_ACTIVE_ROOM });
        dispatch({
          type: DELETE_ROOM_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({ type: NOT_LOADING });
        dispatch({ type: ERROR, err });
      });
  };
};

export const editRoomField = (fieldType, inputText) => {
  return (dispatch, getState) => {
    const currentID = getState().activeRoom.activeRoom.id;
    const whatToChange = fieldType === "input" ? "name" : "description";
    const updates = {};
    updates[whatToChange] = inputText;

    dispatch({ type: "LOADING", payload: `Updating ${whatToChange}...` });

    db.collection("rooms")
      .doc(currentID)
      .update(updates)
      .then((res) => {
        dispatch({ type: "NOT_LOADING" });
        dispatch({ type: UPDATE_SUCCESS_FIELD, payload: whatToChange });
      })
      .catch((err) => {
        dispatch({ type: "NOT_LOADING" });
        dispatch({ type: ERROR, err });
      });
  };
};

export const updateRoomImage = (file) => {
  return (dispatch, getState) => {
    const currentRoom = getState().activeRoom.activeRoom;
    const currentID = getState().activeRoom.activeRoom.id;
    const roomName = getState().activeRoom.activeRoom.name;
    //references
    const storageRef = storage.ref(`rooms/${roomName}/${file.name}`);
    const collectionRef = db.collection("rooms");
    let photo = null;

    dispatch({
      type: "LOADING",
      payload: `Updating "${roomName}" room's photo...`,
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
        collectionRef.doc(currentID).update({
          ...currentRoom,
          active: firebase.firestore.FieldValue.delete(),
          photo,
        });
        dispatch({
          type: UPLOAD_IMAGE_SUCCESS,
        });
        dispatch({
          type: SELECT_ACTIVE_ROOM,
          payload: { ...currentRoom, photo },
        });
      }
    );
  };
};

export const sendMessage = (msg) => {
  return (dispatch, getState) => {
    const currentRoom = getState().activeRoom.activeRoom;
    const currentUser = getState().firebase.profile.userName;
    const currentUserPhoto = getState().firebase.profile.photo;
    const currentID = getState().activeRoom.activeRoom.id;
    const participants = getState().activeRoom.activeRoom.participants;
    const messages = getState().activeRoom.activeRoom.messages;
    let newParticipants = null;
    let updatedParticipants = null;
    let alreadyAParticipant = participants.find(
      (participant) => participant.name === currentUser
    );
    if (!alreadyAParticipant) {
      newParticipants = {
        name: currentUser,
        photo: currentUserPhoto,
        id: uuidv4(),
      };
      updatedParticipants = [...participants, newParticipants];
    }

    let newMessage = {
      date: Date.now(),
      from: currentUser,
      message: msg,
      id: uuidv4(),
    };
    let updatedMessages = [...messages, newMessage];

    db.collection("rooms")
      .doc(currentID)
      .update({
        ...currentRoom,
        messages: updatedMessages,
        active: firebase.firestore.FieldValue.delete(),
        participants:
          updatedParticipants === null
            ? currentRoom.participants
            : updatedParticipants,
      })
      .then((res) => {
        //update chatrooms sidebar so active colors display properly
        dispatch({ type: "SET_ACTIVE", payload: currentRoom });

        //update activeRoom
        dispatch({
          type: SELECT_ACTIVE_ROOM,
          payload: {
            ...currentRoom,
            messages: updatedMessages,
            participants:
              updatedParticipants === null
                ? currentRoom.participants
                : updatedParticipants,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteMessage = (msg) => {
  return (dispatch, getState) => {
    const currentID = getState().activeRoom.activeRoom.id;
    const currentRoom = getState().activeRoom.activeRoom;
    const messages = getState().activeRoom.activeRoom.messages;
    let updatedMessages = messages.filter((message) => message.id !== msg.id);

    db.collection("rooms")
      .doc(currentID)
      .update({
        ...currentRoom,
        messages: updatedMessages,
      })
      .then(() => {
        //update chatrooms sidebar so active colors display properly
        dispatch({ type: "SET_ACTIVE", payload: currentRoom });

        //update activeRoom
        dispatch({
          type: SELECT_ACTIVE_ROOM,
          payload: {
            ...currentRoom,
            messages: updatedMessages,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};
