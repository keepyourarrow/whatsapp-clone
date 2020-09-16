import React, { useState } from "react";

import { ChatAltSolid, DotsVerticalSolid } from "@graywolfai/react-heroicons";
import ReactTooltip from "react-tooltip";
import { DropdownButton } from "../../../../reusable/Dropdown";
import { signOut } from "../../../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { LoadingGifSVG } from "../../../../../assets/images/loadingGif";

function Dropdown({
  handleSidebarView,
  openDropdown,
  setOpenDropdown,
  dispatch,
}) {
  return (
    <DropdownButton
      openDropdown={openDropdown}
      setOpenDropdown={setOpenDropdown}
    >
      <div
        className="w-6 h-6 text-opacity-50"
        data-tip="tooltip"
        data-for="menu"
      >
        <DotsVerticalSolid className="" />
        <ReactTooltip
          id="menu"
          // offset={{ left: -10 }}
          place="bottom"
          effect="solid"
          delayShow={750}
          globalEventOff="click"
        >
          Menu
        </ReactTooltip>
      </div>
      <ul>
        <button
          type="button"
          name="edit-profile"
          className="w-full  py-2 hover:bg-gray-200 hover:bg-opacity-75 focus:outline-none"
          onClick={handleSidebarView}
        >
          <li className="pl-6 pr-16 text-left  text-gray-900 text-opacity-75 ">
            Profile
          </li>
        </button>
        <button
          name="createRoom"
          type="button"
          className="w-full py-2 hover:bg-gray-200 hover:bg-opacity-75 focus:outline-none"
          onClick={handleSidebarView}
        >
          <li className="pl-6 text-left text-gray-900 text-opacity-75 ">
            Create a room
          </li>
        </button>
        <button
          type="button"
          className="w-full  py-2 hover:bg-gray-200 hover:bg-opacity-75 focus:outline-none"
          onClick={() => dispatch(signOut())}
        >
          <li className="pl-6 pr-16 text-left text-gray-900 text-opacity-75 ">
            Log out
          </li>
        </button>
      </ul>
    </DropdownButton>
  );
}

export const UsersLinks = ({ setSidebarView }) => {
  const handleSidebarView = (e) => {
    setSidebarView(e.currentTarget.name);
  };
  const [openDropdown, setOpenDropdown] = useState(false);
  const userPhoto = useSelector((state) => state.firebase.profile.photo);
  const dispatch = useDispatch();
  const displayAvatarImage = userPhoto ? (
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
        {displayAvatarImage}
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
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};

function DefaultProfileImage() {
  return (
    <svg
      className="w-10 h-10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 212 212"
      width="212"
      height="212"
    >
      <path
        fill="#DFE5E7"
        d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"
      ></path>
      <path
        fill="#FFF"
        d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"
      ></path>
    </svg>
  );
}
