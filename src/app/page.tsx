"use client";
import React, { useState } from "react";
import Filters from "@/Components/Filters/page";
import CardsMovies from "@/Components/Cards/Movies/page";
import Pagination from "@/Components/Pagination/page";
import OthersFltters from "@/Components/OthersFltters/page";
import useMovies from "@/hooks/useMovies";
import "@/style/Page.scss";
import "@/style/Reset.scss";
import useGenre from "@/hooks/useGenre";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<any | null>(null);
  const [isExistOtherFilter, setIsExistOtherFilter] = useState<boolean>(false);

  const { movies, total } = useMovies(search, currentPage, filter);
  const { genre } = useGenre();
  const getBy = (eventSearch: string) => {
    setSearch(eventSearch);
  };

  const applyFilters = (eventFilter: any) => {
    setFilter(eventFilter);
  };

  const isExist = (eventIsExist: boolean) => {
    setIsExistOtherFilter(eventIsExist);
  };

  const pagination = (eventPagination: any) => {
    setCurrentPage(eventPagination);
  };

  return (
    <div>
      <div className="main-container">
        <div className="content">
          <Filters onGetBy={getBy} onIsExist={isExist} />

          <div>
            <div className="overlayBackground"></div>
          </div>

          {isExistOtherFilter && (
            <OthersFltters onApplyFilters={applyFilters} genres={genre} />
          )}

          <CardsMovies movies={movies} genres={genre} />

          <Pagination
            onpageCurrent={currentPage}
            onpagesTotal={total}
            onPagination={pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
