import { Card, Surface } from "react-native-paper";
import { Image, StyleSheet } from "react-native";
import { POSTER_URL } from "../utils/constants";
import { DiscoverMovieResponse } from "../utils/types";
import { parseReleaseYear } from "../utils/helpers";

interface Props {
  movie: DiscoverMovieResponse["results"][number];
}

const MovieCard = ({ movie }: Props) => {
  const releaseYear = parseReleaseYear(movie.release_date);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Surface elevation={3}>
          <Image
            source={{ uri: `${POSTER_URL}/${movie.poster_path}` }}
            style={styles.image}
          />
        </Surface>
      </Card.Content>
      <Card.Title title={`${movie.title} (${releaseYear})`} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 30,
    marginHorizontal: "auto",
    padding: 5,
  },
  image: {
    width: 270,
    height: "auto",
    aspectRatio: 2 / 3,
  },
});

export default MovieCard;
