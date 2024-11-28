import axios from "axios";
import { API_KEY, API_URL } from "../utils/constants";
import {
  Actor,
  Genre,
  MovieSearchResult,
  MovieTopDetails,
} from "../utils/types";

const getMoviesByGenre = async (genres: Genre[], page = 1) => {
  const genresStringified = genres.map((g) => g.id).join(",");
  const url = `${API_URL}discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genresStringified}&sort_by=vote_count.desc`;
  try {
    const { data } = await axios.get<MovieSearchResult>(url);
    return data.results;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching movies by gender:", err.message);
    }
  }
};

const findOneById = async (id: number) => {
  const url = `${API_URL}movie/${id}?api_key=${API_KEY}`;
  const { data } = await axios.get<MovieTopDetails>(url);
  return data;
};

const findManyById = async (ids: number[]) => {
  const promises: Promise<MovieTopDetails>[] = [];
  ids.forEach((id) => {
    promises.push(findOneById(id));
  });
  try {
    const data = await Promise.all(promises);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching movies:", err.message);
    }
  }
};

const getCastOfMovie = async (id: number) => {
  const url = `${API_URL}movie/${id}/credits?api_key=${API_KEY}`;
  try {
    const { data } = await axios.get<{ cast: Actor[] }>(url);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching movie cast:", err.message);
    }
  }
};

export default { getMoviesByGenre, findOneById, findManyById, getCastOfMovie };
