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
  disabled,
  placeholder,
  error,
  className,
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
      {label && (
        <label className={stl.label} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={`${stl.wrapper} ${className ? className : ""}`}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder ? placeholder : "اسم العميل"}
          autoComplete="off"
          onFocus={() => setShowOptions(true)}
          className={`${selectedOption ? stl.slected : ""}${
            error ? stl.error : ""
          }`}
          disabled={disabled}
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
            {options.map((option) => (
              <span
                key={option.id}
                onClick={() => {
                  handleSelect(option);
                  setShowOptions(false);
                }}
              >
                {option.name}
              </span>
            ))}
          </div>
        )}
      </div>
      {error && <span className={stl.error}>{error}</span>}
    </>
  );
};

export default SearchInput;
