import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputGroup from "../../Components/InputGroup/InputGroup";
import Layout from "../../Components/Layout/Layout";
import MainBtn from "../../Components/MainBtn/MainBtn";
import { editPassword } from "../../store/actions/authActions";
import Login from "../Login/Login";

import stl from "./EditPassword.module.css";

const EditPassword = () => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const postLoading = useSelector((state) => state.common.isPostLoading);

  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
  }, [isLoggedin, navigate]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("change-password")) navigate("/unauthorized");
  }, [permissions]);

  const validate = () => {
    const errors = {};
    if (!values.newPassword.trim()) errors.newPassword = "يجب تعبئة الحقل";
    if (!values.oldPassword.trim()) errors.oldPassword = "يجب تعبئة الحقل";
    if (!values.confirmPassword.trim()) {
      errors.confirmPassword = "يجب تعبئة الحقل";
      return errors;
    }
    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "كلمة السر غير مطابقة";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }
    dispatch(
      editPassword(
        values.oldPassword,
        values.newPassword,
        values.confirmPassword,
        setErrors,
        () => {
          setSuccess(true);
          setValues({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      )
    );
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/manage");
      }, [1000]);
    }
  }, [success]);

  useEffect(() => {
    return () => {
      setSuccess(false);
      setValues({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    };
  }, []);

  return (
    <Layout manage>
      <div className={stl.wrapper}>
        {success ? (
          <div className={stl.successWrapper}>
            <img src="/assets/images/abs.svg" />
            <strong>تم تعديل كلمة السر</strong>
          </div>
        ) : (
          <>
            <InputGroup
              type="password"
              id="old-password"
              label="كلمة السر القديمة"
              placeholder="كلمة السر القديمة"
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleFieldsChange}
              error={errors.oldPassword}
            />

            <InputGroup
              type="password"
              id="new-password"
              label="كلمة السر الجديدة"
              placeholder="كلمة السر الجديدة"
              name="newPassword"
              value={values.newPassword}
              onChange={handleFieldsChange}
              error={errors.newPassword}
            />

            <InputGroup
              type="password"
              id="confirm-password"
              label="تاكيد كلمة السر"
              placeholder="تاكيد كلمة السر"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleFieldsChange}
              error={errors.confirmPassword}
            />

            <MainBtn
              loading={postLoading}
              onClick={handleSubmit}
              className={stl.submit}
            >
              ارسل
            </MainBtn>
          </>
        )}
      </div>
    </Layout>
  );
};

export default EditPassword;
