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
        <Link className={stl.mainLink} to="/pos/direct">
          المبيعات
        </Link>
        <Link className={stl.mainLink} to="/manage">
          ادارة المحل
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
