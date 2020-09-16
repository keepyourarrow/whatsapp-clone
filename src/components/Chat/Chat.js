import React, { useState } from "react";
import { TextEditor } from "./Default/TextEditor";
import { ChatBox } from "./Default/ChatBox";
import { ChatHeader } from "./Default/ChatHeader";
import { RoomInfo } from "./RoomInfo/main";
import { AnimatePresence } from "framer-motion";
import { ModalNotification } from "../reusable/Modal/ModalNotification";
import { Modal } from "../reusable/Modal/Modal";
import { useSelector } from "react-redux";

function NoMessages() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-white border-b-6 border-green-border ">
      <div className="w-3/4 max-w-md flex flex-col justify-center items-center mx-auto text-center">
        <div
          className="bg-center w-88 h-88 rounded-full"
          style={{
            backgroundImage:
              "url(https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg)",
          }}
        ></div>
        <div className="mt-10 text-gray-900 text-opacity-75 text-4xl font-light leading-9">
          Keep your phone connected
        </div>
        <div className="mt-6 text-gray-900 text-opacity-50 text-sm">
          WhatsApp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-Fi.
        </div>
        <div className="mt-6 border-t border-gray-400 border-opacity-50 w-full">
          <div className="mb-8"></div>
          <div className="flex justify-center items-center space-x-1  text-gray-900 text-opacity-50 text-sm">
            <span>
              <WindowsSVG />
            </span>
            <div>
              WhatsApp is available for Windows.{" "}
              <a href="#" className=" text-green-link">
                Get it here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Chat = ({ openRoomInfo, setOpenRoomInfo }) => {
  const signedIn = useSelector((state) => state.firebase.auth.isEmpty);
  const activeRoom = useSelector((state) => state.activeRoom.activeRoom);

  const [openErrorModal, setOpenErrorModal] = useState(false);

  if (activeRoom === undefined) {
    return <NoMessages />;
  }

  if (!activeRoom.name) {
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
            {/* <ScrollToBottom className=""> */}
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
            {/* </ScrollToBottom> */}
          </div>

          <TextEditor signedIn={signedIn} setOpenModal={setOpenErrorModal} />
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

      {/* if user is not loggedIn and tries to type an error pops up */}
      <AnimatePresence>
        {openErrorModal && (
          <Modal setOpenModal={setOpenErrorModal} exitButton={false}>
            <ModalNotification
              message="You have to sign in to chat!"
              secondButton="Ok"
              setOpenModal={setOpenErrorModal}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;

function WindowsSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21 18"
      width="21"
      height="18"
    >
      <path
        fill="currentColor"
        d="M10.426 14.235a.767.767 0 0 1-.765-.765c0-.421.344-.765.765-.765s.765.344.765.765-.344.765-.765.765zM4.309 3.529h12.235v8.412H4.309V3.529zm12.235 9.942c.841 0 1.522-.688 1.522-1.529l.008-8.412c0-.842-.689-1.53-1.53-1.53H4.309c-.841 0-1.53.688-1.53 1.529v8.412c0 .841.688 1.529 1.529 1.529H1.25c0 .842.688 1.53 1.529 1.53h15.294c.841 0 1.529-.688 1.529-1.529h-3.058z"
      ></path>
    </svg>
  );
}
