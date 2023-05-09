import { Link } from "react-router-dom";
import stl from "./Trip.module.css";

const TRIP_STATUS = {
  1: "قيد الإنتظار",
  2: "قيد التسليم",
  3: "مكتملة",
  0: "ملغية",
};

const Trip = ({
  name,
  total,
  date,
  orders,
  driverName,
  tripId,
  showModal,
  driverId,
  setDriverId,
  isToday,
  status,
  canEdit,
}) => {
  const newDate = date ? new Date(date) : null;

  return (
    <div className={stl.wrapper}>
      {/* {status} */}
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
      <span>
        الحالة : <span>{TRIP_STATUS[status]}</span>
      </span>
      <div className={stl.controls}>
        <Link
          className={stl.blueBtn}
          to={`/manage/trip/${tripId}`}
          state={{ isToday: isToday }}
        >
          مشاهدة
        </Link>
        <button
          onClick={() => {
            showModal(tripId);
            setDriverId(driverId);
          }}
          disabled={!isToday || !canEdit || status === "0" || status === "3"}
        >
          ربط
        </button>
      </div>
    </div>
  );
};

export default Trip;
