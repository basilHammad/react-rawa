import { NavLink } from "react-router-dom";
import stl from "./CustomeLink.module.css";

const CustomeLink = ({ text, to }) => {
  return (
    // <Link to={to} className={stl.link}>
    //   {text}
    // </Link>

    <NavLink
      className={({ isActive }) => ` ${stl.link} ${isActive ? stl.active : ""}`}
      to={to}
    >
      {text}
    </NavLink>
  );
};

export default CustomeLink;
