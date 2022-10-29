import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../../Components/Layout/Layout";
import { setIsAdmin } from "../../store/actions/authActions";

import stl from "./Home.module.css";

const Home = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) navigate("/login");

    dispatch(setIsAdmin(false));
  }, [isLoggedin, navigate, dispatch]);

  return (
    <Layout>
      <div className={stl.wrapper}>
        <h3>اختر الخدمة</h3>
        <Link className={stl.mainLink} to="/pos/direct">
          <div>
            <img src="/assets/images/shop.svg" alt="" />
            المبيعات
          </div>
        </Link>
        <Link className={stl.mainLink} to="/manage">
          <div>
            <img src="/assets/images/manage.svg" alt="" />
            ادارة المحل
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
