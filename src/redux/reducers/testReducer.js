import { TEST_SUCCESS, TEST_ERROR } from "../actions/testAction";

const initState = {
  testError: null,
};

export const testReducer = (state = initState, action) => {
  const { type } = action;

  switch (type) {
    case TEST_SUCCESS:
      return { ...state, testError: null };

    case TEST_ERROR:
      return { ...state, testError: true };

    default:
      return state;
  }
};
