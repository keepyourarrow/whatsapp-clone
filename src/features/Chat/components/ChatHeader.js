import React from "react";
import ReactTooltip from "react-tooltip";
import { InformationCircleSolid } from "@graywolfai/react-heroicons";

import { dateToFromNowDaily } from "utils/time";

const ChatHeader = ({ setOpenRoomInfo, activeRoom }) => {
  return (
    <div className=" flex items-center justify-between px-6 pt-2 pb-1 space-x-4 bg-gray-400 bg-opacity-25 ">
      <div>
        <span>{activeRoom.name}</span>
        <p className="leading-5">
          <span className="text-sm text-green-header">Created: </span>
          <span className="text-sm text-gray-800 text-opacity-50">
            {dateToFromNowDaily(activeRoom.createdAt)}
          </span>
        </p>
      </div>
      <div className="flex items-center space-x-6">
        <button
          data-tip=""
          data-for="room-info"
          type="button"
          className="w-full  hover:bg-gray-200 hover:bg-opacity-75 focus:outline-none"
          onClick={() => setOpenRoomInfo(true)}
        >
          <span className=" text-gray-700 text-opacity-75 ">
            {/* Room info */}
            <InformationCircleSolid className="w-6 h-6" />
          </span>
        </button>
      </div>
      <ReactTooltip
        id="room-info"
        place="bottom"
        effect="solid"
        delayShow={350}
        globalEventOff="click"
      >
        Room Info
      </ReactTooltip>
    </div>
  );
};

export default ChatHeader;