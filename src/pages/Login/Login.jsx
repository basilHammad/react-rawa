import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../Components/Layout/Layout";
import InputGroup from "../../Components/InputGroup/InputGroup";
import MainBtn from "../../Components/MainBtn/MainBtn";
import { setIsAdmin, setIsloggedin } from "../../store/actions/authActions";
import { login } from "../../store/actions/authActions";

import stl from "./Login.module.css";

const Login = ({ validateAdmin }) => {
  const [values, setValues] = useState({ userName: "", password: "123123" });
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    generalError: "",
  });

  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!user.username && validateAdmin) {
      dispatch(setIsAdmin(false));
      dispatch(setIsloggedin(false));
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");

      return;
    }

    const errors = validate(
      validateAdmin ? user.username : values.userName,
      values.password
    );

    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }

    if (validateAdmin) {
      dispatch(
        login(
          user.username,
          values.password,
          () => {
            navigate(location.pathname);
            dispatch(setIsAdmin(true));
          },
          setErrors
        )
      );

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
    dispatch(setIsAdmin(false));

    if (isLoggedin && !validateAdmin) navigate("/");
  }, [isLoggedin, dispatch, validateAdmin, navigate]);

  return (
    <Layout hideHeader={validateAdmin ? false : true}>
      <div className={stl.login}>
        {!validateAdmin && (
          <div className={stl.logoWrapper}>
            <img src="/assets/images/logo.svg" alt="" />
          </div>
        )}

        <form
          className={`${stl.form} ${validateAdmin ? stl.validateAdmin : ""}`}
        >
          {errors.generalError && (
            <div className={stl.error}>{errors.generalError}</div>
          )}

          {!validateAdmin && (
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
            onClick={handleLogin}
            className={stl.submit}
            loading={loading}
          >
            {validateAdmin ? "استمرار" : "تسجيل الدخول"}
          </MainBtn>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
