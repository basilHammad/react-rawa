import stl from "./ValidateModal.module.css";

const ValidateModal = ({ handleValidate, closeModal, isButtonDisabled }) => {
  return (
    <div className={stl.validateModal}>
      <p>هل انت متاكد</p>
      <div>
        <button disabled={isButtonDisabled} onClick={() => handleValidate()}>
          نعم
        </button>
        <button onClick={closeModal} className={stl.cancel}>
          الغاء
        </button>
      </div>
    </div>
  );
};

export default ValidateModal;
