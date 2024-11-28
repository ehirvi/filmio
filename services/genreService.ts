import axios from "axios";
import { API_KEY, API_URL } from "../utils/constants";
import { Genre } from "../utils/types";

const getAll = async () => {
  const url = `${API_URL}genre/movie/list`;
  const query = `?api_key=${API_KEY}`;
  try {
    const { data } = await axios.get<{ genres: Genre[] }>(`${url + query}`);
    return data.genres;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching genres:", err.message);
    }
  }
};

export default { getAll };
