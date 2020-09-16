import React, { useEffect, useState } from "react";

import { SidebarHeader } from "../../reusable/SidebarHeader";

import { SidebarPhoto } from "../../reusable/SidebarPhoto";
import { AnimatePresence, motion } from "framer-motion";
import { EditField } from "../../reusable/EditField";
import { transitions } from "../../reusable/constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../reusable/Modal/Modal";
import { ModalNotification } from "../../reusable/Modal/ModalNotification";

function fields(title, content, fieldType, dispatch, setOpenModal) {
  return (
    <motion.div
      className="px-8 pt-2 pb-4 bg-white w-full shadow"
      initial={{ y: "-50px", opacity: 0 }}
      transition={transitions}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="mb-4 text-green-title text-sm">{title}</div>

      <EditField
        content={content}
        fieldType={fieldType}
        dispatch={dispatch}
        collection="users"
        setOpenModal={setOpenModal}
      />
    </motion.div>
  );
}

export const EditProfile = ({ setSidebarView }) => {
  const user = useSelector((state) => state.firebase.profile);
  const description = user.description;
  const name = user.userName;
  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState(null);
  const dispatch = useDispatch();
  return (
    <>
      <SidebarHeader title="Profile" setSidebarView={setSidebarView} />
      <SidebarPhoto
        type="profile"
        photo={user.photo}
        dispatch={dispatch}
        files={files}
        setFiles={setFiles}
      />

      {fields("Your Name", name, "input", dispatch, setOpenModal)}
      <div className="px-8 pt-4 pb-6 text-gray-800 text-opacity-50 text-sm">
        This is not your username or pin. This name will be visible to your
        WhatsApp contacts
      </div>
      {fields("About", description, "textarea", dispatch, setOpenModal)}

      <AnimatePresence>
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            exitButton={false}
          >
            <ModalNotification
              message={`Field can't be empty!`}
              secondButton="Ok"
              setOpenModal={setOpenModal}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
