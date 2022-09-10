import * as types from "../types";

import fetcher from "../../config/axios";
import { setIsLoading } from "./commonActions";

export const setIsloggedin = (val) => ({
  type: types.SET_IS_LOGGEDIN,
  payload: val,
});

export const setIsAdmin = (val) => ({
  type: types.SET_IS_ADMIN,
  payload: val,
});

export const login =
  (username, password, cb, setErrors) => async (dispatch) => {
    dispatch(setIsLoading(true));

    const data = JSON.stringify({
      username: username,
      password: password,
    });

    try {
      const res = await fetcher.post("/login", data);

      if (res.data.data) {
        if (res.data.data.role !== "provider") {
          setErrors((prev) => ({
            ...prev,
            generalError: "انت غير مصرح لتسجيل الدخول",
          }));
          dispatch(setIsloggedin(false));

          return;
        }

        localStorage.setItem("userToken", res.data.data.access_token);
        dispatch(setIsloggedin(true));
        cb();
      }

      dispatch(setIsLoading(false));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrors((prev) => ({
            ...prev,
            generalError: error.response.data.message,
          }));
        }
      }
      dispatch(setIsLoading(false));
      console.log("error", error);
    }
  };
