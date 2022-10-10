import { useSelector } from "react-redux";
import MainBtn from "../MainBtn/MainBtn";
import SelectGroup from "../SelectGroup/SelectGroup";
import Header from "./Header/Header";
import stl from "./SummaryPopup.module.css";

const PAYMENT_TYPES = [
  { text: "كاش", value: 1, id: 1 },
  { text: "كوبون", value: 2, id: 2 },
  { text: "ذمم", value: 3, id: 3 },
];

const SummaryPopup = ({
  items,
  onSubmit,
  direct,
  clientName,
  paymentType,
  paymentTypeError,
  onSelectChange,
  billNum,
  note,
}) => {
  const totalPrice = items
    .map((item) => item.price)
    .reduce((previousValue, currentValue) => +previousValue + +currentValue, 0);

  console.log(totalPrice);

  const postLoading = useSelector((state) => state.common.isPostLoading);

  return (
    <div className={stl.summaryPopup}>
      <Header billNum={billNum} date={new Date()} clientName={clientName} />

      <div className={stl.tabel}>
        <div className={`${stl.row} ${stl.header}`}>
          <div className={stl.cell}>#</div>
          <div className={stl.cell}>المادة</div>
          <div className={stl.cell}>الكمية</div>
          <div className={stl.cell}>السعر</div>
        </div>
        {items.map((item, i) => {
          return (
            <div className={stl.row} key={item.id}>
              <div className={stl.cell}>{i + 1}</div>
              <div className={stl.cell}>{item.name}</div>
              <div className={stl.cell}>{item.qty}</div>
              <div className={stl.cell}>
                {Math.round((+item.price + Number.EPSILON) * 100) / 100}
              </div>
            </div>
          );
        })}
      </div>

      <div className={stl.submitSection}>
        {note ? (
          <div className={stl.note}>
            <span>ملاحظات :</span>
            <p> {note}</p>
          </div>
        ) : (
          ""
        )}
        <div className={stl.control}>
          <div>
            الصافي :{" "}
            <strong>
              {Math.round((+totalPrice + Number.EPSILON) * 100) / 100}
            </strong>
          </div>

          {!direct && (
            <SelectGroup
              name="payment-type"
              id="payment-type"
              firstOption="اختر طريقة الدفع"
              options={PAYMENT_TYPES}
              value={paymentType}
              onChange={(e) => onSelectChange(e.target.value)}
              error={paymentTypeError}
              className={stl.paymentType}
            />
          )}
        </div>

        <MainBtn
          className={stl.submit}
          onClick={onSubmit}
          loading={postLoading}
        >
          اتمام
        </MainBtn>
      </div>
    </div>
  );
};

export default SummaryPopup;
