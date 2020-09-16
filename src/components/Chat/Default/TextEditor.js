import React, { useEffect, useRef, useState } from "react";
import { MicrophoneSolid } from "@graywolfai/react-heroicons";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../redux/actions/roomsActions";
import ShowEmojis from "../../reusable/ShowEmojis";

function SubmitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
      ></path>
    </svg>
  );
}
function applyFocus(inputRef) {
  setTimeout(() => {
    inputRef.current.focus();
  }, 0);
}

export const TextEditor = ({ signedIn, setOpenModal }) => {
  const [message, setMessage] = useState("");
  const [heightChange, setHeightChange] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const activeRoom = useSelector((state) => state.activeRoom.activeRoom);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // when user switches between rooms reset the message and reapply the focus!
  useEffect(() => {
    setMessage("");
    applyFocus(inputRef);
  }, [activeRoom]);
  //  focus on text editor when emojis are selected
  //  or message is updated (useful for emojis because text is deselected by default.
  useEffect(() => {
    applyFocus(inputRef);
  }, [message, showEmojis]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if user is not signed in error modal pops up
    if (signedIn) {
      setOpenModal(true);
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
          emojiStyles={null}
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
