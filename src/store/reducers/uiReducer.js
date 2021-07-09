import { DRAWER_STATE } from "../types";

const initialState = {
  isDrawerOpen: true,
};

const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DRAWER_STATE:

      return {
        ...state,
        isDrawerOpen: payload,
      };

    default:
      return state;
  }
};

export default uiReducer;
