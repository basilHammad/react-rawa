import fetcher from "../../config/axios";

import * as types from "../types";
import { setIsLoading, setIsPostLoading } from "./commonActions";

export const getExpensesCategory = () => async (dispatch) => {
  const res = await fetcher.get("/expense-parant");

  if (res.data.data) {
    dispatch({
      type: types.GET_EXPENSES_CATEGORY,
      payload: res.data.data,
    });
  }
};

export const getExpenses = (page, filters, sort) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const res = await fetcher.get(
      `/expense?page=${page}${filters ? "&filter[created]=" + filters : ""}${
        sort ? "&sort=" + sort : ""
      }`
    );

    dispatch({
      type: types.GET_EXPENSE,
      payload: res.data.data,
    });

    dispatch({
      type: types.GET_TOTAL_PAGES,
      payload: res.data.meta.last_page,
    });
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  }
};

export const getExpenseById = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const res = await fetcher.get(`/expense/${id}`);

    if (res.data.data) {
      dispatch({
        type: types.GET_EXPENSE_BY_ID,
        payload: res.data.data,
      });
    }

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  }
};

export const addExpense =
  (values, clientId, date, name, cb) => async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const beneficiaryName =
        values.beneficiaryType === "4" ? values.beneficiary : name;

      const data = JSON.stringify({
        exp_cat_id: values.expenseType,
        description: values.note,
        transaction_date: date,
        total_price: values.amount,
        bond_no: values.bondNo,
        beneficiary_id: clientId ? clientId : null,
        beneficiary_name: beneficiaryName,
        beneficiary_type: values.beneficiaryType,
        beneficiary_mobile: values.beneficiaryNum,
      });

      const res = await fetcher.post("/expense", data);

      if (res.status === 200) cb();
      dispatch(setIsPostLoading(false));
    } catch (error) {
      dispatch(setIsPostLoading(false));
    }
  };

export const editExpense =
  (id, values, date, clientId, name, cb) => async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const beneficiaryName =
        values.beneficiaryType === "4" ? values.beneficiary : name;

      const data = JSON.stringify({
        exp_cat_id: values.expenseType,
        description: values.note,
        transaction_date: date,
        total_price: values.amount,
        bond_no: values.bondNo,
        beneficiary_id: clientId ? clientId : null,
        beneficiary_name: beneficiaryName,
        beneficiary_type: +values.beneficiaryType,
        beneficiary_mobile: values.beneficiaryNum,
      });

      const res = await fetcher.put(`/expense/${id}`, data);

      if (res.status === 200) cb();

      dispatch(setIsPostLoading(false));
    } catch (error) {
      dispatch(setIsPostLoading(false));
    }
  };

export const deleteExpense = (id, cb) => async (dispatch) => {
  dispatch(setIsLoading(true));

  const res = await fetcher.delete(`/expense/${id}`);

  if (res.status === 200) {
    await dispatch(getExpenses());
  }
  dispatch(setIsLoading(false));
};

export const getSuppliers = (perPage) => async (dispatch) => {
  try {
    const res = await fetcher.get(
      `/supplier${perPage ? "?perPage=" + perPage : ""}`
    );

    if (res.data.data) {
      dispatch({
        type: types.GET_SUPPLIERS,
        payload: res.data.data,
      });
    }
  } catch (error) {}
};

export const getEmployees = (perPage) => async (dispatch) => {
  try {
    const res = await fetcher.get(
      `/employee${perPage ? "?perPage=" + perPage : ""}`
    );

    if (res.data.data) {
      dispatch({
        type: types.GET_EMPLOYEES,
        payload: res.data.data,
      });
    }
  } catch (error) {}
};

export const getClients =
  (page = 1, byName, byNumber, perPage) =>
  async (dispatch) => {
    try {
      const res = await fetcher.get(
        `/customer?page=${page}${byName ? "&filter[name]=" + byName : ""}${
          byNumber ? "&filter[phone]=" + byNumber : ""
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
    } catch (error) {}
  };
