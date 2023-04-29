import Checkbox from "../../Checkbox/Checkbox";
import MainBtn from "../../MainBtn/MainBtn";
import SelectGroup from "../../SelectGroup/SelectGroup";
import stl from "./Step2.module.css";

const DAYS = [
  { name: "الاحد", id: 1 },
  { name: "الاثنين", id: 2 },
  { name: "الثلاثاء", id: 3 },
  { name: "الاربعاء", id: 4 },
  { name: "الخميس", id: 5 },
  { name: "الجمعة", id: 6 },
  { name: "السبت", id: 7 },
];

const hours = [
  { text: "00:00", value: "00:00", id: 1 },
  { text: "01:00", value: "01:00", id: 2 },
  { text: "02:00", value: "02:00", id: 3 },
  { text: "03:00", value: "03:00", id: 4 },
  { text: "04:00", value: "04:00", id: 5 },
  { text: "05:00", value: "05:00", id: 6 },
  { text: "06:00", value: "06:00", id: 7 },
  { text: "07:00", value: "07:00", id: 8 },
  { text: "08:00", value: "08:00", id: 9 },
  { text: "09:00", value: "09:00", id: 10 },
  { text: "10:00", value: "10:00", id: 11 },
  { text: "11:00", value: "11:00", id: 12 },
  { text: "12:00", value: "12:00", id: 13 },
  { text: "13:00", value: "13:00", id: 14 },
  { text: "14:00", value: "14:00", id: 15 },
  { text: "15:00", value: "15:00", id: 16 },
  { text: "16:00", value: "16:00", id: 17 },
  { text: "17:00", value: "17:00", id: 18 },
  { text: "18:00", value: "18:00", id: 19 },
  { text: "19:00", value: "19:00", id: 20 },
  { text: "21:00", value: "21:00", id: 21 },
  { text: "22:00", value: "22:00", id: 22 },
  { text: "23:00", value: "23:00", id: 23 },
  { text: "24:00", value: "24:00", id: 24 },
];

const Step2 = ({
  selectedDays,
  onChangeDayChange,
  onTimeChange,
  time,
  setErrors,
  setStep,
  errors,
}) => {
  const validate = () => {
    const errors = {};
    if (!selectedDays.length)
      errors.selectedDays = "يجب اختيار يوم واحد على الاقل";
    if (!time) errors.time = "يجب اختيار وقت البدا";

    return errors;
  };

  const handleSubmit = (e) => {
    const errors = validate();
    if (Object.keys(errors).length) {
      return setErrors((pre) => ({ ...pre, ...errors }));
    }

    setStep((pre) => pre + 1);
  };

  return (
    <div className={stl.wrapper}>
      <div className={stl.daysWrapper}>
        {DAYS.map((day) => (
          <Checkbox
            key={day.id}
            value={day.name}
            label={day.name}
            onChange={onChangeDayChange}
            checked={selectedDays.includes(day.name)}
            checkedColor="green"
          />
        ))}
        {errors.selectedDays && (
          <span className={stl.error}>{errors.selectedDays}</span>
        )}
      </div>

      <SelectGroup
        name="time"
        id="time"
        firstOption="اختيار وقت البدا"
        options={hours}
        value={time}
        onChange={onTimeChange}
        error={errors.time}
      />

      <MainBtn className={stl.btn} onClick={handleSubmit}>
        استمرار
      </MainBtn>
    </div>
  );
};

export default Step2;
