import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../store/actions/posActions";
import DaysSelect from "../DaysSelect/DaysSelect";

import InputGroup from "../InputGroup/InputGroup";
import MainBtn from "../MainBtn/MainBtn";
import SearchInput from "../SearchInput/SearchInput";
import SelectGroup from "../SelectGroup/SelectGroup";
import stl from "./ClientPopup.module.css";

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
}) => {
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const clients = useSelector((state) => state.common.clients);
  const updatedClients = clients.map((client) => ({
    name: client.user_name,
    id: client.id,
    mobile: client.mobile_number,
    location: client.address_description,
  }));

  const [name, setName] = useState("");
  const [options, setOptions] = useState(updatedClients);
  const [selectedName, setSelectedName] = useState("");
  const [canEditFields, setCanEditFields] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({
    name: "",
    mobile: "",
    location: "",
  });
  const [fieldsErrors, setFieldsErrors] = useState({
    name: "",
    mobile: "",
    location: "",
  });
  const [toHourOptions, setToHourOptions] = useState(hours);

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
    });
    setFieldsErrors({
      name: "",
      mobile: "",
      location: "",
    });
    setClientName(option.name);
  };

  const handleRemoveSelection = () => {
    setSelectedName("");
    setName("");
    setCanEditFields(false);
    setFieldsValues({
      name: "",
      mobile: "",
      location: "",
    });
    setFieldsErrors({
      name: "",
      mobile: "",
      location: "",
    });

    setClientName("");
    setOptions(updatedClients);
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
        createUser(fieldsValues, (name, id) => {
          setClientName(name);
          setClientId(id);
          closeClientModal();
          showSummaryModal();
        })
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
        updateUser(fieldsValues, clientId, () => {
          closeClientModal();
          showSummaryModal();
        })
      );
      return;
    }

    closeClientModal();
    showSummaryModal();
  };

  const validateNewUser = () => {
    let errors = {};
    if (!fieldsValues.name.trim()) errors.name = "يجب اختيار الاسم";
    if (!fieldsValues.mobile.trim()) errors.mobile = "يجب اختيار رقم الهاتف";
    if (!fieldsValues.location.trim()) errors.location = "يجب اختيار الموقع";

    return errors;
  };

  useEffect(() => {
    const toHoursOptions = getToHours(fromHour, hours);
    setToHourOptions(toHoursOptions);
  }, [fromHour]);

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
          type="tel"
          id="mobile"
          label="رقم الجوال"
          placeholder="ادخل رقم الجوال"
          name="mobile"
          value={fieldsValues.mobile}
          onChange={handleFieldsChange}
          disabled={!canEditFields && selectedName}
          error={fieldsErrors.mobile}
        />

        <InputGroup
          type="text"
          id="location"
          label="الموقع"
          placeholder="اختر الموقع"
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
