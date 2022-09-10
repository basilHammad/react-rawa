import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDehaze } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

import stl from "./Layout.module.css";
import { useState } from "react";

const Layout = ({ children, hideHeader, manage }) => {
  const [showAside, setShowAside] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  const toggleMenu = () => {
    setShowAside((pre) => !pre);
  };

  return (
    <>
      {!hideHeader && (
        <>
          <header className={stl.haeder}>
            <div className={`container ${stl.wrapper}`}>
              <Link to="/" className={stl.logoWrapper}>
                <img src="/assets/images/logo.svg" alt="rawa-logo" />
              </Link>
              {!hideHeader && (
                <div className={stl.client}>
                  <img src="/assets/images/logo.svg" alt="" />
                  <strong>نقاء </strong>
                </div>
              )}

              {manage && (
                <MdDehaze
                  className={stl.burger}
                  size={22}
                  onClick={toggleMenu}
                />
              )}
            </div>
          </header>

          <aside className={`${stl.menu} ${showAside ? stl.show : ""}`}>
            <div className={stl.menuContent}>
              <div className={stl.menuHeader}>
                <MdClose size={22} onClick={() => setShowAside(false)} />
                <div className={stl.client}>
                  <img src="/assets/images/logo.svg" alt="" />
                  <strong>نقاء </strong>
                </div>
              </div>

              <ul>
                <li>
                  <MdModeEditOutline />
                  <Link to="/edit-password">تعديل كلمة السر</Link>
                </li>
                <li>
                  <MdOutlineLogout />
                  <button>تسجيل الخروج</button>
                </li>
              </ul>
            </div>
            <div
              className={stl.bgForMenu}
              onClick={() => setShowAside(false)}
            ></div>
          </aside>
        </>
      )}
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
