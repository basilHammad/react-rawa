import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../../Components/Layout/Layout";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Components/Pagination/Pagination";
import {
  deleteExpense,
  getExpenses,
} from "../../../store/actions/expensesActions";
import Filters from "../Components/Filters/Filters";
import Header from "../Components/Header/Header";
import Table from "../Components/Table/Table";
import stl from "./Expenses.module.css";

const Expenses = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const loading = useSelector((state) => state.common.isLoading);
  const totalPages = useSelector((state) => state.expenses.totalPages);
  const expenses = useSelector((state) => state.expenses.expenses);
  const permissions = useSelector(({ auth }) => auth.permissions);

  const canAdd = permissions?.includes("add-expenses");

  const [filterBy, setFilterBy] = useState("");
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
    dispatch(deleteExpense(id));
  };

  useEffect(() => {
    if (!isLoggedin) navigate("/login");
    // dispatch(getExpenses(page));
  }, [isLoggedin, navigate, page]);

  useEffect(() => {
    if (!permissions) return;
    if (!permissions?.includes("view-expenses")) navigate("/unauthorized");
  }, [permissions]);

  useEffect(() => {
    // if (!filterBy && !sortBy) return;
    dispatch(getExpenses(page, filterBy, sortBy));
  }, [filterBy, sortBy, page]);

  return (
    <Layout manage>
      <div className={stl.wrapper}>
        <Header
          title="المصروفات"
          path="/manage/expenses/add"
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
        ) : Object.keys(expenses).length && expenses?.rows[0]?.length ? (
          <>
            <Table
              titles={expenses.keys}
              data={expenses.rows[0]}
              deleteItem={handleDelete}
              path={"/manage/expenses/edit/"}
              canDelete={permissions?.includes("delete-expenses")}
              canEdit={permissions?.includes("edit-expenses")}
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

export default Expenses;
