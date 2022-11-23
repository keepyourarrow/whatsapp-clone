import React from "react";
import { useDispatch } from "react-redux";
import { SearchOutline } from "@graywolfai/react-heroicons";

const Searchbar = ({ defaultRooms }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch({ type: "FILTER_ROOMS", payload: e.target.value });

    if (e.target.value === "") {
      dispatch({ type: "SET_FILTERED_ROOMS", payload: defaultRooms });
    }
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

export default Searchbar;