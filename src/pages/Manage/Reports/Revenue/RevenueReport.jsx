import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as types from "../../../../store/types";
import Layout from "../../../../Components/Layout/Layout";
import Login from "../../../Login/Login";
import ReportsFilters from "../../../../Components/Reports/ReportsFilters/ReportsFilters";
import ReportsCard from "../../../../Components/Reports/ReportsCard/ReportsCard";
import Header from "../../Components/Header/Header";
import SelectGroup from "../../../../Components/SelectGroup/SelectGroup";
import Loader from "../../../../Components/Loader/Loader";

import stl from "./RevenueReport.module.css";
import { getRevenueCategory } from "../../../../store/actions/revenuesActions";
import { getRevenueReport } from "../../../../store/actions/reportsActions";

const RevenueReport = () => {
  const loading = useSelector((state) => state.common.isLoading);
  const data = useSelector((state) => state.reports.revenueReport);
  const finalBalance = useSelector(
    (state) => state.reports.revenueReportFinalBalance
  );
  const oldBalance = useSelector(
    (state) => state.reports.revenueReportOldBalance
  );
  const revenueCategory = useSelector(
    (state) => state.revenues.revenueCategory
  );

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [values, setValues] = useState({
    revenueCat: "",
    revenueType: "",
  });
  const [errors, setErrors] = useState({
    revenueCat: "",
    revenueType: "",
  });
  const [revenueTypes, setRevenueTypes] = useState([]);
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
    if (!values.revenueCat) errors.revenueCat = "يجب اختيار فئة الايراد";
    if (!values.revenueType) errors.revenueType = "يجب اختيار نوع الايراد";

    return errors;
  };

  const handleSearch = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      return setErrors((pre) => ({ ...pre, ...errors }));
    }

    dispatch(
      getRevenueReport(
        values.revenueType,
        fromDate.toDateString(),
        toDate.toDateString(),
        () => setIsSearched(true)
      )
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    dispatch(getRevenueCategory());

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!values.revenueCat) return;
    const revenuetypes = revenueCategory.find(
      (item) => item.id === +values.revenueCat
    )?.category;
    setRevenueTypes(revenuetypes);
  }, [values.revenueCat]);

  useEffect(() => {
    return () => {
      dispatch({ type: types.GET_REVENUE_REPORT, payload: [] });
      setIsSearched(false);
    };
  }, []);

  return isAdmin ? (
    <Layout hideBeardcrumb manage>
      <Header
        hideButton
        title="تقرير الايرادات"
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
            error={errors.revenueCat}
          />

          <SelectGroup
            name="revenueType"
            label="نوع الايراد"
            id="revenue-type"
            firstOption="نوع الايراد"
            options={revenueTypes.map((item) => ({
              id: item.id,
              text: item.description,
              value: item.id,
            }))}
            value={values.revenueType}
            onChange={handleInputChange}
            disabled={values.revenueCat ? false : true}
            error={errors.revenueType}
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
  ) : (
    <Login validateAdmin />
  );
};

export default RevenueReport;
