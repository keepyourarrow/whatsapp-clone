import React, { useRef, useState, useEffect } from "react";
import {
  checkRemainingSpace,
  checkPastedText,
} from "../../reusable/functions/functions";
import RemainingSpace from "../../reusable/RemainingSpace";
import ShowEmojis from "../../reusable/ShowEmojis";
import { motion } from "framer-motion";
import { transitions } from "../../reusable/constants/constants";
import { createRoom } from "../../../redux/actions/roomsActions";

export const EditField = ({
  setSidebarView,
  inputText,
  setInputText,
  typing,
  setTyping,
}) => {
  const textInputRef = useRef(null);
  const [remainingSpace, setRemainingSpace] = useState(
    checkRemainingSpace("input", "")
  );
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      textInputRef.current.focus();
    }, 0);
  }, []);

  useEffect(() => {
    setRemainingSpace(checkRemainingSpace("input", inputText));

    if (inputText.length >= 1) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [inputText]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
    } else if (e.key === "Escape") {
      setSidebarView("default");
    } else if (e.key === "Enter") {
    }
  };

  return (
    <motion.div
      className="flex justify-between items-start ml-8 mt-10 border-b-2 border-transparent border-green-header"
      initial={{ x: "-50px", opacity: 0 }}
      transition={transitions}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className="relative pb-6 w-full overflow-hidden">
        <label
          htmlFor="input"
          className={
            "absolute text-gray-700 text-opacity-75 cursor-text  transition-input duration-300 ease-in-out " +
            (typing ? "top-0 text-xs" : "top-22 text-base")
          }
        >
          Create a Room
        </label>
        <input
          id="input"
          className="relative top-22 w-full bg-transparent border-none focus:outline-none"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          ref={textInputRef}
          maxLength={25}
          onPaste={(e) => checkPastedText("input", e) && e.preventDefault()}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="flex items-center mr-2 mt-6 space-x-1 text-gray-900 text-opacity-50 ">
        <RemainingSpace remainingSpace={remainingSpace} />

        <ShowEmojis
          setShowEmojis={setShowEmojis}
          showEmojis={showEmojis}
          remainingSpace={remainingSpace}
          setInputText={setInputText}
          inputText={inputText}
          emojiStyles={null}
        />
      </div>
    </motion.div>
  );
};

export default EditField;
