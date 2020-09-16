import React from "react";
import moment from "moment";
import { EditField } from "../../reusable/EditField";

export const Description = ({
  activeRoom,
  currentUser,
  setOpenModal,
  dispatch,
}) => {
  let content = !activeRoom.description
    ? `The "${activeRoom.name}" room was created on ${moment(
        activeRoom.createdAt
      ).format("MMMM Do YYYY, h:mm:ss A")} by "${activeRoom.createdBy}"`
    : activeRoom.description;
  return (
    <div className="mt-3 pl-6 pr-10 pt-2 pb-4 bg-white ">
      <div className="text-green-title text-sm mb-2">Description</div>
      {/* check if user is admin */}
      {activeRoom.createdBy === currentUser ? (
        <EditField
          content={content}
          fieldType="textarea"
          setOpenModal={setOpenModal}
          dispatch={dispatch}
          collection="rooms"
          EmojiStylesLG={{
            position: "fixed",
            right: "70px",
            // top: "145px",
            height: "320px",
            width: "345px",
            zIndex: "30",
            transformOrigin: "bottom right",
          }}
          EmojiStylesXL={{
            position: "fixed",
            left: "70%",
            // top: "130px",
            width: "347px",
            height: "345px",
            zIndex: "56",
            transformOrigin: "center",
          }}
        />
      ) : (
        content
      )}
    </div>
  );
};
