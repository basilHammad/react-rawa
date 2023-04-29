import * as types from "../types";

import fetcher from "../../config/axios";
import { setIsLoading, setIsPostLoading } from "./commonActions";

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
    dispatch(setIsPostLoading(true));

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
        localStorage.setItem("user", JSON.stringify(res.data.data));

        dispatch({
          type: types.SET_USER,
          payload: res.data.data,
        });

        dispatch({
          type: types.SET_IS_LOGGEDIN,
          payload: true,
        });

        cb();
      }

      dispatch(setIsPostLoading(false));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrors((prev) => ({
            ...prev,
            generalError: "اسم المستخدم او كلمة السر غير صحيحين",
          }));
        }
      }
      dispatch(setIsPostLoading(false));
    }
  };

export const logout = (cb) => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("userToken");
  await dispatch(setIsloggedin(false));
  await cb();
  window.location.reload();
};

export const editPassword =
  (oldPass, newPass, confirmPass, setErrors, cb) => async (dispatch) => {
    try {
      dispatch(setIsPostLoading(true));
      const data = JSON.stringify({
        current_password: oldPass,
        new_password: newPass,
        new_confirm_password: confirmPass,
      });
      const res = await fetcher.post("/change-password", data);

      if (res.status === 200) cb();

      dispatch(setIsPostLoading(false));
    } catch (error) {
      if (error.response.data.errors.current_password[0]) {
        setErrors((pre) => ({
          ...pre,
          oldPassword: error.response.data.errors.current_password[0],
        }));
      }
      dispatch(setIsPostLoading(false));
    }
  };

export const getUserPermission = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await fetcher.get("web-permission");

    if (res.status === 200) {
      dispatch({
        type: types.GET_USER_PERMISSIONS,
        payload: res.data.data,
      });
    }
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};
