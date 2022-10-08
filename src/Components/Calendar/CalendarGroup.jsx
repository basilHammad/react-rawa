import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { MdOutlineEditCalendar } from "react-icons/md";

import "react-calendar/dist/Calendar.css";
import stl from "./CalendarGroup.module.css";

const CalendarGroup = ({ label, onChange, value, minDate, className }) => {
  const [showCalender, setShowCalender] = useState(false);

  return (
    <div className={`${stl.calendarGroup} ${className ? className : ""}`}>
      <label>{label}</label>
      <div
        className={stl.calendarWrapper}
        onClick={() => setShowCalender(true)}
      >
        <div className={stl.placeholder}>
          {`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
        </div>
        <MdOutlineEditCalendar size={22} color="#0d83f8" className={stl.icon} />
        <Calendar
          minDate={minDate}
          onChange={onChange}
          value={value}
          className={`${stl.calendar} ${showCalender ? stl.show : ""}`}
          onClickDay={(date, e) => {
            e.stopPropagation();
            setShowCalender(false);
          }}
        />
      </div>
    </div>
  );
};

export default CalendarGroup;
