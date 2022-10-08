import * as types from "../types";

const initialState = {
  expensesCategory: [],
  expenses: [],
  expense: {},
  suppliers: [],
  employees: [],
  totalPages: "",
};

const expensesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_EXPENSES_CATEGORY:
      return {
        ...state,
        expensesCategory: payload,
      };

    case types.GET_EXPENSE:
      return {
        ...state,
        expenses: payload,
      };

    case types.GET_EXPENSE_BY_ID:
      return {
        ...state,
        expense: payload,
      };

    case types.GET_SUPPLIERS:
      return {
        ...state,
        suppliers: payload,
      };

    case types.GET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
      };

    case types.GET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload,
      };

    default:
      return state;
  }
};

export default expensesReducer;
