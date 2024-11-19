import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  DiscoverMovieResponse,
  HomeScreenStackParamlist,
} from "../../utils/types";
import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import MovieCard from "../../components/MovieCard";
import { ActivityIndicator, FAB, MD2Colors } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import useMovieStore from "../../hooks/useStore";

type Props = NativeStackScreenProps<HomeScreenStackParamlist, "MovieSwiper">;

const MovieSwiper = ({ route }: Props) => {
  const { genres } = route.params;
  const [movies, setMovies] = useState<DiscoverMovieResponse["results"]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const db = useSQLiteContext();
  const getSavedMovies = useMovieStore((state) => state.getSavedMovies);
  const saveMovie = useMovieStore((state) => state.saveMovie);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const results = await movieService.getMoviesByGenre(genres, page);
      setMovies((m) => m.concat(results));
      setLoading(false);
    };
    fetchMovies();
  }, [page]);

  const removeFromQueue = (movies: DiscoverMovieResponse["results"]) => {
    if (movies.length === 2) {
      setPage((page) => page + 1);
    }
    setMovies(movies.slice(1));
  };

  const handleAccept = (movies: DiscoverMovieResponse["results"]) => {
    const movieId = movies[0].id;
    saveMovie(db, movieId, false);
    removeFromQueue(movies);
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={"large"}
          />
        </View>
      ) : (
        <View>
          <MovieCard movie={movies[0]} />
          <View style={styles.buttonRow}>
            <FAB
              icon="close-thick"
              size="large"
              onPress={() => removeFromQueue(movies)}
            />
            <FAB
              icon="heart"
              size="large"
              onPress={() => void handleAccept(movies)}
            />
          </View>
        </View>
      )}
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
