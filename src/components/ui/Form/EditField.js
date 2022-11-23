import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import { PencilSolid, CheckOutline } from "@graywolfai/react-heroicons";
import "emoji-mart/css/emoji-mart.css";
import TextareaAutosize from "react-textarea-autosize";

import RemainingSpace from "./RemainingSpace";
import ShowEmojis from "./ShowEmojis";

import { focusElement, handleMotionViewTransformStyle } from 'utils/other'
import { checkPastedText, checkRemainingSpace } from 'utils/form'
import LoadingGif from "assets/icons/LoadingGif";

const EditField = ({
  content = "",
  fieldType = "input",
  action,
  openModal,
  EmojiStylesLG = null,
  EmojiStylesXL = null,
}) => {
  const loading = useSelector((state) => state.notifications.loading);
  const error = useSelector((state) => state.notifications.error);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(content);
  const [showEmojis, setShowEmojis] = useState(false);

  const textInputRef = useRef(null);


  const [remainingSpace, setRemainingSpace] = useState(
    checkRemainingSpace(fieldType, content)
  );

  useEffect(() => {
    setRemainingSpace(checkRemainingSpace(fieldType, inputText));
    handleMotionViewTransformStyle("removeTransform");
    handleMotionViewTransformStyle("removeRoomInfoTransform");
  }, [inputText]);

  useEffect(() => {
    if (error) {
      setInputText(content);
    }
  }, [error]);

  const handleKeyPress = (e) => {
    if ((e.key === "Enter" && e.shiftKey) || e.key === "Escape") {
      handleMotionViewTransformStyle("addTransform");
      setInputText(content);

      setEditing(false);
    } else if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleEdit = () => {
    handleMotionViewTransformStyle("removeTransform");
    handleMotionViewTransformStyle("removeRoomInfoTransform");
    setEditing(true);

    //make sure focus is at the end of the input string
    setTimeout(() => {
      focusElement(textInputRef.current);
      textInputRef.current.setSelectionRange(
        textInputRef.current.value.length,
        textInputRef.current.value.length
      );
    }, 0);
  };
  const handleSubmit = () => {
    handleMotionViewTransformStyle("addTransform");
    // if field didnt change
    if (inputText === content) {
      setEditing(false);
      setInputText(content);
    } else if (inputText.trim().length === 0) {
      // if field is empty
      handleMotionViewTransformStyle("removeTransform");
      openModal();
    } else {
      if (remainingSpace < 0) {
        return;
      }
      setEditing(false);
      return dispatch(action(fieldType, inputText));
    }
  };

  if (!content) {
    return (
      <div className="text-black flex justify-center">
        <LoadingGif className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div
      className={
        "flex justify-between items-start pb-1 border-b-2 border-transparent " +
        (editing && "border-green-header")
      }
    >
      <div className="w-full overflow-hidden">
        {fieldType === "input" ? (
          <input
            className="w-full border-none focus:outline-none"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            ref={textInputRef}
            maxLength={25}
            readOnly={!editing && true}
            onPaste={(e) => checkPastedText("input", e) && e.preventDefault()}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <TextareaAutosize
            className="w-full border-none focus:outline-none resize-none overflow-hidden"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            ref={textInputRef}
            minRows="1"
            maxRows="4"
            maxLength={120}
            readOnly={!editing && true}
            onPaste={(e) =>
              checkPastedText("textarea", e) && e.preventDefault()
            }
            onKeyDown={handleKeyPress}
          />
        )}
      </div>

      {loading && inputText !== content ? (
        <LoadingGif className="w-8 h-8" />
      ) : (
        <div>
          {!editing ? (
            <button
              type="button"
              className="h-6 w-6 text-gray-900 text-opacity-50 focus:outline-none"
              data-tip=""
              data-for={"edit-" + fieldType}
              onClick={handleEdit}
            >
              <PencilSolid />
              <ReactTooltip
                id={"edit-" + fieldType}
                place="bottom"
                effect="solid"
                delayShow={1000}
                globalEventOff="click"
              >
                Edit
              </ReactTooltip>
            </button>
          ) : (
            //  IF WE ARE EDITING

            <div className="flex items-center space-x-1 text-gray-900 text-opacity-50">
              {fieldType === "textarea" && inputText.length >= 70 && (
                <RemainingSpace remainingSpace={remainingSpace} />
              )}
              {fieldType === "input" && (
                <RemainingSpace remainingSpace={remainingSpace} />
              )}

              {/* conditional for roominfo emoji, to place them nicely */}
              {/* for XL screens */}
              <div className="hidden xl:block">
                <ShowEmojis
                  setShowEmojis={setShowEmojis}
                  showEmojis={showEmojis}
                  remainingSpace={remainingSpace}
                  setInputText={setInputText}
                  inputText={inputText}
                  emojiStyles={EmojiStylesXL}
                />
              </div>
              {/* for LG and below screens */}
              <div className="xl:hidden">
                <ShowEmojis
                  setShowEmojis={setShowEmojis}
                  showEmojis={showEmojis}
                  remainingSpace={remainingSpace}
                  setInputText={setInputText}
                  inputText={inputText}
                  emojiStyles={EmojiStylesLG}
                />
              </div>

              <button
                type="submit"
                data-tip=""
                data-for={"checkmark-" + fieldType}
                className="h-6 w-6  focus:outline-none"
                onClick={handleSubmit}
              >
                <ReactTooltip
                  className="whitespace-no-wrap"
                  id={"checkmark-" + fieldType}
                  place="bottom"
                  effect="solid"
                  delayShow={1000}
                  globalEventOff="click"
                >
                  Click to Save, Esc to cancel.
                </ReactTooltip>
                <CheckOutline />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditField;