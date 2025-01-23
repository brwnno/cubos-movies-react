import React, { useState, useEffect } from "react";
import "./OthersFltters.scss";

interface applyFiltersProps {
  onApplyFilters: (value: any) => void;
  genres: { id: number; name: string }[];
}

const OthersFltters: React.FC<applyFiltersProps> = ({
  onApplyFilters,
  genres,
}) => {
  const [filters, setFilters] = useState({
    sort_by: "",
    include_adult: false,
    include_video: false,
    primary_release_date_gte: "",
    primary_release_date_lte: "",
    vote_average_gte: "",
    vote_count_gte: "",
    with_genres: "", // Ensure this is a string initially
    with_watch_providers: "",
  });

  const [sortOptions] = useState([
    {
      id: "popularity.asc",
      value: "popularity.asc",
      title: "Popularidade (Descrescente)",
    },
    {
      id: "popularity.desc",
      value: "popularity.desc",
      title: "Popularidade (Crescente)",
    },
    {
      id: "vote_average.asc",
      value: "vote_average.asc",
      title: "Avaliação (Descrescente)",
    },
    {
      id: "vote_average.desc",
      value: "vote_average.desc",
      title: "Avaliação (Crescente)",
    },
    {
      id: "vote_count.asc",
      value: "vote_count.asc",
      title: "Contagem de Votos (Descrescente)",
    },
    {
      id: "vote_count.desc",
      value: "vote_count.desc",
      title: "Contagem de Votos (Crescente)",
    },
    {
      id: "original_title.asc",
      value: "original_title.asc",
      title: "Título Original (Descrescente)",
    },
    {
      id: "original_title.desc",
      value: "original_title.desc",
      title: "Título Original (Crescente)",
    },
    { id: "title.asc", value: "title.asc", title: "Título (Descrescente)" },
    { id: "title.desc", value: "title.desc", title: "Título (Crescente)" },
    {
      id: "revenue.asc",
      value: "revenue.asc",
      title: "Receita (Descrescente)",
    },
    { id: "revenue.desc", value: "revenue.desc", title: "Receita (Crescente)" },
  ]);

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="filters-container">
      <div className="container">
        <div className="filter-group">
          <label htmlFor="sort_by">Ordenar por:</label>
          <select
            id="sort_by"
            value={filters.sort_by}
            onChange={(e) =>
              setFilters({ ...filters, sort_by: e.target.value })
            }
          >
            {" "}
            <option value=""></option>{" "}
            {sortOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="primary_release_date_gte">Data de Lançamento</label>
          <input
            type="date"
            id="primary_release_date_gte"
            value={filters.primary_release_date_gte}
            onChange={(e) =>
              setFilters({
                ...filters,
                primary_release_date_gte: e.target.value,
              })
            }
          />
        </div>

        <div className="filter-group">
          <label htmlFor="vote_average_gte">Avaliação Mínima</label>
          <input
            type="number"
            id="vote_average_gte"
            min="0"
            max="10"
            step="0.1"
            value={filters.vote_average_gte}
            onChange={(e) =>
              setFilters({ ...filters, vote_average_gte: e.target.value })
            }
          />
        </div>

        <div className="filter-group">
          <label htmlFor="vote_count_gte">Contagem de Votos Mínima</label>
          <input
            type="number"
            id="vote_count_gte"
            min="0"
            value={filters.vote_count_gte}
            onChange={(e) =>
              setFilters({ ...filters, vote_count_gte: e.target.value })
            }
          />
        </div>

        <div className="filter-group">
          <label htmlFor="with_genres">Gêneros</label>
          <select
            id="with_genres"
            value={filters.with_genres}
            onChange={(e) =>
              setFilters({ ...filters, with_genres: e.target.value })
            }
          >
            <option value=""></option>{" "}
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button className="apply-filters-button" onClick={applyFilters}>
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default OthersFltters;
