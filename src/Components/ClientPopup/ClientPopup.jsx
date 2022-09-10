import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

import InputGroup from "../InputGroup/InputGroup";
import MainBtn from "../MainBtn/MainBtn";
import SearchInput from "../SearchInput/SearchInput";
import stl from "./ClientPopup.module.css";

const names = [
  "أبي",
  "أحمد",
  "أحنف",
  "أزهر",
  "أسامة",
  "أسد",
  "أسمر",
  "أشرف",
  "أكرم",
  "الأخضر",
  "المثنى",
  "النعمان",
  "الوليد",
  "إمام",
  "آمر",
  "أمية",
  "أمين",
  "أنصاري",
  "أنور",
  "أوس",
  "إياد",
  "إيثار",
  "أيسر",
  "أيمن",
  "إيناس",
  "إيهاب",
  "بادي",
  "باسل",
  "باشر",
  "باهر",
  "بجاد",
  "بدر",
  "بدري",
  "بدوي",
  "براء",
  "براق",
  "براك",
  "برعم",
  "برهان",
  "برهوم",
  "برئ",
  "بسام",
  "بسطام",
  "بسيم",
  "بشامة",
  "بشير",
  "بطل",
  "بكر",
  "بكري",
  "بلال",
  "بلبل",
  "بنداري",
  "بندر",
  "بهاء",
  "تامر",
  "تركي",
  "تمام",
  "تيجاني",
  "تيسير",
  "ثنيان",
  "ثواب",
  "جاسر",
  "جاسم",
  "جاهد",
  "جبير",
  "جحا",
  "جعيفر",
  "جعيل",
  "جلال",
  "جليل",
  "جمال",
  "جمعة",
  "جندل",
  "جواد",
  "جوهري",
  "حاتم",
  "حبشي",
  "حبيب",
  "حجاج",
  "حجازي",
  "حجي",
  "حداد",
  "حذيفه",
  "حسام",
  "حسان",
  "حسنين",
  "حسون",
  "حسيب",
  "حسين",
  "حفيظ",
  "حلمي",
  "حماد",
  "حمادة",
  "حمدان",
  "حمدي",
  "حمزة",
  "حمود",
  "حمودة",
  "حميدو",
  "حنبل",
  "حنظلة",
  "حنفي",
  "حيدر",
  "حيدرة",
  "خازم",
  "خالد",
  "خطاب",
  "خلدون",
  "خميس",
  "خويلد",
  "خيري",
  "داوود",
  "دريد",
  "رابح",
  "راشد",
  "ربيع",
  "رجاء",
  "رسول",
  "رشدي",
  "رضا",
  "رضوان",
  "رمضان",
  "رياض",
  "زاهد",
  "زايد",
  "زهران",
  "زياد",
  "ساري",
  "سالم",
  "سامر",
  "سامي",
  "سرحان",
  "سعد",
  "سلطان",
  "سمير",
  "سهيل",
  "شادي",
  "شكيب",
  "شهاب",
  "صابر",
  "صفوان",
  "صلاح",
  "صياح",
  "ضاحي",
  "ضرغام",
  "طارق",
  "طلال",
  "طه",
  "عادل",
  "عامر",
  "عايد",
  "عبد الإله",
  "عبد الحميد",
  "عبد الرحمن",
  "عبد الله",
  "عبد المعين",
  "عبيدة",
  "عثمان",
  "عدنان",
  "عروة",
  "عزيز",
  "علاء",
  "علي",
  "عمار",
  "غازي",
  "غسان",
  "غياث",
  "فادي",
  "فاروق",
  "فراس",
  "فهد",
  "فواز",
  "قتادة",
  "قتيبة",
  "قحطان",
  "قصي",
  "قيس",
  "كايد",
  "كمال",
  "كنعان",
  "لقمان",
  "لؤي",
  "ليث",
  "ماجد",
  "مازن",
  "مأمون",
  "محمد",
  "محمد نور",
  "مرهف",
  "مسعود",
  "مشاري",
  "مشعل",
  "مصطفى",
  "مصعب",
  "مطلق",
  "معاذ",
  "معاوية",
  "معتصم",
  "معز",
  "ممدوح",
  "مناف",
  "مهند",
  "مؤيد",
  "ناصر",
  "نايف",
  "نديم",
  "نذير",
  "نزار",
  "نعمان",
  "نواف",
  "نوفل",
  "هاني",
  "هزاع",
  "هشام",
  "هلال",
  "هواش",
  "هيثم",
  "وائل",
  "وسام",
  "وضاح",
  "وليد",
  "ياسر",
  "يامن",
];

const ClientPopup = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [options, setOptions] = useState(names);
  const [selectedName, setSelectedName] = useState("");
  const [canEditFields, setCanEditFields] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({
    name: "",
    mobile: "",
    location: "",
  });

  const handleNameChange = (e) => {
    const { value } = e.target;
    const filteredNames = options.filter((option) => option.includes(value));
    setOptions(filteredNames);
    setName(value);
    setSelectedName("");

    if (!value) setOptions(names);
  };

  const handleNameSelect = (name) => {
    setSelectedName(name);
    setName(name);
    setCanEditFields(false);
    setFieldsValues({
      name: name,
      mobile: "",
      location: "",
    });
  };

  const handleRemoveSelection = () => {
    setSelectedName("");
    setName("");
    setCanEditFields(false);
    setFieldsValues({
      name: "",
      mobile: "",
      location: "",
    });
  };

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setFieldsValues((pre) => ({ ...pre, [name]: value }));
  };
  return (
    <div className={stl.wrapper}>
      <SearchInput
        name="clients"
        value={name}
        onChange={handleNameChange}
        options={options}
        handleSelect={handleNameSelect}
        selectedOption={selectedName}
        removeSelection={handleRemoveSelection}
        label="العميل"
      />

      <div className={stl.title}>
        <strong>{selectedName ? "معلوات العميل" : "عميل جديد"}</strong>
      </div>

      {selectedName && (
        <div className={stl.btnWrapper}>
          <button onClick={() => setCanEditFields(true)}>
            تعديل
            <MdModeEditOutline />
          </button>
        </div>
      )}

      <InputGroup
        type="text"
        id="name"
        label="الاسم"
        placeholder="ادخل الاسم"
        name="name"
        value={fieldsValues.name}
        onChange={handleFieldsChange}
        disabled={!canEditFields && selectedName}
      />

      <InputGroup
        type="tel"
        id="mobile"
        label="رقم الجوال"
        placeholder="ادخل رقم الجوال"
        name="mobile"
        value={fieldsValues.mobile}
        onChange={handleFieldsChange}
        disabled={!canEditFields && selectedName}
      />

      <InputGroup
        type="text"
        id="location"
        label="الموقع"
        placeholder="اختر الموقع"
        name="location"
        value={fieldsValues.location}
        onChange={handleFieldsChange}
        disabled={!canEditFields && selectedName}
      />

      <button className={stl.submit} onClick={onSubmit}>
        استمرار
      </button>
    </div>
  );
};

export default ClientPopup;
