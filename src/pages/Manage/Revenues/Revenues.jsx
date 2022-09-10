import { useEffect, useState } from "react";

import Layout from "../../../Components/Layout/Layout";
import Navigation from "../../../Components/Navigation/Navigation";
import InputGroup from "../../../Components/InputGroup/InputGroup";
import SelectGroup from "../../../Components/SelectGroup/SelectGroup";
import TextareaGroup from "../../../Components/TextareaGroup/TextareaGroup";
import MainBtn from "../../../Components/MainBtn/MainBtn";
import { useSelector } from "react-redux";
import Login from "../../Login/Login";
import CalendarGroup from "../../../Components/Calendar/CalendarGroup";
import SearchInput from "../../../Components/SearchInput/SearchInput";

import stl from "./Revenues.module.css";

const links = [
  { text: "ايرادات", path: "/manage/revenues" },
  { text: "مصروفات", path: "/manage/expenses" },
];

const revenue_type = [
  { id: 1, text: "test", value: "1" },
  { id: 2, text: "test", value: "2" },
  { id: 3, text: "test", value: "3" },
  { id: 4, text: "test", value: "4" },
];

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

const Revenues = () => {
  const [date, setDate] = useState(new Date());
  const [values, setValues] = useState({
    amount: "",
    bondNo: "",
    note: "",
    revenueType: "",
    revenue: "",
    clientType: "",
    client: "",
  });
  const [clients, setClients] = useState(names);
  const [selectedClient, setSelectedClient] = useState("");

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "client") {
      const filteredClients = clients.filter((client) =>
        client.includes(value)
      );

      setClients(filteredClients);
      setValues((pre) => ({ ...pre, [name]: value }));
      setSelectedClient("");
      if (!value) setClients(names);

      return;
    }

    setValues((pre) => ({ ...pre, [name]: value }));
  };

  const handleNameSelect = (name) => {
    setSelectedClient(name);
    setValues((pre) => ({ ...pre, client: name }));
  };

  const handleRemoveSelection = () => {
    setSelectedClient("");
    setValues((pre) => ({ ...pre, client: "" }));
  };

  return isAdmin ? (
    <Layout manage>
      <Navigation links={links} />

      <div className={stl.wrapper}>
        <SelectGroup
          name="revenue"
          label="فئة الايراد"
          id="revenue"
          firstOption="فئة الايراد"
          options={revenue_type}
          value={values.revenue}
          onChange={handleInputChange}
        />

        <SelectGroup
          name="revenueType"
          label="نوع الايراد"
          id="revenue-type"
          firstOption="نوع الايراد"
          options={revenue_type}
          value={values.revenueType}
          onChange={handleInputChange}
        />

        <SelectGroup
          name="clientType"
          label="نوع العميل"
          id="clientType"
          firstOption="نوع العميل"
          options={revenue_type}
          value={values.clientType}
          onChange={handleInputChange}
        />

        <SearchInput
          name="client"
          value={values.client}
          onChange={handleInputChange}
          options={clients}
          handleSelect={handleNameSelect}
          selectedOption={selectedClient}
          removeSelection={handleRemoveSelection}
          label="العميل"
        />

        <CalendarGroup label="التاريخ" value={date} onChange={setDate} />

        <InputGroup
          type="text"
          id="amount"
          label="القيمة"
          placeholder="ادخل القيمة"
          name="amount"
          value={values.amount}
          onChange={handleInputChange}
        />

        <InputGroup
          type="text"
          id="bond-no"
          label="رقم السند"
          placeholder="ادخل رقم السند"
          name="bondNo"
          value={values.bondNo}
          onChange={handleInputChange}
        />

        <TextareaGroup
          id="note"
          label="ملاحظات"
          name="note"
          value={values.note}
          placeholder="ملاحظاتك"
          onChange={handleInputChange}
        />

        <MainBtn onClick={() => {}}>استمرار</MainBtn>
      </div>
    </Layout>
  ) : (
    <Login isAdmin />
  );
};

export default Revenues;
