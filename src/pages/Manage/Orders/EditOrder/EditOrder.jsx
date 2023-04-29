import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../../../Components/Card/Card";
import ClientPopup from "../../../../Components/ClientPopup/ClientPopup";
import Layout from "../../../../Components/Layout/Layout";
import Loader from "../../../../Components/Loader/Loader";
import MainBtn from "../../../../Components/MainBtn/MainBtn";
import Modal from "../../../../Components/Modal/Modal";
import Login from "../../../Login/Login";
import SummaryPopup from "../../../../Components/SummaryPopup/SummaryPopup";
import {
  getCities,
  getClients,
  getCodes,
} from "../../../../store/actions/commonActions";
import { editOrder, getOrder } from "../../../../store/actions/ordersActions";
import { getProviderItems } from "../../../../store/actions/posActions";

import stl from "./EditOrders.module.css";

const deleveryNote = (days, from, to) => {
  if (!days.length && !from && !to) return ``;
  if (!days.length) return `الاستلام من الساعة ${from} الى الساعة ${to}`;
  if (!days.length && !from) return `الاستلام قبل الساعة ${to}`;
  if (!days.length && !to) return `الاستلام بعد الساعة ${to}`;
  if (!from && !to) return `ايام الاستلام :${days.join(" - ")}`;
  if (!from && !to && days.length === 6) return `يوميا`;

  return `يوميا من الساعة ${from} الى الساعة : ${to}`;
};

const EditOrder = () => {
  const codes = useSelector((state) => state.common.codes);
  const order = useSelector((state) => state.orders.orderDetails);
  const products = useSelector((state) => state.pos.items);
  const loading = useSelector((state) => state.common.isLoading);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const cities = useSelector((state) => state.common.cities);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [fromHour, setFromHour] = useState("");
  const [toHour, setToHour] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentTypeError, setPaymentTypeError] = useState("");
  const [billNum, setBillNum] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const closeSummaryModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowSummaryModal(false);
  };

  const closeClientModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowClientModal(false);
  };

  const handleItemSelect = (product, flag) => {
    const foundItem = selectedItems.find((item) => item.id === product.id);
    const foundItemPrice = products.find(
      (item) => item.id === product.id
    ).price;

    if (foundItem) {
      const foundItemIndex = selectedItems.indexOf(foundItem);
      const selectedItemsCopy = [...selectedItems];

      if (flag === "-" && foundItem.qty === 1) {
        selectedItemsCopy.splice(foundItemIndex, 1);
        setSelectedItems(selectedItemsCopy);
        return;
      }

      const updatedQty = flag === "+" ? foundItem.qty + 1 : foundItem.qty - 1;

      selectedItemsCopy[foundItemIndex] = {
        ...foundItem,
        qty: updatedQty,
        price: updatedQty * foundItemPrice,
      };

      setSelectedItems(selectedItemsCopy);
      return;
    }

    if (flag === "-" && !foundItem) return;

    setSelectedItems((pre) => [...pre, { ...product, qty: 1 }]);
  };

  const onSummaryModalSubmit = () => {
    if (!selectedItems.length) return;

    if (!paymentType) {
      setPaymentTypeError("يجب اختيار طرقة الدفع");
      return;
    }

    dispatch(
      editOrder(
        params.id,
        selectedItems,
        2,
        () => {
          setShowSummaryModal(false);
          setSelectedItems([]);
          setPaymentType("");
          navigate("/manage/orders");
        },
        deleveryNote(selectedDay, fromHour, toHour),
        clientId,
        paymentType,
        selectedDay,
        fromHour,
        toHour
      )
    );
  };

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
    setPaymentTypeError("");
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");

    if (!params.id) navigate("/manage/orders");

    if (!products.length) dispatch(getProviderItems());
    if (!Object.keys(codes).length) dispatch(getCodes());
    dispatch(getClients(1, null, null, 10000));
    dispatch(getOrder(params.id));
    dispatch(getCities());
  }, [isLoggedin, dispatch, navigate]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("edit-orders")) navigate("/unauthorized");
  }, [permissions]);

  useEffect(() => {
    if (!Object.keys(codes).length) return;
    setBillNum(codes.tabular_order);
  }, [codes]);

  useEffect(() => {
    if (!Object.keys(order).length || !products.length) return;
    const selectedItems = order.order_products.map((product) => {
      return {
        discount: product.discount,
        id: product.provider_product_id,
        img: "",
        measurement: "",
        name: product.product_name,
        price: product.price,
        qty: product.qty,
      };
    });
    setSelectedItems(selectedItems);
    setClientName(order?.full_name);
    setClientId(order?.customer_id);
    setPaymentType(order?.payment_type);
    setBillNum(order?.code);
    setSelectedDay(order?.days);
    setFromHour(order?.from);
    setToHour(order?.to);
  }, [order, products]);

  console.log(order);

  return (
    <Layout manage>
      <div className={stl.cardsWrapper}>
        {!loading ? (
          products.map((product) => (
            <Card
              key={product.id}
              item={product}
              handleItemSelect={handleItemSelect}
              selectedItem={selectedItems.find((item) => {
                return product.id === item.id;
              })}
            />
          ))
        ) : (
          <Loader />
        )}

        <MainBtn
          disabled={selectedItems.length ? false : true}
          onClick={() => setShowClientModal(true)}
          className={stl.mainBtn}
        >
          استمرار
        </MainBtn>
      </div>
      <Modal show={showClientModal} close={closeClientModal}>
        <ClientPopup
          closeClientModal={() => setShowClientModal(false)}
          showSummaryModal={() => setShowSummaryModal(true)}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          fromHour={fromHour}
          setFromHour={setFromHour}
          toHour={toHour}
          setToHour={setToHour}
          clientName={clientName}
          setClientName={setClientName}
          clientId={clientId}
          setClientId={setClientId}
          cities={cities}
          isScheduled={isScheduled}
          setIsScheduled={setIsScheduled}
          order={order}
        />
      </Modal>
      <Modal show={showSummaryModal} close={closeSummaryModal}>
        <SummaryPopup
          items={selectedItems}
          clientName={clientName}
          clientId={clientId}
          onSubmit={onSummaryModalSubmit}
          paymentType={paymentType}
          paymentTypeError={paymentTypeError}
          onSelectChange={handlePaymentTypeChange}
          billNum={billNum}
          note={deleveryNote(selectedDay, fromHour, toHour)}
        />
      </Modal>
    </Layout>
  );
};

export default EditOrder;
