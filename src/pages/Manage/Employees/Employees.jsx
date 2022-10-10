import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../../Components/InputGroup/InputGroup";

import Layout from "../../../Components/Layout/Layout";
import Loader from "../../../Components/Loader/Loader";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import Modal from "../../../Components/Modal/Modal";
import Pagination from "../../../Components/Pagination/Pagination";
import SelectGroup from "../../../Components/SelectGroup/SelectGroup";
import TextareaGroup from "../../../Components/TextareaGroup/TextareaGroup";
import {
  addEmployee,
  deleteEmployee,
  EditEmployee,
  getEmployees,
} from "../../../store/actions/commonActions";
import Login from "../../Login/Login";
import Header from "../Components/Header/Header";
import Search from "../Components/Search/Search";
import Table from "../Components/Table/Table";

import stl from "./Employees.module.css";

const TITLES = ["الاسم", "رقم الهاتف", "الوظيفة"];

const EMPLOYEES_TYPES = [
  { text: "سائق", value: 1, id: 1 },
  { text: "موظف", value: 2, id: 2 },
  { text: "عامل", value: 3, id: 3 },
];

const Employees = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.common.isLoading);
  const employees = useSelector((state) => state.common.employees);
  const totalPages = useSelector((state) => state.common.employeesTotalPages);
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    address: "",
    note: "",
    employeeType: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    address: "",
    note: "",
    employeeType: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [EditEmployeeId, setEditEmployeeId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchValues, setSearchValues] = useState({
    name: "",
    phone: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(
      deleteEmployee(id, () =>
        dispatch(
          getEmployees(
            page,
            searchValues.name,
            searchValues.phone,
            15,
            setSearchValues.type
          )
        )
      )
    );
  };

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal(false);
    setValues({
      name: "",
      mobile: "",
      address: "",
      note: "",
      employeeType: "",
    });

    setErrors({
      name: "",
      mobile: "",
      address: "",
      note: "",
      employeeType: "",
    });

    setEditEmployeeId(null);
    setEditMode(false);
  };

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleSearchValuesChange = (e) => {
    const { name, value } = e.target;
    setSearchValues((pre) => ({ ...pre, [name]: value }));
  };

  const handleModalEdit = (id) => {
    const foundModal = employees.find((employee) => employee.id === id);
    setValues({
      name: foundModal.name,
      mobile: foundModal.phone,
      address: foundModal.address,
      note: foundModal.description,
      employeeType: foundModal.type,
    });
    setShowModal(true);
    setEditEmployeeId(id);
    setEditMode(true);
  };

  const validate = () => {
    const errors = {};
    if (!values.name.trim()) errors.name = "يجب اختيار الاسم";

    if (!values.employeeType.trim()) {
      errors.employeeType = "يجب اختيار نوع الموظف";
    }

    if (!values.mobile.trim()) {
      errors.mobile = "يجب اختيار رقم الهاتف";
      return errors;
    }

    if (values.mobile.trim().length !== 10) {
      errors.mobile = "يجب ان يكون رقم الهاتف مكون من عشر خانات";
      return errors;
    }
    if (!/^\d+$/.test(values.mobile))
      errors.mobile = "يجب ان يتكون رقم الهاتف من ارقام فقط";

    return errors;
  };

  const handleEdit = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }
    dispatch(
      EditEmployee(EditEmployeeId, values, () => {
        dispatch(
          getEmployees(
            page,
            searchValues.name,
            searchValues.phone,
            15,
            searchValues.type
          )
        );
        setShowModal(false);
        setValues({
          name: "",
          mobile: "",
          address: "",
          note: "",
          employeeType: "",
        });

        setEditEmployeeId(null);
        setEditMode(false);
      })
    );
  };

  const handleAdd = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }
    dispatch(
      addEmployee(values, () => {
        setShowModal(false);
        setValues({
          name: "",
          mobile: "",
          address: "",
          note: "",
          employeeType: "",
        });
        dispatch(
          getEmployees(
            page,
            searchValues.name,
            searchValues.phone,
            15,
            searchValues.type
          )
        );
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      getEmployees(
        page,
        searchValues.name,
        searchValues.phone,
        15,
        searchValues.type
      )
    );
  };

  // const handleEmployeeTypeChange = (val) => {
  //   setEmployeeType(val);
  //   setEmployeeTypeError("");
  // };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");

    dispatch(
      getEmployees(
        page,
        searchValues.name,
        searchValues.phone,
        15,
        searchValues.type
      )
    );
  }, [isLoggedin, navigate, page]);

  return isAdmin ? (
    <Layout manage>
      <div className={stl.wrapper}>
        <Header
          title="الموظفين"
          path="/manage/Purchases/add"
          isModal
          onClick={() => setShowModal(true)}
        />
        <Search
          name={searchValues.name}
          phone={searchValues.phone}
          onChange={handleSearchValuesChange}
          onSubmit={handleSearch}
          options={EMPLOYEES_TYPES}
          type={searchValues.type}
          isEmp
        />
        {loading ? (
          <Loader />
        ) : Object.keys(employees).length && employees?.length ? (
          <>
            <Table
              titles={TITLES}
              data={employees.map((supplier) => ({
                name: supplier.name,
                phone: supplier.phone,
                // address: supplier.address,
                type:
                  supplier.type == "1"
                    ? "سائق"
                    : supplier.type == "2"
                    ? "موظف"
                    : supplier.type == "3"
                    ? "عامل"
                    : "",
                id: supplier.id,
              }))}
              deleteItem={handleDelete}
              path={"/manage/purchases/edit/"}
              handleModalEdit={handleModalEdit}
              modalEdit
            />
            {totalPages > 1 && (
              <Pagination
                totalPages={[...Array(totalPages)].map((_, i) => i + 1)}
                currentPage={page}
                loading={loading}
                setCurrentPage={setPage}
              />
            )}
          </>
        ) : (
          <h3 className={stl.noResults}>لا يوجد نتائج</h3>
        )}
      </div>
      <Modal show={showModal} close={closeModal}>
        <div className={stl.fieldsWrapper}>
          <InputGroup
            type="text"
            id="name"
            label="الاسم"
            placeholder="ادخل الاسم"
            name="name"
            value={values.name}
            onChange={handleFieldsChange}
            error={errors.name}
          />
          <InputGroup
            type="text"
            id="mobile"
            label="رقم الهاتف"
            placeholder="رقم الهاتف"
            name="mobile"
            value={values.mobile}
            onChange={handleFieldsChange}
            error={errors.mobile}
          />
          {/* <InputGroup
            type="text"
            id="address"
            label="العنوان"
            placeholder="العنوان"
            name="address"
            value={values.address}
            onChange={handleFieldsChange}
            error={errors.address}
          /> */}

          <SelectGroup
            name="employeeType"
            id="employeeType"
            firstOption="اختر نوع الموظف"
            options={EMPLOYEES_TYPES}
            value={values.employeeType}
            onChange={(e) => handleFieldsChange(e)}
            error={errors.employeeType}

            // className={stl.paymentType}
          />

          {/* <TextareaGroup
            id="note"
            label="ملاحظات"
            name="note"
            value={values.note}
            placeholder="ملاحظاتك"
            onChange={handleFieldsChange}
          /> */}
        </div>
        <MainBtn
          className={stl.submit}
          onClick={editMode ? handleEdit : handleAdd}
          loading={postLoading}
        >
          {editMode ? "تعديل" : "اضافة"}
        </MainBtn>
      </Modal>
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default Employees;
