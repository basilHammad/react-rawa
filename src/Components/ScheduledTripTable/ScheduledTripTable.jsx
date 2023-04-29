import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import stl from "./ScheduledTripTable.module.css";

const ScheduledTripTable = ({ tableContent }) => {
  return (
    <div className={stl.table}>
      <div className={`${stl.tableRow} ${stl.tableHead}`}>
        {tableContent.header.map((item, i) => (
          <div key={i} className={stl.tableCell}>
            {item}
          </div>
        ))}
      </div>
      {tableContent.data.map((item, i) => (
        <div key={i} className={`${stl.tableRow}`}>
          {Object.entries(item).map((customer, i) => {
            const key = customer[0];
            const value = customer[1];

            if (key === "location" && value?.lat && value?.lng) {
              return (
                <div key={i} className={stl.tableCell}>
                  <Link
                    to={`/manage/map/${value.lat}/${value.lng}`}
                    className={stl.iconWrapper}
                  >
                    <MdLocationOn size={22} />
                  </Link>
                </div>
              );
            }

            if (key === "location")
              return (
                <div key={i} className={stl.tableCell}>
                  -
                </div>
              );
            return (
              <div key={i} className={stl.tableCell}>
                {value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ScheduledTripTable;
