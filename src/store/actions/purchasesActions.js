import fetcher from "../../config/axios";

import * as types from "../types";
import { setIsLoading, setIsPostLoading } from "./commonActions";

export const getPurchases = (page, filters, sort) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const res = await fetcher.get(
      `/purchase?page=${page}${filters ? "&filter[created]=" + filters : ""}${
        sort ? "&sort=" + sort : ""
      }`
    );

    if (res.data.data) {
      dispatch({
        type: types.GET_PURCHASES,
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

export const getPurchaseById = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const res = await fetcher.get(`/purchase/${id}`);

    if (res.data.data) {
      dispatch({
        type: types.GET_PURCHASES_BY_ID,
        payload: res.data.data,
      });
    }

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  }
};

export const addPurchase =
  (values, date, details, supplierId, cb) => async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const data = {
        purchase: {
          invoice_date: date,
          invoice_number: values.billNum,
        },
        purchase_details: details,
      };

      if (supplierId) data.purchase.supplier_id = supplierId;

      const res = await fetcher.post("/purchase", JSON.stringify(data));
      if (res.status === 200) cb();
      dispatch(setIsPostLoading(false));
    } catch (error) {
      dispatch(setIsPostLoading(false));
    }
  };

export const editPurchase =
  (id, billNum, date, supplierId, cb) => async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const data = JSON.stringify({
        invoice_number: billNum,
        supplier_id: supplierId,
        invoice_date: date,
      });
      const res = await fetcher.put(`/purchase/${id}`, data);

      if (res.status === 200) cb();

      dispatch(setIsPostLoading(false));
    } catch (error) {}
  };

export const deletePurchase = (id, cb) => async (dispatch) => {
  try {
    const res = await fetcher.delete(`/purchase/${id}`);
    if (res.status === 200) {
      await dispatch(getPurchases());
    }
  } catch (error) {}
};

export const deleteSubPurchase = (id, cb) => async (dispatch) => {
  try {
    const res = await fetcher.delete(`purchases-detail/${id}`);

    if (res.status === 200) cb();
  } catch (error) {}
};

export const addSubPurchase = (parentId, values, cb) => async (dispatch) => {
  dispatch(setIsPostLoading(true));

  try {
    const data = JSON.stringify({
      purchas_id: parentId,
      description: values.explanation,
      unit_price: values.unitPrice,
      quantity: values.quantity,
      total_price: values.total,
      tax: values.vat,
      discount: values.discount,
    });
    const res = await fetcher.post(`purchases-detail`, data);

    if (res.status === 201) cb();
    dispatch(setIsPostLoading(false));
  } catch (error) {
    dispatch(setIsPostLoading(false));
  }
};

export const editSubPurchase =
  (parentId, id, values, cb) => async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const data = JSON.stringify({
        purchas_id: parentId,
        description: values.explanation,
        unit_price: values.unitPrice,
        quantity: values.quantity,
        total_price: values.total,
        tax: values.vat,
        discount: values.discount,
      });
      const res = await fetcher.put(`purchases-detail/${id}`, data);

      if (res.status === 200) cb();
      dispatch(setIsPostLoading(false));
    } catch (error) {
      dispatch(setIsPostLoading(false));
    }
  };
