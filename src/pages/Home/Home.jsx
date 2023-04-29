import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../../Components/Layout/Layout";
import Loader from "../../Components/Loader/Loader";
import { getUserPermission, setIsAdmin } from "../../store/actions/authActions";

import stl from "./Home.module.css";

const Home = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const permissions = useSelector((state) => state.auth.permissions);
  const loading = useSelector((state) => state.common.isLoading);

  const dispatch = useDispatch();

  const [canPos, setCanPos] = useState(false);
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    setCanPos(permissions?.includes("pos"));
    setCanManage(
      permissions?.includes(
        "view-orders",
        "view-trips",
        "view-scheduledTrips",
        "view-revenues",
        "view-expenses",
        "view-purchases",
        "view-suppliers",
        "view-clients",
        "view-employees",
        "view-report"
      )
    );
  }, [permissions]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
    dispatch(getUserPermission());
  }, []);

  return (
    <Layout>
      <div className={stl.wrapper}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h3>اختر الخدمة</h3>
            {canPos && (
              <Link className={stl.mainLink} to="/pos/direct">
                <div>
                  <img src="/assets/images/shop.svg" alt="" />
                  المبيعات
                </div>
              </Link>
            )}
            {canManage && (
              <Link className={stl.mainLink} to="/manage">
                <div>
                  <img src="/assets/images/manage.svg" alt="" />
                  ادارة المحل
                </div>
              </Link>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
