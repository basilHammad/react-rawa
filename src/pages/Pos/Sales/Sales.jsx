import { useState } from "react";
import Card from "../../../Components/Card/Card";
import Layout from "../../../Components/Layout/Layout";
import Modal from "../../../Components/Modal/Modal";
import Navigation from "../../../Components/Navigation/Navigation";
import SummaryPopup from "../../../Components/SummaryPopup/SummaryPopup";

import stl from "./Sales.module.css";

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

const Sales = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal(false);
  };

  const handleItemSelect = (card, flag) => {
    const foundItem = selectedItems.find((item) => item.id === card.id);
    const foundItemPrice = cards.find((item) => item.id === card.id).price;

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

    setSelectedItems((pre) => [...pre, { ...card, qty: 1 }]);
  };

  const onModalSubmit = () => {
    setShowModal(false);
    setSelectedItems([]);
  };

  return (
    <Layout>
      <Navigation links={links} />

      <div className={stl.cardsWrapper}>
        {cards.map((card) => (
          <Card
            key={card.id}
            item={card}
            handleItemSelect={handleItemSelect}
            selectedItem={selectedItems.find((item) => card.id === item.id)}
          />
        ))}
        <button className={stl.submit} onClick={() => setShowModal(true)}>
          استمرار
        </button>
      </div>
      <Modal show={showModal} close={closeModal}>
        <SummaryPopup items={selectedItems} onSubmit={onModalSubmit} />
      </Modal>
    </Layout>
  );
};

export default Sales;
