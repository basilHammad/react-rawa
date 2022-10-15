import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Login from "../../Login/Login";
import Header from "../Components/Header/Header";
import { getOrders } from "../../../store/actions/ordersActions";

import stl from "./Orders.module.css";
import Order from "../../../Components/Order/Order";
import Pagination from "../../../Components/Pagination/Pagination";
import Loader from "../../../Components/Loader/Loader";

const Orders = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const orders = useSelector((state) => state.orders.orders);
  const totalPages = useSelector((state) => state.orders.totalPages);
  const loading = useSelector((state) => state.common.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getOrders(page));
  }, [isLoggedIn, navigate, page]);

  return isAdmin ? (
    <Layout manage>
      <Header hideButton title="الطلبات" />
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          {orders.map((order, i) => {
            return (
              <Order
                key={order.id}
                name={order?.name}
                products={order?.order_products}
                num={i + 1}
                latLng={{
                  lat: order?.address?.location_lat,
                  lng: order?.address?.location_lng,
                }}
              />
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={[...Array(totalPages)].map((_, i) => i + 1)}
          currentPage={page}
          loading={loading}
          setCurrentPage={setPage}
        />
      )}
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default Orders;
