import { Link } from "react-router-dom";
import { MdAdd, MdModeEditOutline } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";

import stl from "./Header.module.css";

const Header = ({
  title,
  path,
  isModal,
  onClick,
  hideButton,
  btnText,
  className,
  showBack,
  navigate,
  showSecondBtn,
  secondBtnOnClick,
}) => {
  return (
    <div className={`${stl.wrapper} ${className ? className : ""}`}>
      <h2>
        {title}
        {showBack ? <MdKeyboardBackspace size={30} onClick={navigate} /> : null}
      </h2>
      {!hideButton ? (
        !isModal ? (
          <Link to={path} className={stl.link}>
            <MdAdd size={22} />
            <span>جديد</span>
          </Link>
        ) : (
          <div className={stl.btnWrapper}>
            {showSecondBtn && (
              <button className={stl.link} onClick={secondBtnOnClick}>
                <MdModeEditOutline size={22} />
                <span> تعديل</span>
              </button>
            )}
            <button className={stl.link} onClick={onClick}>
              <MdAdd size={22} />
              <span>{btnText ? btnText : "جديد"}</span>
            </button>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Header;
