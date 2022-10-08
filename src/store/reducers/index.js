import { combineReducers } from "redux";

import authReducer from "./authReducer";
import posReducer from "./posReducer";
import commonReducer from "./commonReducer";
import revenuesReducer from "./revenuesReducer";
import expensesReducer from "./expensesReducer";
import purchasesReducer from "./purchasesReducer";
import ordersReducer from "./ordersReducer";
import tripsReducer from "./tripsReducer";

export default combineReducers({
  auth: authReducer,
  pos: posReducer,
  common: commonReducer,
  revenues: revenuesReducer,
  expenses: expensesReducer,
  purchases: purchasesReducer,
  orders: ordersReducer,
  trips: tripsReducer,
});
