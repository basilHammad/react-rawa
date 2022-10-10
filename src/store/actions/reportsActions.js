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

      console.log(res.data.data);

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
      }
      dispatch(setIsLoading(false));

      console.log(res);
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };
