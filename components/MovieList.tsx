import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Movie } from "../utils/types";
import MovieListItem from "./MovieListItem";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface Props {
  movies: Movie[];
}

const MovieList = ({ movies }: Props) => {
  const tabBarHeight = useBottomTabBarHeight();
  if (movies) {
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
          paddingBottom: tabBarHeight,
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
    paddingBottom: 100,
  },
});

export default MovieList;
