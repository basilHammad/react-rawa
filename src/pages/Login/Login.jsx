import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../Components/Layout/Layout";
import InputGroup from "../../Components/InputGroup/InputGroup";
import MainBtn from "../../Components/MainBtn/MainBtn";
import { setIsAdmin } from "../../store/actions/authActions";
import { login } from "../../store/actions/authActions";

import stl from "./Login.module.css";

const Login = ({ isAdmin }) => {
  const [values, setValues] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    generalError: "",
  });

  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleLogin = () => {
    const errors = validate(values.userName, values.password);

    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }

    dispatch(
      login(values.userName, values.password, () => navigate("/"), setErrors)
    );
  };

  const validate = (username, password) => {
    const errors = {};
    if (!username.trim().length) errors.userName = "يجب ادخال اسم المستخدم";
    if (!password.trim().length) errors.password = "يجب ادخال كلمة السر";

    return errors;
  };

  useEffect(() => {
    if (isLoggedin && !isAdmin) navigate("/");
  }, []);

  return (
    <Layout hideHeader={isAdmin ? false : true}>
      <div className={stl.login}>
        {!isAdmin && (
          <div className={stl.logoWrapper}>
            <img src="/assets/images/logo.svg" alt="" />
          </div>
        )}

        <div className={`${stl.form} ${isAdmin ? stl.isAdmin : ""}`}>
          {errors.generalError && (
            <div className={stl.error}>{errors.generalError}</div>
          )}

          {!isAdmin && (
            <InputGroup
              type="text"
              id="user-name"
              label="اسم المستخدم"
              placeholder="اسم المستخدم"
              name="userName"
              value={values.userName}
              onChange={handleFieldsChange}
              error={errors.userName}
            />
          )}

          <InputGroup
            type="password"
            id="password"
            label="كلمة السر"
            placeholder="كلمة السر"
            name="password"
            value={values.password}
            onChange={handleFieldsChange}
            error={errors.password}
          />

          <MainBtn
            onClick={
              isAdmin
                ? () => {
                    dispatch(setIsAdmin(true));
                  }
                : handleLogin
            }
            className={stl.submit}
            loading={loading}
          >
            {isAdmin ? "استمرار" : "تسجيل الدخول"}
          </MainBtn>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
