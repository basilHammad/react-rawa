import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

import stl from "./Order.module.css";

const Order = ({
  num,
  name,
  products,
  latLng,
  selectable,
  orderId,
  onChange,
  checked,
}) => {
  return !selectable ? (
    <Link to={`/manage/orders/edit/${orderId}`} className={stl.wrapper}>
      <span className={stl.num}>{num}</span>
      <div className={stl.details}>
        <strong className={stl.title}>{name}</strong>
        <div>
          الطلبات: <span className={stl.blue}> {products.length}</span>
        </div>
        <div className={stl.products}>
          {products.map((product, i) => {
            return (
              <span key={i}>({`${product.product_name} ${product.qty}`})</span>
            );
          })}
        </div>
      </div>
      {latLng?.lat && latLng?.lng ? (
        <Link
          to={`/manage/map/${latLng.lat}/${latLng.lng}`}
          className={stl.iconWrapper}
        >
          <MdLocationOn size={22} />
        </Link>
      ) : null}
    </Link>
  ) : (
    <label className={`${stl.wrapper} ${checked ? stl.checked : ""}`}>
      <span className={stl.num}>{num}</span>
      <div className={stl.details}>
        <strong className={stl.title}>{name}</strong>
        <div>
          الطلبات: <span className={stl.blue}> {products.length}</span>
        </div>
        <div className={stl.products}>
          {products.map((product, i) => {
            return (
              <span key={i}>({`${product.product_name} ${product.qty}`})</span>
            );
          })}
        </div>
      </div>

      <input
        type="checkbox"
        value={orderId}
        onChange={onChange}
        checked={checked}
      />
    </label>
  );
};

export default Order;
