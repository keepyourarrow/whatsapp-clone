import React from "react";
import { deleteRoom } from "../../../redux/actions/roomsActions";

export const ModalNotification = ({
  message,
  firstButton,
  secondButton,
  setOpenModal = {},
  dispatch,
  payload,
}) => {
  return (
    <div className="py-2 " onClick={(e) => e.stopPropagation()}>
      <div className="pb-4">
        <span>{message}</span>
      </div>
      <div className="pt-12 flex justify-end items-center space-x-1 w-full text-sm  ">
        {firstButton && (
          <button
            className="px-6 py-2 uppercase tracking-wide text-green-link hover:bg-white hover:shadow-cancel-button focus:outline-none"
            onClick={() => setOpenModal(false)}
          >
            {firstButton}
          </button>
        )}
        <button
          className="px-6 py-2 text-white uppercase tracking-wide rounded transition duration-200 ease-in bg-exit-button-green hover:bg-opacity-75 hover:shadow-lg focus:outline-none"
          onClick={() => {
            setOpenModal(false);
            dispatch && dispatch(deleteRoom(payload));
          }}
        >
          {secondButton}
        </button>
      </div>
    </div>
  );
};
