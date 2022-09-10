import stl from "./TextareaGroup.module.css";

const TextareaGroup = ({ id, label, name, placeholder, value, onChange }) => {
  return (
    <div className={stl.textareaGroup}>
      <label htmlFor={id}>{label}</label>

      <textarea
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextareaGroup;
