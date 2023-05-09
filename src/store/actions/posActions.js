import fetcher from "../../config/axios";
import * as types from "../types";
import { getClients, setIsLoading, setIsPostLoading } from "./commonActions";

export const getProviderItems = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await fetcher.get("/product");

    if (res.data.data) {
      dispatch({
        type: types.SET_PROVIDER_ITEMS,
        payload: res.data.data,
      });
    }
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};

export const createOrder =
  (
    selectedItems,
    type,
    cb,
    note,
    id,
    paymentType,
    days,
    from,
    to,
    isScheduled
  ) =>
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
        scheduled: isScheduled,
      };

      if (id) data.customer_id = id;

      const res = await fetcher.post("/customer-order", JSON.stringify(data));

      if (res.data.success) cb();
      dispatch(setIsPostLoading(false));
    } catch (error) {
      dispatch(setIsPostLoading(false));
      console.log(error);
    }
  };

export const createUser = (values, cityId, areaId, cb) => async (dispatch) => {
  dispatch(setIsPostLoading(true));

  try {
    const data = JSON.stringify({
      name: values.name,
      user_name: values.name,
      mobile_number: values.mobile,
      address_description: values.location,
      city_id: cityId,
      area_id: areaId,
    });
    const res = await fetcher.post("customer", data);

    if (res.data.data) {
      cb(res.data.data.name, res.data.data.id);
    }

    dispatch(setIsPostLoading(false));
  } catch (error) {
    dispatch(setIsPostLoading(false));
  }
};

export const updateUser =
  (values, id, cityId, areaId, cb, fcb) => async (dispatch) => {
    dispatch(setIsPostLoading(true));

    try {
      const data = JSON.stringify({
        name: values.name,
        user_name: values.name,
        mobile_number: values.mobile,
        address_description: values.location,
        city_id: cityId,
        area_id: areaId,
      });

      const res = await fetcher.put(`customer/${id}`, data);

      if (res.data.data) {
        dispatch(getClients());
        cb();
      }

      dispatch(setIsPostLoading(false));
    } catch (error) {
      if (error.response.data.errors.mobile_number)
        fcb((pre) => ({ ...pre, mobile: "رقم الجوال مستخدم لعميل اخر" }));
      dispatch(setIsPostLoading(false));
    }
  };
