import React from "react";

import Room from "./Room";

import LoadingGif from "assets/icons/LoadingGif";
import { sortRoomsDesc } from "features/Sidebar/utils";

const ChatRooms = ({
  filteredRooms: rooms,
  setOpenRoomInfo,
}) => {
  if (!rooms) {
    return (
      <div className="flex justify-center">
        <LoadingGif className="w-16 h-16" />
      </div>
    );
  }
  if (rooms.length === 0) {
    return (
      <div className="flex justify-center">
        <span className="text-gray-800">There are currently no rooms</span>
      </div>
    );
  }

  console.log(rooms);
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="h-full">
        <div className="h-full">
          {sortRoomsDesc(rooms).map((room, i) => {
            return (
              <Room
                key={i}
                room={room}
                setOpenRoomInfo={setOpenRoomInfo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;