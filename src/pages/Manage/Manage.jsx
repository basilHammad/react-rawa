import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "../../Components/Accordion/Accordion";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

import CustomeLink from "../../Components/CustomeLink/CustomeLink";
import Layout from "../../Components/Layout/Layout";
import Login from "../Login/Login";

import stl from "./Manage.module.css";

const links = [
  { text: "ايرادات", path: "/manage/revenues" },
  { text: "مصروفات", path: "/manage/expenses" },
  { text: "مشتريات", path: "/manage/purchases" },
  { text: "الطلبات", path: "/manage/orders" },
  { text: "الرحلات", path: "/manage/trips" },
];

const accordionLinks = [
  { text: "كشف حساب", path: "/manage/account-statement" },
  { text: "تقرير الايرادات", path: "/manage/revenue-report" },
  { text: "تقرير المصاريق", path: "/manage/expense-report" },
  { text: "تقرير المشتريات", path: "/manage/purchase-report" },
];

const Manage = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  const [showReports, setShowReports] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
  }, [isLoggedin, navigate]);

  return isAdmin ? (
    <Layout manage>
      {/* <Breadcrumbs /> */}
      <div className={stl.wrapper}>
        {links.map((link, i) => (
          <CustomeLink
            key={i}
            text={link.text}
            to={link.path}
            className={stl.link}
          />
        ))}
        <Accordion showChildren={showReports} toggleChildren={setShowReports}>
          {accordionLinks.map((link, i) => (
            <CustomeLink
              key={i}
              text={link.text}
              to={link.path}
              className={stl.accordionLink}
            />
          ))}
        </Accordion>
      </div>
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default Manage;
