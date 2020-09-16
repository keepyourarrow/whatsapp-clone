import React from "react";
import { SidebarPhoto } from "../../reusable/SidebarPhoto";
import moment from "moment";
import { EditField } from "../../reusable/EditField";
import { dateToFromNowDaily } from "../../reusable/functions/functions";

export const RoomMainInfo = ({
  activeRoom,
  setOpenModal,
  currentUser,
  dispatch,
  files,
  setFiles,
}) => {
  return (
    <div className="bg-white ">
      <SidebarPhoto
        type="edit-room"
        photo={activeRoom.photo}
        dispatch={dispatch}
        files={files}
        setFiles={setFiles}
      />
      <div className="pl-6 pr-10 pb-4">
        <div className="text-green-title text-sm mb-2">Name</div>
        {/* check if user is admin */}
        {activeRoom.createdBy === currentUser ? (
          <EditField
            collection="rooms"
            content={activeRoom.name}
            setOpenModal={setOpenModal}
            dispatch={dispatch}
            EmojiStylesLG={{
              position: "fixed",
              right: "70px",
              // top: "376px",
              height: "320px",
              width: "345px",
              zIndex: "30",
              transformOrigin: "right top",
            }}
            EmojiStylesXL={{
              position: "fixed",
              left: "70%",
              // top: "14px",
              width: "347px",
              height: "345px",
              zIndex: "56",
              transformOrigin: "center",
            }}
          />
        ) : (
          activeRoom.name
        )}
        <div className="mt-1 text-sm text-gray-800 text-opacity-50">
          {/* {moment(activeRoom.createdAt).calendar()} */}
          {moment(activeRoom.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
        </div>
      </div>
    </div>
  );
};
