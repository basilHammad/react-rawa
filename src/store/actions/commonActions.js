import * as types from "../types";

export const setIsLoading = (val) => ({
  type: types.SET_IS_LOADING,
  payload: val,
});
