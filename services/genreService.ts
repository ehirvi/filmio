import axios from "axios";
import { API_KEY } from "../utils/constants";
import { Genre } from "../utils/types";

const API_URL = process.env.EXPO_PUBLIC_API_GENRE_URL;

const getAll = async () => {
  const { data } = await axios.get<{ genres: Genre[] }>(
    `${API_URL}?api_key=${API_KEY}`
  );
  return data.genres;
};

export default { getAll };
