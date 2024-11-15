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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
          // (tabBarHeight / 2) looks better on iPhone
          paddingBottom: tabBarHeight,
        }}
      >
        {movies.map((m) => (
          <MovieListItem key={m.id} movie={m} />
        ))}
      </ScrollView>
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
