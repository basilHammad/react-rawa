import fetcher from "../../config/axios";
import * as types from "../types";
import { setIsLoading } from "./commonActions";

export const getAccountStatements =
  (type, clientId, from, to, cb) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const data = JSON.stringify({
        type: type,
        filter_id: clientId,
        from: from,
        to: to,
      });

      const res = await fetcher.post("/getStatement", data);

      if (res.data.data) {
        dispatch({
          type: types.GET_ACCOUNT_STATEMENT,
          payload: res.data.data.data,
        });
        dispatch({
          type: types.GET_OLD_BALANCE,
          payload: res.data.data.old_balance,
        });
        dispatch({
          type: types.GET_FINAL_BALANCE,
          payload: res.data.data.final_balance,
        });

        cb();
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

export const getRevenueReport =
  (revenueType, from, to, cb) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const data = JSON.stringify({
        revenue_cat: revenueType,
        from: from,
        to: to,
      });

      const res = await fetcher.post("/revenueReport", data);

      console.log(res);

      if (res.data.data) {
        dispatch({
          type: types.GET_REVENUE_REPORT,
          payload: res.data.data.data,
        });
        dispatch({
          type: types.GET_REVENUE_OLD_BALANCE,
          payload: res.data.data.old_balance,
        });
        dispatch({
          type: types.GET_REVENUE_FINAL_BALANCE,
          payload: res.data.data.final_balance,
        });

        cb();
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

export const getExpenseReport =
  (expenseType, from, to, cb) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const data = JSON.stringify({
        expense_cat: expenseType,
        from: from,
        to: to,
      });

      const res = await fetcher.post("/expenseReport", data);

      if (res.data.data) {
        dispatch({
          type: types.GET_EXPENSE_REPORT,
          payload: res.data.data.data,
        });
        dispatch({
          type: types.GET_REVENUE_OLD_BALANCE,
          payload: res.data.data.old_balance,
        });
        dispatch({
          type: types.GET_REVENUE_FINAL_BALANCE,
          payload: res.data.data.final_balance,
        });

        cb();
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };

export const getPurchaseReport = (from, to, cb) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const data = JSON.stringify({
      from: from,
      to: to,
    });

    const res = await fetcher.post("/purchaseReport", data);

    if (res.data.data) {
      dispatch({
        type: types.GET_PURCHASE_REPORT,
        payload: res.data.data.data,
      });
      dispatch({
        type: types.GET_PURCHASE_OLD_BALANCE,
        payload: res.data.data.old_balance,
      });
      dispatch({
        type: types.GET_PURCHASE_FINAL_BALANCE,
        payload: res.data.data.final_balance,
      });

      cb();
    }
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};
