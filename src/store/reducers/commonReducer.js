import * as types from "../types";

const initialState = {
  isLoading: false,
  isPostLoading: false,
  clients: [],
  suppliers: [],
  employees: [],
  suppliersTotalPages: "",
  clientsTotalPages: "",
  employeesTotalPages: "",
  codes: {},
  cities: [],
};

const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case types.SET_IS_POST_LOADING:
      return {
        ...state,
        isPostLoading: payload,
      };

    case types.GET_CLIENTS:
      return {
        ...state,
        clients: payload,
      };

    case types.GET_SUPPLIERS:
      return {
        ...state,
        suppliers: payload,
      };
    case types.GET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
      };

    case types.GET_TOTAL_PAGES:
      return {
        ...state,
        [payload.name]: payload.total,
      };
    case types.GET_CODES:
      return {
        ...state,
        codes: payload,
      };
    case types.GET_CITIES:
      return {
        ...state,
        cities: payload,
      };

    default:
      return state;
  }
};

export default commonReducer;
