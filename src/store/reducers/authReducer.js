import * as types from "../types";

const userToken = localStorage.getItem("userToken");
const user = localStorage.getItem("user");

const initialState = {
  isLoggedin: userToken ? true : false,
  isAdmin: false,
  isLoading: false,
  user: user ? JSON.parse(user) : {},
  permissions: null,
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

    case types.SET_USER:
      return {
        ...state,
        user: payload,
      };

    case types.GET_USER_PERMISSIONS:
      return {
        ...state,
        permissions: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
