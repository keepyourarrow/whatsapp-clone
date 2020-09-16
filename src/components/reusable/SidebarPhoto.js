import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cropper from "react-easy-crop";

import { updateRoomImage } from "../../redux/actions/roomsActions";
import { updateProfileImage } from "../../redux/actions/editProfileAction";
import { Modal } from "../reusable/Modal/Modal";
import { handleMotionViewTransformStyle } from "./functions/functions";
import { useRef } from "react";
import { useSelector } from "react-redux";

function ProfileIconSVG() {
  return (
    <svg
      className="w-48 h-48"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 212 212"
      width="212"
      height="212"
    >
      <path
        fill="#DFE5E7"
        d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"
      ></path>
      <path
        fill="#FFF"
        d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"
      ></path>
    </svg>
  );
}
function RoomIconSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 212 212"
      width="212"
      height="212"
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
function SelectIconSvg({ type }) {
  return type === "profile" ? ProfileIconSVG() : RoomIconSvg();
}
function CameraIconSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        fill="currentColor"
        d="M21.317 4.381H10.971L9.078 2.45c-.246-.251-.736-.457-1.089-.457H4.905c-.352 0-.837.211-1.078.468L1.201 5.272C.96 5.529.763 6.028.763 6.38v1.878l-.002.01v11.189a1.92 1.92 0 0 0 1.921 1.921h18.634a1.92 1.92 0 0 0 1.921-1.921V6.302a1.92 1.92 0 0 0-1.92-1.921zM12.076 18.51a5.577 5.577 0 1 1 0-11.154 5.577 5.577 0 0 1 0 11.154zm0-9.506a3.929 3.929 0 1 0 0 7.858 3.929 3.929 0 0 0 0-7.858z"
      ></path>
    </svg>
  );
}

export const SidebarPhoto = ({ type, photo, dispatch, files, setFiles }) => {
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);
  const notLoggedIn = useSelector((state) => state.firebase.auth.isEmpty);

  useEffect(() => {
    //annoying framer motion zzz...
    handleMotionViewTransformStyle("removeRoomInfoTransform");
  }, [image]);

  const handleUpload = (e) => {
    if (files) {
      if (type === "profile") {
        console.log(image);
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
    setImage(window.URL.createObjectURL(e.target.files[0]));
    setOpenModal(true);
  };
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
              <SelectIconSvg type={type} />
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
                <CameraIconSvg />
              </button>
              <span className="w-24 text-xs uppercase tracking-wide text-center leading-snug opacity-75">
                {type === "profile" ? "Add Profile Photo" : "Add Group Photo"}
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {openModal && (
          <Modal setOpenModal={setOpenModal}>
            <div className="h-64" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-center items-center">
                <img
                  className="w-48 h-48 object-cover object-center rounded-full"
                  src={image}
                  alt=""
                />
              </div>

              <div className="flex justify-end items-center mt-5">
                <button
                  className="px-6 py-2 text-white uppercase tracking-wide rounded transition duration-200 ease-in bg-exit-button-green hover:bg-opacity-75 hover:shadow-lg focus:outline-none"
                  onClick={() => {
                    setOpenModal(false);
                    handleUpload();
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
