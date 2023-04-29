import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/ordersActions";
import { editTrip } from "../../store/actions/tripsActions";
import Loader from "../Loader/Loader";
import MainBtn from "../MainBtn/MainBtn";
import Order from "../Order/Order";
import Pagination from "../Pagination/Pagination";
import stl from "./EditTripPopup.module.css";

const EditTripPopup = ({ tripsOrders, tripId, closeModal, setShowModal }) => {
  const orders = useSelector((state) => state.orders.orders);
  const totalPages = useSelector((state) => state.orders.totalPages);
  const loading = useSelector((state) => state.common.isLoading);

  const [page, setPage] = useState(1);
  const [selectedOrdersIds, setSelectedOrdersIds] = useState(
    tripsOrders.map((order) => order.id.toString())
  );

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (selectedOrdersIds.includes(e.target.value)) {
      setSelectedOrdersIds((pre) =>
        pre.filter((item) => item != e.target.value)
      );
      return;
    }

    setSelectedOrdersIds((pre) => [...pre, e.target.value]);
    setError("");
  };

  const handleSubmit = () => {
    if (!selectedOrdersIds.length) {
      setError("يجب ان تحتوي الرحلة على طلب واحد على الاقل");
      return;
    }

    dispatch(editTrip(tripId, selectedOrdersIds, () => setShowModal(false)));
  };

  useEffect(() => {
    dispatch(getOrders(page, true));
  }, [page]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          {[...tripsOrders, ...orders].map((order, i) => {
            return (
              <Order
                item={order}
                key={order.id}
                name={order?.name}
                products={order?.order_products}
                num={i + 1}
                selectable
                orderId={order.id}
                onChange={handleChange}
                checked={
                  selectedOrdersIds.includes(order.id.toString()) ? true : false
                }
              />
            );
          })}
          {totalPages > 1 && (
            <Pagination
              totalPages={[...Array(totalPages)].map((_, i) => i + 1)}
              currentPage={page}
              loading={loading}
              setCurrentPage={setPage}
            />
          )}

          {error && <p className={stl.error}>{error}</p>}

          <MainBtn className={stl.btn} onClick={handleSubmit}>
            استمرار
          </MainBtn>
        </div>
      )}
    </>
  );
};

export default EditTripPopup;
