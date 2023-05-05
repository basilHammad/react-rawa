import * as types from "../types";

const initialState = {
  items: [],
  totalPages: null,
};

const posReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_PROVIDER_ITEMS:
      return {
        ...state,
        items: payload,
      };
    case "products_total_pages":
      return {
        ...state,
        totalPages: payload,
      };

    default:
      return state;
  }
};

export default posReducer;
