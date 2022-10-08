import Radio from "../../../../Components/Radio/Radio";
import SelectGroup from "../../../../Components/SelectGroup/SelectGroup";
import stl from "./Filters.module.css";

const options = [
  { id: 1, text: "الاحدث", value: "-transaction_date" },
  { id: 2, text: "الاقدم", value: "transaction_date" },
  { id: 3, text: "الاعلى قيمة", value: "-total_price" },
  { id: 4, text: "الاقل قيمة", value: "total_price" },
];
const Filters = ({
  onRadioChange,
  selectedFilter,
  onSelectChange,
  selectedSort,
}) => {
  return (
    <div className={stl.filters}>
      <div className={stl.byDate}>
        <Radio
          name="by-date"
          value="1"
          onChange={(e) => {
            onRadioChange(e.target.value);
          }}
          checked={selectedFilter === "1" ? true : false}
          label="اليوم"
        />
        <Radio
          name="by-date"
          value="2"
          onChange={(e) => {
            onRadioChange(e.target.value);
          }}
          checked={selectedFilter === "2" ? true : false}
          label="الاسبوع"
        />
        <Radio
          name="by-date"
          value="3"
          onChange={(e) => {
            onRadioChange(e.target.value);
          }}
          checked={selectedFilter === "3" ? true : false}
          label="الشهر"
        />
      </div>
      <div className={stl.byValue}>
        <SelectGroup
          name="by-value"
          id="by-value"
          firstOption="الترتيب حسب"
          options={options}
          value={selectedSort}
          onChange={(e) => onSelectChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
