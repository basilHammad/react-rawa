import { Link } from "react-router-dom";
import stl from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={stl.wrapper}>
      <Link to="/" className={stl.logoWrapper}>
        <img src="/assets/images/logo.svg" alt="rawa-logo" />
        <strong>روى</strong>
      </Link>

      <strong>نعتذر منك عزيزي الزائر !</strong>
      <p>إن الصفحة التي تحاول الوصول إليها غير موجودة</p>
      <Link to="/" className={stl.link}>
        الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
