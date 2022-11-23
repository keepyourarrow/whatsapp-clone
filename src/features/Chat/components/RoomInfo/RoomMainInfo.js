import React from "react";

import EditField from "components/ui/Form/EditField";
import SidebarPhoto from "components/Sidebar/SidebarPhoto";

import { editRoomField } from "redux/actions/roomsActions";
import { formatTime } from "../../utils";

export const RoomMainInfo = ({
  activeRoom,
  currentUser,
  openErrorModal,
  files,
  setFiles,
}) => {
  const content = activeRoom.name;

  return (
    <div className="bg-white ">
      <SidebarPhoto
        type="edit-room"
        photo={activeRoom.photo}
        files={files}
        setFiles={setFiles}
      />
      <div className="pl-6 pr-10 pb-4">
        <div className="text-green-title text-sm mb-2">Name</div>
        {/* check if user is admin */}
        {activeRoom.createdBy === currentUser ? (
          <EditField
            action={editRoomField}
            content={content}
            openModal={openErrorModal}
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
          content
        )}
        <div className="mt-1 text-sm text-gray-800 text-opacity-50">
          {formatTime(activeRoom.createdAt)}
        </div>
      </div>
    </div>
  );
};
