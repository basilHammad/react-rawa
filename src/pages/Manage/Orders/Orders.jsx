import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Header from "../Components/Header/Header";
import { getOrder, getOrders } from "../../../store/actions/ordersActions";

import stl from "./Orders.module.css";
import Order from "../../../Components/Order/Order";
import Pagination from "../../../Components/Pagination/Pagination";
import Loader from "../../../Components/Loader/Loader";

const Orders = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const orders = useSelector((state) => state.orders.orders);
  const totalPages = useSelector((state) => state.orders.totalPages);
  const loading = useSelector((state) => state.common.isLoading);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getOrders(page));
    // dispatch(getOrder());
  }, [isLoggedIn, navigate, page]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("view-orders")) navigate("/unauthorized");
  }, [permissions]);

  return (
    <Layout manage>
      <Header hideButton title="الطلبات" />
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          {orders.map((order, i) => {
            return (
              <Order
                item={order}
                status={order.status}
                editable={permissions?.includes("edit-orders")}
                key={order.id}
                orderId={order.id}
                name={order?.name ? order?.name : order?.customer?.name}
                products={order?.order_products}
                num={i + 1}
                latLng={{
                  lat: order?.customer?.location_lat,
                  lng: order?.customer?.location_lng,
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
  );
};

export default Orders;
