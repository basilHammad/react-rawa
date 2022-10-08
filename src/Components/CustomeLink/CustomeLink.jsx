import { NavLink } from "react-router-dom";
import stl from "./CustomeLink.module.css";

const CustomeLink = ({ text, to, className }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        ` ${stl.link} ${isActive ? stl.active : ""} ${
          className ? className : ""
        }`
      }
      to={to}
    >
      {text}
    </NavLink>
  );
};

export default CustomeLink;
