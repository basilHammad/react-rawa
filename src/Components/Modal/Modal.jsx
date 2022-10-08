import { Fragment } from "react";
import { createPortal } from "react-dom";

import { MdClose } from "react-icons/md";

import stl from "./Modal.module.css";

const Modal = ({ children, show, close, validate }) => {
  const modal = show && (
    <div className={`${stl.wrapper} `} onClick={close}>
      <div className={`container ${stl.modal} ${validate ? stl.validate : ""}`}>
        {children}
        <button onClick={close} className={stl.close}>
          <MdClose size={24} />
        </button>
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
