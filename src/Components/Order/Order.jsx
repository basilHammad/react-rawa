import { MdLocationOn, MdDangerous, MdModeEditOutline } from "react-icons/md";

import { Link } from "react-router-dom";

import stl from "./Order.module.css";

const ORDER_STATUS = {
  1: "قيد الانتظار",
  2: "بدأ",
  3: "مكتمل",
  0: "ملغي",
};

const Order = ({
  name,
  products,
  latLng,
  selectable,
  orderId,
  onChange,
  checked,
  deletable,
  onDelete,
  editable,
  status,
  item,
}) => {
  return !selectable ? (
    <div to={`/manage/orders/edit/${orderId}`} className={stl.wrapper}>
      <div className={stl.row}>
        <strong className={stl.title}>{name}</strong>
        <div className={stl.controls}>
          {latLng?.lat && latLng?.lng ? (
            <Link
              to={`/manage/map/${latLng.lat}/${latLng.lng}`}
              className={stl.iconWrapper}
            >
              <MdLocationOn size={22} />
            </Link>
          ) : null}
          {deletable && (
            <MdDangerous onClick={onDelete} size={22} color="#dc3545" />
          )}
          {editable && (
            <Link to={`/manage/orders/edit/${orderId}`}>
              <MdModeEditOutline size={22} />
            </Link>
          )}
        </div>
      </div>
      {status ? (
        <div
          className={stl.row}
          style={{ justifyContent: "flex-start", gap: "8px" }}
        >
          <span>الحالة: </span> <span>{ORDER_STATUS[status]}</span>
        </div>
      ) : null}
      <div
        className={stl.row}
        style={{ justifyContent: "flex-start", gap: "8px" }}
      >
        <span>السعر: </span> <span>{item?.price}</span>
      </div>

      <div className={stl.details}>
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
    </div>
  ) : (
    <label
      className={`${stl.wrapper} ${checked ? stl.checked : ""} ${
        stl.selectable
      }`}
    >
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
