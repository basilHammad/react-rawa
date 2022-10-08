import stl from "./Radio.module.css";

const Radio = ({ name, value, onChange, checked, label }) => {
  return (
    <label className={stl.wrapper}>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {label}
      <span></span>
    </label>
  );
};

export default Radio;
