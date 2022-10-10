import InputGroup from "../../../../Components/InputGroup/InputGroup";
import SelectGroup from "../../../../Components/SelectGroup/SelectGroup";
import stl from "./Search.module.css";

const Search = ({ name, phone, onChange, onSubmit, isEmp, options, type }) => {
  return (
    <form className={stl.wrapper} onSubmit={onSubmit}>
      <InputGroup
        type="text"
        id="search-name"
        // label="الاسم"
        placeholder="ادخل الاسم"
        name="name"
        value={name}
        onChange={onChange}
      />
      <InputGroup
        type="text"
        id="search-phone"
        // label="رقم الهاتف"
        placeholder="رقم الهاتف"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      {isEmp && (
        <SelectGroup
          name="type"
          id="type"
          firstOption="الوظيفة"
          options={options}
          value={type}
          onChange={onChange}
          // label="من"
        />
      )}
      <button type="submit"> بحث</button>
    </form>
  );
};

export default Search;
