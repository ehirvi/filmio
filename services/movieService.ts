import axios from "axios";
import { API_KEY } from "../utils/constants";
import { Genre, MoviesFilteredByGenre } from "../utils/types";

const API_URL = process.env.EXPO_PUBLIC_API_FILTER_URL;

const getMoviesByGenre = async (genres: Genre[], page = 1) => {
  const genresStringified = genres.map((g) => g.id).join(",");
  const query = `?api_key=${API_KEY}&page=${page}&with_genres=${genresStringified}`;
  const { data } = await axios.get<MoviesFilteredByGenre>(`${API_URL}${query}`);
  return data.results;
};

export default { getMoviesByGenre };
