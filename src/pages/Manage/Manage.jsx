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
  {
    text: "ايرادات",
    path: "/manage/revenues",
    icon: "/assets/images/rev.svg",
    color: "green",
  },
  {
    text: "مصروفات",
    path: "/manage/expenses",
    icon: "/assets/images/exp.svg",
    color: "yellow",
  },
  {
    text: "مشتريات",
    path: "/manage/purchases",
    icon: "/assets/images/pur.svg",
    color: "blue",
  },
  {
    text: "الطلبات",
    path: "/manage/orders",
    icon: "/assets/images/box.svg",
    color: "pink",
  },
  {
    text: "الرحلات",
    path: "/manage/trips",
    icon: "/assets/images/truck.svg",
    color: "lightBlue",
  },
];

const accordionLinks = [
  {
    text: "كشف حساب",
    path: "/manage/account-statement",
  },
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
            className={`${stl.link} ${stl[link.color]}`}
            icon={link.icon}
          />
        ))}
        <Accordion showChildren={showReports} toggleChildren={setShowReports}>
          {accordionLinks.map((link, i) => (
            <CustomeLink
              key={i}
              text={link.text}
              to={link.path}
              className={stl.accordionLink}
              icon={link.icon}
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
