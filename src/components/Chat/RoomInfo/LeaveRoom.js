import { LogoutSolid } from "@graywolfai/react-heroicons";
import React from "react";

export const LeaveRoom = ({ message, setOpenModal }) => {
  return (
    <button
      className="mt-3 mb-6 px-10 py-4 flex items-center w-full space-x-6 bg-white shadow-md hover:bg-gray-100 hover:bg-opacity-75 text-md text-red-danger cursor-pointer"
      type="button"
      onClick={() => {
        setOpenModal(true);
      }}
    >
      <span className="w-6 h-6">
        <LogoutSolid />
      </span>
      <span>{message}</span>
    </button>
  );
};
