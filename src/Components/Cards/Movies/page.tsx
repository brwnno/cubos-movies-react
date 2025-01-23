import React, { useEffect, useState } from "react";
import "./Movies.scss";
import useGenre from "@/hooks/useGenre";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}

interface MoviesProps {
  movies: Movie[];
  genres: { id: number; name: string }[];
}

const Movies: React.FC<MoviesProps> = ({ movies, genres }) => {
  const toPercentage = (value: number): string => {
    let percentage = Math.round(value * 1000);
    percentage = Math.round(percentage / 100);
    return `${percentage}`;
  };

  const findByGenreIds = (
    ids: number[],
    genres: { id: number; name: string }[],
  ): string => {
    const genreNames = ids
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean);
    return genreNames.join(", ");
  };

  return (
    <section className="cards">
      <div className="background">
        <div className="cards-container">
          {movies.map((card, index) => (
            <article
              key={index}
              className="card"
              aria-labelledby={`card-title-${index}`}
            >
              <a href={`movie/${card.id}`} title={card.title}>
                <figure className="card-image">
                  <picture>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                      alt={card.title}
                      title={card.title}
                      loading="lazy"
                      sizes="(min-width: 1400px) 262px, (min-width: 1200px) 198px, (min-width: 992px) 164px, (min-width: 768px) 132px, 280px"
                    />
                  </picture>

                  <figcaption className="hover-overlay">
                    <div className="rating-container">
                      <div className="circle">
                        <svg className="progress" viewBox="0 0 36 36">
                          <path
                            className="bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="progress-bar"
                            strokeDasharray={`${toPercentage(card.vote_average)}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="percentage">
                          {toPercentage(card.vote_average)}
                          <small>%</small>
                        </span>
                      </div>
                    </div>

                    <div className="text-overlay">
                      <h3 id={`card-title-${index}`}>{card.title}</h3>
                      <div className="genre">
                        <p>{findByGenreIds(card.genre_ids, genres)}</p>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Movies;
