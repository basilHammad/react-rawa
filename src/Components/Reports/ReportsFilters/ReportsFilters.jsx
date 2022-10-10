import CalendarGroup from "../../Calendar/CalendarGroup";
import MainBtn from "../../MainBtn/MainBtn";
import SelectGroup from "../../SelectGroup/SelectGroup";

import stl from "./ReportsFilters.module.css";

const ReportsFilters = ({
  children,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onClick,
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
          // maxDate={new Date()}
        />
        <CalendarGroup
          label="الى"
          value={toDate}
          onChange={setToDate}
          minDate={fromDate}
          className={stl.calender}
          // maxDate={new Date()}
        />
        <MainBtn className={stl.btn} onClick={onClick}>
          بحث
        </MainBtn>
      </div>
    </div>
  );
};

export default ReportsFilters;
