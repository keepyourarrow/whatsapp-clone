import { TOGGLE_MODAL } from "../actions/allActions";

const initState = {
  open: false,
	message: "",
	modalComponent: null,
	payload: null,
	firstBtn: null,
	secondBtn: null,
	modalExitBtn: true,
	secondBtnAction: () => {}
};

const modalReducer = (state = initState, action) => {
  let { type, payload } = action;
	if (!payload) {
		payload = {};
	}

  switch (type) {
    case TOGGLE_MODAL:
			state = { open: !state.open, ...payload};
      return state;
    default:
      return state;
  }
};

export default modalReducer;