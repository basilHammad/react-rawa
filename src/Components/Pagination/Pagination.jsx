import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

import stl from "./Pagination.module.css";

const Pagination = ({
  totalPages,
  currentPage,
  //   children,
  loading,
  setCurrentPage,
  className,
}) => {
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleNextPage = () => {
    if (totalPages.includes(currentPage + 1)) {
      setCurrentPage((pre) => pre + 1);
    }
  };

  const handlePreviousPage = () => {
    if (totalPages.includes(currentPage - 1)) {
      setCurrentPage((pre) => pre - 1);
    }
  };

  return (
    <>
      {!loading && (
        <div className={`${stl.paginationNav} ${className ? className : ""}`}>
          {/* prev Button */}
          <button
            className={`${stl.paginationLink}  ${
              currentPage === 1 ? stl.disabled : ""
            }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <i>
              <MdChevronRight />
            </i>
          </button>

          {/* Page Numbers */}
          {totalPages.map((pageNum, i) => (
            <button
              key={i}
              className={`${stl.paginationLink} ${
                currentPage === pageNum ? stl.active : ""
              }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            className={`${stl.paginationLink}  ${
              currentPage === totalPages.length ? stl.disabled : ""
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages.length}
          >
            <i>
              <MdChevronLeft />
            </i>
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
