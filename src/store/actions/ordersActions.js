import fetcher from "../../config/axios";
import * as types from "../types";
import { setIsLoading, setIsPostLoading } from "./commonActions";

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

export const getOrder = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await fetcher.get(`/customer-order/${id}`);

    if (res.data.data) {
      dispatch({
        type: types.ORDER_DETAILS,
        payload: res.data.data,
      });
    }

    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};

export const editOrder =
  (orderId, selectedItems, type, cb, note, id, paymentType, days, from, to) =>
  async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const updatedSelectedItems = selectedItems.map((item) => ({
        provider_product_id: item.id,
        qty: item.qty,
      }));

      if ((from || to) && !days.length) {
        days = [
          "الاحد",
          "الاثنين",
          "الثلاثاء",
          "الجمعة",
          "الخميس",
          "الاربعاء",
          "السبت",
        ];
      }

      const data = {
        order_products: updatedSelectedItems,
        app_source: 1,
        type: type,
        note: note ? note : "",
        payment_type: paymentType,
        days: days,
        from: from,
        to: to,
      };

      if (id) data.customer_id = id;

      const res = await fetcher.put(
        `/customer-order/${orderId}`,
        JSON.stringify(data)
      );

      if (res.status === 200) cb();
      dispatch(setIsPostLoading(false));
    } catch (error) {
      dispatch(setIsPostLoading(false));
      console.log(error);
    }
  };
