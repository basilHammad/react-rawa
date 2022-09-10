import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Sales from "./pages/Pos/Sales/Sales";
import Orders from "./pages/Pos/Orders/Orders";
import Revenues from "./pages/Manage/Revenues/Revenues";
import Expenses from "./pages/Manage/Expenses/Expenses";
import EditPassword from "./pages/EditPassword/EditPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pos/direct" element={<Sales />} />
        <Route path="/pos/orders" element={<Orders />} />
        <Route path="/manage/revenues" element={<Revenues />} />
        <Route path="/manage/expenses" element={<Expenses />} />
        <Route path="/edit-password" element={<EditPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
