import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Sales from "./pages/Pos/Sales/Sales";
import Orders from "./pages/Pos/Orders/Orders";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pos/direct" element={<Sales />} />
        <Route path="/pos/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
