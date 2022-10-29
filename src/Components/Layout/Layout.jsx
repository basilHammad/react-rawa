import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDehaze,
  MdClose,
  MdPlaylistAdd,
  MdModeEditOutline,
  MdOutlineLogout,
} from "react-icons/md";
// import { MdClose } from "react-icons/md";
// import { MdPlaylistAdd } from "react-icons/md";
// import { MdModeEditOutline } from "react-icons/md";
// import { MdOutlineLogout } from "react-icons/md";

import stl from "./Layout.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const Layout = ({ children, hideHeader, manage, hideBeardcrumb }) => {
  const [showAside, setShowAside] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const hideBeardcrumbs = [
    "/",
    "/pos/direct",
    "/pos/orders",
    // "/edit-password",
    "/login",
  ];

  const toggleMenu = () => {
    setShowAside((pre) => !pre);
  };

  const handleLogout = () => {
    dispatch(logout(() => navigate("/login")));
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
                  <img src={user.avatar} alt="" />
                  <strong>{user.name} </strong>
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
                  <img src={user.avatar} alt="" />
                  <strong>{user.name} </strong>
                </div>
              </div>

              <ul>
                <li>
                  <Link to="/manage/edit-password">
                    <img src="/assets/images/global.svg" />
                    تعديل كلمة السر
                  </Link>
                </li>
                <li>
                  <Link to="/manage/suppliers">
                    <img src="/assets/images/suplayers.svg" />
                    الموردين
                  </Link>
                </li>
                <li>
                  <img src="/assets/images/people.svg" />
                  <Link to="/manage/clients">العملاء</Link>
                </li>
                <li>
                  <Link to="/manage/employees">
                    <img src="/assets/images/employees.svg" />
                    الموظفين
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <img src="/assets/images/logout.svg" />
                    تسجيل الخروج
                  </button>
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
      <main className="container">
        {!hideBeardcrumb && !hideBeardcrumbs.includes(location.pathname) && (
          <Breadcrumbs />
        )}
        {children}
      </main>
    </>
  );
};

export default Layout;
