import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { MdOutlineEditCalendar } from "react-icons/md";

import "react-calendar/dist/Calendar.css";
import stl from "./CalendarGroup.module.css";

const CalendarGroup = ({ label, onChange, value }) => {
  const [showCalender, setShowCalender] = useState(false);

  function getParents(elem) {
    const parents = [];
    while (
      elem.parentNode &&
      elem.parentNode.nodeName.toLowerCase() != "body"
    ) {
      elem = elem.parentNode;
      parents.push(elem);
    }
    return parents;
  }

  useEffect(() => {
    const hideCalender = (e) => {
      let shouldHide;

      const parents = getParents(e.target);

      parents.forEach((parent) => {
        if (
          parent.classList.contains(stl.calendarWrapper) ||
          parent.classList.contains("react-calendar__year-view") ||
          parent.classList.contains("react-calendar__decade-view") ||
          e.target.classList.contains(stl.calendarWrapper)
        ) {
          shouldHide = true;
        }
      });

      if (shouldHide) return;
      setShowCalender(false);
    };
    document.addEventListener("click", hideCalender);

    return () => {
      document.removeEventListener("click", hideCalender);
    };
  }, []);

  return (
    <div className={stl.calendarGroup}>
      <label>{label}</label>
      <div
        className={stl.calendarWrapper}
        onClick={() => setShowCalender(true)}
      >
        <div className={stl.placeholder}>
          {`${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
        </div>
        <MdOutlineEditCalendar size={22} color="#0d83f8" className={stl.icon} />
        {/* {showCalender && ( */}
        <Calendar
          onChange={onChange}
          value={value}
          className={`${stl.calendar} ${showCalender ? stl.show : ""}`}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export default CalendarGroup;
