import * as types from "../types";

const initialState = {
  isLoading: false,
  items: [],
};

const posReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_PROVIDER_ITEMS:
      return {
        ...state,
        items: payload,
      };
    case types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default posReducer;
