import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Header from "../Components/Header/Header";

import Pagination from "../../../Components/Pagination/Pagination";
import Loader from "../../../Components/Loader/Loader";

import stl from "./Products.module.css";
import Table from "../Components/Table/Table";
import {
  deleteProduct,
  getMainProducts,
  getProducts,
} from "../../../store/actions/productsActions";

const TITLES = ["الاسم", "الصورة", "الحالة", "السعر"];

const Products = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.common.isLoading);
  const permissions = useSelector(({ auth }) => auth.permissions);
  const products = useSelector((state) => state.pos.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const body = document.querySelector("body");
    body.style.backgroundColor = "#fbfcfd";

    dispatch(getProducts(true));
    dispatch(getMainProducts());
  }, []);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("view-product")) navigate("/unauthorized");
  }, [permissions]);

  return (
    <Layout manage>
      <Header
        path="/manage/products/add"
        title="المنتجات"
        hideButton={!permissions?.includes("add-product")}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className={stl.wrapper}>
          <Table
            titles={TITLES}
            data={products.map((product) => ({
              name: product.name,
              icon: product.img,
              state: product.state || 1,
              area: product.price,
              id: product.id,
            }))}
            deleteItem={(id) => {
              dispatch(deleteProduct(id));
            }}
            path={`/manage/products/edit/`}
            // handleModalEdit={() => {}}
            // modalEdit
            canDelete={permissions?.includes("delete-product")}
            canEdit={permissions?.includes("edit-product")}
          />
        </div>
      )}

      {/* {totalPages > 1 && (
        <Pagination
          totalPages={[...Array(totalPages)].map((_, i) => i + 1)}
          currentPage={page}
          loading={loading}
          setCurrentPage={setPage}
        />
      )} */}
    </Layout>
  );
};

export default Products;
