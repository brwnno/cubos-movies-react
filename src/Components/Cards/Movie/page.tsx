import React, { useMemo } from "react";
import { ShortDataFormat } from "@/utils/formatDate";
import type { Movie } from "@/type/Movie";
import { useMediaQuery } from "react-responsive";
import "./Movie.scss";

interface MovieInfoProps {
  movie: Movie | null;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }),
    [movie?.backdrop_path],
  );

  const toPercentage = (value: number) => {
    let percentage = Math.round(value * 1000);
    percentage = Math.round(percentage / 100);
    return `${percentage}`;
  };

  const profit = (revenue: number, budget: number) =>
    formatWithIntl(revenue - budget);

  const formatWithIntl = (value: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const hoursText = hours > 0 ? `${hours}h` : "";
    const minutesText = remainingMinutes > 0 ? `${remainingMinutes}m` : "";

    return [hoursText, minutesText].filter(Boolean).join(" ");
  };

  const getLanguageName = (code: string) => {
    try {
      const language = new Intl.DisplayNames(["pt"], { type: "language" });
      return language.of(code);
    } catch (error) {
      console.error("Erro ao obter o nome do idioma:", error);
      return null;
    }
  };

  return (
    <section className="movie-info" style={!isMobile ? backgroundStyle : {}}>
      <div className="overlay"></div>
      <figure className="card-image">
        <picture>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            title={movie?.title}
            loading="lazy"
            sizes="
              (min-width: 1400px) 262px,
              (min-width: 1200px) 198px,
              (min-width: 992px) 164px,
              (min-width: 768px) 132px,
              280px
            "
          />
        </picture>
      </figure>

      <div className="details">
        <div className="container">
          <div className="container-title">
            <h2>{movie?.title}</h2>
            <p className="subtitle">
              Título original: {movie?.original_title}
              <br />
            </p>
            <p className="tagline">{movie?.tagline}</p>
          </div>

          <div className="rating-container">
            <div className="cardBox">
              <h5 className="title">Popularidade</h5>
              <p className="text">{movie?.popularity}</p>
            </div>
            <div className="cardBox">
              <h5 className="title">Votos</h5>
              <p className="text">{movie?.vote_count}</p>
            </div>

            <div className="circle">
              <svg className="progress" viewBox="0 0 36 36">
                <path
                  className="bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="progress-bar"
                  strokeDasharray={`${toPercentage(movie?.vote_average ?? 0)}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="percentage">
                {toPercentage(movie?.vote_average ?? 0)}
                <small>%</small>
              </span>
            </div>
          </div>
        </div>

        <div className="details-grid">
          <div className="main-details">
            <div className="cardBox">
              <span className="synopsis">
                <h5 className="title">Sinopse</h5>
                <p className="text">{movie?.overview}</p>
              </span>
            </div>
            <div className="container">
              <div className="cardBox">
                <h5 className="title">Gêneros</h5>
                <div className="genres">
                  {movie?.genres.map((genre, index) => (
                    <span key={index} className="genre">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="additional-details">
            <div className="details-row-one">
              <div className="cardBox">
                <h5 className="title">Lançamento</h5>
                <p className="text">
                  {ShortDataFormat(movie?.release_date ?? "")}
                </p>
              </div>
              <div className="cardBox">
                <h5 className="title">Duração</h5>
                <p className="text">{formatDuration(movie?.runtime ?? 0)}</p>
              </div>
              <div className="cardBox">
                <h5 className="title">Situação</h5>
                <p className="text">{movie?.status}</p>
              </div>
              <div className="cardBox">
                <h5 className="title">Idioma</h5>
                <p className="text">
                  {getLanguageName(movie?.original_language ?? "")}
                </p>
              </div>
            </div>

            <div className="details-row-two">
              <div className="cardBox">
                <h5 className="title">Orçamento</h5>
                <p className="text">{formatWithIntl(movie?.budget ?? 0)}</p>
              </div>
              <div className="cardBox">
                <h5 className="title">Receita</h5>
                <p className="text">{formatWithIntl(movie?.revenue ?? 0)}</p>
              </div>
              <div className="cardBox">
                <h5 className="title">Lucro</h5>
                <p className="text">
                  {profit(movie?.revenue ?? 0, movie?.budget ?? 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieInfo;
