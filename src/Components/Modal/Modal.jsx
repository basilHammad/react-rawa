import { Fragment } from "react";
import { createPortal } from "react-dom";

import { MdClose } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";

import stl from "./Modal.module.css";

const Modal = ({ children, show, close, validate, className, back }) => {
  const modal = show && (
    <div className={`${stl.wrapper}`} onClick={close}>
      <div
        className={`container ${stl.modal} ${validate ? stl.validate : ""} ${
          className ? className : ""
        }`}
      >
        {children}
        <button onClick={close} className={stl.close}>
          <MdClose size={24} />
        </button>
        {back && (
          <button onClick={back} className={stl.back}>
            <MdKeyboardBackspace size={24} />
          </button>
        )}
      </div>
    </div>
  );
  return (
    <Fragment>
      {createPortal(modal, document.getElementById("modal-root"))}
    </Fragment>
  );
};

export default Modal;
