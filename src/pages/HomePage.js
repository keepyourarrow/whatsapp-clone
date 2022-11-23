import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Sidebar from "features/Sidebar";
import Chat from "features/Chat";
import ModalWrapper from "components/ui/Modal/ModalWrapper";
import { Notifications } from "components/ui/Notifications";

import LoadingGif from "assets/icons/LoadingGif";

const HomePage = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notifications.message);
  const loading = useSelector((state) => state.notifications.loading);
  const {open: modalOpen, modalExitBtn, modalComponent} = useSelector((state) => state.modal);

  const [openRoomInfo, setOpenRoomInfo] = useState(false);

  useEffect(() => {
    //remove notifiaction
    if (message) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_NOTIFICATION" });
      }, 5000);
    }
  }, [message]);

  const toggleModal = () => {
    dispatch({type: "TOGGLE_MODAL"});
  }

  return (
    <>
      {loading && (
        <Notifications message={loading}>
          <LoadingGif className="w-10 h-10" />{" "}
        </Notifications>
      )}
      <AnimatePresence>
        {message && <Notifications message={message} />}
      </AnimatePresence>

      <div className="hidden lg:block xl:container mx-auto w-full">
        <div className="absolute top-0 left-0 bg-green-title w-full h-32"></div>
        <div className="xl:py-5  h-screen relative z-40">
          <div className="flex items-center shadow-custom w-full h-full  overflow-hidden">
            <Sidebar setOpenRoomInfo={setOpenRoomInfo} />
            <Chat
              openRoomInfo={openRoomInfo}
              setOpenRoomInfo={setOpenRoomInfo}
            />
          </div>
        </div>
      </div>

      {/* only for smaller screens */}
      <div className="lg:hidden absolute flex justify-center items-center h-full w-full">
        <div className="py-4 px-6 w-full max-w-sm bg-white shadow-cancel-button">
          <span className="font-bold text-green-link whitespace-no-wrap">
            Please consider using our app version instead
          </span>
          <div className="pt-16 text-right">
            <span className="text-gray-600 text-opacity-75 text-sm">
              Sorry for the inconvenience
            </span>
            <div className="flex flex-col justify-center items-center text-center">
              <img
                className="w-32 h-32 object-cover object-center"
                src="https://hotemoji.com/images/dl/x/sad-emoji-by-google.png"
                alt="sad-emoji"
              />
              <div className="text-xs text-gray-700 font-hairline">
                your screen is too small :(
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <ModalWrapper toggleModal={toggleModal} exitButton={modalExitBtn}>
            {React.cloneElement(modalComponent,{toggleModal: toggleModal})}
          </ModalWrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;
