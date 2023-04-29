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
  const permissions = useSelector(({ auth }) => auth.permissions);

  const canAdd = permissions?.includes("add-purchases");

  const dispatch = useDispatch();

  const [filterBy, setFilterBy] = useState("");
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

    // dispatch(getPurchases(page));
  }, [isLoggedin, navigate, page]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("view-purchases")) navigate("/unauthorized");
  }, [permissions]);

  useEffect(() => {
    // if (!filterBy && !sortBy) return;
    dispatch(getPurchases(page, filterBy, sortBy));
  }, [filterBy, sortBy, page]);

  return (
    <Layout manage>
      <div className={stl.wrapper}>
        <Header
          title="المشتريات"
          path="/manage/Purchases/add"
          hideButton={!canAdd}
        />
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
              canDelete={permissions?.includes("delete-purchases")}
              canEdit={permissions?.includes("edit-purchases")}
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
  );
};

export default Purchases;
