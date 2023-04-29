import { useRef } from "react";
import Select from "react-select";
import SelectSearch from "react-select-search";

import MainBtn from "../../MainBtn/MainBtn";

import stl from "./Step3.module.css";
import "react-select-search/style.css";

const Step3 = ({
  setSelectedCities,
  setSelectedAreas,
  selectedCities,
  selectedAreas,
  onSubmit,
  setErrors,
  errors,
  cities,
  areasOptions,
  trip,
}) => {
  const validate = () => {
    const errors = {};
    if (!selectedCities) errors.selectedCities = "يجب اختيار المدينة";
    if (!selectedAreas.length)
      errors.selectedAreas = "يجب اختيار منطقة واحدة على الاقل";

    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      return setErrors((pre) => ({ ...pre, ...errors }));
    }
    onSubmit();
  };
  return (
    <div className={stl.wrapper}>
      <Select
        onChange={(val) => {
          setSelectedCities(val.value);
          setErrors((pre) => ({ ...pre, selectedCities: "" }));
          setSelectedAreas([]);
        }}
        options={cities?.map((city) => ({ value: city.id, label: city.name }))}
        placeholder="اختر المدينة"
        defaultValue={trip ? { value: trip?.city_id, label: trip.city } : null}
      />
      {errors.selectedCities && (
        <span className={stl.error}>{errors.selectedCities}</span>
      )}
      <Select
        onChange={(areas) => {
          setSelectedAreas(areas);
          setErrors((pre) => ({ ...pre, selectedAreas: "" }));
        }}
        isMulti
        options={areasOptions?.map((area) => ({
          value: area.id,
          label: area.name,
        }))}
        placeholder="اختر المنطقة"
        defaultValue={trip?.areas.map((area) => ({
          value: area?.id,
          label: area?.name,
        }))}
        value={selectedAreas}
        // name="asd"
      />

      {console.log(selectedAreas)}

      {errors.selectedAreas && (
        <span className={stl.error}>{errors.selectedAreas}</span>
      )}

      <MainBtn className={stl.btn} onClick={handleSubmit}>
        استمرار
      </MainBtn>
    </div>
  );
};

export default Step3;
