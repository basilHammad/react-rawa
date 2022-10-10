import * as types from "../types";

const initialState = {
  accountStatement: [],
  totalPages: "",
  accountStatementOldBalance: "",
  accountStatementFinalBalance: "",
};

const reportsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ACCOUNT_STATEMENT:
      return {
        ...state,
        accountStatement: payload,
      };
    case types.GET_OLD_BALANCE:
      return {
        ...state,
        accountStatementOldBalance: payload,
      };
    case types.GET_FINAL_BALANCE:
      return {
        ...state,
        accountStatementFinalBalance: payload,
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

export default reportsReducer;
