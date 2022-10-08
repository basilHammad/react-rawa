import InputGroup from "../../../../Components/InputGroup/InputGroup";
import stl from "./Search.module.css";

const Search = ({ name, phone, onChange, onSubmit }) => {
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
      <button type="submit"> بحث</button>
    </form>
  );
};

export default Search;
