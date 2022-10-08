import * as types from "../types";

const initialState = {
  items: [],
};

const posReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_PROVIDER_ITEMS:
      return {
        ...state,
        items: payload,
      };

    default:
      return state;
  }
};

export default posReducer;
