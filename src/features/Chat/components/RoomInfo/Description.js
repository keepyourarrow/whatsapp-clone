import React from "react";

import EditField from "components/ui/Form/EditField";

import { editRoomField } from "redux/actions/roomsActions";
import { getDescription } from "../../utils";

const Description = ({ activeRoom, currentUser, openErrorModal }) => {
  const description = getDescription({...activeRoom});

  return (
    <div className="mt-3 pl-6 pr-10 pt-2 pb-4 bg-white ">
      <div className="text-green-title text-sm mb-2">Description</div>
      {/* check if user is admin */}
      {activeRoom.createdBy === currentUser ? (
        <EditField
          content={description}
          fieldType="textarea"
          openModal={openErrorModal}
          action={editRoomField}
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
        description
      )}
    </div>
  );
};

export default Description;