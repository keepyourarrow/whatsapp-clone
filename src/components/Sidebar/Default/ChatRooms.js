import {
  ChevronDownOutline,
  ChevronDownSolid,
  TrashSolid,
} from "@graywolfai/react-heroicons";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingGifSVG } from "../../../assets/images/loadingGif";
import { dateToFromNowDaily } from "../../reusable/functions/functions";
import { Modal } from "../../reusable/Modal/Modal";
import { ModalNotification } from "../../reusable/Modal/ModalNotification";

function lastMessage(room) {
  return room.messages[room.messages.length - 1];
}
function sentFromYouOrNot(whoSentMessage, currentUser) {
  return whoSentMessage === currentUser ? "You: " : whoSentMessage + ": ";
}

function removeZIndex(openActionModal, openErrorModal) {
  let chatContainer = document.getElementById("chat-container");
  if ((openActionModal || openErrorModal) && chatContainer !== null) {
    chatContainer.classList.add("-z-10");
  } else {
    if (chatContainer !== null) chatContainer.classList.remove("-z-10");
  }
}

export const ChatRooms = ({
  filteredRooms: rooms,
  dispatch,
  setOpenRoomInfo,
}) => {
  const [openActionModal, setOpenActionModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [payload, setPayload] = useState([]);

  const currentUser = useSelector((state) => state.firebase.profile.userName);

  //remove z-index
  useEffect(() => {
    removeZIndex(openActionModal, openErrorModal);
  }, [openActionModal, openErrorModal]);

  const handleActiveRoom = (room) => {
    setOpenRoomInfo(false);
    dispatch({ type: "SET_ACTIVE", payload: room });
    dispatch({ type: "SELECT_ACTIVE_ROOM", payload: room });
  };

  if (!rooms) {
    return (
      <div className="flex justify-center">
        <LoadingGifSVG className="w-16 h-16" />
      </div>
    );
  }
  if (rooms.length === 0) {
    return (
      <div className="flex justify-center">
        <span className="text-gray-800">There are currently no rooms</span>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="h-full">
        <div className="h-full">
          {rooms.map((room, i) => {
            return (
              <div
                role="button"
                key={i}
                className={
                  "relative group flex items-center justify-between pl-4 py-2 cursor-pointer mb-1 hover:bg-gray-400 hover:bg-opacity-25 " +
                  (room.active && "bg-gray-400 bg-opacity-25")
                }
                onClick={() => handleActiveRoom(room)}
              >
                <div className="flex space-x-4">
                  <span>
                    {room.photo ? (
                      <img
                        className="w-12 h-12 object-cover object-center rounded-full"
                        src={room.photo}
                        alt="room-avatar"
                      />
                    ) : (
                      <DefaultChatImage />
                    )}
                  </span>
                  <div>
                    <div className="text-lg truncate max-w-xs-- text-gray-900 font-medium">
                      {room.name}
                    </div>
                    <p className="text-gray-900 text-sm truncate max-w-xs--">
                      {lastMessage(room).from !== "admin"
                        ? sentFromYouOrNot(lastMessage(room).from, currentUser)
                        : room.createdBy === currentUser
                        ? "You "
                        : room.createdBy + " "}
                      {lastMessage(room).message}
                    </p>
                  </div>
                </div>
                <div className="px-4 text-sm text-gray-700 text-opacity-75">
                  <div className="-mt-4">
                    {dateToFromNowDaily(lastMessage(room).date)}
                    {currentUser && (
                      <div className="absolute mr-2 right-0 transform translate-x-12 transition duration-200 ease-out group-hover:translate-x-0">
                        <button
                          tabIndex="-1"
                          type="button"
                          className="text-red-500 hover:text-red-400 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPayload(room);
                            return room.createdBy === currentUser
                              ? setOpenActionModal(true)
                              : setOpenErrorModal(true);
                          }}
                        >
                          <TrashSolid className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* if user created the room and clicks on delete */}
      <AnimatePresence>
        {openActionModal && (
          <Modal setOpenModal={setOpenActionModal} exitButton={false}>
            <ModalNotification
              message={`Delete "${payload.name}" room?`}
              firstButton="Cancel"
              secondButton="Delete"
              setOpenModal={setOpenActionModal}
              dispatch={dispatch}
              payload={payload}
            />
          </Modal>
        )}
      </AnimatePresence>

      {/* if user is not admin and clicks on delete */}
      <AnimatePresence>
        {openErrorModal && (
          <Modal setOpenModal={setOpenErrorModal} exitButton={false}>
            <ModalNotification
              message="Only the one who created the room can delete it!"
              secondButton="Ok"
              setOpenModal={setOpenErrorModal}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

function DefaultChatImage() {
  return (
    <svg
      className="w-12 h-12"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 212 212"
      height="212"
      width="212"
    >
      <path
        fill="#DFE5E7"
        d="M105.946.25C164.318.25 211.64 47.596 211.64 106s-47.322 105.75-105.695 105.75C47.571 211.75.25 164.404.25 106S47.571.25 105.946.25z"
      ></path>
      <path
        fill="#FFF"
        d="M61.543 100.988c8.073 0 14.246-6.174 14.246-14.246s-6.173-14.246-14.246-14.246-14.246 6.173-14.246 14.246 6.174 14.246 14.246 14.246zm8.159 17.541a48.192 48.192 0 0 1 8.545-6.062c-4.174-2.217-9.641-3.859-16.704-3.859-21.844 0-28.492 15.67-28.492 15.67v8.073h26.181l.105-.248c.303-.713 3.164-7.151 10.365-13.574zm80.755-9.921c-6.854 0-12.21 1.543-16.336 3.661a48.223 48.223 0 0 1 8.903 6.26c7.201 6.422 10.061 12.861 10.364 13.574l.105.248h25.456v-8.073c-.001 0-6.649-15.67-28.492-15.67zm0-7.62c8.073 0 14.246-6.174 14.246-14.246s-6.173-14.246-14.246-14.246-14.246 6.173-14.246 14.246 6.173 14.246 14.246 14.246zm-44.093 3.21a23.21 23.21 0 0 0 4.464-.428c.717-.14 1.419-.315 2.106-.521 1.03-.309 2.023-.69 2.976-1.138a21.099 21.099 0 0 0 3.574-2.133 20.872 20.872 0 0 0 5.515-6.091 21.283 21.283 0 0 0 2.121-4.823 22.16 22.16 0 0 0 .706-3.193c.16-1.097.242-2.224.242-3.377s-.083-2.281-.242-3.377a22.778 22.778 0 0 0-.706-3.193 21.283 21.283 0 0 0-3.272-6.55 20.848 20.848 0 0 0-4.364-4.364 21.099 21.099 0 0 0-3.574-2.133 21.488 21.488 0 0 0-2.976-1.138 22.33 22.33 0 0 0-2.106-.521 23.202 23.202 0 0 0-4.464-.428c-12.299 0-21.705 9.405-21.705 21.704 0 12.299 9.406 21.704 21.705 21.704zM145.629 131a36.739 36.739 0 0 0-1.2-1.718 39.804 39.804 0 0 0-3.367-3.967 41.481 41.481 0 0 0-3.442-3.179 42.078 42.078 0 0 0-5.931-4.083 43.725 43.725 0 0 0-3.476-1.776c-.036-.016-.069-.034-.104-.05-5.692-2.581-12.849-4.376-21.746-4.376-8.898 0-16.055 1.795-21.746 4.376-.196.089-.379.185-.572.276a43.316 43.316 0 0 0-3.62 1.917 42.32 42.32 0 0 0-5.318 3.716 41.501 41.501 0 0 0-3.443 3.179 40.632 40.632 0 0 0-3.366 3.967c-.452.61-.851 1.186-1.2 1.718-.324.493-.6.943-.841 1.351l-.061.101a27.96 27.96 0 0 0-.622 1.119c-.325.621-.475.975-.475.975v11.692h82.53v-11.692s-.36-.842-1.158-2.195a35.417 35.417 0 0 0-.842-1.351z"
      ></path>
    </svg>
  );
}
