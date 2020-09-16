import React, { useState } from "react";
import { SearchOutline } from "@graywolfai/react-heroicons";
import { handleMotionViewTransformStyle } from "../../reusable/functions/functions";
import { useDispatch } from "react-redux";

export const Searchbar = ({ defaultRooms, rooms, dispatch }) => {
  const [defaultData] = useState(rooms);

  const handleChange = (e) => {
    const excludeFromSearch = ["avatar"]; // add things you don't want to appear in search
    // handleMotionViewTransformStyle("removeTransform");

    // TO TARGET ONLY TITLE/NAME!!!!
    dispatch({ type: "FILTER_ROOMS", payload: e.target.value });

    if (e.target.value === "") {
      dispatch({ type: "SET_FILTERED_ROOMS", payload: defaultRooms });
    }

    // const tempRoom = rooms.filter((room) => {
    //   return room.name.toLowerCase().includes(e.target.value.toLowerCase());
    // });

    // TO SEARCH THROUGH MULTIPLE OBJECT KEYS
    // const tempRoom = rooms.filter((room) => {
    //   return Object.keys(room).some((key) =>
    //     excludeFromSearch.includes(key)
    //       ? false
    //       : room[key]
    //           .toString()
    //           .toLowerCase()
    //           .includes(e.target.value.toLowerCase())
    //   );
    // });

    // setRooms(tempRoom);
    // if (e.target.value === "") {
    //   setRooms(defaultData);
    // }
  };

  return (
    <div className=" pt-2 px-2 h-16 bg-gray-200 bg-opacity-50 border-t  border-gray-600 border-opacity-25">
      <div className="relative text-gray-600 opacity-75 flex items-center">
        <SearchOutline className="absolute ml-3 h-6 w-6" />
        <input
          className="form-input w-full px-12 placeholder-gray-600 font-medium rounded-full focus:text-gray-900"
          type="text"
          placeholder="Search or start new chat"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
