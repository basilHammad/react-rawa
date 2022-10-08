import fetcher from "../../config/axios";

import * as types from "../types";
import { setIsLoading, setIsPostLoading } from "./commonActions";

export const getRevenueCategory = () => async (dispatch) => {
  const res = await fetcher.get("/revenue-parant");

  if (res.data.data) {
    dispatch({
      type: types.GET_REVENUE_CATEGORY,
      payload: res.data.data,
    });
  }
};

export const getRevenues = (page, filters, sort) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await fetcher.get(
      `/revenue?page=${page}${filters ? "&filter[created]=" + filters : ""}${
        sort ? "&sort=" + sort : ""
      }`
    );

    if (res.data.data) {
      dispatch({
        type: types.GET_REVENUES,
        payload: res.data.data,
      });

      dispatch({
        type: types.GET_TOTAL_PAGES,
        payload: res.data.meta.last_page,
      });
    }
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  }
};

export const getRevenueById = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const res = await fetcher.get(`/revenue/${id}`);

    if (res.data.data) {
      dispatch({
        type: types.GET_REVENUE_BY_ID,
        payload: res.data.data,
      });
    }
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  }
};

export const addRevenue =
  (revenueType, note, date, amount, bondNo, clientId, cb) =>
  async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const data = JSON.stringify({
        rev_cat_id: revenueType,
        description: note,
        transaction_date: date,
        total_price: amount,
        bond_no: bondNo,
        customer_id: clientId,
      });

      const res = await fetcher.post("/revenue", data);
      dispatch(setIsPostLoading(false));

      if (res.data.success) cb();
    } catch (error) {
      dispatch(setIsPostLoading(false));
      console.log(error);
    }
  };

export const editRevenue =
  (id, revenueType, note, date, amount, bondNo, clientId, cb) =>
  async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const data = JSON.stringify({
        rev_cat_id: revenueType,
        description: note,
        transaction_date: date,
        total_price: amount,
        bond_no: bondNo,
        customer_id: clientId,
      });

      const res = await fetcher.put(`/revenue/${id}`, data);

      if (res.status === 200) cb();
      dispatch(setIsPostLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setIsPostLoading(false));
    }

    dispatch(setIsPostLoading(false));
  };

export const deleteRevenue = (id, cb) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const res = await fetcher.delete(`/revenue/${id}`);
  if (res.status === 200) {
    await dispatch(getRevenues());
  }
  dispatch(setIsLoading(false));
};
