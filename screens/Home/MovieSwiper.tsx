import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  HomeScreenStackParamlist,
  MoviesFilteredByGenre,
} from "../../utils/types";
import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import MovieCard from "../../components/MovieCard";
import { Button, FAB } from "react-native-paper";
import { View } from "react-native";

type Props = NativeStackScreenProps<HomeScreenStackParamlist, "MovieSwiper">;

const MovieSwiper = ({ route }: Props) => {
  const { genres } = route.params;
  const [movies, setMovies] = useState<MoviesFilteredByGenre["results"]>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await movieService.getMoviesByGenre(genres, page);
      setMovies(results);
    };
    fetchMovies();
  }, []);

  const handleReject = () => {
    setMovies((movies) => movies!.slice(1));
  };

  if (movies) {
    return (
      <View>
        <MovieCard movie={movies[0]} />
        <View>
          <FAB icon="close-thick" onPress={handleReject} />
          <FAB icon="heart" />
        </View>
        {/* <Button mode="contained" onPress={handleReject}>
          X
        </Button> */}
      </View>
    );
  }
};

export default MovieSwiper;
