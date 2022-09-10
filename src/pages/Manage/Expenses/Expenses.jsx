import { useState } from "react";
import { useSelector } from "react-redux";
import CalendarGroup from "../../../Components/Calendar/CalendarGroup";
import InputGroup from "../../../Components/InputGroup/InputGroup";

import Layout from "../../../Components/Layout/Layout";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import Navigation from "../../../Components/Navigation/Navigation";
import SelectGroup from "../../../Components/SelectGroup/SelectGroup";
import TextareaGroup from "../../../Components/TextareaGroup/TextareaGroup";
import Login from "../../Login/Login";

import stl from "./Expenses.module.css";

const links = [
  { text: "الايرادات", path: "/manage/revenues" },
  { text: "المصروفات", path: "/manage/expenses" },
];

const expense_type = [
  { id: 1, text: "test", value: "1" },
  { id: 2, text: "test", value: "2" },
  { id: 3, text: "test", value: "3" },
  { id: 4, text: "test", value: "4" },
];
const Expenses = () => {
  const [values, setValues] = useState({
    amount: "",
    bondNo: "",
    note: "",
    beneficiary: "",
    beneficiaryNum: "",
    expenseType: "",
    expense: "",
    beneficiaryType: "",
  });
  const [date, setDate] = useState(new Date());

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
  };

  return isAdmin ? (
    <Layout manage>
      <Navigation links={links} />

      <div className={stl.wrapper}>
        <SelectGroup
          name="expense"
          label="فئة المصروف"
          id="expense"
          firstOption="فئة المصروف"
          options={expense_type}
          value={values.expense}
          onChange={handleInputChange}
        />

        <SelectGroup
          name="expenseType"
          label="نوع المصروف"
          id="expense-type"
          firstOption="نوع المصروف"
          options={expense_type}
          value={values.expenseType}
          onChange={handleInputChange}
        />

        <CalendarGroup label="التاريخ" value={date} onChange={setDate} />

        <InputGroup
          type="text"
          id="amount"
          label="القيمة"
          placeholder="ادخل القيمة"
          name="amount"
          value={values.amount}
          onChange={handleInputChange}
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
          options={expense_type}
          value={values.beneficiaryType}
          onChange={handleInputChange}
        />

        <InputGroup
          type="text"
          id="beneficiary"
          label="المستفيد"
          placeholder="ادخل اسم المستفيد"
          name="beneficiary"
          value={values.beneficiary}
          onChange={handleInputChange}
        />

        <InputGroup
          type="tel"
          id="beneficiary-num"
          label="رقم جوال المستفيد"
          placeholder="ادخل رقم المستفيد"
          name="beneficiaryNum"
          value={values.beneficiaryNum}
          onChange={handleInputChange}
        />

        <TextareaGroup
          id="note"
          label="ملاحظات"
          name="note"
          placeholder="ملاحظاتك"
          value={values.note}
          onChange={handleInputChange}
        />

        <MainBtn onClick={() => {}}>استمرار</MainBtn>
      </div>
    </Layout>
  ) : (
    <Login manage />
  );
};

export default Expenses;
