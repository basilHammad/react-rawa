import fetcher from "../../config/axios";
import * as types from "../types";
import { setIsLoading } from "./commonActions";

export const getOrders =
  (page = 1, isTrip) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const res = await fetcher.get(
        `/customer-order?page=${page}${isTrip ? "&trip_id=0" : ""}`
      );

      if (res.data.data) {
        dispatch({
          type: types.GET_ORDERS,
          payload: res.data.data,
        });
        dispatch({
          type: types.GET_TOTAL_PAGES,
          payload: res.data.meta.last_page,
        });
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };
