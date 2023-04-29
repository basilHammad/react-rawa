import stl from "./Checkbox.module.css";

const Checkbox = ({
  value,
  onChange,
  label,
  checked,
  checkedColor,
  className,
}) => {
  return (
    <label
      className={`${stl.wrapper} ${checkedColor === "green" ? stl.green : ""} ${
        className ? className : ""
      }`}
    >
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
