import stl from "./Checkbox.module.css";

const Checkbox = ({ value, onChange, label, checked }) => {
  return (
    <label className={stl.wrapper}>
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {label}
      <span></span>
    </label>
  );
};

export default Checkbox;
