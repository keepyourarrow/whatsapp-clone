import React, { useState, useEffect } from "react";
import { SidebarHeader } from "../../reusable/SidebarHeader";
import { SidebarPhoto } from "../../reusable/SidebarPhoto";
import { EditField } from "./EditField";
import { CheckboxField } from "./CheckboxField";
import { CheckSolid, CheckOutline } from "@graywolfai/react-heroicons";
import { createRoom } from "../../../redux/actions/roomsActions";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  handleMotionViewTransformStyle,
  handleOverflowFromSidebarContainer,
} from "../../reusable/functions/functions";

export const CreateRoom = ({ setSidebarView }) => {
  const [typing, setTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [files, setFiles] = useState(null);
  const loading = useSelector((state) => state.notifications.loading);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "LOADING", payload: `Creating room...` });
    dispatch(createRoom(inputText, files));
  };

  useEffect(() => {
    // so the sidebar will change only after the room is created and everything loaded
    if (!loading && inputText) {
      handleMotionViewTransformStyle("addTransform");
      handleOverflowFromSidebarContainer("addOverflow");
      setSidebarView("default");
    }
  }, [loading]);

  return (
    <>
      <SidebarHeader title="New Room" setSidebarView={setSidebarView} />
      <SidebarPhoto
        type="create-room"
        dispatch={dispatch}
        setFiles={setFiles}
      />
      <form>
        <EditField
          setSidebarView={setSidebarView}
          typing={typing}
          setTyping={setTyping}
          inputText={inputText}
          setInputText={setInputText}
        />
        {/* <CheckboxField />
        <div className="px-8 pt-4 pb-6 text-gray-800 text-opacity-50 text-sm">
          By default all rooms are public
        </div> */}

        <AnimatePresence>
          {inputText && (
            <motion.div
              className="-ml-4 mt-8 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.1 }}
              transition={{ ease: "easeOut", duration: 0.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
            >
              <button
                type="submit"
                className="bg-green-border w-12 h-12 rounded-full shadow-dropdown-shadow focus:outline-none"
                onClick={handleSubmit}
              >
                <div className="flex justify-center">
                  <CheckOutline className="w-8 h-8 text-white" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
};
