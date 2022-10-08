import { useSelector } from "react-redux";
import stl from "./Header.module.css";

const Header = ({ billNum, date, clientName }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={stl.header}>
      <div className={stl.details}>
        <div>
          التاريخ:
          <strong>{`${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`}</strong>
        </div>
        <div>
          رقم الفاتورة: <strong>{billNum}</strong>
        </div>
        {clientName && (
          <div>
            العميل: <strong>{clientName}</strong>
          </div>
        )}
      </div>

      <div className={stl.branding}>
        <strong>{user.name} </strong>
        <img src={user.avatar} alt="" />
      </div>
    </div>
  );
};

export default Header;
