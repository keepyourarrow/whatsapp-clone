import React, { useEffect } from "react";
import { useState } from "react";
import { SignUpModal } from "../../../../reusable/Modal/SignUpModal";
import { Modal } from "../../../../reusable/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import {
  ExclamationCircleOutline,
  ExclamationCircleSolid,
  ExclamationOutline,
  InformationCircleOutline,
  InformationCircleSolid,
} from "@graywolfai/react-heroicons";
import ReactTooltip from "react-tooltip";

export const NormalLinks = () => {
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openInformationModal, setOpenInformationModal] = useState(false);

  useEffect(() => {
    //remove z-index
    let chatContainer = document.getElementById("chat-container");
    if ((openSignupModal || openInformationModal) && chatContainer !== null) {
      chatContainer.classList.add("-z-10");
    } else {
      if (chatContainer !== null) chatContainer.classList.remove("-z-10");
    }
  }, [openSignupModal, openInformationModal]);
  return (
    <>
      <div className="flex items-center justify-between bg-gray-400 bg-opacity-25 px-2 py-2">
        <button
          type="button"
          className="py-1 ml-28 text-blue-400 text-lg font-medium hover:text-indigo-500 border-indigo-500 border-b  focus:text-indigo-800
            focus:border-indigo-800 focus:outline-none"
          onClick={() => setOpenSignupModal(true)}
        >
          SignUp/SignIn
        </button>
        <div className="flex mr-2">
          <button
            data-tip=""
            data-for="project-info"
            className="text-gray-700 text-opacity-75 focus:outline-none"
            onClick={() => setOpenInformationModal(true)}
          >
            <span>
              <InformationCircleSolid className="w-6 h-6" />
            </span>
          </button>
        </div>
      </div>
      <ReactTooltip
        id="project-info"
        place="bottom"
        effect="solid"
        delayShow={350}
        globalEventOff="click"
      >
        Project Info
      </ReactTooltip>

      {/* SIGNUP MODAL */}
      <AnimatePresence>
        {openSignupModal && (
          <Modal setOpenModal={setOpenSignupModal}>
            <SignUpModal setOpenModal={setOpenSignupModal} />
          </Modal>
        )}
      </AnimatePresence>

      {/* Information modal */}
      <AnimatePresence>
        {openInformationModal && (
          <Modal setOpenModal={setOpenInformationModal}>
            <div>
              <div>
                <p className="text-sm">
                  This is a whatsapp clone made by Dima Tokarev.
                </p>

                <div className="pt-8 flex items-center justify-between space-x-4">
                  <span className="text-gray-600 h-6 w-6">
                    <ExclamationCircleOutline />
                  </span>
                  <p className="">
                    I used React/Redux/TailwindCSS for frontend and Firebase for
                    backend.
                  </p>
                </div>
              </div>
              <div className="pt-4 pb-2 flex items-center justify-end space-x-2 text-gray-600 text-xs">
                <p>You can view the real website at</p>
                <a
                  className="text-blue-500 hover:underline hover:text-blue-400 focus:text-blue-600"
                  href="https://web.whatsapp.com/"
                >
                  https://web.whatsapp.com/
                </a>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2 text-white uppercase tracking-wide rounded transition duration-200 ease-in bg-exit-button-green hover:bg-opacity-75 hover:shadow-lg focus:outline-none"
                  onClick={() => setOpenInformationModal(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
