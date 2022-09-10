import { useCallback } from "react";
import stl from "./SummaryPopup.module.css";

const SummaryPopup = ({ items, onSubmit, direct }) => {
  const totalPrice = items
    .map((item) => item.price)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
    <div className={stl.summaryPopup}>
      {!direct && (
        <>
          <div>
            رقم الطلب: <strong>1000</strong>
          </div>
          <div>
            تاريخ الاستلام: <strong>20/20/2000</strong>
          </div>
          <div>
            العميل: <strong>محمد</strong>
          </div>
        </>
      )}

      <div className={stl.tabel}>
        <div className={`${stl.row} ${stl.header}`}>
          <div className={stl.cell}>#</div>
          <div className={stl.cell}>المادة</div>
          <div className={stl.cell}>الكمية</div>
          <div className={stl.cell}>السعر</div>
        </div>
        {items.map((item, i) => (
          <div className={stl.row} key={item.id}>
            <div className={stl.cell}>{i + 1}</div>
            <div className={stl.cell}>{item.name}</div>
            <div className={stl.cell}>{item.qty}</div>
            <div className={stl.cell}>{item.price}</div>
          </div>
        ))}
      </div>
      <div className={stl.submitSection}>
        <div>
          الصافي : <strong>{totalPrice}</strong>
        </div>
        <button className={stl.submit} onClick={onSubmit}>
          اتمام
        </button>
      </div>
    </div>
  );
};

export default SummaryPopup;
