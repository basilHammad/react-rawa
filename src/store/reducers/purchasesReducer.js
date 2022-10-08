import * as types from "../types";

const initialState = {
  purchases: [],
  purchase: {},
  totalPages: "",
};

const purchasesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PURCHASES:
      return {
        ...state,
        purchases: payload,
      };

    case types.GET_PURCHASES_BY_ID:
      return {
        ...state,
        purchase: payload,
      };

    case types.GET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload,
      };

    default:
      return state;
  }
};

export default purchasesReducer;
