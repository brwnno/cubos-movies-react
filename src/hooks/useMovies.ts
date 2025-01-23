// src/hooks/useMovies.ts
import { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "../services/movieService"; // Aqui é onde você importa o serviço

const useMovies = (
  searchQueryParam: string,
  pageParam: number,
  filter: any,
) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  const fetchMoviesData = useCallback(async () => {
    const queryParams = {
      query: searchQueryParam,
      page: pageParam,
      language: "pt-BR",
      sort_by: filter?.sort_by || "",
      primary_release_date_gte: filter?.primary_release_date_gte || "",
      vote_average_gte: filter?.vote_average_gte || "",
      vote_count_gte: filter?.vote_count_gte || "",
      with_genres: filter?.with_genres || "",
    };

    try {
      const data = await fetchMovies(searchQueryParam, pageParam, queryParams);
      setMovies(data?.results || []);
      setTotal(data?.total_pages || 0);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  }, [searchQueryParam, pageParam, filter]);

  useEffect(() => {
    fetchMoviesData();
  }, [searchQueryParam, pageParam, filter, fetchMoviesData]);

  return { movies, total, fetchMoviesData };
};

export default useMovies;
