import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

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
  min,
}) => {
  const [inputType, setInputType] = useState("password");

  const toggleShowPassword = () => {
    setInputType((pre) => {
      if (pre === "password") return "text";

      return "password";
    });
  };

  return (
    <div className={`${stl.inputGroup} ${error ? stl.error : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          type={type === "password" ? inputType : type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          min={min}
        />
        {type === "password" && inputType === "text" ? (
          <FaEyeSlash onClick={toggleShowPassword} />
        ) : type === "password" && inputType === "password" ? (
          <FaEye onClick={toggleShowPassword} />
        ) : null}
      </div>
      {error && <span>{error}</span>}
    </div>
  );
};

export default InputGroup;
