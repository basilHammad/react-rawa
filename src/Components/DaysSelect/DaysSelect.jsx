import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import stl from "./DaysSelect.module.css";

const DAYS = [
  { name: "الاحد", id: 1 },
  { name: "الاثنين", id: 2 },
  { name: "الثلاثاء", id: 3 },
  { name: "الاربعاء", id: 4 },
  { name: "الخميس", id: 5 },
  { name: "الجمعة", id: 6 },
  { name: "السبت", id: 7 },
];

const DaysSelect = ({ selectedDay, setSelectedDay, handleDayChange }) => {
  const [showDays, setShowDays] = useState(false);

  const handleShowDays = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowDays((pre) => !pre);
  };

  return (
    <>
      <label className={stl.label}>اليوم</label>
      <div className={stl.wrapper} onClick={handleShowDays}>
        <span className={stl.placeholder}>
          {selectedDay.length
            ? selectedDay.map((day) => `${day} `)
            : "اختير اليوم"}
        </span>
        {showDays && (
          <div className={stl.daysWrapper}>
            {DAYS.map((day) => (
              <Checkbox
                key={day.id}
                value={day.name}
                label={day.name}
                onChange={handleDayChange}
                checked={selectedDay.includes(day.name)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DaysSelect;
