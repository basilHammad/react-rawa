import { MdExpandMore } from "react-icons/md";

import stl from "./SelectGroup.module.css";

const SelectGroup = ({
  name,
  label,
  id,
  firstOption,
  options,
  value,
  onChange,
  error,
  className,
  disabled,
}) => {
  return (
    <div
      className={`${stl.selectGroup} ${className ? className : ""} ${
        error ? stl.error : ""
      }`}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <div>
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="">{firstOption}</option>
          {options?.length &&
            options?.map((option) => (
              <option key={option.id} value={option.value}>
                {option.text}
              </option>
            ))}
        </select>
        <MdExpandMore size={20} className={stl.icon} />
      </div>
      {/* {error && <span className={stl.error}>{error}</span>} */}
    </div>
  );
};

export default SelectGroup;
