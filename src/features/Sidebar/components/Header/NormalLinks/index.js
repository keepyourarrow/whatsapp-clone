import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import { InformationCircleSolid } from "@graywolfai/react-heroicons";

import Auth from "./Auth";
import About from "./About";

const NormalLinks = () => {
  const dispatch = useDispatch();

  const openAboutModal = () => {
    dispatch({type: "TOGGLE_MODAL", payload: {
      modalComponent: <About/>,
    }})
  }

  const openSignupModal = () => {
    dispatch({type: "TOGGLE_MODAL", payload: {
      modalComponent: <Auth/>
    }})
  }
  return (
    <>
      <div className="flex items-center justify-between bg-gray-400 bg-opacity-25 px-2 py-2">
        <button
          type="button"
          className="py-1 ml-28 text-blue-400 text-lg font-medium hover:text-indigo-500 border-indigo-500 border-b  focus:text-indigo-800
            focus:border-indigo-800 focus:outline-none"
          onClick={openSignupModal}
        >
          SignUp/SignIn
        </button>
        <div className="flex mr-2">
          <button
            data-tip=""
            data-for="project-info"
            className="text-gray-700 text-opacity-75 focus:outline-none"
            onClick={openAboutModal}
          >
            <span>
              <InformationCircleSolid className="w-6 h-6" />
            </span>
          </button>
        </div>
      </div>
      <ReactTooltip
        id="project-info"
        place="bottom"
        effect="solid"
        delayShow={350}
        globalEventOff="click"
      >
        Project Info
      </ReactTooltip>
    </>
  );
};

export default NormalLinks;
