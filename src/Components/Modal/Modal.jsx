import { Fragment } from "react";
import { createPortal } from "react-dom";

import { MdClose } from "react-icons/md";

import stl from "./Modal.module.css";

const Modal = ({ children, show, close }) => {
  const modal = show && (
    <div className={stl.wrapper} onClick={close}>
      <div className={`container ${stl.modal}`}>
        {children}
        <MdClose size={24} onClick={close} className={stl.close} />
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
