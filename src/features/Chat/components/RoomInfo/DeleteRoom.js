import React from "react";
import { useDispatch } from "react-redux";
import { LogoutSolid } from "@graywolfai/react-heroicons";

import ModalNotification from "components/ui/Modal/ModalNotification";

import { deleteRoom } from "redux/actions/roomsActions";

const DeleteRoom = ({ message, activeRoom }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({type: "TOGGLE_MODAL", payload: {
      message: `Delete "${activeRoom.name}" room?`,
      modalComponent: <ModalNotification />,
      firstBtn: "Cancel",
      secondBtn: "Delete",
      payload: activeRoom,
      modalExitBtn: false,
      secondBtnAction: deleteRoom
    }})
  }

  return (
    <button
      className="mt-3 mb-6 px-10 py-4 flex items-center w-full space-x-6 bg-white shadow-md hover:bg-gray-100 hover:bg-opacity-75 text-md text-red-danger cursor-pointer"
      type="button"
      onClick={openModal}
    >
      <span className="w-6 h-6">
        <LogoutSolid />
      </span>
      <span>{message}</span>
    </button>
  );
};

export default DeleteRoom;