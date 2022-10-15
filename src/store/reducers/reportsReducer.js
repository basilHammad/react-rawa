import * as types from "../types";

const initialState = {
  accountStatement: [],
  totalPages: "",
  accountStatementOldBalance: "",
  accountStatementFinalBalance: "",
  revenueReport: [],
  revenueReportOldBalance: "",
  revenueReportFinalBalance: "",
  expenseReport: [],
  expenseReportOldBalance: "",
  expenseReportFinalBalance: "",
  purchaseReport: [],
  purchaseReportOldBalance: "",
  purchaseReportFinalBalance: "",
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

    case types.GET_REVENUE_REPORT:
      return {
        ...state,
        revenueReport: payload,
      };

    case types.GET_REVENUE_OLD_BALANCE:
      return {
        ...state,
        revenueReportOldBalance: payload,
      };

    case types.GET_REVENUE_FINAL_BALANCE:
      return {
        ...state,
        revenueReportFinalBalance: payload,
      };

    case types.GET_EXPENSE_REPORT:
      console.log("GET_EXPENSE_REPORT");
      return {
        ...state,
        expenseReport: payload,
      };

    case types.GET_EXPENSE_OLD_BALANCE:
      return {
        ...state,
        expenseReportOldBalance: payload,
      };

    case types.GET_EXPENSE_FINAL_BALANCE:
      return {
        ...state,
        expenseReportFinalBalance: payload,
      };

    case types.GET_PURCHASE_REPORT:
      return {
        ...state,
        purchaseReport: payload,
      };

    case types.GET_PURCHASE_OLD_BALANCE:
      return {
        ...state,
        purchaseReportOldBalance: payload,
      };

    case types.GET_PURCHASE_FINAL_BALANCE:
      return {
        ...state,
        purchaseReportFinalBalance: payload,
      };

    default:
      return state;
  }
};

export default reportsReducer;
