import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Sales from "./pages/Pos/Sales/Sales";
import Orders from "./pages/Pos/Orders/Orders";
import RevenuesAdd from "./pages/Manage/Revenues/RevenuesAdd/RevenuesAdd";
import ExpensesAdd from "./pages/Manage/Expenses/ExpensesAdd/ExpensesAdd";
import EditPassword from "./pages/EditPassword/EditPassword";
import Manage from "./pages/Manage/Manage";
import Revenues from "./pages/Manage/Revenues/Revenues";
import Expenses from "./pages/Manage/Expenses/Expenses";
import Purchases from "./pages/Manage/Purchases/Purchases";
import PurchasesAdd from "./pages/Manage/Purchases/PurchasesAdd/PurchasesAdd";
import RevenuesEdit from "./pages/Manage/Revenues/RevenuesEdit/RevenuesEdit";
import ExpensesEdit from "./pages/Manage/Expenses/ExpensesEdit/ExpensesEdit";
import PurchasesEdit from "./pages/Manage/Purchases/PurchasesEdit/PurchasesEdit";
import NotFound from "./pages/NotFound/NotFound";
import Suppliers from "./pages/Manage/Suppliers/Suppliers";
import Clients from "./pages/Manage/Clients/Clients";
import Employees from "./pages/Manage/Employees/Employees";
import OrdersList from "./pages/Manage/Orders/Orders";
import Trips from "./pages/Manage/Trips/Trips";
import Map from "./pages/Map/Map";
import Trip from "./pages/Manage/Trips/Trip/Trip";
import TripAdd from "./pages/Manage/Trips/AddTrip/AddTrip";
import AccountStatement from "./pages/Manage/Reports/AccountStatement/AccountStatement";
import RevenueReport from "./pages/Manage/Reports/Revenue/RevenueReport";
import ExpenseReport from "./pages/Manage/Reports/expense/ExpenseReport";
import PurchaseReport from "./pages/Manage/Reports/Purchase/PurchaseReport";
import EditOrder from "./pages/Manage/Orders/EditOrder/EditOrder";
import ScheduledTrips from "./pages/Manage/ScheduledTrips/ScheduledTrips";
import ScheduledTrip from "./pages/Manage/ScheduledTrip/ScheduledTrip";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserPermission } from "./store/actions/authActions";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Products from "./pages/Manage/Products/Products";
import AddProduct from "./pages/Manage/Products/AddProduct/AddProduct";
import EditProduct from "./pages/Manage/Products/EditProduct/EditProduct";

function App() {
  const dispatch = useDispatch();
  const permissions = useSelector(({ auth }) => auth.permissions);

  useEffect(() => {
    if (permissions) return;
    dispatch(getUserPermission());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pos/direct" element={<Sales />} />
        <Route path="/pos/orders" element={<Orders />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/orders" element={<OrdersList />} />
        <Route path="/manage/orders/edit/:id" element={<EditOrder />} />
        <Route path="/manage/trips" element={<Trips />} />
        <Route path="/manage/scheduledTrips" element={<ScheduledTrips />} />
        <Route path="/manage/scheduledTrip/:id" element={<ScheduledTrip />} />
        <Route path="/manage/trip/:id" element={<Trip />} />
        <Route path="/manage/trips/add" element={<TripAdd />} />
        <Route path="/manage/revenues" element={<Revenues />} />
        <Route path="/manage/revenues/add" element={<RevenuesAdd />} />
        <Route path="/manage/revenues/edit/:id" element={<RevenuesEdit />} />
        <Route path="/manage/expenses" element={<Expenses />} />
        <Route path="/manage/expenses/add" element={<ExpensesAdd />} />
        <Route path="/manage/expenses/edit/:id" element={<ExpensesEdit />} />
        <Route path="/manage/purchases" element={<Purchases />} />
        <Route path="/manage/purchases/add" element={<PurchasesAdd />} />
        <Route path="/manage/purchases/edit/:id" element={<PurchasesEdit />} />
        <Route path="/manage/edit-password" element={<EditPassword />} />
        <Route path="/manage/suppliers" element={<Suppliers />} />
        <Route path="/manage/clients" element={<Clients />} />
        <Route path="/manage/employees" element={<Employees />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/manage/products" element={<Products />} />
        <Route path="/manage/products/add" element={<AddProduct />} />
        <Route path="/manage/products/edit/:id" element={<EditProduct />} />
        <Route
          path="/manage/account-statement"
          element={<AccountStatement />}
        />
        <Route path="/manage/revenue-report" element={<RevenueReport />} />
        <Route path="/manage/expense-report" element={<ExpenseReport />} />
        <Route path="/manage/purchase-report" element={<PurchaseReport />} />
        <Route path="/manage/map/:lat/:lng" element={<Map />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/**
 * 7 not clear
 * 9 no valid 
 * 11 need to check the app
 * 14 api key
 * 17 need check not clear
 * 26 on app
 * 
 * ali
 * 12
 * 28 
 * 50
 * 51
 * 62


 */
