import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Components/Pagination/Pagination";
import {
  deleteRevenue,
  getRevenues,
} from "../../../store/actions/revenuesActions";
import Login from "../../Login/Login";
import Filters from "../Components/Filters/Filters";
import Header from "../Components/Header/Header";
import Table from "../Components/Table/Table";

import stl from "./Revenues.module.css";

const Revenues = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.common.isLoading);
  const revenues = useSelector((state) => state.revenues.revenues);
  const totalPages = useSelector((state) => state.revenues.totalPages);

  const [filterBy, setFilterBy] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFilterChange = (val) => {
    setFilterBy(val);
  };
  const handleSortChange = (val) => {
    setSortBy(val);
  };

  const handleDelete = (id) => {
    dispatch(deleteRevenue(id));
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
    dispatch(getRevenues(page));
  }, [isLoggedin, navigate, page]);

  useEffect(() => {
    if (!filterBy && !sortBy) return;
    dispatch(getRevenues(page, filterBy, sortBy));
  }, [filterBy, sortBy]);

  return isAdmin ? (
    <Layout manage>
      <div className={stl.wrapper}>
        <Header title="الإرادات" path="/manage/revenues/add" />
        <Filters
          selectedFilter={filterBy}
          onRadioChange={handleFilterChange}
          onSelectChange={handleSortChange}
          selectedSort={sortBy}
        />
        {loading ? (
          <Loader />
        ) : Object.keys(revenues).length && revenues?.rows[0]?.length ? (
          <>
            <Table
              titles={revenues.keys}
              data={revenues.rows[0]}
              deleteItem={handleDelete}
              path={"/manage/revenues/edit/"}
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

export default Revenues;
