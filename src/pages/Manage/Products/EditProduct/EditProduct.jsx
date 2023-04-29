import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";

import { MdAddchart } from "react-icons/md";

import InputGroup from "../../../../Components/InputGroup/InputGroup";
import Layout from "../../../../Components/Layout/Layout";
import Loader from "../../../../Components/Loader/Loader";
import {
  addProduct,
  editProduct,
  getProductById,
} from "../../../../store/actions/productsActions";
import Header from "../../Components/Header/Header";

import stl from "./EditProduct.module.css";
import MainBtn from "../../../../Components/MainBtn/MainBtn";

const EditProduct = () => {
  const loading = useSelector((state) => state.common.isLoading);
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const product = useSelector((state) => state.products.product);

  console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [fields, setFields] = useState({
    name: "",
    price: "",
    status: true,
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
  });

  const [img, setImg] = useState();
  const [apiImg, setApiImg] = useState();

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;

    setFields((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };

  const handleSwitchChange = (value) => {
    setFields((pre) => ({ ...pre, status: value }));
  };

  const handleImgChange = (e) => {
    const blob = URL.createObjectURL(e.target.files[0]);
    setApiImg(e.target.files[0]);

    setImg(blob);
  };

  const validate = () => {
    const errors = {};
    if (!fields.name.trim().length) errors.name = "يجب ادخال الاسم";
    if (!fields.price.trim().length) errors.price = "يجب ادخال السعر";
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors((pre) => ({ ...pre, ...errors }));
      return;
    }

    dispatch(
      editProduct(
        product.id,
        product.product_id,
        fields.name,
        fields.status ? 1 : 0,
        apiImg,
        fields.price,
        () => navigate("/manage/products")
      )
    );
  };

  useEffect(() => {
    if (!Object.keys(product).length) return;

    setFields((pre) => ({
      ...pre,
      name: product.name,
      price: product.price,
      status: product.is_active == 1 ? true : false,
    }));
  }, [product]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getProductById(params.id));
  }, []);

  return (
    <Layout manage hideBeardcrumb>
      <Header isModal title="تعديل منتج" hideButton />
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          {product ? (
            <>
              <div className={stl.files}>
                <label>الصورة</label>
                <div className={stl.imgWrapper}>
                  <img src={img ? img : product.img} alt="" />
                </div>
                <div className={stl.inputWrapper}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImgChange}
                  />
                  <MdAddchart size={22} className={stl.icon} />
                </div>
              </div>
              <InputGroup
                type="text"
                id="name"
                label="الاسم"
                placeholder="ادخل الاسم"
                name="name"
                value={fields.name}
                onChange={handleFieldsChange}
                error={errors.name}
              />
              <InputGroup
                type="number"
                id="price"
                label="السعر"
                placeholder="ادخل السعر"
                name="price"
                value={fields.price}
                onChange={handleFieldsChange}
                error={errors.price}
              />

              <label className={stl.switch}>
                <span>الحالة</span>
                <Switch onChange={handleSwitchChange} checked={fields.status} />
              </label>
              <MainBtn
                className={stl.submit}
                onClick={handleSubmit}
                loading={postLoading}
              >
                تعديل
              </MainBtn>
            </>
          ) : null}
        </div>
      )}
    </Layout>
  );
};

export default EditProduct;
