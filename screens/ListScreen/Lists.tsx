import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { getUpdatedMovieList } from "../../utils/sqlite";
import movieService from "../../services/movieService";
import MovieList from "../../components/MovieList";
import { Movie } from "../../utils/types";

const Lists = () => {
  const [listType, setListType] = useState("watch");
  // FIX THIS TYPE
  const [movies, setMovies] = useState<ArrayLike<any>>();
  const db = useSQLiteContext();

  useEffect(() => {
    const getMovies = async () => {
      const hasWatched = listType === "watched" ? true : false;
      const data = await getUpdatedMovieList(db, hasWatched);
      if (data) {
        const movieIds = data.map((r) => r.movie_id);
        const result = await movieService.findManyById(movieIds);
        setMovies(result);
      }
    };
    getMovies();
  }, []); // ADD listType TO DEPENDENCY ARRAY IN ORDER TO SWITCH VIEWS

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
      {/* FIX TYPE */}
      <MovieList movies={movies as Movie[]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default Lists;
