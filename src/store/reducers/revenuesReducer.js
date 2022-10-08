import * as types from "../types";

const initialState = {
  revenueCategory: [],
  revenues: [],
  revenue: {},
  totalPages: "",
};

const revenuesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_REVENUE_CATEGORY:
      return {
        ...state,
        revenueCategory: payload,
      };

    case types.GET_REVENUES:
      return {
        ...state,
        revenues: payload,
      };

    case types.GET_REVENUE_BY_ID:
      return {
        ...state,
        revenue: payload,
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

export default revenuesReducer;
