import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../../../Components/Layout/Layout";
import InputGroup from "../../../../Components/InputGroup/InputGroup";
import SelectGroup from "../../../../Components/SelectGroup/SelectGroup";
import TextareaGroup from "../../../../Components/TextareaGroup/TextareaGroup";
import MainBtn from "../../../../Components/MainBtn/MainBtn";
import Login from "../../../Login/Login";
import CalendarGroup from "../../../../Components/Calendar/CalendarGroup";
import SearchInput from "../../../../Components/SearchInput/SearchInput";
import { getClients } from "../../../../store/actions/commonActions";

import stl from "./RevenuesEdit.module.css";
import {
  editRevenue,
  getRevenueById,
  getRevenueCategory,
} from "../../../../store/actions/revenuesActions";
import Loader from "../../../../Components/Loader/Loader";

const revenue_type = [
  { id: 1, text: "test", value: "1" },
  { id: 2, text: "test", value: "2" },
  { id: 3, text: "test", value: "3" },
  { id: 4, text: "test", value: "4" },
];

const RevenuesEdit = () => {
  const revenueCategory = useSelector(
    (state) => state.revenues.revenueCategory
  );
  const clients = useSelector((state) => state.common.clients);
  const updatedClients = clients.map((client) => ({
    name: client.user_name,
    id: client.id,
    mobile: client.mobile_number,
    location: client.address_description,
  }));

  const postLoading = useSelector((state) => state.common.isPostLoading);
  const loading = useSelector((state) => state.auth.isLoading);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const [date, setDate] = useState(new Date());
  const [values, setValues] = useState({
    amount: "",
    bondNo: "",
    note: "",
    revenueType: "",
    revenueCat: "",
    clientType: "",
  });
  const [name, setName] = useState("");
  const [options, setOptions] = useState(updatedClients);
  const [selectedName, setSelectedName] = useState("");
  const [clientId, setClientId] = useState("");
  const [revenueTypes, setRevenueTypes] = useState([]);
  const [errors, setErrors] = useState({
    revenueType: "",
    amount: "",
  });

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const revenue = useSelector((state) => state.revenues.revenue);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((pre) => ({ ...pre, [name]: value }));

    if (name === "revenueCat") {
      setValues((pre) => ({ ...pre, revenueType: "" }));
    }

    if (name === "revenueType") {
      setErrors("");
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    const filteredNames = options.filter((option) =>
      option.name.includes(value)
    );
    setOptions(filteredNames);
    setName(value);
    setSelectedName("");

    setErrors((pre) => ({ ...pre, name: "" }));

    if (!value) setOptions(updatedClients);
  };

  const handleNameSelect = (option) => {
    setSelectedName(option.name);
    setName(option.name);
    setClientId(option.id);
  };

  const handleRemoveSelection = () => {
    setSelectedName("");
    setName("");
    setClientId("");

    setOptions(updatedClients);
  };

  const validate = () => {
    const errors = {};
    if (!values.revenueType) errors.revenueType = "يجب اختيار نوع الايراد";
    if (!values.amount.trim()) errors.amount = "يجب اختيار القيمة";

    if (values.revenueCat == "1" && values.revenueType == "2") {
      if (!clientId) errors.name = "يجب اختيار اسم العميل";
    }

    return errors;
  };

  const handleEditRevenue = () => {
    const errors = validate();

    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }
    dispatch(
      editRevenue(
        params.id,
        values.revenueType,
        values.note,
        date.toDateString(),
        values.amount,
        values.bondNo,
        clientId,
        () => navigate("/manage/revenues")
      )
    );
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
    dispatch(getClients(1, null, null, 10000));
    dispatch(getRevenueCategory());

    if (!params.id) return;
    dispatch(getRevenueById(params.id));
  }, [isLoggedin, navigate]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions.includes("edit-revenues")) navigate("/unauthorized");
  }, [permissions]);

  useEffect(() => {
    setOptions(updatedClients);
  }, [clients]);

  useEffect(() => {
    if (!Object.keys(revenue).length) return;

    setValues({
      amount: revenue.total_price,
      bondNo: revenue.bond_no,
      note: revenue.description,
      revenueType: revenue.revenue_category,
      revenueCat: revenue.revenue_parant,
    });

    setSelectedName(revenue.customer_name);
    setName(revenue.customer_name);
    setClientId(revenue.customer_id);

    setDate(new Date(revenue.transaction_date));
  }, [revenue]);

  useEffect(() => {
    if (!values.revenueCat) return;
    const revenuetypes = revenueCategory.find((item) => {
      return item.id === +values.revenueCat;
    })?.category;
    setRevenueTypes(revenuetypes);
  }, [values.revenueCat]);

  useEffect(() => {
    if (name || selectedName) setErrors((pre) => ({ ...pre, name: "" }));
  }, [name, selectedName]);

  return (
    <Layout manage>
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          <SelectGroup
            name="revenueCat"
            label="فئة الايراد"
            id="revenue-cat"
            firstOption="فئة الايراد"
            options={revenueCategory.map((item) => ({
              id: item.id,
              text: item.name,
              value: item.id,
            }))}
            value={values.revenueCat}
            onChange={handleInputChange}
            disabled={revenueCategory.length ? false : true}
          />

          <SelectGroup
            name="revenueType"
            label="نوع الايراد"
            id="revenue-type"
            firstOption="نوع الايراد"
            options={revenueTypes?.map((item) => ({
              id: item.id,
              text: item.description,
              value: item.id,
            }))}
            value={values.revenueType}
            onChange={handleInputChange}
            disabled={values.revenueCat ? false : true}
            error={errors.revenueType}
          />

          {values.revenueCat == "1" && values.revenueType == "2" && (
            <SearchInput
              name="clients"
              value={name}
              onChange={handleNameChange}
              options={options}
              handleSelect={handleNameSelect}
              selectedOption={selectedName}
              removeSelection={handleRemoveSelection}
              label="العميل"
              disabled={!clients.length ? true : false}
              error={errors.name}
            />
          )}

          <CalendarGroup label="التاريخ" value={date} onChange={setDate} />

          <InputGroup
            type="number"
            id="amount"
            label="القيمة"
            placeholder="ادخل القيمة"
            name="amount"
            value={values.amount}
            onChange={handleInputChange}
            error={errors.amount}
            min={0}
          />

          <InputGroup
            type="text"
            id="bond-no"
            label="رقم السند"
            placeholder="ادخل رقم السند"
            name="bondNo"
            value={values.bondNo}
            onChange={handleInputChange}
          />

          <TextareaGroup
            id="note"
            label="ملاحظات"
            name="note"
            value={values.note}
            placeholder="ملاحظاتك"
            onChange={handleInputChange}
          />

          <MainBtn loading={postLoading} onClick={handleEditRevenue}>
            تعديل
          </MainBtn>
        </div>
      )}
    </Layout>
  );
};

export default RevenuesEdit;
