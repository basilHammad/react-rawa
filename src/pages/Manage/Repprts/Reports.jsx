import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Login from "../../Login/Login";
import ReportsFilters from "../../../Components/Reports/ReportsFilters/ReportsFilters";
import ReportsCard from "../../../Components/Reports/ReportsCard/ReportsCard";
import Header from "../Components/Header/Header";
import * as types from "../../../store/types";

import stl from "./Reports.module.css";
import SelectGroup from "../../../Components/SelectGroup/SelectGroup";
import { getRevenueCategory } from "../../../store/actions/revenuesActions";
import SearchInput from "../../../Components/SearchInput/SearchInput";
import {
  getClients,
  getEmployees,
  getSuppliers,
} from "../../../store/actions/expensesActions";
import { getAccountStatements } from "../../../store/actions/reportsActions";
import Loader from "../../../Components/Loader/Loader";

const BENEFICIARY_TYPES = [
  { id: 1, text: "مورد", value: "1" },
  { id: 2, text: "عميل", value: "2" },
  { id: 3, text: "موظف", value: "3" },
];

const Reports = () => {
  const clients = useSelector((state) => state.common.clients);
  const suppliers = useSelector((state) => state.expenses.suppliers);
  const employees = useSelector((state) => state.expenses.employees);
  const loading = useSelector((state) => state.common.isLoading);
  const data = useSelector((state) => state.reports.accountStatement);
  const finalBalance = useSelector(
    (state) => state.reports.accountStatementFinalBalance
  );
  const oldBalance = useSelector(
    (state) => state.reports.accountStatementOldBalance
  );

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

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [values, setValues] = useState({
    beneficiary: "",
    beneficiaryType: "",
  });
  const [errors, setErrors] = useState({
    beneficiary: "",
    beneficiaryType: "",
  });
  const [options, setOptions] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameSelect = (option) => {
    setSelectedName(option.name);
    setName(option.name);
    setClientId(option.id);
    setErrors((pre) => ({ ...pre, beneficiary: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((pre) => ({ ...pre, [name]: value }));

    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    const filteredNames = options.filter((option) =>
      option.name.includes(value)
    );
    setOptions(filteredNames);
    setName(value);
    setSelectedName("");
    setErrors((pre) => ({ ...pre, beneficiary: "" }));

    if (!value && values.beneficiaryType === "1") setOptions(updatedSuppliers);
    if (!value && values.beneficiaryType === "2") setOptions(updatedClients);
    if (!value && values.beneficiaryType === "3") setOptions(updatedEmployees);
  };

  const handleRemoveSelection = () => {
    setSelectedName("");
    setName("");
    setClientId("");
    setErrors((pre) => ({ ...pre, beneficiary: "" }));

    if (values.beneficiaryType === "1") setOptions(updatedSuppliers);
    if (values.beneficiaryType === "2") setOptions(updatedClients);
    if (values.beneficiaryType === "3") setOptions(updatedEmployees);
  };

  const validate = () => {
    const errors = {};
    if (!values.beneficiaryType) errors.beneficiaryType = "يجب اختيار النوع";
    if (!selectedName) errors.beneficiary = "يجب اختيار الاسم";

    return errors;
  };

  const handleSearch = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      return setErrors((pre) => ({ ...pre, ...errors }));
    }
    dispatch(
      getAccountStatements(
        values.beneficiaryType,
        clientId,
        fromDate.toDateString(),
        toDate.toDateString()
      )
    );
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setToDate(fromDate);
  }, [fromDate]);

  useEffect(() => {
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

  useEffect(() => {
    return () => {
      dispatch({ type: types.GET_ACCOUNT_STATEMENT, payload: [] });
    };
  }, []);

  console.log("finalbalance", typeof finalBalance);

  return isAdmin ? (
    <Layout hideBeardcrumb manage>
      <Header hideButton title="كشف حساب" className={stl.header} />
      <ReportsFilters
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        onClick={handleSearch}
      >
        <div className={stl.selectWrapper}>
          <SelectGroup
            name="beneficiaryType"
            // label="النوع"
            id="beneficiaryType"
            firstOption="النوع"
            options={BENEFICIARY_TYPES}
            value={values.beneficiaryType}
            onChange={handleInputChange}
            error={errors.beneficiaryType}
            className={stl.selectGroup}
          />

          <SearchInput
            name="Beneficiaries"
            value={name}
            onChange={handleNameChange}
            options={options}
            handleSelect={handleNameSelect}
            selectedOption={selectedName}
            removeSelection={handleRemoveSelection}
            // label="اسم المستفيد"
            disabled={!options.length ? true : false}
            placeholder={"الاسم"}
            error={errors.beneficiary}
            className={stl.searchInput}
          />
        </div>
      </ReportsFilters>
      {loading ? (
        <Loader />
      ) : !Object.entries(data).length ? (
        ""
      ) : (
        <>
          <div className={stl.titleBox}>
            <span>الرصيد المدور</span>
            <strong>{oldBalance} دينار</strong>
          </div>
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
                      date={item?.transaction_date}
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
      )}
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default Reports;
