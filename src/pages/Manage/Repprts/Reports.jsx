import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Login from "../../Login/Login";
import ReportsFilters from "../../../Components/Reports/ReportsFilters/ReportsFilters";
import ReportsCard from "../../../Components/Reports/ReportsCard/ReportsCard";
import Header from "../Components/Header/Header";

import stl from "./Reports.module.css";
import { useState } from "react";
import SelectGroup from "../../../Components/SelectGroup/SelectGroup";
import { getRevenueCategory } from "../../../store/actions/revenuesActions";

const Reports = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const revenueCategory = useSelector(
    (state) => state.revenues.revenueCategory
  );

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [values, setValues] = useState({
    revenueType: "",
    revenueCat: "",
  });
  const [revenueTypes, setRevenueTypes] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((pre) => ({ ...pre, [name]: value }));

    if (name === "revenueCat") {
      setValues((pre) => ({ ...pre, revenueType: "" }));
    }
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";
    dispatch(getRevenueCategory());
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setToDate(fromDate);
  }, [fromDate]);

  useEffect(() => {
    if (!values.revenueCat) return;
    const revenuetypes = revenueCategory.find(
      (item) => item.id === +values.revenueCat
    )?.category;
    setRevenueTypes(revenuetypes);
  }, [values.revenueCat]);

  return isAdmin ? (
    <Layout hideBeardcrumb manage>
      <Header hideButton title="ملخص الايرادات" className={stl.header} />
      <ReportsFilters
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
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
            className={stl.select}
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
            className={stl.select}
          />
        </div>
      </ReportsFilters>

      <ReportsCard
        color="red"
        date="10 حزيران"
        recordType="قوارير"
        recordDate="20/20/2020"
        recordNum="123586"
        recordValue="360.5"
        currentCredit="500"
      />
      <ReportsCard
        color="blue"
        date="10 حزيران"
        recordType="قوارير"
        recordDate="20/20/2020"
        recordNum="123586"
        recordValue="360.5"
        currentCredit="500"
      />
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default Reports;
