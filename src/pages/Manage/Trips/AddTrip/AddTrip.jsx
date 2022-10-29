import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../../../Components/Layout/Layout";
import Login from "../../../Login/Login";
import Header from "../../Components/Header/Header";
import { getOrders } from "../../../../store/actions/ordersActions";

import stl from "./AddTrip.module.css";
import Order from "../../../../Components/Order/Order";
import Pagination from "../../../../Components/Pagination/Pagination";
import Loader from "../../../../Components/Loader/Loader";
import InputGroup from "../../../../Components/InputGroup/InputGroup";
import { createTrip } from "../../../../store/actions/tripsActions";
import CalendarGroup from "../../../../Components/Calendar/CalendarGroup";

const AddTrip = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const orders = useSelector((state) => state.orders.orders);
  const totalPages = useSelector((state) => state.orders.totalPages);
  const loading = useSelector((state) => state.common.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [selectedOrdersIds, setSelectedOrdersIds] = useState([]);
  const [tripName, setTripName] = useState("");
  const [errors, setErrors] = useState({ name: "", orders: "" });
  const [date, setDate] = useState(new Date());

  const handleChange = (e) => {
    if (selectedOrdersIds.includes(e.target.value)) {
      setSelectedOrdersIds((pre) =>
        pre.filter((item) => item != e.target.value)
      );
      return;
    }

    setSelectedOrdersIds((pre) => [...pre, e.target.value]);
    setErrors((pre) => ({ ...pre, orders: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!tripName.trim().length) errors.name = "يجب اختيار اسم الرحلة";
    if (!selectedOrdersIds.length) errors.orders = "يجب اختيار طلب على الاقل";
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }
    dispatch(
      createTrip(tripName, selectedOrdersIds, date.toDateString(), () =>
        navigate("/manage/trips")
      )
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getOrders(page, true));
  }, [isLoggedIn, navigate, page]);

  return isAdmin ? (
    <Layout manage>
      <Header
        isModal
        title="اضافة رحلة"
        btnText="اضافة"
        onClick={handleSubmit}
      />
      <div className={stl.inputWrapper}>
        {errors.orders && <span className={stl.error}>{errors.orders}</span>}
        <InputGroup
          type="text"
          id="trip-name"
          label="اسم الرحلة"
          placeholder="ادخل الاسم"
          name="name"
          value={tripName}
          onChange={(e) => {
            setTripName(e.target.value);
            setErrors((pre) => ({ ...pre, name: "" }));
          }}
          error={errors.name}
        />
        <CalendarGroup
          label="تاريخ الرحلة"
          value={date}
          onChange={setDate}
          minDate={new Date()}
          // className={stl.calender}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        orders.map((order, i) => {
          return (
            <Order
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
        })
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

export default AddTrip;
