import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Blocks } from "react-loader-spinner";

import Card from "../../../Components/Card/Card";
import Layout from "../../../Components/Layout/Layout";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import Modal from "../../../Components/Modal/Modal";
import Navigation from "../../../Components/Navigation/Navigation";
import SummaryPopup from "../../../Components/SummaryPopup/SummaryPopup";
import {
  getProviderItems,
  submitDirectOrder,
} from "../../../store/actions/posActions";

import stl from "./Sales.module.css";

const links = [
  { text: "مباشر", path: "/pos/direct" },
  { text: "طلبات", path: "/pos/orders" },
];

const Sales = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const products = useSelector((state) => state.pos.items);
  const dispatch = useDispatch();

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
    // setShowModal(false);
    // setSelectedItems([]);
    if (!selectedItems.length) return;

    dispatch(submitDirectOrder(selectedItems));
  };

  useEffect(() => {
    dispatch(getProviderItems());
  }, []);

  console.log(products);

  return (
    <Layout>
      <Navigation links={links} />

      <div className={stl.cardsWrapper}>
        {products.length ? (
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
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperClass={stl.loaderWrapper}
          />
        )}
        <MainBtn
          disabled={selectedItems.length ? false : true}
          onClick={() => setShowModal(true)}
        >
          استمرار
        </MainBtn>
      </div>
      <Modal show={showModal} close={closeModal}>
        <SummaryPopup direct items={selectedItems} onSubmit={onModalSubmit} />
      </Modal>
    </Layout>
  );
};

export default Sales;
