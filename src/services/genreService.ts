interface Filter {
  sort_by?: string;
  primary_release_date_gte?: string;
  vote_average_gte?: number;
  vote_count_gte?: number;
  with_genres?: string;
  with_watch_providers?: string;
  watch_region?: string;
}

export const fetchGenres = async (language: string = "pt-br") => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmU3NTdlNzdhNDZkNzM3N2JlZmI0YWU1ZjRmNDVkNSIsIm5iZiI6MTczNzI5NDk0Mi40NTEsInN1YiI6IjY3OGQwNDVlZDA5NGVhN2FmMTQzM2I2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LBysW--Vs92fJ8b85Himtuf7WE1ltAfmc4KTNgemDw";
  const endpoint = `https://api.themoviedb.org/3/genre/movie/list?language=${language}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar gêneros");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    throw error;
  }
};
