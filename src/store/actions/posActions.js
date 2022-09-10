import fetcher from "../../config/axios";
import * as types from "../types";

export const getProviderItems = () => async (dispatch) => {
  try {
    const res = await fetcher.get("/product");

    if (res.data.data) {
      dispatch({
        type: types.SET_PROVIDER_ITEMS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const submitDirectOrder = (selectedItems) => async (dispatch) => {
  try {
    const updatedSelectedItems = selectedItems.map((item) => ({
      provider_product_id: item.id,
      qty: item.qty,
    }));

    const data = {
      order_products: updatedSelectedItems,
      app_source: 1,
      type: 1,
    };

    const res = await fetcher.post("/customer-order", JSON.stringify(data));
    console.log(res);

    // if (res.data.data) {
    //   dispatch({
    //     type: types.SET_PROVIDER_ITEMS,
    //     payload: res.data.data,
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};
