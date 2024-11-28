import { FlatList,  StyleSheet } from "react-native";
import { Movie } from "../utils/types";
import MovieListItem from "./MovieListItem";

interface Props {
  movies: Movie[];
}

const MovieList = ({ movies }: Props) => {
  if (movies) {
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
        }}
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
  container: {
    marginTop: 10,
  },
});

export default MovieList;
