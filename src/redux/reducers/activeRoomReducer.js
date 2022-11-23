import {
  SELECT_ACTIVE_ROOM,
  DESELECT_ACTIVE_ROOM,
} from "../actions/allActions";

const initState = {
  activeRoom: {},
};

const activeRoomReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SELECT_ACTIVE_ROOM:
      return { activeRoom: payload };

    case DESELECT_ACTIVE_ROOM:
      return { activeRoom: {} };
    default:
      return state;
  }
};

export default activeRoomReducer;