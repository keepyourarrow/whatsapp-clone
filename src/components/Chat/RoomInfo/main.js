import React, { useState } from "react";
import { XSolid } from "@graywolfai/react-heroicons";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "../../reusable/Modal/Modal";
import { ModalNotification } from "../../reusable/Modal/ModalNotification";
import { useDispatch, useSelector } from "react-redux";
import { RoomMainInfo } from "./RoomMainInfo";
import { Description } from "./Description";
import { LeaveRoom } from "./LeaveRoom";
import { Participants } from "./Participants";

export const RoomInfo = ({ setOpenRoomInfo, activeRoom }) => {
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [files, setFiles] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.firebase.profile.userName);

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
            setOpenModal={setOpenErrorModal}
            currentUser={currentUser}
            dispatch={dispatch}
            files={files}
            setFiles={setFiles}
          />
          <Description
            activeRoom={activeRoom}
            setOpenModal={setOpenErrorModal}
            currentUser={currentUser}
            dispatch={dispatch}
          />
          <Participants
            participants={activeRoom.participants}
            currentUser={currentUser}
            createdBy={activeRoom.createdBy}
          />
          {activeRoom.createdBy === currentUser && (
            <LeaveRoom
              message="Delete room"
              setOpenModal={setOpenActionModal}
            />
          )}
        </div>
      </motion.div>

      {/* when user tries to submit with an empty field error notification pops up */}
      <AnimatePresence>
        {openErrorModal && (
          <Modal
            openModal={openErrorModal}
            setOpenModal={setOpenErrorModal}
            exitButton={false}
          >
            <ModalNotification
              message={`Field can't be empty!`}
              secondButton="Ok"
              setOpenModal={setOpenErrorModal}
            />
          </Modal>
        )}
      </AnimatePresence>

      {/* confirming user action when he wants to delete a room! */}
      <AnimatePresence>
        {openActionModal && (
          <Modal
            openModal={openActionModal}
            setOpenModal={setOpenActionModal}
            exitButton={false}
          >
            <ModalNotification
              message={`Delete "${activeRoom.name}" room?`}
              firstButton="Cancel"
              secondButton="Delete"
              setOpenModal={setOpenActionModal}
              dispatch={dispatch}
              payload={activeRoom}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
