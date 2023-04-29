import { Link } from "react-router-dom";
import stl from "./ScheduledTripComp.module.css";

const ScheduledTripComp = ({ name, city, areas, days, driverName, id }) => {
  return (
    <Link to={`/manage/scheduledTrip/${id}`} className={stl.wrapper}>
      <strong className={stl.title}>اسم الرحلة : {name}</strong>
      {/* <div className={stl.flexBetween}> */}
      <span>
        المدينة : <span className={stl.blue}>{city}</span>
      </span>
      <span>
        المناطق :
        {areas.map((area) => (
          <span key={area} className={stl.blue}>
            {area + ", "}
          </span>
        ))}
      </span>
      <span>
        الايام :
        {days.map((day) => (
          <span key={day} className={stl.blue}>
            {day + ", "}
          </span>
        ))}
      </span>
      {/* </div> */}
      <div className={stl.flexBetween}>
        <span>
          السائق : <span>{driverName ? driverName : "لا يوجد"}</span>
        </span>
      </div>
    </Link>
  );
};

export default ScheduledTripComp;
