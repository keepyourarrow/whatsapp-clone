import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import UploadPhoto from "./UploadPhoto";

import { handleMotionViewTransformStyle } from "utils/other";
import { updateRoomImage } from "redux/actions/roomsActions";
import { updateProfileImage } from "redux/actions/editProfileAction";
import RoomIcon from "assets/icons/RoomIcon";
import ProfileIcon from "assets/icons/ProfileIcon";
import CameraIcon from "assets/icons/CameraIcon";

const SidebarPhoto = ({ type, photo, files, setFiles }) => {
  const dispatch = useDispatch();
  const notLoggedIn = useSelector((state) => state.firebase.auth.isEmpty);

  const [image, setImage] = useState(null);

  useEffect(() => {
    //annoying framer motion zzz...
    handleMotionViewTransformStyle("removeRoomInfoTransform");
  }, [image]);

  const handleUpload = (e) => {
    if (files) {
      if (type === "profile") {
        dispatch(updateProfileImage(files));
      } else if (type === "edit-room") {
        dispatch(updateRoomImage(files));
      } else {
        return;
      }
    }
  };

  const handleChange = (e) => {
    e.stopPropagation();
    handleMotionViewTransformStyle("removeTransform");
    handleMotionViewTransformStyle("removeRoomInfoTransform");

    setFiles(e.target.files[0]);
    const newImage = window.URL.createObjectURL(e.target.files[0]);
    setImage(newImage);
    dispatch({type: "TOGGLE_MODAL", payload: {
      modalComponent: <UploadPhoto image={newImage}/>,
      secondBtnAction: handleUpload,
    }})
  };

  const getIcon = () => {
    return type === "profile" ? <ProfileIcon/> : <RoomIcon/>;
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, scale: 0.2 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center justify-center py-8 px-4">
          <div className="group relative">
            {photo || (!photo && image) ? (
              <img
                className="rounded-full w-48 h-48 object-cover object-center"
                src={photo ? photo : !photo && image ? image : ""}
                alt="avatar"
              />
            ) : (
              getIcon()
            )}

            <div
              className={
                "absolute top-0 flex flex-col items-center justify-center space-y-2 rounded-full w-full h-full bg-darker-gray text-white transition duration-150 ease-linear cursor-pointer " +
                (photo || (!photo && image)
                  ? "opacity-0 group-hover:opacity-100"
                  : "")
              }
            >
              {notLoggedIn ? (
                <span></span>
              ) : (
                <input
                  className="absolute inset-0 w-full z-20 opacity-0 cursor-pointer"
                  type="file"
                  onChange={handleChange}
                  onClick={(e) => (e.target.value = "")}
                />
              )}

              <button className="focus:outline-none" onClick={handleUpload}>
                <CameraIcon />
              </button>
              <span className="w-24 text-xs uppercase tracking-wide text-center leading-snug opacity-75">
                {type === "profile" ? "Add Profile Photo" : "Add Group Photo"}
              </span>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default SidebarPhoto;