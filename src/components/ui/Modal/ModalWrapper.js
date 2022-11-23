import React from "react";
import { XSolid } from "@graywolfai/react-heroicons";
import { motion } from "framer-motion";

const ModalWrapper = ({ toggleModal, exitButton = true, children }) => {
  return (
    <div
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-60"
      onClick={() => (!exitButton ? toggleModal() : "")}
    >
      <motion.div
        className="relative px-6 py-4 max-w-md w-full bg-white rounded-sm shadow-modal-shadow"
        key="modal"
        transition={{ duration: 0.1, ease: "easeInOut" }}
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
      >
        {children}
        {exitButton && (
          <button
            type="button"
            className="absolute top-0 right-0 -mx-8 w-6 h-6 focus:outline-none hover:text-gray-800"
            onClick={toggleModal}
          >
            <XSolid />
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default ModalWrapper;