import stl from "./InputGroup.module.css";

const InputGroup = ({
  type,
  label,
  placeholder,
  name,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className={stl.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default InputGroup;
