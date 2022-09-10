import { MdAdd } from "react-icons/md";
import { MdRemove } from "react-icons/md";

import stl from "./Card.module.css";

const Card = ({ item, handleItemSelect, selectedItem }) => {
  return (
    <div className={stl.card}>
      <div className={stl.imgWrapper}>
        <img src={item.img} />
      </div>

      <span>{item.name}</span>

      <div className={stl.btnsWrapper}>
        <button
          className={`${stl.btn} ${stl.plus}`}
          onClick={() => handleItemSelect(item, "+")}
        >
          <MdAdd />
        </button>
        {selectedItem?.qty}
        <button
          className={`${stl.btn} ${stl.minus}`}
          onClick={() => handleItemSelect(item, "-")}
        >
          <MdRemove />
        </button>
      </div>
    </div>
  );
};

export default Card;
