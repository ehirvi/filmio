import axios from "axios";
import { API_KEY, API_URL } from "../utils/constants";
import { Actor, DiscoverMovieResponse, Genre } from "../utils/types";

const getMoviesByGenre = async (genres: Genre[], page = 1) => {
  const url = `${API_URL}discover/movie`;
  const genresStringified = genres.map((g) => g.id).join(",");
  const query = `?api_key=${API_KEY}&page=${page}&with_genres=${genresStringified}&sort_by=vote_count.desc`;
  const { data } = await axios.get<DiscoverMovieResponse>(`${url + query}`);
  return data.results;
};

const findOneById = async (id: number) => {
  const url = `${API_URL}movie/${id}?api_key=${API_KEY}`;
  const { data } = await axios.get(url);
  return data;
};

const findManyById = async (ids: number[]) => {
  const promises: Promise<any>[] = [];
  ids.forEach((id) => {
    promises.push(findOneById(id));
  });
  const data = await Promise.all(promises);
  return data;
};

const getCastOfMovie = async (id: number) => {
  const url = `${API_URL}movie/${id}/credits?api_key=${API_KEY}`;
  try {
    const { data } = await axios.get<{ cast: Actor[] }>(url);
    return data;
  } catch (err: unknown) {
    console.error(err);
  }
};

export default { getMoviesByGenre, findOneById, findManyById, getCastOfMovie };
