import React from "react";
import { EmojiHappyOutline } from "@graywolfai/react-heroicons";
import { Picker } from "emoji-mart";
import { handleMotionViewTransformStyle } from "./functions/functions";
import { AnimatePresence, motion } from "framer-motion";

let defaultStyles = {
  width: "388px",
  height: "320px",
  position: "absolute",
  left: "-15px",
  bottom: "35px",
  zIndex: "30",
  transformOrigin: "left bottom",
};

const ShowEmojis = ({
  setShowEmojis,
  showEmojis,
  remainingSpace = 2,
  inputText,
  setInputText,
  emojiStyles,
  buttonDimensions = "h-5 w-5",
}) => {
  let styles = emojiStyles === null ? defaultStyles : emojiStyles;
  const handleSelectedEmoji = (emoji) => {
    if (remainingSpace > 1) {
      setInputText(inputText + emoji.native);
    }
  };

  const handleEmojiOpen = () => {
    handleMotionViewTransformStyle("removeTransform");

    setShowEmojis(true);
  };
  const handleEmojiClose = () => {
    setShowEmojis(false);
  };

  return (
    <>
      {showEmojis && (
        <div className="fixed inset-0 z-10" onClick={handleEmojiClose}></div>
      )}
      <div className="relative leading-3">
        <button
          className={`${buttonDimensions} text-gray-600 text-opacity-75 focus:outline-none`}
          type="button"
          onClick={handleEmojiOpen}
          tabIndex="-1"
        >
          <EmojiHappyOutline />
        </button>

        <AnimatePresence>
          {showEmojis && (
            <motion.div
              className="div"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                ease: "easeIn",
                duration: 0.05,
              }}
            >
              <Picker
                style={{
                  ...styles,
                  boxShadow:
                    "0 4px 20px 0 rgba(0,0,0,.1),0 8px 17px 0 rgba(0,0,0,.16)",
                  overflow: "hidden",
                  // transitionProperty: "all",
                  // transition: "ease-in",
                  // transitionDuration: "50ms",
                  // transform: showEmojis ? "scale(1)" : "scale(0.5)",
                  // opacity: showEmojis ? 1 : 0,
                }}
                title=""
                emoji=""
                emojiSize={32}
                showPreview={false}
                emojiTooltip={true}
                useButton={false}
                onSelect={handleSelectedEmoji}
                showSkinTones={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ShowEmojis;
