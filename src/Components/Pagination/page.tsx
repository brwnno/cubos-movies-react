"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Pagination.scss";

interface PaginationProps {
  onpageCurrent: number;
  onpagesTotal: number;
  onPagination: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  onpageCurrent,
  onpagesTotal,
  onPagination,
}) => {
  const [page, setPage] = useState(onpageCurrent);
  const totalPerPage = 5;

  const getPages = () => {
    const pages: number[] = [];
    for (let i = 1; i <= onpagesTotal; i++) {
      pages.push(i);
    }

    const halfRange = Math.floor(totalPerPage / 2);

    let startPage = page;
    let endPage = page + totalPerPage - 1;

    if (page === 1) {
      endPage = Math.min(totalPerPage, onpagesTotal);
    } else if (page === onpagesTotal) {
      startPage = Math.max(1, onpagesTotal - totalPerPage + 1);
      endPage = onpagesTotal + 1;
    } else {
      startPage = page - halfRange;
      if (startPage < 1) startPage = 1;
      endPage = startPage + totalPerPage - 1;
      if (endPage > onpagesTotal) {
        endPage = onpagesTotal;
        startPage = endPage - totalPerPage + 1;
      }
    }

    return pages.slice(startPage - 1, endPage);
  };

  const changePage = (pageItem: number) => {
    setPage(pageItem);
    onPagination(pageItem);
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn prev"
        aria-label="Previous Page"
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
      >
        <Icon
          aria-label="Next Page"
          icon="lets-icons:expand-left-light"
          width="24"
          height="24"
        />
      </button>

      {getPages().map((pageItem) => (
        <button
          key={pageItem}
          className={
            pageItem === page ? "pagination-btn active" : "pagination-btn"
          }
          onClick={() => changePage(pageItem)}
        >
          {pageItem}
        </button>
      ))}

      <button
        className="pagination-btn next"
        aria-label="Next Page"
        disabled={page >= onpagesTotal}
        onClick={() => changePage(page + 1)}
      >
        <Icon
          aria-label="Next Page"
          icon="lets-icons:expand-right-light"
          width="24"
          height="24"
        />
      </button>
    </div>
  );
};

export default Pagination;
