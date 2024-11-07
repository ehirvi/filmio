import axios from "axios";
import { API_KEY, API_URL } from "../utils/constants";
import { Genre } from "../utils/types";

const getAll = async () => {
  const url = `${API_URL}genre/movie/list`;
  const query = `?api_key=${API_KEY}`;
  const { data } = await axios.get<{ genres: Genre[] }>(`${url + query}`);
  return data.genres;
};

export default { getAll };
