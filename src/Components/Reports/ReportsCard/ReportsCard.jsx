import stl from "./ReportsCard.module.css";

const ReportsCard = ({
  color,
  date,
  recordType,
  recordDate,
  recordNum,
  recordValue,
  currentCredit,
}) => {
  return (
    <div
      className={`${stl.card} ${
        color === "red" ? stl.red : color === "blue" ? stl.blue : ""
      }`}
    >
      <div className={stl.date}>{date}</div>
      <div className={stl.info}>
        <div className={stl.column}>
          <div>
            <span>{recordType}</span>
            <span>{recordDate}</span>
          </div>
          <div>
            <span>رقم السند-{recordNum}</span>
          </div>
        </div>

        <div className={stl.column}>
          <span className={stl.colored}>
            {recordValue}
            {/* {color === "red" ? "-" : "+"} */}
          </span>
          <div>
            <span>الرصيد الحالي</span>
            <span>{currentCredit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsCard;
