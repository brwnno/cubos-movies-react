export const fetchMovieDetails = async (
  id: string,
  language: string = "pt-br",
) => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmU3NTdlNzdhNDZkNzM3N2JlZmI0YWU1ZjRmNDVkNSIsIm5iZiI6MTczNzI5NDk0Mi40NTEsInN1YiI6IjY3OGQwNDVlZDA5NGVhN2FmMTQzM2I2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LBysW--Vs92fJ8b85Himtuf7WE1ltAfmc4KTNgemDw";

  const endpoint = `https://api.themoviedb.org/3/movie/${id}?language=${language}&append_to_response=videos,images`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: token,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar filmes na API do TMDb.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
};
