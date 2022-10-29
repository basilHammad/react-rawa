import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import stl from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={stl.wrapper}>
      {breadcrumbs.map(({ match, breadcrumb }, i) => {
        let pathNameAr;

        if (breadcrumb.key === "/") pathNameAr = "الرئيسية";
        if (breadcrumb.key === "/manage") pathNameAr = "ادارة المحل";
        if (breadcrumb.key === "/pos/direct") pathNameAr = "مباشر";
        if (breadcrumb.key === "/pos/orders") pathNameAr = "طلبات";
        if (breadcrumb.key === "/manage/revenues") pathNameAr = "الإرادات";
        if (breadcrumb.key === "/manage/revenues/add")
          pathNameAr = "اضافة ايراد";
        if (breadcrumb.key.includes("/manage/revenues/edit"))
          pathNameAr = "تعديل ايراد";
        if (breadcrumb.key === "/manage/expenses") pathNameAr = "المصروفات";
        if (breadcrumb.key === "/manage/expenses/add")
          pathNameAr = "اضافة مصروف";
        if (breadcrumb.key.includes("/manage/expenses/edit"))
          pathNameAr = "تعديل مصروف";
        if (
          breadcrumb.key === "/manage/Purchases" ||
          breadcrumb.key === "/manage/purchases"
        )
          pathNameAr = "المشتريات";
        if (breadcrumb.key === "/manage/Purchases/add")
          pathNameAr = "اضافة عملية شراء";
        if (breadcrumb.key.includes("/manage/purchases/edit"))
          pathNameAr = "تعديل عملية شراء";
        if (breadcrumb.key === "/manage/employees") pathNameAr = "الموظفين";
        if (breadcrumb.key === "/manage/clients") pathNameAr = "العملاء";
        if (breadcrumb.key === "/manage/suppliers") pathNameAr = "الموردين";
        if (breadcrumb.key === "/manage/orders") pathNameAr = "الطلبات";
        if (breadcrumb.key === "/manage/trips") pathNameAr = "الرحلات";
        if (breadcrumb.key === "/manage/trips/add") pathNameAr = "اضافة رحلة";
        if (breadcrumb.key === "/manage/edit-password")
          pathNameAr = "تعديل كلمة السر";
        if (breadcrumb.key.includes("/manage/orders/edit"))
          pathNameAr = "تعديل طلب";

        /* */

        if (breadcrumb.key === "/pos") return;
        if (breadcrumb.key === "/manage/revenues/edit") return;
        if (breadcrumb.key === "/manage/expenses/edit") return;
        if (breadcrumb.key === "/manage/purchases/edit") return;
        if (breadcrumb.key === "/manage/orders/edit") return;

        return (
          <span key={match.pathname}>
            <NavLink to={match.pathname}>{pathNameAr}</NavLink>{" "}
            {breadcrumbs[i + 1] ? " / " : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
