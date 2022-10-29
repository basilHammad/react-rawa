import { NavLink } from "react-router-dom";
import stl from "./CustomeLink.module.css";

const CustomeLink = ({ text, to, className, icon }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        ` ${stl.link} ${isActive ? stl.active : ""} ${
          className ? className : ""
        }`
      }
      to={to}
    >
      <div>
        {icon && <img src={icon} />}
        {text}
      </div>
    </NavLink>
  );
};

export default CustomeLink;
