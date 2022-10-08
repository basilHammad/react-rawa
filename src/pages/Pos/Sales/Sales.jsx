import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../../Components/Card/Card";
import Layout from "../../../Components/Layout/Layout";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import Modal from "../../../Components/Modal/Modal";
import Navigation from "../../../Components/Navigation/Navigation";
import SummaryPopup from "../../../Components/SummaryPopup/SummaryPopup";
import {
  getProviderItems,
  createOrder,
} from "../../../store/actions/posActions";

import stl from "./Sales.module.css";
import Loader from "../../../Components/Loader/Loader";
import { setIsAdmin } from "../../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { getCodes } from "../../../store/actions/commonActions";

const links = [
  { text: "مباشر", path: "/pos/direct" },
  { text: "طلبات", path: "/pos/orders" },
];

const Sales = () => {
  const codes = useSelector((state) => state.common.codes);

  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [billNum, setBillNum] = useState("");

  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const products = useSelector((state) => state.pos.items);
  const loading = useSelector((state) => state.common.isLoading);
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal(false);
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

  const onModalSubmit = () => {
    if (!selectedItems.length) return;

    dispatch(
      createOrder(selectedItems, 1, () => {
        setShowModal(false);
        setSelectedItems([]);
        dispatch(getCodes());
      })
    );
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
    dispatch(setIsAdmin(false));
    if (!products.length) dispatch(getProviderItems());
    if (!Object.keys(codes).length) dispatch(getCodes());
  }, [isLoggedin, dispatch, navigate]);

  useEffect(() => {
    if (!Object.keys(codes).length) return;
    setBillNum(codes.direct_order);
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
          onClick={() => setShowModal(true)}
        >
          استمرار
        </MainBtn>
      </div>
      <Modal show={showModal} close={closeModal}>
        <SummaryPopup
          direct
          items={selectedItems}
          onSubmit={onModalSubmit}
          postLoading={postLoading}
          billNum={billNum}
        />
      </Modal>
    </Layout>
  );
};

export default Sales;
