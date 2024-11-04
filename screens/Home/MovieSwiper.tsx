import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Text } from "react-native";
import {
  HomeScreenStackParamlist,
  MoviesFilteredByGenre,
} from "../../utils/types";
import { useEffect, useState } from "react";
import movieService from "../../services/movieService";

type Props = NativeStackScreenProps<HomeScreenStackParamlist, "MovieSwiper">;

const MovieSwiper = ({ route }: Props) => {
  const { genres } = route.params;
  const [movies, setMovies] = useState<MoviesFilteredByGenre["results"]>();

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await movieService.getMoviesByGenre(genres);
      console.log(results);
      setMovies(results);
    };
    fetchMovies();
  }, []);

  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
};

export default MovieSwiper;
