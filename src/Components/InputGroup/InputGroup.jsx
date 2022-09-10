import stl from "./InputGroup.module.css";

const InputGroup = ({
  type,
  label,
  placeholder,
  name,
  value,
  onChange,
  disabled,
  id,
  error,
}) => {
  return (
    <div className={`${stl.inputGroup} ${error ? stl.error : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <span>{error}</span>}
    </div>
  );
};

export default InputGroup;
