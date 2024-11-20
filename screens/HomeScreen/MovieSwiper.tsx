import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  DiscoverMovieResponse,
  HomeScreenStackParamlist,
} from "../../utils/types";
import { useEffect, useRef, useState } from "react";
import movieService from "../../services/movieService";
import MovieCard from "../../components/MovieCard";
import { ActivityIndicator, FAB, MD2Colors } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import useMovieStore from "../../hooks/useStore";

type Props = NativeStackScreenProps<HomeScreenStackParamlist, "MovieSwiper">;

const MovieSwiper = ({ route }: Props) => {
  const { genres } = route.params;
  const page = useRef(1);
  const [movies, setMovies] = useState<DiscoverMovieResponse["results"]>([]);
  const db = useSQLiteContext();
  const savedMovies = useMovieStore((state) => state.movies);
  const saveMovie = useMovieStore((state) => state.saveMovie);

  const firstInQueue = movies[0];

  useEffect(() => {
    fetchMovies();
  }, [page.current]);

  const fetchMovies = async () => {
    const res = await movieService.getMoviesByGenre(genres, page.current);
    const filteredMovies = res.filter(
      (movie) => !savedMovies.some((saved) => saved.movie_id === movie.id)
    );
    if (filteredMovies.length === 0) {
      page.current++;
    }
    setMovies((arr) => [...arr, ...filteredMovies]);
  };

  const removeFromQueue = () => {
    if (movies.length <= 2) {
      page.current++;
    }
    setMovies((arr) => arr.slice(1));
  };

  const handleAccept = () => {
    saveMovie(db, firstInQueue.id, false);
    removeFromQueue();
  };

  if (movies.length > 0)
    return (
      <>
        <View>
          <MovieCard movie={firstInQueue} />
          <View style={styles.buttonRow}>
            <FAB icon="close-thick" size="large" onPress={removeFromQueue} />
            <FAB icon="heart" size="large" onPress={handleAccept} />
          </View>
        </View>
      </>
    );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default MovieSwiper;
