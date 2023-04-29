import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as types from "../../../../store/types";
import { getExpenseReport } from "../../../../store/actions/reportsActions";
import { getExpensesCategory } from "../../../../store/actions/expensesActions";

import Layout from "../../../../Components/Layout/Layout";
import Login from "../../../Login/Login";
import ReportsFilters from "../../../../Components/Reports/ReportsFilters/ReportsFilters";
import ReportsCard from "../../../../Components/Reports/ReportsCard/ReportsCard";
import Header from "../../Components/Header/Header";
import SelectGroup from "../../../../Components/SelectGroup/SelectGroup";
import Loader from "../../../../Components/Loader/Loader";

import stl from "./ExpenseReport.module.css";

const ExpenseReport = () => {
  const loading = useSelector((state) => state.common.isLoading);
  const data = useSelector((state) => state.reports.expenseReport);
  const finalBalance = useSelector(
    (state) => state.reports.expenseReportFinalBalance
  );
  const oldBalance = useSelector(
    (state) => state.reports.expenseReportOldBalance
  );
  const expensesCategory = useSelector(
    (state) => state.expenses.expensesCategory
  );

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [values, setValues] = useState({
    expenseCat: "",
    expenseType: "",
  });
  const [errors, setErrors] = useState({
    expenseCat: "",
    expenseType: "",
  });
  const [expenseType, setExpenseType] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((pre) => ({ ...pre, [name]: value }));

    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!values.expenseCat) errors.expenseCat = "يجب اختيار فئة الايراد";
    if (!values.expenseType) errors.expenseType = "يجب اختيار نوع الايراد";

    return errors;
  };

  const handleSearch = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      return setErrors((pre) => ({ ...pre, ...errors }));
    }

    dispatch(
      getExpenseReport(
        values.expenseType,
        fromDate.toDateString(),
        toDate.toDateString(),
        () => setIsSearched(true)
      )
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    dispatch(getExpensesCategory());

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!values.expenseCat) return;
    const expenseType = expensesCategory.find(
      (item) => item.id === +values.expenseCat
    )?.category;

    setExpenseType(expenseType);
  }, [values.expenseCat]);

  useEffect(() => {
    return () => {
      dispatch({ type: types.GET_EXPENSE_REPORT, payload: [] });
      setIsSearched(false);
    };
  }, []);

  return (
    <Layout hideBeardcrumb manage>
      <Header
        hideButton
        title="تقرير المصروفات"
        className={stl.header}
        showBack
        navigate={() => navigate("/manage")}
      />
      <ReportsFilters
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        onClick={handleSearch}
      >
        <div className={stl.selectWrapper}>
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
            error={errors.expenseCat}
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
        </div>
      </ReportsFilters>
      {loading ? (
        <Loader />
      ) : !Object.entries(data).length && isSearched ? (
        <h2>لا يوجد نتائج</h2>
      ) : Object.entries(data).length ? (
        <>
          {/* <div className={stl.titleBox}>
            <span>الرصيد المدور</span>
            <strong>{oldBalance} دينار</strong>
          </div> */}
          {Object.entries(data).map((item, i) => {
            const year = item[0];
            const data = item[1];

            return (
              <React.Fragment key={i}>
                <div className={stl.year}>{year}</div>
                {data.map((item, i) => {
                  return (
                    <ReportsCard
                      key={i}
                      color={+item?.total_price > 0 ? "blue" : "red"}
                      date={item?.date_view}
                      recordType={item.description}
                      recordDate="20/20/2020"
                      recordNum={item?.bond_no}
                      recordValue={item?.total_price}
                      currentCredit={item?.remaining}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}

          <div className={stl.titleBox}>
            <span>الرصيد النهائي</span>
            <strong className={` ${finalBalance > 0 ? stl.green : stl.red}`}>
              {finalBalance} دينار
            </strong>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default ExpenseReport;
