import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../../Components/InputGroup/InputGroup";

import Layout from "../../../Components/Layout/Layout";
import Loader from "../../../Components/Loader/Loader";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import Modal from "../../../Components/Modal/Modal";
import Pagination from "../../../Components/Pagination/Pagination";
import TextareaGroup from "../../../Components/TextareaGroup/TextareaGroup";
import {
  addClient,
  deleteClient,
  editClient,
  getClients,
} from "../../../store/actions/commonActions";
import Login from "../../Login/Login";
import Header from "../Components/Header/Header";
import Search from "../Components/Search/Search";
import Table from "../Components/Table/Table";

import stl from "./Clients.module.css";

const TITLES = ["الاسم", "رقم الهاتف", "العنوان"];

const Clients = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.common.isLoading);
  const clients = useSelector((state) => state.common.clients);
  const totalPages = useSelector((state) => state.common.clientsTotalPages);
  const postLoading = useSelector((state) => state.common.isPostLoading);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    address: "",
    note: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    address: "",
    note: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editClientId, seteditClientId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchValues, setSearchValues] = useState({
    name: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(
      deleteClient(id, () =>
        dispatch(getClients(page, searchValues.name, searchValues.phone))
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
    });

    seteditClientId(null);
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
    const foundModal = clients.find((supplier) => supplier.id === id);

    setValues({
      name: foundModal.name,
      mobile: foundModal.phone,
      address: foundModal.address_description,
      note: foundModal.description,
    });
    setShowModal(true);
    seteditClientId(id);
    setEditMode(true);
  };

  const validate = () => {
    const errors = {};
    if (!values.name.trim()) errors.name = "يجب اختيار الاسم";

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
      editClient(editClientId, values, () => {
        dispatch(getClients(page, searchValues.name, searchValues.phone));
        setShowModal(false);
        setValues({
          name: "",
          mobile: "",
          address: "",
          note: "",
        });

        seteditClientId(null);
        setEditMode(false);
      })
    );
  };

  // const handleEdit = () => {
  //       const errors = validate();
  //       if (Object.keys(errors).length) {
  //         setErrors((pre) => ({ ...pre, ...errors }));
  //         return;
  //       }

  // }

  const handleAdd = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }
    dispatch(
      addClient(values, () => {
        setShowModal(false);
        setValues({
          name: "",
          mobile: "",
          address: "",
          note: "",
        });
        dispatch(getClients(page, searchValues.name, searchValues.phone));
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getClients(page, searchValues.name, searchValues.phone));
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");

    dispatch(getClients(page, searchValues.name, searchValues.phone));
  }, [isLoggedin, navigate, page]);

  return isAdmin ? (
    <Layout manage>
      <div className={stl.wrapper}>
        <Header
          title="العملاء"
          path="/manage/Purchases/add"
          isModal
          onClick={() => setShowModal(true)}
        />
        <Search
          name={searchValues.name}
          phone={searchValues.phone}
          onChange={handleSearchValuesChange}
          onSubmit={handleSearch}
        />
        {loading ? (
          <Loader />
        ) : Object.keys(clients).length && clients?.length ? (
          <>
            <Table
              titles={TITLES}
              data={clients.map((supplier) => ({
                name: supplier.name,
                phone: supplier.phone,
                address: supplier.address_description,
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
          <InputGroup
            type="text"
            id="address"
            label="العنوان"
            placeholder="العنوان"
            name="address"
            value={values.address}
            onChange={handleFieldsChange}
            error={errors.address}
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

export default Clients;
