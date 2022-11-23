import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import TextEditor from "./components/TextEditor";
import ChatBox from "./components/ChatBox";
import ChatHeader from "./components/ChatHeader";
import RoomInfo from "./components/RoomInfo";
import NoMessages from "./components/NoMessages";

const Chat = ({ openRoomInfo, setOpenRoomInfo }) => {
  const unauthorized = useSelector((state) => state.firebase.auth.isEmpty);
  const activeRoom = useSelector((state) => state.activeRoom.activeRoom);

  if (activeRoom === undefined || !activeRoom.name) {
    return <NoMessages />;
  }

  return (
    <>
      <div
        id="chat-container"
        className="flex justify-between w-full h-full bg-white overflow-hidden"
      >
        <div className={"relative flex flex-col w-full max-h-screen"}>
          <ChatHeader
            setOpenRoomInfo={setOpenRoomInfo}
            activeRoom={activeRoom}
          />
          <div
            className="relative h-full transition-colors duration-300 ease-out overflow-hidden"
            style={{
              backgroundImage:
                "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            }}
          >
            <div
              id="chatbox-container"
              className="absolute top-0 mt-2 w-full h-full flex-auto flex flex-col overflow-x-hidden  overflow-y-auto"
            >
              <div className="flex-1"></div>
              <ChatBox
                messages={activeRoom.messages}
                createdBy={activeRoom.createdBy}
              />
            </div>
          </div>

          <TextEditor unauthorized={unauthorized} />
        </div>
        {openRoomInfo && (
          <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 xl:hidden"></div>
        )}
        <AnimatePresence>
          {openRoomInfo && (
            <RoomInfo
              setOpenRoomInfo={setOpenRoomInfo}
              activeRoom={activeRoom}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Chat;