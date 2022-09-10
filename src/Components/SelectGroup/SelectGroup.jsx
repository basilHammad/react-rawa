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
}) => {
  return (
    <div className={stl.selectGroup}>
      <label htmlFor={id}>{label}</label>
      <div>
        <select name={name} id={id} value={value} onChange={onChange}>
          <option value="">{firstOption}</option>
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <MdExpandMore size={20} className={stl.icon} />
      </div>
    </div>
  );
};

export default SelectGroup;
