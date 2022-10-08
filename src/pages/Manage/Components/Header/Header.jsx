import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

import stl from "./Header.module.css";

const Header = ({
  title,
  path,
  isModal,
  onClick,
  hideButton,
  btnText,
  className,
}) => {
  return (
    <div className={`${stl.wrapper} ${className ? className : ""}`}>
      <h2>{title}</h2>
      {!hideButton ? (
        !isModal ? (
          <Link to={path} className={stl.link}>
            <MdAdd size={22} />
            <span>جديد</span>
          </Link>
        ) : (
          <button className={stl.link} onClick={onClick}>
            <MdAdd size={22} />
            <span>{btnText ? btnText : "جديد"}</span>
          </button>
        )
      ) : null}
    </div>
  );
};

export default Header;
