import React from 'react';
import '../styles/Paginate.css'; // Import the CSS file for styles

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleGoToFirstPage = () => {
    if (!isFirstPage) {
      onPageChange(1);
    }
  };

  const handleGoToLastPage = () => {
    if (!isLastPage) {
      onPageChange(totalPages);
    }
  };

  const handlePageClick = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
      onPageChange(pageNum);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`pagination-page${currentPage === i ? ' active' : ''}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </li>
        );
      }
    } else {
      if (!isFirstPage) {
        pageNumbers.push(
          <li
            key={currentPage - 1}
            className={`pagination-page`}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            {currentPage - 1}
          </li>
        );
      }

      pageNumbers.push(
        <li
          key={currentPage}
          className={`pagination-page active`}
          onClick={() => handlePageClick(currentPage)}
        >
          {currentPage}
        </li>
      );

      if (currentPage < totalPages - 1) {
        pageNumbers.push(
          <li
            key={currentPage + 1}
            className={`pagination-page`}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            {currentPage + 1}
          </li>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<li key="ellipsis1" className="pagination-ellipsis">...</li>);
      }

      if (currentPage < totalPages) {
        pageNumbers.push(
          <li
            key={totalPages}
            className={`pagination-page`}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </li>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <ul className="pagination">
      <li
        className={`pagination-link${isFirstPage ? ' disabled' : ''}`}
        onClick={handleGoToFirstPage}
      >
        Go to First Page
      </li>
      <li
        className={`pagination-link${isFirstPage ? ' disabled' : ''}`}
        onClick={handlePreviousPage}
      >
        Previous
      </li>
      {renderPageNumbers()}
      <li className={`pagination-link${isLastPage ? ' disabled' : ''}`} onClick={handleNextPage}>
        Next
      </li>
      <li
        className={`pagination-link${isLastPage ? ' disabled' : ''}`}
        onClick={handleGoToLastPage}
      >
        Go to Last Page
      </li>
    </ul>
  );
};

export default Pagination;
