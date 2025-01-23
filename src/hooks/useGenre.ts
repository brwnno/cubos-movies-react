import { useState, useEffect, useCallback } from "react";
import { fetchGenres } from "@/services/genreService";

const useGenre = () => {
  const [genre, setGenre] = useState<any[]>([]);

  const fetchGenreData = useCallback(async () => {
    try {
      const language = "pt-br";
      const data = await fetchGenres(language);

      setGenre(data?.genres || []);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
    }
  }, []);

  useEffect(() => {
    fetchGenreData();
  }, [fetchGenreData]);

  return {
    genre,
    fetchGenreData,
  };
};

export default useGenre;
