import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as types from "../../../../store/types";
import { getPurchaseReport } from "../../../../store/actions/reportsActions";

import Layout from "../../../../Components/Layout/Layout";
import Login from "../../../Login/Login";
import ReportsFilters from "../../../../Components/Reports/ReportsFilters/ReportsFilters";
import ReportsCard from "../../../../Components/Reports/ReportsCard/ReportsCard";
import Header from "../../Components/Header/Header";
import Loader from "../../../../Components/Loader/Loader";

import stl from "./PurchaseReport.module.css";

const PurchaseReport = () => {
  const loading = useSelector((state) => state.common.isLoading);
  const data = useSelector((state) => state.reports.purchaseReport);
  const finalBalance = useSelector(
    (state) => state.reports.purchaseReportFinalBalance
  );
  const oldBalance = useSelector(
    (state) => state.reports.purchaseReportOldBalance
  );

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(
      getPurchaseReport(fromDate.toDateString(), toDate.toDateString(), () =>
        setIsSearched(true)
      )
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
    if (!permissions?.includes("view-report")) navigate("/unauthorized");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    return () => {
      dispatch({ type: types.GET_PURCHASE_REPORT, payload: [] });
    };
  }, []);

  return (
    <Layout hideBeardcrumb manage>
      <Header
        hideButton
        title="تقرير المشتريات"
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
      />

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

export default PurchaseReport;
