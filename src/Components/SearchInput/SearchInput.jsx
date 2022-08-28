import { useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { MdRemoveCircleOutline } from "react-icons/md";

import stl from "./SearchInput.module.css";

const SearchInput = ({
  name,
  value,
  onChange,
  options,
  handleSelect,
  selectedOption,
  removeSelection,
  label,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleCloseOptions = (e) => {
      if (
        e?.target?.classList?.contains(stl.optionsWrapper) ||
        e?.target?.parentElement?.classList?.contains(stl.optionsWrapper) ||
        e?.target?.classList?.contains(stl.wrapper) ||
        e?.target?.parentElement?.classList?.contains(stl.wrapper)
      )
        return;

      setShowOptions(false);
    };
    document.addEventListener("click", handleCloseOptions);

    return () => {
      document.removeEventListener("click", handleCloseOptions);
    };
  }, []);

  return (
    <>
      <label className={stl.label} htmlFor={name}>
        {label}
      </label>
      <div className={stl.wrapper}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={"اسم العميل"}
          autoComplete="off"
          onFocus={() => setShowOptions(true)}
          className={selectedOption ? stl.slected : ""}
        />
        {selectedOption ? (
          <MdRemoveCircleOutline
            className={stl.icon}
            onClick={removeSelection}
            color="red"
          />
        ) : (
          <MdExpandMore
            className={stl.icon}
            onClick={() => setShowOptions((pre) => !pre)}
          />
        )}

        {showOptions && (
          <div className={stl.optionsWrapper}>
            {options.map((name) => (
              <span
                key={name}
                onClick={() => {
                  handleSelect(name);
                  setShowOptions(false);
                }}
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
