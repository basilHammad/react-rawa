import fetcher from "../../config/axios";
import { setIsLoading, setIsPostLoading } from "./commonActions";
import * as types from "../types";

export const getProducts = (all) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await fetcher.get(`/product${all ? "?all=1" : ""}`);

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

export const getMainProducts = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await fetcher.get("/main-product");

    if (res.data.data) {
      dispatch({
        type: types.GET_MAIN_PRODUCTS,
        payload: res.data.data,
      });
    }
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const res = await fetcher.get(`/product/${id}`);

  if (res.status === 200) {
    dispatch({ type: types.GET_PRODUCT_BY_ID, payload: res.data.data });
  }
  dispatch(setIsLoading(false));
};

export const addProduct =
  (productId, name, status, img, price, cb) => async (dispatch) => {
    const data = new FormData();
    data.append("product_id", productId);
    data.append("provider_product_name", name);
    data.append("price", price);
    data.append("is_active", status);
    img && data.append("img", img);

    // console.log(data);

    // return;
    dispatch(setIsPostLoading(true));
    const res = await fetcher.post("/product", data);

    if (res.status === 201) {
      dispatch(setIsPostLoading(false));

      cb();
    }
  };

export const editProduct =
  (id, productId, name, status, img, price, cb) => async (dispatch) => {
    dispatch(setIsPostLoading(true));

    const data = new FormData();
    data.append("product_id", productId);
    data.append("provider_product_name", name);
    data.append("price", price);
    data.append("is_active", status);
    data.append("_method", "PUT");
    img && data.append("img", img);

    const res = await fetcher.post(`/product/${id}`, data);

    if (res.status === 200) cb();

    dispatch(setIsPostLoading(false));
  };

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(setIsPostLoading(true));
  const res = await fetcher.delete(`product/${id}`);
  console.log(res.status);
  if (res.status === 200) {
    dispatch(getProducts(true));
  }
  dispatch(setIsPostLoading(false));
};
