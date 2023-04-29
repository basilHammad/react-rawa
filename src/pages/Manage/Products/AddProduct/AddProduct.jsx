import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

import { MdAddchart } from "react-icons/md";

import InputGroup from "../../../../Components/InputGroup/InputGroup";
import Layout from "../../../../Components/Layout/Layout";
import Loader from "../../../../Components/Loader/Loader";
import SelectGroup from "../../../../Components/SelectGroup/SelectGroup";
import {
  addProduct,
  getMainProducts,
} from "../../../../store/actions/productsActions";
import Header from "../../Components/Header/Header";

import stl from "./AddProduct.module.css";
import MainBtn from "../../../../Components/MainBtn/MainBtn";

const AddProduct = () => {
  const loading = useSelector((state) => state.common.isLoading);
  const postLoading = useSelector((state) => state.common.isPostLoading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const mainProducts = useSelector((state) => state.products.mainProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    name: "",
    price: "",
    status: true,
    selectedProductsId: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
  });

  const [selectedProduct, setSelectedProduct] = useState({});
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
      addProduct(
        selectedProduct.product_id,
        fields.name,
        fields.status ? 1 : 0,
        apiImg,
        fields.price,
        () => navigate("/manage/products")
      )
    );
  };

  useEffect(() => {
    if (!fields.selectedProductsId) return;
    const selectedProduct = mainProducts.find(
      (product) => product.product_id === +fields.selectedProductsId
    );

    setSelectedProduct(selectedProduct);

    setFields((pre) => ({
      ...pre,
      name: selectedProduct.product_name,
      status: selectedProduct.is_active == 1 ? true : false,
    }));

    setFields((pre) => ({ ...pre, name: selectedProduct.product_name }));
  }, [fields.selectedProductsId]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getMainProducts());
  }, []);

  return (
    <Layout manage hideBeardcrumb>
      <Header isModal title="اضافة منتج" hideButton />
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          <SelectGroup
            name="selectedProductsId"
            id="products"
            firstOption="اختر"
            options={mainProducts.map((product) => ({
              id: product.product_id,
              value: product.product_id,
              text: product.product_name,
            }))}
            value={fields.selectedProductsId}
            onChange={handleFieldsChange}
            label="المنتجات"
          />

          {Object.keys(selectedProduct).length ? (
            <>
              <div className={stl.files}>
                <label>الصورة</label>
                <div className={stl.imgWrapper}>
                  <img src={img ? img : selectedProduct.img} alt="" />
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
                اضافة
              </MainBtn>
            </>
          ) : null}
        </div>
      )}
    </Layout>
  );
};

export default AddProduct;
