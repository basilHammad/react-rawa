import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdAdd } from "react-icons/md";

import CalendarGroup from "../../../../Components/Calendar/CalendarGroup";
import InputGroup from "../../../../Components/InputGroup/InputGroup";
import Layout from "../../../../Components/Layout/Layout";
import MainBtn from "../../../../Components/MainBtn/MainBtn";
import Login from "../../../Login/Login";
import Table from "../../Components/Table/Table";
import Modal from "../../../../Components/Modal/Modal";

import stl from "./PurchasesEdit.module.css";
import PurchaseModal from "../../../../Components/PurchaseModal/PurchaseModal";
import {
  addPurchase,
  addSubPurchase,
  deleteSubPurchase,
  editPurchase,
  editSubPurchase,
  getPurchaseById,
} from "../../../../store/actions/purchasesActions";
import SearchInput from "../../../../Components/SearchInput/SearchInput";
import { getSuppliers } from "../../../../store/actions/expensesActions";
import { getCodes } from "../../../../store/actions/commonActions";
import Loader from "../../../../Components/Loader/Loader";

const TITLES = ["الشرح", "الكمية", "سعر الوحدة", "الخصم", "الضريبة", "المجموع"];

function formatNumber(num) {
  if (!num) return "";
  const parsedNum = parseFloat(num);
  if (isNaN(parsedNum)) {
    return "Invalid input";
  }
  return parsedNum.toFixed(2);
}

const PurchasesEdit = () => {
  const suppliers = useSelector((state) => state.expenses.suppliers);
  const purchase = useSelector((state) => state.purchases.purchase);
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const codes = useSelector((state) => state.common.codes);
  const loading = useSelector((state) => state.common.isLoading);
  const permissions = useSelector(({ auth }) => auth.permissions);

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
    vat: ".16",
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

  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

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

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal(false);
    setEditMode(false);
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

  const handleDelete = (id) => {
    dispatch(deleteSubPurchase(id, () => dispatch(getPurchaseById(params.id))));
  };

  const handleModalSubmit = (e) => {
    const errors = validateModal();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }

    dispatch(
      addSubPurchase(params.id, values, () => {
        dispatch(getPurchaseById(params.id));
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

    dispatch(
      editSubPurchase(
        params.id,
        editedItemId,
        {
          billNum: values.billNum,
          discount: formatNumber(values.discount),
          explanation: values.explanation,
          quantity: values.quantity,
          supplier: values.supplier,
          total: formatNumber(values.total),
          unitPrice: formatNumber(values.unitPrice),
          vat: values.vat,
        },
        () => {
          dispatch(getPurchaseById(params.id));
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
        }
      )
    );
  };

  const handleMainBillEdit = () => {
    if (!values.billNum) {
      setErrors((pre) => ({ ...pre, billNum: "يجب اختيار رقم الفاتورة" }));
      return;
    }
    if (!clientId) {
      setErrors((pre) => ({ ...pre, clientId: "يجب اختيار المورد" }));
      return;
    }
    dispatch(
      editPurchase(
        params.id,
        values.billNum,
        date.toDateString(),
        clientId,
        () => {
          navigate("/manage/purchases");
        }
      )
    );
  };

  useEffect(() => {
    if (!values.unitPrice) return;
    setValues((pre) => ({
      ...pre,
      total: +values.quantity * +values.unitPrice - +values.discount,
    }));
  }, [values.quantity, values.unitPrice, values.discount]);

  useEffect(() => {
    if (!isLoggedin) navigate("/login");

    if (!params.id) {
      navigate("/manage/purchases");
      return;
    }

    dispatch(getPurchaseById(params.id));

    if (!suppliers.length) dispatch(getSuppliers(10000));
    // if (!Object.keys(codes).length) dispatch(getCodes());
  }, [isLoggedin, navigate]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("edit-purchases")) navigate("/unauthorized");
  }, [permissions]);

  // useEffect(() => {
  //   setOptions(updatedSuppliers);
  //   if (!Object.keys(purchase).length) return;

  //   const supplierName = updatedSuppliers?.find((supplier) => {
  //     return supplier.id == purchase.supplier_id;
  //   })?.name;

  //   setSelectedName(supplierName);
  //   setName(supplierName);
  // }, [suppliers]);

  useEffect(() => {
    if (!Object.keys(purchase).length) return;

    setValues((pre) => ({ ...pre, billNum: purchase.invoice_number }));

    setDate(new Date(purchase.invoice_date));

    setBillDetails(purchase.purchase_details);
    setClientId(purchase.supplier_id);
    setSelectedName(purchase.supplier_name);
    setName(purchase.supplier_name);
  }, [purchase]);

  console.log(billDetails);

  return (
    <Layout manage>
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          <h2>تعديل حركة مشتريات</h2>

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
                  canDelete
                  canEdit
                />
              </div>
            </>
          ) : null}

          <MainBtn loading={postLoading} onClick={handleMainBillEdit}>
            تعديل
          </MainBtn>
        </div>
      )}
      <Modal show={showModal} close={closeModal}>
        <PurchaseModal
          values={values}
          handleInputsChange={handleInputsChange}
          onSubmit={handleModalSubmit}
          errors={errors}
          editMode={editMode}
          onEdit={handleEdit}
          loading={postLoading}
        />
      </Modal>
    </Layout>
  );
};

export default PurchasesEdit;
