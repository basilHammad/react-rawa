import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CalendarGroup from "../../../../Components/Calendar/CalendarGroup";
import InputGroup from "../../../../Components/InputGroup/InputGroup";

import Layout from "../../../../Components/Layout/Layout";
import MainBtn from "../../../../Components/MainBtn/MainBtn";
import SearchInput from "../../../../Components/SearchInput/SearchInput";
import SelectGroup from "../../../../Components/SelectGroup/SelectGroup";
import TextareaGroup from "../../../../Components/TextareaGroup/TextareaGroup";
import {
  addExpense,
  getEmployees,
  getExpensesCategory,
  getSuppliers,
  getClients,
} from "../../../../store/actions/expensesActions";
import Login from "../../../Login/Login";

import stl from "./ExpensesAdd.module.css";

const expense_type = [
  { id: 1, text: "test", value: "1" },
  { id: 2, text: "test", value: "2" },
  { id: 3, text: "test", value: "3" },
  { id: 4, text: "test", value: "4" },
];

const BENEFICIARY_TYPES = [
  { id: 1, text: "مورد", value: "1" },
  { id: 2, text: "عميل", value: "2" },
  { id: 3, text: "موظف", value: "3" },
  { id: 4, text: "اخرى", value: "4" },
];

const ExpensesAdd = () => {
  const clients = useSelector((state) => state.common.clients);
  const suppliers = useSelector((state) => state.expenses.suppliers);
  const employees = useSelector((state) => state.expenses.employees);
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const updatedClients = clients.map((client) => ({
    name: client.user_name,
    id: client.id,
    mobile: client.mobile_number,
    location: client.address_description,
  }));

  const updatedSuppliers = suppliers.map((supplier) => ({
    name: supplier.name,
    id: supplier.id,
    mobile: supplier.phone,
    location: "",
  }));

  const updatedEmployees = employees.map((employee) => ({
    name: employee.full_name,
    id: employee.id,
    mobile: employee.phone,
    location: "",
  }));

  const [values, setValues] = useState({
    amount: "",
    bondNo: "",
    note: "",
    beneficiary: "",
    beneficiaryNum: "",
    expenseCat: "",
    expenseType: "",
    beneficiaryType: "",
  });
  const [errors, setErrors] = useState({
    amount: "",
    beneficiary: "",
    expenseType: "",
    beneficiaryType: "",
  });
  const [date, setDate] = useState(new Date());
  const [expenseType, setExpenseType] = useState([]);
  const [name, setName] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [clientId, setClientId] = useState("");

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const expensesCategory = useSelector(
    (state) => state.expenses.expensesCategory
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));

    if (name === "expenseCat") {
      setValues((pre) => ({ ...pre, expenseType: "" }));
    }

    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!values.amount.trim()) errors.amount = "يجب ادخال القيمة";
    if (!values.expenseType) errors.expenseType = "يجب ادخال نوع المصروف";
    if (!values.beneficiaryType)
      errors.beneficiaryType = "يجب ادخال نوع المستفيد";
    if (!selectedName && values.beneficiaryType != 4)
      errors.beneficiary = "يجب ادخال اسم المستفيد";
    if (!values.beneficiary && values.beneficiaryType == 4)
      errors.beneficiary = "يجب ادخال اسم المستفيد";

    return errors;
  };

  const handleAddExpenses = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }
    dispatch(
      addExpense(values, clientId, date.toDateString(), selectedName, () =>
        navigate("/manage/expenses")
      )
    );
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    const filteredNames = options.filter((option) =>
      option.name.includes(value)
    );
    setOptions(filteredNames);
    setName(value);
    setSelectedName("");

    if (!value && values.beneficiaryType === "1") setOptions(updatedSuppliers);
    if (!value && values.beneficiaryType === "2") setOptions(updatedClients);
    if (!value && values.beneficiaryType === "3") setOptions(updatedEmployees);
  };

  const handleNameSelect = (option) => {
    console.log("first", option);
    setSelectedName(option.name);
    setName(option.name);
    setClientId(option.id);
    setErrors((pre) => ({ ...pre, beneficiary: "" }));
    setValues((pre) => ({ ...pre, beneficiaryNum: option.mobile }));
  };

  const handleRemoveSelection = () => {
    setSelectedName("");
    setName("");
    setClientId("");

    if (values.beneficiaryType === "1") setOptions(updatedSuppliers);
    if (values.beneficiaryType === "2") setOptions(updatedClients);
    if (values.beneficiaryType === "3") setOptions(updatedEmployees);
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");

    dispatch(getExpensesCategory());
  }, [isLoggedin, navigate]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("add-expenses")) navigate("/unauthorized");
  }, [permissions]);

  useEffect(() => {
    if (!values.expenseCat) return;
    const expenseType = expensesCategory.find(
      (item) => item.id === +values.expenseCat
    )?.category;

    setExpenseType(expenseType);
  }, [values.expenseCat]);

  useEffect(() => {
    if (!values.beneficiaryType || values.beneficiaryType === "4") return;
    if (values.beneficiaryType === "1") {
      dispatch(getSuppliers(10000));
      return;
    }
    if (values.beneficiaryType === "2") {
      dispatch(getClients(1, null, null, 10000));
      return;
    }
    if (values.beneficiaryType === "3") {
      dispatch(getEmployees(10000));
      return;
    }
  }, [values.beneficiaryType]);

  useEffect(() => {
    if (values.beneficiaryType) {
      setName("");
      setSelectedName("");
      setClientId("");
    }
    if (!values.beneficiaryType || values.beneficiaryType === "4") return;
    if (values.beneficiaryType === "1") {
      setOptions(updatedSuppliers);
      return;
    }
    if (values.beneficiaryType === "2") {
      setOptions(updatedClients);
      return;
    }

    if (values.beneficiaryType === "3") {
      setOptions(updatedEmployees);

      return;
    }
  }, [values.beneficiaryType, suppliers, clients, employees]);

  return (
    <Layout manage>
      <div className={stl.wrapper}>
        <h2>اضافة مصروف جديد</h2>

        <SelectGroup
          name="expenseCat"
          label="فئة المصروف"
          id="expense-cat"
          firstOption="فئة المصروف"
          options={expensesCategory.map((item) => ({
            id: item.id,
            text: item.name,
            value: item.id,
          }))}
          value={values.expenseCat}
          onChange={handleInputChange}
          disabled={expensesCategory.length ? false : true}
        />

        <SelectGroup
          name="expenseType"
          label="نوع المصروف"
          id="expense-type"
          firstOption="نوع المصروف"
          options={expenseType.map((item) => ({
            id: item.id,
            text: item.description,
            value: item.id,
          }))}
          value={values.expenseType}
          onChange={handleInputChange}
          disabled={values.expenseCat ? false : true}
          error={errors.expenseType}
        />

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

        <SelectGroup
          name="beneficiaryType"
          label="نوع المستفيد"
          id="beneficiaryType"
          firstOption="نوع المستفيد"
          options={BENEFICIARY_TYPES}
          value={values.beneficiaryType}
          onChange={handleInputChange}
          error={errors.beneficiaryType}
        />

        {values.beneficiaryType && values.beneficiaryType === "4" ? (
          <InputGroup
            type="text"
            id="beneficiary"
            label="المستفيد"
            placeholder="ادخل اسم المستفيد"
            name="beneficiary"
            value={values.beneficiary}
            onChange={handleInputChange}
            error={errors.beneficiary}
          />
        ) : (
          <SearchInput
            name="Beneficiaries"
            value={name}
            onChange={handleNameChange}
            options={options}
            handleSelect={handleNameSelect}
            selectedOption={selectedName}
            removeSelection={handleRemoveSelection}
            label="اسم المستفيد"
            disabled={!options.length ? true : false}
            placeholder={"اسم المستفيد"}
            error={errors.beneficiary}
          />
        )}

        {values.beneficiaryType === "4" && (
          <InputGroup
            type="tel"
            id="beneficiary-num"
            label="رقم جوال المستفيد"
            placeholder="ادخل رقم المستفيد"
            name="beneficiaryNum"
            value={values.beneficiaryNum}
            onChange={handleInputChange}
          />
        )}

        <TextareaGroup
          id="note"
          label="ملاحظات"
          name="note"
          placeholder="ملاحظاتك"
          value={values.note}
          onChange={handleInputChange}
        />

        <MainBtn loading={postLoading} onClick={handleAddExpenses}>
          اضافة
        </MainBtn>
      </div>
    </Layout>
  );
};

export default ExpensesAdd;
