import { useState } from "react";

import InputGroup from "../InputGroup/InputGroup";
import MainBtn from "../MainBtn/MainBtn";

import stl from "./PurchaseModal.module.css";

const PurchaseModal = ({
  values,
  handleInputsChange,
  onSubmit,
  errors,
  editMode,
  onEdit,
  loading,
}) => {
  return (
    <div className={stl.purchaseModal}>
      {/* <form> */}
      <div>
        <InputGroup
          type="text"
          id="explanation"
          label="الشرح"
          placeholder="الشرح"
          name="explanation"
          value={values.explanation}
          onChange={handleInputsChange}
          error={errors.explanation}
        />

        <InputGroup
          type="number"
          id="quantity"
          label="الكمية"
          placeholder="الكمية"
          name="quantity"
          value={values.quantity}
          onChange={handleInputsChange}
          error={errors.quantity}
          min={1}
        />

        <InputGroup
          type="number"
          id="unit-price"
          label="سعر الوحدة"
          placeholder="سعر الوحدة"
          name={"unitPrice"}
          value={values.unitPrice}
          onChange={handleInputsChange}
          error={errors.unitPrice}
          min={0}
        />

        <InputGroup
          type="number"
          id="discount"
          label="الخصم"
          placeholder="الخصم"
          name={"discount"}
          value={values.discount}
          onChange={handleInputsChange}
          min={0}
        />

        <InputGroup
          type="text"
          id="total"
          label="المجموع"
          name={"total"}
          value={values.total}
          onChange={handleInputsChange}
          disabled={true}
          placeholder="0"
        />

        <InputGroup
          type="text"
          id="vat"
          label="الضريبة"
          name="vat"
          value={values.vat}
          onChange={handleInputsChange}
          disabled
          placeholder={0.16}
        />
      </div>
      <MainBtn loading={loading} onClick={editMode ? onEdit : onSubmit}>
        {editMode ? "تعديل" : "اضافة"}
      </MainBtn>
      {/* </form> */}
    </div>
  );
};

export default PurchaseModal;
