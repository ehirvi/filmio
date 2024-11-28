import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import movieService from "../../services/movieService";
import MovieList from "../../components/MovieList";
import { Movie } from "../../utils/types";
import useMovieStore from "../../hooks/useStore";

const Lists = () => {
  const [listType, setListType] = useState("watch");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>();
  const movies = useMovieStore((state) => state.movies);

  useEffect(() => {
    const getMovies = async () => {
      if (movies.length > 0) {
        const hasWatched = listType === "watched" ? 1 : 0;
        const filtered = movies.filter(
          (movie) => movie.has_watched === hasWatched
        );
        if (filtered.length === 0) {
          setFilteredMovies([]);
          return;
        }
        const sortedByLatest = [...filtered].reverse();
        const movieIds = sortedByLatest.map((movie) => movie.movie_id);
        const res = await movieService.findManyById(movieIds);
        if (res) {
          setFilteredMovies(res);
        }
      }
    };
    getMovies();
  }, [movies, listType]);

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={listType}
        onValueChange={setListType}
        buttons={[
          {
            value: "watch",
            label: "I want to watch",
          },
          {
            value: "watched",
            label: "I have watched",
          },
        ]}
      />
      {filteredMovies && <MovieList movies={filteredMovies} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default Lists;
