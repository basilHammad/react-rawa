import CalendarGroup from "../../Calendar/CalendarGroup";
import SelectGroup from "../../SelectGroup/SelectGroup";

import stl from "./ReportsFilters.module.css";

const ReportsFilters = ({
  children,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => {
  return (
    <div className={stl.wrapper}>
      <div className={stl.selectGroups}>{children}</div>
      <div className={stl.dateWrapper}>
        <strong>تحديد الفترة</strong>
        <CalendarGroup
          label="من"
          value={fromDate}
          onChange={setFromDate}
          className={stl.calender}
        />
        <CalendarGroup
          label="الى"
          value={toDate}
          onChange={setToDate}
          minDate={fromDate}
          className={stl.calender}
        />
      </div>
    </div>
  );
};

export default ReportsFilters;
