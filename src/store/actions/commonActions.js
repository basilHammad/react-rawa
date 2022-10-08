import fetcher from "../../config/axios";
import * as types from "../types";

export const setIsLoading = (val) => ({
  type: types.SET_IS_LOADING,
  payload: val,
});

export const setIsPostLoading = (val) => ({
  type: types.SET_IS_POST_LOADING,
  payload: val,
});

export const getClients =
  (page = 1, byName, byNumber, perPage) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const res = await fetcher.get(
        `/customer?page=${page}${byName ? "&filter[name]=" + byName : ""}${
          byNumber ? "&filter[mobile_number]=" + byNumber : ""
        }${perPage ? "&perPage=" + perPage : ""}`
      );
      if (res.data.data) {
        dispatch({
          type: types.GET_CLIENTS,
          payload: res.data.data,
        });

        dispatch({
          type: types.GET_TOTAL_PAGES,
          payload: {
            total: res.data.meta.last_page,
            name: "clientsTotalPages",
          },
        });
      }

      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

export const addClient = (values, cb) => async (dispatch) => {
  dispatch(setIsPostLoading(true));
  try {
    const data = JSON.stringify({
      name: values.name,
      user_name: values.name,
      mobile_number: values.mobile,
      address_description: values.address,
      description: values.note,
      // type: "1",
    });
    const res = await fetcher.post("/customer", data);

    if (res.status === 200) cb();
    dispatch(setIsPostLoading(false));
  } catch (error) {
    dispatch(setIsPostLoading(false));
  }
};

export const editClient = (id, values, cb) => async (dispatch) => {
  dispatch(setIsPostLoading(true));

  try {
    const data = JSON.stringify({
      name: values.name,
      user_name: values.name,
      mobile_number: values.mobile,
      address_description: values.address,
      // description: values.note,
      // type: "1",
    });

    const res = await fetcher.put(`/customer/${id}`, data);

    if (res.status === 200) cb();

    dispatch(setIsPostLoading(false));
  } catch (error) {
    dispatch(setIsPostLoading(false));
  }
};

export const deleteClient = (id, cb) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const res = await fetcher.delete(`/customer/${id}`);

    if (res.status === 200) await cb();
    dispatch(setIsLoading(false));
  } catch (error) {}
};

export const getSuppliers =
  (page = 1, byName, byNumber, perPage) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const res = await fetcher.get(
        `/supplier?page=${page}${byName ? "&filter[name]=" + byName : ""}${
          byNumber ? "&filter[phone]=" + byNumber : ""
        }${perPage ? "&perPage=" + perPage : ""}`
      );

      if (res.data.data) {
        dispatch({
          type: types.GET_SUPPLIERS,
          payload: res.data.data,
        });

        dispatch({
          type: types.GET_TOTAL_PAGES,
          payload: {
            total: res.data.meta.last_page,
            name: "suppliersTotalPages",
          },
        });
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

export const addSupplier = (values, cb) => async (dispatch) => {
  dispatch(setIsPostLoading(true));
  try {
    const data = JSON.stringify({
      name: values.name,
      phone: values.mobile,
      address: values.address,
      description: values.note,
      type: "1",
    });
    const res = await fetcher.post("/supplier", data);

    if (res.status === 201) cb();
    dispatch(setIsPostLoading(false));
  } catch (error) {
    dispatch(setIsPostLoading(false));
  }
};

export const EditSupplier = (id, values, cb) => async (dispatch) => {
  dispatch(setIsPostLoading(true));

  try {
    const data = JSON.stringify({
      name: values.name,
      phone: values.mobile,
      address: values.address,
      description: values.note,
      type: "1",
    });

    const res = await fetcher.put(`/supplier/${id}`, data);

    if (res.status === 200) cb();

    dispatch(setIsPostLoading(false));
  } catch (error) {
    dispatch(setIsPostLoading(false));
  }
};

export const deleteSuppliers = (id, cb) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const data = JSON.stringify({
      is_active: "0",
    });
    const res = await fetcher.put(`/supplier/${id}`, data);

    if (res.status === 200) await cb();
    dispatch(setIsLoading(false));
  } catch (error) {}
};

export const getEmployees =
  (page = 1, byName, byNumber, perPage) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const res = await fetcher.get(
        `/employee?page=${page}${byName ? "&filter[full_name]=" + byName : ""}${
          byNumber ? "&filter[phone_number]=" + byNumber : ""
        }${perPage ? "&perPage=" + perPage : ""}`
      );

      if (res.data.data) {
        dispatch({
          type: types.GET_EMPLOYEES,
          payload: res.data.data,
        });

        dispatch({
          type: types.GET_TOTAL_PAGES,
          payload: {
            total: res.data.meta.last_page,
            name: "employeesTotalPages",
          },
        });
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

export const addEmployee = (values, cb) => async (dispatch) => {
  dispatch(setIsPostLoading(true));
  try {
    const data = JSON.stringify({
      // name: values.name,
      full_name: values.name,
      mobile_number: values.mobile,
      // phone: values.mobile,
      phone_number: values.mobile,
      type: values.employeeType,
    });

    const res = await fetcher.post("/employee", data);

    if (res.status === 201) cb();
    dispatch(setIsPostLoading(false));
  } catch (error) {
    dispatch(setIsPostLoading(false));
  }
};

export const EditEmployee = (id, values, cb) => async (dispatch) => {
  dispatch(setIsPostLoading(true));

  try {
    const data = JSON.stringify({
      // name: values.name,
      full_name: values.name,
      mobile_number: values.mobile,
      // phone: values.mobile,
      phone_number: values.mobile,
      type: values.employeeType,
    });

    const res = await fetcher.put(`/employee/${id}`, data);

    if (res.status === 200) cb();

    dispatch(setIsPostLoading(false));
  } catch (error) {
    dispatch(setIsPostLoading(false));
  }
};

export const deleteEmployee = (id, cb) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const data = JSON.stringify({
      status: "0",
    });
    const res = await fetcher.put(`/employee/${id}`, data);

    if (res.status === 200) await cb();
    dispatch(setIsLoading(false));
  } catch (error) {}
};

export const getCodes = () => async (dispatch) => {
  try {
    const res = await fetcher.get("/codes");
    if (res.data) {
      dispatch({
        type: types.GET_CODES,
        payload: res.data,
      });
    }
  } catch (error) {}
};
