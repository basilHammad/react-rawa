import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Components/Card/Card";
import ClientPopup from "../../../Components/ClientPopup/ClientPopup";
import InputGroup from "../../../Components/InputGroup/InputGroup";
import Layout from "../../../Components/Layout/Layout";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import Modal from "../../../Components/Modal/Modal";
import Navigation from "../../../Components/Navigation/Navigation";
import SearchInput from "../../../Components/SearchInput/SearchInput";
import SummaryPopup from "../../../Components/SummaryPopup/SummaryPopup";
import { getProviderItems } from "../../../store/actions/posActions";

import stl from "./Orders.module.css";

const links = [
  { text: "مباشر", path: "/pos/direct" },
  { text: "طلبات", path: "/pos/orders" },
];

const cards = [
  { id: 1, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 2, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 3, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 4, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 5, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 6, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 7, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 8, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 9, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
  { id: 10, src: "/assets/images/bottle.jpeg", name: "قارورة", price: 0.5 },
];

const Orders = () => {
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const products = useSelector((state) => state.pos.items);
  const dispatch = useDispatch();

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

  const onClientModalSubmit = () => {
    setShowClientModal(false);
    setShowSummaryModal(true);
  };

  const onSummaryModalSubmit = () => {
    setShowSummaryModal(false);
    setSelectedItems([]);
  };

  useEffect(() => {
    dispatch(getProviderItems());
  }, []);

  return (
    <Layout>
      <Navigation links={links} />

      <div className={stl.cardsWrapper}>
        {products.length &&
          products.map((product) => (
            <Card
              key={product.id}
              item={product}
              handleItemSelect={handleItemSelect}
              selectedItem={selectedItems.find(
                (item) => product.id === item.id
              )}
            />
          ))}

        <MainBtn onClick={() => setShowClientModal(true)}>استمرار</MainBtn>
      </div>
      <Modal show={showClientModal} close={closeClientModal}>
        <ClientPopup onSubmit={onClientModalSubmit} />
      </Modal>
      <Modal show={showSummaryModal} close={closeSummaryModal}>
        <SummaryPopup items={selectedItems} onSubmit={onSummaryModalSubmit} />
      </Modal>
    </Layout>
  );
};

export default Orders;
