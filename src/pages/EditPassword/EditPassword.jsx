import { useState } from "react";
import InputGroup from "../../Components/InputGroup/InputGroup";
import Layout from "../../Components/Layout/Layout";
import MainBtn from "../../Components/MainBtn/MainBtn";

import stl from "./EditPassword.module.css";

const EditPassword = () => {
  const [values, setValues] = useState({ oldPassword: "", newPassword: "" });

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
  };
  return (
    <Layout manage>
      <div className={stl.wrapper}>
        <form className={stl.form}>
          <InputGroup
            type="password"
            id="old-password"
            label="كلمة السر القديمة"
            placeholder="كلمة السر القديمة"
            name="oldPassword"
            value={values.oldPassword}
            onChange={handleFieldsChange}
          />

          <InputGroup
            type="password"
            id="new-password"
            label="كلمة السر الجديدة"
            placeholder="كلمة السر الجديدة"
            name="newPassword"
            value={values.newPassword}
            onChange={handleFieldsChange}
          />

          <MainBtn
            onClick={(e) => {
              e.preventDefault();
            }}
            className={stl.submit}
          >
            ارسل
          </MainBtn>
        </form>
      </div>
    </Layout>
  );
};

export default EditPassword;
