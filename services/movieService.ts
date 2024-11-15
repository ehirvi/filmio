import axios from "axios";
import { API_KEY, API_URL } from "../utils/constants";
import { DiscoverMovieResponse, Genre } from "../utils/types";

const getMoviesByGenre = async (genres: Genre[], page = 1) => {
  const url = `${API_URL}discover/movie`;
  const genresStringified = genres.map((g) => g.id).join(",");
  const query = `?api_key=${API_KEY}&page=${page}&with_genres=${genresStringified}&sort_by=vote_count.desc`;
  const { data } = await axios.get<DiscoverMovieResponse>(`${url + query}`);
  return data.results;
};

const findOneById = async (id: number) => {
  const url = `${API_URL}movie/${id}`;
  const query = `?api_key=${API_KEY}`;
  const { data } = await axios.get(`${url + query}`);
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

export default { getMoviesByGenre, findOneById, findManyById };
