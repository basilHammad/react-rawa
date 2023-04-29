import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../store/actions/commonActions";
import { createUser, updateUser } from "../../store/actions/posActions";
import DaysSelect from "../DaysSelect/DaysSelect";
import Select from "react-select";

import InputGroup from "../InputGroup/InputGroup";
import MainBtn from "../MainBtn/MainBtn";
import SearchInput from "../SearchInput/SearchInput";
import SelectGroup from "../SelectGroup/SelectGroup";
import stl from "./ClientPopup.module.css";
import Checkbox from "../Checkbox/Checkbox";

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

const getToHours = (fromHour, hours) => {
  if (!fromHour) return hours;
  const updatedToHours = hours.filter((hour) => {
    const hoursMinutes = hour.value.split(/[.:]/);
    const hours = parseInt(hoursMinutes[0], 10);
    const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    const fromHourMinutes = fromHour.split(/[.:]/);
    const FromHour = parseInt(fromHourMinutes[0], 10);
    const FromMinutes = fromHourMinutes[1]
      ? parseInt(fromHourMinutes[1], 10)
      : 0;

    return hours + minutes / 60 > FromHour + FromMinutes / 60;
  });

  return updatedToHours;
};

const ClientPopup = ({
  closeClientModal,
  showSummaryModal,
  selectedDay,
  setSelectedDay,
  fromHour,
  setFromHour,
  toHour,
  setToHour,
  setClientName,
  clientId,
  setClientId,
  clientName,
  cities,
  isScheduled,
  setIsScheduled,
  order,
}) => {
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const clients = useSelector((state) => state.common.clients);
  const updatedClients = clients.map((client) => ({
    name: client.user_name,
    id: client.id,
    mobile: client.mobile_number,
    location: client.address_description,
    cityId: client.city_id,
    areaId: client.area_id,
    areaName: client.area,
    cityName: client.city,
  }));

  const [name, setName] = useState(clientName ? clientName : "");
  const [options, setOptions] = useState(updatedClients);
  const [selectedName, setSelectedName] = useState(
    clientName ? clientName : ""
  );
  const [canEditFields, setCanEditFields] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({
    name: "",
    mobile: "",
    location: "",
    cityId: "",
    areaId: "",
  });
  const [fieldsErrors, setFieldsErrors] = useState({
    name: "",
    mobile: "",
    location: "",
    cityId: "",
    areaId: "",
  });
  const [toHourOptions, setToHourOptions] = useState(hours);
  const [areasOptions, setAreasOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    const { value } = e.target;
    const filteredNames = options.filter((option) =>
      option.name.includes(value)
    );
    setOptions(filteredNames);
    setName(value);
    setSelectedName("");

    if (!value) setOptions(updatedClients);
  };

  const handleNameSelect = (option) => {
    setSelectedName(option.name);
    setName(option.name);
    setClientId(option.id);
    setCanEditFields(false);
    setFieldsValues({
      name: option.name,
      mobile: option.mobile,
      location: option.location ? option.location : "",
      cityId: option.cityId ? option.cityId : "",
      areaId: option.areaId ? option.areaId : "",
    });
    setFieldsErrors({
      name: "",
      mobile: "",
      location: "",
      cityId: "",
      areaId: "",
    });
    setClientName(option.name);

    setSelectedCity({ label: option.cityName, value: option.cityId });
    setSelectedArea({ label: option.areaName, value: option.areaId });
  };

  const handleRemoveSelection = () => {
    setSelectedName("");
    setName("");
    setCanEditFields(false);
    setFieldsValues({
      name: "",
      mobile: "",
      location: "",
      cityId: "",
      areaId: "",
    });
    setFieldsErrors({
      name: "",
      mobile: "",
      location: "",
      cityId: "",
      areaId: "",
    });

    setClientName("");
    setOptions(updatedClients);

    setSelectedCity(null);
    setSelectedArea(null);
  };

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setFieldsValues((pre) => ({ ...pre, [name]: value }));
    setFieldsErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleDayChange = (e) => {
    const { value } = e.target;
    if (selectedDay.includes(value)) {
      setSelectedDay((pre) => pre.filter((val) => val !== value));
      return;
    }

    setSelectedDay((pre) => [...pre, value]);
  };

  const handleSubmit = () => {
    // create user
    if (!selectedName) {
      const errors = validateNewUser();
      if (Object.keys(errors).length) {
        setFieldsErrors((pre) => ({ ...pre, ...errors }));
        return;
      }
      dispatch(
        createUser(
          fieldsValues,
          selectedCity.value,
          selectedArea.value,
          (name, id) => {
            setClientName(name);
            setClientId(id);
            closeClientModal();
            showSummaryModal();
            dispatch(getClients(1, null, null, 10000));
          }
        )
      );
      return;
    }

    // update user
    if (selectedName && canEditFields) {
      const errors = validateNewUser();
      if (Object.keys(errors).length) {
        setFieldsErrors((pre) => ({ ...pre, ...errors }));
        return;
      }
      dispatch(
        updateUser(
          fieldsValues,
          clientId,
          selectedCity.value,
          selectedArea.value,
          () => {
            closeClientModal();
            showSummaryModal();
          }
        )
      );
      return;
    }

    closeClientModal();
    showSummaryModal();
  };

  const validateNewUser = () => {
    let errors = {};
    if (!fieldsValues.name.trim()) errors.name = "يجب اختيار الاسم";
    if (!fieldsValues.location.trim()) errors.location = "يجب اختيار الموقع";
    if (!selectedCity) errors.cityId = "يجب اختيار المدينة";
    if (!selectedArea) errors.areaId = "يجب اختيار منطقة واحدة على الاقل";

    if (!fieldsValues.mobile.trim()) {
      errors.mobile = "يجب اختيار رقم الهاتف";
      return errors;
    }

    if (fieldsValues.mobile.trim().length !== 10) {
      errors.mobile = "يجب ان يكون رقم الهاتف مكون من عشر خانات";
      return errors;
    }
    if (!/^\d+$/.test(fieldsValues.mobile))
      errors.mobile = "يجب ان يتكون رقم الهاتف من ارقام فقط";

    return errors;
  };

  useEffect(() => {
    const toHoursOptions = getToHours(fromHour, hours);
    setToHourOptions(toHoursOptions);
  }, [fromHour]);

  useEffect(() => {
    if (!selectedCity) return;

    const city = cities.find((city) => city.id === selectedCity.value);

    setAreasOptions(city?.areas);
  }, [selectedCity]);

  useEffect(() => {
    if (!order) return;

    const client = updatedClients.find(
      (client) => client.id == order.customer_id
    );

    handleNameSelect(client);
    setSelectedCity({ label: client.cityName, value: client.cityId });
    setSelectedArea({ label: client.areaName, value: client.areaId });
  }, [order]);

  console.log(fieldsValues);

  return (
    <div className={stl.wrapper}>
      <form>
        <SearchInput
          name="clients"
          value={name}
          onChange={handleNameChange}
          options={options}
          handleSelect={handleNameSelect}
          selectedOption={selectedName}
          removeSelection={handleRemoveSelection}
          label="العميل"
        />

        <div className={stl.title}>
          <strong>{selectedName ? "معلوات العميل" : "عميل جديد"}</strong>
        </div>

        {selectedName && (
          <div className={stl.btnWrapper}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCanEditFields(true);
              }}
            >
              تعديل
              <MdModeEditOutline />
            </button>
          </div>
        )}

        <InputGroup
          type="text"
          id="name"
          label="الاسم"
          placeholder="ادخل الاسم"
          name="name"
          value={fieldsValues.name}
          onChange={handleFieldsChange}
          disabled={!canEditFields && selectedName}
          error={fieldsErrors.name}
        />

        <InputGroup
          type="number"
          id="mobile"
          label="رقم الجوال"
          placeholder="ادخل رقم الجوال"
          name="mobile"
          value={fieldsValues.mobile}
          onChange={handleFieldsChange}
          disabled={!canEditFields && selectedName}
          error={fieldsErrors.mobile}
        />

        {/* <SelectGroup
          name="cityId"
          id="city"
          firstOption="اختر المدينة"
          options={cities?.map((city) => ({
            text: city.name,
            value: city.id,
            id: city.id,
          }))}
          value={fieldsValues.cityId}
          onChange={handleFieldsChange}
          label="المدينة"
          disabled={!canEditFields && selectedName}
          error={fieldsErrors.cityId}
        /> */}

        <label className={stl.label}>المدينة</label>
        <Select
          onChange={(val) => {
            setSelectedCity(val);
            setSelectedArea(null);
            setFieldsErrors((pre) => ({ ...pre, cityId: "" }));
          }}
          options={cities?.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
          placeholder="اختر المدينة"
          value={selectedCity}
          isDisabled={!canEditFields && selectedName}
        />
        {fieldsErrors.cityId && (
          <span className={stl.error}>{fieldsErrors.cityId}</span>
        )}

        <label className={stl.label}>المنطقة</label>

        <Select
          onChange={(val) => {
            setSelectedArea(val);
            setFieldsErrors((pre) => ({ ...pre, areaId: "" }));
          }}
          options={areasOptions?.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
          placeholder="اختر المنطقة"
          value={selectedArea}
          isDisabled={!canEditFields && selectedName}
        />
        {fieldsErrors.areaId && (
          <span className={stl.error}>{fieldsErrors.areaId}</span>
        )}

        <InputGroup
          type="text"
          id="location"
          label="العنوان"
          placeholder="اختر العنوان"
          name="location"
          value={fieldsValues.location}
          onChange={handleFieldsChange}
          disabled={!canEditFields && selectedName}
          error={fieldsErrors.location}
        />

        <div className={stl.title}>
          <strong>وقت الاستلام</strong>
        </div>

        <div>
          <div className={stl.checkboxWrapper}>
            <label>هل تريد جدولة الطلب</label>
            <Checkbox
              value={isScheduled}
              label={"جدولة الطلب"}
              onChange={() => setIsScheduled((pre) => !pre)}
              checked={isScheduled}
              checkedColor="green"
              className={stl.checkbox}
            />
          </div>
          <DaysSelect
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            handleDayChange={handleDayChange}
          />

          <SelectGroup
            name="form"
            id="from"
            firstOption="من"
            options={hours}
            value={fromHour}
            onChange={(e) => setFromHour(e.target.value)}
            label="من"
          />

          <SelectGroup
            name="to"
            id="to"
            firstOption="الى"
            options={toHourOptions}
            value={toHour}
            onChange={(e) => setToHour(e.target.value)}
            label="الى"
          />
        </div>
      </form>

      <MainBtn
        className={stl.submit}
        onClick={handleSubmit}
        loading={postLoading}
      >
        استمرار
      </MainBtn>
    </div>
  );
};

export default ClientPopup;
