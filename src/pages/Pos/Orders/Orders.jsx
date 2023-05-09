import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../../../Components/Card/Card";
import ClientPopup from "../../../Components/ClientPopup/ClientPopup";
import Layout from "../../../Components/Layout/Layout";
import Loader from "../../../Components/Loader/Loader";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import Modal from "../../../Components/Modal/Modal";
import Navigation from "../../../Components/Navigation/Navigation";
import SummaryPopup from "../../../Components/SummaryPopup/SummaryPopup";
import {
  getCities,
  getClients,
  getCodes,
} from "../../../store/actions/commonActions";
import {
  createOrder,
  getProviderItems,
} from "../../../store/actions/posActions";

import stl from "./Orders.module.css";

const links = [
  { text: "مباشر", path: "/pos/direct" },
  { text: "طلبات", path: "/pos/orders" },
];

const deleveryNote = (days, from, to) => {
  if (!days.length && !from && !to) return ``;
  if (!days.length) return `الاستلام من الساعة ${from} الى الساعة ${to}`;
  if (!days.length && !from) return `الاستلام قبل الساعة ${to}`;
  if (!days.length && !to) return `الاستلام بعد الساعة ${to}`;
  if (!from && !to) return `ايام الاستلام :${days.join(" - ")}`;

  return `ايام الاستلام :${days.join(
    " - "
  )} من الساعة ${from} الى الساعة : ${to}`;
};

const Orders = () => {
  const codes = useSelector((state) => state.common.codes);

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

  const [clientModalFieldsValues, setClientModalFieldsValues] = useState({
    name: "",
    mobile: "",
    location: "",
    cityId: "",
    areaId: "",
  });
  const [clientModalFieldsErrors, setClientModalFieldsErrors] = useState({
    name: "",
    mobile: "",
    location: "",
    cityId: "",
    areaId: "",
  });

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const products = useSelector((state) => state.pos.items);
  const loading = useSelector((state) => state.common.isLoading);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const cities = useSelector((state) => state.common.cities);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeSummaryModal = (e) => {
    if (e && e.target !== e.currentTarget) return;
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

  const resetClientPopup = () => {
    setClientModalFieldsValues({
      name: "",
      mobile: "",
      location: "",
      cityId: "",
      areaId: "",
    });
    setClientModalFieldsErrors({
      name: "",
      mobile: "",
      location: "",
      cityId: "",
      areaId: "",
    });

    setSelectedCity(null);
    setSelectedArea(null);
    setIsScheduled(false);
    setFromHour("");
    setToHour("");
    setSelectedDay([]);
  };

  const onSummaryModalSubmit = () => {
    if (!selectedItems.length) return;

    if (!paymentType) {
      setPaymentTypeError("يجب اختيار طرقة الدفع");
      return;
    }

    dispatch(
      createOrder(
        selectedItems,
        2,
        () => {
          setShowSummaryModal(false);
          setSelectedItems([]);
          setPaymentType("");
          dispatch(getCodes());
          setClientName("");
          setClientId("");

          resetClientPopup();
        },
        deleveryNote(selectedDay, fromHour, toHour),
        clientId,
        paymentType,
        selectedDay,
        fromHour,
        toHour,
        isScheduled
      )
    );
  };

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
    setPaymentTypeError("");
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");

    if (!products.length) dispatch(getProviderItems());
    if (!Object.keys(codes).length) dispatch(getCodes());
    dispatch(getClients(1, null, null, 10000));
    dispatch(getCities());
  }, [isLoggedin, dispatch, navigate]);

  useEffect(() => {
    if (!Object.keys(codes).length) return;
    setBillNum(codes.tabular_order);
  }, [codes]);

  return (
    <Layout>
      <Navigation links={links} />

      <div className={stl.cardsWrapper}>
        {!loading ? (
          products.map((product) => (
            <Card
              key={product.id}
              item={product}
              handleItemSelect={handleItemSelect}
              selectedItem={selectedItems.find(
                (item) => product.id === item.id
              )}
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
          fieldsValues={clientModalFieldsValues}
          setFieldsValues={setClientModalFieldsValues}
          fieldsErrors={clientModalFieldsErrors}
          setFieldsErrors={setClientModalFieldsErrors}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
      </Modal>
      <Modal
        show={showSummaryModal}
        close={closeSummaryModal}
        back={() => {
          closeSummaryModal();
          setShowClientModal(true);
        }}
      >
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

export default Orders;
