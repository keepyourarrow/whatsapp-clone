import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Field from "./Field";
import ModalNotification from "components/ui/Modal/ModalNotification";
import SidebarHeader from "components/Sidebar/SidebarHeader";
import SidebarPhoto from "components/Sidebar/SidebarPhoto";

const EditProfile = ({ setSidebarView }) => {
  const {description, userName: name, photo} = useSelector((state) => state.firebase.profile);
  const dispatch = useDispatch();

  const [files, setFiles] = useState(null);

  const openModal = () => {
    dispatch({type: "TOGGLE_MODAL", payload: {
      message: `Field can't be empty!`,
      modalComponent: <ModalNotification/>,
      firstBtn: "Ok",
      modalExitBtn: false
    }})
  }

  return (
    <>
      <SidebarHeader title="Profile" setSidebarView={setSidebarView} />
      <SidebarPhoto
        type="profile"
        photo={photo}
        files={files}
        setFiles={setFiles}
      />

      <Field
        title="Your Name"
        content={name}
        fieldType="input"
        openModal={openModal}
      />
      <div className="px-8 pt-4 pb-6 text-gray-800 text-opacity-50 text-sm">
        This is not your username or pin. This name will be visible to your
        WhatsApp contacts
      </div>
      <Field
        title="About"
        content={description}
        fieldType="textarea"
        openModal={openModal}
      />
    </>
  );
};

export default EditProfile;