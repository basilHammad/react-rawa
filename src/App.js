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
import Reports from "./pages/Manage/Repprts/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pos/direct" element={<Sales />} />
        <Route path="/pos/orders" element={<Orders />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/orders" element={<OrdersList />} />
        <Route path="/manage/trips" element={<Trips />} />
        <Route path="/manage/trip/:id" element={<Trip />} />
        <Route path="/manage/trip/add" element={<TripAdd />} />
        <Route path="/manage/revenues" element={<Revenues />} />
        <Route path="/manage/revenues/add" element={<RevenuesAdd />} />
        <Route path="/manage/revenues/edit/:id" element={<RevenuesEdit />} />
        <Route path="/manage/expenses" element={<Expenses />} />
        <Route path="/manage/expenses/add" element={<ExpensesAdd />} />
        <Route path="/manage/expenses/edit/:id" element={<ExpensesEdit />} />
        <Route path="/manage/purchases" element={<Purchases />} />
        <Route path="/manage/purchases/add" element={<PurchasesAdd />} />
        <Route path="/manage/purchases/edit/:id" element={<PurchasesEdit />} />
        <Route path="/edit-password" element={<EditPassword />} />
        <Route path="/manage/suppliers" element={<Suppliers />} />
        <Route path="/manage/clients" element={<Clients />} />
        <Route path="/manage/employees" element={<Employees />} />
        <Route path="/manage/reports" element={<Reports />} />
        <Route path="/manage/map/:lat/:lng" element={<Map />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/**
 * [*] created orders from pos dose not show in orders listing
 * [*] last created trip should come first
 * [*] fix orders style bug
 * [*] trip_delivery_date
 * [] pills number should not reset on delete
 * [] add search by type on employees
 */
