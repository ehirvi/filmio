import { Image, StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import { Movie } from "../utils/types";
import { convertMinutesToHours, parseReleaseYear } from "../utils/helpers";
import { POSTER_URL } from "../utils/constants";
import { memo } from "react";

interface Props {
  movie: Movie;
}

const MovieListItem = memo(
  ({ movie }: Props) => {
    const releaseYear = parseReleaseYear(movie.release_date);
    const duration = convertMinutesToHours(movie.runtime);

    return (
      <Surface style={styles.container} elevation={1}>
        <Image
          source={{ uri: `${POSTER_URL}/${movie.poster_path}` }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text>{movie.title}</Text>
          <Text>Released: {releaseYear}</Text>
          <Text>
            Duration: {duration.hours}h {duration.minutes}m
          </Text>
        </View>
      </Surface>
    );
  },
  (prevProps, nextProps) => prevProps.movie.id === nextProps.movie.id
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    gap: 10,
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: "auto",
    aspectRatio: 2 / 3,
  },
  textContainer: {
    flexShrink: 1,
  },
});

export default MovieListItem;
