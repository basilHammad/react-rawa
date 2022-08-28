import CustomeLink from "../CustomeLink/CustomeLink";

import stl from "./Navigation.module.css";

const Navigation = ({ links }) => {
  return (
    <nav className={stl.nav}>
      {links.map((link, i) => (
        <CustomeLink key={i} text={link.text} to={link.path} />
      ))}
    </nav>
  );
};

export default Navigation;
