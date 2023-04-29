import * as types from "../types";

const initialState = {
  mainProducts: [],
  product: {},
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_MAIN_PRODUCTS:
      return {
        ...state,
        mainProducts: payload,
      };

    case types.GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
