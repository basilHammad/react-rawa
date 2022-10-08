import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";

import CalendarGroup from "../../../../Components/Calendar/CalendarGroup";
import InputGroup from "../../../../Components/InputGroup/InputGroup";
import Layout from "../../../../Components/Layout/Layout";
import MainBtn from "../../../../Components/MainBtn/MainBtn";
import Login from "../../../Login/Login";
import Table from "../../Components/Table/Table";
import Modal from "../../../../Components/Modal/Modal";

import stl from "./PurchasesAdd.module.css";
import PurchaseModal from "../../../../Components/PurchaseModal/PurchaseModal";
import { addPurchase } from "../../../../store/actions/purchasesActions";
import SearchInput from "../../../../Components/SearchInput/SearchInput";
import { getSuppliers } from "../../../../store/actions/expensesActions";
import { getCodes } from "../../../../store/actions/commonActions";

const TITLES = ["الشرح", "الكمية", "سعر الوحدة", "الخصم", "المجموع", "الضريبة"];
const VAT = 0.16;

const PurchasesAdd = () => {
  const suppliers = useSelector((state) => state.expenses.suppliers);
  const codes = useSelector((state) => state.common.codes);

  const updatedSuppliers = suppliers.map((supplier) => ({
    name: supplier.name,
    id: supplier.id,
    mobile: supplier.phone,
    location: "",
  }));

  const [values, setValues] = useState({
    billNum: "",
    supplier: "",
    explanation: "",
    quantity: "",
    unitPrice: "",
    discount: "",
    total: "",
    vat: "",
  });
  const [date, setDate] = useState(new Date());
  const [billDetails, setBillDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(1);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);
  const [name, setName] = useState("");
  const [options, setOptions] = useState(updatedSuppliers);
  const [clientId, setClientId] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    const { value } = e.target;
    const filteredNames = options.filter((option) =>
      option.name.includes(value)
    );
    setOptions(filteredNames);
    setName(value);
    setSelectedName("");

    if (!value) setOptions(updatedSuppliers);
  };

  const handleNameSelect = (option) => {
    setSelectedName(option.name);
    setName(option.name);
    setClientId(option.id);
    setErrors((pre) => ({ ...pre, clientId: "" }));
  };

  const handleRemoveSelection = () => {
    setSelectedName("");
    setName("");
    setClientId("");
    setOptions(updatedSuppliers);
  };

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleDelete = (id) => {
    const billDetailsCopy = [...billDetails];
    const filtersDetails = billDetailsCopy.filter((item) => item.id !== id);

    setBillDetails(filtersDetails);
  };

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal(false);
    setEditMode(false);
    setValues((pre) => ({
      ...pre,
      explanation: "",
      quantity: "",
      unitPrice: "",
      discount: "",
      total: "",
    }));

    setErrors({});
  };

  const handleOpenModal = () => {
    if (!values.billNum) {
      setErrors((pre) => ({ ...pre, billNum: "يجب اختيار رقم الفاتورة" }));
      return;
    }
    setShowModal(true);
  };

  const validateModal = () => {
    const errors = {};
    if (!values.explanation.trim().length)
      errors.explanation = "يجب ادخال الشرح";
    if (!values.quantity.trim().length) errors.quantity = "يجب ادخال الكمية";
    if (!values.unitPrice.trim().length)
      errors.unitPrice = "يجب ادخال سعر الوحدة";

    return errors;
  };

  const handleModalSubmit = (e) => {
    const errors = validateModal();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }

    setBillDetails((pre) => [
      ...pre,
      {
        description: values.explanation,
        quantity: values.quantity,
        unit_price: values.unitPrice,
        discount: values.discount,
        total_price: values.total,
        tax: values.vat,
        id: id,
      },
    ]);

    setId((pre) => pre + 1);

    setValues((pre) => ({
      ...pre,
      explanation: "",
      quantity: "",
      unitPrice: "",
      discount: "",
      total: "",
      vat: "",
    }));

    setShowModal(false);
  };

  const handleSubmit = () => {
    if (!values.billNum) {
      setErrors((pre) => ({ ...pre, billNum: "يجب اختيار رقم الفاتورة" }));
      return;
    }
    if (!clientId) {
      setErrors((pre) => ({ ...pre, clientId: "يجب اختيار المورد" }));
      return;
    }

    dispatch(
      addPurchase(values, date.toDateString(), billDetails, clientId, () => {
        dispatch(getCodes());
        navigate("/manage/purchases");
      })
    );
  };

  const handleOpenEdit = (id) => {
    const editItem = billDetails.find((item) => item.id === id);

    setValues((pre) => ({
      ...pre,
      explanation: editItem.description,
      quantity: editItem.quantity,
      unitPrice: editItem.unit_price,
      discount: editItem.discount,
      total: editItem.total_price,
      vat: editItem.tax,
    }));

    setShowModal(true);
    setEditMode(true);
    setEditedItemId(id);
  };

  const handleEdit = () => {
    const errors = validateModal();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }

    let editItem = billDetails.find((item) => item.id === editedItemId);
    const editItemIndex = billDetails.indexOf(editItem);
    editItem = {
      description: values.explanation,
      quantity: values.quantity,
      unit_price: values.unitPrice,
      discount: values.discount,
      total_price: values.total,
      tax: values.vat,
      id: id,
    };

    const billDetailsCopy = [...billDetails];
    billDetailsCopy[editItemIndex] = editItem;

    setBillDetails(billDetailsCopy);

    setEditMode(false);
    setEditedItemId(null);

    setShowModal(false);
  };

  useEffect(() => {
    if (!values.unitPrice) return;
    const noneVatPrice =
      +values.quantity * +values.unitPrice - +values.discount;
    const vatPrice =
      (+values.quantity * +values.unitPrice - +values.discount) * VAT +
      noneVatPrice;

    const vat = (+values.quantity * +values.unitPrice - +values.discount) * VAT;

    setValues((pre) => ({
      ...pre,
      total: vatPrice,
      vat: vat,
    }));
  }, [values.quantity, values.unitPrice, values.discount]);

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
    if (!suppliers.length) dispatch(getSuppliers(10000));

    if (!Object.keys(codes).length) dispatch(getCodes());
  }, [isLoggedin, navigate]);

  useEffect(() => {
    setOptions(updatedSuppliers);
  }, [suppliers]);

  useEffect(() => {
    if (!Object.keys(codes).length) return;
    setValues((pre) => ({ ...pre, billNum: codes.purchase }));
  }, [codes]);

  return isAdmin ? (
    <Layout manage>
      <div className={stl.wrapper}>
        <h2>اضافة حركة مشتريات</h2>

        <InputGroup
          type="text"
          id="bill-num"
          label="رقم الفاتورة"
          placeholder="ادخل رقم الفاتورة"
          name="billNum"
          value={values.billNum}
          onChange={handleInputsChange}
          error={errors.billNum}
          disabled
        />

        <CalendarGroup label="التاريخ" value={date} onChange={setDate} />

        <SearchInput
          name="supplier"
          value={name}
          onChange={handleNameChange}
          options={options}
          handleSelect={handleNameSelect}
          selectedOption={selectedName}
          removeSelection={handleRemoveSelection}
          label="المورد"
          disabled={!options.length ? true : false}
          placeholder={"ادخل المورد"}
          error={errors.clientId}
        />

        <button className={stl.add} onClick={handleOpenModal}>
          <MdAdd size={22} />
          اضافة
        </button>

        {billDetails.length ? (
          <>
            <div className={stl.tableWrapper}>
              <Table
                titles={TITLES}
                data={billDetails}
                deleteItem={handleDelete}
                path={"/manage/expenses/edit/"}
                purchase
                editPurchase={handleOpenEdit}
                totalTotal={billDetails
                  .map((bill) => {
                    return +bill.total_price;
                  })
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  )}
                discountTotal={billDetails
                  .map((bill) => {
                    return +bill.discount;
                  })
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  )}
                vatTotal={billDetails
                  .map((bill) => {
                    return +bill.tax;
                  })
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  )}
                showTotals
              />
            </div>
          </>
        ) : null}

        <MainBtn onClick={handleSubmit}>اضافة</MainBtn>
      </div>
      <Modal show={showModal} close={closeModal}>
        <PurchaseModal
          values={values}
          handleInputsChange={handleInputsChange}
          onSubmit={handleModalSubmit}
          errors={errors}
          editMode={editMode}
          onEdit={handleEdit}
        />
      </Modal>
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default PurchasesAdd;
