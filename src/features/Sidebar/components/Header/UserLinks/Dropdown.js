import React from 'react';
import { useDispatch } from 'react-redux';
import ReactTooltip from "react-tooltip";
import { DotsVerticalSolid } from "@graywolfai/react-heroicons";

import { DropdownButton } from "components/ui/Dropdown";

import { signOut } from "redux/actions/authActions";

const Dropdown = ({
  handleSidebarView,
  openDropdown,
  setOpenDropdown,
}) => {
	const dispatch = useDispatch();

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

export default Dropdown;