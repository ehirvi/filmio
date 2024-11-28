import { FlatList, StyleSheet } from "react-native";
import { Movie } from "../utils/types";
import MovieListItem from "./MovieListItem";

interface Props {
  movies: Movie[];
}

const MovieList = ({ movies }: Props) => {
  if (movies) {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={movies}
        renderItem={({ item }) => <MovieListItem key={item.id} movie={item} />}
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={60}
      />
    );
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
    padding: 10,
  },
});

export default MovieList;
