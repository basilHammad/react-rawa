import { MdOutlineHome } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import stl from "./Layout.module.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);
  return (
    <>
      <header className={stl.haeder}>
        <div className={`container ${stl.wrapper}`}>
          <div className={stl.logoWrapper}>
            <img src="/assets/images/logo.svg" alt="rawa-logo" />
          </div>
          <div className={stl.client}>
            <img src="/assets/images/logo.svg" alt="" />
            <strong>نقاء </strong>
          </div>
          {location.pathname !== "/" && (
            <MdOutlineHome
              className={stl.homeIcon}
              size={28}
              onClick={() => navigate("/")}
            />
          )}
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
