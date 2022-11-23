// import { TEST_SUCCESS, TEST_ERROR } from "../actions/testAction";

import {
  SET_FILTERED_ROOMS,
  SET_ACTIVE,
  DESELECT_ACTIVE,
  FILTER_ROOMS,
} from "../actions/allActions";

const initState = {
  defaultData: [],
  filteredRooms: [],
};

//  Delete and replace with firebase later
const roomsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FILTERED_ROOMS:
      let set_active = payload.map((room) => {
        return { ...room, active: false };
      });
      return { ...state, filteredRooms: set_active, defaultData: set_active };

    case SET_ACTIVE:
      let newRooms = state.filteredRooms.map((r) => {
        if (r.id === payload.id) {
          let active = (r.active = true);
          return { ...r, active };
        }
        return { ...r, active: false };
      });
      return { ...state, filteredRooms: newRooms };

    case DESELECT_ACTIVE:
      let deselect_active = state.filteredRooms.map((room) => {
        return { ...room, active: false };
      });
      return { ...state, filteredRooms: deselect_active };

    case FILTER_ROOMS:
      const tempRooms = state.defaultData.filter((room) => {
        return room.name.toLowerCase().includes(payload.toLowerCase());
      });
      return { ...state, filteredRooms: tempRooms };

    default:
      return state;
  }
};

export default roomsReducer;