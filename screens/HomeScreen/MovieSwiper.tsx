import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieSearchResult, HomeScreenStackParamlist } from "../../utils/types";
import { useEffect, useRef, useState } from "react";
import movieService from "../../services/movieService";
import MovieCard from "../../components/MovieCard";
import { FAB, Tooltip } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import useMovieStore from "../../hooks/useStore";

type Props = NativeStackScreenProps<HomeScreenStackParamlist, "MovieSwiper">;

const MovieSwiper = ({ route }: Props) => {
  const { genres } = route.params;
  const page = useRef(1);
  const [movies, setMovies] = useState<MovieSearchResult["results"]>([]);
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

  const handleAccept = (hasWatched: boolean) => {
    saveMovie(db, firstInQueue.id, hasWatched);
    removeFromQueue();
  };

  if (movies.length > 0)
    return (
      <>
        <View>
          <MovieCard movie={firstInQueue} />
          <View style={styles.buttonRow}>
            <View>
              <Tooltip title="Not interested">
                <FAB
                  icon="close-thick"
                  size="large"
                  onPress={removeFromQueue}
                />
              </Tooltip>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Tooltip title="Already seen">
                <FAB
                  icon="check-bold"
                  size="medium"
                  onPress={() => handleAccept(true)}
                />
              </Tooltip>
            </View>
            <View>
              <Tooltip title="Interested">
                <FAB
                  icon="heart"
                  size="large"
                  onPress={() => handleAccept(false)}
                />
              </Tooltip>
            </View>
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
