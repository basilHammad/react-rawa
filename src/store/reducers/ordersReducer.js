import * as types from "../types";

const initialState = {
  orders: [],
  totalPages: "",
};

const ordersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ORDERS:
      return {
        ...state,
        orders: payload,
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

export default ordersReducer;
