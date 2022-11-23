import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { ChatAltSolid } from "@graywolfai/react-heroicons";

import Dropdown from './Dropdown';

import DefaultProfileImage from "../../../assets/DefaultProfileImage";

const UsersLinks = ({ setSidebarView }) => {
  const userPhoto = useSelector((state) => state.firebase.profile.photo);

  const [openDropdown, setOpenDropdown] = useState(false);

  const handleSidebarView = (e) => {
    setSidebarView(e.currentTarget.name);
  };

  const avatar = userPhoto ? (
    <img
      className="rounded-full w-10 h-10 object-cover object-center"
      src={userPhoto}
      alt="avatar"
    />
  ) : (
    <DefaultProfileImage />
  );

  return (
    <div className="flex items-center justify-between space-x-4  bg-gray-400 bg-opacity-25">
      <button
        name="edit-profile"
        type="button"
        className="px-4 py-2 focus:outline-none"
        onClick={handleSidebarView}
      >
        {avatar}
      </button>
      <div className="px-2 py-2 flex items-center space-x-2">
        <button
          name="createRoom"
          type="button"
          className="icon-buttons relative text-opacity-50 focus:outline-none"
          onClick={handleSidebarView}
        >
          <div className="w-6 h-6 " data-tip="tooltip" data-for="chat">
            <ChatAltSolid className="" />
            <ReactTooltip
              id="chat"
              place="bottom"
              effect="solid"
              delayShow={750}
              globalEventOff="click"
            >
              Create a New Room
            </ReactTooltip>
          </div>
        </button>

        <Dropdown
          handleSidebarView={handleSidebarView}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
      </div>
    </div>
  );
};

export default UsersLinks;