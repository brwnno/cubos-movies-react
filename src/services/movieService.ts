// src/services/movieService.ts
export const fetchMovies = async (query: string, page: number, filter: any) => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmU3NTdlNzdhNDZkNzM3N2JlZmI0YWU1ZjRmNDVkNSIsIm5iZiI6MTczNzI5NDk0Mi40NTEsInN1YiI6IjY3OGQwNDVlZDA5NGVhN2FmMTQzM2I2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LBysW--Vs92fJ8b85Himtuf7WE1ltAfmc4KTNgemDw";

  const queryParams = {
    query,
    page,
    language: "pt-br",
    sort_by: filter.sort_by || "",
    primary_release_date_gte: filter.primary_release_date_gte,
    "vote_average.gte": filter.vote_average_gte,
    "vote_count.gte": filter.vote_count_gte,
    with_genres: filter.with_genres,
    with_watch_providers: filter.with_watch_providers,
    watch_region: filter.watch_region,
  };

  const buildQueryString = (params: Record<string, any>) => {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");
  };

  const baseEndpoint = queryParams.query
    ? "https://api.themoviedb.org/3/search/movie"
    : "https://api.themoviedb.org/3/discover/movie";

  const queryString = buildQueryString(queryParams);
  const endpoint = `${baseEndpoint}?${queryString}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar filmes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
};
