import InputGroup from "../../InputGroup/InputGroup";
import MainBtn from "../../MainBtn/MainBtn";
import SelectGroup from "../../SelectGroup/SelectGroup";
import stl from "./Step1.module.css";

const Step1 = ({
  tripName,
  onChange,
  errors,
  onSubmit,
  drivers,
  driverId,
  setErrors,
  setStep,
}) => {
  const validate = () => {
    const errors = {};
    if (!tripName.trim()) errors.tripName = "يجب اختيار اسم الرحلة";
    if (!driverId) errors.driverId = "يجب اختيار السائق";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      return setErrors((pre) => ({ ...pre, ...errors }));
    }

    setStep((pre) => pre + 1);
  };
  return (
    <form onSubmit={handleSubmit} className={stl.from}>
      <strong>معلومات الرحلة</strong>
      <InputGroup
        type="text"
        id="trip-name"
        placeholder="اسم الرحلة"
        name="tripName"
        value={tripName}
        onChange={onChange}
        error={errors.tripName}
      />
      <SelectGroup
        name="driverId"
        id="drivers"
        firstOption="اختر السائق"
        options={drivers.map((driver) => ({
          text: driver.full_name,
          value: driver.id,
          id: driver.id,
        }))}
        value={driverId}
        onChange={onChange}
        error={errors.driverId}
      />
      <MainBtn className={stl.btn} type="submit">
        استمرار
      </MainBtn>
    </form>
  );
};

export default Step1;
