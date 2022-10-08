import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Components/Pagination/Pagination";
import {
  deletePurchase,
  getPurchases,
} from "../../../store/actions/purchasesActions";
import Login from "../../Login/Login";
import Filters from "../Components/Filters/Filters";
import Header from "../Components/Header/Header";
import Table from "../Components/Table/Table";

import stl from "./Purchases.module.css";

const Purchases = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.common.isLoading);
  const purchases = useSelector((state) => state.purchases.purchases);
  const totalPages = useSelector((state) => state.purchases.totalPages);

  const dispatch = useDispatch();

  const [filterBy, setFilterBy] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleFilterChange = (val) => {
    setFilterBy(val);
  };
  const handleSortChange = (val) => {
    setSortBy(val);
  };

  const handleDelete = (id) => {
    dispatch(deletePurchase(id));
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");

    dispatch(getPurchases(page));
  }, [isLoggedin, navigate, page]);

  useEffect(() => {
    if (!filterBy && !sortBy) return;
    dispatch(getPurchases(page, filterBy, sortBy));
  }, [filterBy, sortBy]);

  return isAdmin ? (
    <Layout manage>
      <div className={stl.wrapper}>
        <Header title="المشتريات" path="/manage/Purchases/add" />
        <Filters
          selectedFilter={filterBy}
          onRadioChange={handleFilterChange}
          onSelectChange={handleSortChange}
          selectedSort={sortBy}
        />
        {loading ? (
          <Loader />
        ) : Object.keys(purchases).length && purchases?.rows[0]?.length ? (
          <>
            <Table
              titles={purchases.keys}
              data={purchases.rows[0]}
              deleteItem={handleDelete}
              path={"/manage/purchases/edit/"}
            />
            {totalPages > 1 && (
              <Pagination
                totalPages={[...Array(totalPages)].map((_, i) => i + 1)}
                currentPage={page}
                loading={loading}
                setCurrentPage={setPage}
              />
            )}
          </>
        ) : (
          <h3 className={stl.noResults}>لا يوجد نتائج</h3>
        )}
      </div>
    </Layout>
  ) : (
    <Login validateAdmin />
  );
};

export default Purchases;
