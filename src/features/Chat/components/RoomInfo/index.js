import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { XSolid } from "@graywolfai/react-heroicons";

import ModalNotification from "components/ui/Modal/ModalNotification";
import { RoomMainInfo } from "./RoomMainInfo";
import Description from "./Description";
import DeleteRoom from "./DeleteRoom";
import Participants from "./Participants";

const RoomInfo = ({ setOpenRoomInfo, activeRoom }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.firebase.profile.userName);

  const [files, setFiles] = useState(null);

  const openErrorModal = () => {
    dispatch({type: "TOGGLE_MODAL", payload: {
      message: "Field can't be empty!",
      modalComponent: <ModalNotification />,
      firstBtn: "Ok",
      modalExitBtn: false,
    }})
  }

  return (
    <>
      <motion.div
        id="room-info-motion-view"
        className="fixed z-50 top-0 right-0 flex flex-col h-full max-w-sm w-full overflow-hidden bg-white xl:static"
        key="rooms-info"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          ease: "circOut",
          delayChildren: 1.5,
          duration: 0.2,
        }}
      >
        <div className="flex items-center space-x-8 px-6 py-4 bg-gray-400 bg-opacity-25 border-l border-gray-700 border-opacity-25">
          <button
            type="button"
            className="h-6 w-6 z-50 cursor-pointer text-gray-700 text-opacity-75 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            onClick={() => setOpenRoomInfo(false)}
          >
            <XSolid />
          </button>
          <div className="text-black">Room Info</div>
        </div>
        <div className="bg-gray-400 bg-opacity-25 h-full overflow-y-auto overflow-x-hidden">
          <RoomMainInfo
            activeRoom={activeRoom}
            currentUser={currentUser}
            openErrorModal={openErrorModal}
            files={files}
            setFiles={setFiles}
          />
          <Description
            activeRoom={activeRoom}
            currentUser={currentUser}
            openErrorModal={openErrorModal}
          />
          <Participants
            participants={activeRoom.participants}
            currentUser={currentUser}
            createdBy={activeRoom.createdBy}
          />
          {activeRoom.createdBy === currentUser && (
            <DeleteRoom
              message="Delete room"
              activeRoom={activeRoom}
            />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default RoomInfo;