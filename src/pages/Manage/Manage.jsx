import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "../../Components/Accordion/Accordion";

import CustomeLink from "../../Components/CustomeLink/CustomeLink";
import Layout from "../../Components/Layout/Layout";
import Loader from "../../Components/Loader/Loader";

import stl from "./Manage.module.css";

const links = [
  {
    text: "ايرادات",
    path: "/manage/revenues",
    icon: "/assets/images/rev.svg",
    color: "green",
    permission: "view-revenues",
  },
  {
    text: "مصروفات",
    path: "/manage/expenses",
    icon: "/assets/images/exp.svg",
    color: "yellow",
    permission: "view-expenses",
  },
  {
    text: "مشتريات",
    path: "/manage/purchases",
    icon: "/assets/images/pur.svg",
    color: "blue",
    permission: "view-purchases",
  },
  {
    text: "الطلبات",
    path: "/manage/orders",
    icon: "/assets/images/box.svg",
    color: "pink",
    permission: "view-orders",
  },
  {
    text: "الرحلات",
    path: "/manage/trips",
    icon: "/assets/images/truck.svg",
    color: "lightBlue",
    permission: "view-trips",
  },
  {
    text: "الرحلات المجدولة",
    path: "/manage/scheduledTrips",
    icon: "/assets/images/truck.svg",
    color: "lightBlue",
    permission: "view-scheduledTrips",
  },
  {
    text: "المنتجات",
    path: "/manage/products",
    icon: "",
    color: "lightBlue",
    // permission: "view-products",
    permission: "view-product",
  },
];

const accordionLinks = [
  {
    text: "كشف حساب",
    path: "/manage/account-statement",
  },
  { text: "الايرادات", path: "/manage/revenue-report" },
  { text: "المصاريف", path: "/manage/expense-report" },
  { text: "المشتريات", path: "/manage/purchase-report" },
];

const Manage = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const permissions = useSelector((state) => state.auth.permissions);
  const loading = useSelector((state) => state.common.isLoading);

  const [showReports, setShowReports] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout manage>
      <div className={stl.container}>
        <div className={stl.wrapper}>
          {links.map((link, i) => {
            if (!permissions?.includes(link.permission)) return null;
            return (
              <CustomeLink
                key={i}
                text={link.text}
                to={link.path}
                className={`${stl.link} ${stl[link.color]}`}
                icon={link.icon}
              />
            );
          })}
          {permissions?.includes("view-report") && (
            <Accordion
              showChildren={showReports}
              toggleChildren={setShowReports}
            >
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Manage;
