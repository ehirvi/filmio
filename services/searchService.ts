import axios from "axios";
import { API_KEY, API_URL } from "../utils/constants";
import { MovieSearchResult } from "../utils/types";

const getResultPage = async (query: string, page = 1) => {
  const url = `${API_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  try {
    const { data } = await axios.get<MovieSearchResult>(url);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching search results:", err.message);
    }
  }
};

export default { getResultPage };
