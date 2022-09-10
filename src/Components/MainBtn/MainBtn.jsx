import stl from "./MainBtn.module.css";

const MainBtn = ({ onClick, children, className, loading, disabled }) => {
  return (
    <button
      className={`${stl.btn} ${className ? className : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <span className={stl.loader}></span> : children}
    </button>
  );
};

export default MainBtn;
