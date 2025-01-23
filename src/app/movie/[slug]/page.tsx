"use client";
import React, { useEffect, useState } from "react";
import { fetchMovieDetails } from "@/services/movieByIdService";
import CardsMovie from "@/Components/Cards/Movie/page";
import { Movie } from "@/type/Movie";

const MovieDetails = () => {
  const [movies, setMovies] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullSlug = window.location.href.split("/");

      const newUrl = fullSlug.at(-1) as string;

      const fetchMoviesById = async () => {
        try {
          setLoading(true);
          const data = await fetchMovieDetails(newUrl, "pt-BR");
          setMovies(data || []);
        } catch (error) {
          console.error("Erro ao buscar filmes:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMoviesById();
    }
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="movie-details">
      <main className="content">
        <CardsMovie movie={movies} />

        <section className="trailer">
          <h3>Trailer</h3>
          {movies?.videos?.results
            .slice(0, 1)
            .map((video, index) => (
              <iframe
                key={index}
                width="1238"
                height="647"
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
        </section>
      </main>
    </div>
  );
};

export default MovieDetails;
