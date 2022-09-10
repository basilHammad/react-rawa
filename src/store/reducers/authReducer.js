import * as types from "../types";

const initialState = {
  isLoggedin: false,
  isAdmin: false,
  isLoading: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_IS_LOGGEDIN:
      return {
        ...state,
        isLoggedin: payload,
      };
    case types.SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: payload,
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

export default authReducer;
