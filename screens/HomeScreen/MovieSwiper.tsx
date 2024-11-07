import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  DiscoverMovieResponse,
  HomeScreenStackParamlist,
} from "../../utils/types";
import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import MovieCard from "../../components/MovieCard";
import { FAB } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { saveMovie } from "../../utils/sqlite";
import { useSQLiteContext } from "expo-sqlite";

type Props = NativeStackScreenProps<HomeScreenStackParamlist, "MovieSwiper">;

const MovieSwiper = ({ route }: Props) => {
  const { genres } = route.params;
  const [movies, setMovies] = useState<DiscoverMovieResponse["results"]>();
  const [page, setPage] = useState(1);
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await movieService.getMoviesByGenre(genres, page);
      setMovies(results);
    };
    fetchMovies();
  }, []);

  const handleReject = (movies: DiscoverMovieResponse["results"]) => {
    setMovies(movies.slice(1));
  };

  const handleAccept = async (movies: DiscoverMovieResponse["results"]) => {
    const movieId = movies[0].id;
    await saveMovie(db, movieId, false);
    setMovies(movies.slice(1));
  };

  if (movies) {
    return (
      <View>
        <MovieCard movie={movies[0]} />
        <View style={styles.buttonRow}>
          <FAB
            icon="close-thick"
            size="large"
            onPress={() => handleReject(movies)}
          />
          <FAB
            icon="heart"
            size="large"
            onPress={() => void handleAccept(movies)}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default MovieSwiper;
