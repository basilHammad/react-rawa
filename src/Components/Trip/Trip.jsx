import { Link } from "react-router-dom";
import stl from "./Trip.module.css";

const Trip = ({ name, total, date, orders, driverName, tripId, showModal }) => {
  const newDate = date ? new Date(date) : null;

  return (
    <div className={stl.wrapper}>
      <strong className={stl.title}>{name}</strong>
      <div className={stl.flexBetween}>
        <span>
          عدد الطلبات : <span className={stl.blue}>{orders.length}</span>
        </span>
        <span className={stl.gray}>
          {newDate
            ? `${newDate.getDate()}/${
                newDate.getMonth() + 1
              }/${newDate.getFullYear()}`
            : ""}
        </span>
      </div>
      <div className={stl.flexBetween}>
        <span>
          السائق : <span>{driverName ? driverName : "لا يوجد"}</span>
        </span>
        <span>
          المجموع : <span className={stl.green}>{total}</span>
        </span>
      </div>
      <div className={stl.controls}>
        <Link className={stl.blueBtn} to={`/manage/trip/${tripId}`}>
          مشاهدة
        </Link>
        <button
          onClick={() => showModal(tripId)}
          disabled={driverName ? true : false}
        >
          ربط
        </button>
      </div>
    </div>
  );
};

export default Trip;
