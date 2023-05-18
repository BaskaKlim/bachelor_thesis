import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageClick }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationButtons}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            id={number}
            onClick={onPageClick}
            className={`${styles.pageButton} ${
              currentPage === number ? styles.active : ""
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
