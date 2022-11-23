import React, { useEffect, useRef, useState } from "react";
import { MicrophoneSolid } from "@graywolfai/react-heroicons";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";

import ShowEmojis from "components/ui/Form/ShowEmojis";
import ModalNotification from "components/ui/Modal/ModalNotification";

import { sendMessage } from "redux/actions/roomsActions";
import { focusElement } from "utils/other";
import SubmitIcon from "../assets/SubmitIcon";

const TextEditor = ({ unauthorized }) => {
  const dispatch = useDispatch();
  const activeRoom = useSelector((state) => state.activeRoom.activeRoom);

  const inputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [heightChange, setHeightChange] = useState(0);

  // when user switches between rooms reset the message and reapply the focus!
  useEffect(() => {
    setMessage("");
    focusElement(inputRef.current);
  }, [activeRoom]);
  //  focus on text editor when emojis are selected
  //  or message is updated (useful for emojis because text is deselected by default.
  useEffect(() => {
    focusElement(inputRef.current);
  }, [message, showEmojis]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if user is not signed in error modal pops up
    if (unauthorized) {
      dispatch({type: "TOGGLE_MODAL", payload: {
        message: "You have to sign in to chat!",
        modalComponent: <ModalNotification />,
				firstBtn: "Ok",
				modalExitBtn: false
      }})
      setMessage("");
      setTimeout(() => {
        inputRef.current.blur();
      }, 0);
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };
  return (
    <div
      className={
        "px-4 py-2 flex space-x-4 bg-gray-400 bg-opacity-25 border-r border-gray-400 " +
        (heightChange > 44 ? "items-end" : "items-center")
      }
    >
      <div>
        <ShowEmojis
          setShowEmojis={setShowEmojis}
          showEmojis={showEmojis}
          setInputText={setMessage}
          inputText={message}
          emojiStyles={{
            width: "430px",
            height: "320px",
            position: "absolute",
            left: "0",
            bottom: "46px",
            zIndex: "30",
            transformOrigin: "left bottom",
          }}
          buttonDimensions="w-8 h-8"
        />
      </div>
      <TextareaAutosize
        ref={inputRef}
        className="form-textarea w-full px-4 placeholder-gray-500 border-2 font-medium rounded-lg resize-none focus:text-gray-900"
        placeholder="Type a message"
        minRows="1"
        maxRows="12"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        onHeightChange={(num) => setHeightChange(num)}
      />
      <button
        className="text-gray-900 opacity-50 w-8 h-8 focus:outline-none focus:text-gray-700 hover:text-gray-700"
        type="button"
        onClick={message ? handleSubmit : () => ""}
      >
        {message ? <SubmitIcon /> : <MicrophoneSolid />}
      </button>
    </div>
  );
};

export default TextEditor;